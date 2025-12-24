import { Link } from "react-router-dom";
import { MdGavel } from "react-icons/md";

export default function TermsOfUse() {
	return (
		<div className="relative w-full min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white py-12 px-6 md:px-16 lg:px-32">

			{/* Header */}
			<div className="max-w-4xl mx-auto mb-8">
				<div className="flex items-center gap-4">
					<div className="w-12 h-12 rounded-md bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center text-sky-600 dark:text-sky-300">
						<MdGavel className="text-2xl" />
					</div>
					<div>
						<h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold">Terms of Use</h1>
						<p className="mt-1 text-gray-600 dark:text-gray-300">Please read these terms carefully before using the site.</p>
					</div>
				</div>
			</div>

			{/* Intro */}
			<div className="max-w-4xl mx-auto mb-8">
				<p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
					Welcome to our website. By accessing or using our website, you agree to comply with and be bound by these Terms of Use. If you do not agree, please do not use the site.
				</p>
			</div>

			{/* Sections */}
			<div className="max-w-4xl mx-auto space-y-8">
				<section>
					<h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">1. Acceptance of Terms</h2>
					<p className="text-gray-700 dark:text-gray-300 leading-relaxed">By using this website you accept these terms and agree to comply with all applicable laws. Unauthorized or improper use may result in consequences.</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">2. Use of Website</h2>
					<p className="text-gray-700 dark:text-gray-300 leading-relaxed">You agree to use the website only for lawful purposes. You may not use the site to post or transmit any unlawful or harmful content.</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">3. Intellectual Property</h2>
					<p className="text-gray-700 dark:text-gray-300 leading-relaxed">All content on this site — including text, images, logos, and designs — is owned by or licensed to us. You may not reproduce or redistribute content without permission.</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">4. User Content</h2>
					<p className="text-gray-700 dark:text-gray-300 leading-relaxed">Any content you submit must comply with applicable laws and these terms. We reserve the right to remove or block content that violates these terms.</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">5. Limitation of Liability</h2>
					<p className="text-gray-700 dark:text-gray-300 leading-relaxed">The site is provided "as is" and we disclaim warranties to the extent permitted by law. We are not liable for indirect, incidental, or consequential damages arising from site use.</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">6. Third-Party Links</h2>
					<p className="text-gray-700 dark:text-gray-300 leading-relaxed">We may link to third-party sites. We are not responsible for their content or policies — please review them independently.</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">7. Changes to Terms</h2>
					<p className="text-gray-700 dark:text-gray-300 leading-relaxed">We may update these Terms occasionally. Continued use after changes indicates your acceptance; please review the page for updates.</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">8. Contact</h2>
					<p className="text-gray-700 dark:text-gray-300 leading-relaxed">If you have questions about these Terms, please <Link to="/contact" className="text-sky-600 dark:text-sky-300 hover:underline">contact us</Link>.</p>
				</section>
			</div>

			{/* CTA */}
			<div className="max-w-4xl mx-auto mt-12">
				<Link to="/" className="inline-block bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 rounded-full font-semibold transition-transform transform hover:scale-105 shadow">Back to Home</Link>
			</div>
		</div>
	);
}

