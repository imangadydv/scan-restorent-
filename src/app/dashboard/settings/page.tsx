'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/lib/store';
import {
  Save,
  Building2,
  Palette,
  ShoppingBag,
  Receipt,
  Check,
} from 'lucide-react';

export default function SettingsPage() {
  const { currentRestaurant, restaurants } = useApp();

  const [saved, setSaved] = useState(false);

  // Restaurant profile
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  // Appearance
  const [primaryColor, setPrimaryColor] = useState('#F97316');
  const [accentColor, setAccentColor] = useState('#EF4444');

  // Order settings
  const [autoAccept, setAutoAccept] = useState(false);
  const [enableTips, setEnableTips] = useState(false);

  // Tax
  const [taxName, setTaxName] = useState('GST');
  const [taxRate, setTaxRate] = useState('5');

  // Service charge
  const [serviceCharge, setServiceCharge] = useState('0');

  useEffect(() => {
    if (currentRestaurant) {
      setName(currentRestaurant.name);
      setDescription(currentRestaurant.description);
      setCuisine(currentRestaurant.cuisine.join(', '));
      setAddress(currentRestaurant.address);
      setPhone(currentRestaurant.phone);
      setEmail(currentRestaurant.email);
      setPrimaryColor(currentRestaurant.settings.theme.primaryColor);
      setAccentColor(currentRestaurant.settings.theme.accentColor);
      setAutoAccept(currentRestaurant.settings.orderAutoAccept);
      setEnableTips(currentRestaurant.settings.enableTips);
      setTaxRate(currentRestaurant.settings.taxRate.toString());
      setServiceCharge(currentRestaurant.settings.serviceCharge.toString());
    }
  }, [currentRestaurant]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we'd call an updateRestaurant function
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const colorPresets = [
    '#F97316', '#EF4444', '#EC4899', '#8B5CF6',
    '#3B82F6', '#06B6D4', '#10B981', '#84CC16',
  ];

  return (
    <div className="space-y-6 max-w-4xl animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-in-up stagger-1">
        <div>
          <h1 className="text-2xl font-bold text-gradient">Settings</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage your restaurant settings and preferences
          </p>
        </div>
        <button
          onClick={handleSave}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all ${
            saved
              ? 'gradient-success text-white shadow-glow'
              : 'btn-primary'
          }`}
        >
          {saved ? (
            <>
              <Check className="w-5 h-5" />
              Saved!
            </>
          ) : (
            <>
              <Save className="w-5 h-5" />
              Save Changes
            </>
          )}
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Restaurant Profile */}
        <div className="card-premium rounded-2xl p-6 animate-fade-in-up stagger-2">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center shadow-sm">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Restaurant Profile</h2>
              <p className="text-sm text-gray-400">Basic information about your restaurant</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Restaurant Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-premium w-full"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="input-premium w-full h-20 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cuisine (comma separated)
              </label>
              <input
                type="text"
                value={cuisine}
                onChange={(e) => setCuisine(e.target.value)}
                className="input-premium w-full"
                placeholder="e.g. Indian, Chinese"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="input-premium w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-premium w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="input-premium w-full"
              />
            </div>
          </div>
        </div>

        <div className="divider-gradient" />

        {/* Appearance */}
        <div className="card-premium rounded-2xl p-6 animate-fade-in-up stagger-3">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center shadow-sm">
              <Palette className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Appearance</h2>
              <p className="text-sm text-gray-400">Customize colors for your menu</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Primary color */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Primary Color</label>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl border-2 border-gray-200 cursor-pointer relative overflow-hidden shadow-sm"
                  style={{ backgroundColor: primaryColor }}
                >
                  <input
                    type="color"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
                <input
                  type="text"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="input-premium w-28 font-mono text-sm"
                />
              </div>
              <div className="flex gap-1.5 mt-2">
                {colorPresets.map((c) => (
                  <button
                    type="button"
                    key={`p-${c}`}
                    onClick={() => setPrimaryColor(c)}
                    className={`w-6 h-6 rounded-full border-2 transition-transform hover:scale-110 ${
                      primaryColor === c ? 'border-gray-800 scale-110 shadow-sm' : 'border-transparent'
                    }`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>

            {/* Accent color */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Accent Color</label>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl border-2 border-gray-200 cursor-pointer relative overflow-hidden shadow-sm"
                  style={{ backgroundColor: accentColor }}
                >
                  <input
                    type="color"
                    value={accentColor}
                    onChange={(e) => setAccentColor(e.target.value)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
                <input
                  type="text"
                  value={accentColor}
                  onChange={(e) => setAccentColor(e.target.value)}
                  className="input-premium w-28 font-mono text-sm"
                />
              </div>
              <div className="flex gap-1.5 mt-2">
                {colorPresets.map((c) => (
                  <button
                    type="button"
                    key={`a-${c}`}
                    onClick={() => setAccentColor(c)}
                    className={`w-6 h-6 rounded-full border-2 transition-transform hover:scale-110 ${
                      accentColor === c ? 'border-gray-800 scale-110 shadow-sm' : 'border-transparent'
                    }`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Color preview */}
          <div className="mt-4 p-4 rounded-xl border border-gray-200/60 bg-gray-50/50">
            <p className="text-sm text-gray-500 mb-2">Preview</p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="px-4 py-2 rounded-lg text-white text-sm font-medium shadow-sm transition-transform hover:scale-105"
                style={{ backgroundColor: primaryColor }}
              >
                Primary Button
              </button>
              <button
                type="button"
                className="px-4 py-2 rounded-lg text-white text-sm font-medium shadow-sm transition-transform hover:scale-105"
                style={{ backgroundColor: accentColor }}
              >
                Accent Button
              </button>
              <span
                className="text-sm font-medium"
                style={{ color: primaryColor }}
              >
                Primary Text
              </span>
            </div>
          </div>
        </div>

        <div className="divider-gradient" />

        {/* Order Settings */}
        <div className="card-premium rounded-2xl p-6 animate-fade-in-up stagger-4">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center shadow-sm">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Order Settings</h2>
              <p className="text-sm text-gray-400">Configure how orders are handled</p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Auto-accept */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50/80 border border-gray-100">
              <div>
                <p className="text-sm font-medium text-gray-700">Auto-accept Orders</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  Automatically accept incoming orders without manual review
                </p>
              </div>
              <div
                className={`w-11 h-6 rounded-full transition-all relative cursor-pointer ${
                  autoAccept ? 'gradient-primary shadow-glow' : 'bg-gray-300'
                }`}
                onClick={() => setAutoAccept(!autoAccept)}
              >
                <div
                  className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                    autoAccept ? 'translate-x-5' : 'translate-x-0.5'
                  }`}
                />
              </div>
            </div>

            {/* Enable tips */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50/80 border border-gray-100">
              <div>
                <p className="text-sm font-medium text-gray-700">Enable Tips</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  Allow customers to add tips to their orders
                </p>
              </div>
              <div
                className={`w-11 h-6 rounded-full transition-all relative cursor-pointer ${
                  enableTips ? 'gradient-primary shadow-glow' : 'bg-gray-300'
                }`}
                onClick={() => setEnableTips(!enableTips)}
              >
                <div
                  className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                    enableTips ? 'translate-x-5' : 'translate-x-0.5'
                  }`}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="divider-gradient" />

        {/* Tax Configuration */}
        <div className="card-premium rounded-2xl p-6 animate-fade-in-up stagger-5">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-sm">
              <Receipt className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Tax & Charges</h2>
              <p className="text-sm text-gray-400">Configure tax and service charge rates</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tax Name</label>
              <input
                type="text"
                value={taxName}
                onChange={(e) => setTaxName(e.target.value)}
                className="input-premium w-full"
                placeholder="e.g. GST, VAT"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tax Rate (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                step="0.1"
                value={taxRate}
                onChange={(e) => setTaxRate(e.target.value)}
                className="input-premium w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Service Charge (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                step="0.1"
                value={serviceCharge}
                onChange={(e) => setServiceCharge(e.target.value)}
                className="input-premium w-full"
              />
            </div>
          </div>

          {/* Preview */}
          <div className="mt-4 p-4 rounded-xl bg-gray-50/80 border border-gray-100">
            <p className="text-sm text-gray-500 mb-2">Example: Order of {currentRestaurant?.settings.currencySymbol || '$'}1000</p>
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-800">{currentRestaurant?.settings.currencySymbol || '$'}1000.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">{taxName} ({taxRate}%)</span>
                <span className="text-gray-800">
                  {currentRestaurant?.settings.currencySymbol || '$'}
                  {((1000 * parseFloat(taxRate || '0')) / 100).toFixed(2)}
                </span>
              </div>
              {parseFloat(serviceCharge) > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Service Charge ({serviceCharge}%)</span>
                  <span className="text-gray-800">
                    {currentRestaurant?.settings.currencySymbol || '$'}
                    {((1000 * parseFloat(serviceCharge || '0')) / 100).toFixed(2)}
                  </span>
                </div>
              )}
              <div className="divider-gradient my-1.5" />
              <div className="flex justify-between font-bold pt-1">
                <span className="text-gray-800">Total</span>
                <span className="text-gradient">
                  {currentRestaurant?.settings.currencySymbol || '$'}
                  {(
                    1000 +
                    (1000 * parseFloat(taxRate || '0')) / 100 +
                    (1000 * parseFloat(serviceCharge || '0')) / 100
                  ).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Save button at bottom */}
        <div className="flex justify-end animate-fade-in-up stagger-6">
          <button
            type="submit"
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
              saved
                ? 'gradient-success text-white shadow-glow'
                : 'btn-primary shadow-premium'
            }`}
          >
            {saved ? (
              <>
                <Check className="w-5 h-5" />
                Saved Successfully!
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Save All Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
