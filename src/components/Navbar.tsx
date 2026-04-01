// components/Navbar.tsx
'use client';

import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, ChevronDown, LogIn } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/store';
import { demoLoginOptions, type DemoLoginOption } from '@/lib/login-options';

const Navbar = () => {
  const router = useRouter();
  const { login } = useApp(); // Get login function from your auth context
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [loginDropdownOpen, setLoginDropdownOpen] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Scroll listener for nav shadow
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.login-dropdown')) {
        setLoginDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Close mobile menu when screen is resized to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLoginWithRole = async (option: DemoLoginOption) => {
    setIsLoggingIn(true);
    
    try {
      // Call the login function from your auth context
      const success = await login(option.email, option.password);
      
      if (success) {
        // Store user info in localStorage/sessionStorage if needed
        localStorage.setItem('userEmail', option.email);
        localStorage.setItem('userRole', option.role);
        
        // Navigate to the respective dashboard
        router.push(option.path);
        
        // Close dropdown and mobile menu
        setLoginDropdownOpen(false);
        setMobileMenuOpen(false);
      } else {
        // Handle login failure
        console.error('Login failed for:', option.email);
        // You might want to show a toast notification here
      }
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const navLinks = [
    { href: '#features', label: 'Features' },
    { href: '#how-it-works', label: 'How It Works' },
    { href: '#testimonials', label: 'Testimonials' }
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:scale-105 transition-transform">
              T
            </div>
            <span className="text-xl font-bold text-slate-800">
              Tap<span className="text-orange-500">2</span>Menu
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-600 hover:text-orange-500 transition-colors"
              >
                {link.label}
              </a>
            ))}
            
            {/* Login Dropdown */}
            {/* <div className="relative login-dropdown">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLoginDropdownOpen(!loginDropdownOpen);
                }}
                disabled={isLoggingIn}
                className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-orange-500 transition-colors disabled:opacity-50"
              >
                {isLoggingIn ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Logging in...
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    Login
                    <ChevronDown className={`w-4 h-4 transition-transform ${loginDropdownOpen ? 'rotate-180' : ''}`} />
                  </>
                )}
              </button>

              {loginDropdownOpen && !isLoggingIn && (
                <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-slate-100 overflow-hidden animate-fade-in-down">
                  <div className="p-2">
                    <div className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100 mb-1">
                      Demo Login Options
                    </div>
                    {demoLoginOptions.map((option) => {
                      const Icon = option.icon;
                      return (
                        <button
                          key={option.title}
                          onClick={() => handleLoginWithRole(option)}
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-orange-50 transition-colors group text-left"
                        >
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center shrink-0">
                            <Icon className="w-4 h-4 text-orange-600" />
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-semibold text-slate-800 group-hover:text-orange-600">
                              {option.title}
                            </div>
                            <div className="text-xs text-slate-500">
                              {option.description}
                            </div>
                            <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                              {option.email}
                            </div>
                          </div>
                          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-orange-500 group-hover:translate-x-1 transition-transform shrink-0" />
                        </button>
                      );
                    })}
                  </div>
                  <div className="bg-slate-50 px-3 py-2 border-t border-slate-100 space-y-2">
                    <Link
                      href="/login"
                      onClick={() => setLoginDropdownOpen(false)}
                      className="block text-center text-xs font-medium text-orange-600 hover:text-orange-700"
                    >
                      Open login page
                    </Link>
                    <div className="text-[10px] text-slate-500 text-center">
                      All demo accounts use password: <span className="font-mono text-orange-600 font-bold">admin123</span>
                    </div>
                  </div>
                </div>
              )}
            </div> */}

            <Link
              href="/login"
              className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:shadow-lg transition-all flex items-center gap-1.5"
            >
              Get Started <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl hover:bg-slate-100 transition-colors shrink-0"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-slate-700" /> : <Menu className="w-6 h-6 text-slate-700" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 animate-fade-in-down">
            <div className="bg-white rounded-2xl shadow-lg p-4 space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 rounded-xl text-sm font-medium text-slate-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              
              {/* Mobile Login Options */}
              {/* <div className="pt-2 border-t border-slate-100 mt-2">
                <div className="px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Demo Login
                </div>
                {demoLoginOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <button
                      key={option.title}
                      onClick={() => {
                        handleLoginWithRole(option);
                        setMobileMenuOpen(false);
                      }}
                      disabled={isLoggingIn}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-orange-50 transition-colors group disabled:opacity-50"
                    >
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-orange-600" />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="text-sm font-semibold text-slate-800">{option.title}</div>
                        <div className="text-xs text-slate-500">{option.description}</div>
                        <div className="text-[10px] text-slate-400 font-mono mt-0.5">{option.email}</div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-orange-500 shrink-0" />
                    </button>
                  );
                })}
                <div className="mt-3 px-4 py-2 bg-slate-50 rounded-lg">
                  <div className="text-[10px] text-slate-500 text-center">
                    Password: <span className="font-mono text-orange-600 font-bold">admin123</span>
                  </div>
                </div>
              </div> */}

              <div className="pt-2">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block bg-gradient-to-r from-orange-500 to-amber-500 text-white text-center px-4 py-3 rounded-xl font-semibold"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.2s ease-out;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;