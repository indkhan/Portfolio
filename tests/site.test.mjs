import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { createHash } from "node:crypto";
const root = new URL("../", import.meta.url);
test("all original public assets are preserved byte-for-byte", () => {
  const inventory = JSON.parse(
    readFileSync(new URL("original-assets.json", import.meta.url), "utf8"),
  );
  for (const [name, expected] of Object.entries(inventory)) {
    const asset = new URL(`public/${name}`, root);
    assert.ok(existsSync(asset), `Missing original asset ${name}`);
    assert.equal(
      createHash("sha256").update(readFileSync(asset)).digest("hex"),
      expected,
      `Changed original asset ${name}`,
    );
  }
});
test("static pages contain content, accessible media and valid local links", () => {
  for (const route of ["index.html"]) {
    const file = new URL(`dist/${route}`, root);
    assert.ok(existsSync(file), `Missing server-rendered route: ${route}`);
    const html = readFileSync(file, "utf8");
    assert.match(html, /Usman/);
    assert.doesNotMatch(
      html,
      /Ã|Â|â€/,
      "Public copy must retain valid Unicode",
    );
    assert.equal((html.match(/<h1[ >]/g) || []).length, 1);
    assert.match(html, /property="og:title"/);
    assert.doesNotMatch(html, /client:only|\+49 176|John Doe|Your Name/);
    for (const match of html.matchAll(
      /(?:src|poster|href)="(\/(?!\/)[^"#?]*)"/g,
    )) {
      let path = decodeURI(match[1]);
      if (!path || path === "/") path = "/index.html";
      const candidates = [
        new URL(`public${path}`, root),
        new URL(`dist${path}`, root),
        new URL(`dist${path}/index.html`, root),
      ];
      assert.ok(candidates.some(existsSync), `Missing ${path} on ${route}`);
    }
    for (const video of html.matchAll(/<video\b[^>]*>/g)) {
      assert.match(video[0], /muted/);
      assert.match(video[0], /playsinline/i);
      assert.match(video[0], /poster=/);
      assert.match(video[0], /preload="none"/);
      assert.doesNotMatch(video[0], /autoplay/);
    }
  }
  const home = readFileSync(new URL("dist/index.html", root), "utf8");
  assert.doesNotMatch(home, /Read case study|href="\/projects\//);
  for (const demo of [
    "https://unipirate.vercel.app",
    "https://moneo-mu.vercel.app",
    "https://worldsim-swart.vercel.app",
  ]) {
    const link = [...home.matchAll(/<a\b[^>]*>[^<]*<\/a>/g)].find(([anchor]) =>
      anchor.includes(`href="${demo}"`),
    );
    assert.ok(link, `Missing live link for ${demo}`);
    assert.match(link[0], /class="[^"]*bg-primary/);
    assert.match(link[0], />Live/);
  }
  assert.ok(
    !existsSync(new URL("dist/projects", root)),
    "No separate project pages are built",
  );
  for (const folder of ["projects", "hackathons"]) {
    for (const file of readdirSync(
      new URL(`public/portfolio-media/${folder}`, root),
    )) {
      if (file.endsWith(".mp4"))
        assert.ok(
          home.includes(`/portfolio-media/${folder}/${file}`),
          `Unused loop: ${file}`,
        );
    }
  }
});
