import type { Metadata } from "next";

interface MetadataProps {
  title?: string;
  description?: string;
  keywords?: string[];
  path?: string;
  image?: string;
  structuredData?: Record<string, any>;
  baseTitle?: string;
}

export function generateMetadata({
  title,
  description,
  keywords = [],
  path = "",
  image = "/Nova_GLS_logo.png",
  structuredData,
  baseTitle = "NOVA Academy",
}: MetadataProps): Metadata {
  const baseDescription = "Learn tech skills from industry experts";
  const baseUrl = "https://novaacademy.vercel.app";

  return {
    title: title ? `${title} | ${baseTitle}` : baseTitle,
    description: description || baseDescription,
    keywords: ["tech education", "online courses", "programming", ...keywords],
    openGraph: {
      title: title ? `${title} | ${baseTitle}` : baseTitle,
      description: description || baseDescription,
      url: `${baseUrl}${path}`,
      siteName: baseTitle,
      locale: "en_US",
      type: "website",
      images: image ? [image] : [],
    },
    twitter: {
      card: "summary_large_image",
      images: image ? [image] : [],
      title: title ? `${title} | ${baseTitle}` : baseTitle,
      description: description || baseDescription,
    },
    robots: {
      index: true,
      follow: true,
    },
    icons: {
      icon: "/favicon.ico",
    },
    other: {
      "script:ld+json": JSON.stringify(structuredData),
    },
  };
}
