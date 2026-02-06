import { FileText, AlertCircle, Scale, Shield } from 'lucide-react';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <FileText className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-lg text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Scale className="w-6 h-6 text-blue-600" />
              Agreement to Terms
            </h2>
            <p className="text-gray-700 leading-relaxed">
              By accessing or using TamriStream, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Use License</h2>
            <div className="space-y-4">
              <p className="text-gray-700">Permission is granted to temporarily access TamriStream for personal, non-commercial use only. This license does not include:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Modifying or copying the materials</li>
                <li>Using the materials for commercial purposes</li>
                <li>Attempting to reverse engineer any software</li>
                <li>Removing copyright or proprietary notations</li>
                <li>Transferring materials to another person</li>
                <li>Using the service in any way that violates applicable laws</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">User Accounts</h2>
            <div className="space-y-4">
              <p className="text-gray-700">When you create an account with us, you must:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your Internet Identity credentials</li>
                <li>Notify us immediately of any unauthorized access</li>
                <li>Be responsible for all activities under your account</li>
                <li>Not share your account with others</li>
              </ul>
              <p className="text-gray-700 mt-4">
                We reserve the right to suspend or terminate accounts that violate these terms.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Subscription and Payments</h2>
            <div className="space-y-4">
              <h3 className="text-xl font-medium text-gray-800">Subscription Tiers</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Free tier with ad-supported content</li>
                <li>Premium subscription ($1-$3/month) with full access</li>
                <li>Pay-per-view for individual content</li>
              </ul>
              <h3 className="text-xl font-medium text-gray-800 mt-4">Payment Terms</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Subscriptions renew automatically unless cancelled</li>
                <li>Payments are processed securely through Stripe</li>
                <li>Refunds are subject to our refund policy</li>
                <li>Prices may change with 30 days notice</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Content Guidelines</h2>
            <div className="space-y-4">
              <h3 className="text-xl font-medium text-gray-800">User-Generated Content</h3>
              <p className="text-gray-700">When uploading content, you agree that:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>You own or have rights to the content</li>
                <li>Content does not violate copyright or intellectual property rights</li>
                <li>Content complies with our community guidelines</li>
                <li>Content is appropriate for the platform</li>
                <li>You grant us a license to display and distribute your content</li>
              </ul>
              <h3 className="text-xl font-medium text-gray-800 mt-4">Prohibited Content</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Illegal, harmful, or offensive material</li>
                <li>Content that infringes on others' rights</li>
                <li>Spam, malware, or malicious code</li>
                <li>False or misleading information</li>
                <li>Content that violates privacy rights</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Creator Revenue Sharing</h2>
            <div className="space-y-4">
              <p className="text-gray-700">For content creators:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Revenue sharing is transparent and clearly displayed</li>
                <li>Payouts are processed monthly through approved methods</li>
                <li>Creators retain ownership of their content</li>
                <li>Revenue calculations are based on views and engagement</li>
                <li>Minimum payout thresholds apply</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Intellectual Property</h2>
            <p className="text-gray-700 leading-relaxed">
              All content on TamriStream, including but not limited to text, graphics, logos, images, audio clips, video clips, and software, is the property of TamriStream or its content suppliers and is protected by international copyright laws. The compilation of all content is the exclusive property of TamriStream.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <AlertCircle className="w-6 h-6 text-blue-600" />
              Disclaimer
            </h2>
            <p className="text-gray-700 leading-relaxed">
              The materials on TamriStream are provided on an 'as is' basis. TamriStream makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Limitations of Liability</h2>
            <p className="text-gray-700 leading-relaxed">
              In no event shall TamriStream or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use TamriStream, even if TamriStream or an authorized representative has been notified orally or in writing of the possibility of such damage.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Privacy and Data Protection</h2>
            <p className="text-gray-700 leading-relaxed">
              Your use of TamriStream is also governed by our Privacy Policy. We are committed to protecting your personal data in compliance with GDPR and other applicable data protection laws. Please review our <a href="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</a> for detailed information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Termination</h2>
            <p className="text-gray-700 leading-relaxed">
              We may terminate or suspend your account and access to TamriStream immediately, without prior notice or liability, for any reason, including breach of these Terms. Upon termination, your right to use the service will immediately cease.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Governing Law</h2>
            <p className="text-gray-700 leading-relaxed">
              These terms shall be governed and construed in accordance with international law, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Changes to Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Shield className="w-6 h-6 text-blue-600" />
              Contact Information
            </h2>
            <p className="text-gray-700 leading-relaxed">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-700"><strong>Email:</strong> <a href="mailto:legal@tamristream.com" className="text-blue-600 hover:underline">legal@tamristream.com</a></p>
              <p className="text-gray-700 mt-2"><strong>Support:</strong> <a href="mailto:support@tamristream.com" className="text-blue-600 hover:underline">support@tamristream.com</a></p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
