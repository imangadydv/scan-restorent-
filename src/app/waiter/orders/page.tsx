'use client';

import React, { useState, useMemo } from 'react';
import { useApp } from '@/lib/store';
import {
  ClipboardList,
  Clock,
  CheckCircle,
  ChefHat,
  UtensilsCrossed,
  Truck,
  ChevronDown,
  ChevronUp,
  User,
  Hash,
} from 'lucide-react';

export default function WaiterOrdersPage() {
  const { currentRestaurant, orders, updateOrderStatus } = useApp();
  const [activeTab, setActiveTab] = useState<'active' | 'completed' | 'all'>('active');
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const restaurantOrders = useMemo(() => {
    if (!currentRestaurant) return [];
    return orders
      .filter((o) => o.restaurantId === currentRestaurant.id)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [orders, currentRestaurant]);

  const filteredOrders = useMemo(() => {
    switch (activeTab) {
      case 'active':
        return restaurantOrders.filter((o) => !['completed', 'cancelled'].includes(o.status));
      case 'completed':
        return restaurantOrders.filter((o) => ['completed', 'cancelled'].includes(o.status));
      default:
        return restaurantOrders;
    }
  }, [restaurantOrders, activeTab]);

  const nextStatusMap: Record<string, string> = {
    new: 'accepted',
    accepted: 'preparing',
    preparing: 'ready',
    ready: 'served',
    served: 'completed',
  };

  const nextStatusLabel: Record<string, string> = {
    new: 'Accept Order',
    accepted: 'Start Preparing',
    preparing: 'Mark Ready',
    ready: 'Mark Served',
    served: 'Complete',
  };

  const nextStatusBtnStyle: Record<string, string> = {
    new: 'bg-gradient-to-r from-emerald-500 to-green-600 shadow-emerald-200',
    accepted: 'bg-gradient-to-r from-orange-500 to-amber-600 shadow-orange-200',
    preparing: 'bg-gradient-to-r from-blue-500 to-indigo-600 shadow-blue-200',
    ready: 'bg-gradient-to-r from-purple-500 to-violet-600 shadow-purple-200',
    served: 'bg-gradient-to-r from-teal-500 to-emerald-600 shadow-teal-200',
  };

  const nextStatusIcon: Record<string, React.ReactNode> = {
    new: <CheckCircle className="w-4 h-4" />,
    accepted: <ChefHat className="w-4 h-4" />,
    preparing: <UtensilsCrossed className="w-4 h-4" />,
    ready: <Truck className="w-4 h-4" />,
    served: <CheckCircle className="w-4 h-4" />,
  };

  const timeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  };

  const currency = currentRestaurant?.settings.currencySymbol || '\u20B9';

  const tabCounts = useMemo(() => ({
    active: restaurantOrders.filter((o) => !['completed', 'cancelled'].includes(o.status)).length,
    completed: restaurantOrders.filter((o) => ['completed', 'cancelled'].includes(o.status)).length,
    all: restaurantOrders.length,
  }), [restaurantOrders]);

  const getFoodTypeClass = (foodType?: string) => {
    switch (foodType) {
      case 'veg': return 'food-veg';
      case 'vegan': return 'food-vegan';
      default: return 'food-nonveg';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="animate-fade-in">
        <h1 className="text-2xl font-bold text-gray-800">Orders</h1>
        <p className="text-gray-400 mt-1 text-sm">Manage and track all orders.</p>
      </div>

      {/* Filter Tabs - Pill Toggle Design */}
      <div className="flex gap-1.5 p-1.5 rounded-2xl bg-gray-100/80 backdrop-blur animate-fade-in-up stagger-1">
        {(['active', 'completed', 'all'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-300 ${
              activeTab === tab
                ? 'gradient-primary text-white shadow-glow'
                : 'text-gray-500 hover:text-gray-700 hover:bg-white/50'
            }`}
          >
            <span className="capitalize">{tab}</span>
            <span
              className={`text-[10px] min-w-[20px] h-5 px-1.5 rounded-full font-bold flex items-center justify-center ${
                activeTab === tab
                  ? 'bg-white/25 text-white'
                  : 'bg-gray-200/80 text-gray-500'
              }`}
            >
              {tabCounts[tab]}
            </span>
          </button>
        ))}
      </div>

      {/* Orders List */}
      <div className="space-y-3">
        {filteredOrders.length === 0 ? (
          <div className="card-premium p-14 text-center animate-fade-in">
            <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mx-auto mb-4">
              <ClipboardList className="w-8 h-8 text-gray-300" />
            </div>
            <p className="text-gray-400 font-medium">No orders found.</p>
            <p className="text-gray-300 text-sm mt-1">Orders will appear here when placed.</p>
          </div>
        ) : (
          filteredOrders.map((order, index) => {
            const isExpanded = expandedOrder === order.id;
            const next = nextStatusMap[order.status];
            const isNew = order.status === 'new';

            return (
              <div
                key={order.id}
                className={`card-premium overflow-hidden animate-fade-in-up stagger-${Math.min(index + 1, 8)} ${
                  isNew ? 'ring-2 ring-blue-400/50 animate-glow-pulse' : ''
                }`}
              >
                {/* Order Header */}
                <div
                  className="flex items-center justify-between p-4 sm:p-5 cursor-pointer hover:bg-gray-50/30 transition-colors"
                  onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl gradient-primary-soft flex items-center justify-center flex-shrink-0">
                      <span className="text-lg font-bold text-orange-600">T-{order.tableNumber}</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-gray-800">{order.orderNumber}</span>
                        <span className={`status-${order.status} px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider`}>
                          {order.status}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {order.items.length} items &middot; <span className="font-semibold text-gray-600">{currency}{order.total.toFixed(0)}</span> &middot; {timeAgo(order.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {next && !isExpanded && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          updateOrderStatus(order.id, next as any);
                        }}
                        className={`hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white shadow-lg transition-all duration-300 hover:scale-[1.03] ${
                          nextStatusBtnStyle[order.status] || 'gradient-primary shadow-orange-200'
                        }`}
                      >
                        {nextStatusIcon[order.status]}
                        {nextStatusLabel[order.status]}
                      </button>
                    )}
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${isExpanded ? 'bg-orange-50 text-orange-500' : 'text-gray-400'}`}>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Expanded Detail */}
                {isExpanded && (
                  <div className="border-t border-gray-100 animate-fade-in">
                    <div className="p-4 sm:p-5 space-y-4">
                      {/* Customer info */}
                      <div className="flex flex-wrap items-center gap-4 text-sm">
                        <div className="flex items-center gap-1.5 text-gray-500">
                          <User className="w-3.5 h-3.5" />
                          <span className="font-semibold text-gray-700">{order.customerName || 'Guest'}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-500">
                          <Hash className="w-3.5 h-3.5" />
                          <span>Table <span className="font-semibold text-gray-700">T-{order.tableNumber}</span></span>
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-500">
                          <Clock className="w-3.5 h-3.5" />
                          <span className="font-medium text-gray-600">{new Date(order.createdAt).toLocaleString()}</span>
                        </div>
                      </div>

                      {/* Items list with food type indicators */}
                      <div className="card-premium overflow-hidden">
                        <div className="px-4 py-2.5 border-b border-gray-50 bg-gray-50/50">
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Order Items</p>
                        </div>
                        <ul className="divide-y divide-gray-50">
                          {order.items.map((item) => (
                            <li key={item.id} className="flex items-center justify-between px-4 py-3">
                              <div className="flex items-center gap-2.5">
                                <span className={getFoodTypeClass(item.foodType)} />
                                <span className="text-sm font-medium text-gray-700">{item.menuItemName}</span>
                                <span className="text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full font-semibold">x{item.quantity}</span>
                              </div>
                              <span className="text-sm font-bold text-gray-800">
                                {currency}{item.total.toFixed(0)}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Bill Summary */}
                      <div className="card-premium p-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm text-gray-500">
                            <span>Subtotal</span>
                            <span className="font-medium">{currency}{order.subtotal.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-sm text-gray-500">
                            <span>Tax</span>
                            <span className="font-medium">{currency}{order.tax.toFixed(2)}</span>
                          </div>
                          {order.serviceCharge > 0 && (
                            <div className="flex justify-between text-sm text-gray-500">
                              <span>Service Charge</span>
                              <span className="font-medium">{currency}{order.serviceCharge.toFixed(2)}</span>
                            </div>
                          )}
                          <div className="divider-gradient my-2" />
                          <div className="flex justify-between items-center pt-1">
                            <span className="text-base font-bold text-gray-800">Total</span>
                            <span className="text-lg font-bold text-gradient">{currency}{order.total.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Status History Timeline */}
                      <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Status History</p>
                        <div className="flex flex-wrap gap-2 items-center">
                          {order.statusHistory.map((sh, i) => (
                            <React.Fragment key={i}>
                              <div className="flex items-center gap-1.5">
                                <span className={`status-${sh.status} px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider`}>
                                  {sh.status}
                                </span>
                                <span className="text-[10px] text-gray-300 font-medium">
                                  {new Date(sh.timestamp).toLocaleTimeString()}
                                </span>
                              </div>
                              {i < order.statusHistory.length - 1 && (
                                <span className="text-gray-300 text-xs">&rarr;</span>
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>

                      {/* Action Button */}
                      {next && (
                        <div className="flex justify-end pt-2">
                          <button
                            onClick={() => updateOrderStatus(order.id, next as any)}
                            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white shadow-lg transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] ${
                              nextStatusBtnStyle[order.status] || 'gradient-primary shadow-orange-200'
                            }`}
                          >
                            {nextStatusIcon[order.status]}
                            {nextStatusLabel[order.status]}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
