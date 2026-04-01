// components/Footer.tsx
'use client';

import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    {
      title: 'Product',
      links: [
        { label: 'Features', href: '#features' },
        { label: 'How It Works', href: '#how-it-works' },
        { label: 'Pricing', href: '#pricing' },
        { label: 'FAQ', href: '#faq' }
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Blog', href: '/blog' },
        { label: 'Careers', href: '/careers' },
        { label: 'Contact', href: '/contact' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { label: 'Documentation', href: '/docs' },
        { label: 'API Reference', href: '/api' },
        { label: 'Support', href: '/support' },
        { label: 'Status', href: '/status' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
        { label: 'Cookie Policy', href: '/cookies' },
        { label: 'GDPR', href: '/gdpr' }
      ]
    }
  ];

  return (
    <footer className="bg-slate-950 pt-16 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Logo and Description */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 group mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center text-white font-bold text-base shadow-md group-hover:scale-105 transition-transform">
                T
              </div>
              <span className="text-lg font-bold text-slate-300">
                Tap<span className="text-orange-500">2</span>Menu
              </span>
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed mb-4">
              Transform your restaurant experience with our all-in-one QR code ordering platform.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-orange-500 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-orange-500 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.682-.103-.253-.447-1.27.098-2.646 0 0 .84-.269 2.75 1.025.8-.223 1.65-.334 2.5-.334.85 0 1.7.111 2.5.334 1.91-1.294 2.75-1.025 2.75-1.025.545 1.376.201 2.393.099 2.646.64.698 1.03 1.591 1.03 2.682 0 3.841-2.337 4.687-4.565 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-orange-500 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.979 0 1.771-.773 1.771-1.729V1.729C24 .774 23.204 0 22.225 0z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section) => (
            <div key={section.title} className="lg:col-span-1">
              <h3 className="text-sm font-semibold text-white mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-orange-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-slate-800 py-8 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-white font-semibold mb-1">Subscribe to our newsletter</h3>
              <p className="text-sm text-slate-500">Get the latest updates and offers</p>
            </div>
            <form className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 transition-colors w-full sm:w-64"
                aria-label="Email for newsletter"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <div className="text-center md:text-left">
              <p className="text-xs text-slate-500">
                © {currentYear} Tap2Menu. All rights reserved.
              </p>
              <p className="text-xs text-slate-600 mt-1">
                Built with Next.js & Tailwind CSS
              </p>
            </div>

            {/* Payment Methods */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-500">Payment Methods:</span>
              <div className="flex items-center gap-2">
                <svg className="w-8 h-6" viewBox="0 0 38 24" fill="none">
                  <rect width="38" height="24" rx="4" fill="white" />
                  <path d="M9 8h20v8H9z" fill="#142688" />
                  <path d="M15 12c0-1.5.8-2.8 2-3.5-1.2-.7-2.6-.7-3.8 0-1.2.7-2 2-2 3.5s.8 2.8 2 3.5c1.2.7 2.6.7 3.8 0-1.2-.7-2-2-2-3.5z" fill="#F9A000" />
                </svg>
                <svg className="w-8 h-6" viewBox="0 0 38 24" fill="none">
                  <rect width="38" height="24" rx="4" fill="white" />
                  <circle cx="12" cy="12" r="6" fill="#EB001B" />
                  <circle cx="26" cy="12" r="6" fill="#F79E1B" />
                  <path d="M19 16c1.5-1.1 2.5-2.8 2.5-4s-1-2.9-2.5-4c-1.5 1.1-2.5 2.8-2.5 4s1 2.9 2.5 4z" fill="#FF5F00" />
                </svg>
              </div>
            </div>

            {/* Language Selector */}
            <div className="flex items-center gap-2">
              <button className="text-xs text-slate-500 hover:text-orange-400 transition-colors">
                English
              </button>
              <span className="text-slate-700">|</span>
              <button className="text-xs text-slate-500 hover:text-orange-400 transition-colors">
                Español
              </button>
              <span className="text-slate-700">|</span>
              <button className="text-xs text-slate-500 hover:text-orange-400 transition-colors">
                中文
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;