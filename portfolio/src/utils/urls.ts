/** Prefix portfolio routes while leaving external URLs and local anchors intact. */
export function withBase(path: string): string {
  if (/^(?:[a-z][a-z\d+.-]*:|\/\/|#|\?)/i.test(path)) return path;

  const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
  const pathname = `/${path.replace(/^\/+/, '')}`;
  if (base && (pathname === base || pathname.startsWith(`${base}/`))) {
    return pathname === base ? `${base}/` : pathname;
  }
  return `${base}${pathname}`;
}
