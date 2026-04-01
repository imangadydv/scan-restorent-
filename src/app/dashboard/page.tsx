'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/store';
import {
  ShoppingBag,
  IndianRupee,
  Clock,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  UtensilsCrossed,
  ClipboardList,
  QrCode,
  UserPlus,
  X,
  Eye,
  Trophy,
  ChevronRight,
  CalendarDays,
} from 'lucide-react';

export default function DashboardPage() {
  const { currentUser, currentRestaurant, orders, menuItems, updateOrderStatus } = useApp();
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [chartPeriod, setChartPeriod] = useState<'7D' | '30D' | '90D'>('7D');

  // ---- Data computations ----

  const restaurantOrders = useMemo(
    () => orders.filter((o) => o.restaurantId === currentRestaurant?.id),
    [orders, currentRestaurant]
  );

  const todayOrders = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    return restaurantOrders.filter((o) => o.createdAt.split('T')[0] === today);
  }, [restaurantOrders]);

  const todayRevenue = useMemo(
    () =>
      todayOrders
        .filter((o) => o.status !== 'cancelled')
        .reduce((sum, o) => sum + o.total, 0),
    [todayOrders]
  );

  const activeOrders = useMemo(
    () =>
      restaurantOrders.filter(
        (o) => !['completed', 'cancelled'].includes(o.status)
      ),
    [restaurantOrders]
  );

  const avgOrderValue = useMemo(() => {
    const completed = restaurantOrders.filter((o) => o.status !== 'cancelled');
    if (completed.length === 0) return 0;
    return completed.reduce((sum, o) => sum + o.total, 0) / completed.length;
  }, [restaurantOrders]);

  const recentOrders = useMemo(
    () =>
      [...restaurantOrders]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 10),
    [restaurantOrders]
  );

  const popularItems = useMemo(() => {
    const counts: Record<string, { name: string; count: number; foodType?: string }> = {};
    restaurantOrders.forEach((order) => {
      order.items.forEach((item) => {
        if (!counts[item.menuItemId]) {
          const menuItem = menuItems.find((m) => m.id === item.menuItemId);
          counts[item.menuItemId] = {
            name: item.menuItemName,
            count: 0,
            foodType: menuItem?.foodType || 'veg',
          };
        }
        counts[item.menuItemId].count += item.quantity;
      });
    });
    return Object.values(counts)
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, [restaurantOrders, menuItems]);

  const maxPopularCount = Math.max(...popularItems.map((i) => i.count), 1);

  const periodDays = chartPeriod === '7D' ? 7 : chartPeriod === '30D' ? 30 : 90;

  const revenueData = useMemo(() => {
    const days: { label: string; revenue: number; fullDate: string }[] = [];
    for (let i = periodDays - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const dayLabel =
        periodDays <= 7
          ? date.toLocaleDateString('en-US', { weekday: 'short' })
          : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      const revenue = restaurantOrders
        .filter(
          (o) => o.createdAt.split('T')[0] === dateStr && o.status !== 'cancelled'
        )
        .reduce((sum, o) => sum + o.total, 0);
      days.push({ label: dayLabel, revenue, fullDate: dateStr });
    }
    return days;
  }, [restaurantOrders, periodDays]);

  const maxRevenue = Math.max(...revenueData.map((d) => d.revenue), 1);
  const totalPeriodRevenue = revenueData.reduce((sum, d) => sum + d.revenue, 0);

  // Display only a subset of bars if period is large
  const displayBars = useMemo(() => {
    if (periodDays <= 7) return revenueData;
    if (periodDays <= 30) {
      // Show every 3rd day label
      return revenueData.map((d, i) => ({
        ...d,
        label: i % 3 === 0 ? d.label : '',
      }));
    }
    // 90 days: show every 7th
    return revenueData.map((d, i) => ({
      ...d,
      label: i % 7 === 0 ? d.label : '',
    }));
  }, [revenueData, periodDays]);

  const statusStyles: Record<string, string> = {
    new: 'status-new',
    accepted: 'status-accepted',
    preparing: 'status-preparing',
    ready: 'status-ready',
    served: 'status-served',
    completed: 'status-completed',
    cancelled: 'status-cancelled',
  };

  const timeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  };

  const currency = currentRestaurant?.settings.currencySymbol || '\u20B9';

  const viewOrder = restaurantOrders.find((o) => o.id === selectedOrder);

  // Dynamic greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const firstName = currentUser?.name?.split(' ')[0] || 'Admin';

  const todayDateStr = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  // ---- Stats cards config ----
  const statsCards = [
    {
      title: "Today's Orders",
      value: todayOrders.length.toString(),
      icon: ShoppingBag,
      gradient: 'gradient-primary',
      shadowColor: 'shadow-[0_8px_30px_-6px_rgba(249,115,22,0.35)]',
      stripeColor: 'from-orange-400 to-orange-600',
      trend: '+12%',
      trendUp: true,
      trendLabel: 'vs yesterday',
    },
    {
      title: "Today's Revenue",
      value: `${currency}${todayRevenue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`,
      icon: IndianRupee,
      gradient: 'gradient-success',
      shadowColor: 'shadow-[0_8px_30px_-6px_rgba(16,185,129,0.35)]',
      stripeColor: 'from-emerald-400 to-emerald-600',
      trend: '+8%',
      trendUp: true,
      trendLabel: 'vs yesterday',
    },
    {
      title: 'Active Orders',
      value: activeOrders.length.toString(),
      icon: Clock,
      gradient: 'gradient-info',
      shadowColor: 'shadow-[0_8px_30px_-6px_rgba(59,130,246,0.35)]',
      stripeColor: 'from-blue-400 to-blue-600',
      trend: activeOrders.length > 0 ? 'Live' : '0',
      trendUp: true,
      trendLabel: 'right now',
      pulse: activeOrders.length > 0,
    },
    {
      title: 'Avg Order Value',
      value: `${currency}${avgOrderValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`,
      icon: TrendingUp,
      gradient: 'gradient-purple',
      shadowColor: 'shadow-[0_8px_30px_-6px_rgba(139,92,246,0.35)]',
      stripeColor: 'from-purple-400 to-purple-600',
      trend: '+5%',
      trendUp: true,
      trendLabel: 'vs last week',
    },
  ];

  // ---- Quick actions config ----
  const quickActions = [
    {
      href: '/dashboard/menu',
      title: 'Add Menu Item',
      description: 'Create new dishes and beverages',
      icon: UtensilsCrossed,
      color: 'orange',
      borderColor: 'border-l-orange-500',
      iconBg: 'from-orange-400 to-orange-600',
      hoverBg: 'hover:bg-orange-50/50',
    },
    {
      href: '/dashboard/orders',
      title: 'View All Orders',
      description: 'Track and manage all orders',
      icon: ClipboardList,
      color: 'blue',
      borderColor: 'border-l-blue-500',
      iconBg: 'from-blue-400 to-blue-600',
      hoverBg: 'hover:bg-blue-50/50',
    },
    {
      href: '/dashboard/qr-codes',
      title: 'Generate QR',
      description: 'Create QR codes for tables',
      icon: QrCode,
      color: 'purple',
      borderColor: 'border-l-purple-500',
      iconBg: 'from-purple-400 to-purple-600',
      hoverBg: 'hover:bg-purple-50/50',
    },
    {
      href: '/dashboard/staff',
      title: 'Add Staff',
      description: 'Manage your team members',
      icon: UserPlus,
      color: 'green',
      borderColor: 'border-l-green-500',
      iconBg: 'from-emerald-400 to-emerald-600',
      hoverBg: 'hover:bg-emerald-50/50',
    },
  ];

  // Rank badge styling for popular items
  const rankBadge = (idx: number) => {
    if (idx === 0)
      return 'bg-gradient-to-br from-amber-300 to-yellow-500 text-amber-900 shadow-sm shadow-amber-200';
    if (idx === 1)
      return 'bg-gradient-to-br from-gray-200 to-gray-400 text-gray-700 shadow-sm shadow-gray-200';
    if (idx === 2)
      return 'bg-gradient-to-br from-orange-300 to-orange-500 text-orange-900 shadow-sm shadow-orange-200';
    return 'bg-gray-100 text-gray-500';
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
              {getGreeting()},{' '}
              <span className="text-gradient">{firstName}</span>!{' '}
              <span className="inline-block animate-wiggle">&#x1F44B;</span>
            </h1>
            <p className="text-gray-500 mt-1 text-sm lg:text-base">
              <span className="font-semibold text-gray-700">
                {currentRestaurant?.name || 'Your Restaurant'}
              </span>{' '}
              Dashboard
            </p>
          </div>
          <div className="flex items-center gap-2 bg-white/80 border border-gray-100 rounded-full px-4 py-2 shadow-sm self-start">
            <CalendarDays className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-medium text-gray-600">{todayDateStr}</span>
          </div>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
        {statsCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className={`card-premium overflow-hidden animate-fade-in-up stagger-${idx + 1}`}
            >
              {/* Top gradient stripe */}
              <div className={`h-1 bg-gradient-to-r ${card.stripeColor}`} />
              <div className="p-5">
                <div className="flex items-start justify-between">
                  <div className={`w-11 h-11 rounded-xl ${card.gradient} flex items-center justify-center ${card.shadowColor}`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div
                    className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${
                      card.pulse
                        ? 'bg-green-50 text-green-600'
                        : card.trendUp
                        ? 'bg-green-50 text-green-600'
                        : 'bg-red-50 text-red-600'
                    }`}
                  >
                    {card.pulse ? (
                      <span className="relative flex h-2 w-2 mr-0.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                      </span>
                    ) : card.trendUp ? (
                      <ArrowUpRight className="w-3 h-3" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3" />
                    )}
                    <span>{card.trend}</span>
                  </div>
                </div>
                <p className="text-2xl lg:text-3xl font-bold text-gray-900 mt-3 tracking-tight number-counter">
                  {card.value}
                </p>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-xs text-gray-400 font-medium">{card.title}</p>
                  <p className="text-[10px] text-gray-300">{card.trendLabel}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Revenue Chart + Popular Items */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 card-premium overflow-hidden animate-fade-in-up stagger-5">
          <div className="h-1 bg-gradient-to-r from-orange-400 via-orange-500 to-red-500" />
          <div className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Revenue Overview</h2>
                <p className="text-sm text-gray-400 mt-0.5">
                  Total: <span className="font-semibold text-gray-700">{currency}{totalPeriodRevenue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                </p>
              </div>
              <div className="flex items-center bg-gray-100 rounded-xl p-1 gap-0.5">
                {(['7D', '30D', '90D'] as const).map((period) => (
                  <button
                    key={period}
                    onClick={() => setChartPeriod(period)}
                    className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 ${
                      chartPeriod === period
                        ? 'gradient-primary text-white shadow-sm'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>
            {/* Bar chart */}
            <div className="flex items-end gap-[3px] h-48 sm:h-56">
              {displayBars.map((day, idx) => (
                <div
                  key={`${day.fullDate}-${idx}`}
                  className="flex-1 flex flex-col items-center gap-1 group"
                >
                  <span className="text-[9px] text-gray-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {day.revenue > 0
                      ? `${currency}${day.revenue >= 1000 ? `${(day.revenue / 1000).toFixed(1)}k` : day.revenue.toFixed(0)}`
                      : ''}
                  </span>
                  <div className="w-full relative">
                    <div
                      className="w-full gradient-primary rounded-t-md transition-all duration-500 ease-out group-hover:opacity-90 min-h-[3px]"
                      style={{
                        height: `${Math.max((day.revenue / maxRevenue) * 100, 2)}%`,
                        minHeight: day.revenue > 0 ? '8px' : '3px',
                        animationDelay: `${idx * 30}ms`,
                      }}
                    />
                  </div>
                  {day.label && (
                    <span className="text-[9px] text-gray-400 font-medium whitespace-nowrap">
                      {day.label}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Popular Items */}
        <div className="card-premium overflow-hidden animate-fade-in-up stagger-6">
          <div className="h-1 bg-gradient-to-r from-amber-400 to-yellow-500" />
          <div className="p-6">
            <div className="flex items-center gap-2 mb-5">
              <Trophy className="w-5 h-5 text-amber-500" />
              <h2 className="text-lg font-bold text-gray-900">Top Selling Items</h2>
            </div>
            {popularItems.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Trophy className="w-6 h-6 text-gray-300" />
                </div>
                <p className="text-gray-400 text-sm">No data yet</p>
              </div>
            ) : (
              <ul className="space-y-3.5">
                {popularItems.map((item, idx) => (
                  <li key={item.name} className="flex items-center gap-3 group">
                    <span
                      className={`w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-bold ${rankBadge(idx)}`}
                    >
                      {idx + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-2 h-2 rounded-full flex-shrink-0 ${
                            item.foodType === 'veg' ? 'bg-green-500' : 'bg-red-500'
                          }`}
                        />
                        <p className="text-sm font-medium text-gray-800 truncate">
                          {item.name}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 mt-1.5">
                        <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full gradient-primary rounded-full transition-all duration-700"
                            style={{
                              width: `${(item.count / maxPopularCount) * 100}%`,
                            }}
                          />
                        </div>
                        <span className="text-[11px] text-gray-400 font-semibold tabular-nums whitespace-nowrap">
                          {item.count} sold
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="card-premium overflow-hidden animate-fade-in-up stagger-7">
        <div className="h-1 bg-gradient-to-r from-blue-400 to-indigo-500" />
        <div className="flex items-center justify-between px-6 py-4">
          <h2 className="text-lg font-bold text-gray-900">Recent Orders</h2>
          <Link
            href="/dashboard/orders"
            className="flex items-center gap-1 text-sm text-orange-600 hover:text-orange-700 font-semibold transition-colors group"
          >
            View All
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-y border-gray-50 bg-gray-50/50">
                <th className="text-left py-3 px-6 text-[11px] text-gray-400 font-semibold uppercase tracking-wider">
                  Order #
                </th>
                <th className="text-left py-3 px-4 text-[11px] text-gray-400 font-semibold uppercase tracking-wider">
                  Table
                </th>
                <th className="text-left py-3 px-4 text-[11px] text-gray-400 font-semibold uppercase tracking-wider">
                  Items
                </th>
                <th className="text-left py-3 px-4 text-[11px] text-gray-400 font-semibold uppercase tracking-wider">
                  Total
                </th>
                <th className="text-left py-3 px-4 text-[11px] text-gray-400 font-semibold uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left py-3 px-4 text-[11px] text-gray-400 font-semibold uppercase tracking-wider">
                  Time
                </th>
                <th className="text-left py-3 px-4 text-[11px] text-gray-400 font-semibold uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center">
                        <ClipboardList className="w-6 h-6 text-gray-300" />
                      </div>
                      <p className="text-gray-400 text-sm">No orders yet</p>
                    </div>
                  </td>
                </tr>
              ) : (
                recentOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-gray-50/80 hover:bg-orange-50/30 cursor-pointer transition-colors duration-150"
                    onClick={() => setSelectedOrder(order.id)}
                  >
                    <td className="py-3.5 px-6">
                      <span className="font-semibold text-gray-800">
                        {order.orderNumber}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 text-gray-600 bg-gray-100 rounded-md px-2 py-0.5 text-xs font-medium">
                        T-{order.tableNumber}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-gray-500">
                      {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-gray-800">
                        {currency}
                        {order.total.toFixed(0)}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block rounded-full px-3 py-1 text-[11px] font-semibold capitalize ${
                          statusStyles[order.status] || 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-xs text-gray-400 whitespace-nowrap">
                      {timeAgo(order.createdAt)}
                    </td>
                    <td className="py-3.5 px-4">
                      <button className="p-1.5 rounded-lg hover:bg-orange-100 transition-colors group">
                        <Eye className="w-4 h-4 text-gray-400 group-hover:text-orange-600" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="animate-fade-in-up stagger-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.href}
                href={action.href}
                className={`card-premium overflow-hidden group border-l-4 ${action.borderColor} ${action.hoverBg} transition-all duration-200 hover:scale-[1.02] hover:shadow-elevated`}
              >
                <div className="p-5">
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-11 h-11 rounded-xl bg-gradient-to-br ${action.iconBg} flex items-center justify-center flex-shrink-0 shadow-sm`}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold text-gray-800 group-hover:text-gray-900">
                        {action.title}
                      </h3>
                      <p className="text-xs text-gray-400 mt-0.5">{action.description}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-400 flex-shrink-0 mt-0.5 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Order Detail Modal */}
      {viewOrder && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedOrder(null)}
        >
          {/* Glass overlay */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

          {/* Modal content */}
          <div
            className="relative card-premium w-full max-w-lg max-h-[85vh] overflow-y-auto animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top stripe */}
            <div className="h-1 bg-gradient-to-r from-orange-400 to-red-500" />

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Order {viewOrder.orderNumber}
                </h3>
                <p className="text-sm text-gray-400 mt-0.5">
                  Table {viewOrder.tableNumber}
                  {viewOrder.customerName ? ` | ${viewOrder.customerName}` : ' | Guest'}
                </p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-5">
              {/* Status */}
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500">Status:</span>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                    statusStyles[viewOrder.status] || 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {viewOrder.status}
                </span>
              </div>

              {/* Items */}
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-3">Order Items</p>
                <ul className="space-y-2">
                  {viewOrder.items.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center justify-between text-sm bg-gray-50/80 rounded-xl px-4 py-3 border border-gray-100/50"
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                            item.foodType === 'veg' ? 'bg-green-500' : 'bg-red-500'
                          }`}
                        />
                        <span className="text-gray-700 font-medium">{item.menuItemName}</span>
                        <span className="text-gray-400 text-xs bg-gray-200/60 px-1.5 py-0.5 rounded">
                          x{item.quantity}
                        </span>
                      </div>
                      <span className="font-bold text-gray-800">
                        {currency}
                        {item.total.toFixed(0)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bill Summary */}
              <div className="border-t border-gray-100 pt-4 space-y-2">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Subtotal</span>
                  <span>
                    {currency}
                    {viewOrder.subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Tax</span>
                  <span>
                    {currency}
                    {viewOrder.tax.toFixed(2)}
                  </span>
                </div>
                {viewOrder.serviceCharge > 0 && (
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Service Charge</span>
                    <span>
                      {currency}
                      {viewOrder.serviceCharge.toFixed(2)}
                    </span>
                  </div>
                )}
                <div className="divider-gradient !h-px my-2" />
                <div className="flex justify-between text-base font-bold text-gray-900 pt-1">
                  <span>Total</span>
                  <span className="text-gradient">
                    {currency}
                    {viewOrder.total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Status Actions */}
              {viewOrder.status !== 'completed' && viewOrder.status !== 'cancelled' && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {viewOrder.status === 'new' && (
                    <button
                      onClick={() => {
                        updateOrderStatus(viewOrder.id, 'accepted');
                      }}
                      className="btn-primary !py-2.5 !px-5 !text-sm !rounded-xl"
                    >
                      Accept Order
                    </button>
                  )}
                  {viewOrder.status === 'accepted' && (
                    <button
                      onClick={() => {
                        updateOrderStatus(viewOrder.id, 'preparing');
                      }}
                      className="btn-primary !py-2.5 !px-5 !text-sm !rounded-xl"
                    >
                      Start Preparing
                    </button>
                  )}
                  {viewOrder.status === 'preparing' && (
                    <button
                      onClick={() => {
                        updateOrderStatus(viewOrder.id, 'ready');
                      }}
                      className="btn-primary !py-2.5 !px-5 !text-sm !rounded-xl"
                    >
                      Mark Ready
                    </button>
                  )}
                  {viewOrder.status === 'ready' && (
                    <button
                      onClick={() => {
                        updateOrderStatus(viewOrder.id, 'served');
                      }}
                      className="btn-primary !py-2.5 !px-5 !text-sm !rounded-xl"
                    >
                      Mark Served
                    </button>
                  )}
                  {viewOrder.status === 'served' && (
                    <button
                      onClick={() => {
                        updateOrderStatus(viewOrder.id, 'completed');
                      }}
                      className="btn-primary !py-2.5 !px-5 !text-sm !rounded-xl"
                    >
                      Complete Order
                    </button>
                  )}
                  <button
                    onClick={() => {
                      updateOrderStatus(viewOrder.id, 'cancelled');
                    }}
                    className="btn-outline !py-2.5 !px-5 !text-sm !rounded-xl !text-red-500 !border-red-200 hover:!bg-red-50 hover:!border-red-300"
                  >
                    Cancel
                  </button>
                </div>
              )}

              {/* Timestamp */}
              <div className="text-xs text-gray-400 pt-1">
                Placed {new Date(viewOrder.createdAt).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
