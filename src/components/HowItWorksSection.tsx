// components/sections/HowItWorksSection.tsx
'use client';

import { Users, ShoppingCart, QrCode, Zap, Smartphone, CreditCard, Star, CheckCircle } from 'lucide-react';

interface Step {
  title: string;
  description: string;
  Icon: React.ComponentType<{ className?: string }>;
  detailedDescription?: string;
}

const HowItWorksSection = () => {
  const steps: Step[] = [
    {
      title: 'Sign Up',
      description: 'Create your restaurant account in minutes',
      detailedDescription: 'Get started with a free trial. No credit card required. Set up your restaurant profile, business hours, and more.',
      Icon: Users
    },
    {
      title: 'Set Up Menu',
      description: 'Upload your menu items and prices',
      detailedDescription: 'Add your dishes, descriptions, prices, and images. Organize by categories, add modifiers, and set special offers.',
      Icon: ShoppingCart
    },
    {
      title: 'Generate QR Codes',
      description: 'Get unique QR codes for each table',
      detailedDescription: 'Print or display QR codes for each table. Customers scan to view menu and order directly from their phones.',
      Icon: QrCode
    },
    {
      title: 'Start Serving',
      description: 'Launch and start receiving orders',
      detailedDescription: 'Go live and start receiving orders instantly. Track everything from your dashboard or kitchen display system.',
      Icon: Zap
    }
  ];

  const benefits = [
    {
      title: 'No App Required',
      description: 'Customers simply scan and order through their browser',
      icon: Smartphone
    },
    {
      title: 'Instant Updates',
      description: 'Update menu and prices in real-time',
      icon: Zap
    },
    {
      title: 'Secure Payments',
      description: 'Multiple payment options with bank-grade security',
      icon: CreditCard
    },
    {
      title: 'Customer Feedback',
      description: 'Collect ratings and reviews automatically',
      icon: Star
    }
  ];

  return (
    <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 pattern-dots pattern-slate-200 pattern-opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-100/20 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold mb-4">
            <CheckCircle className="w-4 h-4" /> 
            Simple Process
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-5">
            How It{' '}
            <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Get your restaurant up and running in minutes with our simple 4-step process.
            No technical expertise required.
          </p>
        </div>

        {/* Steps Timeline */}
        <div className="relative mb-20">
          {/* Desktop Connecting Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-200 via-amber-200 to-orange-200 transform -translate-y-1/2" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, idx) => {
              const StepIcon = step.Icon;
              return (
                <div key={idx} className="relative group">
                  {/* Step Number Badge */}
                  <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white text-lg font-bold flex items-center justify-center shadow-lg z-10 group-hover:scale-110 transition-transform">
                    {idx + 1}
                  </div>
                  
                  {/* Card */}
                  <div className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 group-hover:border-orange-200 h-full">
                    {/* Icon */}
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                      <StepIcon className="w-10 h-10 text-orange-600" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-orange-600 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-slate-500 leading-relaxed mb-3">
                      {step.description}
                    </p>
                    {step.detailedDescription && (
                      <p className="text-sm text-slate-400 border-t border-slate-100 pt-3 mt-3">
                        {step.detailedDescription}
                      </p>
                    )}
                    
                    {/* Arrow indicator on hover */}
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg className="w-5 h-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-slate-800 mb-3">
              Why Restaurants Love Tap2Menu
            </h3>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Join thousands of restaurants that have transformed their operations
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, idx) => {
              const BenefitIcon = benefit.icon;
              return (
                <div key={idx} className="flex items-start gap-4 p-4 rounded-xl hover:bg-orange-50 transition-all group cursor-pointer">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <BenefitIcon className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-1 group-hover:text-orange-600 transition-colors">
                      {benefit.title}
                    </h4>
                    <p className="text-sm text-slate-500">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Video Demo CTA */}
        <div className="mt-16 text-center">
          <button className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-semibold transition-all shadow-lg hover:shadow-xl group">
            <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            Watch Demo Video
          </button>
          <p className="text-sm text-slate-400 mt-3">
            3-minute demo • See how it works
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;