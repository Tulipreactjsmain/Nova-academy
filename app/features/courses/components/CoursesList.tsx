"use client";

import { useAppDispatch } from "@/lib/hooks";
import { addToCart } from "@/app/features/cart/slice/cartSlice";
import styles from "@/app/features/courses/styles/CoursesList.module.css";
import { ZigZagVector } from "@/app/components";
import { useSelector } from "react-redux";
import { Button } from "@/app/components";
import {
  selectCourses,
  fetchCourses,
  selectCoursesStatus,
  selectCoursesError,
} from "@/app/features/courses/slice/courseSlice";
import { useEffect } from "react";
import Image from "next/image";
import React from "react";
import { BsArrowRight } from "react-icons/bs";
import Link from "next/link";
import { formatNigerianPrice } from "@/app/utils/formatPrice";

export default function CoursesList({
  slice,
  includeHeading = true,
  includeAllCoursesButton = true,
}: {
  slice?: number;
  includeHeading?: boolean;
  includeAllCoursesButton?: boolean;
}) {
  const dispatch = useAppDispatch();
  const courses = useSelector(selectCourses);
  const status = useSelector(selectCoursesStatus);
  const error = useSelector(selectCoursesError);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const getTitleWithBreaks = (title: string) =>
    title.split(" ").map((word, index, array) => (
      <React.Fragment key={index}>
        {word}
        {index !== array.length - 1 && <br />}
      </React.Fragment>
    ));

  return (
    <section className={`pt-[4.25rem] max-w-md md:max-w-[1240px] mx-auto`}>
      <div className={`${styles.productList} `}>
        {includeHeading && (
          <h2 className="text-h2 text-center text-blue-80 font-semibold mb-10">
            <span className="">Featured Courses</span>
          </h2>
        )}
        {status == "loading" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md animate-pulse"
              >
                <div className="h-48 bg-gray-300 rounded-md mb-4"></div>
                <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
                <div className="h-10 bg-gray-300 rounded"></div>
              </div>
            ))}
          </div>
        )}
        <div className={styles.grid}>
          {status == "failed" && <div>Error: {error}</div>}
          {status == "succeeded" &&
            (slice !== undefined || slice !== null
              ? courses.slice(0, slice)
              : courses
            ).map((course) => (
              <Link href={`/courses/${course.slug}`} key={course._id}>
                <div
                  key={course._id}
                  className={`${styles.product} flex flex-col h-full`}
                >
                  <div className="flex flex-col h-full">
                    <div
                      className={`${styles.productImage} h-[200px] overflow-hidden`}
                    >
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
        {includeAllCoursesButton && (
          <Link href="/courses">
            <Button
              outerBtnClassName="mx-auto mt-10 w-fit"
              textColor="text-blue-80 font-semibold text-lg"
              iconColor="text-blue-80 font-semibold text-lg"
              isInnerBgWhite={true}
              onClick={() => {}}
              icon={<BsArrowRight />}
            >
              See all courses
            </Button>
          </Link>
        )}
      </div>
    </section>
  );
}
