import { useNavigate } from '@tanstack/react-router';
import { Heart, Shield, Lock } from 'lucide-react';
import { SiFacebook, SiX, SiInstagram, SiYoutube, SiLinkedin } from 'react-icons/si';

export default function Footer() {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate({ to: path });
  };

  return (
    <footer className="bg-zinc-950 text-white py-12 px-4 sm:px-6 lg:px-8 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-amber-500">Company</h3>
            <ul className="space-y-2">
              <li>
                <button onClick={() => handleNavigation('/business-model')} className="text-gray-300 hover:text-amber-500 transition-colors text-left">
                  About Us
                </button>
              </li>
              <li>
                <a href="mailto:contact@tamristream.com" className="text-gray-300 hover:text-amber-500 transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <button onClick={() => handleNavigation('/privacy')} className="text-gray-300 hover:text-amber-500 transition-colors text-left">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigation('/terms')} className="text-gray-300 hover:text-amber-500 transition-colors text-left">
                  Terms of Service
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-amber-500">Content</h3>
            <ul className="space-y-2">
              <li>
                <button onClick={() => handleNavigation('/movies')} className="text-gray-300 hover:text-amber-500 transition-colors text-left">
                  Movies
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigation('/music')} className="text-gray-300 hover:text-amber-500 transition-colors text-left">
                  Music
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigation('/sports')} className="text-gray-300 hover:text-amber-500 transition-colors text-left">
                  Sports
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigation('/podcasts-radio')} className="text-gray-300 hover:text-amber-500 transition-colors text-left">
                  Podcasts & Radio
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigation('/kids-zone')} className="text-gray-300 hover:text-amber-500 transition-colors text-left">
                  Kids Zone
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-amber-500">Creators</h3>
            <ul className="space-y-2">
              <li>
                <button onClick={() => handleNavigation('/creator-portal')} className="text-gray-300 hover:text-amber-500 transition-colors text-left">
                  Creator Portal
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigation('/upload')} className="text-gray-300 hover:text-amber-500 transition-colors text-left">
                  Upload Content
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigation('/creator-academy')} className="text-gray-300 hover:text-amber-500 transition-colors text-left">
                  Creator Academy
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigation('/enhanced-creator')} className="text-gray-300 hover:text-amber-500 transition-colors text-left">
                  Analytics Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigation('/instant-withdrawal')} className="text-gray-300 hover:text-amber-500 transition-colors text-left">
                  Instant Payouts
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-amber-500">Follow Us</h3>
            <div className="flex space-x-4 mb-4">
              <a
                href="https://twitter.com/tamristream"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-amber-500 transition-colors"
                aria-label="Twitter"
              >
                <SiX className="w-6 h-6" />
              </a>
              <a
                href="https://facebook.com/tamristream"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-amber-500 transition-colors"
                aria-label="Facebook"
              >
                <SiFacebook className="w-6 h-6" />
              </a>
              <a
                href="https://instagram.com/tamristream"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-amber-500 transition-colors"
                aria-label="Instagram"
              >
                <SiInstagram className="w-6 h-6" />
              </a>
              <a
                href="https://youtube.com/tamristream"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-amber-500 transition-colors"
                aria-label="YouTube"
              >
                <SiYoutube className="w-6 h-6" />
              </a>
              <a
                href="https://linkedin.com/company/tamristream"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-amber-500 transition-colors"
                aria-label="LinkedIn"
              >
                <SiLinkedin className="w-6 h-6" />
              </a>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Shield className="w-4 h-4 text-green-500" />
                <span>HTTPS/SSL Encrypted</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Lock className="w-4 h-4 text-green-500" />
                <span>GDPR Compliant</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-800 pt-8">
          <div className="text-center mb-4">
            <p className="text-gray-400 text-sm flex items-center justify-center gap-2 flex-wrap">
              © 2025 TamriStream. All rights reserved. Built with <Heart className="w-4 h-4 text-red-500 inline" /> for African creators
            </p>
          </div>
          <div className="text-center space-y-2">
            <p className="text-gray-500 text-xs flex items-center justify-center gap-2">
              <Shield className="w-3 h-3 text-green-500" />
              All content is encrypted and transmitted securely via HTTPS/SSL
            </p>
            <p className="text-gray-500 text-xs">
              Powered by Internet Computer blockchain for decentralized, secure streaming
            </p>
            <p className="text-gray-500 text-xs">
              GDPR Compliant • Privacy Protected • 70-90% Creator Revenue Share
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
