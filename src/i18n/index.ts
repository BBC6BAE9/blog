export const locales = ["zh-CN", "en", "ja"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "zh-CN";

export const localeMeta: Record<
  Locale,
  { label: string; shortLabel: string; htmlLang: string; ogLocale: string; dateLocale: string }
> = {
  "zh-CN": {
    label: "简体中文",
    shortLabel: "中文",
    htmlLang: "zh-CN",
    ogLocale: "zh_CN",
    dateLocale: "zh-CN",
  },
  en: {
    label: "English",
    shortLabel: "EN",
    htmlLang: "en",
    ogLocale: "en_US",
    dateLocale: "en-US",
  },
  ja: {
    label: "日本語",
    shortLabel: "日本語",
    htmlLang: "ja",
    ogLocale: "ja_JP",
    dateLocale: "ja-JP",
  },
};

export const messages = {
  "zh-CN": {
    site: {
      tagline: "关于 Apple 平台、AI 与软件工程的记录",
      description:
        "Hong Huang 的个人技术博客，记录 Swift、SwiftUI、生成式 UI、播放器与开发工具的实践。",
      about:
        "我是一名在腾讯从事 Apple 平台应用开发的全栈工程师。目前关注 AI 辅助编程、生成式 UI 与流媒体技术。",
    },
    nav: {
      main: "主导航",
      mobile: "移动端导航",
      menu: "导航菜单",
      openMenu: "打开导航菜单",
      closeMenu: "关闭导航菜单",
      portfolio: "作品集",
      posts: "文章",
      categories: "分类",
      about: "关于",
      home: "首页",
      contact: "联系",
      privacy: "隐私说明",
      personalSite: "个人主页",
    },
    language: {
      label: "切换语言",
      menu: "语言选项",
    },
    theme: {
      toLight: "切换到浅色模式",
      toDark: "切换到深色模式",
    },
    search: {
      title: "搜索",
      site: "搜索本站",
      posts: "搜索文章",
      form: "站内搜索",
      placeholder: "搜索文章、分类、作者…",
      pagePlaceholder: "输入标题、分类或作者…",
      close: "关闭搜索",
      results: "搜索结果",
      submit: "搜索",
      select: "选择",
      open: "打开",
      shortcut: "搜索",
      enterForAll: "按回车查看全部结果",
      description: "搜索 HONG HUANG 的文章、分类和作者。",
      noResults: "没有找到相关文章。试试其他标题、主题或作者。",
      resultSummary: (count: number, query: string) => `找到 ${count} 条与「${query}」相关的结果`,
    },
    home: {
      latest: "最新",
      latestAria: "最新文章",
      morePosts: "更多文章",
      noPosts: "新的记录正在路上。",
      allPosts: "查看全部文章",
      about: "关于",
      featured: "精选文章",
      categories: "文章分类",
      postCount: (count: number) => `${count} 篇`,
    },
    archive: {
      eyebrow: "归档",
      title: "全部文章",
      pageTitle: (page: number) => (page === 1 ? "文章归档" : `文章归档 · 第 ${page} 页`),
      description: "HONG HUANG 的全部文章，按发布时间排序。",
      summary: (count: number) => `共 ${count} 篇文章，按发布时间倒序排列。`,
      pagination: "文章归档分页",
      newer: "较新文章",
      older: "较早文章",
      page: (current: number, last: number) => `第 ${current} / ${last} 页`,
    },
    category: {
      eyebrow: "文章分类",
      archiveEyebrow: "归档",
      title: "文章分类",
      description: "HONG HUANG 的文章分类与归档。",
      summary: (posts: number, categories: number) =>
        `共 ${posts} 篇文章，分为 ${categories} 个主题。`,
      postCount: (count: number) => `${count} 篇文章`,
      all: "全部分类",
    },
    author: {
      eyebrow: "作者",
      archiveEyebrow: "归档",
      title: "作者",
      description: "HONG HUANG 的作者与文章。",
      intro: "记录技术实践，分享构建过程。",
      postCount: (count: number) => `${count} 篇`,
      all: "全部作者",
      publishedBy: (name: string) => `${name} 在 HONG HUANG 发布的文章。`,
    },
    post: {
      updated: "更新于",
      share: "分享",
      shareTo: (network: string, title: string) => `分享到 ${network}：${title}`,
      copyLink: (title: string) => `复制文章链接：${title}`,
      linkCopied: "链接已复制",
      copyFailed: "复制失败，请手动复制",
      copy: "复制",
      copied: "已复制",
      codeCopied: "代码已复制",
      navigation: "文章导航",
      previous: "上一篇",
      next: "下一篇",
      keepReading: "继续阅读",
      readingMinutes: (minutes: number) => `${minutes} 分钟阅读`,
    },
    newsletter: {
      heading: "订阅更新",
      intro: "选择 RSS 或邮件，在你方便的时候阅读新文章。",
      rss: "RSS 订阅",
      description: "通过邮件接收新文章，可以随时退订。",
      emailLabel: "邮箱地址",
      emailPlaceholder: "你的邮箱地址",
      submit: "邮件订阅",
      privacy: "邮件由 follow.it 发送，可能包含推荐内容。提交后请在邮箱确认订阅，可随时退订。",
      comingSoon: "邮件订阅即将开放。",
    },
    comments: {
      heading: "评论与交流",
      intro: "欢迎讨论。使用 GitHub 账号参与，评论公开保存在这个博客的 Discussions 中。",
      openGitHub: "在 GitHub 打开",
      noScript: "请前往 GitHub Discussions 阅读和发表评论。",
    },
    footer: {
      navigation: "页脚导航",
      rss: "RSS 订阅",
      builtWith: "基于",
    },
    about: {
      title: "关于我",
      name: "Hong Huang",
    },
    contact: {
      title: "联系",
      eyebrow: "联系",
      heading: "聊聊吧",
      intro: "欢迎交流文章勘误、技术问题，以及对开源项目的反馈。",
      emailBody: "可以直接给我发送邮件。反馈文章内容时，请附上文章链接和相关信息。",
      githubBody: "如有开源项目相关问题，请在对应仓库提交 issue，方便其他人一起参与讨论。",
      emailMe: "发送邮件",
      description: "通过邮件、GitHub 或 X 联系 Hong Huang。",
    },
    privacy: {
      title: "隐私说明",
      eyebrow: "隐私",
      intro: "关于阅读偏好、评论与订阅的一些说明。",
      description: "HONG HUANG 的本地偏好设置、评论和订阅隐私说明。",
    },
    notFound: {
      title: "页面未找到",
      description: "没有找到你访问的页面。",
      intro: "文章可能已经移动，或链接地址有误。",
      home: "返回首页",
      posts: "查看全部文章",
    },
    callout: {
      note: "说明",
      tip: "提示",
      warning: "注意",
      danger: "重要",
      codeExamples: "代码示例",
      example: (index: number) => `示例 ${index}`,
    },
    accessibility: {
      skipToContent: "跳转到正文",
    },
  },
  en: {
    site: {
      tagline: "Notes on Apple platforms, AI, and software engineering",
      description:
        "Hong Huang’s personal technology blog about Swift, SwiftUI, generative UI, media playback, and developer tools.",
      about:
        "I’m a full-stack engineer working on Apple platform apps at Tencent. My current interests include AI-assisted coding, generative UI, and streaming technology.",
    },
    nav: {
      main: "Primary navigation",
      mobile: "Mobile navigation",
      menu: "Navigation menu",
      openMenu: "Open navigation menu",
      closeMenu: "Close navigation menu",
      portfolio: "Portfolio",
      posts: "Posts",
      categories: "Categories",
      about: "About",
      home: "Home",
      contact: "Contact",
      privacy: "Privacy",
      personalSite: "Personal site",
    },
    language: {
      label: "Change language",
      menu: "Language options",
    },
    theme: {
      toLight: "Switch to light mode",
      toDark: "Switch to dark mode",
    },
    search: {
      title: "Search",
      site: "Search this site",
      posts: "Search posts",
      form: "Site search",
      placeholder: "Search posts, categories, or authors…",
      pagePlaceholder: "Enter a title, category, or author…",
      close: "Close search",
      results: "Search results",
      submit: "Search",
      select: "Select",
      open: "Open",
      shortcut: "Search",
      enterForAll: "Press Enter to view all results",
      description: "Search HONG HUANG posts, categories, and authors.",
      noResults: "No matching posts. Try another title, topic, or author.",
      resultSummary: (count: number, query: string) =>
        `${count} ${count === 1 ? "result" : "results"} for “${query}”`,
    },
    home: {
      latest: "Latest",
      latestAria: "Latest post",
      morePosts: "More posts",
      noPosts: "New notes are on the way.",
      allPosts: "View all posts",
      about: "About",
      featured: "Featured posts",
      categories: "Categories",
      postCount: (count: number) => `${count} ${count === 1 ? "post" : "posts"}`,
    },
    archive: {
      eyebrow: "Archive",
      title: "All posts",
      pageTitle: (page: number) => (page === 1 ? "Post archive" : `Post archive · Page ${page}`),
      description: "All HONG HUANG posts in reverse chronological order.",
      summary: (count: number) => `${count} ${count === 1 ? "post" : "posts"}, newest first.`,
      pagination: "Post archive pagination",
      newer: "Newer posts",
      older: "Older posts",
      page: (current: number, last: number) => `Page ${current} of ${last}`,
    },
    category: {
      eyebrow: "Category",
      archiveEyebrow: "Archive",
      title: "Categories",
      description: "Browse HONG HUANG posts by category.",
      summary: (posts: number, categories: number) =>
        `${posts} ${posts === 1 ? "post" : "posts"} across ${categories} ${categories === 1 ? "topic" : "topics"}.`,
      postCount: (count: number) => `${count} ${count === 1 ? "post" : "posts"}`,
      all: "All categories",
    },
    author: {
      eyebrow: "Author",
      archiveEyebrow: "Archive",
      title: "Authors",
      description: "Authors and posts on HONG HUANG.",
      intro: "Notes on building software and the lessons learned along the way.",
      postCount: (count: number) => `${count} ${count === 1 ? "post" : "posts"}`,
      all: "All authors",
      publishedBy: (name: string) => `Posts published by ${name} on HONG HUANG.`,
    },
    post: {
      updated: "Updated",
      share: "Share",
      shareTo: (network: string, title: string) => `Share “${title}” on ${network}`,
      copyLink: (title: string) => `Copy link to “${title}”`,
      linkCopied: "Link copied",
      copyFailed: "Couldn’t copy the link. Please copy it manually.",
      copy: "Copy",
      copied: "Copied",
      codeCopied: "Code copied",
      navigation: "Post navigation",
      previous: "Previous",
      next: "Next",
      keepReading: "Keep reading",
      readingMinutes: (minutes: number) => `${minutes} min read`,
    },
    newsletter: {
      heading: "Subscribe",
      intro: "Follow by RSS or email and read new posts when it suits you.",
      rss: "Subscribe via RSS",
      description: "Receive new posts by email. Unsubscribe at any time.",
      emailLabel: "Email address",
      emailPlaceholder: "Your email address",
      submit: "Subscribe by email",
      privacy:
        "Email is delivered by follow.it and may include recommendations. Confirm the subscription from your inbox; you can unsubscribe at any time.",
      comingSoon: "Email subscriptions are coming soon.",
    },
    comments: {
      heading: "Comments",
      intro:
        "Join the discussion with a GitHub account. Comments are public and stored in this blog’s Discussions.",
      openGitHub: "Open on GitHub",
      noScript: "Visit GitHub Discussions to read and post comments.",
    },
    footer: {
      navigation: "Footer navigation",
      rss: "RSS feed",
      builtWith: "Built with",
    },
    about: {
      title: "About me",
      name: "Hong Huang",
    },
    contact: {
      title: "Contact",
      eyebrow: "Contact",
      heading: "Let’s talk",
      intro:
        "I welcome article corrections, technical discussions, and feedback on open-source projects.",
      emailBody:
        "Email me directly. For feedback on an article, please include a link and any relevant details.",
      githubBody:
        "For questions about an open-source project, please open an issue in the relevant repository so others can join the discussion.",
      emailMe: "Email me",
      description: "Get in touch with Hong Huang by email, GitHub, or X.",
    },
    privacy: {
      title: "Privacy",
      eyebrow: "Privacy",
      intro: "How this site handles reading preferences, comments, and subscriptions.",
      description:
        "Privacy information for local preferences, comments, and subscriptions on HONG HUANG.",
    },
    notFound: {
      title: "Page not found",
      description: "The page you requested could not be found.",
      intro: "The post may have moved, or the address may be incorrect.",
      home: "Back to home",
      posts: "View all posts",
    },
    callout: {
      note: "Note",
      tip: "Tip",
      warning: "Warning",
      danger: "Important",
      codeExamples: "Code examples",
      example: (index: number) => `Example ${index}`,
    },
    accessibility: {
      skipToContent: "Skip to content",
    },
  },
  ja: {
    site: {
      tagline: "Apple プラットフォーム、AI、ソフトウェアエンジニアリングの記録",
      description:
        "Swift、SwiftUI、生成 UI、メディア再生、開発ツールを扱う Hong Huang の個人技術ブログ。",
      about:
        "Tencent で Apple プラットフォーム向けアプリを開発しているフルスタックエンジニアです。現在は AI 支援コーディング、生成 UI、ストリーミング技術に関心があります。",
    },
    nav: {
      main: "メインナビゲーション",
      mobile: "モバイルナビゲーション",
      menu: "ナビゲーションメニュー",
      openMenu: "ナビゲーションメニューを開く",
      closeMenu: "ナビゲーションメニューを閉じる",
      portfolio: "ポートフォリオ",
      posts: "記事",
      categories: "カテゴリー",
      about: "プロフィール",
      home: "ホーム",
      contact: "お問い合わせ",
      privacy: "プライバシー",
      personalSite: "個人サイト",
    },
    language: {
      label: "言語を変更",
      menu: "言語オプション",
    },
    theme: {
      toLight: "ライトモードに切り替える",
      toDark: "ダークモードに切り替える",
    },
    search: {
      title: "検索",
      site: "サイト内を検索",
      posts: "記事を検索",
      form: "サイト内検索",
      placeholder: "記事、カテゴリー、著者を検索…",
      pagePlaceholder: "タイトル、カテゴリー、著者を入力…",
      close: "検索を閉じる",
      results: "検索結果",
      submit: "検索",
      select: "選択",
      open: "開く",
      shortcut: "検索",
      enterForAll: "Enter キーですべての結果を表示",
      description: "HONG HUANG の記事、カテゴリー、著者を検索します。",
      noResults: "該当する記事が見つかりません。別のタイトル、トピック、著者をお試しください。",
      resultSummary: (count: number, query: string) => `「${query}」の検索結果：${count}件`,
    },
    home: {
      latest: "最新",
      latestAria: "最新の記事",
      morePosts: "その他の記事",
      noPosts: "新しい記事を準備しています。",
      allPosts: "すべての記事を見る",
      about: "プロフィール",
      featured: "注目の記事",
      categories: "カテゴリー",
      postCount: (count: number) => `${count}本`,
    },
    archive: {
      eyebrow: "アーカイブ",
      title: "すべての記事",
      pageTitle: (page: number) =>
        page === 1 ? "記事アーカイブ" : `記事アーカイブ · ${page}ページ`,
      description: "HONG HUANG のすべての記事を新しい順に掲載しています。",
      summary: (count: number) => `${count}本の記事を新しい順に掲載しています。`,
      pagination: "記事アーカイブのページ送り",
      newer: "新しい記事",
      older: "古い記事",
      page: (current: number, last: number) => `${current} / ${last}ページ`,
    },
    category: {
      eyebrow: "カテゴリー",
      archiveEyebrow: "アーカイブ",
      title: "カテゴリー",
      description: "HONG HUANG の記事をカテゴリー別に閲覧できます。",
      summary: (posts: number, categories: number) =>
        `${posts}本の記事を${categories}個のトピックに分類しています。`,
      postCount: (count: number) => `${count}本の記事`,
      all: "すべてのカテゴリー",
    },
    author: {
      eyebrow: "著者",
      archiveEyebrow: "アーカイブ",
      title: "著者",
      description: "HONG HUANG の著者と記事。",
      intro: "ソフトウェア開発の実践と、そこから得た学びを記録します。",
      postCount: (count: number) => `${count}本`,
      all: "すべての著者",
      publishedBy: (name: string) => `${name} が HONG HUANG で公開した記事。`,
    },
    post: {
      updated: "更新日",
      share: "共有",
      shareTo: (network: string, title: string) => `「${title}」を${network}で共有`,
      copyLink: (title: string) => `「${title}」へのリンクをコピー`,
      linkCopied: "リンクをコピーしました",
      copyFailed: "リンクをコピーできませんでした。手動でコピーしてください。",
      copy: "コピー",
      copied: "コピー済み",
      codeCopied: "コードをコピーしました",
      navigation: "記事ナビゲーション",
      previous: "前の記事",
      next: "次の記事",
      keepReading: "あわせて読みたい",
      readingMinutes: (minutes: number) => `${minutes}分で読めます`,
    },
    newsletter: {
      heading: "更新を購読",
      intro: "RSS またはメールで、新しい記事を都合のよいときに読めます。",
      rss: "RSS を購読",
      description: "新しい記事をメールで受け取れます。いつでも購読解除できます。",
      emailLabel: "メールアドレス",
      emailPlaceholder: "メールアドレス",
      submit: "メールで購読",
      privacy:
        "メールは follow.it から配信され、同サービスのおすすめが含まれる場合があります。受信メールで購読を確認してください。いつでも解除できます。",
      comingSoon: "メール購読は近日公開予定です。",
    },
    comments: {
      heading: "コメント",
      intro:
        "GitHub アカウントでディスカッションに参加できます。コメントはこのブログの Discussions で公開されます。",
      openGitHub: "GitHub で開く",
      noScript: "GitHub Discussions でコメントの閲覧と投稿ができます。",
    },
    footer: {
      navigation: "フッターナビゲーション",
      rss: "RSS フィード",
      builtWith: "使用技術：",
    },
    about: {
      title: "プロフィール",
      name: "Hong Huang",
    },
    contact: {
      title: "お問い合わせ",
      eyebrow: "お問い合わせ",
      heading: "お気軽にご連絡ください",
      intro: "記事の訂正、技術的な話題、オープンソースプロジェクトへのご意見を歓迎します。",
      emailBody:
        "メールで直接ご連絡ください。記事についてのご意見には、記事のリンクと関連情報を添えていただけると助かります。",
      githubBody:
        "オープンソースプロジェクトに関する質問は、他の方も参加できるよう、該当リポジトリで issue を作成してください。",
      emailMe: "メールを送る",
      description: "メール、GitHub、X で Hong Huang に連絡できます。",
    },
    privacy: {
      title: "プライバシー",
      eyebrow: "プライバシー",
      intro: "閲覧設定、コメント、購読の取り扱いについて説明します。",
      description: "HONG HUANG のローカル設定、コメント、購読に関するプライバシー情報。",
    },
    notFound: {
      title: "ページが見つかりません",
      description: "お探しのページは見つかりませんでした。",
      intro: "記事が移動したか、URL が正しくない可能性があります。",
      home: "ホームに戻る",
      posts: "すべての記事を見る",
    },
    callout: {
      note: "補足",
      tip: "ヒント",
      warning: "注意",
      danger: "重要",
      codeExamples: "コード例",
      example: (index: number) => `例 ${index}`,
    },
    accessibility: {
      skipToContent: "本文へ移動",
    },
  },
} as const;

export const getMessages = (locale: Locale) => messages[locale];

export const isLocale = (value: string | undefined): value is Locale =>
  locales.includes(value as Locale);

export const localeFromPath = (pathname: string): Locale =>
  /^\/en(?:\/|$)/.test(pathname) ? "en" : /^\/ja(?:\/|$)/.test(pathname) ? "ja" : defaultLocale;

export const stripLocalePrefix = (pathname: string): string => {
  const stripped = pathname.replace(/^\/(?:en|ja)(?=\/|$)/, "");
  return stripped || "/";
};

export const localizedPath = (locale: Locale, pathname: string): string => {
  if (/^(?:[a-z][a-z\d+.-]*:|\/\/|#|\?)/i.test(pathname)) return pathname;

  const [rawPath, suffix = ""] = pathname.split(/(?=[?#])/u, 2);
  const path = stripLocalePrefix(rawPath.startsWith("/") ? rawPath : `/${rawPath}`);

  // The portfolio is a separately built English-only site and keeps its
  // existing public URL in both blog locales.
  if (path === "/portfolio" || path.startsWith("/portfolio/")) return `${path}${suffix}`;

  const localized = locale === defaultLocale ? path : `/${locale}${path === "/" ? "/" : path}`;
  return `${localized}${suffix}`;
};

export const alternateLocalePath = (pathname: string, locale: Locale): string =>
  localizedPath(locale, stripLocalePrefix(pathname));
