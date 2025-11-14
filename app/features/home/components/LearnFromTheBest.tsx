"use client";

import {
  Videocamera,
  Notebook,
  BoltCircle,
  DiplomaVerified,
} from "@/app/components";
import React from "react";

const features = [
  { icon: <Videocamera />, title: "Engaging Live Lectures" },
  { icon: <Notebook />, title: "Interactive Labs" },
  { icon: <DiplomaVerified />, title: "Verified Case Studies" },
  { icon: <BoltCircle />, title: "Accelerated Learning" },
];

const formatTitle = (title: string) =>
  title.split(" ").map((word, index, words) => (
    <React.Fragment key={`${word}-${index}`}>
      {word}
      {index !== words.length - 1 && <br />}
    </React.Fragment>
  ));

export default function LearnFromTheBest() {
  return (
    <section className="mx-auto flex flex-col items-center gap-12 px-6 py-24 text-center">
      <h2 className="flex flex-wrap items-center justify-center gap-2 text-h2 font-semibold text-blue-80">
        Learn from the best
        <span className="relative">
          <span className="absolute left-1/2 top-1/2 -z-10 h-6 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-yellow-base/30 to-blue-700/30" />
          <span>Anytime</span>,
        </span>
        Anywhere
      </h2>

      <p className="max-w-2xl text-blue-80/80">
        Tap into NOVA’s roster of engineers, designers, storytellers, and builders who teach from
        the products they are shipping right now—no fluff, just proven playbooks.
      </p>

      <div className="grid w-full max-w-5xl grid-cols-2 gap-10 sm:grid-cols-4">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="flex flex-col items-center gap-4 text-blue-80/90"
          >
            {feature.icon}
            <h3 className="text-h5 font-semibold">{formatTitle(feature.title)}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}