export async function onRequest(context) {
  const url = new URL(context.request.url);

  // allow apple association + static assets through
  if (url.pathname.startsWith("/.well-known/")) return context.next();

  const last = url.pathname.split("/").pop() || "";
  if (last.includes(".")) return context.next(); // png, css, js, etc.

  // always serve index.html (200) from the Pages asset bundle
  const req = new Request(new URL("/index.html", url), context.request);
  return context.env.ASSETS.fetch(req);
}
