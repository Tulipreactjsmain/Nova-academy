import React from "react";
import Button from "@/app/components/button/Button";
import { BsCart3 } from "react-icons/bs";
import Link from "next/link";
import {
  addToCart,
  selectCartItems,
  selectCartItemsCount,
} from "@/app/features/cart/slice/cartSlice";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { Course } from "@/app/features/courses/slice/courseSlice";
import { formatNigerianPrice } from "@/app/utils/formatPrice";
import { Cohort } from "@/app/features/cohorts/slice/cohortSlice";

interface CoursePricingProps {
  course: Course;
  selectedCohort: Cohort | null;
}

const CoursePricing: React.FC<CoursePricingProps> = ({
  course,
  selectedCohort,
}) => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const cartItemsCount = useAppSelector(selectCartItemsCount);

  const cohortCourse = selectedCohort?.courses.find(
    (c) => c.courseId === course._id
  );

  const isSoldOut =
    !cohortCourse ||
    cohortCourse.maxSlots === 0 ||
    cohortCourse.availableSlots === 0;
  const isInCart = cartItems.some((item) => item._id === course._id);
  const noCohortSelected = !selectedCohort;

  const handleAddToCart = () => {
    if (!selectedCohort) return;

    dispatch(
      addToCart({
        ...course,
        cohort: {
          _id: selectedCohort._id,
          title: selectedCohort.name,
          description: selectedCohort.description,
        },
        quantity: 1,
        owners: [],
        price: {
          current: course.price.current ?? 0,
          original: course.price.original ?? 0,
        },
      })
    );
  };

  return (
    <div className="max-w-[1058px] ml-auto">
      {cohortCourse && (
        <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
          <span className="text-blue-80 font-medium">
            Selected Cohort: {selectedCohort?.name}
          </span>
          <span className="ml-2 px-2 py-1 bg-blue-100 rounded text-sm">
            {selectedCohort?.status}
          </span>
          {
            <span className="ml-2 text-sm text-gray-600">
              ({cohortCourse.availableSlots} slots available)
            </span>
          }
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-6 pt-4">
        <div className="text-2xl sm:text-3xl md:text-4xl text-blue-80 flex flex-col">
          <span>{formatNigerianPrice(course.price.current)}</span>
          <span className="line-through text-sm sm:text-md md:text-xl text-blue-80 decoration-yellow-base">
            {formatNigerianPrice(course.price.original)}
          </span>
        </div>
        <div className="flex flex-col items-stretch md:items-start gap-2 w-full md:w-auto">
          <div className="flex flex-row gap-2 md:gap-4">
            <Button
              onClick={handleAddToCart}
              isInnerBorderWhite={isSoldOut || isInCart || noCohortSelected}
              isInnerBgWhite={isSoldOut || isInCart || noCohortSelected}
              innerBtnClassName="text-blue-80 text-bold text-lg sm:text-xl md:text-3xl w-full md:w-auto"
              iconColor="text-lg"
              disabled={isSoldOut || isInCart || noCohortSelected}
            >
              <span className="whitespace-nowrap">
                {noCohortSelected
                  ? "Choose Cohort"
                  : isSoldOut
                  ? "Sold Out"
                  : isInCart
                  ? "Added to cart"
                  : "Add to cart"}
              </span>
            </Button>
            <Link
              href="/cart"
              className="cursor-pointer relative font-bold flex-none"
            >
              <Button
                onClick={() => {}}
                isInnerBorderWhite={true}
                isInnerBgWhite
                disabled={noCohortSelected || isSoldOut}
                outerBtnClassName="h-full min-w-[3rem]"
                innerBtnClassName="h-full flex items-center justify-center"
              >
                <BsCart3 className="text-blue-80 text-xl sm:text-2xl h-fit" />
              </Button>
              <div className="absolute top-[-5px] right-[-5px] w-5 h-5 bg-blue-80 font-bold rounded-full text-yellow-100 text-xs flex items-center justify-center">
                {cartItemsCount}
              </div>
            </Link>
          </div>
          <div className="flex justify-center md:justify-start p-2">
            <Link
              className="text-blue-80 font-bold hover:underline transition-all"
              href="/courses"
            >
              See other courses
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePricing;
