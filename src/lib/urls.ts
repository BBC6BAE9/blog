/** Resolve local URLs for both GitHub project Pages and a domain root. */
export const withBase = (path: string): string => {
  if (/^(?:[a-z][a-z\d+.-]*:|\/\/|#|\?)/i.test(path)) return path;
  const base = `/${import.meta.env.BASE_URL.replace(/^\/+|\/+$/g, "")}/`.replace(/\/+/g, "/");
  if (path === base.slice(0, -1)) return base;
  if (path.startsWith(base)) return path;
  return `${base}${path.replace(/^\/+/, "")}`;
};
