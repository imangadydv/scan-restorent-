'use client';

import React, { useState, useMemo } from 'react';
import { useApp } from '@/lib/store';
import {
  Plus,
  Users,
  Edit2,
  X,
  Layers,
  ArrowUpRight,
  Search,
  Filter,
} from 'lucide-react';
import type { Table } from '@/lib/types';

// Status configuration
const STATUS_CONFIG = {
  available: {
    label: 'Available',
    color: 'text-green-600',
    bg: 'bg-green-50',
    dot: 'bg-green-500',
    stripe: 'from-green-400 to-green-500',
  },
  occupied: {
    label: 'Occupied',
    color: 'text-orange-600',
    bg: 'bg-orange-50',
    dot: 'bg-orange-500',
    stripe: 'from-orange-400 to-orange-500',
  },
  reserved: {
    label: 'Reserved',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    dot: 'bg-blue-500',
    stripe: 'from-blue-400 to-blue-500',
  },
  maintenance: {
    label: 'Maintenance',
    color: 'text-slate-600',
    bg: 'bg-slate-50',
    dot: 'bg-slate-400',
    stripe: 'from-slate-400 to-slate-500',
  },
};

// Table Card Component
function TableCard({ table, orders, onEdit }: { table: Table; orders: any[]; onEdit: (table: Table) => void }) {
  const config = STATUS_CONFIG[table.status];
  const currentOrder = table.currentOrderId ? orders.find(o => o.id === table.currentOrderId) : null;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-all">
      {/* Colored stripe */}
      <div className={`h-1 rounded-t-lg bg-gradient-to-r ${config.stripe}`} />
      
      <div className="p-4 relative">
        {/* Edit button */}
        <button
          onClick={() => onEdit(table)}
          className="absolute top-2 right-2 p-1 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <Edit2 className="w-3.5 h-3.5 text-slate-400" />
        </button>

        {/* Table number */}
        <div className="text-3xl font-bold text-slate-800 mb-1">
          {table.number}
        </div>

        {/* Capacity */}
        <div className="flex items-center gap-1 text-sm text-slate-500 mb-2">
          <Users className="w-3.5 h-3.5" />
          <span>{table.capacity} seats</span>
        </div>

        {/* Location */}
        <div className="text-xs text-slate-400 mb-3">
          Floor {table.floor} • {table.section}
        </div>

        {/* Status badge */}
        <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-medium ${config.bg} ${config.color}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
          {config.label}
        </div>

        {/* Current order */}
        {table.status === 'occupied' && currentOrder && (
          <div className="mt-2">
            <a
              href="/dashboard/orders"
              className="text-xs text-orange-600 hover:text-orange-700 font-medium inline-flex items-center gap-0.5"
            >
              {currentOrder.orderNumber}
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

// Stat Card Component
function StatCard({ label, count, config }: { label: string; count: number; config: any }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500 mb-1">{label}</p>
          <p className="text-2xl font-bold text-slate-800">{count}</p>
        </div>
        <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${config.stripe} flex items-center justify-center`}>
          <span className="text-white font-bold text-sm">{count}</span>
        </div>
      </div>
    </div>
  );
}

// Main Tables Page
export default function TablesPage() {
  const { currentRestaurant, tables, branches, orders, addTable, updateTable } = useApp();

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [filterBranch, setFilterBranch] = useState('all');
  const [filterFloor, setFilterFloor] = useState('all');
  const [form, setForm] = useState({
    number: '',
    capacity: '4',
    floor: '1',
    section: '',
    branchId: '',
  });

  // Get restaurant branches
  const restaurantBranches = useMemo(
    () => branches.filter(b => b.restaurantId === currentRestaurant?.id),
    [branches, currentRestaurant]
  );

  // Get restaurant tables
  const restaurantTables = useMemo(
    () => tables.filter(t => t.restaurantId === currentRestaurant?.id),
    [tables, currentRestaurant]
  );

  // Filter tables
  const filteredTables = useMemo(() => {
    let result = restaurantTables;
    if (filterBranch !== 'all') {
      result = result.filter(t => t.branchId === filterBranch);
    }
    if (filterFloor !== 'all') {
      result = result.filter(t => t.floor === parseInt(filterFloor));
    }
    return result.sort((a, b) => a.number - b.number);
  }, [restaurantTables, filterBranch, filterFloor]);

  // Get available floors
  const floors = useMemo(() => {
    const floorSet = new Set(restaurantTables.map(t => t.floor));
    return Array.from(floorSet).sort((a, b) => a - b);
  }, [restaurantTables]);

  // Get sections for selected branch
  const sections = useMemo(() => {
    const branch = restaurantBranches.find(b => b.id === (form.branchId || restaurantBranches[0]?.id));
    return branch?.sections || ['Main Hall', 'Outdoor', 'Private'];
  }, [restaurantBranches, form.branchId]);

  // Status counts
  const statusCounts = useMemo(() => {
    const counts = { available: 0, occupied: 0, reserved: 0, maintenance: 0 };
    filteredTables.forEach(t => {
      if (counts[t.status] !== undefined) counts[t.status]++;
    });
    return counts;
  }, [filteredTables]);

  const openAddModal = () => {
    setEditingId(null);
    setForm({
      number: '',
      capacity: '4',
      floor: '1',
      section: sections[0] || '',
      branchId: restaurantBranches[0]?.id || '',
    });
    setShowModal(true);
  };

  const openEditModal = (table: Table) => {
    setEditingId(table.id);
    setForm({
      number: table.number.toString(),
      capacity: table.capacity.toString(),
      floor: table.floor.toString(),
      section: table.section,
      branchId: table.branchId,
    });
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const tableData = {
      restaurantId: currentRestaurant?.id || '',
      branchId: form.branchId,
      number: parseInt(form.number),
      capacity: parseInt(form.capacity),
      floor: parseInt(form.floor),
      section: form.section,
      status: 'available' as const,
    };

    if (editingId) {
      updateTable(editingId, tableData);
    } else {
      addTable(tableData);
    }
    setShowModal(false);
  };

  if (!currentRestaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <Layers className="w-12 h-12 text-slate-300 mx-auto mb-3" />
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
          <h1 className="text-2xl font-bold text-slate-800">Tables</h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage your restaurant tables and seating
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Table
        </button>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(STATUS_CONFIG).map(([key, config]) => (
          <StatCard
            key={key}
            label={config.label}
            count={statusCounts[key as keyof typeof statusCounts] || 0}
            config={config}
          />
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
        <div className="flex flex-wrap gap-3">
          {/* Branch Filter */}
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-slate-400" />
            <select
              value={filterBranch}
              onChange={(e) => setFilterBranch(e.target.value)}
              className="px-3 py-1.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-orange-400"
            >
              <option value="all">All Branches</option>
              {restaurantBranches.map(b => (
                <option key={b.id} value={b.id}>{b.name}</option>
              ))}
            </select>
          </div>

          {/* Floor Filter */}
          <div className="flex gap-1">
            <button
              onClick={() => setFilterFloor('all')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                filterFloor === 'all'
                  ? 'bg-orange-500 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Floors
            </button>
            {floors.map(floor => (
              <button
                key={floor}
                onClick={() => setFilterFloor(floor.toString())}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  filterFloor === floor.toString()
                    ? 'bg-orange-500 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Floor {floor}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tables Grid */}
      {filteredTables.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-12 text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Layers className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-medium text-slate-700 mb-1">No tables found</h3>
          <p className="text-sm text-slate-500">Add tables to manage your seating arrangement</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {filteredTables.map(table => (
            <TableCard
              key={table.id}
              table={table}
              orders={orders}
              onEdit={openEditModal}
            />
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <h3 className="text-lg font-semibold text-slate-800">
                {editingId ? 'Edit Table' : 'Add New Table'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Table Number
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={form.number}
                    onChange={(e) => setForm({ ...form, number: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-orange-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Capacity
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    max="20"
                    value={form.capacity}
                    onChange={(e) => setForm({ ...form, capacity: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-orange-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Floor
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  value={form.floor}
                  onChange={(e) => setForm({ ...form, floor: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-orange-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Section
                </label>
                <select
                  value={form.section}
                  onChange={(e) => setForm({ ...form, section: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-orange-400"
                >
                  {sections.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Branch
                </label>
                <select
                  value={form.branchId}
                  onChange={(e) => setForm({ ...form, branchId: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-orange-400"
                >
                  {restaurantBranches.map(b => (
                    <option key={b.id} value={b.id}>{b.name}</option>
                  ))}
                </select>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                >
                  {editingId ? 'Save Changes' : 'Add Table'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}