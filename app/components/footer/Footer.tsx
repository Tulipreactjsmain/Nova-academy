"use client";
import { Layout, LogoWhite } from "..";
import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import {
  selectCourses,
  selectCoursesStatus,
  fetchCourses,
} from "@/app/features/courses/slice/courseSlice";
import Image from "next/image";

export default function Footer() {
  const courses = useAppSelector(selectCourses);
  const status = useAppSelector(selectCoursesStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (courses.length === 0) {
      dispatch(fetchCourses());
    }
  }, [dispatch, courses.length]);

  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute("href")?.substring(1);

    // Only run DOM operations in browser environment
    if (
      typeof window !== "undefined" &&
      typeof document !== "undefined" &&
      targetId
    ) {
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  };
  return (
    <footer className="pt-12 bg-blue-700">
      <Layout padding={`layout-padding`}>
        <div className="footer-columns text-md justify-start md:justify-start lg:justify-between gap-4">
          <section className="footer-column flex flex-col justify-between gap-4">
            <Image
              src="/Nova_GLS_logo_white.svg"
              alt="logo"
              width={150}
              height={150}
            />
            <text style={{ fontWeight: "300" }}>
              Empowering individuals to excel in tech careers through
              comprehensive training and hands-on learning experiences.
            </text>
            <div>
              <h3 className="my-3">Subscribe</h3>
              <form>
                <input
                  type="email"
                  className="subscribe-input"
                  placeholder="Enter your email"
                />
                <button type="submit" className="subscribe-btn">
                  Subscribe
                </button>
              </form>
            </div>
          </section>
          <section className="footer-column">
            <h5 className="text-xl font-medium">Courses</h5>
            <ul>
              {courses.slice(0, 5).map((course) => (
                <li key={course._id}>
                  <a
                    href={`/courses/${course.slug}`}
                    className="text-md"
                    onClick={handleSmoothScroll}
                  >
                    {course.title}
                  </a>
                </li>
              ))}
              {status === "loading" &&
                courses.length === 0 &&
                Array.from({ length: 5 }).map((_, index) => (
                  <li key={index}>
                    <a href="#" className="text-md">
                      Loading...
                    </a>
                  </li>
                ))}
            </ul>
          </section>
          <section className="footer-column">
            <h5 className="text-xl font-medium">Support</h5>
            <ul>
              <li>
                <a href="/contact" className="text-md">
                  Help Center
                </a>
              </li>
              <li>
                <a href="/contact" className="text-md">
                  Talk to Support
                </a>
              </li>
            </ul>
          </section>
          <section className="footer-column">
            <h5 className="text-xl font-medium">Quick Links</h5>
            <ul>
              <li>
                <a href="/" className="text-md">
                  Home
                </a>
              </li>
              <li>
                <a href="/courses" className="text-md">
                  All Courses
                </a>
              </li>
              <li>
                <a href="/contact" className="text-md">
                  Contact
                </a>
              </li>
            </ul>
          </section>
          <section className="footer-column">
            <h5 className="text-xl font-medium">Company</h5>
            <ul>
              <li>
                <a
                  href="https://www.stardelitesolutions.com"
                  className="text-md"
                  target="_blank"
                >
                  About Us
                </a>
              </li>
              <li>
                <a href="join" className="text-md">
                  Careers
                </a>
              </li>
            </ul>
          </section>
        </div>
        <hr className="mt-12 border border-1 d-block" />
        <section className="copyright py-8 flex flex-col md:flex-row justify-between gap-4">
          <p style={{ fontWeight: "300" }} className="text-md">
            &copy; 2025 NOVA Global Learning Solutions. All rights reserved.
          </p>
          <div className="text-white text-md">
            <a
              href="/terms-and-conditions"
              className="underline cursor-pointer"
            >
              Terms and condition
            </a>
            <a href="/privacy-policy" className="underline cursor-pointer">
              Privacy policy
            </a>
          </div>
        </section>
      </Layout>
    </footer>
  );
}
