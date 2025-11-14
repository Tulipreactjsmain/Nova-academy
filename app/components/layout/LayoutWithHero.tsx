import { HeroLayout, Layout } from "@/app/components";

export default function LayoutWithHero({
  children,
  heroImage,
  overlayOpacity,
}: {
  children: React.ReactNode;
  heroImage: string;
  overlayOpacity?: string;
}) {
  return (
    <div className="relative h-full min-h-[100vh]">
      <div className="absolute top-0 left-0 w-full">
        <HeroLayout
          overlayOpacity={overlayOpacity ?? "0.2"}
          heroHeight="35vh"
          heroImage={heroImage}
        ></HeroLayout>
      </div>
      <Layout>{children}</Layout>
    </div>
  );
}
