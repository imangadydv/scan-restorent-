'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useApp } from '@/lib/store';
import {
  LayoutDashboard,
  Store,
  CreditCard,
  Receipt,
  HeadphonesIcon,
  Settings,
  BarChart3,
  Menu,
  X,
  LogOut,
  Search,
  Bell,
  ChevronRight,
  ChevronLeft,
  PanelLeftClose,
  PanelLeft,
} from 'lucide-react';

const navItems = [
  { href: '/superadmin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/superadmin/restaurants', label: 'Restaurants', icon: Store },
  { href: '/superadmin/plans', label: 'Plans', icon: CreditCard },
  { href: '/superadmin/subscriptions', label: 'Subscriptions', icon: Receipt },
  { href: '/superadmin/tickets', label: 'Support Tickets', icon: HeadphonesIcon },
  { href: '/superadmin/reports', label: 'Reports', icon: BarChart3 },
  { href: '/superadmin/settings', label: 'Global Settings', icon: Settings },
];

export default function SuperAdminLayout({ children }: { children: React.ReactNode }) {
  const { currentUser, logout } = useApp();
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!currentUser) {
      router.push('/');
      return;
    }
    if (currentUser.role !== 'superadmin') {
      router.push('/');
    }
  }, [currentUser, router]);

  if (!currentUser || currentUser.role !== 'superadmin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="text-center">
          <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto shadow-glow">
            <span className="text-white font-bold text-xl">T2</span>
          </div>
          <div className="mt-6">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-orange-500/30 border-t-orange-500 mx-auto"></div>
          </div>
          <p className="mt-4 text-slate-400 text-sm">Verifying access...</p>
        </div>
      </div>
    );
  }

  const isActive = (href: string) => {
    if (href === '/superadmin') return pathname === '/superadmin';
    return pathname.startsWith(href);
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const handleNavClick = () => {
    // Close mobile sidebar
    setSidebarOpen(false);
    // Collapse desktop sidebar
    setCollapsed(true);
  };

  const currentPageLabel = navItems.find((n) => isActive(n.href))?.label || 'Dashboard';

  return (
    <div className="min-h-screen bg-slate-50 lg:flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        </div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 lg:z-10 h-full lg:h-screen flex-shrink-0 bg-slate-950 overflow-hidden transform transition-all duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0 w-[260px]' : '-translate-x-full w-[260px]'
        } ${collapsed ? 'lg:w-[72px]' : 'lg:w-[260px]'}`}
      >
        {/* Sidebar right border glow */}
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-orange-500/30 via-purple-500/10 to-transparent z-10" />

        <div className="flex flex-col h-full overflow-y-auto overflow-x-hidden">
          {/* Logo */}
          <div className={`px-4 py-5 transition-all duration-300 ${collapsed ? 'lg:px-3' : ''}`}>
            <div className="flex items-center justify-between">
              <Link href="/superadmin" className="flex items-center gap-3 group" onClick={handleNavClick}>
                <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center shadow-glow transition-all duration-300 group-hover:scale-105 flex-shrink-0">
                  <span className="text-white font-bold text-sm">T2</span>
                </div>
                <div className={`transition-all duration-300 overflow-hidden ${collapsed ? 'lg:w-0 lg:opacity-0' : 'lg:w-auto lg:opacity-100'}`}>
                  <span className="text-lg font-bold text-white tracking-tight whitespace-nowrap">Tap2Menu</span>
                  <span className="block text-[10px] text-orange-400 font-semibold tracking-[0.2em] uppercase whitespace-nowrap">
                    Super Admin
                  </span>
                </div>
              </Link>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-2 rounded-xl hover:bg-white/5 text-slate-400 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="mx-4 h-px bg-gradient-to-r from-transparent via-slate-700/50 to-transparent" />

          {/* Nav */}
          <nav className="flex-1 overflow-y-auto py-4 px-3">
            <ul className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <li key={item.href} className="relative group/nav">
                    <Link
                      href={item.href}
                      onClick={handleNavClick}
                      className={`flex items-center gap-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                        collapsed ? 'lg:px-0 lg:justify-center px-4 py-2.5' : 'px-4 py-2.5'
                      } ${
                        active
                          ? 'gradient-primary text-white shadow-glow'
                          : 'text-slate-400 hover:text-white hover:bg-white/5'
                      }`}
                      style={collapsed ? { paddingLeft: undefined, paddingRight: undefined } : undefined}
                    >
                      <Icon className={`w-[18px] h-[18px] flex-shrink-0 transition-transform duration-200 ${
                        !active ? 'group-hover:scale-110' : ''
                      }`} />
                      <span className={`flex-1 whitespace-nowrap transition-all duration-300 overflow-hidden ${collapsed ? 'lg:w-0 lg:opacity-0 lg:hidden' : ''}`}>
                        {item.label}
                      </span>
                      {active && !collapsed && <ChevronRight className="w-4 h-4 opacity-70 hidden lg:block" />}
                    </Link>
                    {/* Tooltip on collapsed hover */}
                    {collapsed && (
                      <div className="hidden lg:block absolute left-full top-1/2 -translate-y-1/2 ml-2 px-3 py-1.5 bg-slate-800 text-white text-xs font-medium rounded-lg shadow-xl opacity-0 group-hover/nav:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                        {item.label}
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-slate-800 rotate-45" />
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="mx-4 h-px bg-gradient-to-r from-transparent via-slate-700/50 to-transparent" />

          {/* Collapse toggle button - desktop only */}
          <div className={`hidden lg:flex px-3 py-2 ${collapsed ? 'justify-center' : 'justify-end'}`}>
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-2 rounded-lg text-slate-500 hover:text-white hover:bg-white/5 transition-all duration-200"
              title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {collapsed ? <PanelLeft className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
            </button>
          </div>

          {/* User card */}
          <div className={`p-3 transition-all duration-300 ${collapsed ? 'lg:px-2' : ''}`}>
            {collapsed ? (
              /* Collapsed: just avatar */
              <div className="hidden lg:flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-lg flex-shrink-0">
                  {currentUser.name.charAt(0).toUpperCase()}
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-lg text-slate-500 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : null}

            {/* Full user card (shown on mobile always, desktop when not collapsed) */}
            <div className={`rounded-xl bg-white/5 border border-white/10 p-3 ${collapsed ? 'lg:hidden' : ''}`}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-lg flex-shrink-0">
                  {currentUser.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">{currentUser.name}</p>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/20 mt-0.5">
                    Super Admin
                  </span>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 w-full px-3 py-2 rounded-lg text-sm font-medium text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200 border border-transparent hover:border-red-500/20"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-200/60 shadow-sm">
          <div className="flex items-center justify-between px-4 py-3 lg:px-6">
            <div className="flex items-center gap-3">
              {/* Mobile hamburger */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-xl hover:bg-orange-50 transition-colors text-gray-600"
              >
                <Menu className="w-5 h-5" />
              </button>

              {/* Desktop sidebar toggle */}
              <button
                onClick={() => setCollapsed(!collapsed)}
                className="hidden lg:flex p-2 rounded-xl hover:bg-orange-50 transition-colors text-gray-500 hover:text-orange-600"
                title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              >
                {collapsed ? <PanelLeft className="w-5 h-5" /> : <PanelLeftClose className="w-5 h-5" />}
              </button>

              <div className="hidden lg:flex items-center gap-2 text-sm">
                <span className="text-gray-400">Super Admin</span>
                <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
                <span className="font-semibold text-gray-800">{currentPageLabel}</span>
              </div>
              <h1 className="lg:hidden text-base font-semibold text-gray-800">{currentPageLabel}</h1>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden md:block relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search anything..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-56 py-2 pl-10 pr-4 text-sm rounded-xl border border-gray-200 bg-gray-50/60 focus:bg-white focus:border-orange-300 focus:ring-2 focus:ring-orange-100 outline-none transition-all"
                />
              </div>

              <button className="relative p-2 rounded-xl hover:bg-orange-50 transition-colors text-gray-500 hover:text-orange-600">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-orange-500 rounded-full border-2 border-white" />
              </button>

              <div className="hidden md:block w-px h-8 bg-gray-200 mx-1" />

              <div className="flex items-center gap-3">
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-medium text-gray-700 leading-tight">{currentUser.name}</p>
                  <p className="text-[11px] text-gray-400 leading-tight">Super Admin</p>
                </div>
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs shadow-lg">
                  {currentUser.name.charAt(0).toUpperCase()}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 bg-gray-50 p-4 lg:p-6">
          <div className="w-full">{children}</div>
        </main>
      </div>
    </div>
  );
}
