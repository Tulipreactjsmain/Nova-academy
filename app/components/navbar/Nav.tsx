"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "@/app/styles/layout.module.css";
import {
  Layout,
  LogoColored,
  Button,
  LogoWhite,
  ExampleModal,
} from "@/app/components";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { selectCartItemsCount } from "@/app/features/cart/slice/cartSlice";
import {
  selectNavbar,
  updateNavbarProperties,
} from "@/app/features/navbar/navbarSlice";
import { BsCart3 } from "react-icons/bs";
import { CiMenuFries } from "react-icons/ci";
import { useEffect, useState } from "react";
import NotificationBanner from "../NotificationBanner";
import Image from "next/image";

export default function Nav({
  includeTopSpacer = false,
  isAdmin = false,
  toggleAdminSidebar,
  navbarIsColored = false,
}: {
  includeTopSpacer?: boolean;
  navbarIsColored?: boolean;
  isAdmin?: boolean;
  toggleAdminSidebar?: () => void;
}): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const cartItemsCount = useAppSelector(selectCartItemsCount);
  const { logo, textColor, bgColor, shadow, activeColor } =
    useAppSelector(selectNavbar);

  const updateNavbar = () => {
    if (typeof window === "undefined" || typeof document === "undefined") {
      return;
    }

    const heroSection = document.querySelector(
      ".hero-section"
    ) as HTMLElement | null;
    const navbarHeight = 80;

    let isTop = false;
    if (heroSection) {
      const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
      isTop = window.scrollY >= heroBottom - navbarHeight;
    }

    const shouldBeColored = navbarIsColored || isTop;

    dispatch(
      updateNavbarProperties({
        textColor: shouldBeColored ? "text-blue-80" : "text-white",
        logo: shouldBeColored ? "colored" : "white",
        bgColor: shouldBeColored
          ? "bg-white backdrop-blur-lg"
          : "bg-transparent backdrop-blur-none",
        shadow: shouldBeColored ? "shadow-md" : "shadow-none",
        activeColor: shouldBeColored
          ? "text-blue-base font-bold"
          : "text-yellow-100 font-bold",
      })
    );
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      updateNavbar();
      window.addEventListener("scroll", updateNavbar);
      return () => window.removeEventListener("scroll", updateNavbar);
    }
  }, [updateNavbar, dispatch]);
  return (
    <>
      {includeTopSpacer && (
        <div className="fixed top-0 left-0 right-0 h-3 backdrop-blur-sm z-[5000]" />
      )}
      <nav
        className={`${styles.nav} fixed ${
          includeTopSpacer ? "top-3" : "top-0"
        } ${textColor} ${bgColor} ${shadow} bg-[#FFFDFD]/0`}
      >
        {/* <NotificationBanner /> */}
        <Layout padding="layout-padding" className="rounded-lg">
          <div className="py-3 flex justify-between text-sm">
            <Link className={`text-blue-400`} href="/">
              {logo === "colored" ? (
                <Image
                  src="/Nova_GLS_logo.svg"
                  alt="logo"
                  width={150}
                  height={150}
                />
              ) : (
                <Image
                  src="/Nova_GLS_logo.svg"
                  alt="logo"
                  width={150}
                  height={150}
                />
              )}
            </Link>
            <div className="flex gap-[3rem] items-center">
              {isAdmin === false && (
                <>
                  <Link
                    className={`${styles.link} hidden md:block ${
                      pathname === "/contact" ? activeColor : ""
                    }`}
                    href="/contact"
                  >
                    Contact
                  </Link>
                  <Link
                    className={`${styles.link} hidden md:block ${
                      pathname === "/courses" ? activeColor : ""
                    }`}
                    href="/courses"
                  >
                    Courses
                  </Link>

                  <Link
                    href="/cart"
                    className="cursor-pointer relative font-bold hidden md:block"
                  >
                    <Button
                      isInnerBorderWhite={false}
                      onClick={() => {}}
                      innerBtnClassName="text-dark-100"
                      icon={<BsCart3 />}
                      iconColor="text-lg"
                    >
                      <span>Cart</span>
                    </Button>
                    <div className="absolute top-[-5px] right-[-5px] w-5 h-5 bg-blue-80 font-bold rounded-full text-white text-xs flex items-center justify-center">
                      {cartItemsCount}
                    </div>
                  </Link>
                </>
              )}
              <div className="flex gap-5 relative font-extrabold text-3xl md:hidden">
                {isAdmin === false && (
                  <Link href="/cart">
                    <div className="cursor-pointer relative font-bold">
                      <BsCart3 />

                      <div className="absolute top-[-5px] right-[-5px] w-5 h-5 bg-blue-80 font-bold rounded-full text-yellow-100 text-xs flex items-center justify-center">
                        {cartItemsCount}
                      </div>
                    </div>
                  </Link>
                )}
                <CiMenuFries
                  onClick={
                    isAdmin
                      ? toggleAdminSidebar
                      : () => {
                          console.log("clicked");
                          setIsModalOpen(true);
                        }
                  }
                  className="cursor-pointer"
                />
                <ExampleModal
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                />
              </div>
            </div>
          </div>
        </Layout>
      </nav>
    </>
  );
}
