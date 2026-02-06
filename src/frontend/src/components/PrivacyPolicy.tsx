import { Shield, Lock, Eye, Database, Globe, Mail } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Shield className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-lg text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Eye className="w-6 h-6 text-blue-600" />
              Introduction
            </h2>
            <p className="text-gray-700 leading-relaxed">
              TamriStream ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our African entertainment streaming platform. By using TamriStream, you agree to the collection and use of information in accordance with this policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Database className="w-6 h-6 text-blue-600" />
              Information We Collect
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-medium text-gray-800 mb-2">Personal Information</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>Authentication data through Internet Identity (decentralized identity)</li>
                  <li>User profile information (name, preferences)</li>
                  <li>Payment information for subscriptions and purchases</li>
                  <li>Creator information for content uploads</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-medium text-gray-800 mb-2">Usage Information</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>Content viewing and listening history</li>
                  <li>Search queries and preferences</li>
                  <li>Watch party participation and interactions</li>
                  <li>Ratings, reviews, and community contributions</li>
                  <li>Device information and browser type</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-medium text-gray-800 mb-2">Content You Provide</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>Uploaded movies, music, sports content, and podcasts</li>
                  <li>Reviews, comments, and video reviews</li>
                  <li>Messages and community interactions</li>
                  <li>Playlists and favorites</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Lock className="w-6 h-6 text-blue-600" />
              How We Use Your Information
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Provide and maintain our streaming services</li>
              <li>Process payments and manage subscriptions</li>
              <li>Personalize content recommendations using AI algorithms</li>
              <li>Enable social features like watch parties and messaging</li>
              <li>Calculate and distribute revenue to creators</li>
              <li>Improve our services and develop new features</li>
              <li>Communicate with you about updates and promotions</li>
              <li>Ensure platform security and prevent fraud</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Globe className="w-6 h-6 text-blue-600" />
              Data Sharing and Disclosure
            </h2>
            <div className="space-y-4">
              <p className="text-gray-700">We may share your information with:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li><strong>Service Providers:</strong> Payment processors (Stripe), cloud storage providers, and analytics services</li>
                <li><strong>Content Creators:</strong> Aggregated viewing data for revenue calculations (no personal identification)</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                <li><strong>Business Transfers:</strong> In connection with mergers or acquisitions</li>
              </ul>
              <p className="text-gray-700 font-medium">
                We do NOT sell your personal information to third parties.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Rights (GDPR Compliance)</h2>
            <div className="space-y-4">
              <p className="text-gray-700">If you are in the European Economic Area (EEA), you have the following rights:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li><strong>Right to Access:</strong> Request a copy of your personal data</li>
                <li><strong>Right to Rectification:</strong> Correct inaccurate or incomplete data</li>
                <li><strong>Right to Erasure:</strong> Request deletion of your personal data</li>
                <li><strong>Right to Restrict Processing:</strong> Limit how we use your data</li>
                <li><strong>Right to Data Portability:</strong> Receive your data in a structured format</li>
                <li><strong>Right to Object:</strong> Object to processing of your data</li>
                <li><strong>Right to Withdraw Consent:</strong> Withdraw consent at any time</li>
              </ul>
              <p className="text-gray-700 mt-4">
                To exercise these rights, please contact us at <a href="mailto:privacy@tamristream.com" className="text-blue-600 hover:underline">privacy@tamristream.com</a>
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Security</h2>
            <p className="text-gray-700 leading-relaxed">
              We implement industry-standard security measures to protect your data, including:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mt-2">
              <li>SSL/TLS encryption for all data transmission</li>
              <li>Secure authentication through Internet Identity</li>
              <li>Encrypted storage on the Internet Computer blockchain</li>
              <li>Regular security audits and updates</li>
              <li>Access controls and monitoring</li>
            </ul>
            <p className="text-gray-700 mt-4">
              However, no method of transmission over the internet is 100% secure. While we strive to protect your data, we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Retention</h2>
            <p className="text-gray-700 leading-relaxed">
              We retain your personal information for as long as necessary to provide our services and comply with legal obligations. When you delete your account, we will delete or anonymize your personal data within 30 days, except where we are required to retain it by law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Children's Privacy</h2>
            <p className="text-gray-700 leading-relaxed">
              Our Kids Zone is designed for children with parental supervision. We do not knowingly collect personal information from children under 13 without parental consent. Parents can manage their children's accounts through parental controls.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">International Data Transfers</h2>
            <p className="text-gray-700 leading-relaxed">
              Your data is stored on the Internet Computer blockchain, which is distributed globally. By using TamriStream, you consent to the transfer of your data to countries outside your residence, which may have different data protection laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Cookies and Tracking</h2>
            <p className="text-gray-700 leading-relaxed">
              We use cookies and similar technologies to enhance your experience, analyze usage, and provide personalized recommendations. You can manage cookie preferences through your browser settings. See our Cookie Policy for more details.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Changes to This Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the new policy on this page and updating the "Last updated" date. Your continued use of TamriStream after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Mail className="w-6 h-6 text-blue-600" />
              Contact Us
            </h2>
            <p className="text-gray-700 leading-relaxed">
              If you have questions about this Privacy Policy or wish to exercise your rights, please contact us:
            </p>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-700"><strong>Email:</strong> <a href="mailto:privacy@tamristream.com" className="text-blue-600 hover:underline">privacy@tamristream.com</a></p>
              <p className="text-gray-700 mt-2"><strong>Data Protection Officer:</strong> <a href="mailto:dpo@tamristream.com" className="text-blue-600 hover:underline">dpo@tamristream.com</a></p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
