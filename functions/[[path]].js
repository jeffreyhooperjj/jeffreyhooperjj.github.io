export async function onRequest(context) {
  const url = new URL(context.request.url);

  // Allow AASA and anything under .well-known to be served normally
  if (url.pathname.startsWith("/.well-known/")) {
    return context.next();
  }

  // Allow actual files through (images/css/js/etc)
  const last = url.pathname.split("/").pop() || "";
  if (last.includes(".")) {
    return context.next();
  }

  // Serve index.html for all other paths (HTTP 200)
  url.pathname = "/index.html";
  return fetch(url.toString(), context.request);
}
