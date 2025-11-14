"use client";
import {
  BsEnvelope,
  BsArrowRight,
  BsInstagram,
  BsLinkedin,
} from "react-icons/bs";
import { Button, FullPageLoader } from "@/app/components";
import { showToast } from "@/app/utils/toasts";
import axios from "axios";
import React from "react";

export default function ContactForm() {
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

      if (formRef.current) {
        formRef.current.reset();
        const textarea = formRef.current.querySelector("textarea");
        if (textarea) {
          textarea.value = "";
        }
      }
    } catch (error) {
      console.error(error);
      showToast("Message not sent", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-blue-50/50 to-white">
        <div className="w-full max-w-6xl mx-auto px-4 pt-[12rem] pb-[8.5rem]">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left Column - Contact Info */}
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-blue-80 mb-6">
                  Let's{" "}
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Connect
                  </span>
                </h1>
                <p className="text-lg text-blue-80/80 leading-relaxed">
                  Have questions about our platform or need assistance? We're
                  here to help you navigate your tech career journey.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4 text-blue-80/80">
                  <div className="p-3 bg-blue-100/50 rounded-xl">
                    <BsEnvelope className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">Email Us</p>
                    <p className="text-sm">hello@stardeliteacademy.com</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <a
                    href="https://www.instagram.com/stardeliteacademy"
                    target="_blank"
                    className="p-3 bg-blue-100/50 rounded-xl hover:bg-blue-100 transition-colors"
                  >
                    <BsInstagram className="w-6 h-6 text-blue-600" />
                  </a>
                  <a
                    href="https://www.linkedin.com/company/stardelite"
                    target="_blank"
                    className="p-3 bg-blue-100/50 rounded-xl hover:bg-blue-100 transition-colors"
                  >
                    <BsLinkedin className="w-6 h-6 text-blue-600" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="bg-white rounded-2xl shadow-lg border border-yellow-base p-6 md:p-8">
              <form className="space-y-6" ref={formRef} onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-blue-80 mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-blue-80 mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-blue-80 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                    placeholder="How can we help you?"
                  />
                </div>

                <Button
                  isInnerBgWhite={true}
                  icon={<BsArrowRight />}
                  outerBtnClassName="w-full"
                  innerBtnClassName="w-full font-bold text-lg py-3"
                  textColor="text-blue-80"
                  type="submit"
                >
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {isLoading && <FullPageLoader />}
    </>
  );
}
