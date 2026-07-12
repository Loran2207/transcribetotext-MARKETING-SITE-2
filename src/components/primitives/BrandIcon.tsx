export function BrandIcon({
  src,
  alt = "",
  size = 28,
  className = "",
}: {
  src: string;
  alt?: string;
  size?: number;
  className?: string;
}) {
  return (
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      loading="lazy"
      className={className}
      style={{ width: size, height: size }}
    />
  );
}
