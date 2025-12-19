import { Link } from "react-router-dom";
import { MdGavel } from "react-icons/md";

export default function TermsOfUse() {
  return (
    <div className="relative w-full min-h-screen bg-gray-900 text-white py-16 px-6 md:px-16 lg:px-32">

      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <MdGavel className="text-3xl text-sky-400" />
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold drop-shadow-lg">
          Terms of Use
        </h1>
      </div>

      {/* Intro Section */}
      <p className="text-gray-300 mb-8 text-lg md:text-xl leading-relaxed max-w-4xl">
        Welcome to our website. By accessing or using our website, you agree to comply with and be bound by the following Terms of Use. Please read them carefully.
      </p>

      {/* Sections */}
      <div className="space-y-8 max-w-4xl text-gray-300">
        
        <section>
          <h2 className="text-2xl font-bold text-white mb-3 drop-shadow-md">
            1. Acceptance of Terms
          </h2>
          <p className="leading-relaxed">
            By using this website, you agree to these Terms of Use. If you do not agree, please do not use the site.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-3 drop-shadow-md">
            2. Use of Website
          </h2>
          <p className="leading-relaxed">
            You agree to use the website only for lawful purposes and in accordance with all applicable laws. Unauthorized use may give rise to civil or criminal liability.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-3 drop-shadow-md">
            3. Intellectual Property
          </h2>
          <p className="leading-relaxed">
            All content, including text, images, logos, and designs, are the property of the website owner or its licensors. You may not reproduce, distribute, or create derivative works without permission.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-3 drop-shadow-md">
            4. User Content
          </h2>
          <p className="leading-relaxed">
            Any content you submit or post on this website must not violate any laws, rights of others, or these Terms of Use. We reserve the right to remove inappropriate content.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-3 drop-shadow-md">
            5. Limitation of Liability
          </h2>
          <p className="leading-relaxed">
            The website is provided "as is" without warranties of any kind. We are not liable for any damages arising from the use of this site, including direct, indirect, incidental, or consequential damages.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-3 drop-shadow-md">
            6. Third-Party Links
          </h2>
          <p className="leading-relaxed">
            The website may contain links to third-party websites. We are not responsible for their content or practices and encourage you to review their terms and policies.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-3 drop-shadow-md">
            7. Changes to Terms
          </h2>
          <p className="leading-relaxed">
            We may update these Terms of Use periodically. Updated terms will be posted on this page with the effective date. Your continued use of the site indicates acceptance of any changes.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-3 drop-shadow-md">
            8. Contact
          </h2>
          <p className="leading-relaxed">
            If you have any questions about these Terms, please <Link to="/contact" className="text-sky-400 hover:underline">contact us</Link>.
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
