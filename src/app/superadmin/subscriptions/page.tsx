'use client';

import React, { useState, useMemo } from 'react';
import { useApp } from '@/lib/store';
import {
  Receipt,
  Search,
  Eye,
  X,
  Calendar,
  CreditCard,
  Store,
  Clock,
} from 'lucide-react';

export default function SuperAdminSubscriptionsPage() {
  const { subscriptions, restaurants, plans } = useApp();
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedSubscription, setSelectedSubscription] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const subscriptionData = useMemo(() => {
    return subscriptions
      .map((sub) => {
        const restaurant = restaurants.find((r) => r.id === sub.restaurantId);
        const plan = plans.find((p) => p.id === sub.planId);
        return {
          ...sub,
          restaurantName: restaurant?.name || 'Unknown',
          planName: plan?.name || 'Unknown',
        };
      })
      .filter((sub) => {
        const matchStatus = statusFilter === 'all' || sub.status === statusFilter;
        const matchSearch =
          sub.restaurantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          sub.planName.toLowerCase().includes(searchQuery.toLowerCase());
        return matchStatus && matchSearch;
      });
  }, [subscriptions, restaurants, plans, statusFilter, searchQuery]);

  const selectedSub = useMemo(() => {
    if (!selectedSubscription) return null;
    const sub = subscriptions.find((s) => s.id === selectedSubscription);
    if (!sub) return null;
    const restaurant = restaurants.find((r) => r.id === sub.restaurantId);
    const plan = plans.find((p) => p.id === sub.planId);
    return {
      ...sub,
      restaurantName: restaurant?.name || 'Unknown',
      planName: plan?.name || 'Unknown',
      restaurantEmail: restaurant?.email || '',
      restaurantCity: restaurant?.city || '',
    };
  }, [selectedSubscription, subscriptions, restaurants, plans]);

  const statusColors: Record<string, { badge: string; dot: string; gradient: string }> = {
    active: { badge: 'bg-emerald-50 text-emerald-700 border border-emerald-200', dot: 'bg-emerald-500', gradient: 'from-emerald-500 to-green-600' },
    expired: { badge: 'bg-red-50 text-red-700 border border-red-200', dot: 'bg-red-500', gradient: 'from-red-500 to-rose-600' },
    cancelled: { badge: 'bg-gray-50 text-gray-600 border border-gray-200', dot: 'bg-gray-400', gradient: 'from-gray-400 to-gray-500' },
    trial: { badge: 'bg-blue-50 text-blue-700 border border-blue-200', dot: 'bg-blue-500', gradient: 'from-blue-500 to-indigo-600' },
  };

  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = { all: subscriptions.length };
    subscriptions.forEach((s) => {
      counts[s.status] = (counts[s.status] || 0) + 1;
    });
    return counts;
  }, [subscriptions]);

  const statCards = [
    { label: 'Total', count: statusCounts.all || 0, icon: Receipt, gradient: 'from-slate-500 to-slate-700', bg: 'from-slate-50 to-slate-100/50' },
    { label: 'Active', count: statusCounts.active || 0, icon: Receipt, gradient: 'from-emerald-500 to-green-600', bg: 'from-emerald-50 to-green-50' },
    { label: 'Trial', count: statusCounts.trial || 0, icon: Clock, gradient: 'from-blue-500 to-indigo-600', bg: 'from-blue-50 to-indigo-50' },
    { label: 'Expired', count: statusCounts.expired || 0, icon: Receipt, gradient: 'from-red-500 to-rose-600', bg: 'from-red-50 to-rose-50' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="animate-fade-in-up stagger-1">
        <h1 className="text-2xl font-bold text-gradient">Subscription Management</h1>
        <p className="text-slate-500 mt-1">Track and manage all restaurant subscriptions.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className={`card-premium rounded-2xl p-4 card-hover animate-fade-in-up stagger-${index + 2}`}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gradient">{stat.count}</p>
                  <p className="text-xs text-slate-400">{stat.label}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="card-premium rounded-2xl p-4 animate-fade-in-up stagger-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <div className="input-premium flex items-center gap-2 px-3 py-2.5 rounded-xl">
              <Search className="w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by restaurant or plan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-sm text-slate-700 placeholder-slate-400 outline-none w-full"
              />
            </div>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="input-premium px-3 py-2 rounded-xl text-sm text-slate-700 outline-none cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="trial">Trial</option>
            <option value="expired">Expired</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="card-premium rounded-2xl overflow-hidden animate-fade-in-up stagger-7">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-gradient-to-r from-slate-50/80 to-slate-100/50">
                <th className="text-left py-3.5 px-6 text-slate-500 font-semibold text-xs uppercase tracking-wider">Restaurant</th>
                <th className="text-left py-3.5 px-4 text-slate-500 font-semibold text-xs uppercase tracking-wider">Plan</th>
                <th className="text-left py-3.5 px-4 text-slate-500 font-semibold text-xs uppercase tracking-wider">Start Date</th>
                <th className="text-left py-3.5 px-4 text-slate-500 font-semibold text-xs uppercase tracking-wider">End Date</th>
                <th className="text-left py-3.5 px-4 text-slate-500 font-semibold text-xs uppercase tracking-wider">Status</th>
                <th className="text-left py-3.5 px-4 text-slate-500 font-semibold text-xs uppercase tracking-wider">Amount</th>
                <th className="text-left py-3.5 px-4 text-slate-500 font-semibold text-xs uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {subscriptionData.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-slate-400">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center mx-auto mb-3">
                      <Receipt className="w-6 h-6 text-slate-300" />
                    </div>
                    No subscriptions found.
                  </td>
                </tr>
              ) : (
                subscriptionData.map((sub) => {
                  const colors = statusColors[sub.status] || statusColors.active;
                  return (
                    <tr key={sub.id} className="border-b border-slate-50 hover:bg-gradient-to-r hover:from-slate-50/50 hover:to-transparent transition-all duration-200">
                      <td className="py-3.5 px-6">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center shadow-sm">
                            <Store className="w-4 h-4 text-white" />
                          </div>
                          <span className="font-medium text-slate-800">{sub.restaurantName}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-sm">
                          {sub.planName}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">
                        {new Date(sub.startDate).toLocaleDateString()}
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">
                        {new Date(sub.endDate).toLocaleDateString()}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`flex items-center gap-1.5 w-fit px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${colors.badge}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
                          {sub.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-gradient">&#8377;{sub.amount.toLocaleString()}</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <button
                          onClick={() => setSelectedSubscription(sub.id)}
                          className="p-2 hover:bg-gradient-to-r hover:from-slate-100 hover:to-slate-50 rounded-xl transition-all duration-200 group"
                        >
                          <Eye className="w-4 h-4 text-slate-400 group-hover:text-orange-500 transition-colors" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Subscription Detail Modal */}
      {selectedSub && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-md">
          <div className="card-premium rounded-2xl shadow-elevated w-full max-w-md animate-scale-in">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-white to-slate-50/50">
              <h3 className="text-lg font-semibold text-gradient">Subscription Details</h3>
              <button onClick={() => setSelectedSubscription(null)} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-slate-50 to-white rounded-xl border border-slate-100 animate-fade-in-up stagger-1">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center shadow-lg shadow-orange-200/50">
                  <Store className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-slate-800">{selectedSub.restaurantName}</p>
                  <p className="text-xs text-slate-400">{selectedSub.restaurantEmail}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 animate-fade-in-up stagger-2">
                <div className="p-3.5 bg-gradient-to-br from-slate-50 to-white rounded-xl border border-slate-100">
                  <p className="text-xs text-slate-400 flex items-center gap-1"><CreditCard className="w-3 h-3" /> Plan</p>
                  <p className="text-sm font-bold text-slate-700 mt-1">{selectedSub.planName}</p>
                </div>
                <div className="p-3.5 bg-gradient-to-br from-slate-50 to-white rounded-xl border border-slate-100">
                  <p className="text-xs text-slate-400">Amount</p>
                  <p className="text-sm font-bold text-gradient mt-1">&#8377;{selectedSub.amount.toLocaleString()}</p>
                </div>
                <div className="p-3.5 bg-gradient-to-br from-slate-50 to-white rounded-xl border border-slate-100">
                  <p className="text-xs text-slate-400 flex items-center gap-1"><Calendar className="w-3 h-3" /> Start</p>
                  <p className="text-sm font-bold text-slate-700 mt-1">{new Date(selectedSub.startDate).toLocaleDateString()}</p>
                </div>
                <div className="p-3.5 bg-gradient-to-br from-slate-50 to-white rounded-xl border border-slate-100">
                  <p className="text-xs text-slate-400 flex items-center gap-1"><Calendar className="w-3 h-3" /> End</p>
                  <p className="text-sm font-bold text-slate-700 mt-1">{new Date(selectedSub.endDate).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 animate-fade-in-up stagger-3">
                <span className="text-sm text-slate-500">Status:</span>
                <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold capitalize ${(statusColors[selectedSub.status] || statusColors.active).badge}`}>
                  <span className={`w-2 h-2 rounded-full ${(statusColors[selectedSub.status] || statusColors.active).dot}`} />
                  {selectedSub.status}
                </span>
              </div>

              <div className="pt-2 animate-fade-in-up stagger-4">
                <button
                  onClick={() => setSelectedSubscription(null)}
                  className="btn-outline w-full px-4 py-2.5 rounded-xl text-sm font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
