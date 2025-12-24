import { Link } from "react-router-dom";
import { MdPolicy } from "react-icons/md";

export default function PrivacyPolicy() {
  return (
    <div className="relative w-full min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white py-12 px-6 md:px-16 lg:px-32">

      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-md bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center text-sky-600 dark:text-sky-300">
            <MdPolicy className="text-2xl" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold">Privacy Policy</h1>
            <p className="mt-1 text-gray-600 dark:text-gray-300">How we collect, use and protect your information.</p>
          </div>
        </div>
      </div>

      {/* Intro Section */}
      <div className="max-w-4xl mx-auto mb-8">
        <p className="text-gray-700 dark:text-gray-300 text-lg md:text-xl leading-relaxed">
          Your privacy is important to us. This Privacy Policy explains what personal information we collect, how we use it, and the choices you have regarding your information when you use our website and services.
        </p>
      </div>

      {/* Sections */}
      <div className="max-w-4xl mx-auto space-y-8">
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">1. Information We Collect</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            We may collect personal information such as your name, email address, phone number, and other contact details when you sign up, request services, or contact us. We also collect non-personal information automatically using cookies and analytics to improve the site.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">2. How We Use Your Information</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            We use information to provide and improve services, respond to inquiries, process appointments and payments, and send important updates. We only share personal data with third parties when necessary to provide services or when required by law.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">3. Cookies and Tracking</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            We use cookies and similar technologies to recognize your preferences, personalize content, and analyze usage. You can control cookie settings in your browser, but disabling cookies may limit some site features.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">4. Data Security</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            We implement reasonable technical and organizational measures to protect data from unauthorized access, use, or disclosure. While we strive to secure your information, no system is completely secure.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">5. Third-Party Links</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Our site may link to third-party services. We are not responsible for their privacy practices. Please review their privacy policies before sharing personal information.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">6. Changes to This Policy</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            We may update this policy periodically. When we make changes, we will update the effective date and notify users where appropriate. Please check this page regularly for updates.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">7. Contact Us</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            If you have questions about this Privacy Policy, please <Link to="/contact" className="text-sky-600 dark:text-sky-300 hover:underline">contact us</Link> and we will respond promptly.
          </p>
        </section>
      </div>

      {/* Footer CTA */}
      <div className="max-w-4xl mx-auto mt-12">
        <Link
          to="/"
          className="inline-block bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 rounded-full font-semibold transition-transform transform hover:scale-105 shadow"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
