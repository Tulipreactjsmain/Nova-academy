"use client";

import React from "react";
import { Button, OvalVector } from "@/app/components";
import { BsArrowRight } from "react-icons/bs";
import Link from "next/link";
import Image from "next/image";
import VideoSection from "./VideoSection";

export default function WhereToStartSection() {
  const stats = [
    { number: "35+", label: "Industry Mentors" },
    { number: "12", label: "Specialized Tracks" },
    { number: "92%", label: "Graduate Offers" },
  ];

  return (
    <section className="relative mx-auto pt-[4.25rem] pb-[4.25rem] overflow-hidden bg-gradient-to-b from-blue-50/50 to-white">
      <div className="w-full layout-padding mx-auto">
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div>
            <h2 className="text-4xl md:text-5xl text-blue-80 font-bold mb-6 leading-tight">
              Inside The NOVA
              <span>Launch Studio</span>
              Experience
            </h2>

            <p className="text-lg text-blue-80/90 mb-8 leading-relaxed">
              Join our immersive onboarding designed to map your goals, pair you
              with mentors, and plug you into live build sprints from week one.
              Every cohort moves through curated playbooks, founder office
              hours, and storytelling labs that fast-track confidence in the
              real world.
            </p>

            {/* Stats Section */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-blue-600 h-[2.3rem] flex items-center justify-center">
                    {stat.number}
                  </div>
                  <div className="text-sm text-blue-80/70">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Features List */}
            <div className="mb-8 space-y-3">
              {[
                "Personal onboarding lab with pro mentors",
                "Cohort roadmap tailored to your discipline",
                "Weekly build nights and product critiques",
              ].map((feature, index) => (
                <div key={index} className="flex items-center text-blue-80/80">
                  <svg
                    className="w-5 h-5 mr-3 text-yellow-base"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {feature}
                </div>
              ))}
            </div>

            <Link href="/get-started">
              <Button
                outerBtnClassName="w-fit"
                textColor="text-blue-80 font-semibold text-lg"
                iconColor="text-blue-80 font-semibold text-lg"
                isInnerBgWhite={true}
                icon={<BsArrowRight />}
                innerBtnClassName="font-semibold text-lg px-8 py-4"
              >
                Schedule Your Intake Session
              </Button>
            </Link>
          </div>

          {/* Right Column - Video */}
          <div className="relative">
            <VideoSection />
            {/* Trust Indicators */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white px-6 py-3 rounded-full shadow-lg flex items-center space-x-4">
              {/* <span className="text-blue-80 font-medium">Trusted by</span> */}
              {/* <div className="flex items-center space-x-4">
                {[
                  {
                    src: "/Skillshare.svg",
                    alt: "Skillshare",
                    width: 50,
                  },
                  {
                    src: "/Udemy.svg",
                    alt: "Udemy",
                    width: 20,
                  },
                  {
                    src: "/Coursera.svg",
                    alt: "Coursera",
                    width: 50,
                  },
                ].map((logo) => (
                  <div
                    key={logo.alt}
                    className="flex items-center justify-center "
                  >
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={logo.width}
                      height={logo.width}
                      className="object-contain"
                    />
                  </div>
                ))}
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
