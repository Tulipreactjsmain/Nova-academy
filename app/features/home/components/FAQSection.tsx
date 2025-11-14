"use client";
import React, { useState, useEffect, useRef } from "react";
import { Layout } from "@/app/components";
import { BsChevronDown } from "react-icons/bs";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What courses does NOVA Academy offer?",
    answer:
      "NOVA Academy offers a wide range of tech courses, including software development, web development, mobile app development, data analytics, artificial intelligence, product design, cloud engineering, and more. Our curriculum is designed to cater to beginners as well as advanced learners.",
  },
  {
    question: "Are your courses self-paced?",
    answer:
      "Our courses are not self-paced; instead, we offer live lectures to ensure interactive and engaging learning experiences.",
  },
  {
    question: "How long does it take to complete a course?",
    answer:
      "Minimum course duration is 8 weeks.",
  },
  {
    question: "What happens after I purchase a course?",
    answer:
      "After purchasing a course, you'll receive a receipt of payment. Two days before the cohort starts, you'll be invited to our students' workspace. There, you can interact with fellow students and tutors, receive orientation, and get guidance on how to use our learning platform. This pre-course period helps you prepare and connect with your learning community.",
  },
  {
    question: "Are the courses suitable for beginners?",
    answer:
      "Yes, we have courses designed for all skill levels, including complete beginners. Our introductory courses assume no prior knowledge and gradually build up your skills from the basics. We also offer intermediate and advanced courses for those looking to enhance their existing skills.",
  },
  {
    question: "Are there any prerequisites for the courses?",
    answer:
      "Prerequisites vary depending on the course level. Beginner courses typically have no prerequisites. For intermediate and advanced courses, we recommend having some basic knowledge or experience in the relevant field. Each course description clearly outlines any necessary prerequisites.",
  },
  {
    question: "Do you offer any certifications upon course completion?",
    answer:
      "Yes, upon successful completion of a course, you'll receive a NOVA Academy certificate. This digital certificate can be added to your LinkedIn profile or included in your resume.",
  },
  {
    question: "What is your refund policy?",
    answer:
    "We do not offer refunds for our courses. Please carefully review the course details and requirements before making a purchase to ensure it meets your needs and expectations.",
  },
  {
    question: "Can I access the course materials after completing the course?",
    answer:
      "Yes, once you purchase a course, you have lifetime access to the course materials. This allows you to revisit the content, refresh your knowledge, and stay updated as we occasionally add new information to keep the courses current with industry trends.",
  },
];

const FAQItem: React.FC<{
  item: FAQItem;
  isOpen: boolean;
  onClick: () => void;
}> = ({ item, isOpen, onClick }) => {
  const [height, setHeight] = useState<number>(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div onClick={onClick} className="border-b border-gray-200 py-4">
      <button className="flex justify-between items-center w-full text-left">
        <span className="text-lg font-medium text-blue-80">
          {item.question}
        </span>
        <BsChevronDown
          className={`text-blue-80 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        style={{ height: `${height}px` }}
        className="overflow-hidden transition-all duration-300 ease-in-out"
      >
        <div ref={contentRef}>
          <p className="text-blue-80/80 py-2">{item.answer}</p>
        </div>
      </div>
    </div>
  );
};

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-[4.25rem] bg-[#f8f9fa]">
      <Layout>
        <h2 className="text-h2 text-blue-80 font-semibold text-center mb-8">
          FAQs
        </h2>
        <div className="max-w-3xl mx-auto">
          {faqData.map((item, index) => (
            <FAQItem
              key={index}
              item={item}
              isOpen={openIndex === index}
              onClick={() => handleToggle(index)}
            />
          ))}
        </div>
      </Layout>
    </section>
  );
}
