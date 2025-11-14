"use client";
import React from "react";
import { Layout } from "@/app/components";
import {
  FaChartLine,
  FaLaptopCode,
  FaUserShield,
  FaCertificate,
} from "react-icons/fa";
import { motion } from "framer-motion";

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const Feature: React.FC<FeatureProps> = ({
  icon,
  title,
  description,
  index,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.1 + index * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    viewport={{ once: true, amount: 0.3 }}
    className="group relative flex h-full flex-col gap-5 overflow-hidden rounded-[28px] border border-blue-100/60 bg-white/70 p-7 shadow-[0_18px_60px_rgba(15,23,56,0.08)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_30px_90px_rgba(15,23,56,0.12)]"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-yellow-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    <div className="relative flex items-center gap-3 text-blue-700/60">
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-lg font-semibold text-blue-700">
        {index + 1}
      </span>
      <span className="inline-flex items-center gap-3 text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-blue-500">
        {icon}
        Nova Workflow
      </span>
    </div>
    <div className="relative space-y-3">
      <h3 className="text-xl font-semibold text-blue-900">{title}</h3>
      <p className="text-sm leading-relaxed text-blue-800/80">{description}</p>
    </div>
    <span className="relative mt-auto h-0.5 w-20 rounded-full bg-gradient-to-r from-blue-400 via-blue-600 to-yellow-base" />
  </motion.div>
);


export default function TrainingExperience() {
  const features = [
    {
      icon: <FaChartLine className="text-blue-500" />,
      title: "Performance Tracking",
      description:
        "Sync your progress with tailored analytics so you always know where you shine and where to push further.",
    },
    {
      icon: <FaLaptopCode className="text-blue-500" />,
      title: "Interactive Learning",
      description:
        "Dive into code labs, design sprints, and product simulations that mirror the pace of top product teams.",
    },
    {
      icon: <FaUserShield className="text-blue-500" />,
      title: "Mentor Feedback",
      description:
        "Tenured mentors drop loom reviews, pair sessions, and async notes to keep your build velocity sharp.",
    },
    {
      icon: <FaCertificate className="text-blue-500" />,
      title: "Live Updates",
      description:
        "Stay in rhythm with real-time cohort updates, weekly retros, and success rituals that close the loop.",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#eef2ff] to-white py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white via-white/30 to-transparent" />
        <div className="absolute left-[-14rem] top-28 hidden h-[26rem] w-[26rem] rounded-full bg-yellow-base/15 blur-[140px] lg:block" />
        <div className="absolute right-[-12rem] bottom-16 hidden h-[24rem] w-[24rem] rounded-full bg-blue-100/40 blur-[130px] lg:block" />
        <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(25,49,124,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(25,49,124,0.05)_1px,transparent_1px)] [background-size:90px_90px]" />
      </div>

      <Layout className="relative z-10">
        <div className="grid gap-16 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-3 rounded-full border border-blue-100 bg-white px-5 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.45em] text-blue-600">
              Immersive Delivery
            </div>
            <div className="space-y-5">
              <h2 className="text-4xl font-bold leading-tight text-blue-900 sm:text-5xl">
                Experience learning like never before
              </h2>
              <p className="max-w-lg text-base leading-relaxed text-blue-800/80 sm:text-lg">
                NOVA cohorts feel like a production studio—tight loops, honest feedback, and
                tooling that keeps you shipping. Every ritual is designed to stretch your craft
                and showcase proof, not potential.
              </p>
            </div>
            <ul className="space-y-4 text-sm text-blue-800/80">
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-blue-500" />
                Weekly studio standups and async reflections engineered to keep your narrative sharp.
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-yellow-base" />
                A digital command center with sprint plans, mentor notes, and evidence boards in one place.
              </li>
            </ul>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2">
            {features.map((feature, index) => (
              <Feature key={feature.title} {...feature} index={index} />
            ))}
          </div>
        </div>

        
      </Layout>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white via-white/40 to-transparent" />
    </section>
  );
}
