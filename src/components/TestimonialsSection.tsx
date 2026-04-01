// components/sections/TestimonialsSection.tsx
'use client';

import { Star, TrendingUp, Clock, Zap, Users, CheckCircle, Quote, ArrowRight } from 'lucide-react';
import { useState } from 'react';

interface Testimonial {
  id: number;
  restaurant: string;
  owner: string;
  role: string;
  rating: number;
  quote: string;
  image?: string;
  location?: string;
}

interface Stat {
  value: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  trend?: string;
}

const TestimonialsSection = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      restaurant: 'Spice Garden',
      owner: 'Rajesh Kumar',
      role: 'Owner',
      rating: 5,
      quote: 'Tap2Menu has transformed our restaurant! Orders are up 40% and our staff can focus on service instead of taking orders. The QR ordering system is incredibly intuitive for our customers. We\'ve seen a significant reduction in wait times and our customer satisfaction scores have never been higher.',
      location: 'Mumbai, India'
    },
    {
      id: 2,
      restaurant: 'Pizza Heaven',
      owner: 'Maria Garcia',
      role: 'Manager',
      rating: 5,
      quote: 'The QR ordering system is a game-changer. Our customers love the convenience and our revenue has increased significantly. The analytics dashboard helps us make data-driven decisions about menu items and pricing. We\'ve reduced order errors by 75% and increased table turnover by 30%.',
      location: 'Barcelona, Spain'
    },
    {
      id: 3,
      restaurant: 'Sushi Master',
      owner: 'Kenji Tanaka',
      role: 'Chef & Owner',
      rating: 4,
      quote: 'Kitchen operations have never been smoother. The order management system is intuitive and efficient. We\'ve reduced order errors by 80% since implementing Tap2Menu. The kitchen display system is a lifesaver during peak hours.',
      location: 'Tokyo, Japan'
    },
    {
      id: 4,
      restaurant: 'The Great Indian Dhaba',
      owner: 'Priya Singh',
      role: 'Owner',
      rating: 5,
      quote: 'As a multi-location restaurant, Tap2Menu has made managing all our branches seamless. The centralized dashboard gives us real-time insights into sales, popular items, and customer preferences across all locations.',
      location: 'Delhi, India'
    },
    {
      id: 5,
      restaurant: 'Cafe Paris',
      owner: 'Jean Dupont',
      role: 'Manager',
      rating: 5,
      quote: 'The best investment we\'ve made for our cafe. Customers love the contactless ordering, and our staff can focus on providing excellent service. The loyalty program feature has helped us retain customers.',
      location: 'Paris, France'
    }
  ];

  const stats: Stat[] = [
    { value: '35%', label: 'Avg Revenue Increase', icon: TrendingUp, trend: '+12.5%' },
    { value: '60%', label: 'Reduced Wait Time', icon: Clock, trend: '-15 min' },
    { value: '50%', label: 'Kitchen Efficiency', icon: Zap, trend: '+25%' },
    { value: '98%', label: 'Customer Satisfaction', icon: Users, trend: 'Excellent' },
  ];

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
        ))}
        {Array.from({ length: 5 - rating }).map((_, i) => (
          <Star key={i} className="w-5 h-5 text-slate-600" />
        ))}
      </div>
    );
  };

  return (
    <section id="testimonials" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5 pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 backdrop-blur-sm border border-slate-700 text-orange-400 text-sm font-semibold mb-4 animate-fade-in-up">
            <Star className="w-4 h-4 fill-orange-400" /> 
            Loved by Restaurants Worldwide
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-5 animate-fade-in-up">
            Trusted by{' '}
            <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
              500+
            </span>{' '}
            Restaurants
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed animate-fade-in-up">
            See what restaurant owners and managers are saying about their experience 
            with Tap2Menu. Join the growing community of successful restaurants.
          </p>
        </div>

        {/* Featured Testimonial Carousel */}
        <div className="mb-20">
          <div className="relative">
            {/* Main Testimonial Card */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-800/90 rounded-3xl p-8 md:p-12 shadow-2xl border border-slate-700/50">
              {/* Quote Icon */}
              <div className="absolute top-8 right-8 opacity-10">
                <Quote className="w-24 h-24 text-white" />
              </div>
              
              <div className="relative z-10">
                {/* Rating */}
                <div className="mb-6">
                  {renderStars(testimonials[activeTestimonial].rating)}
                </div>
                
                {/* Quote */}
                <blockquote className="text-xl md:text-2xl text-slate-200 leading-relaxed mb-8 font-medium">
                  &ldquo;{testimonials[activeTestimonial].quote}&rdquo;
                </blockquote>
                
                {/* Author Info */}
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center text-white text-xl font-bold shadow-lg">
                      {testimonials[activeTestimonial].restaurant.charAt(0)}
                    </div>
                    <div>
                      <div className="text-lg font-bold text-white">
                        {testimonials[activeTestimonial].restaurant}
                      </div>
                      <div className="text-sm text-slate-400">
                        {testimonials[activeTestimonial].owner} • {testimonials[activeTestimonial].role}
                      </div>
                      <div className="text-xs text-slate-500 mt-1">
                        {testimonials[activeTestimonial].location}
                      </div>
                    </div>
                  </div>
                  
                  {/* Navigation Dots */}
                  <div className="flex gap-2">
                    {testimonials.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveTestimonial(idx)}
                        className={`transition-all duration-300 ${
                          activeTestimonial === idx
                            ? 'w-8 h-2 bg-orange-500 rounded-full'
                            : 'w-2 h-2 bg-slate-600 rounded-full hover:bg-slate-500'
                        }`}
                        aria-label={`Go to testimonial ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Navigation Arrows */}
            <button
              onClick={() => setActiveTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-6 w-10 h-10 rounded-full bg-slate-800 hover:bg-orange-500 text-white flex items-center justify-center shadow-lg transition-all"
              aria-label="Previous testimonial"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => setActiveTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-6 w-10 h-10 rounded-full bg-slate-800 hover:bg-orange-500 text-white flex items-center justify-center shadow-lg transition-all"
              aria-label="Next testimonial"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Testimonial Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.slice(0, 3).map((testimonial, idx) => (
            <div
              key={testimonial.id}
              className="group bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 hover:bg-slate-800 transition-all duration-300 border border-slate-700/50 hover:border-orange-500/30"
            >
              {/* Stars */}
              <div className="mb-4">
                {renderStars(testimonial.rating)}
              </div>
              
              {/* Quote */}
              <p className="text-slate-300 leading-relaxed mb-5 text-sm line-clamp-4">
                &ldquo;{testimonial.quote.substring(0, 150)}...&rdquo;
              </p>
              
              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-700">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center text-white font-bold text-sm">
                  {testimonial.restaurant.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-white group-hover:text-orange-400 transition-colors">
                    {testimonial.restaurant}
                  </div>
                  <div className="text-xs text-slate-400">
                    {testimonial.owner}
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-orange-400 group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, idx) => {
            const StatIcon = stat.icon;
            return (
              <div
                key={idx}
                className="group text-center bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 hover:bg-slate-800 transition-all border border-slate-700/50 hover:border-orange-500/30"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-amber-500/10 rounded-full blur-xl group-hover:blur-2xl transition-all" />
                  <StatIcon className="w-8 h-8 text-orange-400 mx-auto mb-3 relative z-10 group-hover:scale-110 transition-transform" />
                </div>
                <div className="text-3xl font-extrabold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-400 mb-2">
                  {stat.label}
                </div>
                {stat.trend && (
                  <div className="text-xs text-green-400 font-medium">
                    {stat.trend}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Trust Indicators */}
        <div className="text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-8 mb-8">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-sm text-slate-300">Verified Reviews</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-400" />
              <span className="text-sm text-slate-300">500+ Active Restaurants</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
              <span className="text-sm text-slate-300">4.9 Average Rating</span>
            </div>
          </div>
          
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-300 hover:text-white transition-all group">
            Read More Success Stories
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default TestimonialsSection;