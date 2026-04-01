'use client';

import React, { useState, useMemo } from 'react';
import { useApp } from '@/lib/store';
import {
  Plus,
  Edit2,
  X,
  Users,
  Mail,
  Phone,
  Shield,
  Building2,
  UserCheck,
  UserX,
} from 'lucide-react';
import type { UserRole } from '@/lib/types';

interface StaffForm {
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  branchId: string;
  password: string;
}

const emptyForm: StaffForm = {
  name: '',
  email: '',
  phone: '',
  role: 'waiter',
  branchId: '',
  password: '',
};

const roleLabels: Record<string, { label: string; color: string; bg: string; gradient: string }> = {
  restaurant_admin: { label: 'Admin', color: 'text-purple-700', bg: 'bg-purple-100', gradient: 'gradient-purple' },
  waiter: { label: 'Waiter', color: 'text-blue-700', bg: 'bg-blue-100', gradient: 'gradient-info' },
  kitchen: { label: 'Kitchen', color: 'text-amber-700', bg: 'bg-amber-100', gradient: 'gradient-amber' },
  manager: { label: 'Manager', color: 'text-green-700', bg: 'bg-green-100', gradient: 'gradient-success' },
};

export default function StaffPage() {
  const { currentRestaurant, users, branches, addStaffUser, updateStaffUser } = useApp();

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<StaffForm>(emptyForm);

  const restaurantBranches = useMemo(
    () => branches.filter((b) => b.restaurantId === currentRestaurant?.id),
    [branches, currentRestaurant]
  );

  const staffUsers = useMemo(
    () =>
      users.filter(
        (u) =>
          u.restaurantId === currentRestaurant?.id &&
          u.role !== 'superadmin' &&
          u.role !== 'customer'
      ),
    [users, currentRestaurant]
  );

  const getBranchName = (branchId?: string) => {
    if (!branchId) return 'All';
    return branches.find((b) => b.id === branchId)?.name || 'Unknown';
  };

  const openAddModal = () => {
    setEditingId(null);
    setForm({
      ...emptyForm,
      branchId: restaurantBranches[0]?.id || '',
    });
    setShowModal(true);
  };

  const openEditModal = (user: (typeof staffUsers)[0]) => {
    setEditingId(user.id);
    setForm({
      name: user.name,
      email: user.email,
      phone: user.phone || '',
      role: user.role,
      branchId: user.branchId || '',
      password: '',
    });
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      const updates: Record<string, unknown> = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        role: form.role,
        branchId: form.branchId,
      };
      if (form.password) {
        updates.password = form.password;
      }
      updateStaffUser(editingId, updates);
    } else {
      addStaffUser({
        name: form.name,
        email: form.email,
        password: form.password || 'admin123',
        role: form.role,
        phone: form.phone,
        restaurantId: currentRestaurant?.id || '',
        branchId: form.branchId,
        isActive: true,
        createdAt: new Date().toISOString(),
      });
    }
    setShowModal(false);
  };

  const toggleActive = (userId: string, currentStatus: boolean) => {
    updateStaffUser(userId, { isActive: !currentStatus });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-in-up stagger-1">
        <div>
          <h1 className="text-2xl font-bold text-gradient">Staff Management</h1>
          <p className="text-gray-500 text-sm mt-1">
            {staffUsers.length} staff members
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="btn-primary flex items-center gap-2 px-5 py-2.5"
        >
          <Plus className="w-5 h-5" />
          Add Staff
        </button>
      </div>

      {/* Staff table */}
      {staffUsers.length === 0 ? (
        <div className="card-premium rounded-2xl p-12 text-center animate-fade-in-up stagger-2">
          <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto shadow-glow">
            <Users className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-600 mt-4">No staff members</h3>
          <p className="text-gray-400 mt-1">Add your team members to get started</p>
        </div>
      ) : (
        <div className="card-premium rounded-2xl overflow-hidden animate-fade-in-up stagger-2">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gradient-to-r from-gray-50 to-gray-100/50">
                  <th className="text-left py-3.5 px-6 text-gray-500 font-medium">Name</th>
                  <th className="text-left py-3.5 px-4 text-gray-500 font-medium">Email</th>
                  <th className="text-left py-3.5 px-4 text-gray-500 font-medium">Role</th>
                  <th className="text-left py-3.5 px-4 text-gray-500 font-medium hidden md:table-cell">
                    Phone
                  </th>
                  <th className="text-left py-3.5 px-4 text-gray-500 font-medium hidden lg:table-cell">
                    Branch
                  </th>
                  <th className="text-left py-3.5 px-4 text-gray-500 font-medium">Status</th>
                  <th className="text-left py-3.5 px-4 text-gray-500 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {staffUsers.map((user, index) => {
                  const roleInfo = roleLabels[user.role] || {
                    label: user.role,
                    color: 'text-gray-700',
                    bg: 'bg-gray-100',
                    gradient: 'gradient-dark',
                  };
                  return (
                    <tr
                      key={user.id}
                      className={`border-b border-gray-50 hover:bg-gray-50/50 transition-colors animate-fade-in-left stagger-${Math.min((index % 8) + 1, 8)}`}
                    >
                      {/* Name with gradient avatar */}
                      <td className="py-3.5 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center text-white font-semibold text-xs shadow-sm">
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                          <span className="font-medium text-gray-800">{user.name}</span>
                        </div>
                      </td>
                      {/* Email */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5 text-gray-600">
                          <Mail className="w-3.5 h-3.5 text-gray-400" />
                          <span className="truncate max-w-[180px]">{user.email}</span>
                        </div>
                      </td>
                      {/* Role with gradient badge */}
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-semibold ${roleInfo.bg} ${roleInfo.color}`}
                        >
                          {roleInfo.label}
                        </span>
                      </td>
                      {/* Phone */}
                      <td className="py-3.5 px-4 hidden md:table-cell">
                        <div className="flex items-center gap-1.5 text-gray-600">
                          <Phone className="w-3.5 h-3.5 text-gray-400" />
                          <span>{user.phone || '-'}</span>
                        </div>
                      </td>
                      {/* Branch */}
                      <td className="py-3.5 px-4 hidden lg:table-cell">
                        <div className="flex items-center gap-1.5 text-gray-600">
                          <Building2 className="w-3.5 h-3.5 text-gray-400" />
                          <span>{getBranchName(user.branchId)}</span>
                        </div>
                      </td>
                      {/* Status */}
                      <td className="py-3.5 px-4">
                        <button
                          onClick={() => toggleActive(user.id, user.isActive)}
                          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-all ${
                            user.isActive
                              ? 'status-accepted'
                              : 'status-cancelled'
                          }`}
                        >
                          {user.isActive ? (
                            <UserCheck className="w-3.5 h-3.5" />
                          ) : (
                            <UserX className="w-3.5 h-3.5" />
                          )}
                          {user.isActive ? 'Active' : 'Inactive'}
                        </button>
                      </td>
                      {/* Actions */}
                      <td className="py-3.5 px-4">
                        <button
                          onClick={() => openEditModal(user)}
                          className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                        >
                          <Edit2 className="w-4 h-4 text-gray-500" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="card-premium rounded-2xl shadow-elevated w-full max-w-md animate-scale-in">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gradient">
                {editingId ? 'Edit Staff Member' : 'Add New Staff'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="input-premium w-full"
                  placeholder="Full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="input-premium w-full"
                  placeholder="email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="text"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="input-premium w-full"
                  placeholder="+91-XXXXXXXXXX"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <div className="flex gap-2">
                  {(
                    [
                      { v: 'waiter' as UserRole, l: 'Waiter' },
                      { v: 'kitchen' as UserRole, l: 'Kitchen' },
                      { v: 'restaurant_admin' as UserRole, l: 'Manager' },
                    ] as const
                  ).map((r) => (
                    <button
                      type="button"
                      key={r.v}
                      onClick={() => setForm({ ...form, role: r.v })}
                      className={`flex-1 py-2 rounded-xl text-sm font-medium border-2 transition-all ${
                        form.role === r.v
                          ? 'border-orange-400 bg-orange-50 text-orange-700 shadow-sm'
                          : 'border-gray-200 text-gray-500 hover:border-gray-300'
                      }`}
                    >
                      {r.l}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Branch</label>
                <select
                  value={form.branchId}
                  onChange={(e) => setForm({ ...form, branchId: e.target.value })}
                  className="input-premium w-full"
                >
                  {restaurantBranches.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {editingId ? 'New Password (leave blank to keep)' : 'Password'}
                </label>
                <input
                  type="password"
                  required={!editingId}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="input-premium w-full"
                  placeholder={editingId ? 'Leave blank to keep current' : 'Enter password'}
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn-outline flex-1 py-2.5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary flex-1 py-2.5"
                >
                  {editingId ? 'Save Changes' : 'Add Staff'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
