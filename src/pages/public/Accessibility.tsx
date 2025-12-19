import { Link } from "react-router-dom";
import { MdAccessibility } from "react-icons/md";

export default function Accessibility() {
  return (
    <div className="relative w-full min-h-screen bg-gray-900 text-white py-16 px-6 md:px-16 lg:px-32">

      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <MdAccessibility className="text-3xl text-sky-400" />
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold drop-shadow-lg">
          Accessibility Statement
        </h1>
      </div>

      {/* Intro Section */}
      <p className="text-gray-300 mb-8 text-lg md:text-xl leading-relaxed max-w-4xl">
        We are committed to ensuring that our website is accessible to all users, including those with disabilities. This page explains our efforts and guidelines for accessibility.
      </p>

      {/* Sections */}
      <div className="space-y-8 max-w-4xl text-gray-300">

        <section>
          <h2 className="text-2xl font-bold text-white mb-3 drop-shadow-md">
            1. Our Commitment
          </h2>
          <p className="leading-relaxed">
            We strive to make our website usable for everyone, following best practices and accessibility standards such as WCAG 2.1. Our goal is to provide equal access to all content and services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-3 drop-shadow-md">
            2. Accessibility Features
          </h2>
          <p className="leading-relaxed">
            Some of the features we have implemented include keyboard navigation, descriptive alt text for images, proper heading structure, sufficient color contrast, and resizable text.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-3 drop-shadow-md">
            3. Limitations
          </h2>
          <p className="leading-relaxed">
            While we work to make our website accessible, some content or third-party components may not fully conform to accessibility standards. We continuously improve our website to address these limitations.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-3 drop-shadow-md">
            4. Feedback
          </h2>
          <p className="leading-relaxed">
            We welcome feedback regarding accessibility. If you encounter any issues or have suggestions, please <Link to="/contact" className="text-sky-400 hover:underline">contact us</Link>. We aim to respond promptly and make improvements wherever possible.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-3 drop-shadow-md">
            5. Ongoing Efforts
          </h2>
          <p className="leading-relaxed">
            Accessibility is an ongoing effort. We regularly review our website, conduct accessibility testing, and implement changes to improve usability for all visitors.
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
