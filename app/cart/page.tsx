"use client";

import dynamic from 'next/dynamic';
import { Layout, EclipseCirclesLayout, Nav } from "@/app/components";
import HeroSection from "@/app/features/cart/components/HeroSection";

const Cart = dynamic(
  () => import('@/app/features/cart/components/Cart').then(mod => mod.Cart),
  { ssr: false }
);

export default function CartPage() {
  return (
    <>
      <Nav navbarIsColored={true} />
      <HeroSection />
      <EclipseCirclesLayout lastLeftEclipse>
        <Layout className="py-[4.25rem] md:py-[8.5rem]">
          <Cart />
        </Layout>
      </EclipseCirclesLayout>
    </>
  );
}
