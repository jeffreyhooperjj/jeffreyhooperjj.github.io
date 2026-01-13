export async function onRequest(context) {
  const url = new URL(context.request.url);

  // allow AASA + any real files through
  if (url.pathname.startsWith("/.well-known/")) return context.next();
  const last = url.pathname.split("/").pop() || "";
  if (last.includes(".")) return context.next();

  // serve index.html from the Pages asset bundle
  return context.env.ASSETS.fetch(new Request(new URL("/index.html", url), context.request));
}
