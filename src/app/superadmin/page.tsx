'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/store';
import {
  Store,
  ShoppingBag,
  DollarSign,
  CreditCard,
  HeadphonesIcon,
  ArrowUpRight,
  Eye,
  Pause,
  Play,
  Plus,
  BarChart3,
  TrendingUp,
  Activity,
  UserPlus,
  Zap,
  ArrowRight,
  Clock,
  Star,
  Package,
  Users,
  Building2,
  CheckCircle,
  XCircle,
} from 'lucide-react';

// Stats Card Component
const StatsCard = ({ stat, index }: { stat: any; index: number }) => {
  const Icon = stat.icon;
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all">
      <div className="p-5">
        <div className="flex items-start justify-between">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.gradient} flex items-center justify-center shadow-md`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold ${
            stat.trendUp ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'
          }`}>
            <TrendingUp className={`w-3 h-3 ${!stat.trendUp ? 'rotate-180' : ''}`} />
            {stat.trend}
          </div>
        </div>
        <p className="text-2xl font-bold text-slate-800 mt-4">{stat.value}</p>
        <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
      </div>
    </div>
  );
};

// Restaurant Row Component
const RestaurantRow = ({ restaurant, onToggleStatus }: { restaurant: any; onToggleStatus: (id: string) => void }) => {
  const getPlanBadge = (planName: string) => {
    const colors = {
      Starter: 'bg-blue-100 text-blue-700',
      Professional: 'bg-purple-100 text-purple-700',
      Enterprise: 'bg-amber-100 text-amber-700',
      'N/A': 'bg-slate-100 text-slate-500',
    };
    return colors[planName as keyof typeof colors] || colors['N/A'];
  };

  return (
    <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
      <td className="py-3 px-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
            <Store className="w-5 h-5 text-orange-600" />
          </div>
          <div>
            <p className="font-medium text-slate-800">{restaurant.name}</p>
            <p className="text-xs text-slate-400">{restaurant.id.slice(0, 8)}</p>
          </div>
        </div>
      </td>
      <td className="py-3 px-4">
        <span className={`inline-flex px-2 py-1 rounded-lg text-xs font-medium ${getPlanBadge(restaurant.planName)}`}>
          {restaurant.planName}
        </span>
      </td>
      <td className="py-3 px-4">
        <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-medium ${
          restaurant.isActive ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
        }`}>
          <span className={`w-1.5 h-1.5 rounded-full ${restaurant.isActive ? 'bg-green-500' : 'bg-red-500'}`} />
          {restaurant.isActive ? 'Active' : 'Suspended'}
        </span>
      </td>
      <td className="py-3 px-4">
        <span className="font-medium text-slate-700">{restaurant.ordersCount}</span>
      </td>
      <td className="py-3 px-4">
        <span className="font-semibold text-slate-800">₹{restaurant.revenue.toLocaleString()}</span>
      </td>
      <td className="py-3 px-4">
        <div className="flex items-center gap-1">
          <Link
            href={`/superadmin/restaurants/${restaurant.id}`}
            className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <Eye className="w-4 h-4 text-slate-400 hover:text-blue-500" />
          </Link>
          <button
            onClick={() => onToggleStatus(restaurant.id)}
            className={`p-1.5 rounded-lg transition-colors ${
              restaurant.isActive
                ? 'hover:bg-red-50 text-red-400 hover:text-red-600'
                : 'hover:bg-green-50 text-green-400 hover:text-green-600'
            }`}
          >
            {restaurant.isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
        </div>
      </td>
    </tr>
  );
};

// Activity Item Component
const ActivityItem = ({ activity, index, isLast }: { activity: any; index: number; isLast: boolean }) => {
  const Icon = activity.icon;
  const iconBgColors: Record<string, string> = {
    signup: 'bg-green-100 text-green-600',
    order: 'bg-blue-100 text-blue-600',
    upgrade: 'bg-purple-100 text-purple-600',
    ticket: 'bg-orange-100 text-orange-600',
    menu: 'bg-teal-100 text-teal-600',
    payment: 'bg-emerald-100 text-emerald-600',
    staff: 'bg-indigo-100 text-indigo-600',
  };

  return (
    <div className={`px-4 py-3 hover:bg-slate-50 transition-colors ${!isLast ? 'border-b border-slate-100' : ''}`}>
      <div className="flex gap-3">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${iconBgColors[activity.type]}`}>
          <Icon className="w-4 h-4" />
        </div>
        <div className="flex-1">
          <p className="text-sm text-slate-700">{activity.text}</p>
          <div className="flex items-center gap-1 mt-1">
            <Clock className="w-3 h-3 text-slate-400" />
            <span className="text-xs text-slate-400">{activity.time}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Quick Action Card Component
const QuickActionCard = ({ href, title, description, icon: Icon, gradient }: any) => {
  return (
    <Link
      href={href}
      className="group relative flex items-center gap-4 p-4 rounded-xl border border-slate-200 hover:shadow-md transition-all bg-white"
    >
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${gradient} flex items-center justify-center`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div className="flex-1">
        <p className="font-semibold text-slate-800 group-hover:text-orange-600 transition-colors">{title}</p>
        <p className="text-xs text-slate-500">{description}</p>
      </div>
      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-orange-500 group-hover:translate-x-1 transition-all" />
    </Link>
  );
};

export default function SuperAdminDashboardPage() {
  const { 
    currentUser, 
    restaurants, 
    orders, 
    subscriptions, 
    tickets, 
    plans, 
    toggleRestaurantStatus 
  } = useApp();

  // Calculate stats
  const stats = useMemo(() => {
    const totalRevenue = orders
      .filter(o => o.status !== 'cancelled')
      .reduce((sum, o) => sum + o.total, 0);
    
    const activeRestaurants = restaurants.filter(r => r.isActive).length;
    const activeSubscriptions = subscriptions.filter(s => s.status === 'active' || s.status === 'trial').length;
    const openTickets = tickets.filter(t => t.status === 'open' || t.status === 'in_progress').length;

    return {
      totalRevenue,
      activeRestaurants,
      activeSubscriptions,
      openTickets,
      totalRestaurants: restaurants.length,
      totalOrders: orders.length,
    };
  }, [restaurants, orders, subscriptions, tickets]);

  // Prepare restaurant data with stats
  const restaurantStats = useMemo(() => {
    return restaurants.map(restaurant => {
      const restaurantOrders = orders.filter(o => o.restaurantId === restaurant.id);
      const revenue = restaurantOrders
        .filter(o => o.status !== 'cancelled')
        .reduce((sum, o) => sum + o.total, 0);
      const plan = plans.find(p => p.id === restaurant.planId);
      
      return {
        ...restaurant,
        ordersCount: restaurantOrders.length,
        revenue,
        planName: plan?.name || 'N/A',
      };
    });
  }, [restaurants, orders, plans]);

  // Recent activity data
  const recentActivity = [
    { id: 1, text: 'New restaurant "Bombay Bites" signed up', time: '2 minutes ago', type: 'signup', icon: UserPlus },
    { id: 2, text: 'Order #ORD-X3K placed at Spice Garden', time: '5 minutes ago', type: 'order', icon: ShoppingBag },
    { id: 3, text: 'The Italian Corner upgraded to Enterprise plan', time: '15 minutes ago', type: 'upgrade', icon: Zap },
    { id: 4, text: 'Support ticket #TKT-005 marked as resolved', time: '30 minutes ago', type: 'ticket', icon: HeadphonesIcon },
    { id: 5, text: 'Sushi Master added 8 new menu items', time: '1 hour ago', type: 'menu', icon: Package },
    { id: 6, text: 'Payment received from Spice Garden - ₹4,999', time: '2 hours ago', type: 'payment', icon: DollarSign },
  ];

  // Stats cards configuration
  const statsCards = [
    { label: 'Total Restaurants', value: stats.totalRestaurants, trend: '+12%', trendUp: true, icon: Store, gradient: 'from-orange-500 to-red-500' },
    { label: 'Active Restaurants', value: stats.activeRestaurants, trend: '+8%', trendUp: true, icon: Activity, gradient: 'from-emerald-500 to-green-500' },
    { label: 'Total Orders', value: stats.totalOrders, trend: '+24%', trendUp: true, icon: ShoppingBag, gradient: 'from-blue-500 to-cyan-500' },
    { label: 'Total Revenue', value: `₹${(stats.totalRevenue / 1000).toFixed(1)}k`, trend: '+18%', trendUp: true, icon: DollarSign, gradient: 'from-purple-500 to-violet-500' },
    { label: 'Active Subs', value: stats.activeSubscriptions, trend: '+5%', trendUp: true, icon: CreditCard, gradient: 'from-amber-500 to-yellow-500' },
    { label: 'Open Tickets', value: stats.openTickets, trend: '-15%', trendUp: false, icon: HeadphonesIcon, gradient: 'from-pink-500 to-rose-500' },
  ];

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Platform Overview</h1>
          <p className="text-slate-500 mt-1">
            Welcome back, <span className="font-semibold text-slate-700">{currentUser?.name || 'Admin'}</span>
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-lg">
          <Clock className="w-4 h-4 text-slate-500" />
          <span className="text-sm text-slate-600">{today}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {statsCards.map((stat, idx) => (
          <StatsCard key={stat.label} stat={stat} index={idx} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Restaurants Table */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-orange-500" />
              <h2 className="font-semibold text-slate-800">Restaurants Overview</h2>
            </div>
            <Link
              href="/superadmin/restaurants"
              className="flex items-center gap-1 text-sm text-orange-600 hover:text-orange-700 font-medium"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left py-3 px-4 text-xs font-medium text-slate-500">Restaurant</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-slate-500">Plan</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-slate-500">Status</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-slate-500">Orders</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-slate-500">Revenue</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-slate-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {restaurantStats.slice(0, 5).map((restaurant) => (
                  <RestaurantRow
                    key={restaurant.id}
                    restaurant={restaurant}
                    onToggleStatus={toggleRestaurantStatus}
                  />
                ))}
              </tbody>
            </table>
          </div>
          
          {restaurantStats.length > 5 && (
            <div className="p-4 border-t border-slate-100 text-center">
              <Link href="/superadmin/restaurants" className="text-sm text-orange-600 hover:text-orange-700">
                Show all {restaurantStats.length} restaurants
              </Link>
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-5 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-500" />
              <h2 className="font-semibold text-slate-800">Recent Activity</h2>
            </div>
          </div>
          <div className="max-h-[500px] overflow-y-auto">
            {recentActivity.map((activity, idx) => (
              <ActivityItem
                key={activity.id}
                activity={activity}
                index={idx}
                isLast={idx === recentActivity.length - 1}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-5 border-b border-slate-100">
          <h2 className="font-semibold text-slate-800">Quick Actions</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5">
          <QuickActionCard
            href="/superadmin/restaurants/new"
            title="Add Restaurant"
            description="Onboard a new restaurant"
            icon={Plus}
            gradient="from-blue-500 to-cyan-500"
          />
          <QuickActionCard
            href="/superadmin/plans"
            title="Manage Plans"
            description="Edit pricing and features"
            icon={CreditCard}
            gradient="from-purple-500 to-pink-500"
          />
          <QuickActionCard
            href="/superadmin/reports"
            title="View Reports"
            description="Platform analytics & metrics"
            icon={BarChart3}
            gradient="from-emerald-500 to-green-500"
          />
        </div>
      </div>
    </div>
  );
}