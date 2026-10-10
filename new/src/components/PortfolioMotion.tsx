import { useEffect, useRef, useState } from "react";

type PortfolioMotionProps = {
  video: string;
  poster: string;
  alt: string;
  className?: string;
};

/** An accessible, silent illustration. Videos play only when visible and not reduced-motion. */
export function PortfolioMotion({video, poster, alt, className = ""}: PortfolioMotionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mediaQuery.matches);
    update();
    mediaQuery.addEventListener?.("change", update);
    return () => mediaQuery.removeEventListener?.("change", update);
  }, []);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || reducedMotion) {
      el?.pause();
      return;
    }
    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting) void el.play().catch(() => undefined);
      else el.pause();
    }, { threshold: 0.2 });
    observer.observe(el);
    return () => { observer.disconnect(); el.pause(); };
  }, [reducedMotion]);

  return (
    <div className={`relative aspect-video overflow-hidden rounded-xl bg-slate-950 ${className}`}>
      {reducedMotion ? (
        <img src={poster} alt={alt} loading="lazy" decoding="async" className="h-full w-full object-cover" />
      ) : (
        <>
          <video
            ref={videoRef}
            src={video}
            poster={poster}
            muted loop playsInline preload="none"
            aria-hidden="true"
            className="h-full w-full object-cover"
          />
          <span className="sr-only">{alt} (illustrative animated preview)</span>
        </>
      )}
    </div>
  );
}
