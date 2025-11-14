import { EclipseCirclesLayout, Layout, Button, Nav } from "@/app/components";
import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <>
      <Nav navbarIsColored={true} />
      <EclipseCirclesLayout lastRightEclipse>
        <Layout>
          <div className="flex flex-col items-center justify-center min-h-[60vh] relative pt-[4.25rem] pb-[4.25rem]">
            <Image
              src="/404.svg"
              alt="404 Illustration"
              width={600}
              height={450}
              quality={100}
              className="mb-8 max-w-[600px] w-full h-auto"
            />
            <h1 className="text-4xl font-bold text-blue-80 mb-4">
              Oops! Page Not Found
            </h1>
            <p className="text-lg text-blue-80/80 mb-8 text-center max-w-md">
              The page you're looking for doesn't exist or has been moved.
            </p>
            <Link href="/">
              <Button
                outerBtnClassName="w-fit"
                innerBtnClassName="font-semibold text-lg"
                isInnerBgWhite={true}
              >
                Back to Home
              </Button>
            </Link>
          </div>
        </Layout>
      </EclipseCirclesLayout>
    </>
  );
}
