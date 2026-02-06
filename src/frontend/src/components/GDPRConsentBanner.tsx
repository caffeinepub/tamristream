import { useState, useEffect } from 'react';
import { Shield, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function GDPRConsentBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('gdpr-consent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('gdpr-consent', 'accepted');
    localStorage.setItem('gdpr-consent-date', new Date().toISOString());
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem('gdpr-consent', 'declined');
    localStorage.setItem('gdpr-consent-date', new Date().toISOString());
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 border-blue-600 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            <Shield className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Your Privacy Matters
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                We use cookies and similar technologies to enhance your experience, analyze usage, and provide personalized recommendations. 
                By clicking "Accept All", you consent to our use of cookies. You can manage your preferences or learn more in our{' '}
                <a href="/privacy-policy" className="text-blue-600 hover:underline font-medium">
                  Privacy Policy
                </a>
                {' '}and{' '}
                <a href="/terms-of-service" className="text-blue-600 hover:underline font-medium">
                  Terms of Service
                </a>.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button
              onClick={handleDecline}
              variant="outline"
              className="flex-1 sm:flex-none"
            >
              Decline
            </Button>
            <Button
              onClick={handleAccept}
              className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700"
            >
              Accept All
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
