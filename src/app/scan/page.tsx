"use client";

import { useState, useEffect } from "react";
import { useApp } from "@/lib/store";
import { useRouter } from "next/navigation";
import {
  QrCode,
  Star,
  ChevronRight,
  Clock,
  Scan,
  ShoppingBag,
  UtensilsCrossed,
  PartyPopper,
  ArrowRight,
  MapPin,
  Wifi,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Scanning Animation Component
// ---------------------------------------------------------------------------

function ScanningAnimation({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex flex-col items-center justify-center p-6">
      {/* QR Code Frame */}
      <div className="relative w-56 h-56 mb-8">
        {/* Outer glow */}
        <div className="absolute -inset-4 bg-orange-500/20 rounded-2xl blur-xl animate-pulse" />
        
        {/* Main QR Frame */}
        <div className="relative w-full h-full bg-white/5 rounded-2xl border-2 border-orange-500/30 overflow-hidden">
          {/* Scanning Line */}
          <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent animate-scan" />
          
          {/* Corner Markers */}
          <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-orange-500 rounded-tl-lg" />
          <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-orange-500 rounded-tr-lg" />
          <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-orange-500 rounded-bl-lg" />
          <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-orange-500 rounded-br-lg" />
          
          {/* QR Pattern Simulation */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="grid grid-cols-5 gap-1 p-4 w-full h-full">
              {Array.from({ length: 25 }).map((_, i) => (
                <div
                  key={i}
                  className={`rounded-sm ${
                    i < 4 || i > 20 || i % 5 === 0 || i % 5 === 4
                      ? "bg-white/60"
                      : Math.random() > 0.6
                      ? "bg-white/30"
                      : "bg-white/10"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Text */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Scan className="w-6 h-6 text-orange-500" />
          <h2 className="text-xl font-bold text-white">Scanning QR Code</h2>
        </div>
        <p className="text-slate-400 text-sm">
          Point your camera at the QR code on your table
        </p>
        
        {/* Loading Dots */}
        <div className="flex items-center justify-center gap-2 mt-6">
          <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
          <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
          <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
      </div>

      <style jsx>{`
        @keyframes scan {
          0% { top: 0%; }
          50% { top: 100%; }
          100% { top: 0%; }
        }
        .animate-scan {
          animation: scan 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Restaurant Card Component
// ---------------------------------------------------------------------------

function RestaurantCard({ restaurant, onClick, index }: any) {
  const cuisineEmoji: Record<string, string> = {
    "North Indian": "🍛",
    Italian: "🍕",
    Chinese: "🥡",
    Japanese: "🍣",
    Mexican: "🌮",
    Thai: "🍲",
  };

  const getCuisineEmoji = () => {
    for (const cuisine of restaurant.cuisine) {
      if (cuisineEmoji[cuisine]) return cuisineEmoji[cuisine];
    }
    return "🍽️";
  };

  return (
    <button
      onClick={onClick}
      disabled={!restaurant.isActive}
      className={`
        w-full text-left bg-white rounded-xl shadow-sm border border-slate-100 
        hover:shadow-md transition-all overflow-hidden
        ${!restaurant.isActive ? "opacity-60 cursor-not-allowed" : ""}
      `}
    >
      {/* Header with Gradient */}
      <div
        className="h-28 relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${restaurant.settings.theme.primaryColor}, ${restaurant.settings.theme.accentColor})`,
        }}
      >
        {/* Floating Emoji */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl opacity-20">
          {getCuisineEmoji()}
        </div>
        
        {/* Restaurant Icon */}
        <div className="absolute -bottom-5 left-4 w-12 h-12 bg-white rounded-xl shadow-md flex items-center justify-center text-2xl">
          {getCuisineEmoji()}
        </div>
        
        {/* Status Badge */}
        <div className="absolute top-3 right-3">
          {restaurant.isActive ? (
            <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-black/30 backdrop-blur-sm rounded-full text-xs text-white">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              Open Now
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-black/30 backdrop-blur-sm rounded-full text-xs text-white">
              <span className="w-1.5 h-1.5 bg-red-400 rounded-full" />
              Closed
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 pt-6">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <h3 className="font-bold text-slate-800">{restaurant.name}</h3>
            <div className="flex flex-wrap gap-1 mt-1.5">
              {restaurant.cuisine.slice(0, 2).map((c: string) => (
                <span
                  key={c}
                  className="text-xs px-2 py-0.5 bg-orange-50 text-orange-600 rounded-full"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400 shrink-0" />
        </div>

        <p className="text-sm text-slate-500 mt-2 line-clamp-2">
          {restaurant.description}
        </p>

        {/* Stats */}
        <div className="flex items-center gap-3 mt-3">
          <span className="flex items-center gap-1 text-xs text-amber-600">
            <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
            4.9
          </span>
          <span className="flex items-center gap-1 text-xs text-slate-500">
            <Clock className="w-3 h-3" />
            25 min
          </span>
          <span className="flex items-center gap-1 text-xs text-slate-500">
            <QrCode className="w-3 h-3" />
            QR Order
          </span>
        </div>
      </div>
    </button>
  );
}

// ---------------------------------------------------------------------------
// How It Works Section
// ---------------------------------------------------------------------------

function HowItWorks() {
  const steps = [
    { icon: Scan, title: "Scan QR", desc: "Scan code on your table", color: "from-orange-50 to-orange-100", iconColor: "text-orange-500" },
    { icon: UtensilsCrossed, title: "Browse", desc: "Explore menu items", color: "from-blue-50 to-blue-100", iconColor: "text-blue-500" },
    { icon: ShoppingBag, title: "Order", desc: "Add to cart & pay", color: "from-emerald-50 to-emerald-100", iconColor: "text-emerald-500" },
    { icon: PartyPopper, title: "Enjoy", desc: "Track & get served", color: "from-purple-50 to-purple-100", iconColor: "text-purple-500" },
  ];

  return (
    <div className="mt-8">
      <h3 className="font-bold text-slate-800 mb-4">How It Works</h3>
      <div className="grid grid-cols-2 gap-3">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div
              key={idx}
              className={`relative bg-gradient-to-br ${step.color} rounded-xl p-3 text-center`}
            >
              <div className="absolute -top-2 -left-2 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md">
                {idx + 1}
              </div>
              <div className="flex justify-center mb-1">
                <Icon className={`w-5 h-5 ${step.iconColor}`} />
              </div>
              <h4 className="font-semibold text-sm text-slate-800">{step.title}</h4>
              <p className="text-xs text-slate-500 mt-0.5">{step.desc}</p>
              {idx < 2 && (
                <div className="absolute -right-2 top-1/2 -translate-y-1/2 hidden sm:block">
                  <ChevronRight className="w-4 h-4 text-slate-300" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Scan Page
// ---------------------------------------------------------------------------

export default function ScanPage() {
  const router = useRouter();
  const { restaurants } = useApp();
  const [isScanning, setIsScanning] = useState(true);

  const activeRestaurants = restaurants.filter(r => r.isActive);

  return isScanning ? (
    <ScanningAnimation onComplete={() => setIsScanning(false)} />
  ) : (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 px-5 pt-12 pb-10">
        {/* Demo Badge */}
        <div className="flex justify-center mb-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full">
            <Wifi className="w-3 h-3 text-white" />
            <span className="text-xs text-white font-medium">Demo Mode</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-white text-center">
          Welcome to<br />Tap2Menu
        </h1>
        <p className="text-orange-100 text-sm text-center mt-2 max-w-xs mx-auto">
          Select a restaurant to explore their menu and place an order
        </p>

        {/* QR Icon */}
        <div className="flex justify-center mt-6">
          <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
            <QrCode className="w-7 h-7 text-white" />
          </div>
        </div>
      </div>

      {/* Restaurant List */}
      <div className="px-4 pb-8 -mt-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-slate-800">Available Restaurants</h2>
          <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
            {activeRestaurants.length} open
          </span>
        </div>

        <div className="space-y-3">
          {restaurants.map((restaurant, idx) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              index={idx}
              onClick={() => router.push(`/menu/${restaurant.id}?table=T001`)}
            />
          ))}
        </div>

        {/* How It Works */}
        <HowItWorks />

        {/* Footer */}
        <div className="mt-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm">
            <span className="text-xs text-slate-500">Powered by</span>
            <span className="font-bold text-sm bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
              Tap2Menu
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}