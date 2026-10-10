const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
const visible = new Set();
const videos = document.querySelectorAll("video[data-motion]");
function sync() {
  videos.forEach((video) => {
    video.muted = true;
    if (visible.has(video) && !preference.matches && !document.hidden) {
      video.play().catch(() => {
        video.controls = true;
      });
    } else {
      video.pause();
    }
  });
}
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(({ target, isIntersecting }) => {
      if (isIntersecting) visible.add(target);
      else visible.delete(target);
    });
    sync();
  },
  { threshold: 0.15 },
);
videos.forEach((video) => observer.observe(video));
preference.addEventListener("change", sync);
document.addEventListener("visibilitychange", sync);
