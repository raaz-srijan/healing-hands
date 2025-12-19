import { Link } from "react-router-dom";
import { MdPolicy } from "react-icons/md";

export default function PrivacyPolicy() {
  return (
    <div className="relative w-full min-h-screen bg-gray-900 text-white py-16 px-6 md:px-16 lg:px-32">
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <MdPolicy className="text-3xl text-sky-400" />
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold drop-shadow-lg">
          Privacy Policy
        </h1>
      </div>

      {/* Intro Section */}
      <p className="text-gray-300 mb-8 text-lg md:text-xl leading-relaxed max-w-4xl">
        Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you visit or use our website.
      </p>

      {/* Sections */}
      <div className="space-y-8 max-w-4xl text-gray-300">
        <section>
          <h2 className="text-2xl font-bold text-white mb-3 drop-shadow-md">
            1. Information We Collect
          </h2>
          <p className="leading-relaxed">
            We may collect personal information such as your name, email address, and contact details when you use our services or contact us. We also collect non-personal information automatically through cookies and analytics.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-3 drop-shadow-md">
            2. How We Use Your Information
          </h2>
          <p className="leading-relaxed">
            We use your information to provide and improve our services, respond to inquiries, send updates or promotions, and ensure a secure experience on our website.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-3 drop-shadow-md">
            3. Cookies and Tracking
          </h2>
          <p className="leading-relaxed">
            Our website uses cookies to enhance your experience, analyze traffic, and remember your preferences. You can manage or disable cookies in your browser settings.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-3 drop-shadow-md">
            4. Data Security
          </h2>
          <p className="leading-relaxed">
            We implement reasonable security measures to protect your personal information from unauthorized access, disclosure, or alteration. However, no method is completely secure.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-3 drop-shadow-md">
            5. Third-Party Links
          </h2>
          <p className="leading-relaxed">
            Our website may contain links to third-party websites. We are not responsible for their privacy practices. We encourage you to review their privacy policies before providing personal information.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-3 drop-shadow-md">
            6. Changes to This Policy
          </h2>
          <p className="leading-relaxed">
            We may update this Privacy Policy from time to time. Changes will be posted on this page with the effective date. Please review this policy periodically.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-3 drop-shadow-md">
            7. Contact Us
          </h2>
          <p className="leading-relaxed">
            If you have questions about this Privacy Policy, please <Link to="/contact" className="text-sky-400 hover:underline">contact us</Link>.
          </p>
        </section>
      </div>

      {/* Footer CTA */}
      <div className="mt-12">
        <Link
          to="/"
          className="inline-block bg-sky-600 hover:bg-sky-700 text-white px-8 py-4 rounded-full font-bold transition-all transform hover:scale-105 shadow-lg shadow-sky-900/20"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
