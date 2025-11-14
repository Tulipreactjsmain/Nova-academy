import { Layout, EclipseCirclesLayout, Nav } from "@/app/components";
import { generateMetadata } from "@/app/utils/generateMetadata";
import formatDate from "@/app/utils/formatDate";

export const metadata = generateMetadata({
  title: "Privacy Policy",
  description:
    "Privacy Policy for NOVA Academy - Your trusted platform for tech education",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <Nav navbarIsColored={true} />
      <EclipseCirclesLayout midLeftEclipse1 midRightEclipse2>
        <Layout>
          <div className="prose py-[4.25rem] md:py-[8.5rem] prose-lg max-w-none prose-headings:text-blue-80 prose-p:text-blue-80 prose-li:text-blue-80 text-blue-80">
            <h1 className="text-5xl mb-12 pb-4 border-b-4 border-yellow-base">
              Privacy Policy
            </h1>

            <p className="text-sm mb-8">
              Last Updated: {formatDate(new Date().toLocaleDateString())}
            </p>

            <section className="mb-8">
              <h2>1. Introduction</h2>
              <p>
                At <strong>NOVA Global Learning Solutions</strong>, we
                prioritize the protection of your personal information. This
                Privacy Policy outlines how we handle your data when you
                purchase and enroll in our courses.
              </p>
            </section>

            <section className="mb-8">
              <h2>2. Information Collection</h2>
              <h3>2.1 Information You Provide</h3>
              <ul>
                <li>Basic contact information (name, email)</li>
                <li>Course enrollment details</li>
                <li>Communication preferences</li>
              </ul>

              <h3>2.2 Automatically Collected Information</h3>
              <ul>
                <li>Device information (IP address, browser type)</li>
                <li>Website usage data</li>
                <li>Technical logs for website functionality</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2>3. Third-Party Services</h2>
              <p>We partner with trusted service providers:</p>
              <ul>
                <li>
                  Paystack: Handles all payment processing. When making a
                  purchase, you will be directed to Paystack's secure platform.
                  Please review Paystack's privacy policy for details on how
                  they handle your payment information.
                </li>
                <li>
                  Learning Management System (LMS): Course content delivery and
                  learning activities are managed through our third-party LMS
                  provider. Upon enrollment, you will be subject to their terms
                  and privacy policy.
                </li>
                <li>Analytics services: To improve our website performance</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2>4. Use of Information</h2>
              <p>We use your information to:</p>
              <ul>
                <li>Process your course enrollments</li>
                <li>Provide access to our learning platform</li>
                <li>Send important course-related communications</li>
                <li>Improve our services and course offerings</li>
                <li>Respond to your inquiries and support requests</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2>5. Data Security</h2>
              <p>We implement security measures including:</p>
              <ul>
                <li>Secure website connections (SSL/TLS)</li>
                <li>Regular security assessments</li>
                <li>Limited access to personal information</li>
                <li>Careful selection of third-party service providers</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2>6. Your Privacy Rights</h2>
              <p>Under NDPR, you have the right to:</p>
              <ul>
                <li>Access your personal data we hold</li>
                <li>Request data correction</li>
                <li>Request data deletion</li>
                <li>Opt-out of marketing communications</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2>7. Data Retention</h2>
              <p>We retain your basic information for:</p>
              <ul>
                <li>Course enrollment records: 5 years</li>
                <li>Communication records: 2 years</li>
                <li>Website analytics: 1 year</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2>8. Cookies</h2>
              <p>Our website uses essential cookies to function properly.</p>
            </section>

            <section className="mb-8">
              <h2>9. Contact Us</h2>
              <p>For privacy concerns or requests:</p>
              <ul>
                <li>Email: hello@stardeliteacademy.com</li>
                <li>Phone: +234 810 454 6828</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2>10. Updates to This Policy</h2>
              <p>
                We may update this policy to reflect changes in our practices or
                services. Material changes will be communicated through our
                website or email.
              </p>
            </section>
          </div>
        </Layout>
      </EclipseCirclesLayout>
    </>
  );
}
