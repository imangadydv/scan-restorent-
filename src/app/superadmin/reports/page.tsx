'use client';

import React, { useMemo } from 'react';
import { useApp } from '@/lib/store';
import {
  BarChart3,
  TrendingUp,
  ShoppingBag,
  DollarSign,
  Users,
  Store,
  ArrowUpRight,
  PieChart,
} from 'lucide-react';

export default function SuperAdminReportsPage() {
  const { restaurants, orders, plans, subscriptions, users } = useApp();

  // Revenue by restaurant
  const revenueByRestaurant = useMemo(() => {
    return restaurants.map((r) => {
      const revenue = orders
        .filter((o) => o.restaurantId === r.id && o.status !== 'cancelled')
        .reduce((sum, o) => sum + o.total, 0);
      return { name: r.name, revenue };
    }).sort((a, b) => b.revenue - a.revenue);
  }, [restaurants, orders]);

  const maxRevenue = Math.max(...revenueByRestaurant.map((r) => r.revenue), 1);

  // Orders by restaurant
  const ordersByRestaurant = useMemo(() => {
    return restaurants.map((r) => {
      const count = orders.filter((o) => o.restaurantId === r.id).length;
      return { name: r.name, count };
    }).sort((a, b) => b.count - a.count);
  }, [restaurants, orders]);

  const maxOrders = Math.max(...ordersByRestaurant.map((r) => r.count), 1);

  // Plan distribution
  const planDistribution = useMemo(() => {
    const dist: Record<string, { name: string; count: number; color: string }> = {};
    const colors = ['bg-blue-500', 'bg-purple-500', 'bg-amber-500', 'bg-emerald-500'];
    plans.forEach((p, i) => {
      dist[p.id] = { name: p.name, count: 0, color: colors[i % colors.length] };
    });
    restaurants.forEach((r) => {
      if (dist[r.planId]) {
        dist[r.planId].count += 1;
      }
    });
    return Object.values(dist);
  }, [plans, restaurants]);

  const totalPlanCount = planDistribution.reduce((sum, p) => sum + p.count, 0);

  // Platform-wide stats
  const totalRevenue = orders.filter((o) => o.status !== 'cancelled').reduce((sum, o) => sum + o.total, 0);
  const totalOrders = orders.length;
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  const totalStaff = users.filter((u) => u.role !== 'superadmin' && u.role !== 'customer').length;

  // Growth metrics (dummy)
  const growthMetrics = [
    { label: 'Restaurant Growth', value: '+23%', period: 'vs last month', gradient: 'from-green-500 to-emerald-600', bg: 'from-green-50 to-emerald-50' },
    { label: 'Order Growth', value: '+18%', period: 'vs last month', gradient: 'from-blue-500 to-indigo-600', bg: 'from-blue-50 to-indigo-50' },
    { label: 'Revenue Growth', value: '+31%', period: 'vs last month', gradient: 'from-purple-500 to-violet-600', bg: 'from-purple-50 to-violet-50' },
    { label: 'User Growth', value: '+12%', period: 'vs last month', gradient: 'from-orange-500 to-red-500', bg: 'from-orange-50 to-red-50' },
  ];

  const statCards = [
    { label: 'Total Restaurants', value: restaurants.length, growth: '+23%', icon: Store, gradient: 'from-blue-500 to-indigo-600', shadow: 'shadow-blue-200/50' },
    { label: 'Total Orders', value: totalOrders, growth: '+18%', icon: ShoppingBag, gradient: 'from-orange-500 to-red-500', shadow: 'shadow-orange-200/50' },
    { label: 'Total Revenue', value: `\u20B9${(totalRevenue / 1000).toFixed(1)}k`, growth: '+31%', icon: DollarSign, gradient: 'from-emerald-500 to-green-600', shadow: 'shadow-emerald-200/50' },
    { label: 'Avg Order Value', value: `\u20B9${avgOrderValue.toFixed(0)}`, growth: '+5%', icon: TrendingUp, gradient: 'from-purple-500 to-violet-600', shadow: 'shadow-purple-200/50' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="animate-fade-in-up stagger-1">
        <h1 className="text-2xl font-bold text-gradient">Platform Reports</h1>
        <p className="text-slate-500 mt-1">Analytics and insights across the entire platform.</p>
      </div>

      {/* Platform Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className={`card-premium rounded-2xl p-5 card-hover animate-fade-in-up stagger-${index + 2}`}>
              <div className="flex items-center justify-between">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg ${stat.shadow}`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs text-emerald-600 font-bold flex items-center gap-0.5 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-100">
                  <ArrowUpRight className="w-3 h-3" /> {stat.growth}
                </span>
              </div>
              <p className="text-2xl font-bold text-gradient mt-3">{stat.value}</p>
              <p className="text-xs text-slate-400 mt-1">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue by Restaurant - Horizontal Bar Chart */}
        <div className="card-premium rounded-2xl p-6 animate-fade-in-up stagger-6">
          <div className="flex items-center gap-2.5 mb-6">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-sm">
              <BarChart3 className="w-4.5 h-4.5 text-white" />
            </div>
            <h2 className="text-lg font-semibold text-slate-800">Revenue by Restaurant</h2>
          </div>
          <div className="space-y-4">
            {revenueByRestaurant.map((r, i) => (
              <div key={r.name}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium text-slate-700">{r.name}</span>
                  <span className="text-sm font-bold text-gradient">&#8377;{r.revenue.toLocaleString()}</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                  <div
                    className="h-3 rounded-full transition-all duration-1000 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 shadow-sm"
                    style={{ width: `${(r.revenue / maxRevenue) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Orders by Restaurant - Horizontal Bar Chart */}
        <div className="card-premium rounded-2xl p-6 animate-fade-in-up stagger-7">
          <div className="flex items-center gap-2.5 mb-6">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-sm">
              <ShoppingBag className="w-4.5 h-4.5 text-white" />
            </div>
            <h2 className="text-lg font-semibold text-slate-800">Orders by Restaurant</h2>
          </div>
          <div className="space-y-4">
            {ordersByRestaurant.map((r, i) => (
              <div key={r.name}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium text-slate-700">{r.name}</span>
                  <span className="text-sm font-bold text-gradient">{r.count} orders</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                  <div
                    className="h-3 rounded-full transition-all duration-1000 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 shadow-sm"
                    style={{ width: `${(r.count / maxOrders) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Plan Distribution */}
        <div className="card-premium rounded-2xl p-6 animate-fade-in-up stagger-8">
          <div className="flex items-center gap-2.5 mb-6">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-sm">
              <PieChart className="w-4.5 h-4.5 text-white" />
            </div>
            <h2 className="text-lg font-semibold text-slate-800">Plan Distribution</h2>
          </div>
          {/* Visual pie-like display */}
          <div className="flex items-center justify-center mb-6">
            <div className="relative w-40 h-40">
              <svg viewBox="0 0 36 36" className="w-40 h-40 transform -rotate-90">
                {(() => {
                  let offset = 0;
                  const colors = ['#3B82F6', '#8B5CF6', '#F59E0B', '#10B981'];
                  return planDistribution.map((p, i) => {
                    const pct = totalPlanCount > 0 ? (p.count / totalPlanCount) * 100 : 0;
                    const dashArray = `${pct} ${100 - pct}`;
                    const el = (
                      <circle
                        key={p.name}
                        cx="18"
                        cy="18"
                        r="15.91549431"
                        fill="none"
                        stroke={colors[i % colors.length]}
                        strokeWidth="3.5"
                        strokeDasharray={dashArray}
                        strokeDashoffset={-offset}
                        className="transition-all duration-1000"
                        strokeLinecap="round"
                      />
                    );
                    offset += pct;
                    return el;
                  });
                })()}
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <p className="text-2xl font-bold text-gradient">{totalPlanCount}</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider">Total</p>
              </div>
            </div>
          </div>
          {/* Legend */}
          <div className="space-y-2.5">
            {planDistribution.map((p) => (
              <div key={p.name} className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-2.5">
                  <div className={`w-3 h-3 rounded-full ${p.color} shadow-sm`} />
                  <span className="text-sm text-slate-700 font-medium">{p.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-gradient">{p.count}</span>
                  <span className="text-xs text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded-md">
                    {totalPlanCount > 0 ? ((p.count / totalPlanCount) * 100).toFixed(0) : 0}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Growth Metrics */}
        <div className="card-premium rounded-2xl p-6 animate-fade-in-up stagger-8">
          <div className="flex items-center gap-2.5 mb-6">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-sm">
              <TrendingUp className="w-4.5 h-4.5 text-white" />
            </div>
            <h2 className="text-lg font-semibold text-slate-800">Growth Metrics</h2>
          </div>
          <div className="space-y-3">
            {growthMetrics.map((metric, i) => (
              <div key={metric.label} className={`p-4 rounded-xl bg-gradient-to-r ${metric.bg} border border-white/50 card-hover transition-all duration-300`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-700">{metric.label}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{metric.period}</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${metric.gradient} flex items-center justify-center shadow-sm`}>
                      <ArrowUpRight className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-2xl font-bold text-gradient">{metric.value}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
