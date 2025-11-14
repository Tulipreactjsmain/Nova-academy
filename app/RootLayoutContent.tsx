"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { useRef } from "react";
import { usePageEffects } from "@/app/utils/pageEffects";
import { Nav, Footer } from "@/app/components";
import { usePathname } from "next/navigation";
import { useAppDispatch } from "@/lib/hooks";
import { initializeCart } from "@/app/features/cart/slice/cartSlice";

export default function RootLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminPath = pathname?.startsWith(
    `/${process.env.NEXT_PUBLIC_ADMIN_PATH}`
  );
  const DOM_REF = useRef<HTMLDivElement>(null);

  usePageEffects(DOM_REF);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeCart());
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, [dispatch]);

  return (
    <html lang="en">
      <body>
        <div className="page-container">
          <div className="content-wrap" ref={DOM_REF}>
            {children}
          </div>
        </div>
        {!isAdminPath && <Footer />}
      </body>
    </html>
  );
}
