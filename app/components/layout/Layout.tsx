import { ReactNode, CSSProperties } from "react";

interface LayoutProps {
  children: ReactNode;
  bgColor?: string;
  padding?: string;
  className?: string;
}
export default function Layout({
  children,
  bgColor,
  padding,
  className,
}: LayoutProps) {
  const style: CSSProperties = {
    backgroundColor: bgColor,
  };
  return (
    <div
      className={`${
        padding ?? "layout-padding"
      } relative w-full h-full ${className} z-[1000]`}
      style={style}
    >
      {children}
    </div>
  );
}
