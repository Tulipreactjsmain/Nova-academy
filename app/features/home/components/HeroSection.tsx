"use client";

import { Layout, HeroLayout } from "@/app/components";
import { motion } from "framer-motion";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";

export default function HeroSection() {
  return (
    <HeroLayout heroImage="" heroHeight="100vh" className="bg-dark-100 text-white">
      <div className="relative isolate overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(73,38,155,0.65)_0%,_rgba(37,20,82,0.95)_46%,_rgba(0,10,31,1)_100%)]" />
          <div className="absolute left-[8%] top-[-5rem] h-[22rem] w-[22rem] rounded-full bg-yellow-base/25 blur-3xl md:h-[26rem] md:w-[26rem]" />
          <div className="absolute right-[-6rem] bottom-[-8rem] h-[24rem] w-[24rem] rounded-full bg-blue-600/30 blur-[150px] sm:right-[-4rem] sm:h-[28rem] sm:w-[28rem]" />
          <div className="absolute inset-0 opacity-30 mix-blend-soft-light [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:80px_80px]" />
          <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-dark-100 via-dark-100/30 to-transparent" />
        </div>

        <Layout className="relative py-24 sm:py-28 lg:py-32">
          <div className="grid gap-16 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-10"
            >
              <motion.span
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-6 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-white/70"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-yellow-base" />
                NOVA Academy
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl font-bold leading-[1.05] text-white sm:text-5xl lg:text-[3.75rem]"
              >
                Where ambition meets
                <span className="ml-2 inline bg-gradient-to-r from-yellow-base via-white to-blue-200 bg-clip-text text-transparent">
                  momentum
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-xl text-base leading-relaxed text-white/70 sm:text-lg"
              >
                Build products, ship real experiences, and step into roles that shape the future.
                Our cohorts blend live mentorship, rapid sprints, and storytelling workshops that
                elevate your craft from day one.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-4 sm:flex-row sm:items-center"
              >
                <Link
                  href="/get-started"
                  className="group inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-700 via-blue-base to-yellow-base px-8 py-3 text-base font-semibold text-dark-100 shadow-[0_25px_55px_rgba(15,25,56,0.55)] transition duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_32px_70px_rgba(15,25,56,0.6)]"
                >
                  Join the next cohort
                  <BsArrowRight className="ml-3 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/courses"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 py-3 text-base font-semibold text-white/80 backdrop-blur-sm transition duration-300 hover:border-white/40 hover:text-white"
                >
                  Explore the curriculum
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-6 sm:flex-row sm:items-center"
              >
                <div className="flex -space-x-3">
                  {["AL", "MN", "RS", "YT"].map((initials) => (
                    <span
                      key={initials}
                      className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-sm font-semibold text-white/80 backdrop-blur"
                    >
                      {initials}
                    </span>
                  ))}
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-yellow-base/90 text-sm font-semibold text-dark-100">
                    3K+
                  </span>
                </div>

                <div className="space-y-1 text-sm text-white/60">
                  <p className="font-semibold text-white">
                    3,200+ alumni are shipping products across 18 countries
                  </p>
                  <p className="flex items-center gap-2 text-white/60">
                    <span className="h-2 w-2 rounded-full bg-greenTrust" />
                    92% land a role they love within 120 days
                  </p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative mx-auto w-full max-w-md sm:max-w-lg lg:max-w-xl"
            >
              <div className="absolute inset-x-[10%] -top-24 h-48 rounded-[40%] bg-blue-600/15 blur-3xl" />
              <div className="relative overflow-hidden rounded-[32px] border border-white/15 bg-white/10 px-8 py-10 shadow-[0_45px_120px_rgba(9,16,32,0.7)] backdrop-blur-2xl sm:px-12 sm:py-14">
                <div className="flex items-center justify-between text-[0.65rem] uppercase tracking-[0.4em] text-white/60">
                  <span>Signature Program</span>
                  <span className="inline-flex items-center gap-2 text-yellow-base">
                    <span className="h-2 w-2 rounded-full bg-yellow-base" />
                    Enrollment open
                  </span>
                </div>

                <h3 className="mt-6 text-3xl font-semibold leading-tight text-white">
                  Applied AI Engineering
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-white/70">
                  Build production-ready experiences alongside mentors from Google, Meta, and AWS.
                  Craft resilient systems, tell better product stories, and accelerate your career.
                </p>

                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-white/15 bg-dark-100/60 px-5 py-6">
                    <p className="text-4xl font-semibold text-yellow-base">12</p>
                    <p className="mt-2 text-xs uppercase tracking-[0.3em] text-white/50">
                      immersive sprints
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/15 bg-dark-100/60 px-5 py-6">
                    <p className="text-4xl font-semibold text-blue-200">50+</p>
                    <p className="mt-2 text-xs uppercase tracking-[0.3em] text-white/50">
                      industry mentors
                    </p>
                  </div>
                </div>

                <div className="mt-8 rounded-2xl border border-white/10 bg-gradient-to-br from-blue-800/40 via-blue-700/30 to-blue-600/20 px-6 py-6">
                  <p className="text-sm font-medium text-white">This month&apos;s highlights</p>
                  <ul className="mt-4 space-y-3 text-sm text-white/70">
                    <li className="flex items-center gap-3">
                      <span className="h-2 w-2 rounded-full bg-yellow-base" />
                      Generative AI Studio Week &mdash; ship a working prototype in 72 hours
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="h-2 w-2 rounded-full bg-blue-200" />
                      Storytelling Labs with product leaders from Notion and Figma
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="h-2 w-2 rounded-full bg-white/70" />
                      Cloud Launch Day with hands-on scaling clinics
                    </li>
                  </ul>
                </div>

                <Link
                  href="/courses/applied-ai-engineering"
                  className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-yellow-base transition hover:text-white"
                >
                  View program details
                  <BsArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="hidden lg:block"
              >
                <div className="absolute -right-10 -top-16 w-52 rounded-3xl border border-white/20 bg-white/10 p-6 text-left shadow-[0_35px_80px_rgba(9,16,32,0.6)] backdrop-blur-xl">
                  <p className="text-[0.6rem] uppercase tracking-[0.4em] text-white/60">
                    Live Capsule
                  </p>
                  <p className="mt-2 text-lg font-semibold text-white">
                    Product critique lounge
                  </p>
                  <p className="mt-3 text-sm text-white/65">
                    Weekly design deep-dives with senior experience leads.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
                className="hidden lg:block"
              >
                <div className="absolute -left-12 -bottom-20 w-60 rounded-3xl border border-white/15 bg-dark-100/70 p-6 text-left shadow-[0_35px_80px_rgba(9,16,32,0.55)] backdrop-blur-xl">
                  <p className="text-4xl font-semibold text-yellow-base">94%</p>
                  <p className="mt-2 text-sm text-white/70">Career transformation rate</p>
                  <div className="mt-4 flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/50">
                    <span className="h-2 w-2 rounded-full bg-greenTrust" />
                    mentor-led journeys
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </Layout>
      </div>
    </HeroLayout>
  );
}
