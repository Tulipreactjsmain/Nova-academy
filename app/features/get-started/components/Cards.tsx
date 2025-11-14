"use client";
import React from "react";
import { Button } from "@/app/components";
import { BsArrowRight } from "react-icons/bs";
import Link from "next/link";

const Card: React.FC<{
  title: string;
  buttonText: string;
  route: string;
}> = ({ title, buttonText, route }) => (
  <div className="bg-white border border-yellow-base shadow-md rounded-lg flex flex-col h-full">
    <div className="py-8 sm:py-12 lg:py-[8rem] px-4 sm:px-6 lg:px-8 flex flex-col flex-grow">
      <h3 className="text-center text-lg sm:text-xl lg:text-2xl mx-auto text-blue-80 font-normal 
        flex-grow flex items-center justify-center max-w-[22rem] leading-relaxed">
        {title}
      </h3>
      <Link href={route}>
        <Button
          isInnerBgWhite={true}
          icon={<BsArrowRight />}
          onClick={() => {}}
          outerBtnClassName="mx-auto mt-6 sm:mt-8 lg:mt-[3.4rem] w-fit"
          innerBtnClassName="w-fit font-bold text-base sm:text-lg"
          textColor="text-blue-70"
        >
          {buttonText}
        </Button>
      </Link>
    </div>
  </div>
);

export default function Cards() {
  return (
    <div className="w-full relative pt-[25vh] pb-8 sm:pb-12 lg:pb-[8.5rem] 
      px-4 sm:px-6 lg:px-8 max-w-md md:max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <Card
          title="Discover the ideal courses for you with our personalized quiz."
          buttonText="Go to quiz"
          route="/quiz/intro"
        />
        <Card
          title="Skip the hassle and pick a course right away!"
          buttonText="Go to courses"
          route="/courses"
        />
      </div>
    </div>
  );
}
