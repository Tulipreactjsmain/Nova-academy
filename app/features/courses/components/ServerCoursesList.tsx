import React from "react";
import { Course } from "@/app/features/courses/slice/courseSlice";
import styles from "../styles/CoursesList.module.css";
import Image from "next/image";
import Link from "next/link";
import { formatNigerianPrice } from "@/app/utils/formatPrice";

export default function ServerCoursesList({ courses }: { courses: Course[] }) {
  const getTitleWithBreaks = (title: string) =>
    title.split(" ").map((word, index, array) => (
      <React.Fragment key={index}>
        {word}
        {index !== array.length - 1 && <br />}
      </React.Fragment>
    ));

  return (
    <section className="max-w-md md:max-w-[1240px] mx-auto">
      <div className={`${styles.grid} py-[4.25rem] md:py-[8.5rem]`}>
        {courses.map((course) => (
          <Link href={`/courses/${course.slug}`} key={course._id}>
            <div className={`${styles.product} flex flex-col h-full`}>
              <div className="flex flex-col h-full">
                <div className={`${styles.productImage} h-[200px] overflow-hidden`}>
                  <Image
                    src={course.image}
                    alt={course.title}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="flex flex-col flex-grow justify-between p-6">
                  <p className="text-blue-80 text-center text-4xl mb-[3.4rem]">
                    {getTitleWithBreaks(course.title)}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="text-blue-80">
                      <span className="text-3xl">
                        {formatNigerianPrice(course.price.current)}
                      </span>
                      <br />
                      <span className="text-md relative">
                        <span className="absolute inset-0 flex items-center">
                          <span className="h-[0.1rem] w-full z-50 bg-yellow-base"></span>
                        </span>
                        <span className="relative -z-3">
                          {formatNigerianPrice(course.price.original)}
                        </span>
                      </span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className="bg-blue-900 text-white text-center text-[0.625rem] font-semibold py-2 px-3 rounded-full">
                        {course.duration}
                      </span>
                      <span className="bg-blue-900 text-white text-center text-[0.625rem] font-semibold py-2 px-3 rounded-full">
                        {course.skillLevel}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
