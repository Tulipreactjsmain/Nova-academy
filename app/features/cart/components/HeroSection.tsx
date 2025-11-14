import { HeroLayout, Layout } from "@/app/components";

export default function HeroSection() {
  return (
    <HeroLayout heroImage="/checkout-photo.webp">
      <Layout>
        <div className="w-full pt-[15vh] pb-[5vh]">
          <div className="mt-10 py-[1rem] md:py-[2rem] w-fit px-10 bg-[#5C5C5C4D]/20 backdrop-blur-md rounded-lg border-[1px] border-[#FFFDFD]/30">
            <h1 className="text-5xl text-white font-normal text-center">
              Cart
            </h1>
          </div>
        </div>
      </Layout>
    </HeroLayout>
  );
}
