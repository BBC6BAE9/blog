# Hong Huang — Portfolio

This is the portfolio section published at
[honghuang.foomansoft.com/portfolio/](https://honghuang.foomansoft.com/portfolio/). It is an
independent Astro app so its visual design stays separate from the blog. The root project builds
both apps and copies this static output into `dist/portfolio/` before deployment.

## Preview the portfolio

From the repository root:

```bash
npm install
npm install --prefix portfolio
npm run dev:portfolio
```

Astro includes the `/portfolio/` base path in the local preview URL.

## Add a project

Copy `src/content/work/project-starter.md`, give the copy a lowercase filename such as
`my-project.md`, replace the frontmatter and body, then set `draft: false`. The filename becomes the
last part of the URL: `/portfolio/work/my-project/`.

Markdown images and GIFs are supported. Put them next to the project Markdown file and use a
relative reference:

```md
![Short description](./screenshot.png)
```

The optional `cover` frontmatter field displays a responsive cover image above the article body.
Keep `project-starter.md` as a draft; it is not included in the published site.

## Theme credit

The visual design is based on
[Astro Starter Portfolio](https://github.com/BracoZS/astro-starter-portfolio) by BracoZS. The
upstream MIT license is preserved in [LICENSE](./LICENSE).
