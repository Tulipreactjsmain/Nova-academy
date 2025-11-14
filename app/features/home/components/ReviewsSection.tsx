"use client";

import { StarIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

interface Review {
  name: string;
  role: string;
  content: string;
  rating: number;
  date: string;
  verified: boolean;
  image: string;
}

const reviews: Review[] = [
  {
    name: "Daniel Whesin",
    role: "Backend Engineer",
    content: "I'm thoroughly enjoying my internship as a backend engineer at NOVA. The team is fantastic to work with, and the projects are challenging yet rewarding. What impresses me most is the emphasis on learning and growth. The communication is seamless, and the projects are real-life applications that make a tangible impact. I'm grateful for this opportunity and would highly recommend NOVA to anyone looking to kickstart their career in software development.",
    rating: 5,
    date: "2 weeks ago",
    verified: true,
    image: "https://res.cloudinary.com/techbro/image/upload/v1744644194/IMG_1867_bebbun.jpg",
  },
  {
    name: "Nehemiah Yusuf",
    role: "UI/UX Designer",
    content: "My experience has been great because I've learned, unlearned and relearned a lot during my UI/UX internship. The mentors are great and welcoming, and my fellow colleagues are great too.",
    rating: 5,
    date: "1 month ago",
    verified: true,
    image: "https://res.cloudinary.com/techbro/image/upload/v1744644196/1702138864463_1_p76rl1.jpg",
  },
  {
    name: "Afolabi Shyllon",
    role: "Full Stack Developer",
    content: "NOVA provided a unique opportunity for me to grow my technical skills and capabilities as a backend engineer. Tasks were structured using project management tools, tech standards, and methodologies like daily stand-ups, which created a professional and collaborative work environment. One major highlight was improving my understanding of Git and learning to use it effectively for team collaboration.",
    rating: 4,
    date: "3 months ago",
    verified: true,
    image: "https://res.cloudinary.com/techbro/image/upload/v1744644197/Afolabi_Profile_Picture1_1_dqaksg.jpg",
  },
];

function ReviewCard({ review, index }: { review: Review; index: number }) {
  return (
    <div
      className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          {[...Array(review.rating)].map((_, i) => (
            <StarIcon
              key={i}
              className={`h-5 w-5 ${review.rating === 5 ? 'text-greenTrust' : 'text-[#72cf0f]'}`}
              aria-hidden="true"
            />
          ))}
        </div>
        {review.verified && (
          <span className="text-sm text-greenTrust font-medium flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Verified
          </span>
        )}
      </div>

      <p className="text-blue-800/70 text-sm leading-relaxed mb-6">{review.content}</p>

      <div className="flex items-center gap-3 w-full">
        <div className="relative w-10 h-10 rounded-full overflow-hidden">
          <Image
            src={review.image}
            alt={review.name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <p className="font-semibold text-blue-900">{review.name}</p>
          <p className="text-sm text-blue-800/70">{review.role}</p>
        </div>
      </div>
    </div>
  );
}

export default function ReviewsSection() {
  return (
    <section className="pt-[9rem] pb-[4.25rem] relative overflow-hidden bg-gradient-to-b from-white to-blue-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="text-blue-600 font-semibold mb-4 block">
            Alumni Success Stories
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6">
            Trusted by Our
            <span className="relative inline-block mx-2">
              <span className="absolute w-full h-3 bg-yellow-200/50 bottom-2 -z-10"></span>
              <span>Alumni</span>
            </span>
          </h2>
          <p className="text-lg text-blue-800/70">
            See how our alumni transformed their careers through NOVA Academy
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {reviews.map((review, index) => (
            <ReviewCard key={index} review={review} index={index} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="https://www.trustpilot.com/review/stardelitesolutions.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
          >
            Read More Reviews
            <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </div>

        {/* Trustpilot Review Collector */}
        {/* <div className="mt-16">
          <div
            className="trustpilot-widget" data-locale="en-US" data-template-id="56278e9abfbbba0bdcd568bc" data-businessunit-id="65e70031169181b97521a7e8" data-style-height="52px" data-style-width="100%"
          >
            <a href="https://www.trustpilot.com/review/stardelitesolutions.com" target="_blank" rel="noopener">Trustpilot</a>
          </div>
        </div> */}
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute top-[2rem] left-[-10rem] w-96 h-96 bg-yellow-100/30 rounded-full blur-3xl hidden lg:block"></div>
      <div className="absolute bottom-[3rem] right-[-15rem] w-96 h-96 bg-blue-100/30 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-blue-100/20 to-yellow-100/20 rounded-full blur-3xl "></div>
    </section>
  );
} 