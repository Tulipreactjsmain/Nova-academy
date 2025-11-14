import Image from "next/image";

export default function HeroLayout({
  heroHeight = "35vh",
  heroImage = "",
  children,
  overlayOpacity = "0.4",
  overlayColor = "black",
  className,
  imageClassName,
}: {
  children?: React.ReactNode;
  heroImage?: string;
  heroHeight?: string;
  overlayOpacity?: string | number;
  overlayColor?: string;
  className?: string;
  imageClassName?: string;
}) {
  const shouldRenderImage = Boolean(heroImage);
  const parsedOverlayOpacity =
    typeof overlayOpacity === "number"
      ? overlayOpacity
      : Number(overlayOpacity ?? 0);

  return (
    <div
      className={`relative w-full overflow-hidden ${className ?? ""}`}
      style={{
        minHeight: heroHeight || "100vh",
      }}
    >
      {shouldRenderImage && (
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={heroImage}
            alt="Hero background"
            className={`object-cover w-full h-full transform scale-105 transition-transform duration-700 hover:scale-100 ${
              imageClassName ?? ""
            }`}
            fill
            priority
            quality={100}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              backgroundColor: overlayColor,
              opacity: parsedOverlayOpacity,
            }}
          />
        </div>
      )}

      <div className="relative z-10">{children}</div>
    </div>
  );
}
