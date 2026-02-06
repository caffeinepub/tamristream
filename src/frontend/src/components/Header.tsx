import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useIsAdmin } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Menu, Wallet, TrendingUp, Upload, Film, Sparkles, Coins, Gift } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate, useRouterState } from '@tanstack/react-router';

export function Header() {
  const { clear, identity } = useInternetIdentity();
  const { data: isAdmin } = useIsAdmin();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const routerState = useRouterState();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isAuthenticated = !!identity;
  const currentPath = routerState.location.pathname;

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
    navigate({ to: '/' });
  };

  const handleNavClick = (path: string) => {
    navigate({ to: path });
    setMobileMenuOpen(false);
  };

  const isActive = (path: string) => currentPath === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-zinc-800" role="banner">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 sm:space-x-3 cursor-pointer" 
            onClick={() => handleNavClick('/')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleNavClick('/');
              }
            }}
            aria-label="TamriStream home"
          >
            <img 
              src="/assets/generated/app-logo.png" 
              alt="TamriStream logo - African streaming platform" 
              loading="eager"
              className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
            />
            <span className="text-lg sm:text-xl font-bold text-white hidden sm:inline" aria-label="TamriStream">TamriStream</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8" role="navigation" aria-label="Main navigation">
            <button
              onClick={() => handleNavClick('/movies')}
              className={`text-sm font-medium transition-colors hover:text-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-black rounded px-2 py-1 ${
                isActive('/movies') ? 'text-amber-500' : 'text-white'
              }`}
              aria-current={isActive('/movies') ? 'page' : undefined}
            >
              Movies
            </button>
            <button
              onClick={() => handleNavClick('/sports')}
              className={`text-sm font-medium transition-colors hover:text-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-black rounded px-2 py-1 ${
                isActive('/sports') ? 'text-amber-500' : 'text-white'
              }`}
              aria-current={isActive('/sports') ? 'page' : undefined}
            >
              Sports
            </button>
            <button
              onClick={() => handleNavClick('/music')}
              className={`text-sm font-medium transition-colors hover:text-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-black rounded px-2 py-1 ${
                isActive('/music') ? 'text-amber-500' : 'text-white'
              }`}
              aria-current={isActive('/music') ? 'page' : undefined}
            >
              Music
            </button>
            <button
              onClick={() => handleNavClick('/podcasts-radio')}
              className={`text-sm font-medium transition-colors hover:text-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-black rounded px-2 py-1 ${
                isActive('/podcasts-radio') ? 'text-amber-500' : 'text-white'
              }`}
              aria-current={isActive('/podcasts-radio') ? 'page' : undefined}
            >
              Podcasts
            </button>
            <button
              onClick={() => handleNavClick('/kids-zone')}
              className={`text-sm font-medium transition-colors hover:text-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-black rounded px-2 py-1 ${
                isActive('/kids-zone') ? 'text-amber-500' : 'text-white'
              }`}
              aria-current={isActive('/kids-zone') ? 'page' : undefined}
            >
              Kids
            </button>
            <button
              onClick={() => handleNavClick('/ai-personalization')}
              className={`text-sm font-medium transition-colors hover:text-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black rounded px-2 py-1 flex items-center space-x-1 ${
                isActive('/ai-personalization') ? 'text-purple-400' : 'text-white'
              }`}
              aria-current={isActive('/ai-personalization') ? 'page' : undefined}
            >
              <Sparkles className="w-4 h-4" />
              <span>AI</span>
            </button>
            <button
              onClick={() => handleNavClick('/audience-rewards')}
              className={`text-sm font-medium transition-colors hover:text-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-black rounded px-2 py-1 flex items-center space-x-1 relative ${
                isActive('/audience-rewards') ? 'text-amber-400' : 'text-white'
              }`}
              aria-current={isActive('/audience-rewards') ? 'page' : undefined}
            >
              <Coins className="w-4 h-4" />
              <span>Rewards</span>
              <Badge className="ml-1 bg-amber-500 text-black text-xs px-1 py-0">New</Badge>
            </button>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {isAuthenticated ? (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleNavClick('/enhanced-creator')}
                  className="hidden lg:inline-flex text-white hover:text-amber-500 hover:bg-zinc-900 text-sm focus:ring-2 focus:ring-amber-500"
                  aria-label="Creator analytics dashboard"
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Analytics
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleNavClick('/instant-withdrawal')}
                  className="hidden lg:inline-flex text-white hover:text-amber-500 hover:bg-zinc-900 text-sm focus:ring-2 focus:ring-amber-500"
                  aria-label="Withdraw earnings"
                >
                  <Wallet className="w-4 h-4 mr-2" />
                  Withdraw
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleNavClick('/upload')}
                  className="hidden lg:inline-flex text-white hover:text-amber-500 hover:bg-zinc-900 text-sm focus:ring-2 focus:ring-amber-500"
                  aria-label="Upload content"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleNavClick('/profile')}
                  className="hidden md:inline-flex text-white hover:text-amber-500 hover:bg-zinc-900 text-sm focus:ring-2 focus:ring-amber-500"
                  aria-label="View your profile"
                >
                  Profile
                </Button>
                {isAdmin && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleNavClick('/production-readiness')}
                    className="hidden xl:inline-flex text-white hover:text-amber-500 hover:bg-zinc-900 text-sm focus:ring-2 focus:ring-amber-500"
                    aria-label="Production readiness"
                  >
                    Go Live
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="hidden md:inline-flex text-white hover:text-amber-500 hover:bg-zinc-900 text-sm focus:ring-2 focus:ring-amber-500"
                  aria-label="Log out of your account"
                >
                  Logout
                </Button>
              </>
            ) : null}

            {/* Mobile Menu Button */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden text-white hover:text-amber-500 hover:bg-zinc-900 h-9 w-9 sm:h-10 sm:w-10 focus:ring-2 focus:ring-amber-500"
                  aria-label="Open navigation menu"
                  aria-expanded={mobileMenuOpen}
                  aria-controls="mobile-menu"
                >
                  <Menu className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
                </Button>
              </SheetTrigger>
              <SheetContent 
                side="right" 
                className="w-72 sm:w-80 bg-black border-zinc-800"
                id="mobile-menu"
                aria-label="Mobile navigation menu"
              >
                <div className="flex flex-col h-full">
                  {/* Mobile Menu Header */}
                  <div className="flex items-center justify-between mb-6 sm:mb-8">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <img 
                        src="/assets/generated/app-logo.png" 
                        alt="TamriStream logo" 
                        loading="eager"
                        className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
                      />
                      <span className="text-lg sm:text-xl font-bold text-white">TamriStream</span>
                    </div>
                  </div>

                  {/* Mobile Navigation */}
                  <nav className="flex flex-col space-y-3 sm:space-y-4 flex-1 overflow-y-auto" role="navigation" aria-label="Mobile navigation">
                    <button
                      onClick={() => handleNavClick('/movies')}
                      className={`text-left px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                        isActive('/movies')
                          ? 'bg-amber-500 text-black'
                          : 'text-white hover:bg-zinc-900'
                      }`}
                      aria-current={isActive('/movies') ? 'page' : undefined}
                    >
                      <Film className="w-4 h-4 inline mr-2" />
                      Movies
                    </button>
                    <button
                      onClick={() => handleNavClick('/sports')}
                      className={`text-left px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                        isActive('/sports')
                          ? 'bg-amber-500 text-black'
                          : 'text-white hover:bg-zinc-900'
                      }`}
                      aria-current={isActive('/sports') ? 'page' : undefined}
                    >
                      Sports
                    </button>
                    <button
                      onClick={() => handleNavClick('/music')}
                      className={`text-left px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                        isActive('/music')
                          ? 'bg-amber-500 text-black'
                          : 'text-white hover:bg-zinc-900'
                      }`}
                      aria-current={isActive('/music') ? 'page' : undefined}
                    >
                      Music
                    </button>
                    <button
                      onClick={() => handleNavClick('/podcasts-radio')}
                      className={`text-left px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                        isActive('/podcasts-radio')
                          ? 'bg-amber-500 text-black'
                          : 'text-white hover:bg-zinc-900'
                      }`}
                      aria-current={isActive('/podcasts-radio') ? 'page' : undefined}
                    >
                      Podcasts & Radio
                    </button>
                    <button
                      onClick={() => handleNavClick('/kids-zone')}
                      className={`text-left px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                        isActive('/kids-zone')
                          ? 'bg-amber-500 text-black'
                          : 'text-white hover:bg-zinc-900'
                      }`}
                      aria-current={isActive('/kids-zone') ? 'page' : undefined}
                    >
                      Kids Zone
                    </button>

                    <div className="border-t border-zinc-800 my-2 sm:my-4" role="separator" />

                    <button
                      onClick={() => handleNavClick('/ai-personalization')}
                      className={`text-left px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                        isActive('/ai-personalization')
                          ? 'bg-purple-600 text-white'
                          : 'text-white hover:bg-zinc-900'
                      }`}
                      aria-current={isActive('/ai-personalization') ? 'page' : undefined}
                    >
                      <Sparkles className="w-4 h-4 inline mr-2" />
                      AI Personalization
                    </button>

                    <button
                      onClick={() => handleNavClick('/audience-rewards')}
                      className={`text-left px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 relative ${
                        isActive('/audience-rewards')
                          ? 'bg-amber-500 text-black'
                          : 'text-white hover:bg-zinc-900'
                      }`}
                      aria-current={isActive('/audience-rewards') ? 'page' : undefined}
                    >
                      <Coins className="w-4 h-4 inline mr-2" />
                      Audience Rewards
                      <Badge className="ml-2 bg-amber-500 text-black text-xs px-1 py-0">New</Badge>
                    </button>

                    {isAuthenticated && (
                      <>
                        <div className="border-t border-zinc-800 my-2 sm:my-4" role="separator" />
                        
                        <button
                          onClick={() => handleNavClick('/enhanced-creator')}
                          className={`text-left px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                            isActive('/enhanced-creator')
                              ? 'bg-amber-500 text-black'
                              : 'text-white hover:bg-zinc-900'
                          }`}
                          aria-current={isActive('/enhanced-creator') ? 'page' : undefined}
                        >
                          <TrendingUp className="w-4 h-4 inline mr-2" />
                          Creator Analytics
                        </button>
                        
                        <button
                          onClick={() => handleNavClick('/instant-withdrawal')}
                          className={`text-left px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                            isActive('/instant-withdrawal')
                              ? 'bg-amber-500 text-black'
                              : 'text-white hover:bg-zinc-900'
                          }`}
                          aria-current={isActive('/instant-withdrawal') ? 'page' : undefined}
                        >
                          <Wallet className="w-4 h-4 inline mr-2" />
                          Withdraw Earnings
                        </button>

                        <button
                          onClick={() => handleNavClick('/upload')}
                          className={`text-left px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                            isActive('/upload')
                              ? 'bg-amber-500 text-black'
                              : 'text-white hover:bg-zinc-900'
                          }`}
                          aria-current={isActive('/upload') ? 'page' : undefined}
                        >
                          <Upload className="w-4 h-4 inline mr-2" />
                          Upload Content
                        </button>
                      </>
                    )}

                    <div className="border-t border-zinc-800 my-2 sm:my-4" role="separator" />

                    <button
                      onClick={() => handleNavClick('/business-model')}
                      className={`text-left px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                        isActive('/business-model')
                          ? 'bg-amber-500 text-black'
                          : 'text-white hover:bg-zinc-900'
                      }`}
                      aria-current={isActive('/business-model') ? 'page' : undefined}
                    >
                      About
                    </button>
                    <button
                      onClick={() => handleNavClick('/payment-options')}
                      className={`text-left px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                        isActive('/payment-options')
                          ? 'bg-amber-500 text-black'
                          : 'text-white hover:bg-zinc-900'
                      }`}
                      aria-current={isActive('/payment-options') ? 'page' : undefined}
                    >
                      Support
                    </button>

                    {isAuthenticated && (
                      <>
                        <div className="border-t border-zinc-800 my-2 sm:my-4" role="separator" />
                        <button
                          onClick={() => handleNavClick('/profile')}
                          className={`text-left px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                            isActive('/profile')
                              ? 'bg-amber-500 text-black'
                              : 'text-white hover:bg-zinc-900'
                          }`}
                          aria-current={isActive('/profile') ? 'page' : undefined}
                        >
                          Profile
                        </button>
                        {isAdmin && (
                          <>
                            <button
                              onClick={() => handleNavClick('/admin-approval')}
                              className="text-left px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-medium text-white hover:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                              aria-label="Admin approval dashboard"
                            >
                              Admin Dashboard
                            </button>
                            <button
                              onClick={() => handleNavClick('/bulk-upload')}
                              className="text-left px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-medium text-white hover:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                              aria-label="Bulk upload movies"
                            >
                              Bulk Upload
                            </button>
                            <button
                              onClick={() => handleNavClick('/reviewer-dashboard')}
                              className="text-left px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-medium text-white hover:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                              aria-label="Reviewer dashboard"
                            >
                              Reviewer Dashboard
                            </button>
                            <button
                              onClick={() => handleNavClick('/production-readiness')}
                              className="text-left px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-medium text-white hover:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                              aria-label="Production readiness check"
                            >
                              Production Readiness
                            </button>
                          </>
                        )}
                      </>
                    )}
                  </nav>

                  {/* Mobile Auth Buttons */}
                  <div className="border-t border-zinc-800 pt-3 sm:pt-4 space-y-2 sm:space-y-3">
                    {isAuthenticated ? (
                      <Button
                        onClick={handleLogout}
                        className="w-full bg-zinc-900 text-white hover:bg-zinc-800 text-sm sm:text-base focus:ring-2 focus:ring-amber-500"
                        aria-label="Log out of your account"
                      >
                        Logout
                      </Button>
                    ) : null}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

