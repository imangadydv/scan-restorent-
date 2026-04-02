'use client';

import { useState, useEffect } from 'react';
import {
  Zap,
  Building2,
  Star,
  ArrowRight,
  ShoppingCart,
  Users,
} from 'lucide-react';
import Feature from '@/components/Feature';
import HowItWorksSection from '@/components/HowItWorksSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import Footer from "@/componants/Footer";




const menuItems = [
  { name: 'Butter Chicken', price: 389, emoji: '\uD83C\uDF5B', category: 'Main Course' },
  { name: 'Paneer Tikka', price: 299, emoji: '\uD83E\uDD58', category: 'Starters' },
  { name: 'Hyderabadi Biryani', price: 369, emoji: '\uD83C\uDF5A', category: 'Rice' },
  { name: 'Dal Makhani', price: 279, emoji: '\uD83C\uDF72', category: 'Main Course' },
];

/* ------------------------------------------------------------------ */
/*  COMPONENT                                                          */
/* ------------------------------------------------------------------ */

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  // Scroll listener for nav shadow
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

 
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">

      {/* ============================================================ */}
      {/*  HERO SECTION                                                 */}
      {/* ============================================================ */}
      <section className="relative bg-linear-to-br from-orange-50 via-white to-amber-50 overflow-hidden pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Hero Text */}
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white shadow-md mb-8">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500"></span>
                </span>
                <span className="text-sm font-semibold text-slate-700">
                  #1 Restaurant QR Platform
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
                Transform Your{' '}
                <span className="block sm:inline">
                  Restaurant{' '}
                </span>
                <span className="bg-linear-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                  Experience
                </span>
              </h1>

              {/* Subtext */}
              <p className="text-lg sm:text-xl text-slate-500 mb-10 max-w-xl leading-relaxed">
                The all-in-one platform that lets customers scan, order, and pay
                from their phones. Boost revenue, cut wait times, and delight
                every guest.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 mb-14">
                <a
                  href="/login"
                  className="bg-linear-to-r from-orange-500 to-amber-500 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                >
                  Start Free Trial <ArrowRight className="w-5 h-5" />
                </a>
                <a
                  href="#how-it-works"
                  className="border-2 border-slate-200 text-slate-700 px-8 py-4 rounded-xl font-semibold hover:border-orange-500 hover:text-orange-500 transition-all flex items-center gap-2"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polygon points="10,8 16,12 10,16" fill="currentColor" stroke="none" />
                  </svg>
                  Watch Demo
                </a>
              </div>

              {/* Stats Row */}
              <div className="flex flex-wrap gap-6 sm:gap-10">
                {[
                  { value: '500+', label: 'Restaurants', icon: Building2 },
                  { value: '50K+', label: 'Orders Daily', icon: ShoppingCart },
                  { value: '99.9%', label: 'Uptime', icon: Zap },
                  { value: '4.9★', label: 'Rating', icon: Star },
                ].map((stat, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    {idx > 0 && (
                      <div className="hidden sm:block w-px h-10 bg-slate-200" />
                    )}
                    <div>
                      <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                        {stat.value}
                      </div>
                      <div className="text-xs sm:text-sm text-slate-400 font-medium">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Phone Mockup - Simplified to avoid overlap */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="relative w-full max-w-md mx-auto">
                {/* Phone Frame */}
                <div className="relative mx-auto w-[280px] h-[580px] bg-slate-900 rounded-[2.5rem] border-[6px] border-slate-800 shadow-2xl overflow-hidden">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-b-2xl z-30" />

                  {/* Screen */}
                  <div className="relative w-full h-full bg-white overflow-y-auto">
                    {/* Header */}
                    <div className="bg-linear-to-r from-orange-500 to-amber-500 px-4 pt-8 pb-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="text-white">
                          <div className="text-xs font-medium opacity-80">Welcome to</div>
                          <div className="text-base font-bold">Spice Garden</div>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                          <Users className="w-4 h-4 text-white" />
                        </div>
                      </div>
                      {/* Search Bar */}
                      <div className="bg-white/20 rounded-lg px-3 py-2 flex items-center gap-2">
                        <svg className="w-3.5 h-3.5 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <circle cx="11" cy="11" r="8" />
                          <path d="m21 21-4.35-4.35" />
                        </svg>
                        <span className="text-xs text-white/60">Search dishes...</span>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="p-3 space-y-2 pb-20">
                      {menuItems.map((item) => (
                        <div
                          key={item.name}
                          className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 hover:bg-orange-50/50 transition-colors"
                        >
                          <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-lg shrink-0">
                            {item.emoji}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-semibold text-slate-800 truncate">
                              {item.name}
                            </div>
                            <div className="text-xs text-slate-400">{item.category}</div>
                          </div>
                          <div className="text-right shrink-0">
                            <div className="text-sm font-bold text-slate-800">₹{item.price}</div>
                            <button className="w-6 h-6 rounded-md bg-linear-to-r from-orange-500 to-amber-500 flex items-center justify-center mt-0.5 ml-auto">
                              <span className="text-white text-xs font-bold">+</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Cart Bar */}
                    <div className="sticky bottom-0 p-3 bg-white border-t border-slate-100">
                      <div className="bg-linear-to-r from-orange-500 to-amber-500 text-white text-sm font-bold text-center py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg">
                        <ShoppingCart className="w-4 h-4" />
                        View Cart (3 items) - ₹1,057
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      < HowItWorksSection />
      < Feature /> 
      <TestimonialsSection />
      <Footer/>
      
    </div>
  );
}
