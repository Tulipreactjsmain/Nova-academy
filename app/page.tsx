import { generateMetadata } from "@/app/utils/generateMetadata";
import { Layout, EclipseCirclesLayout, Nav } from "@/app/components";
import HeroSection from "@/app/features/home/components/HeroSection";
import WhereToStartSection from "@/app/features/home/components/WhereToStartSection";
import MissionStatement from "@/app/features/home/components/MissionStatement";
import CoursesList from "@/app/features/courses/components/CoursesList";
import LearnFromTheBest from "@/app/features/home/components/LearnFromTheBest";
import InternshipsThatSetApart from "@/app/features/home/components/InternshipsThatSetApart";
import ReviewsSection from "@/app/features/home/components/ReviewsSection";
import FAQSection from "@/app/features/home/components/FAQSection";
import TrainingExperience from "@/app/features/home/components/TrainingExperience";
import Team from "@/app/features/home/components/Team";
import ContactUs from "@/app/features/home/components/ContactUs";
import ToolsWeUse from "@/app/features/home/components/ToolsWeUse";

export const metadata = generateMetadata({
  title: "NOVA Academy",
  baseTitle: "Planting Knowledge, Growing Tech Leaders",
  description:
    "Empower your future with NOVA Academy. Master cutting-edge tech skills, from Design to Programming. Transform your career through expert-led, innovative learning experiences.",
  path: "/",
});

export default function IndexPage() {
  return (
    <>
      <Nav navbarIsColored={true} />

      <HeroSection />
      {/* Layout with top and bottom padding */}
      <Layout padding="md:pt-[8.5rem] pt-[4.25rem]">
        {/* Layout with max width */}
        <Layout>
          <ToolsWeUse />
        </Layout>
        <WhereToStartSection />
        <MissionStatement />
        <Layout>
          <CoursesList slice={3} />
          <LearnFromTheBest />
        </Layout>
        <TrainingExperience />
        {/* <InternshipsThatSetApart /> */}
        {/* <ReviewsSection /> */}
        {/* <Team /> */}
        <FAQSection />
        <ContactUs />
      </Layout>
    </>
  );
}
