export async function onRequest(context) {
  const url = new URL(context.request.url);

  if (url.pathname.startsWith("/.well-known/")) return context.next();

  const last = url.pathname.split("/").pop() || "";
  if (last.includes(".")) return context.next();

  // rewrite everything to /
  url.pathname = "/";
  return fetch(url.toString(), context.request);
}
