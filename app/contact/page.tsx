import { Nav } from "@/app/components";
import { generateMetadata } from "@/app/utils/generateMetadata";
import ContactForm from "@/app/features/contact/components/ContactForm";

export const metadata = generateMetadata({
  title: "Contact",
  description: "Contact us",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <Nav navbarIsColored={true} />
      <ContactForm />
    </>
  );
}
