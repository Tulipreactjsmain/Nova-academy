import { EclipseCirclesLayout, LayoutWithHero, Nav } from "@/app/components";
import Cards from "@/app/features/get-started/components/Cards";
import { generateMetadata } from "@/app/utils/generateMetadata";

export const metadata = generateMetadata({
  title: "Get Started",
  description: "Begin your journey with our platform",
});
export default function GetStarted() {
  return (
    <>
      <Nav />
      <EclipseCirclesLayout lastLeftEclipse>
        <LayoutWithHero heroImage="/quiz-intro-hero-img.png">
          <Cards />
        </LayoutWithHero>
      </EclipseCirclesLayout>
    </>
  );
}
