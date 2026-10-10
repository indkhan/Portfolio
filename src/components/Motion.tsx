interface Props {
  video: string;
  poster: string;
  alt: string;
  caption?: string;
}
export default function Motion({
  video,
  poster,
  alt,
  caption = "Illustrated workflow · not a product recording",
}: Props) {
  return (
    <figure className="motion">
      <div className="motion-frame">
        <img
          className="motion-poster"
          src={poster}
          alt={alt}
          loading="lazy"
          width="960"
          height="540"
        />
        <video
          data-motion
          muted
          loop
          playsInline
          preload="none"
          poster={poster}
          aria-label={alt}
          width="960"
          height="540"
        >
          <source src={video} type="video/mp4" />
        </video>
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
