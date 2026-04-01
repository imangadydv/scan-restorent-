'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import {
  Settings,
  Globe,
  Palette,
  CreditCard,
  Bell,
  Save,
  Shield,
  Mail,
  Smartphone,
  DollarSign,
} from 'lucide-react';

export default function SuperAdminSettingsPage() {
  const { currentUser } = useApp();

  // Platform settings state
  const [platformName, setPlatformName] = useState('Tap2Menu');
  const [tagline, setTagline] = useState('Smart Restaurant QR Ordering Platform');
  const [primaryColor, setPrimaryColor] = useState('#F97316');
  const [accentColor, setAccentColor] = useState('#EF4444');
  const [defaultCurrency, setDefaultCurrency] = useState('INR');
  const [currencySymbol, setCurrencySymbol] = useState('\u20B9');

  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [newRestaurantAlert, setNewRestaurantAlert] = useState(true);
  const [newTicketAlert, setNewTicketAlert] = useState(true);
  const [paymentAlert, setPaymentAlert] = useState(true);
  const [weeklyReport, setWeeklyReport] = useState(true);

  // Payment gateway
  const [razorpayKey, setRazorpayKey] = useState('rzp_test_xxxxxxxxxxxxx');
  const [razorpaySecret, setRazorpaySecret] = useState('****************************');
  const [stripeKey, setStripeKey] = useState('');
  const [paymentGateway, setPaymentGateway] = useState('razorpay');

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between animate-fade-in-up stagger-1">
        <div>
          <h1 className="text-2xl font-bold text-gradient">Global Settings</h1>
          <p className="text-slate-500 mt-1">Configure platform-wide settings and preferences.</p>
        </div>
        <button
          onClick={handleSave}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
            saved
              ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg shadow-emerald-200/50'
              : 'btn-primary'
          }`}
        >
          <Save className="w-4 h-4" />
          {saved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>

      {/* Platform Identity */}
      <div className="card-premium rounded-2xl overflow-hidden animate-fade-in-up stagger-2">
        <div className="px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-slate-50/80 to-white">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-sm">
              <Globe className="w-4.5 h-4.5 text-white" />
            </div>
            <h2 className="text-base font-semibold text-slate-800">Platform Identity</h2>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Platform Name</label>
              <input
                type="text"
                value={platformName}
                onChange={(e) => setPlatformName(e.target.value)}
                className="input-premium w-full px-3 py-2.5 rounded-xl text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Tagline</label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="input-premium w-full px-3 py-2.5 rounded-xl text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="divider-gradient animate-fade-in-up stagger-3" />

      {/* Branding Colors */}
      <div className="card-premium rounded-2xl overflow-hidden animate-fade-in-up stagger-3">
        <div className="px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-slate-50/80 to-white">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-sm">
              <Palette className="w-4.5 h-4.5 text-white" />
            </div>
            <h2 className="text-base font-semibold text-slate-800">Branding Colors</h2>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Primary Color</label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="w-12 h-10 border border-slate-200 rounded-lg cursor-pointer shadow-sm"
                />
                <input
                  type="text"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="input-premium flex-1 px-3 py-2.5 rounded-xl text-sm font-mono"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Accent Color</label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={accentColor}
                  onChange={(e) => setAccentColor(e.target.value)}
                  className="w-12 h-10 border border-slate-200 rounded-lg cursor-pointer shadow-sm"
                />
                <input
                  type="text"
                  value={accentColor}
                  onChange={(e) => setAccentColor(e.target.value)}
                  className="input-premium flex-1 px-3 py-2.5 rounded-xl text-sm font-mono"
                />
              </div>
            </div>
          </div>
          {/* Preview */}
          <div className="mt-4 p-4 bg-gradient-to-br from-slate-50 to-white rounded-xl border border-slate-100">
            <p className="text-xs text-slate-400 mb-3 uppercase tracking-wider font-medium">Preview</p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-lg" style={{ backgroundColor: primaryColor }}>
                  T2
                </div>
                <span className="text-sm font-bold" style={{ color: primaryColor }}>{platformName}</span>
              </div>
              <button className="px-3 py-1.5 rounded-lg text-white text-xs font-medium shadow-md transition-transform hover:scale-105" style={{ backgroundColor: primaryColor }}>
                Primary Button
              </button>
              <button className="px-3 py-1.5 rounded-lg text-white text-xs font-medium shadow-md transition-transform hover:scale-105" style={{ backgroundColor: accentColor }}>
                Accent Button
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="divider-gradient animate-fade-in-up stagger-4" />

      {/* Currency Settings */}
      <div className="card-premium rounded-2xl overflow-hidden animate-fade-in-up stagger-4">
        <div className="px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-slate-50/80 to-white">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-sm">
              <DollarSign className="w-4.5 h-4.5 text-white" />
            </div>
            <h2 className="text-base font-semibold text-slate-800">Default Currency</h2>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Currency Code</label>
              <select
                value={defaultCurrency}
                onChange={(e) => setDefaultCurrency(e.target.value)}
                className="input-premium w-full px-3 py-2.5 rounded-xl text-sm"
              >
                <option value="INR">INR - Indian Rupee</option>
                <option value="USD">USD - US Dollar</option>
                <option value="EUR">EUR - Euro</option>
                <option value="GBP">GBP - British Pound</option>
                <option value="AED">AED - UAE Dirham</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Currency Symbol</label>
              <input
                type="text"
                value={currencySymbol}
                onChange={(e) => setCurrencySymbol(e.target.value)}
                className="input-premium w-full px-3 py-2.5 rounded-xl text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="divider-gradient animate-fade-in-up stagger-5" />

      {/* Notification Settings */}
      <div className="card-premium rounded-2xl overflow-hidden animate-fade-in-up stagger-5">
        <div className="px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-slate-50/80 to-white">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-sm">
              <Bell className="w-4.5 h-4.5 text-white" />
            </div>
            <h2 className="text-base font-semibold text-slate-800">Notification Settings</h2>
          </div>
        </div>
        <div className="p-6 space-y-1">
          {/* Notification channels */}
          <div className="pb-4 mb-4 border-b border-slate-100">
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-3">Channels</p>
            <div className="space-y-3">
              {[
                { label: 'Email Notifications', icon: Mail, value: emailNotifications, setter: setEmailNotifications },
                { label: 'SMS Notifications', icon: Smartphone, value: smsNotifications, setter: setSmsNotifications },
                { label: 'Push Notifications', icon: Bell, value: pushNotifications, setter: setPushNotifications },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-slate-50/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                        <Icon className="w-4 h-4 text-slate-500" />
                      </div>
                      <span className="text-sm text-slate-700 font-medium">{item.label}</span>
                    </div>
                    <button
                      onClick={() => item.setter(!item.value)}
                      className={`relative w-12 h-7 rounded-full transition-all duration-300 shadow-inner ${
                        item.value ? 'bg-gradient-to-r from-orange-500 to-red-500 shadow-orange-200' : 'bg-slate-200'
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${
                          item.value ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
          {/* Alert types */}
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-3">Alert Types</p>
            <div className="space-y-3">
              {[
                { label: 'New Restaurant Signup', value: newRestaurantAlert, setter: setNewRestaurantAlert },
                { label: 'New Support Ticket', value: newTicketAlert, setter: setNewTicketAlert },
                { label: 'Payment Received', value: paymentAlert, setter: setPaymentAlert },
                { label: 'Weekly Report', value: weeklyReport, setter: setWeeklyReport },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-slate-50/50 transition-colors">
                  <span className="text-sm text-slate-700 font-medium">{item.label}</span>
                  <button
                    onClick={() => item.setter(!item.value)}
                    className={`relative w-12 h-7 rounded-full transition-all duration-300 shadow-inner ${
                      item.value ? 'bg-gradient-to-r from-orange-500 to-red-500 shadow-orange-200' : 'bg-slate-200'
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${
                        item.value ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="divider-gradient animate-fade-in-up stagger-6" />

      {/* Payment Gateway Settings */}
      <div className="card-premium rounded-2xl overflow-hidden animate-fade-in-up stagger-6">
        <div className="px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-slate-50/80 to-white">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center shadow-sm">
              <CreditCard className="w-4.5 h-4.5 text-white" />
            </div>
            <h2 className="text-base font-semibold text-slate-800">Payment Gateway</h2>
          </div>
        </div>
        <div className="p-6 space-y-4">
          {/* Gateway selector */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Active Gateway</label>
            <div className="flex gap-3">
              {[
                { id: 'razorpay', label: 'Razorpay', gradient: 'from-blue-500 to-blue-600', bgActive: 'bg-blue-50 border-blue-300', textActive: 'text-blue-700' },
                { id: 'stripe', label: 'Stripe', gradient: 'from-purple-500 to-purple-600', bgActive: 'bg-purple-50 border-purple-300', textActive: 'text-purple-700' },
              ].map((gw) => (
                <button
                  key={gw.id}
                  onClick={() => setPaymentGateway(gw.id)}
                  className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 border-2 ${
                    paymentGateway === gw.id
                      ? `${gw.bgActive} ${gw.textActive} shadow-sm`
                      : 'border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${gw.gradient} flex items-center justify-center ${paymentGateway === gw.id ? 'shadow-sm' : 'opacity-50'}`}>
                    <Shield className="w-3.5 h-3.5 text-white" />
                  </div>
                  {gw.label}
                </button>
              ))}
            </div>
          </div>

          {paymentGateway === 'razorpay' ? (
            <div className="space-y-4 p-5 bg-gradient-to-br from-blue-50/50 to-white rounded-xl border border-blue-100">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Razorpay Key ID</label>
                <input
                  type="text"
                  value={razorpayKey}
                  onChange={(e) => setRazorpayKey(e.target.value)}
                  className="input-premium w-full px-3 py-2.5 rounded-xl text-sm font-mono"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Razorpay Key Secret</label>
                <input
                  type="password"
                  value={razorpaySecret}
                  onChange={(e) => setRazorpaySecret(e.target.value)}
                  className="input-premium w-full px-3 py-2.5 rounded-xl text-sm font-mono"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4 p-5 bg-gradient-to-br from-purple-50/50 to-white rounded-xl border border-purple-100">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Stripe Publishable Key</label>
                <input
                  type="text"
                  value={stripeKey}
                  onChange={(e) => setStripeKey(e.target.value)}
                  placeholder="pk_test_xxxxxxxxxxxxx"
                  className="input-premium w-full px-3 py-2.5 rounded-xl text-sm font-mono"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Stripe Secret Key</label>
                <input
                  type="password"
                  placeholder="sk_test_xxxxxxxxxxxxx"
                  className="input-premium w-full px-3 py-2.5 rounded-xl text-sm font-mono"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
