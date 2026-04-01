'use client';

import React, { useMemo, useState, useEffect } from 'react';
import { useApp } from '@/lib/store';
import {
  ChefHat,
  Clock,
  CheckCircle,
  AlertTriangle,
  Flame,
  UtensilsCrossed,
  Bell,
  Inbox,
  TrendingUp,
} from 'lucide-react';

// ---------------------------------------------------------------------------
// Order Card Component
// ---------------------------------------------------------------------------

function OrderCard({
  order,
  theme,
  actionLabel,
  actionIcon: ActionIcon,
  onAction,
  index,
}: {
  order: any;
  theme: 'blue' | 'orange' | 'green';
  actionLabel: string;
  actionIcon: React.ElementType;
  onAction: () => void;
  index: number;
}) {
  const getTimeSince = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m`;
    const hrs = Math.floor(mins / 60);
    return `${hrs}h ${mins % 60}m`;
  };

  const getUrgency = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins > 30) return 'urgent';
    if (mins > 15) return 'warning';
    return 'normal';
  };

  const urgency = getUrgency(order.createdAt);
  
  const themeColors = {
    blue: 'border-blue-500 bg-blue-500/5',
    orange: 'border-orange-500 bg-orange-500/5',
    green: 'border-green-500 bg-green-500/5',
  };

  const urgencyColors = {
    normal: 'text-slate-400',
    warning: 'text-yellow-500 bg-yellow-500/10',
    urgent: 'text-red-500 bg-red-500/10 animate-pulse',
  };

  const orderNumber = order.orderNumber.split('-').pop();

  return (
    <div className={`bg-white rounded-lg shadow-sm border-l-4 ${themeColors[theme]} overflow-hidden`}>
      {/* Header */}
      <div className={`p-3 ${themeColors[theme]} border-b border-slate-100`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-slate-800">
              #{orderNumber}
            </span>
            <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-sm font-medium rounded">
              T-{order.tableNumber}
            </span>
          </div>
          <div className={`flex items-center gap-1 text-xs font-mono px-2 py-1 rounded ${urgencyColors[urgency]}`}>
            <Clock className="w-3 h-3" />
            {getTimeSince(order.createdAt)}
          </div>
        </div>
      </div>

      {/* Items */}
      <div className="p-3 space-y-2">
        {order.items.map((item: any) => (
          <div key={item.id} className="flex gap-2">
            <span className={`w-2 h-2 rounded-full mt-1.5 ${
              item.foodType === 'veg' ? 'bg-green-500' :
              item.foodType === 'vegan' ? 'bg-emerald-500' : 'bg-red-500'
            }`} />
            <span className="font-mono text-sm font-semibold text-slate-700 min-w-[2rem]">
              {item.quantity}x
            </span>
            <div className="flex-1">
              <span className="text-sm font-medium text-slate-700">
                {item.menuItemName}
              </span>
              {item.notes && (
                <div className="mt-1 text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded">
                  <AlertTriangle className="w-3 h-3 inline mr-1" />
                  {item.notes}
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Order Notes */}
        {order.notes && (
          <div className="mt-2 text-xs text-amber-600 bg-amber-50 p-2 rounded">
            <AlertTriangle className="w-3 h-3 inline mr-1" />
            {order.notes}
          </div>
        )}
      </div>

      {/* Action Button */}
      <div className="p-3 pt-0">
        <button
          onClick={onAction}
          className={`w-full py-2 rounded-lg text-white font-medium text-sm flex items-center justify-center gap-2 transition-colors ${
            theme === 'blue' ? 'bg-blue-500 hover:bg-blue-600' :
            theme === 'orange' ? 'bg-orange-500 hover:bg-orange-600' :
            'bg-green-500 hover:bg-green-600'
          }`}
        >
          <ActionIcon className="w-4 h-4" />
          {actionLabel}
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Column Component
// ---------------------------------------------------------------------------

function Column({
  title,
  icon: Icon,
  theme,
  orders,
  actionLabel,
  actionIcon,
  onAction,
}: {
  title: string;
  icon: React.ElementType;
  theme: 'blue' | 'orange' | 'green';
  orders: any[];
  actionLabel: string;
  actionIcon: React.ElementType;
  onAction: (orderId: string) => void;
}) {
  const themeColors = {
    blue: 'border-blue-500 bg-blue-50',
    orange: 'border-orange-500 bg-orange-50',
    green: 'border-green-500 bg-green-50',
  };

  const emptyMessages = {
    blue: { title: 'No incoming orders', subtitle: 'New orders will appear here' },
    orange: { title: 'Nothing being prepared', subtitle: 'Accept orders to start preparing' },
    green: { title: 'No orders ready', subtitle: 'Completed orders appear here' },
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full">
      {/* Header */}
      <div className={`p-3 border-b ${themeColors[theme]} border-slate-200`}>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${
            theme === 'blue' ? 'bg-blue-500' :
            theme === 'orange' ? 'bg-orange-500' : 'bg-green-500'
          }`} />
          <Icon className={`w-4 h-4 ${
            theme === 'blue' ? 'text-blue-600' :
            theme === 'orange' ? 'text-orange-600' : 'text-green-600'
          }`} />
          <h2 className="font-semibold text-slate-800">{title}</h2>
          <span className={`ml-auto text-xs font-medium px-2 py-0.5 rounded-full ${
            theme === 'blue' ? 'bg-blue-100 text-blue-700' :
            theme === 'orange' ? 'bg-orange-100 text-orange-700' :
            'bg-green-100 text-green-700'
          }`}>
            {orders.length}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 max-h-[calc(100vh-280px)]">
        {orders.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Icon className="w-6 h-6 text-slate-400" />
            </div>
            <p className="text-sm font-medium text-slate-600">{emptyMessages[theme].title}</p>
            <p className="text-xs text-slate-400 mt-1">{emptyMessages[theme].subtitle}</p>
          </div>
        ) : (
          orders.map((order, idx) => (
            <OrderCard
              key={order.id}
              order={order}
              theme={theme}
              actionLabel={actionLabel}
              actionIcon={actionIcon}
              onAction={() => onAction(order.id)}
              index={idx}
            />
          ))
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Stat Card Component
// ---------------------------------------------------------------------------

function StatCard({ label, value, icon: Icon, color }: any) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500 mb-1">{label}</p>
          <p className="text-2xl font-bold text-slate-800">{value}</p>
        </div>
        <div className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Kitchen Display Page
// ---------------------------------------------------------------------------

export default function KitchenDisplayPage() {
  const { currentRestaurant, orders, updateOrderStatus } = useApp();
  const [, setTick] = useState(0);

  // Force re-render every 30 seconds to update timers
  useEffect(() => {
    const timer = setInterval(() => setTick(t => t + 1), 30000);
    return () => clearInterval(timer);
  }, []);

  // Filter orders for current restaurant
  const restaurantOrders = useMemo(() => {
    if (!currentRestaurant) return [];
    return orders.filter(o => o.restaurantId === currentRestaurant.id);
  }, [orders, currentRestaurant]);

  // Categorize orders
  const incomingOrders = useMemo(() => 
    restaurantOrders
      .filter(o => o.status === 'new' || o.status === 'accepted')
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()),
    [restaurantOrders]
  );

  const preparingOrders = useMemo(() => 
    restaurantOrders
      .filter(o => o.status === 'preparing')
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()),
    [restaurantOrders]
  );

  const readyOrders = useMemo(() => 
    restaurantOrders
      .filter(o => o.status === 'ready')
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()),
    [restaurantOrders]
  );

  const handleAcceptOrder = (orderId: string) => {
    updateOrderStatus(orderId, 'preparing');
  };

  const handleMarkReady = (orderId: string) => {
    updateOrderStatus(orderId, 'ready');
  };

  const handleMarkServed = (orderId: string) => {
    updateOrderStatus(orderId, 'served');
  };

  if (!currentRestaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center p-6">
          <UtensilsCrossed className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500">No restaurant selected</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-4">
        <StatCard
          label="Incoming Orders"
          value={incomingOrders.length}
          icon={Inbox}
          color="bg-blue-500"
        />
        <StatCard
          label="Preparing"
          value={preparingOrders.length}
          icon={Flame}
          color="bg-orange-500"
        />
        <StatCard
          label="Ready to Serve"
          value={readyOrders.length}
          icon={CheckCircle}
          color="bg-green-500"
        />
      </div>

      {/* Kanban Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Incoming Column */}
        <Column
          title="Incoming Orders"
          icon={Inbox}
          theme="blue"
          orders={incomingOrders}
          actionLabel="Start Preparing"
          actionIcon={ChefHat}
          onAction={handleAcceptOrder}
        />

        {/* Preparing Column */}
        <Column
          title="Preparing"
          icon={Flame}
          theme="orange"
          orders={preparingOrders}
          actionLabel="Mark Ready"
          actionIcon={CheckCircle}
          onAction={handleMarkReady}
        />

        {/* Ready Column */}
        <Column
          title="Ready to Serve"
          icon={CheckCircle}
          theme="green"
          orders={readyOrders}
          actionLabel="Mark Served"
          actionIcon={UtensilsCrossed}
          onAction={handleMarkServed}
        />
      </div>
    </div>
  );
}