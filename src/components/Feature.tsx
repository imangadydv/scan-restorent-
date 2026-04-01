// components/sections/FeaturesSection.tsx
'use client';

import { Zap, Smartphone, QrCode, Globe, BarChart, Shield, Headphones, CreditCard } from 'lucide-react';

interface Feature {
  title: string;
  description: string;
  Icon: React.ComponentType<{ className?: string }>;
  gradient: string;
}

const Feature = () => {
  const features: Feature[] = [
    {
      title: 'QR Code Ordering',
      description: 'Customers scan, browse, and order instantly from their phones. No app download required.',
      Icon: QrCode,
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Digital Menus',
      description: 'Update prices, add new items, and manage availability in real-time. Instant changes across all devices.',
      Icon: Smartphone,
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Analytics Dashboard',
      description: 'Track sales, popular items, customer behavior, and revenue insights with detailed reports.',
      Icon: BarChart,
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Multi-Branch Support',
      description: 'Manage multiple restaurant locations from one central dashboard. Consistent branding across all outlets.',
      Icon: Globe,
      gradient: 'from-orange-500 to-amber-500'
    },
    {
      title: 'Secure Payments',
      description: 'Integrated payment processing with top security standards. Support for multiple payment methods.',
      Icon: Shield,
      gradient: 'from-red-500 to-rose-500'
    },
    {
      title: '24/7 Support',
      description: 'Round-the-clock customer support with dedicated account managers for enterprise clients.',
      Icon: Headphones,
      gradient: 'from-indigo-500 to-purple-500'
    },
    {
      title: 'Kitchen Display System',
      description: 'Real-time order management with kitchen display system. Reduce errors and improve efficiency.',
      Icon: Zap,
      gradient: 'from-yellow-500 to-orange-500'
    },
    {
      title: 'Customer Insights',
      description: 'Understand your customers with detailed analytics on ordering patterns and preferences.',
      Icon: CreditCard,
      gradient: 'from-teal-500 to-green-500'
    },
    {
      title: 'Loyalty Programs',
      description: 'Build customer loyalty with integrated rewards program and special offers.',
      Icon: Zap,
      gradient: 'from-pink-500 to-rose-500'
    }
  ];

  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-orange-50/30 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-100/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-100/20 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 text-orange-600 text-sm font-semibold mb-4">
            <Zap className="w-4 h-4" /> 
            Powerful Features
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-5">
            Everything You Need to{' '}
            <span className="block sm:inline">
              Run Your Restaurant
            </span>
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            From QR code menus to kitchen displays, from analytics to
            multi-branch management -- we have got you covered with enterprise-grade features.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => {
            const FeatureIcon = feature.Icon;
            return (
              <div
                key={idx}
                className="group bg-white rounded-2xl p-7 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 hover:border-orange-200 relative overflow-hidden"
              >
                {/* Hover Gradient Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-50 to-amber-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Icon */}
                <div className="relative z-10">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-5 shadow-md group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
                  >
                    <FeatureIcon className="w-7 h-7 text-white" />
                  </div>
                  
                  <h3 className="text-lg font-bold text-slate-800 mb-2.5 group-hover:text-orange-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed group-hover:text-slate-600 transition-colors">
                    {feature.description}
                  </p>
                  
                  {/* Learn More Link */}
                  <div className="mt-5 flex items-center gap-1 text-sm font-semibold text-orange-500 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    Learn more 
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-100 text-slate-700 text-sm font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            New features added weekly
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feature;