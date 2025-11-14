"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Layout, EclipseCircle, Button } from "@/app/components";
import { BsArrowRight, BsStars, BsPeople, BsGlobe } from "react-icons/bs";
import Link from "next/link";

const missionPillars = [
  {
    icon: <BsStars className="w-6 h-6" />,
    label: "Access For All",
    title: "Breaking Barriers",
    description:
      "Scholarships, hybrid sprints, and accessibility-first design ensure every ambitious creative can participate.",
  },
  {
    icon: <BsPeople className="w-6 h-6" />,
    label: "Studio Culture",
    title: "Building Community",
    description:
      "Cohort rituals, partner critiques, and alumni guilds keep momentum human and accountability real.",
  },
  {
    icon: <BsGlobe className="w-6 h-6" />,
    label: "Impact",
    title: "Global Impact",
    description:
      "Partnerships across 18+ cities connect NOVA talent with global product teams hungry for builders.",
  },
];

const missionStats = [
  {
    value: "18K+",
    label: "Global learners",
  },
  {
    value: "72%",
    label: "Launch roles in 120 days",
  },
  {
    value: "350+",
    label: "Product launches",
  },
  {
    value: "12",
    label: "Immersive discipline tracks",
  },
];

export default function MissionStatement(): React.ReactNode {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#f6f7fb] to-white py-24 sm:py-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white via-white/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white via-white/40 to-transparent" />
        <div className="absolute left-[-12rem] top-32 hidden h-[26rem] w-[26rem] rounded-full bg-yellow-base/15 blur-[140px] lg:block" />
        <div className="absolute right-[-10rem] bottom-24 hidden h-[22rem] w-[22rem] rounded-full bg-blue-100/40 blur-[120px] lg:block" />
        <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(25,49,124,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(25,49,124,0.05)_1px,transparent_1px)] [background-size:80px_80px]" />
      </div>

      <Layout className="relative z-10">
        <div className="flex flex-col gap-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, amount: 0.3 }}
            className="grid gap-16 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start"
          >
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 rounded-full border border-blue-100 bg-white px-5 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.45em] text-blue-700">
                Nova Mission Outlook
              </div>
              <div className="space-y-4">
                <h2 className="text-4xl font-bold leading-tight text-blue-900 sm:text-5xl">
                  How we cultivate tomorrow&apos;s innovators
                </h2>
                <p className="max-w-xl text-base leading-relaxed text-blue-800/80 sm:text-lg">
                  NOVA Global Learning Solutions is deliberately crafted to feel unlike a lecture
                  hall. Think design studio meets engineering lab: small squads, fast feedback, and
                  story-driven ship rooms that help every learner graduate with evidence, not just ambition.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/join"
                  className="group inline-flex items-center justify-center rounded-full bg-blue-700 px-7 py-3 text-sm font-semibold uppercase tracking-[0.35em] text-white transition duration-300 hover:-translate-y-0.5 hover:bg-blue-800"
                >
                  Join the mission
                  <BsArrowRight className="ml-3 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/programs"
                  className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.35em] text-blue-700 transition hover:text-blue-900"
                >
                
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -top-10 -left-10 hidden h-32 w-32 rounded-full border border-blue-100/60 lg:block" />
              <div className="absolute -bottom-12 -right-12 hidden h-36 w-36 rounded-full border border-yellow-base/30 lg:block" />
              <div className="relative grid gap-6 sm:grid-cols-2">
                {missionPillars.map((pillar, index) => (
                  <motion.div
                    key={pillar.title}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.1, duration: 0.6 }}
                    viewport={{ once: true, amount: 0.3 }}
                    className="flex flex-col gap-5 rounded-3xl border border-blue-100 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,56,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_80px_rgba(15,23,56,0.1)]"
                  >
                    <span className="inline-flex w-fit items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-blue-700">
                      {pillar.icon}
                      {pillar.label}
                    </span>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-blue-900">
                        {pillar.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-blue-800/80">
                        {pillar.description}
                      </p>
                    </div>
                    <span className="h-1 w-12 rounded-full bg-gradient-to-r from-blue-400 via-blue-600 to-yellow-base" />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

     
        </div>
      </Layout>

      <EclipseCircle className="absolute bottom-[-6rem] right-[-8rem] hidden opacity-20 lg:block" />
    </section>
  );
}
