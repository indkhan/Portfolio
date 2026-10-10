import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import vm from "node:vm";

test("motion respects visibility and offers controls when mobile autoplay is blocked", async () => {
  const path = new URL("../src/scripts/motion.js", import.meta.url);
  assert.ok(existsSync(path), "The motion controller must exist");
  let intersect, preferenceChange, visibilityChange;
  const video = {
    muted: false,
    plays: 0,
    pauses: 0,
    controls: false,
    blocked: false,
    play() {
      this.plays++;
      return this.blocked
        ? Promise.reject(new Error("Autoplay blocked"))
        : Promise.resolve();
    },
    pause() {
      this.pauses++;
    },
  };
  const preference = {
    matches: false,
    addEventListener(_, handler) {
      preferenceChange = handler;
    },
  };
  const document = {
    hidden: false,
    querySelectorAll: () => [video],
    addEventListener(_, handler) {
      visibilityChange = handler;
    },
  };
  vm.runInNewContext(readFileSync(path, "utf8"), {
    document,
    window: { matchMedia: () => preference },
    IntersectionObserver: class {
      constructor(handler) {
        intersect = handler;
      }
      observe() {}
    },
  });
  assert.equal(video.plays, 0, "no eager autoplay");
  intersect([{ target: video, isIntersecting: true }]);
  assert.equal(video.plays, 1);
  assert.equal(video.muted, true);
  intersect([{ target: video, isIntersecting: false }]);
  assert.ok(video.pauses > 0);
  preference.matches = true;
  preferenceChange();
  intersect([{ target: video, isIntersecting: true }]);
  assert.equal(video.plays, 1, "reduced motion never plays");
  preference.matches = false;
  preferenceChange();
  assert.equal(video.plays, 2);
  document.hidden = true;
  visibilityChange();
  const count = video.plays;
  preferenceChange();
  assert.equal(video.plays, count, "hidden tabs never play");
  document.hidden = false;
  video.blocked = true;
  visibilityChange();
  await Promise.resolve();
  assert.equal(
    video.controls,
    true,
    "blocked autoplay offers a native play button",
  );
});
