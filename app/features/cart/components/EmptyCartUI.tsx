import { Button } from "@/app/components";
import Image from "next/image";
import Link from "next/link";

export default function EmptyCartUI() {
  return (
    <div className="text-center">
      <Image
        src="/empty-cart.png"
        alt="Empty Cart"
        width={200}
        height={200}
        className="mx-auto mb-4"
      />
      <h2 className="text-2xl font-bold text-blue-80 mb-2">
        Your cart is empty
      </h2>
      <p className="text-gray-600 mb-4">
        Looks like you haven't added any items to your cart yet.
      </p>
      <Link href="/courses">
        <Button
          isInnerBorderWhite={false}
          outerBtnClassName="w-fit mx-auto"
          innerBtnClassName="px-6 py-2"
        >
          Start Shopping
        </Button>
      </Link>
    </div>
  );
}
