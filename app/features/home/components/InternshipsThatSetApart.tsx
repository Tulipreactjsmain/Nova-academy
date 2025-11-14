import React from "react";
import { Layout } from "@/app/components";

export default function InternshipsThatSetApart() {
  const internshipFeatures = [
    "Exclusive opportunity for top performers",
    "Intensive 2-month immersive experience",
    "Cross-disciplinary collaboration",
    "Hands-on experience with industry projects",
    "Develop a standout professional portfolio",
    "Potential for direct job placement",
  ];

  return (
    <section className="relative">
      <div className='relative bg-[url("/internships-that-set-apart.webp")] bg-cover bg-center bg-no-repeat w-full py-[4rem] md:py-[5rem]'>
        {/* <div className="absolute inset-0 bg-black opacity-20"></div> */}
        <Layout>
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center">
            <div className="w-full md:w-1/2 mb-8 md:mb-0">
            
              <h2 className="text-6xl leading-[3rem] md:leading-[5rem] md:text-6xl text-white font-semibold mb-6">
                Internships <br /> That Set <br />
                <span className="text-yellow-base font-bold">You</span> Apart
              </h2>
              <p className="text-white text-lg max-w-[526px]">
                Our internship program is designed to give you a competitive
                edge in the tech industry.
              </p>
            </div>
            <div className="w-full md:w-1/2">
              <ul className="rounded-lg space-y-4 ms-none md:ms-auto">
                {internshipFeatures.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center text-white text-lg"
                  >
                    <span className="mr-3 text-yellow-base">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Layout>
      </div>
    </section>
  );
}
