'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { 
  Check, X, Edit, Crown, Zap, Rocket, Users, 
  Grid3X3, UtensilsCrossed, Building2, TrendingUp,
  Calendar, DollarSign, Settings
} from 'lucide-react';

// Plan configuration for better organization
const PLAN_CONFIG = {
  starter: {
    name: 'Starter',
    icon: Zap,
    gradient: 'from-blue-500 to-cyan-500',
    gradientLight: 'from-blue-50 to-cyan-50',
    borderColor: 'border-blue-200',
    hoverBorder: 'hover:border-blue-300',
    badgeColor: 'bg-blue-100 text-blue-700',
    buttonGradient: 'from-blue-500 to-cyan-500',
    shadow: 'shadow-blue-200/30',
    popular: false,
  },
  professional: {
    name: 'Professional',
    icon: Crown,
    gradient: 'from-purple-500 to-pink-500',
    gradientLight: 'from-purple-50 to-pink-50',
    borderColor: 'border-purple-200',
    hoverBorder: 'hover:border-purple-300',
    badgeColor: 'bg-purple-100 text-purple-700',
    buttonGradient: 'from-purple-500 to-pink-500',
    shadow: 'shadow-purple-200/30',
    popular: true,
  },
  enterprise: {
    name: 'Enterprise',
    icon: Rocket,
    gradient: 'from-amber-500 to-orange-500',
    gradientLight: 'from-amber-50 to-orange-50',
    borderColor: 'border-amber-200',
    hoverBorder: 'hover:border-amber-300',
    badgeColor: 'bg-amber-100 text-amber-700',
    buttonGradient: 'from-amber-500 to-orange-500',
    shadow: 'shadow-amber-200/30',
    popular: false,
  },
};

// Plan limits configuration
const PLAN_LIMITS = {
  starter: {
    branches: 1,
    tables: 10,
    menuItems: 50,
    staff: 5,
  },
  professional: {
    branches: 5,
    tables: 50,
    menuItems: 200,
    staff: 20,
  },
  enterprise: {
    branches: 'Unlimited',
    tables: 'Unlimited',
    menuItems: 'Unlimited',
    staff: 'Unlimited',
  },
};

// Plan features configuration
const PLAN_FEATURES = {
  starter: [
    'QR Code Ordering',
    'Digital Menu',
    'Basic Analytics',
    'Email Support',
    'Up to 500 orders/month',
  ],
  professional: [
    'Everything in Starter',
    'Advanced Analytics',
    'Priority Support',
    'Multi-branch Management',
    'Kitchen Display System',
    'Customer Loyalty Program',
    'Unlimited Orders',
  ],
  enterprise: [
    'Everything in Professional',
    'Dedicated Account Manager',
    'Custom Integrations',
    'API Access',
    'White Label Solution',
    '24/7 Phone Support',
    'SLA Guarantee',
    'Custom Feature Development',
  ],
};

interface EditFormData {
  name: string;
  price: string;
  maxBranches: string;
  maxTables: string;
  maxMenuItems: string;
  maxStaff: string;
}

export default function SuperAdminPlansPage() {
  const { plans } = useApp();
  const [editingPlan, setEditingPlan] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<EditFormData>({
    name: '',
    price: '',
    maxBranches: '',
    maxTables: '',
    maxMenuItems: '',
    maxStaff: '',
  });

  // Handle edit button click
  const handleEditClick = (plan: any) => {
    setEditForm({
      name: plan.name,
      price: plan.price.toString(),
      maxBranches: plan.maxBranches.toString(),
      maxTables: plan.maxTables.toString(),
      maxMenuItems: plan.maxMenuItems.toString(),
      maxStaff: plan.maxStaff.toString(),
    });
    setEditingPlan(plan.id);
  };

  // Handle form input changes
  const handleInputChange = (field: keyof EditFormData, value: string) => {
    setEditForm(prev => ({ ...prev, [field]: value }));
  };

  // Handle save changes
  const handleSaveChanges = () => {
    // Add your save logic here
    console.log('Saving changes:', editForm);
    setEditingPlan(null);
  };

  // Get plan color configuration
  const getPlanConfig = (type: string) => {
    return PLAN_CONFIG[type as keyof typeof PLAN_CONFIG] || PLAN_CONFIG.starter;
  };

  // Get plan limits
  const getPlanLimits = (type: string) => {
    return PLAN_LIMITS[type as keyof typeof PLAN_LIMITS] || PLAN_LIMITS.starter;
  };

  // Get plan features
  const getPlanFeatures = (type: string) => {
    return PLAN_FEATURES[type as keyof typeof PLAN_FEATURES] || PLAN_FEATURES.starter;
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Plan Management
          </h1>
          <p className="text-slate-500 mt-1">
            Manage subscription plans and pricing for restaurants
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-lg">
          <TrendingUp className="w-4 h-4 text-blue-600" />
          <span className="text-sm text-blue-600 font-medium">3 Active Plans</span>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {plans.map((plan) => {
          const config = getPlanConfig(plan.type);
          const limits = getPlanLimits(plan.type);
          const features = getPlanFeatures(plan.type);
          const Icon = config.icon;
          const isPopular = config.popular;

          return (
            <div
              key={plan.id}
              className={`
                relative rounded-2xl transition-all duration-300
                ${plan.isActive ? 'bg-white' : 'bg-slate-50'}
                border ${config.borderColor} ${config.hoverBorder}
                hover:shadow-xl ${config.shadow}
                ${isPopular ? 'ring-2 ring-purple-300 scale-105 shadow-2xl' : ''}
              `}
            >
              {/* Popular Badge */}
              {isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-full shadow-lg">
                    MOST POPULAR
                  </span>
                </div>
              )}

              {/* Status Badge */}
              <div className="absolute top-4 right-4">
                <span className={`
                  inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium
                  ${plan.isActive ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}
                `}>
                  <span className={`w-1.5 h-1.5 rounded-full ${plan.isActive ? 'bg-green-500' : 'bg-red-500'}`} />
                  {plan.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>

              {/* Plan Content */}
              <div className={`p-6 ${isPopular ? 'pt-8' : 'pt-6'}`}>
                {/* Icon and Name */}
                <div className="text-center mb-6">
                  <div className={`
                    w-16 h-16 rounded-2xl bg-gradient-to-r ${config.gradient}
                    flex items-center justify-center mx-auto mb-4 shadow-lg
                  `}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-3xl font-bold text-slate-900">
                      ₹{plan.price.toLocaleString()}
                    </span>
                    <span className="text-slate-400 text-sm">
                      /{plan.billingCycle === 'monthly' ? 'month' : 'year'}
                    </span>
                  </div>
                </div>

                {/* Limits Section */}
                <div className="grid grid-cols-2 gap-2 mb-6">
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-50">
                    <Building2 className="w-4 h-4 text-slate-500" />
                    <div>
                      <p className="text-xs text-slate-500">Branches</p>
                      <p className="text-sm font-semibold text-slate-700">{limits.branches}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-50">
                    <Grid3X3 className="w-4 h-4 text-slate-500" />
                    <div>
                      <p className="text-xs text-slate-500">Tables</p>
                      <p className="text-sm font-semibold text-slate-700">{limits.tables}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-50">
                    <UtensilsCrossed className="w-4 h-4 text-slate-500" />
                    <div>
                      <p className="text-xs text-slate-500">Menu Items</p>
                      <p className="text-sm font-semibold text-slate-700">{limits.menuItems}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-50">
                    <Users className="w-4 h-4 text-slate-500" />
                    <div>
                      <p className="text-xs text-slate-500">Staff</p>
                      <p className="text-sm font-semibold text-slate-700">{limits.staff}</p>
                    </div>
                  </div>
                </div>

                {/* Features Section */}
                <div className="border-t border-slate-100 pt-4 mb-6">
                  <p className="text-sm font-semibold text-slate-700 mb-3">Features</p>
                  <div className="space-y-2">
                    {features.slice(0, 5).map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                        <span className="text-sm text-slate-600">{feature}</span>
                      </div>
                    ))}
                    {features.length > 5 && (
                      <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                        +{features.length - 5} more features
                      </button>
                    )}
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => handleEditClick(plan)}
                  className={`
                    w-full flex items-center justify-center gap-2 py-2.5 rounded-xl
                    font-semibold transition-all duration-200
                    ${isPopular 
                      ? `bg-gradient-to-r ${config.buttonGradient} text-white hover:shadow-lg` 
                      : 'border border-slate-200 text-slate-700 hover:bg-slate-50'
                    }
                  `}
                >
                  <Edit className="w-4 h-4" />
                  Edit Plan
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit Plan Modal */}
      {editingPlan && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-semibold text-slate-800">Edit Plan</h3>
                <p className="text-sm text-slate-500 mt-1">Update plan details and limits</p>
              </div>
              <button
                onClick={() => setEditingPlan(null)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              {/* Plan Name */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Plan Name
                </label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Price (₹/month)
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="number"
                    value={editForm.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Limits Grid */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Max Branches
                  </label>
                  <input
                    type="text"
                    value={editForm.maxBranches}
                    onChange={(e) => handleInputChange('maxBranches', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Max Tables
                  </label>
                  <input
                    type="text"
                    value={editForm.maxTables}
                    onChange={(e) => handleInputChange('maxTables', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Max Menu Items
                  </label>
                  <input
                    type="text"
                    value={editForm.maxMenuItems}
                    onChange={(e) => handleInputChange('maxMenuItems', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Max Staff
                  </label>
                  <input
                    type="text"
                    value={editForm.maxStaff}
                    onChange={(e) => handleInputChange('maxStaff', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Additional Info */}
              <div className="bg-blue-50 rounded-lg p-3 mt-4">
                <div className="flex items-start gap-2">
                  <Settings className="w-4 h-4 text-blue-600 mt-0.5" />
                  <div className="text-xs text-blue-700">
                    <p className="font-medium mb-1">Plan Features</p>
                    <p>Features can be managed in the plan configuration settings. Contact support for custom feature requests.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex gap-3 p-6 border-t border-slate-100">
              <button
                onClick={() => setEditingPlan(null)}
                className="flex-1 px-4 py-2 border border-slate-200 rounded-lg text-slate-700 font-medium hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveChanges}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-medium hover:shadow-lg transition-all"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}