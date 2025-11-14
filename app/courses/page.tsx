import { Layout, EclipseCirclesLayout, Nav } from "@/app/components";
import HeroSection from "@/app/features/courses/components/HeroSection";
import ServerCoursesList from "@/app/features/courses/components/ServerCoursesList";
import { generateMetadata } from "@/app/utils/generateMetadata";
import { getCoursesFromDb } from "@/lib/getCourses";

export const metadata = generateMetadata({
  title: "Courses",
  description: "View our courses",
  path: "/courses",
  structuredData: {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: [
      {
        "@type": "Course",
        name: "Introduction to Programming",
        description: "Learn the basics of programming",
        provider: {
          "@type": "Organization",
          name: "NOVA Academy",
        },
      },
    ],
  },
});

export default async function CoursesPage() {
  const courses = await getCoursesFromDb();

  const sortedCourses = courses.sort(
    (
      a: { createdAt: string | number | Date },
      b: { createdAt: string | number | Date }
    ) => {
      return (
        new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
      );
    }
  );

  return (
    <>
      <Nav navbarIsColored={true} />
      <EclipseCirclesLayout midLeftEclipse1 midRightEclipse2>
        <HeroSection />
        <Layout>
          <ServerCoursesList courses={sortedCourses} />
        </Layout>
      </EclipseCirclesLayout>
    </>
  );
}
