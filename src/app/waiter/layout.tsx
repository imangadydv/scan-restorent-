'use client';

import React, { useEffect, useMemo } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useApp } from '@/lib/store';
import {
  Grid3X3,
  ClipboardList,
  Receipt,
  Bell,
  LogOut,
  UtensilsCrossed,
} from 'lucide-react';

const navItems = [
  { href: '/waiter', label: 'My Tables', icon: Grid3X3 },
  { href: '/waiter/orders', label: 'Orders', icon: ClipboardList },
  { href: '/waiter/bills', label: 'Bill Requests', icon: Receipt },
];

export default function WaiterLayout({ children }: { children: React.ReactNode }) {
  const { currentUser, currentRestaurant, logout, orders } = useApp();
  const pathname = usePathname();
  const router = useRouter();

  const newOrdersCount = useMemo(() => {
    if (!currentRestaurant) return 0;
    return orders.filter(
      (o) => o.restaurantId === currentRestaurant.id && o.status === 'new'
    ).length;
  }, [orders, currentRestaurant]);

  useEffect(() => {
    if (!currentUser) {
      router.push('/');
      return;
    }
    if (currentUser.role !== 'waiter') {
      router.push('/');
    }
  }, [currentUser, router]);

  if (!currentUser || currentUser.role !== 'waiter') {
    return (
      <div className="min-h-screen flex items-center justify-center gradient-mesh">
        <div className="text-center animate-fade-in">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl gradient-primary flex items-center justify-center shadow-glow animate-glow-pulse">
            <UtensilsCrossed className="w-8 h-8 text-white" />
          </div>
          <div className="w-8 h-8 border-3 border-orange-200 border-t-orange-500 rounded-full animate-spin mx-auto mt-4" />
          <p className="mt-4 text-gray-500 font-medium">Redirecting...</p>
        </div>
      </div>
    );
  }

  const isActive = (href: string) => {
    if (href === '/waiter') return pathname === '/waiter';
    return pathname.startsWith(href);
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const initials = currentUser.name
    .split(' ')
    .map((n) => n.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="min-h-screen gradient-mesh pb-20 md:pb-0">
      {/* Top Navigation Bar - Glass Morphism */}
      <header className="sticky top-0 z-30 glass border-b border-white/20 shadow-premium">
        <div className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
          {/* Left: Logo */}
          <Link href="/waiter" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 gradient-primary rounded-xl flex items-center justify-center shadow-glow group-hover:scale-105 transition-transform">
              <UtensilsCrossed className="w-4.5 h-4.5 text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="text-lg font-bold text-gray-800 tracking-tight">Tap2Menu</span>
              <span className="block text-[10px] font-semibold text-orange-500 -mt-0.5 tracking-wider uppercase">
                Waiter Panel
              </span>
            </div>
          </Link>

          {/* Center: Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover-underline ${
                    active
                      ? 'text-orange-500'
                      : 'text-gray-500 hover:text-gray-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                  {active && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full gradient-primary" />
                  )}
                  {item.label === 'Orders' && newOrdersCount > 0 && (
                    <span className="ml-1 text-[10px] min-w-[18px] h-[18px] px-1 rounded-full font-bold flex items-center justify-center bg-red-500 text-white shadow-glow">
                      {newOrdersCount}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right: Bell + User + Logout */}
          <div className="flex items-center gap-2">
            {/* Notification Bell */}
            <button className="relative p-2.5 rounded-xl hover:bg-white/60 transition-all duration-300 group">
              <Bell
                className={`w-5 h-5 text-gray-500 group-hover:text-gray-800 transition-colors ${
                  newOrdersCount > 0 ? 'animate-bounce-soft' : ''
                }`}
              />
              {newOrdersCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[20px] h-5 px-1 rounded-full flex items-center justify-center text-[10px] text-white font-bold gradient-primary shadow-glow animate-glow-pulse">
                  {newOrdersCount > 9 ? '9+' : newOrdersCount}
                </span>
              )}
            </button>

            {/* User Avatar + Name */}
            <div className="hidden sm:flex items-center gap-2.5 pl-2 border-l border-gray-200/50">
              <div className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center text-white font-bold text-xs shadow-glow ring-2 ring-white/80">
                {initials}
              </div>
              <span className="text-sm font-semibold text-gray-700">{currentUser.name}</span>
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="p-2.5 rounded-xl hover:bg-red-50 text-gray-400 hover:text-red-500 transition-all duration-300"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <main className="p-4 lg:p-6 max-w-7xl mx-auto">{children}</main>

      {/* Mobile Bottom Tab Bar - Glass Morphism */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 glass border-t border-white/20 shadow-elevated">
        <div className="flex items-center justify-around py-2 px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-0.5 px-5 py-2 rounded-xl transition-all duration-300 relative ${
                  active
                    ? 'text-orange-500'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {active && (
                  <span className="absolute inset-0 rounded-xl bg-orange-50/80" />
                )}
                <span className="relative">
                  {active ? (
                    <span className="flex items-center justify-center w-7 h-7 rounded-lg gradient-primary shadow-glow">
                      <Icon className="w-4 h-4 text-white" />
                    </span>
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}
                </span>
                <span
                  className={`relative text-[10px] font-semibold ${
                    active ? 'text-orange-600' : ''
                  }`}
                >
                  {item.label === 'Bill Requests' ? 'Bills' : item.label}
                </span>
                {item.label === 'Orders' && newOrdersCount > 0 && (
                  <span className="absolute -top-1 right-2 min-w-[16px] h-4 px-0.5 rounded-full flex items-center justify-center text-[8px] text-white font-bold gradient-primary shadow-glow">
                    {newOrdersCount}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
