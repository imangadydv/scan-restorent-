'use client';

import React, { useState, useMemo } from 'react';
import { useApp } from '@/lib/store';
import {
  Store,
  Search,
  Filter,
  Plus,
  Eye,
  Pause,
  Play,
  Edit,
  X,
  MapPin,
  Phone,
  Mail,
  Globe,
  Calendar,
  Users,
  ShoppingBag,
  Building2,
} from 'lucide-react';

export default function SuperAdminRestaurantsPage() {
  const { restaurants, orders, plans, branches, users, toggleRestaurantStatus, addRestaurant } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [planFilter, setPlanFilter] = useState<string>('all');
  const [detailRestaurant, setDetailRestaurant] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Add restaurant form state
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newCuisine, setNewCuisine] = useState('');
  const [newPlanId, setNewPlanId] = useState(plans[0]?.id || '');

  const restaurantData = useMemo(() => {
    return restaurants
      .filter((r) => {
        const matchSearch = r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          r.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchStatus = statusFilter === 'all' || (statusFilter === 'active' ? r.isActive : !r.isActive);
        const matchPlan = planFilter === 'all' || r.planId === planFilter;
        return matchSearch && matchStatus && matchPlan;
      })
      .map((r) => {
        const rOrders = orders.filter((o) => o.restaurantId === r.id);
        const revenue = rOrders.filter((o) => o.status !== 'cancelled').reduce((sum, o) => sum + o.total, 0);
        const plan = plans.find((p) => p.id === r.planId);
        const owner = users.find((u) => u.id === r.ownerId);
        const branchCount = branches.filter((b) => b.restaurantId === r.id).length;
        return { ...r, ordersCount: rOrders.length, revenue, planName: plan?.name || 'N/A', planType: plan?.type || 'starter', ownerName: owner?.name || 'Unknown', branchCount };
      });
  }, [restaurants, orders, plans, users, branches, searchQuery, statusFilter, planFilter]);

  const selectedRestaurant = useMemo(() => {
    if (!detailRestaurant) return null;
    const r = restaurants.find((rest) => rest.id === detailRestaurant);
    if (!r) return null;
    const rOrders = orders.filter((o) => o.restaurantId === r.id);
    const revenue = rOrders.filter((o) => o.status !== 'cancelled').reduce((sum, o) => sum + o.total, 0);
    const plan = plans.find((p) => p.id === r.planId);
    const owner = users.find((u) => u.id === r.ownerId);
    const branchCount = branches.filter((b) => b.restaurantId === r.id).length;
    const staffCount = users.filter((u) => u.restaurantId === r.id).length;
    return { ...r, ordersCount: rOrders.length, revenue, planName: plan?.name || 'N/A', planType: plan?.type || 'starter', ownerName: owner?.name || 'Unknown', branchCount, staffCount };
  }, [detailRestaurant, restaurants, orders, plans, users, branches]);

  const handleAddRestaurant = () => {
    if (!newName.trim() || !newEmail.trim()) return;
    addRestaurant({
      name: newName,
      slug: newName.toLowerCase().replace(/\s+/g, '-'),
      logo: '/logos/default.png',
      coverImage: '/covers/default.jpg',
      description: `${newName} restaurant`,
      cuisine: newCuisine.split(',').map((c) => c.trim()).filter(Boolean),
      address: newAddress,
      city: newCity,
      phone: newPhone,
      email: newEmail,
      planId: newPlanId,
      isActive: true,
      createdAt: new Date().toISOString(),
      ownerId: '',
      settings: {
        currency: 'INR',
        currencySymbol: '\u20B9',
        taxRate: 5,
        serviceCharge: 0,
        theme: { primaryColor: '#D32F2F', accentColor: '#FF6F00' },
        orderAutoAccept: false,
        enableTips: false,
      },
    });
    setShowAddModal(false);
    setNewName('');
    setNewEmail('');
    setNewPhone('');
    setNewAddress('');
    setNewCity('');
    setNewCuisine('');
  };

  const getPlanBadgeClasses = (planType: string) => {
    switch (planType) {
      case 'starter':
        return 'bg-gradient-to-r from-blue-500 to-blue-600 text-white';
      case 'professional':
        return 'bg-gradient-to-r from-purple-500 to-purple-600 text-white';
      case 'enterprise':
        return 'bg-gradient-to-r from-amber-500 to-amber-600 text-white';
      default:
        return 'bg-gradient-to-r from-blue-500 to-blue-600 text-white';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fade-in-up stagger-1">
        <div>
          <h1 className="text-2xl font-bold text-gradient">Restaurant Management</h1>
          <p className="text-slate-500 mt-1">Manage all restaurants on the platform.</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm"
        >
          <Plus className="w-4 h-4" />
          Add Restaurant
        </button>
      </div>

      {/* Search and Filters */}
      <div className="card-premium rounded-2xl p-4 animate-fade-in-up stagger-2">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <div className="input-premium flex items-center gap-2 px-3 py-2.5 rounded-xl">
              <Search className="w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search restaurants..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-sm text-slate-700 placeholder-slate-400 outline-none w-full"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="input-premium px-3 py-2 rounded-xl text-sm text-slate-700 outline-none cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
            </select>
            <select
              value={planFilter}
              onChange={(e) => setPlanFilter(e.target.value)}
              className="input-premium px-3 py-2 rounded-xl text-sm text-slate-700 outline-none cursor-pointer"
            >
              <option value="all">All Plans</option>
              {plans.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Restaurant Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {restaurantData.map((r, index) => (
          <div key={r.id} className={`card-premium rounded-2xl overflow-hidden card-hover animate-fade-in-up stagger-${Math.min(index % 6 + 1, 8)}`}>
            {/* Card Header */}
            <div className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-400 via-red-400 to-pink-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-orange-200/50">
                    <Store className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">{r.name}</h3>
                    <p className="text-xs text-slate-400">Owner: {r.ownerName}</p>
                  </div>
                </div>
                <span
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    r.isActive
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-red-50 text-red-700 border border-red-200'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${r.isActive ? 'bg-emerald-500 animate-glow-pulse' : 'bg-red-500'}`} />
                  {r.isActive ? 'Active' : 'Suspended'}
                </span>
              </div>

              <div className="mt-4 flex items-center gap-2">
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm ${getPlanBadgeClasses(r.planType)}`}>
                  {r.planName}
                </span>
                <span className="text-xs text-slate-300">|</span>
                <span className="text-xs text-slate-500">{r.city}</span>
              </div>

              {/* Stats */}
              <div className="mt-4 grid grid-cols-3 gap-3">
                <div className="text-center p-2.5 bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-xl border border-slate-100">
                  <p className="text-lg font-bold text-gradient">{r.branchCount}</p>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider">Branches</p>
                </div>
                <div className="text-center p-2.5 bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-xl border border-slate-100">
                  <p className="text-lg font-bold text-gradient">{r.ordersCount}</p>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider">Orders</p>
                </div>
                <div className="text-center p-2.5 bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-xl border border-slate-100">
                  <p className="text-lg font-bold text-gradient">&#8377;{(r.revenue / 1000).toFixed(1)}k</p>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider">Revenue</p>
                </div>
              </div>

              <p className="text-xs text-slate-400 mt-3">
                Created: {new Date(r.createdAt).toLocaleDateString()}
              </p>
            </div>

            {/* Actions */}
            <div className="flex border-t border-slate-100/80 divider-gradient">
              <button
                onClick={() => setDetailRestaurant(r.id)}
                className="flex-1 flex items-center justify-center gap-1.5 py-3 text-sm text-slate-600 hover:bg-gradient-to-r hover:from-slate-50 hover:to-transparent transition-all duration-200"
              >
                <Eye className="w-4 h-4" />
                View
              </button>
              <div className="w-px bg-slate-100" />
              <button
                onClick={() => toggleRestaurantStatus(r.id)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-sm transition-all duration-200 ${
                  r.isActive ? 'text-orange-600 hover:bg-orange-50/50' : 'text-green-600 hover:bg-green-50/50'
                }`}
              >
                {r.isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {r.isActive ? 'Suspend' : 'Activate'}
              </button>
              <div className="w-px bg-slate-100" />
              <button className="flex-1 flex items-center justify-center gap-1.5 py-3 text-sm text-blue-600 hover:bg-blue-50/50 transition-all duration-200">
                <Edit className="w-4 h-4" />
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {restaurantData.length === 0 && (
        <div className="card-premium rounded-2xl p-12 text-center animate-fade-in">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center mx-auto">
            <Store className="w-8 h-8 text-slate-300" />
          </div>
          <p className="text-slate-500 mt-4">No restaurants found matching your filters.</p>
        </div>
      )}

      {/* Restaurant Detail Modal */}
      {selectedRestaurant && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-md">
          <div className="card-premium rounded-2xl shadow-elevated w-full max-w-2xl max-h-[85vh] overflow-y-auto animate-scale-in">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 sticky top-0 bg-white/90 backdrop-blur-sm rounded-t-2xl z-10">
              <h3 className="text-lg font-semibold text-gradient">Restaurant Details</h3>
              <button onClick={() => setDetailRestaurant(null)} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              {/* Header */}
              <div className="flex items-center gap-4 animate-fade-in-up stagger-1">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-400 via-red-400 to-pink-500 flex items-center justify-center shadow-lg shadow-orange-200/50">
                  <Store className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gradient">{selectedRestaurant.name}</h4>
                  <p className="text-sm text-slate-500">{selectedRestaurant.description}</p>
                </div>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-in-up stagger-2">
                <div className="flex items-center gap-3 p-3.5 bg-gradient-to-br from-slate-50 to-white rounded-xl border border-slate-100">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Address</p>
                    <p className="text-sm text-slate-700 font-medium">{selectedRestaurant.address}, {selectedRestaurant.city}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3.5 bg-gradient-to-br from-slate-50 to-white rounded-xl border border-slate-100">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                    <Phone className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Phone</p>
                    <p className="text-sm text-slate-700 font-medium">{selectedRestaurant.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3.5 bg-gradient-to-br from-slate-50 to-white rounded-xl border border-slate-100">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
                    <Mail className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Email</p>
                    <p className="text-sm text-slate-700 font-medium">{selectedRestaurant.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3.5 bg-gradient-to-br from-slate-50 to-white rounded-xl border border-slate-100">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Owner</p>
                    <p className="text-sm text-slate-700 font-medium">{selectedRestaurant.ownerName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3.5 bg-gradient-to-br from-slate-50 to-white rounded-xl border border-slate-100">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Created</p>
                    <p className="text-sm text-slate-700 font-medium">{new Date(selectedRestaurant.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3.5 bg-gradient-to-br from-slate-50 to-white rounded-xl border border-slate-100">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center">
                    <Globe className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Website</p>
                    <p className="text-sm text-slate-700 font-medium">{selectedRestaurant.website || 'N/A'}</p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-4 gap-3 animate-fade-in-up stagger-3">
                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl border border-blue-100">
                  <p className="text-2xl font-bold text-gradient">{selectedRestaurant.branchCount}</p>
                  <p className="text-xs text-blue-500 mt-1">Branches</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100/50 rounded-xl border border-green-100">
                  <p className="text-2xl font-bold text-gradient">{selectedRestaurant.staffCount}</p>
                  <p className="text-xs text-green-500 mt-1">Staff</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-xl border border-orange-100">
                  <p className="text-2xl font-bold text-gradient">{selectedRestaurant.ordersCount}</p>
                  <p className="text-xs text-orange-500 mt-1">Orders</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-xl border border-purple-100">
                  <p className="text-2xl font-bold text-gradient">&#8377;{(selectedRestaurant.revenue / 1000).toFixed(1)}k</p>
                  <p className="text-xs text-purple-500 mt-1">Revenue</p>
                </div>
              </div>

              {/* Cuisine Tags */}
              <div className="animate-fade-in-up stagger-4">
                <p className="text-sm font-medium text-slate-700 mb-2">Cuisines</p>
                <div className="flex flex-wrap gap-2">
                  {selectedRestaurant.cuisine.map((c) => (
                    <span key={c} className="px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 border border-orange-200/50 shadow-sm">
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              {/* Plan & Status */}
              <div className="flex items-center gap-4 animate-fade-in-up stagger-5">
                <span className={`px-3.5 py-1.5 rounded-full text-sm font-bold shadow-sm ${getPlanBadgeClasses(selectedRestaurant.planType)}`}>
                  Plan: {selectedRestaurant.planName}
                </span>
                <span
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-semibold ${
                    selectedRestaurant.isActive
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-red-50 text-red-700 border border-red-200'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${selectedRestaurant.isActive ? 'bg-emerald-500 animate-glow-pulse' : 'bg-red-500'}`} />
                  {selectedRestaurant.isActive ? 'Active' : 'Suspended'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Restaurant Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-md">
          <div className="card-premium rounded-2xl shadow-elevated w-full max-w-lg max-h-[85vh] overflow-y-auto animate-scale-in">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-white to-slate-50/50">
              <h3 className="text-lg font-semibold text-gradient">Add New Restaurant</h3>
              <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="animate-fade-in-up stagger-1">
                <label className="block text-sm font-medium text-slate-700 mb-1">Restaurant Name *</label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="input-premium w-full px-3 py-2.5 rounded-xl text-sm"
                  placeholder="e.g. Bombay Bites"
                />
              </div>
              <div className="animate-fade-in-up stagger-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">Email *</label>
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="input-premium w-full px-3 py-2.5 rounded-xl text-sm"
                  placeholder="e.g. contact@bombaybites.com"
                />
              </div>
              <div className="animate-fade-in-up stagger-3">
                <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                <input
                  type="text"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  className="input-premium w-full px-3 py-2.5 rounded-xl text-sm"
                  placeholder="e.g. +91-9800000000"
                />
              </div>
              <div className="animate-fade-in-up stagger-4">
                <label className="block text-sm font-medium text-slate-700 mb-1">Address</label>
                <input
                  type="text"
                  value={newAddress}
                  onChange={(e) => setNewAddress(e.target.value)}
                  className="input-premium w-full px-3 py-2.5 rounded-xl text-sm"
                  placeholder="e.g. 10, Park Street"
                />
              </div>
              <div className="animate-fade-in-up stagger-5">
                <label className="block text-sm font-medium text-slate-700 mb-1">City</label>
                <input
                  type="text"
                  value={newCity}
                  onChange={(e) => setNewCity(e.target.value)}
                  className="input-premium w-full px-3 py-2.5 rounded-xl text-sm"
                  placeholder="e.g. Mumbai"
                />
              </div>
              <div className="animate-fade-in-up stagger-6">
                <label className="block text-sm font-medium text-slate-700 mb-1">Cuisines (comma separated)</label>
                <input
                  type="text"
                  value={newCuisine}
                  onChange={(e) => setNewCuisine(e.target.value)}
                  className="input-premium w-full px-3 py-2.5 rounded-xl text-sm"
                  placeholder="e.g. Indian, Chinese, Continental"
                />
              </div>
              <div className="animate-fade-in-up stagger-7">
                <label className="block text-sm font-medium text-slate-700 mb-1">Plan</label>
                <select
                  value={newPlanId}
                  onChange={(e) => setNewPlanId(e.target.value)}
                  className="input-premium w-full px-3 py-2.5 rounded-xl text-sm"
                >
                  {plans.map((p) => (
                    <option key={p.id} value={p.id}>{p.name} - &#8377;{p.price}/mo</option>
                  ))}
                </select>
              </div>
              <div className="flex gap-3 pt-2 animate-fade-in-up stagger-8">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="btn-outline flex-1 px-4 py-2.5 rounded-xl text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddRestaurant}
                  className="btn-primary flex-1 px-4 py-2.5 rounded-xl text-sm font-medium"
                >
                  Add Restaurant
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
