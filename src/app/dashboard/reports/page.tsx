'use client';

import React, { useState, useMemo } from 'react';
import { useApp } from '@/lib/store';
import {
  Calendar,
  TrendingUp,
  ShoppingBag,
  DollarSign,
  Star,
  Download,
  BarChart3,
  PieChart,
  Clock,
} from 'lucide-react';
import type { OrderStatus } from '@/lib/types';

type DateRange = '7' | '30' | '90';

const STATUS_COLORS: Record<OrderStatus, string> = {
  new: '#3B82F6',
  accepted: '#6366F1',
  preparing: '#EAB308',
  ready: '#22C55E',
  served: '#14B8A6',
  completed: '#6B7280',
  cancelled: '#EF4444',
};

// Stat Card Component
function StatCard({ label, value, icon: Icon, color }: any) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${color} flex items-center justify-center`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="text-xs text-slate-500 uppercase tracking-wide">{label}</p>
          <p className="text-xl font-bold text-slate-800">{value}</p>
        </div>
      </div>
    </div>
  );
}

// Status Legend Component
function StatusLegend({ statuses }: { statuses: Record<string, number> }) {
  const total = Object.values(statuses).reduce((a, b) => a + b, 0);
  
  return (
    <div className="space-y-2">
      {Object.entries(statuses).map(([status, count]) => {
        const percent = total > 0 ? (count / total) * 100 : 0;
        return (
          <div key={status} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: STATUS_COLORS[status as OrderStatus] || '#6B7280' }}
              />
              <span className="text-slate-600 capitalize">{status}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-slate-700">{count}</span>
              <span className="text-xs text-slate-400">({percent.toFixed(0)}%)</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Revenue Chart Component
function RevenueChart({ data, currency, dateRange }: any) {
  const maxRevenue = Math.max(...data.map((d: { revenue: any; }) => d.revenue), 1);
  
  // Show fewer bars for longer ranges
  const displayData = dateRange === '7' 
    ? data 
    : data.filter((_: any, i: number) => i % (dateRange === '30' ? 3 : 7) === 0 || i === data.length - 1);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-slate-400" />
          <h2 className="font-semibold text-slate-800">Revenue Trend</h2>
        </div>
        <span className="text-xs text-slate-400">Last {dateRange} days</span>
      </div>
      
      <div className="flex items-end gap-1 h-48">
        {displayData.map((day: any) => (
          <div key={day.date} className="flex-1 flex flex-col items-center gap-1">
            <span className="text-[10px] text-slate-400">
              {day.revenue > 0 ? `${currency}${(day.revenue / 1000).toFixed(1)}k` : ''}
            </span>
            <div
              className="w-full bg-orange-500 rounded-t transition-all duration-500"
              style={{ height: `${Math.max((day.revenue / maxRevenue) * 100, 2)}%` }}
            />
            <span className="text-[10px] text-slate-500 whitespace-nowrap">
              {day.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Pie Chart Component
function PieChartComponent({ data, total }: { data: Record<string, number>; total: number }) {
  const segments = Object.entries(data).map(([status, count]) => ({
    status,
    percent: total > 0 ? (count / total) * 100 : 0,
  }));

  let cumulative = 0;
  const gradientStops = segments.map(seg => {
    const start = cumulative;
    cumulative += seg.percent;
    const color = STATUS_COLORS[seg.status as OrderStatus] || '#6B7280';
    return `${color} ${start}% ${cumulative}%`;
  }).join(', ');

  const pieGradient = segments.length > 0 ? `conic-gradient(${gradientStops})` : 'conic-gradient(#E5E7EB 0% 100%)';

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-5">
      <div className="flex items-center gap-2 mb-4">
        <PieChart className="w-5 h-5 text-slate-400" />
        <h2 className="font-semibold text-slate-800">Orders by Status</h2>
      </div>
      
      <div className="flex justify-center mb-4">
        <div className="relative w-32 h-32">
          <div
            className="w-full h-full rounded-full shadow-sm"
            style={{ background: pieGradient }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 bg-white rounded-full flex flex-col items-center justify-center shadow-sm">
              <span className="text-xl font-bold text-slate-800">{total}</span>
              <span className="text-[10px] text-slate-400">Orders</span>
            </div>
          </div>
        </div>
      </div>
      
      <StatusLegend statuses={data} />
    </div>
  );
}

// Top Items Table Component
function TopItemsTable({ items, currency }: any) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200">
      <div className="p-4 border-b border-slate-200">
        <h2 className="font-semibold text-slate-800">Top Selling Items</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="text-left py-3 px-4 text-xs font-medium text-slate-500">#</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-slate-500">Item</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-slate-500">Quantity</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-slate-500">Revenue</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-8 text-slate-400">
                  No data available
                </td>
              </tr>
            ) : (
              items.map((item: any, idx: number) => (
                <tr key={item.name} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold text-white ${
                      idx === 0 ? 'bg-orange-500' :
                      idx === 1 ? 'bg-amber-500' :
                      idx === 2 ? 'bg-yellow-500' : 'bg-slate-300'
                    }`}>
                      {idx + 1}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-medium text-slate-700">{item.name}</td>
                  <td className="py-3 px-4 text-slate-600">{item.count}</td>
                  <td className="py-3 px-4 font-semibold text-orange-600">
                    {currency}{item.revenue}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Daily Revenue Table Component
function DailyRevenueTable({ data, currency }: any) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200">
      <div className="p-4 border-b border-slate-200">
        <h2 className="font-semibold text-slate-800">Revenue by Day</h2>
      </div>
      <div className="max-h-96 overflow-y-auto">
        <table className="w-full text-sm">
          <thead className="sticky top-0 bg-slate-50">
            <tr>
              <th className="text-left py-3 px-4 text-xs font-medium text-slate-500">Date</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-slate-500">Orders</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-slate-500">Revenue</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center py-8 text-slate-400">
                  No data available
                </td>
              </tr>
            ) : (
              [...data].reverse().map((day: any) => (
                <tr key={day.date} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-3 px-4 text-slate-600">{day.label}</td>
                  <td className="py-3 px-4 text-slate-600">{day.orders}</td>
                  <td className="py-3 px-4 font-semibold text-orange-600">
                    {currency}{day.revenue}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Main Reports Page
export default function ReportsPage() {
  const { currentRestaurant, orders } = useApp();
  const [dateRange, setDateRange] = useState<DateRange>('7');

  // Filter orders by date range
  const cutoffDate = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() - parseInt(dateRange));
    return date;
  }, [dateRange]);

  const filteredOrders = useMemo(() => {
    if (!currentRestaurant) return [];
    return orders.filter(o => 
      o.restaurantId === currentRestaurant.id &&
      new Date(o.createdAt) >= cutoffDate
    );
  }, [orders, currentRestaurant, cutoffDate]);

  // Calculate stats
  const stats = useMemo(() => {
    const totalOrders = filteredOrders.length;
    const totalRevenue = filteredOrders
      .filter(o => o.status !== 'cancelled')
      .reduce((sum, o) => sum + o.total, 0);
    const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    return { totalOrders, totalRevenue, avgOrderValue };
  }, [filteredOrders]);

  // Get top items
  const topItems = useMemo(() => {
    const itemMap = new Map<string, { name: string; count: number; revenue: number }>();
    
    filteredOrders.forEach(order => {
      order.items.forEach(item => {
        const existing = itemMap.get(item.menuItemId);
        if (existing) {
          existing.count += item.quantity;
          existing.revenue += item.total;
        } else {
          itemMap.set(item.menuItemId, {
            name: item.menuItemName,
            count: item.quantity,
            revenue: item.total,
          });
        }
      });
    });
    
    return Array.from(itemMap.values())
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }, [filteredOrders]);

  // Get orders by status
  const ordersByStatus = useMemo(() => {
    const counts: Record<string, number> = {};
    filteredOrders.forEach(o => {
      counts[o.status] = (counts[o.status] || 0) + 1;
    });
    return counts;
  }, [filteredOrders]);

  // Get revenue by day
  const revenueByDay = useMemo(() => {
    const days: any[] = [];
    const numDays = parseInt(dateRange);
    
    for (let i = numDays - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const label = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      
      const dayOrders = filteredOrders.filter(o => 
        o.createdAt.split('T')[0] === dateStr && o.status !== 'cancelled'
      );
      
      days.push({
        date: dateStr,
        label,
        revenue: dayOrders.reduce((sum, o) => sum + o.total, 0),
        orders: dayOrders.length,
      });
    }
    
    return days;
  }, [filteredOrders, dateRange]);

  const currency = currentRestaurant?.settings.currencySymbol || '₹';
  const topItemName = topItems[0]?.name || 'N/A';

  if (!currentRestaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <BarChart3 className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500">No restaurant selected</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Reports & Analytics</h1>
          <p className="text-sm text-slate-500 mt-1">
            Insights for {currentRestaurant.name}
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Date Range Selector */}
          <div className="flex bg-white rounded-lg shadow-sm border border-slate-200 p-0.5">
            {[
              { value: '7' as DateRange, label: '7 Days' },
              { value: '30' as DateRange, label: '30 Days' },
              { value: '90' as DateRange, label: '90 Days' },
            ].map(option => (
              <button
                key={option.value}
                onClick={() => setDateRange(option.value)}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  dateRange === option.value
                    ? 'bg-orange-500 text-white'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
          
          {/* Export Button */}
          <button className="flex items-center gap-2 px-3 py-1.5 border border-slate-200 rounded-lg text-sm hover:bg-slate-50 transition-colors">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Orders"
          value={stats.totalOrders}
          icon={ShoppingBag}
          color="from-blue-500 to-blue-600"
        />
        <StatCard
          label="Total Revenue"
          value={`${currency}${stats.totalRevenue.toFixed(0)}`}
          icon={DollarSign}
          color="from-green-500 to-green-600"
        />
        <StatCard
          label="Avg Order Value"
          value={`${currency}${stats.avgOrderValue.toFixed(0)}`}
          icon={TrendingUp}
          color="from-purple-500 to-purple-600"
        />
        <StatCard
          label="Top Item"
          value={topItemName}
          icon={Star}
          color="from-amber-500 to-orange-500"
        />
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        <RevenueChart data={revenueByDay} currency={currency} dateRange={dateRange} />
        <PieChartComponent data={ordersByStatus} total={stats.totalOrders} />
      </div>

      {/* Tables Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        <TopItemsTable items={topItems} currency={currency} />
        <DailyRevenueTable data={revenueByDay} currency={currency} />
      </div>
    </div>
  );
}