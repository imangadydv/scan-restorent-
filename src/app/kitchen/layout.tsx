'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/store';
import {
  ChefHat,
  Clock,
  LogOut,
  Volume2,
  VolumeX,
} from 'lucide-react';

export default function KitchenLayout({ children }: { children: React.ReactNode }) {
  const { currentUser, currentRestaurant, logout } = useApp();
  const router = useRouter();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!currentUser) {
      router.push('/');
      return;
    }
    if (currentUser.role !== 'kitchen') {
      router.push('/');
    }
  }, [currentUser, router]);

  if (!currentUser || currentUser.role !== 'kitchen') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="text-center animate-fade-in">
          <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto shadow-glow animate-glow-pulse">
            <ChefHat className="w-8 h-8 text-white" />
          </div>
          <div className="mt-6">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-orange-500/30 border-t-orange-500 mx-auto"></div>
          </div>
          <p className="mt-4 text-slate-400 text-sm">Verifying access...</p>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header bar - bg-slate-900, border-b border-slate-800 */}
      <header className="sticky top-0 z-30 bg-slate-900 border-b border-slate-800">
        <div className="flex items-center justify-between px-4 py-3 lg:px-6">
          {/* Left: ChefHat icon in gradient-primary circle with shadow-glow, title */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 gradient-primary rounded-2xl flex items-center justify-center shadow-glow animate-fade-in">
              <ChefHat className="w-6 h-6 text-white" />
            </div>
            <div className="animate-fade-in-left stagger-1">
              <h1 className="text-lg font-bold text-white tracking-wide">Kitchen Display</h1>
              <p className="text-xs text-slate-500">{currentRestaurant?.name || 'Restaurant'}</p>
            </div>
          </div>

          {/* Center: Restaurant name in muted text (shown on larger screens alongside clock) */}
          <div className="hidden sm:flex flex-col items-center animate-fade-in stagger-2">
            <div className="flex items-center gap-2.5">
              <Clock className="w-5 h-5 text-orange-400" />
              <span className="text-2xl font-mono font-bold text-white tracking-wider">
                {formatTime(currentTime)}
              </span>
            </div>
            <span className="text-[10px] text-slate-500 mt-0.5 tracking-wide">{formatDate(currentTime)}</span>
          </div>

          {/* Right: Sound toggle, user name badge, logout button */}
          <div className="flex items-center gap-2.5 animate-fade-in stagger-3">
            {/* Sound toggle */}
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`p-2.5 rounded-xl transition-all duration-300 ${
                soundEnabled
                  ? 'gradient-primary text-white shadow-glow'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700 border border-slate-700'
              }`}
              title={soundEnabled ? 'Sound On' : 'Sound Off'}
            >
              {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </button>

            {/* User name badge */}
            <div className="hidden md:flex items-center gap-2.5 px-4 py-2 glass-card-dark rounded-xl">
              <div className="w-7 h-7 rounded-lg gradient-primary flex items-center justify-center text-[11px] font-bold text-white shadow-sm">
                {currentUser.name.charAt(0)}
              </div>
              <span className="text-sm text-slate-300 font-medium">{currentUser.name}</span>
            </div>

            {/* Logout button */}
            <button
              onClick={handleLogout}
              className="p-2.5 rounded-xl bg-slate-800 text-slate-400 hover:bg-red-500/15 hover:text-red-400 border border-slate-700 hover:border-red-500/30 transition-all duration-300"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Page content - full dark bg for kitchen visibility */}
      <main className="p-4 lg:p-6">{children}</main>
    </div>
  );
}
