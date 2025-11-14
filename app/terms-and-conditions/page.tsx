import { Layout, EclipseCirclesLayout, Nav } from "@/app/components";
import { generateMetadata } from "@/app/utils/generateMetadata";
import formatDate from "@/app/utils/formatDate";

export const metadata = generateMetadata({
  title: "Terms and Conditions",
  description:
    "Terms and Conditions for TechEd Nigeria - Your trusted platform for tech education",
  path: "/terms-and-conditions",
});

export default function TermsAndConditionsPage() {
  return (
    <>
      <Nav navbarIsColored={true} />
      <EclipseCirclesLayout midLeftEclipse1 midRightEclipse2>
        <Layout>
          <div className="prose  py-[4.25rem] md:py-[8.5rem] prose-lg max-w-none prose-headings:text-blue-80 prose-p:text-blue-80 prose-li:text-blue-80 text-blue-80">
            <h1 className="text-5xl mb-12 pb-4 border-b-4 border-yellow-base">
              Terms and Conditions
            </h1>

            <p className="text-gray-600">Last updated: {formatDate(new Date().toLocaleDateString())}</p>

            <section className="mb-8">
              <h2>1. Introduction</h2>
              <p>
                Welcome to NOVA Academy ("Platform", "we", "us", "our").
                By accessing or using our platform, you agree to be bound by
                these Terms and Conditions ("Terms").
              </p>
            </section>

            <section className="mb-8">
              <h2>2. Definitions</h2>
              <ul>
                <li>
                  "Course" means any educational content offered through our
                  platform
                </li>
                <li>
                  "User" means any person who accesses or uses the platform
                </li>
                <li>"Student" means any person enrolled in a course</li>
                <li>
                  "Instructor" means any person or entity providing educational
                  content
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2>3. Educational Services</h2>
              <h3>3.1 Course Enrollment</h3>
              <ul>
                <li>Payment is required before access to course content</li>
                <li>
                  Course slots are allocated on a first-come, first-served basis
                </li>
                <li>Multiple slots can be purchased for different users</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2>4. Payment Terms</h2>
              <h3>4.1 Pricing</h3>
              <ul>
                <li>All prices are in Nigerian Naira (NGN)</li>
                <li>Prices include all applicable taxes</li>
                <li>Payment processing is handled by Paystack</li>
              </ul>

              <h3>4.2 Refund Policy</h3>
              <ul>
                <li>No refunds are available</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2>5. User Obligations</h2>
              <p>Users agree to:</p>
              <ul>
                <li>Provide accurate registration information</li>
                <li>Maintain confidentiality of account credentials</li>
                <li>
                  Not share LMS (Learn Management System) access with
                  unauthorized users
                </li>
                <li>Comply with Nigerian cyber security laws</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2>6. Intellectual Property</h2>
              <h3>6.1 Content Ownership</h3>
              <ul>
                <li>
                  Course materials remain the property of respective instructors
                </li>
                <li>
                  Platform content is protected by Nigerian copyright laws
                </li>
                <li>Users may not reproduce or distribute course materials</li>
              </ul>
            </section>

            {/* <section className="mb-8">
              <h2>7. Privacy and Data Protection</h2>
              <p>We comply with:</p>
              <ul>
                <li>Nigeria Data Protection Regulation (NDPR)</li>
                <li>Cybercrime (Prohibition, Prevention, etc.) Act 2024</li>
                <li>All applicable privacy laws</li>
              </ul>
            </section> */}

            <section className="mb-8">
              <h2>8. Limitation of Liability</h2>
              <ul>
                <li>Platform is provided "as is" without warranties</li>
                <li>We are not liable for course content accuracy</li>
                <li>Maximum liability limited to amount paid for services</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2>9. Dispute Resolution</h2>
              <ul>
                <li>Disputes shall be resolved through Nigerian courts</li>
                <li>Lagos State shall have primary jurisdiction</li>
                <li>Mediation required before legal proceedings</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2>10. Termination</h2>
              <p>We reserve the right to:</p>
              <ul>
                <li>Terminate access for Terms violation</li>
                <li>Remove users violating platform policies</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2>11. Changes to Terms</h2>
              <ul>
                <li>We may modify these Terms at any time</li>
                <li>Users will be notified of significant changes</li>
                <li>Continued use constitutes acceptance of changes</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2>12. Contact Information</h2>
              <p>For inquiries contact:</p>
              <ul>
                <li>Email: hello@stardeliteacademy.com</li>

                <li>Phone: +234 810 454 6828</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2>13. Governing Law</h2>
              <p>
                These Terms are governed by the laws of the Federal Republic of
                Nigeria.
              </p>
            </section>
          </div>
        </Layout>
      </EclipseCirclesLayout>
    </>
  );
}
