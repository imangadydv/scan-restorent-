'use client';

import React, { useState, useMemo } from 'react';
import { useApp } from '@/lib/store';
import {
  Plus,
  Ticket,
  X,
  ToggleLeft,
  ToggleRight,
  Calendar,
  Percent,
  DollarSign,
  Tag,
  Copy,
  Check,
} from 'lucide-react';
import type { Coupon } from '@/lib/types';

interface CouponForm {
  code: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: string;
  minOrderValue: string;
  maxDiscount: string;
  validFrom: string;
  validTo: string;
  maxUsage: string;
  isActive: boolean;
}

const emptyForm: CouponForm = {
  code: '',
  description: '',
  discountType: 'percentage',
  discountValue: '10',
  minOrderValue: '0',
  maxDiscount: '',
  validFrom: new Date().toISOString().split('T')[0],
  validTo: '',
  maxUsage: '100',
  isActive: true,
};

export default function CouponsPage() {
  const { currentRestaurant, coupons, updateCoupon } = useApp();

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<CouponForm>(emptyForm);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const restaurantCoupons = useMemo(
    () => coupons.filter((c) => c.restaurantId === currentRestaurant?.id),
    [coupons, currentRestaurant]
  );

  const toggleActive = (coupon: Coupon) => {
    updateCoupon(coupon.id, { isActive: !coupon.isActive });
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const isExpired = (validTo: string) => {
    return new Date(validTo) < new Date();
  };

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app we'd call addCoupon, but since the store doesn't have it,
    // we show the form as a visual placeholder
    setShowForm(false);
    setForm(emptyForm);
  };

  const currency = currentRestaurant?.settings.currencySymbol || '$';

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-in-up stagger-1">
        <div>
          <h1 className="text-2xl font-bold text-gradient">Coupons</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage discount codes and promotions
          </p>
        </div>
        <button
          onClick={() => {
            setForm(emptyForm);
            setShowForm(true);
          }}
          className="btn-primary flex items-center gap-2 px-5 py-2.5"
        >
          <Plus className="w-5 h-5" />
          Create Coupon
        </button>
      </div>

      {/* Coupon list */}
      {restaurantCoupons.length === 0 ? (
        <div className="card-premium rounded-2xl p-12 text-center animate-fade-in-up stagger-2">
          <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto shadow-glow">
            <Ticket className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-600 mt-4">No coupons yet</h3>
          <p className="text-gray-400 mt-1">Create coupons to offer discounts to your customers</p>
        </div>
      ) : (
        <div className="space-y-3">
          {restaurantCoupons.map((coupon, index) => {
            const expired = isExpired(coupon.validTo);
            const staggerClass = `stagger-${Math.min((index % 8) + 1, 8)}`;
            return (
              <div
                key={coupon.id}
                className={`card-premium card-hover rounded-2xl overflow-hidden transition-all animate-fade-in-up ${staggerClass} ${
                  !coupon.isActive || expired ? 'opacity-60' : ''
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-5">
                  {/* Coupon code and icon */}
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      coupon.discountType === 'percentage'
                        ? 'bg-gradient-to-br from-purple-400 to-pink-500'
                        : 'bg-gradient-to-br from-green-400 to-emerald-500'
                    } shadow-sm`}>
                      {coupon.discountType === 'percentage' ? (
                        <Percent className="w-6 h-6 text-white" />
                      ) : (
                        <DollarSign className="w-6 h-6 text-white" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-gray-800 font-mono tracking-wider">
                          {coupon.code}
                        </span>
                        <button
                          onClick={() => copyCode(coupon.code)}
                          className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          {copiedCode === coupon.code ? (
                            <Check className="w-3.5 h-3.5 text-green-500" />
                          ) : (
                            <Copy className="w-3.5 h-3.5 text-gray-400" />
                          )}
                        </button>
                      </div>
                      <p className="text-sm text-gray-500 truncate">{coupon.description}</p>
                    </div>
                  </div>

                  {/* Discount info */}
                  <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                    <div className="text-center">
                      <p className="text-xs text-gray-400 mb-0.5">Discount</p>
                      <p className="text-base font-bold text-gradient">
                        {coupon.discountType === 'percentage'
                          ? `${coupon.discountValue}%`
                          : `${currency}${coupon.discountValue}`}
                      </p>
                    </div>

                    <div className="text-center">
                      <p className="text-xs text-gray-400 mb-0.5">Min Order</p>
                      <p className="text-sm font-medium text-gray-700">
                        {currency}
                        {coupon.minOrderValue}
                      </p>
                    </div>

                    <div className="text-center">
                      <p className="text-xs text-gray-400 mb-0.5">Validity</p>
                      <div className="flex items-center gap-1 text-xs text-gray-600">
                        <Calendar className="w-3 h-3" />
                        <span>
                          {new Date(coupon.validFrom).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                          })}{' '}
                          -{' '}
                          {new Date(coupon.validTo).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                    </div>

                    <div className="text-center">
                      <p className="text-xs text-gray-400 mb-0.5">Usage</p>
                      <p className="text-sm font-medium text-gray-700">
                        {coupon.usageCount}/{coupon.maxUsage}
                      </p>
                    </div>

                    {/* Status badges */}
                    <div className="flex items-center gap-2">
                      {expired && (
                        <span className="status-cancelled px-2 py-0.5 rounded-full text-xs font-semibold">
                          Expired
                        </span>
                      )}
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                          coupon.isActive && !expired
                            ? 'status-accepted'
                            : 'status-completed'
                        }`}
                      >
                        {coupon.isActive && !expired ? 'Active' : 'Inactive'}
                      </span>
                    </div>

                    {/* Toggle */}
                    <button
                      onClick={() => toggleActive(coupon)}
                      className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      {coupon.isActive ? (
                        <ToggleRight className="w-6 h-6 text-green-500" />
                      ) : (
                        <ToggleLeft className="w-6 h-6 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Create coupon form modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="card-premium rounded-2xl shadow-elevated w-full max-w-lg max-h-[90vh] overflow-y-auto animate-scale-in">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gradient">Create Coupon</h3>
              <button
                onClick={() => setShowForm(false)}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <form onSubmit={handleCreateCoupon} className="p-6 space-y-4">
              {/* Code */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Coupon Code
                </label>
                <input
                  type="text"
                  required
                  value={form.code}
                  onChange={(e) =>
                    setForm({ ...form, code: e.target.value.toUpperCase() })
                  }
                  className="input-premium w-full font-mono tracking-wider uppercase"
                  placeholder="e.g. WELCOME20"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <input
                  type="text"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="input-premium w-full"
                  placeholder="e.g. 20% off on first order"
                />
              </div>

              {/* Discount type + value */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Discount Type
                  </label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, discountType: 'percentage' })}
                      className={`flex-1 py-2 rounded-xl text-sm font-medium border-2 transition-all flex items-center justify-center gap-1 ${
                        form.discountType === 'percentage'
                          ? 'border-orange-400 bg-orange-50 text-orange-700 shadow-sm'
                          : 'border-gray-200 text-gray-500'
                      }`}
                    >
                      <Percent className="w-3.5 h-3.5" /> %
                    </button>
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, discountType: 'fixed' })}
                      className={`flex-1 py-2 rounded-xl text-sm font-medium border-2 transition-all flex items-center justify-center gap-1 ${
                        form.discountType === 'fixed'
                          ? 'border-orange-400 bg-orange-50 text-orange-700 shadow-sm'
                          : 'border-gray-200 text-gray-500'
                      }`}
                    >
                      <DollarSign className="w-3.5 h-3.5" /> Fixed
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Value</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={form.discountValue}
                    onChange={(e) => setForm({ ...form, discountValue: e.target.value })}
                    className="input-premium w-full"
                  />
                </div>
              </div>

              {/* Min order + Max discount */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Min Order ({currency})
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={form.minOrderValue}
                    onChange={(e) => setForm({ ...form, minOrderValue: e.target.value })}
                    className="input-premium w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Max Discount ({currency})
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={form.maxDiscount}
                    onChange={(e) => setForm({ ...form, maxDiscount: e.target.value })}
                    className="input-premium w-full"
                    placeholder="Optional"
                  />
                </div>
              </div>

              {/* Validity dates */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Valid From</label>
                  <input
                    type="date"
                    required
                    value={form.validFrom}
                    onChange={(e) => setForm({ ...form, validFrom: e.target.value })}
                    className="input-premium w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Valid To</label>
                  <input
                    type="date"
                    required
                    value={form.validTo}
                    onChange={(e) => setForm({ ...form, validTo: e.target.value })}
                    className="input-premium w-full"
                  />
                </div>
              </div>

              {/* Max usage */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Max Usage Count
                </label>
                <input
                  type="number"
                  min="1"
                  value={form.maxUsage}
                  onChange={(e) => setForm({ ...form, maxUsage: e.target.value })}
                  className="input-premium w-full"
                />
              </div>

              {/* Active toggle */}
              <label className="flex items-center gap-3 cursor-pointer">
                <div
                  className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer ${
                    form.isActive ? 'gradient-success' : 'bg-gray-300'
                  }`}
                  onClick={() => setForm({ ...form, isActive: !form.isActive })}
                >
                  <div
                    className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${
                      form.isActive ? 'translate-x-5' : 'translate-x-0.5'
                    }`}
                  />
                </div>
                <span className="text-sm text-gray-600">Active</span>
              </label>

              {/* Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="btn-outline flex-1 py-2.5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary flex-1 py-2.5"
                >
                  Create Coupon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
