import { access, cp } from "node:fs/promises";

const blog = new URL("../dist/", import.meta.url);
const portfolio = new URL("../portfolio/dist/", import.meta.url);
const destination = new URL("portfolio/", blog);

// Fail the build if either app is missing, or a blog route would be overwritten.
await Promise.all([access(new URL("index.html", blog)), access(new URL("index.html", portfolio))]);
await cp(portfolio, destination, { recursive: true, errorOnExist: true, force: false });
console.log("Portfolio added to dist/portfolio/");
