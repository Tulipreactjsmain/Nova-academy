"use client";
import axios from "axios";

import React from "react";
import { Layout, Button } from "@/app/components";
import { BsArrowRight } from "react-icons/bs";
import { InputField, FullPageLoader } from "@/app/components";
import { showToast } from "@/app/utils/toasts";

export default function ContactUs() {
  const [isLoading, setIsLoading] = React.useState(false);
  const formRef = React.useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    try {
      await axios.post("/api/contact-us", data);
      showToast("Message sent successfully", "success");

      // Clear form
      if (formRef.current) {
        formRef.current.reset(); // Reset all form fields

        // Clear textarea (since reset() might not work for all browsers)
        const textarea = formRef.current.querySelector("textarea");
        if (textarea) {
          textarea.value = "";
        }
      }
    } catch (error) {
      console.log(error);
      showToast("Message not sent", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <section className="pt-[4.25rem] pb-[8.5rem]">
        <Layout className="flex flex-col md:flex-row items-start md:items-center justify-between">
          <div className="flex flex-col items-start justify-center mb-10 md:mb-0">
            <div className=" w-fit">
              <h2 className="text-[clamp(3.125rem,5.3vw,4.6875rem)] font-semibold text-blue-80 mb-2">
                Contact Us
              </h2>
              <div className="w-full h-1 bg-yellow-base mb-10"></div>
            </div>

            <p className="text-lg text-blue-80/70 w-full max-w-[300px] mb-6">
              Get in touch with us for any inquiries or support.
            </p>
            <div className="flex flex-col space-y-4">
              <a
                href="mailto:info@stardeliteacademy.com"
                className="text-blue-80/80 hover:text-yellow-base underline"
              >
                hello@stardeliteacademy.com
              </a>
              <a
                href="tel:+2348104546828"
                className="text-blue-80/80 hover:text-yellow-base underline"
              >
                +234 (810) 454 6828
              </a>
              <div className="flex space-x-4">
                <a
                  href="https://www.instagram.com/stardeliteacademy"
                  target="_blank"
                  className="text-blue-80/80 hover:text-yellow-base underline"
                >
                  Instagram
                </a>
                <a
                  href="https://www.twitter.com/stardeliteltd"
                  target="_blank"
                  className="text-blue-80/80 hover:text-yellow-base underline"
                >
                  Twitter
                </a>
                <a
                  href="https://www.linkedin.com/company/stardelite"
                  target="_blank"
                  className="text-blue-80/80 hover:text-yellow-base underline"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="w-full sm:max-w-full md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl overflow-hidden flex flex-col"
          >
            <div className="py-4 sm:p-6 px-0 ">
              <InputField id="name" type="text" placeholder="Your Name" />
              <InputField id="email" type="email" placeholder="Your Email" />
              <div className="relative mb-6 group">
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="block w-full px-0 pt-6 pb-2 text-blue-80 bg-transparent border-0 border-b-2 border-blue-80/40 focus:outline-none focus:ring-0 focus:border-yellow-base peer placeholder-transparent"
                  placeholder=" "
                  required
                ></textarea>
                <label
                  htmlFor={"message"}
                  className="absolute left-0 -top-3.5 text-blue-80/50 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-blue-80/30 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-blue-80/50 peer-focus:text-sm"
                >
                  Message
                </label>
              </div>
            </div>
            <div className="w-full h-[1px] sm:px-6 ">
              <div className=" bg-gray-200 border-b border-gray-200"></div>
            </div>

            <div className="p-4 sm:p-6 px-0">
              <Button
                type="submit"
                isInnerBgWhite={true}
                innerBorderColor="border-blue-base/70 border-solid border-[3px]"
                isInnerBorderWhite={false}
                outerBorderColor=""
                icon={<BsArrowRight />}
                outerBtnClassName="w-full"
                textColor="text-blue-base/70"
                iconColor="text-blue-base/70"
                innerBtnClassName="w-full font-bold text-lg py-3"
              >
                Send Message
              </Button>
            </div>
          </form>
        </Layout>
      </section>
      {isLoading && <FullPageLoader />}
    </>
  );
}
