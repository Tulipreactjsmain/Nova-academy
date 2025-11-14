"use client";

import AiGenerator from "@/app/components/AiGenerator";
import { Nav } from "@/app/components";
import { notFound } from "next/navigation";

interface Props {
  params: {
    adminPath: string;
  };
}

export default function AiPage({ params }: Props) {
  // Server-side validation of admin path
  if (params.adminPath !== process.env.NEXT_PUBLIC_ADMIN_PATH) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white relative overflow-hidden flex flex-col">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-48 -right-48 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-96 -left-48 w-96 h-96 bg-violet-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-48 right-48 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Fixed Header */}

      <div className="text-center py-8 space-y-4 px-4">
        <div className="inline-block">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600">
            Gemini AI Assistant
          </h1>
          <div className="h-1 w-full bg-gradient-to-r from-blue-600 to-violet-600 rounded-full mt-2"></div>
        </div>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
          Experience the next generation of AI conversation. Ask anything, from
          simple questions to complex problems.
        </p>
      </div>

      {/* Chat Interface - Full Height */}
      <div className="flex-1 relative">
        <AiGenerator />
      </div>

      {/* Add required keyframes for blob animation */}
      <style jsx global>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </main>
  );
}
