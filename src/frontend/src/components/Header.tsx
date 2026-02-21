import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Film } from 'lucide-react';
import { useNavigate, useLocation } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const queryClient = useQueryClient();

  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === 'logging-in';

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [mobileMenuOpen]);

  const handleAuth = async () => {
    if (isAuthenticated) {
      await clear();
      queryClient.clear();
      navigate({ to: '/' });
    } else {
      try {
        await login();
      } catch (error: any) {
        console.error('Login error:', error);
        if (error.message === 'User is already authenticated') {
          await clear();
          setTimeout(() => login(), 300);
        }
      }
    }
  };

  const navItems = [
    { label: 'Movies', path: '/movies' },
    { label: 'Music', path: '/music-streaming' },
    { label: 'Sports', path: '/sports' },
    { label: 'Creator Portal', path: '/creator-portal' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-zinc-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => navigate({ to: '/' })}
            className="flex items-center gap-2 tap-target"
            aria-label="TamriStream Home"
          >
            <Film className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold gradient-text">TamriStream</span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate({ to: item.path })}
                className="tap-target text-sm font-medium hover:text-primary transition-colors"
                aria-label={item.label}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Desktop Auth Button */}
          <div className="hidden md:block">
            <Button
              onClick={handleAuth}
              disabled={isLoggingIn}
              className="tap-target"
              variant={isAuthenticated ? 'outline' : 'default'}
            >
              {isLoggingIn ? 'Logging in...' : isAuthenticated ? 'Logout' : 'Login'}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden tap-target p-2"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-black/98 z-40 overflow-y-auto scrollable">
          <nav className="container mx-auto px-4 py-6 space-y-4">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => {
                  navigate({ to: item.path });
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left tap-target px-4 py-3 rounded-lg hover:bg-zinc-800 transition-colors"
                aria-label={item.label}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-4 border-t border-zinc-800">
              <Button
                onClick={() => {
                  handleAuth();
                  setMobileMenuOpen(false);
                }}
                disabled={isLoggingIn}
                className="w-full tap-target"
                variant={isAuthenticated ? 'outline' : 'default'}
              >
                {isLoggingIn ? 'Logging in...' : isAuthenticated ? 'Logout' : 'Login'}
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
