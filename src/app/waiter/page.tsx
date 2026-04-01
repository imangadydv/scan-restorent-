'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/store';
import {
  Grid3X3,
  ShoppingBag,
  CheckCircle,
  Clock,
  Users,
  Eye,
  ArrowRight,
  UtensilsCrossed,
  ChefHat,
  Truck,
  Bell,
  ClipboardList,
  Coffee,
  AlertCircle,
} from 'lucide-react';

// Quick Stats Card Component
const StatCard = ({ icon: Icon, value, label, gradient, badge, index }: any) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5 hover:shadow-md transition-all">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${gradient} flex items-center justify-center shadow-md`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <p className="text-2xl font-bold text-slate-800">{value}</p>
          <p className="text-xs text-slate-500 mt-0.5">{label}</p>
        </div>
      </div>
      {badge && (
        <div className="mt-3">
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-50 text-red-600 text-xs rounded-lg">
            <AlertCircle className="w-3 h-3" />
            {badge}
          </span>
        </div>
      )}
    </div>
  );
};

// Table Card Component
const TableCard = ({ table, order, config }: any) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-all">
      <div className={`h-1 ${config.stripe}`} />
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <span className="text-2xl font-bold text-slate-800">T-{table.number}</span>
        </div>
        
        <div className="flex items-center gap-1 text-xs text-slate-500 mb-3">
          <Users className="w-3 h-3" />
          <span>{table.capacity} seats</span>
        </div>
        
        <span className={`inline-flex px-2 py-1 rounded-lg text-xs font-medium ${config.badge}`}>
          {config.badgeText}
        </span>
        
        {order && (
          <div className="mt-3 pt-3 border-t border-slate-100">
            <p className="text-xs font-medium text-slate-600 mb-1">Current Order</p>
            <p className="text-sm font-semibold text-slate-800">{order.orderNumber}</p>
            <div className="flex items-center justify-between mt-1">
              <span className="text-xs text-slate-500">{order.items.length} items</span>
              <span className="text-sm font-bold text-orange-600">₹{order.total}</span>
            </div>
            <Link
              href={`/waiter/orders/${order.id}`}
              className="mt-2 w-full inline-flex items-center justify-center gap-1 px-3 py-1.5 bg-orange-50 text-orange-600 text-xs font-medium rounded-lg hover:bg-orange-100 transition-colors"
            >
              <Eye className="w-3 h-3" /> View Order
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

// Order Card Component
const OrderCard = ({ order, currency, onUpdateStatus }: any) => {
  const statusConfig: Record<string, { nextStatus: string; label: string; icon: any; color: string }> = {
    new: {
      nextStatus: 'accepted',
      label: 'Accept Order',
      icon: CheckCircle,
      color: 'from-emerald-500 to-green-500',
    },
    accepted: {
      nextStatus: 'preparing',
      label: 'Start Preparing',
      icon: ChefHat,
      color: 'from-orange-500 to-amber-500',
    },
    preparing: {
      nextStatus: 'ready',
      label: 'Mark Ready',
      icon: UtensilsCrossed,
      color: 'from-blue-500 to-indigo-500',
    },
    ready: {
      nextStatus: 'served',
      label: 'Mark Served',
      icon: Truck,
      color: 'from-purple-500 to-violet-500',
    },
  };

  const config = statusConfig[order.status] || null;
  const timeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 hover:shadow-md transition-all">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
            <Coffee className="w-5 h-5 text-orange-600" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-800">{order.orderNumber}</span>
              <span className="text-xs text-slate-400">• Table {order.tableNumber}</span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {order.customerName || 'Guest'} • {timeAgo(order.createdAt)}
            </p>
          </div>
        </div>
        <span className={`px-2 py-1 rounded-lg text-xs font-medium capitalize ${
          order.status === 'new' ? 'bg-blue-50 text-blue-700' :
          order.status === 'accepted' ? 'bg-orange-50 text-orange-700' :
          order.status === 'preparing' ? 'bg-purple-50 text-purple-700' :
          order.status === 'ready' ? 'bg-green-50 text-green-700' :
          'bg-slate-100 text-slate-600'
        }`}>
          {order.status}
        </span>
      </div>

      {/* Order Items */}
      <div className="space-y-1.5 mb-3">
        {order.items.slice(0, 2).map((item: any) => (
          <div key={item.id} className="flex justify-between text-sm">
            <span className="text-slate-600">{item.menuItemName} x{item.quantity}</span>
            <span className="font-medium text-slate-700">₹{item.price * item.quantity}</span>
          </div>
        ))}
        {order.items.length > 2 && (
          <p className="text-xs text-slate-500">+{order.items.length - 2} more items</p>
        )}
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-slate-100">
        <span className="text-lg font-bold text-slate-800">₹{order.total}</span>
        {config && (
          <button
            onClick={() => onUpdateStatus(order.id, config.nextStatus)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium text-white bg-gradient-to-r ${config.color} hover:shadow-md transition-all`}
          >
            <span className="flex items-center gap-1">
              <config.icon className="w-4 h-4" />
              {config.label}
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

// Alert Banner Component
const AlertBanner = ({ count }: { count: number }) => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl overflow-hidden">
      <div className="px-5 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
              <Bell className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div>
              <p className="font-bold text-white">
                {count} New Order{count > 1 ? 's' : ''}!
              </p>
              <p className="text-sm text-blue-100">Ready to be accepted</p>
            </div>
          </div>
          <Link
            href="/waiter/orders"
            className="flex items-center gap-1 px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-lg text-sm text-white transition-colors"
          >
            View <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default function WaiterDashboardPage() {
  const { currentUser, currentRestaurant, orders, tables, updateOrderStatus } = useApp();

  // Get waiter's tables
  const myTables = useMemo(() => {
    if (!currentUser?.branchId) return [];
    return tables.filter(t => t.branchId === currentUser.branchId);
  }, [tables, currentUser]);

  // Get restaurant orders
  const restaurantOrders = useMemo(() => {
    if (!currentRestaurant) return [];
    return orders.filter(o => o.restaurantId === currentRestaurant.id);
  }, [orders, currentRestaurant]);

  // Active orders (not completed or cancelled)
  const activeOrders = useMemo(() => {
    return restaurantOrders
      .filter(o => !['completed', 'cancelled'].includes(o.status))
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [restaurantOrders]);

  // New orders
  const newOrders = activeOrders.filter(o => o.status === 'new');
  
  // Pending orders (not served)
  const pendingOrders = activeOrders.filter(o => o.status !== 'served');
  
  // Completed today
  const completedToday = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    return restaurantOrders.filter(o => 
      o.status === 'completed' && o.createdAt.split('T')[0] === today
    ).length;
  }, [restaurantOrders]);

  // Active tables (occupied)
  const activeTables = myTables.filter(t => t.status === 'occupied').length;

  // Table status configuration
  const tableStatusConfig: Record<string, any> = {
    available: {
      stripe: 'bg-gradient-to-r from-emerald-400 to-green-500',
      badge: 'bg-green-50 text-green-700',
      badgeText: 'Available',
    },
    occupied: {
      stripe: 'bg-gradient-to-r from-orange-400 to-amber-500',
      badge: 'bg-orange-50 text-orange-700',
      badgeText: 'Occupied',
    },
    reserved: {
      stripe: 'bg-gradient-to-r from-blue-400 to-indigo-500',
      badge: 'bg-blue-50 text-blue-700',
      badgeText: 'Reserved',
    },
    maintenance: {
      stripe: 'bg-gradient-to-r from-slate-400 to-slate-500',
      badge: 'bg-slate-100 text-slate-600',
      badgeText: 'Maintenance',
    },
  };

  const currency = currentRestaurant?.settings.currencySymbol || '₹';

  return (
    <div className="space-y-6">
      {/* Alert Banner */}
      {newOrders.length > 0 && <AlertBanner count={newOrders.length} />}

      {/* Stats Section */}
      <div className="grid grid-cols-3 gap-4">
        <StatCard
          icon={Grid3X3}
          value={activeTables}
          label="Active Tables"
          gradient="from-orange-500 to-amber-500"
        />
        <StatCard
          icon={Clock}
          value={pendingOrders.length}
          label="Pending Orders"
          gradient="from-blue-500 to-cyan-500"
          badge={pendingOrders.length > 0 ? `${pendingOrders.length} waiting` : null}
        />
        <StatCard
          icon={CheckCircle}
          value={completedToday}
          label="Completed Today"
          gradient="from-emerald-500 to-green-500"
        />
      </div>

      {/* Tables Section */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Grid3X3 className="w-5 h-5 text-orange-500" />
          <h2 className="text-lg font-semibold text-slate-800">My Tables</h2>
        </div>

        {myTables.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mx-auto mb-3">
              <Grid3X3 className="w-8 h-8 text-slate-300" />
            </div>
            <p className="text-slate-500">No tables assigned yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {myTables.map(table => {
              const config = tableStatusConfig[table.status] || tableStatusConfig.available;
              const currentOrder = restaurantOrders.find(
                o => o.tableId === table.id && !['completed', 'cancelled'].includes(o.status)
              );
              return (
                <TableCard
                  key={table.id}
                  table={table}
                  order={currentOrder}
                  config={config}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* Active Orders Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-orange-500" />
            <h2 className="text-lg font-semibold text-slate-800">Active Orders</h2>
          </div>
          <Link
            href="/waiter/orders"
            className="text-sm text-orange-600 hover:text-orange-700 font-medium"
          >
            View All
          </Link>
        </div>

        {activeOrders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mx-auto mb-3">
              <ShoppingBag className="w-8 h-8 text-slate-300" />
            </div>
            <p className="text-slate-500">No active orders right now.</p>
          </div>
        ) : (
          <div className="grid gap-3">
            {activeOrders.slice(0, 5).map(order => (
              <OrderCard
                key={order.id}
                order={order}
                currency={currency}
                onUpdateStatus={updateOrderStatus}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}