import { Button } from '@/components/ui/button';
import { Film, Menu, X } from 'lucide-react';
import { Link, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { useIsAdmin } from '../hooks/useQueries';
import { OfflineIndicator } from './OfflineIndicator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const { data: isAdmin = false } = useIsAdmin();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const isAuthenticated = !!identity;
  const disabled = loginStatus === 'logging-in';
  const buttonText = loginStatus === 'logging-in' ? 'Logging in...' : isAuthenticated ? 'Logout' : 'Login';

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
    { label: 'Kids Zone', path: '/kids-zone' },
    { label: 'Podcasts', path: '/podcasts-radio' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-zinc-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <img 
              src="/assets/generated/app-logo.dim_512x512.png" 
              alt="TamriStream" 
              className="w-10 h-10"
            />
            <span className="text-xl font-bold bg-gradient-to-r from-amber-500 to-amber-300 bg-clip-text text-transparent">
              TamriStream
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="px-4 py-2 text-sm font-medium text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
              >
                {item.label}
              </Link>
            ))}
            
            {isAdmin && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-amber-500 hover:text-amber-400 hover:bg-zinc-800">
                    Admin
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem onClick={() => navigate({ to: '/admin-approval' })}>
                    Content Approval
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate({ to: '/admin-partnership' })}>
                    Partnership Applications
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate({ to: '/reviewer-dashboard' })}>
                    Reviewer Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate({ to: '/diagnostics' })}>
                    Diagnostics
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            <OfflineIndicator />
            
            {isAuthenticated && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate({ to: '/profile' })}
                className="hidden md:flex text-zinc-300 hover:text-white"
              >
                Profile
              </Button>
            )}

            <Button
              onClick={handleAuth}
              disabled={disabled}
              size="sm"
              className={`${
                isAuthenticated
                  ? 'bg-zinc-800 hover:bg-zinc-700 text-white'
                  : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-semibold'
              }`}
            >
              {buttonText}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-zinc-800">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="px-4 py-3 text-sm font-medium text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              
              {isAuthenticated && (
                <Link
                  to="/profile"
                  className="px-4 py-3 text-sm font-medium text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Profile
                </Link>
              )}

              {isAdmin && (
                <>
                  <div className="px-4 py-2 text-xs font-semibold text-amber-500 uppercase">Admin</div>
                  <Link
                    to="/admin-approval"
                    className="px-4 py-3 text-sm font-medium text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Content Approval
                  </Link>
                  <Link
                    to="/admin-partnership"
                    className="px-4 py-3 text-sm font-medium text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Partnership Applications
                  </Link>
                  <Link
                    to="/reviewer-dashboard"
                    className="px-4 py-3 text-sm font-medium text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Reviewer Dashboard
                  </Link>
                  <Link
                    to="/diagnostics"
                    className="px-4 py-3 text-sm font-medium text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Diagnostics
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
