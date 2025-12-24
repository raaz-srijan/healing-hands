import { Link } from "react-router-dom";
import { MdAccessibility } from "react-icons/md";

export default function Accessibility() {
  return (
    <div className="relative w-full min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white py-12 px-6 md:px-16 lg:px-32">

      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-md bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center text-sky-600 dark:text-sky-300">
            <MdAccessibility className="text-2xl" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold">Accessibility Statement</h1>
            <p className="mt-1 text-gray-600 dark:text-gray-300">Our commitment to accessibility and how we support all users.</p>
          </div>
        </div>
      </div>

      {/* Intro */}
      <div className="max-w-4xl mx-auto mb-8">
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
          We are committed to ensuring our website is usable for everyone, including people with disabilities. This statement outlines our accessibility practices and how to provide feedback.
        </p>
      </div>

      {/* Sections */}
      <div className="max-w-4xl mx-auto space-y-8">
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">1. Our Commitment</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">We strive to meet WCAG 2.1 standards where feasible and continually improve the accessibility of our content and services.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">2. Accessibility Features</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Features include keyboard navigation, meaningful alt text for images, proper headings, sufficient color contrast, and resizable text. We test using automated tools and manual reviews.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">3. Limitations</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Some third-party content or embedded components may not fully conform to accessibility standards. We are working with vendors and updating integrations as improvements become available.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">4. Feedback</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">If you encounter accessibility barriers, please <Link to="/contact" className="text-sky-600 dark:text-sky-300 hover:underline">contact us</Link>. Provide details of the issue and your preferred contact method; we aim to respond promptly and provide accessible alternatives where possible.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">5. Ongoing Efforts</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Accessibility is an ongoing process. We regularly review our site, update content, and perform accessibility testing to improve usability for all visitors.</p>
        </section>
      </div>

      {/* CTA */}
      <div className="max-w-4xl mx-auto mt-12">
        <Link to="/" className="inline-block bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 rounded-full font-semibold transition-transform transform hover:scale-105 shadow">Back to Home</Link>
      </div>
    </div>
  );
}
