import React from "react";
import { motion } from "framer-motion";
import { Layout } from "@/app/components";
import JoinForm from "@/app/features/join/components/JoinForm";
import { BsStars, BsLightningCharge, BsPeople } from "react-icons/bs";
import { Nav } from "@/app/components";
import { generateMetadata } from "@/app/utils/generateMetadata";

export const metadata = generateMetadata({
  title: "Join Our Mission",
  description:
    "Join our mission to make quality tech education accessible to everyone. We're looking for passionate educators and industry experts.",
});
const benefits = [
  {
    icon: <BsStars className="w-6 h-6" />,
    title: "Shape Future Talent",
    description: "Guide and mentor the next generation of tech professionals.",
  },
  {
    icon: <BsLightningCharge className="w-6 h-6" />,
    title: "Flexible Schedule",
    description: "Choose your hours and teach at your own pace.",
  },
  {
    icon: <BsPeople className="w-6 h-6" />,
    title: "Growing Community",
    description: "Join a network of passionate educators and industry experts.",
  },
];

export default function JoinPage() {
  return (
    <>
      <Nav navbarIsColored={true} />
      <main className="bg-gradient-to-b from-white to-blue-50/30">
        <Layout className="pt-24">
          <section className="py-24">
            {/* Header */}
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <span className="text-blue-600 font-semibold mb-4 block">
                Join Our Team
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6">
                Share Your Expertise
                <span className="relative inline-block mx-2">
                  <span className="absolute w-full h-3 bg-yellow-200/50 bottom-2 -z-10"></span>
                  <span>Transform Lives</span>
                </span>
              </h1>
              <p className="text-lg text-blue-800/70">
                Join our mission to make quality tech education accessible to
                everyone. We're looking for passionate educators and industry
                experts.
              </p>
            </div>

            {/* Benefits Grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {benefits.map((benefit, index) => (
                <div
                  key={benefit.title}
                  className="p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="text-blue-600 mb-4">{benefit.icon}</div>
                  <h3 className="font-semibold text-blue-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-blue-800/70">{benefit.description}</p>
                </div>
              ))}
            </div>

            {/* Application Form */}
            <div className="max-w-2xl mx-auto">
              <JoinForm />
            </div>
          </section>
        </Layout>
      </main>
    </>
  );
}
