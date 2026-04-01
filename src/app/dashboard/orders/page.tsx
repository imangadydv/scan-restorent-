'use client';

import React, { useState, useMemo } from 'react';
import { useApp } from '@/lib/store';
import {
  Clock,
  ChevronDown,
  ChevronUp,
  Check,
  X,
  Volume2,
  AlertCircle,
  PlayCircle,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import type { OrderStatus } from '@/lib/types';

const statusConfig: Record<
  OrderStatus,
  { label: string; color: string; bg: string; border: string; premiumClass: string }
> = {
  new: { label: 'New', color: 'text-blue-700', bg: 'bg-blue-100', border: 'border-blue-200', premiumClass: 'status-new' },
  accepted: {
    label: 'Accepted',
    color: 'text-indigo-700',
    bg: 'bg-indigo-100',
    border: 'border-indigo-200',
    premiumClass: 'status-accepted',
  },
  preparing: {
    label: 'Preparing',
    color: 'text-yellow-700',
    bg: 'bg-yellow-100',
    border: 'border-yellow-200',
    premiumClass: 'status-preparing',
  },
  ready: {
    label: 'Ready',
    color: 'text-green-700',
    bg: 'bg-green-100',
    border: 'border-green-200',
    premiumClass: 'status-ready',
  },
  served: {
    label: 'Served',
    color: 'text-teal-700',
    bg: 'bg-teal-100',
    border: 'border-teal-200',
    premiumClass: 'status-served',
  },
  completed: {
    label: 'Completed',
    color: 'text-gray-600',
    bg: 'bg-gray-100',
    border: 'border-gray-200',
    premiumClass: 'status-completed',
  },
  cancelled: {
    label: 'Cancelled',
    color: 'text-red-700',
    bg: 'bg-red-100',
    border: 'border-red-200',
    premiumClass: 'status-cancelled',
  },
};

const allStatuses: ('all' | OrderStatus)[] = [
  'all',
  'new',
  'accepted',
  'preparing',
  'ready',
  'served',
  'completed',
  'cancelled',
];

export default function OrdersPage() {
  const { currentRestaurant, orders, updateOrderStatus } = useApp();
  const [activeTab, setActiveTab] = useState<'all' | OrderStatus>('all');
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const restaurantOrders = useMemo(
    () =>
      orders
        .filter((o) => o.restaurantId === currentRestaurant?.id)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
    [orders, currentRestaurant]
  );

  const filteredOrders = useMemo(
    () =>
      activeTab === 'all'
        ? restaurantOrders
        : restaurantOrders.filter((o) => o.status === activeTab),
    [restaurantOrders, activeTab]
  );

  const countByStatus = useMemo(() => {
    const counts: Record<string, number> = { all: restaurantOrders.length };
    allStatuses.forEach((s) => {
      if (s !== 'all') {
        counts[s] = restaurantOrders.filter((o) => o.status === s).length;
      }
    });
    return counts;
  }, [restaurantOrders]);

  const timeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'just now';
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  };

  const currency = currentRestaurant?.settings.currencySymbol || '$';

  const getNextAction = (
    status: OrderStatus
  ): { label: string; next: OrderStatus; gradientClass: string; icon: React.ReactNode } | null => {
    switch (status) {
      case 'new':
        return {
          label: 'Accept',
          next: 'accepted',
          gradientClass: 'gradient-info',
          icon: <Check className="w-4 h-4" />,
        };
      case 'accepted':
        return {
          label: 'Start Preparing',
          next: 'preparing',
          gradientClass: 'gradient-amber',
          icon: <PlayCircle className="w-4 h-4" />,
        };
      case 'preparing':
        return {
          label: 'Mark Ready',
          next: 'ready',
          gradientClass: 'gradient-success',
          icon: <CheckCircle className="w-4 h-4" />,
        };
      case 'ready':
        return {
          label: 'Mark Served',
          next: 'served',
          gradientClass: 'gradient-purple',
          icon: <CheckCircle className="w-4 h-4" />,
        };
      case 'served':
        return {
          label: 'Complete',
          next: 'completed',
          gradientClass: 'gradient-dark',
          icon: <CheckCircle className="w-4 h-4" />,
        };
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-in-up stagger-1">
        <div>
          <h1 className="text-2xl font-bold text-gradient">Orders</h1>
          <p className="text-gray-500 text-sm mt-1">
            {filteredOrders.length} orders
            {activeTab !== 'all' && ` with status "${statusConfig[activeTab]?.label}"`}
          </p>
        </div>
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            soundEnabled
              ? 'gradient-primary text-white shadow-glow'
              : 'btn-outline'
          }`}
        >
          <Volume2 className="w-4 h-4" />
          {soundEnabled ? 'Sound On' : 'Sound Off'}
        </button>
      </div>

      {/* Status tabs - pill toggle */}
      <div className="card-premium rounded-2xl p-2 animate-fade-in-up stagger-2">
        <div className="flex flex-wrap gap-1">
          {allStatuses.map((s) => {
            const isActive = activeTab === s;
            const conf = s !== 'all' ? statusConfig[s] : null;
            return (
              <button
                key={s}
                onClick={() => setActiveTab(s)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'gradient-primary text-white shadow-glow'
                    : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                <span className="capitalize">{s === 'all' ? 'All' : conf?.label}</span>
                <span
                  className={`text-xs px-1.5 py-0.5 rounded-full ${
                    isActive ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {countByStatus[s] || 0}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Orders list */}
      {filteredOrders.length === 0 ? (
        <div className="card-premium rounded-2xl p-12 text-center animate-fade-in-up stagger-3">
          <div className="w-16 h-16 gradient-primary-soft rounded-2xl flex items-center justify-center mx-auto">
            <AlertCircle className="w-8 h-8 text-orange-500" />
          </div>
          <h3 className="text-lg font-semibold text-gray-600 mt-4">No orders found</h3>
          <p className="text-gray-400 mt-1">
            {activeTab !== 'all'
              ? `No orders with status "${statusConfig[activeTab]?.label}"`
              : 'Orders will appear here when customers place them'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredOrders.map((order, index) => {
            const conf = statusConfig[order.status];
            const isExpanded = expandedOrder === order.id;
            const nextAction = getNextAction(order.status);
            const isNew = order.status === 'new';
            const staggerClass = `stagger-${Math.min((index % 8) + 1, 8)}`;
            return (
              <div
                key={order.id}
                className={`card-premium rounded-2xl overflow-hidden transition-all animate-fade-in-up ${staggerClass} ${
                  isNew
                    ? 'ring-2 ring-blue-400/50 animate-glow-pulse'
                    : ''
                }`}
              >
                {/* Order card header */}
                <div
                  className="p-4 cursor-pointer hover:bg-gray-50/50 transition-colors"
                  onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {isNew && (
                        <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse" />
                      )}
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gray-800">
                            {order.orderNumber}
                          </span>
                          <span className={`${conf.premiumClass} px-2.5 py-0.5 rounded-full text-xs font-semibold`}>
                            {conf.label}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                          <span>Table {order.tableNumber}</span>
                          <span className="w-1 h-1 bg-gray-300 rounded-full" />
                          <span>{order.customerName || 'Guest'}</span>
                          <span className="w-1 h-1 bg-gray-300 rounded-full" />
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {timeAgo(order.createdAt)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="text-lg font-bold text-gradient">
                          {currency}
                          {order.total.toFixed(0)}
                        </p>
                        <p className="text-xs text-gray-400">{order.items.length} items</p>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </div>

                  {/* Quick items preview */}
                  {!isExpanded && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {order.items.slice(0, 4).map((item) => (
                        <span
                          key={item.id}
                          className="text-xs bg-gray-100/80 text-gray-600 px-2 py-0.5 rounded-full"
                        >
                          {item.menuItemName} x{item.quantity}
                        </span>
                      ))}
                      {order.items.length > 4 && (
                        <span className="text-xs text-gray-400">
                          +{order.items.length - 4} more
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Expanded details */}
                {isExpanded && (
                  <div className="border-t border-gray-100 p-4 space-y-4 animate-fade-in">
                    {/* Items list */}
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Items</p>
                      <div className="space-y-2">
                        {order.items.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center justify-between bg-gray-50/80 rounded-xl px-3 py-2.5"
                          >
                            <div className="flex items-center gap-2">
                              <span
                                className={
                                  item.foodType === 'veg'
                                    ? 'food-veg'
                                    : item.foodType === 'vegan'
                                    ? 'food-vegan'
                                    : 'food-nonveg'
                                }
                              />
                              <span className="text-sm text-gray-700">{item.menuItemName}</span>
                              <span className="text-xs text-gray-400 bg-gray-200/60 px-1.5 py-0.5 rounded-full">x{item.quantity}</span>
                            </div>
                            <span className="text-sm font-medium text-gray-800">
                              {currency}
                              {item.total.toFixed(0)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Order summary */}
                    <div className="pt-3 space-y-1">
                      <div className="divider-gradient" />
                      <div className="pt-3 space-y-1.5">
                        <div className="flex justify-between text-sm text-gray-500">
                          <span>Subtotal</span>
                          <span>
                            {currency}
                            {order.subtotal.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-500">
                          <span>Tax</span>
                          <span>
                            {currency}
                            {order.tax.toFixed(2)}
                          </span>
                        </div>
                        {order.serviceCharge > 0 && (
                          <div className="flex justify-between text-sm text-gray-500">
                            <span>Service Charge</span>
                            <span>
                              {currency}
                              {order.serviceCharge.toFixed(2)}
                            </span>
                          </div>
                        )}
                        {order.discount > 0 && (
                          <div className="flex justify-between text-sm text-green-600">
                            <span>Discount</span>
                            <span>
                              -{currency}
                              {order.discount.toFixed(2)}
                            </span>
                          </div>
                        )}
                        <div className="divider-gradient my-2" />
                        <div className="flex justify-between text-base font-bold pt-1">
                          <span className="text-gray-800">Total</span>
                          <span className="text-gradient">
                            {currency}
                            {order.total.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Status timeline */}
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Timeline</p>
                      <div className="space-y-2">
                        {order.statusHistory.map((entry, idx) => {
                          const entryConf = statusConfig[entry.status];
                          return (
                            <div key={idx} className="flex items-center gap-2 text-xs">
                              <span
                                className={`w-2 h-2 rounded-full ${
                                  entryConf.bg.replace('bg-', 'bg-').replace('100', '500') ||
                                  'bg-gray-400'
                                }`}
                              />
                              <span className="text-gray-500 font-medium capitalize">
                                {entryConf.label}
                              </span>
                              <span className="text-gray-400">
                                {new Date(entry.timestamp).toLocaleString()}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-2 pt-2">
                      {order.status === 'new' && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            updateOrderStatus(order.id, 'cancelled');
                          }}
                          className="flex items-center gap-1.5 px-4 py-2.5 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl text-sm font-medium transition-all shadow-md"
                        >
                          <XCircle className="w-4 h-4" />
                          Reject
                        </button>
                      )}
                      {nextAction && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            updateOrderStatus(order.id, nextAction.next);
                          }}
                          className={`flex items-center gap-1.5 px-4 py-2.5 text-white rounded-xl text-sm font-medium transition-all shadow-glow flex-1 justify-center ${nextAction.gradientClass}`}
                        >
                          {nextAction.icon}
                          {nextAction.label}
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
