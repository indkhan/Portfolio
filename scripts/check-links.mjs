import { readFileSync } from "node:fs";
const html = readFileSync(
  new URL("../dist/index.html", import.meta.url),
  "utf8",
);
const urls = [
  ...new Set(
    [...html.matchAll(/<a\b[^>]*href="(https:\/\/[^" ]+)"/g)].map(
      (match) => match[1],
    ),
  ),
];
const results = await Promise.all(
  urls.map(async (url) => {
    try {
      let response = await fetch(url, { signal: AbortSignal.timeout(25000) });
      if (response.status >= 500) {
        await response.body?.cancel();
        response = await fetch(url, { signal: AbortSignal.timeout(25000) });
      }
      await response.body?.cancel();
      let sourceStatus;
      const parsed = new URL(url);
      const parts = parsed.pathname.split("/").filter(Boolean);
      if (
        response.status >= 500 &&
        parsed.hostname === "github.com" &&
        parts[2] === "blob"
      ) {
        const raw = `https://raw.githubusercontent.com/${parts[0]}/${parts[1]}/${parts.slice(3).join("/")}`;
        const source = await fetch(raw, { signal: AbortSignal.timeout(25000) });
        sourceStatus = source.status;
        await source.body?.cancel();
      }
      return {
        url,
        status: response.status,
        sourceStatus,
        destination: response.url,
        blocked:
          response.status === 999 &&
          new URL(url).hostname === "www.linkedin.com",
      };
    } catch (error) {
      return { url, error: error.message };
    }
  }),
);
console.log(JSON.stringify(results, null, 2));
if (
  results.some(
    (result) =>
      result.error ||
      (result.status >= 400 && !result.blocked && result.sourceStatus !== 200),
  )
)
  process.exitCode = 1;
