---
title: "把传统流媒体带到 visionOS：面向 3D、180° 与 360° 视频的播放管线"
excerpt: "客户端 HLS 服务器、APMP 元数据与 MV-HEVC，如何把现有立体和全景流带入 Vision Pro 原生播放器。"
category: "Apple 平台"
language: "zh-CN"
translationKey: "bringing-streaming-to-visionos"
date: 2026-07-19
author:
  name: "Hong Huang"
  role: "开发者"
featured: true
draft: false
---

<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr));gap:1.5rem;margin:2rem 0;">
  <figure style="margin:0;">
    <video controls playsinline muted preload="metadata" poster="/media/visionos-streaming/before-poster.jpg" width="1280" height="640" aria-label="转换前：原始立体视频，13 秒" style="display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:contain;background:#111;border-radius:12px;">
      <source src="/media/visionos-streaming/before-13s.mp4" type="video/mp4">
      <a href="/media/visionos-streaming/before-13s.mp4">下载原始立体视频。</a>
    </video>
    <figcaption><strong>转换前</strong> — 原始立体布局 · 13 秒</figcaption>
  </figure>
  <figure style="margin:0;">
    <video controls playsinline muted preload="metadata" poster="/media/visionos-streaming/after-poster.jpg" width="1280" height="720" aria-label="转换后：在 Vision Pro 中播放，13 秒" style="display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:contain;background:#111;border-radius:12px;">
      <source src="/media/visionos-streaming/after-13s.mp4" type="video/mp4">
      <a href="/media/visionos-streaming/after-13s.mp4">下载 Vision Pro 播放视频。</a>
    </video>
    <figcaption><strong>转换后</strong> — 在 Vision Pro 中播放 · 13 秒</figcaption>
  </figure>
</div>

## 背景

传统流媒体平台已经积累了大量以左右并排或上下排列方式封装的立体视频，以及 180° 和 360° 全景视频。其中一些素材同时包含双目视差和全景投影，本来就很适合在头显中观看。然而，为普通屏幕设计的播放管线通常只把它们当作一张普通矩形图像：左右眼画面并排出现，全景画面也被平铺显示。直接把同一个播放器搬到 Vision Pro，并不会自动还原内容中已有的深度感和空间感。

Apple 的原生媒体交付体系提供了更明确的方式来描述这类内容。MV-HEVC 在编码层承载左右眼视图；Apple Projected Media Profile（APMP）则描述 180° 和 360° 等投影媒体的几何形态与视图信息。通过 HLS 交付时，播放列表还必须声明相应的观看布局，并与初始化分段中的媒体描述保持一致。源像素、编码以及这些声明共同决定系统最终如何呈现内容。[Apple Movie Profiles](https://developer.apple.com/av-foundation/Apple-Movie-Profiles.pdf)、[APMP 简介](https://developer.apple.com/videos/play/wwdc2025/297/)

## 工作原理

**这套实现的关键之一，是运行在客户端内部的本地 HLS 服务器。** 对需要转换的立体全景内容，客户端按需从原始 CDN 获取视频，处理两个眼睛的视图、转换编码，再通过本地服务器提供带有正确投影信息的 HLS 播放列表和媒体分段。

系统播放器通过 `127.0.0.1` 访问这条流，并沿用常规 HLS 的播放、缓冲和跳转流程。播放器每次请求分段时，本地服务器要么返回缓存结果，要么触发该分段的生成。这样，转换与播放可以同时进行，同时保留 Vision Pro 原生播放体验。

**原始 CDN → 设备端媒体适配 → 本地 HLS 服务器 → Vision Pro 系统播放器**

本地服务器输出的 HLS（HTTP Live Streaming）遵循 Apple 的 **HLS Authoring Specification for Apple Devices**。RFC 8216 记录了 HLS 核心协议，而立体视图和投影布局等较新的能力，还需要结合后续扩展来理解。本文参考了 Apple 公开的 **HTTP Live Streaming 2nd Edition** 草案。[RFC 8216](https://www.rfc-editor.org/rfc/rfc8216.html)、[Apple 设备 HLS 制作规范](https://developer.apple.com/documentation/http-live-streaming/hls-authoring-specification-for-apple-devices/)

在这条管线中，三个名称分别承担不同职责：**HLS 组织传输和播放列表，APMP 定义投影媒体的格式要求，MV-HEVC 承载立体视频编码。** 要以原生方式交付立体 APMP 内容，三个层次必须彼此一致。[Apple Movie Profiles](https://developer.apple.com/av-foundation/Apple-Movie-Profiles.pdf)

HLS 通过两级播放列表描述内容。多变体播放列表（Multivariant Playlist）列出可用的视频变体、编解码能力及关联音轨；媒体播放列表（Media Playlist）列出实际分段、时长和初始化信息。播放器先选择合适的变体，再按照媒体时间获取相应资源。

与 3D、180° 和 360° 播放关系最直接的属性是 **`REQ-VIDEO-LAYOUT`**。它出现在多变体播放列表的 `EXT-X-STREAM-INF` 标签中，声明该视频变体要求的呈现能力。它的值可以组合两类信息：

<div role="region" aria-label="视频视图与投影取值" tabindex="0" style="overflow-x:auto;">

| 维度     | 取值        | 含义                             |
| -------- | ----------- | -------------------------------- |
| 视频视图 | `CH-MONO`   | 单目内容：双眼看到同一个视图     |
| 视频视图 | `CH-STEREO` | 立体内容：左右眼视图必须分别呈现 |
| 投影     | `PROJ-RECT` | 普通矩形平面呈现                 |
| 投影     | `PROJ-HEQU` | 半等距柱状投影，即 180° 投影     |
| 投影     | `PROJ-EQUI` | 等距柱状投影，即 360° 投影       |

</div>

这里的 `CH` 描述视频视图；音频声道由相应的音轨声明负责。组合关系很直接：`CH-STEREO/PROJ-RECT` 表示平面 3D，`CH-STEREO/PROJ-HEQU` 表示立体 180° 视频，`CH-STEREO/PROJ-EQUI` 表示立体 360° 视频。把立体值替换成 `CH-MONO`，就得到对应的单目全景。普通单目平面视频属于默认情况，因此通常省略这个属性。这些值声明呈现要求，具体的几何和视图信息仍需从媒体本身读取。[HLS 第二版草案：REQ-VIDEO-LAYOUT](https://developer.apple.com/streaming/HLS-draft-pantos.pdf)

这也解释了实现中为何出现 **`EXT-X-VERSION:12`**：只要播放列表包含带 `REQ-` 前缀的属性，就要求协议兼容版本至少为 12。这个数字表达播放列表对客户端解析能力的要求；它既不是视频格式版本，也不表示所有 Vision Pro 视频都必须使用版本 12。每个子播放列表都会根据自身使用的标签决定兼容性要求。[Apple：关于 EXT-X-VERSION 标签](https://developer.apple.com/documentation/http-live-streaming/about-the-ext-x-version-tag)

除了空间布局，多变体播放列表还必须提供系统解码和选择视频变体所需的信息：

<div role="region" aria-label="HLS 变体属性" tabindex="0" style="overflow-x:auto;">

| 标签或属性                        | 声明的内容                                                   | 对播放的影响                                                 |
| --------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `EXT-X-STREAM-INF`                | 一个视频变体及其属性；下一行 URI 指向对应的媒体播放列表      | 建立特定视频变体的播放入口                                   |
| `CODECS`                          | 视频与音频编解码器类型及其参数                               | 让播放器判断解码兼容性；应与实际码流一致                     |
| `SUPPLEMENTAL-CODECS`             | 某些交付配置所需的补充编解码信息，例如特定 Dolby Vision 配置 | 提供增强层或相关编解码能力的附加信息                         |
| `RESOLUTION` / `FRAME-RATE`       | 视频分辨率与帧率                                             | 为显示行为和变体选择提供信息                                 |
| `BANDWIDTH` / `AVERAGE-BANDWIDTH` | 峰值和平均带宽需求                                           | 帮助播放器按网络状况选择变体；这些数值不会直接设置编码器码率 |
| `VIDEO-RANGE`                     | `SDR`、`HLG` 或 `PQ` 等动态范围类别                          | 描述视频传递特性；与视图数量及投影覆盖范围相互独立           |
| `EXT-X-MEDIA` 与 `AUDIO`          | 定义音频组，并把视频变体与音频组关联                         | 组织音视频分离的播放资源                                     |

</div>

Apple 的[官方 HLS 示例附录](https://developer.apple.com/documentation/http-live-streaming/hls-authoring-specification-for-apple-devices-appendixes/)展示了这些属性如何配合使用。例如，`VIDEO-RANGE=PQ` 本身并不能证明内容使用了 Dolby Vision，也不能说明视频是立体或全景视频。

到了媒体播放列表，声明的重点转向时间线、初始化信息和分段边界：

<div role="region" aria-label="HLS 媒体播放列表标签" tabindex="0" style="overflow-x:auto;">

| 标签                         | 声明的内容                                                                                     |
| ---------------------------- | ---------------------------------------------------------------------------------------------- |
| `EXT-X-MAP`                  | 当前分段使用的初始化分段。对 fMP4 而言，其中包含解码器配置、轨道描述以及相应的立体和投影元数据 |
| `EXTINF`                     | 下一媒体分段的时长，单位为秒                                                                   |
| `EXT-X-TARGETDURATION`       | 播放列表的分段时长上限；每个分段的 `EXTINF` 四舍五入到整数秒后，不得超过该值                   |
| `EXT-X-BYTERANGE`            | 分段在资源中的字节长度和偏移量，使一个大文件能够按范围读取为多个逻辑分段                       |
| `EXT-X-MEDIA-SEQUENCE`       | 播放列表中第一个媒体分段的序号，用于标识分段顺序                                               |
| `EXT-X-DISCONTINUITY`        | 后续分段在时间戳序列、格式或其他属性上存在不连续，提示播放器重新建立相应的解释状态             |
| `EXT-X-INDEPENDENT-SEGMENTS` | 声明分段无需依赖其他分段中的媒体采样即可解码；但仍然需要初始化信息                             |
| `EXT-X-PLAYLIST-TYPE:VOD`    | 声明内容固定的视频点播播放列表                                                                 |
| `EXT-X-ENDLIST`              | 声明播放列表不会再加入新的媒体分段                                                             |

</div>

这些标签构成了分段播放和随机跳转的基础。[RFC 8216：播放列表与媒体分段](https://www.rfc-editor.org/rfc/rfc8216.html)

**空间播放最终依赖整条声明链的一致性。** 当多变体播放列表声明 `CH-STEREO/PROJ-HEQU` 时，初始化分段必须包含相匹配的立体和半等距柱状投影描述，实际视频也必须提供满足交付要求的两个眼睛视图。`vexu`、`eyes` 和 `proj` 等 MP4 结构承载这些媒体语义。它们属于容器元数据，并通过 `EXT-X-MAP` 引用的初始化分段进入播放管线。[APMP 简介](https://developer.apple.com/videos/play/wwdc2025/297/)

因此，客户端适配必须同时解决三个问题：把源图像整理成正确的眼睛视图或投影内容；以目标交付格式编码和封装；生成与媒体一致的 HLS 声明。系统依靠这些信息识别可用能力，并提供相应的观看体验。

## 实现方式

这些现有视频本身已经包含所需的立体或全景信息。通过媒体适配，客户端可以把它们带入 Vision Pro 的原生播放系统。这项工作的出发点正是如此：复用现有视频资源和分发基础设施，在设备端加入投影描述，重新组织媒体交付，并在需要时处理左右眼视图和转换编码。目标是把沉睡在矩形画面里的空间信息，转化为可以直接观看的立体和沉浸式体验。

沿着这个思路，我为传统流媒体客户端加入了一组新的播放能力。左右并排视频可以立体观看，180° 内容可以在观众面前展开成半球，360° 内容可以环绕四周，立体视图和全景投影也可以自由组合。

所有体验都使用同一个系统播放器，保留播放、暂停、跳转、清晰度选择和信息面板。界面上看起来只是几个选项，背后却涉及 CDN 寻址、分段索引、媒体封装、立体合成、视频编码和系统呈现。

核心任务，是让一条原本只负责传输矩形图像的管线，能够表达视频完整的空间含义。

**我首先把“有几个眼睛视图”和“图像被放在哪里”拆成两个独立维度。**

视图布局决定左右眼各自接收什么，投影则决定像素属于一个平面、半球还是完整球面。常见观看体验可以直接表示成一个矩阵：

<div role="region" aria-label="视图布局与投影组合" tabindex="0" style="overflow-x:auto;">

| 视图布局 | 平面         | 180°           | 360°           |
| -------- | ------------ | -------------- | -------------- |
| 单目     | 普通 2D 视频 | 单目半球视频   | 单目全景视频   |
| 立体     | 平面 3D 视频 | 立体 180° 视频 | 立体 360° 视频 |

</div>

Side-by-Side（SBS，左右并排）和 Over-Under（上下排列）是把两个眼睛视图封装进一张图像的方式。MV-HEVC（Multiview HEVC）则在编码层承载多个视图。它们回答的问题与“180° 还是 360°”并不相同。

播放器还需要追踪媒体在管线中的阶段：它是等待处理的源素材，还是已经满足系统要求、可以直接交付的内容？即使最终体验同为“立体 180°”，SBS 源文件与交付就绪的 MV-HEVC 文件也需要走不同的处理路径。Apple Projected Media Profile（APMP）同样明确区分制作与交付。立体 APMP 交付使用 MV-HEVC；制作阶段采用的帧封装方式，不能直接当成交付格式。[Apple Movie Profiles](https://developer.apple.com/av-foundation/Apple-Movie-Profiles.pdf)

这个模型为后续工作提供了稳定基础。切换清晰度会改变视频变体，切换 CDN 会改变访问路径，但两者都应保留眼睛视图布局和投影语义。

从整体上看，管线如下：

![播放管线：源媒体和 CDN 候选经过选择与索引读取，分流到三条适配路径，最后汇入系统能力识别和 AVKit 播放器。](/media/visionos-streaming/pipeline.svg)

[打开完整尺寸的管线图](/media/visionos-streaming/pipeline.svg)

**在进入渲染之前，我先解决视频来自哪里，以及如何按需读取的问题。**

传统流媒体源不一定提供完整的 MP4 文件。音频和视频通常彼此分离，同一内容可能有多个清晰度、编解码器和 CDN 地址，媒体数据则通过初始化范围和分段索引来描述。

因此，拿到一个 URL 只是开始。我把主地址和备用地址组织成候选集合，根据节点类型设置优先级——例如降低部分 PCDN 节点的优先级——并在请求失败时尝试其他候选。选择逻辑不再只是“使用第一个 URL”，还会考虑节点特征和实际读取结果。

比 URL 选择更重要的是 HTTP Range 行为。观众跳转到某个时间点时，底层需要把时间转换为源文件中的字节范围，只获取解码所需的数据。分段索引 `sidx` 就是这两者之间的桥梁：它连接媒体时间、分段长度以及分段在源对象中的位置。

一个很容易忽略的细节，是索引的坐标系。索引被单独下载后，它在内存中的位置从零开始，但在源文件中的字节位置并未改变。解析器必须保留这种关系，否则一个看似合理的偏移量，可能把请求指向错误的数据。

在这一层，我还保留了一个看似保守的选择：对关键元数据使用受控并发的独立 Range 请求。合并多个范围虽然能减少请求次数，但有些 CDN 遇到多范围请求时会返回完整对象，于是一次很小的元数据探测就变成了整文件下载。实现会同时检查分段读取的响应状态和返回长度，并在候选节点失败时切换离开。

切换备用 URL 还有一条明确边界：一旦下游响应已经开始输出媒体字节，就不能随意接着输出另一个 CDN 的响应。否则，网络层可能报告“重试成功”，播放器收到的却是两段数据拼接而成的损坏内容。这个约束会直接影响首帧、跳转和故障恢复的可靠性。

为了支持需要文件式随机访问的处理路径，我还构建了一个虚拟 MP4 层。它在本地组装文件头和采样表，再把虚拟文件中的读取映射回远端音频与视频对象。原始媒体数据仍留在 CDN 上，客户端只在需要时获取。

这样，上层就能把彼此分离的远端媒体资源视为一个统一素材，而无需在处理开始前下载完整视频。

利用前文提到的协议描述，我可以把源 DASH 资源的初始化信息和 `sidx` 索引重新组织成 HLS。`EXT-X-MAP` 引用初始化分段，`EXTINF` 表达时间切片，`EXT-X-BYTERANGE` 表达它们在原始 CDN 对象中的位置。这条基础传输路径只是生成了访问同一媒体数据的另一种描述，因此能够复用原有压缩分段。

**对单目 180° 和 360° 内容而言，适配的重点是投影语义。**

全景视频在存储时仍然是一张矩形图像，变化的是像素的含义。360° 等距柱状图像用水平轴表示经度、垂直轴表示纬度；180° 半等距柱状图像覆盖正前方半球。系统必须知道这种映射，才能重建正确的观看空间。[WWDC25：探索 visionOS 视频体验](https://developer.apple.com/videos/play/wwdc2025/304/)

如果源像素已经符合目标投影，编码和封装也满足处理要求，就可以保留压缩媒体数据，只在初始化信息中加入 APMP 投影声明，并生成与之匹配的 HLS 描述。这条路径的主要成本来自容器处理和网络读取。

在 MP4 中，相关信息由 Video Extended Usage，也就是 `vexu` 承载。`proj/prji` 描述投影类型，`eyes/stri` 描述立体视图信息，制作素材中的 `pack/pkin` 则描述两个眼睛视图如何封装。它们分别回答几何、视图和存储布局的问题，不能相互替代。[立体视频 ISOBMFF 扩展](https://developer.apple.com/av-foundation/Stereo-Video-ISOBMFF-Extensions.pdf)

写入这些声明后，仍需检查系统是否真的识别出非平面投影。单目全景路径会通过 `AVAssetPlaybackAssistant` 查询能力信息，并在识别失败时保留明确的回退行为。

这套策略有清晰边界：已经展开为目标投影的全景素材，可以补上正确的空间描述；双鱼眼等其他投影仍然需要相应的几何转换。

**对左右并排的 3D 视频，处理会深入到每一帧。**

普通解码器读取 SBS 视频时，得到的是一帧包含两幅图像的画面。要让系统把它当作立体内容使用，必须根据实际封装布局分离两个视图，保留相同的呈现时间，并明确标记它们分别属于左眼还是右眼。

平面立体路径通过自定义视频合成器完成这项工作，并借助 Core Media 的带标签缓冲区输出两个眼睛视图。标签携带媒体类型、眼睛分配和投影语义，让合成结果具有系统可以理解的结构。[AVAsynchronousVideoCompositionRequest](https://developer.apple.com/documentation/avfoundation/avasynchronousvideocompositionrequest)

宽高比、裁剪方向和输出尺寸也必须一起处理。SBS 会影响单眼视图的有效宽度，Over-Under 则影响有效高度。把封装后整张图像的尺寸当成单眼视图尺寸，会让场景受到挤压；颠倒左右眼顺序，还会改变感知到的深度关系。

颜色信息同样必须贯穿整条管线。解码帧的 YCbCr 矩阵、色彩原色和传递函数，都需要被合成器输出正确继承。即使左右眼视图分离无误，丢失颜色描述仍会导致偏色或亮度关系错误。空间适配必须同时保留几何、时间和颜色。

这条路径可以在播放过程中分发左右眼视图，无需等待完整立体文件提前生成。不过，它的输出是运行时眼睛视图帧，与生成符合交付规范的 MV-HEVC 视频属于不同层次的能力。

**对于立体全景视频，我把适配进一步延伸到了编码和交付。**

针对需要重新组织交付方式的立体全景流，我加入了一条按需转换为 MV-HEVC、再封装为 APMP fMP4/HLS 的路径。具体路线取决于源内容的提供方式。文件式输入可以继续使用带投影标签的立体合成；对于以独立流形式交付的投影立体内容，管线会先尝试转换为原生交付格式，同时保留合成器路径以兼容旧方案。Apple 的官方转换示例同样展示了源布局、投影描述和交付格式之间的完整关系。[把投影视频转换为 Apple Projected Media Profile](https://developer.apple.com/documentation/avfoundation/converting-projected-video-to-apple-projected-media-profile)

我把这部分组织成以播放位置为中心的分段管线。它先定位所需的远端音视频分段，并把它们准备成可读取的输入；解码后分离左右眼视图，再交给 VideoToolbox 编码；封装层随后输出初始化分段和媒体分段；系统播放器则通过本地回环 HTTP 服务器读取这些 HLS 资源。

这样，完整视频仍保留完整时间线索引，转换却只在分段真正被需要时发生。跳转会改变待处理区域的优先级，播放位置移开后，过时任务可以取消。生成的分段进入有界缓存，相邻分段则适度预取。

调度的目标，是围绕同一段时间区域协调网络读取、解码、编码和播放缓冲。为了尽快显示首帧，需要尽早产出可播放区域；连续播放要求足够的处理吞吐量；跳转则要求工作能迅速转移到新位置。分辨率、帧率、网络状况和设备负载共同决定这些目标之间的取舍。

分段转换还会引入几类需要谨慎处理的边界。源分段与目标分段的边界可能不一致，因此裁剪必须依据时间戳；独立编码的区域需要正确的初始化和不连续声明；音频必须在同一时间线上进入输出。如果目标分段生成失败，应暴露错误并允许重试。若用上一段填补空缺，播放器反而会重复播放同一小段内容。

这条路径包含重新编码。因此，“保留源分辨率”描述的只是尺寸策略；图像质量、颜色和音频各自都有处理约束，必须针对具体编码路径逐项评估。

**最后一层，是把媒体能力可靠地交给系统播放器。**

我让 `AVPlayer` 和 `AVPlayerViewController` 始终处在播放与交互的中心，由 AVKit 管理可用的观看体验。这样，空间播放就能融入现有的暂停、跳转、清晰度选择和面板逻辑。[使用 AVKit 播放沉浸式媒体](https://developer.apple.com/documentation/avkit/playing-immersive-media-with-avkit)

在这一层，三种状态必须彼此区分：应用允许哪些体验、系统判断当前媒体能提供哪些体验，以及用户实际进入了哪种体验。在配置中允许沉浸式体验，只代表应用愿意提供它；要确认成功，还需要媒体识别结果和实际体验状态作为证据。

因此，模式切换被当作一次事务处理。新的媒体配置在后台准备；只有准备成功后，才真正替换播放器内容，并恢复当前播放位置和播放意图。如果准备失败，旧内容保持不变。如果用户连续请求多次切换，过时任务的结果不能覆盖最新选择。

同一机制也覆盖清晰度变更和传输回退。网络故障可以改变读取路径，但不能悄悄把“立体 180°”换成媒体语义不同的内容。真正必须降级时，实际播放状态和界面显示的选择必须保持同步。

我为这条管线建立的验证记录，会沿途检查 HLS 声明、容器元数据、框架识别、合成器输出和最终观看体验。结构测试确认信息是否被一致传递；设备上的视觉检查则验证几何、眼睛顺序、接缝、首帧和切换行为。两类证据承担不同作用。

本文范围是平面立体视频，以及与 180°、360° 投影内容组合后的适配。Apple 品牌的 Apple Immersive Video 有自己的格式和制作体系。把普通立体全景内容带入 APMP，并不会自动让它变成 Apple Immersive Video。[Apple Immersive Video](https://developer.apple.com/apple-immersive-video/)

这项工作最让我有成就感的部分，是把过去散落在网络、容器、编码和渲染中的约束，汇聚为一条彼此协调的播放管线。用户改变观看选项时，源数据读取、帧组织方式以及系统对内容的理解都会随之变化。

视频仍然来自同一套流媒体基础设施，但我们观看它的空间被打开了。

## 更漫长的旅程

事实上，这个项目持续了非常长的时间，过程也远非一帆风顺。

我第一次产生制作这类视频应用的想法是在 2024 年初，当时我第一次体验了空间视频、3D 视频和沉浸式视频。

我的思路逐渐成形，Apple 的 API 也在持续发展。到了 visionOS 26，我终于等到了用 `AVPlayerViewController` 播放传统立体视频所需的 API。

与此同时，另一件影响更深远的事情正在发生：AI。我一直尝试借助早期版本的 ChatGPT 和 Claude 解决这个问题，整个实现思路也已经逐渐成熟。

后来，在 GPT 5.6 发布后不久的一天，我决定是时候把这个项目认真做完了。

必须承认，根据我在这个项目中的实际体验，超过 80% 的编码和实现细节探索都由 GPT 5.6 完成。

如果仍要完全手写所有代码，逐一调试 HLS 标签与属性，或手工拆分和对齐视频分段，很难想象还要投入多少时间。

## 参考资料

- [探索 visionOS 视频体验 · WWDC25](https://developer.apple.com/videos/play/wwdc2025/304/)
- [了解 Apple Projected Media Profile · WWDC25](https://developer.apple.com/videos/play/wwdc2025/297/)
- [Apple Movie Profiles](https://developer.apple.com/av-foundation/Apple-Movie-Profiles.pdf)
- [立体视频 ISOBMFF 扩展](https://developer.apple.com/av-foundation/Stereo-Video-ISOBMFF-Extensions.pdf)
- [RFC 8216：HTTP Live Streaming](https://www.rfc-editor.org/rfc/rfc8216.html)
- [关于 EXT-X-VERSION 标签](https://developer.apple.com/documentation/http-live-streaming/about-the-ext-x-version-tag)
- [Apple 设备 HLS 制作规范](https://developer.apple.com/documentation/http-live-streaming/hls-authoring-specification-for-apple-devices/)
- [HLS 制作规范附录](https://developer.apple.com/documentation/http-live-streaming/hls-authoring-specification-for-apple-devices-appendixes/)
- [HTTP Live Streaming 协议草案](https://developer.apple.com/streaming/HLS-draft-pantos.pdf)
- [把投影视频转换为 Apple Projected Media Profile](https://developer.apple.com/documentation/avfoundation/converting-projected-video-to-apple-projected-media-profile)
- [使用 AVKit 播放沉浸式媒体](https://developer.apple.com/documentation/avkit/playing-immersive-media-with-avkit)
- [在 visionOS App 中支持沉浸式视频播放 · WWDC25](https://developer.apple.com/videos/play/wwdc2025/296/)

_本文聚焦已实现管线的架构和原理。关于 APMP 及相关系统播放能力的讨论，以 visionOS 26 及更高版本为背景。_
