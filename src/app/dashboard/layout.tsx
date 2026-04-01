'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useApp } from '@/lib/store';
import {
  LayoutDashboard,
  UtensilsCrossed,
  FolderOpen,
  ClipboardList,
  Grid3X3,
  QrCode,
  Users,
  Building2,
  Ticket,
  BarChart3,
  Settings,
  Menu,
  X,
  Search,
  Bell,
  ChevronDown,
  LogOut,
  ChevronRight,
  PanelLeftClose,
  PanelLeft,
} from 'lucide-react';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/menu', label: 'Menu Management', icon: UtensilsCrossed },
  { href: '/dashboard/categories', label: 'Categories', icon: FolderOpen },
  { href: '/dashboard/orders', label: 'Orders', icon: ClipboardList },
  { href: '/dashboard/tables', label: 'Tables', icon: Grid3X3 },
  { href: '/dashboard/qr-codes', label: 'QR Codes', icon: QrCode },
  { href: '/dashboard/staff', label: 'Staff', icon: Users },
  { href: '/dashboard/branches', label: 'Branches', icon: Building2 },
  { href: '/dashboard/coupons', label: 'Coupons', icon: Ticket },
  { href: '/dashboard/reports', label: 'Reports', icon: BarChart3 },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { currentUser, currentRestaurant, logout, orders } = useApp();
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const newOrdersCount = orders.filter(
    (o) => o.restaurantId === currentRestaurant?.id && o.status === 'new'
  ).length;

  useEffect(() => {
    if (!currentUser) {
      router.push('/');
      return;
    }
    if (currentUser.role !== 'restaurant_admin' && currentUser.role !== 'superadmin') {
      router.push('/');
    }
  }, [currentUser, router]);

  if (!currentUser || (currentUser.role !== 'restaurant_admin' && currentUser.role !== 'superadmin')) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl gradient-primary flex items-center justify-center shadow-glow">
            <span className="text-white font-bold text-xl">T2</span>
          </div>
          <div className="w-10 h-10 mx-auto mt-4">
            <div className="animate-spin rounded-full h-10 w-10 border-[3px] border-orange-200 border-t-orange-500"></div>
          </div>
          <p className="mt-4 text-gray-500 font-medium">Redirecting...</p>
        </div>
      </div>
    );
  }

  const isActive = (href: string) => {
    if (href === '/dashboard') return pathname === '/dashboard';
    return pathname.startsWith(href);
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const handleNavClick = () => {
    setSidebarOpen(false);
    setCollapsed(true);
  };

  const getPageTitle = () => {
    const current = navItems.find((item) => isActive(item.href));
    return current?.label || 'Dashboard';
  };

  const userInitials = currentUser.name
    .split(' ')
    .map((n) => n.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-gray-50 lg:flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
        </div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 lg:z-10 h-full lg:h-screen flex-shrink-0 bg-white border-r border-gray-100 overflow-hidden transform transition-all duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0 w-[260px]' : '-translate-x-full w-[260px]'
        } ${collapsed ? 'lg:w-[72px]' : 'lg:w-[260px]'}`}
      >
        <div className="flex flex-col h-full overflow-y-auto overflow-x-hidden">
          {/* Logo */}
          <div className={`px-4 py-5 transition-all duration-300 ${collapsed ? 'lg:px-3' : ''}`}>
            <div className="flex items-center justify-between">
              <Link href="/dashboard" className="flex items-center gap-3 group" onClick={handleNavClick}>
                <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center shadow-glow transition-transform duration-300 group-hover:scale-105 flex-shrink-0">
                  <span className="text-white font-bold text-sm tracking-tight">T2</span>
                </div>
                <div className={`transition-all duration-300 overflow-hidden ${collapsed ? 'lg:w-0 lg:opacity-0' : 'lg:w-auto lg:opacity-100'}`}>
                  <span className="text-lg font-bold text-gray-900 tracking-tight whitespace-nowrap">Tap2Menu</span>
                </div>
              </Link>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            {!collapsed && (
              <p className="text-xs text-gray-400 mt-2 truncate pl-[52px]">
                {currentRestaurant?.name || 'No Restaurant'}
              </p>
            )}
          </div>

          <div className="mx-4 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

          {/* Nav */}
          <nav className="flex-1 overflow-y-auto py-4 px-3">
            {!collapsed && (
              <p className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.15em] px-3 mb-3">
                Main Menu
              </p>
            )}
            <ul className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <li key={item.href} className="relative group/nav">
                    <Link
                      href={item.href}
                      onClick={handleNavClick}
                      className={`flex items-center gap-3 rounded-xl text-[13px] font-medium transition-all duration-200 group ${
                        collapsed ? 'lg:px-0 lg:justify-center px-3 py-2.5' : 'px-3 py-2.5'
                      } ${
                        active
                          ? 'gradient-primary text-white shadow-glow'
                          : 'text-gray-500 hover:bg-orange-50 hover:text-orange-600'
                      }`}
                    >
                      <Icon className={`w-[18px] h-[18px] flex-shrink-0 ${active ? 'text-white' : 'text-gray-400 group-hover:text-orange-500'}`} />
                      <span className={`flex-1 whitespace-nowrap transition-all duration-300 overflow-hidden ${collapsed ? 'lg:w-0 lg:opacity-0 lg:hidden' : ''}`}>
                        {item.label}
                      </span>
                      {item.label === 'Orders' && newOrdersCount > 0 && !collapsed && (
                        <span
                          className={`text-[10px] min-w-[20px] text-center px-1.5 py-0.5 rounded-full font-bold ${
                            active ? 'bg-white/25 text-white' : 'bg-red-100 text-red-600'
                          }`}
                        >
                          {newOrdersCount}
                        </span>
                      )}
                      {active && !collapsed && <ChevronRight className="w-3.5 h-3.5 text-white/60 hidden lg:block" />}
                    </Link>
                    {/* Tooltip on collapsed hover */}
                    {collapsed && (
                      <div className="hidden lg:block absolute left-full top-1/2 -translate-y-1/2 ml-2 px-3 py-1.5 bg-gray-800 text-white text-xs font-medium rounded-lg shadow-xl opacity-0 group-hover/nav:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                        {item.label}
                        {item.label === 'Orders' && newOrdersCount > 0 && (
                          <span className="ml-2 px-1.5 py-0.5 bg-red-500 text-white text-[10px] rounded-full font-bold">{newOrdersCount}</span>
                        )}
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-800 rotate-45" />
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="mx-4 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

          {/* Collapse toggle - desktop only */}
          <div className={`hidden lg:flex px-3 py-2 ${collapsed ? 'justify-center' : 'justify-end'}`}>
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-2 rounded-lg text-gray-400 hover:text-orange-600 hover:bg-orange-50 transition-all duration-200"
              title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {collapsed ? <PanelLeft className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
            </button>
          </div>

          {/* User card */}
          <div className={`p-3 transition-all duration-300 ${collapsed ? 'lg:px-2' : ''}`}>
            {collapsed ? (
              <div className="hidden lg:flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-white font-bold text-sm shadow-md flex-shrink-0">
                  {userInitials}
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all duration-200"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : null}

            <div className={`flex items-center gap-3 p-3 rounded-xl bg-gray-50/80 border border-gray-100 ${collapsed ? 'lg:hidden' : ''}`}>
              <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-white font-bold text-sm shadow-md flex-shrink-0">
                {userInitials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">{currentUser.name}</p>
                <span className="inline-block text-[10px] font-semibold uppercase tracking-wider text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full mt-0.5">
                  {currentUser.role.replace('_', ' ')}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all duration-200 flex-shrink-0"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-200/60 shadow-sm">
          <div className="flex items-center justify-between px-4 py-3 lg:px-6">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-xl hover:bg-orange-50 transition-colors group"
              >
                <Menu className="w-5 h-5 text-gray-500 group-hover:text-orange-600" />
              </button>

              <button
                onClick={() => setCollapsed(!collapsed)}
                className="hidden lg:flex p-2 rounded-xl hover:bg-orange-50 transition-colors text-gray-500 hover:text-orange-600"
                title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              >
                {collapsed ? <PanelLeft className="w-5 h-5" /> : <PanelLeftClose className="w-5 h-5" />}
              </button>

              <div className="hidden sm:flex items-center gap-2 text-sm">
                <span className="text-gray-400">Admin</span>
                <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
                <span className="font-semibold text-gray-800">{getPageTitle()}</span>
              </div>
              <h1 className="sm:hidden text-base font-semibold text-gray-800">{getPageTitle()}</h1>
            </div>

            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search orders, menu items, tables..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 py-2 text-sm rounded-xl border border-gray-200 bg-gray-50/60 focus:bg-white focus:border-orange-300 focus:ring-2 focus:ring-orange-100 outline-none transition-all"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="relative p-2 rounded-xl hover:bg-orange-50 transition-colors group">
                <Bell className={`w-5 h-5 text-gray-500 group-hover:text-orange-600 ${newOrdersCount > 0 ? 'animate-bounce-soft' : ''}`} />
                {newOrdersCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 gradient-primary rounded-full flex items-center justify-center text-[10px] text-white font-bold shadow-glow ring-2 ring-white">
                    {newOrdersCount > 9 ? '9+' : newOrdersCount}
                  </span>
                )}
              </button>

              <div className="hidden md:block w-px h-8 bg-gray-200 mx-1" />

              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2.5 p-1.5 pr-3 rounded-xl hover:bg-orange-50 transition-all duration-200 group"
                >
                  <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center text-white font-bold text-xs shadow-sm">
                    {userInitials}
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-semibold text-gray-700 group-hover:text-orange-600 transition-colors leading-tight">
                      {currentUser.name}
                    </p>
                    <p className="text-[10px] text-gray-400 capitalize leading-tight">
                      {currentUser.role.replace('_', ' ')}
                    </p>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400 hidden md:block transition-transform duration-200" style={{ transform: userDropdownOpen ? 'rotate(180deg)' : 'rotate(0)' }} />
                </button>

                {userDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setUserDropdownOpen(false)} />
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-semibold text-gray-800">{currentUser.name}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{currentUser.email}</p>
                      </div>
                      <div className="py-1">
                        <Link
                          href="/dashboard/settings"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                        >
                          <Settings className="w-4 h-4" />
                          Settings
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          Logout
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-6 bg-gray-50">
          <div className="w-full">{children}</div>
        </main>
      </div>
    </div>
  );
}
