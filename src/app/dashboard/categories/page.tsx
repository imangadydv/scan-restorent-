// src/app/dashboard/categories/page.tsx
'use client';

import React, { useState, useMemo } from 'react';
import { useApp } from '@/lib/store';
import {
  Plus,
  Edit2,
  X,
  GripVertical,
  FolderOpen,
  ToggleLeft,
  ToggleRight,
  Package,
} from 'lucide-react';
import type { Category } from '@/lib/types';

interface CategoryForm {
  name: string;
  description: string;
  image: string;
  sortOrder: string;
  isActive: boolean;
}

const emptyForm: CategoryForm = {
  name: '',
  description: '',
  image: '',
  sortOrder: '0',
  isActive: true,
};

const categoryIcons: Record<string, string> = {
  Starters: '🥗',
  'Main Course': '🍛',
  Breads: '🫓',
  'Rice & Biryani': '🍚',
  Desserts: '🍰',
  Beverages: '🥤',
  Appetizers: '🥟',
  Pasta: '🍝',
  Pizza: '🍕',
  Sushi: '🍣',
  Soups: '🍲',
  Salads: '🥗',
  Ramen: '🍜',
  Sides: '🍟',
};

const iconGradients = [
  'from-orange-400 to-red-400',
  'from-blue-400 to-indigo-500',
  'from-green-400 to-emerald-500',
  'from-purple-400 to-pink-500',
  'from-amber-400 to-orange-500',
  'from-teal-400 to-cyan-500',
  'from-rose-400 to-red-500',
  'from-indigo-400 to-blue-500',
];

export default function CategoriesPage() {
  const { currentRestaurant, categories, menuItems, addCategory, updateCategory } = useApp();

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<CategoryForm>(emptyForm);

  const restaurantCategories = useMemo(
    () =>
      categories
        .filter((c) => c.restaurantId === currentRestaurant?.id)
        .sort((a, b) => a.sortOrder - b.sortOrder),
    [categories, currentRestaurant]
  );

  const getItemCount = (categoryId: string) => {
    return menuItems.filter(
      (m) => m.categoryId === categoryId && m.restaurantId === currentRestaurant?.id
    ).length;
  };

  const openAddModal = () => {
    setEditingId(null);
    setForm({
      ...emptyForm,
      sortOrder: (restaurantCategories.length + 1).toString(),
    });
    setShowModal(true);
  };

  const openEditModal = (cat: Category) => {
    setEditingId(cat.id);
    setForm({
      name: cat.name,
      description: cat.description,
      image: cat.image,
      sortOrder: cat.sortOrder.toString(),
      isActive: cat.isActive,
    });
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      restaurantId: currentRestaurant?.id || '',
      name: form.name,
      description: form.description,
      image: form.image,
      sortOrder: parseInt(form.sortOrder) || 0,
      isActive: form.isActive,
    };

    if (editingId) {
      updateCategory(editingId, data);
    } else {
      addCategory(data);
    }
    setShowModal(false);
  };

  const toggleActive = (cat: Category) => {
    updateCategory(cat.id, { isActive: !cat.isActive });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-in-up stagger-1">
        <div>
          <h1 className="text-2xl font-bold text-gradient">Categories</h1>
          <p className="text-gray-500 text-sm mt-1">
            Organize your menu items into categories
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="btn-primary flex items-center gap-2 px-5 py-2.5"
        >
          <Plus className="w-5 h-5" />
          Add Category
        </button>
      </div>

      {/* Categories grid */}
      {restaurantCategories.length === 0 ? (
        <div className="card-premium rounded-2xl p-12 text-center animate-fade-in-up stagger-2">
          <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto shadow-glow">
            <FolderOpen className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-600 mt-4">No categories yet</h3>
          <p className="text-gray-400 mt-1">Create categories to organize your menu</p>
          <button
            onClick={openAddModal}
            className="btn-primary mt-4 px-5 py-2.5"
          >
            Create First Category
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {restaurantCategories.map((cat, index) => {
            const itemCount = getItemCount(cat.id);
            const emoji = categoryIcons[cat.name] || '🍽️';
            const gradientColors = iconGradients[index % iconGradients.length];
            const staggerClass = `stagger-${Math.min((index % 8) + 1, 8)}`;
            return (
              <div
                key={cat.id}
                className={`card-premium card-hover rounded-2xl overflow-hidden animate-fade-in-up ${staggerClass} ${!cat.isActive ? 'opacity-60' : ''
                  }`}
              >
                <div className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      {/* Drag handle (visual only) */}
                      <div className="cursor-grab text-gray-300 hover:text-gray-400">
                        <GripVertical className="w-5 h-5" />
                      </div>
                      {/* Gradient icon background */}
                      <div className={`w-12 h-12 bg-gradient-to-br ${gradientColors} rounded-xl flex items-center justify-center text-2xl shadow-sm`}>
                        {emoji}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => openEditModal(cat)}
                        className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4 text-gray-400" />
                      </button>
                      <button
                        onClick={() => toggleActive(cat)}
                        className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        {cat.isActive ? (
                          <ToggleRight className="w-5 h-5 text-green-500" />
                        ) : (
                          <ToggleLeft className="w-5 h-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="mt-3">
                    <h3 className="text-base font-semibold text-gray-800">{cat.name}</h3>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                      {cat.description || 'No description'}
                    </p>
                  </div>

                  <div className="divider-gradient my-3" />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-sm text-gray-500">
                      <Package className="w-4 h-4" />
                      <span>
                        {itemCount} {itemCount === 1 ? 'item' : 'items'}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                      Order: {cat.sortOrder}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="card-premium rounded-2xl shadow-elevated w-full max-w-md animate-scale-in">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gradient">
                {editingId ? 'Edit Category' : 'Add New Category'}
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category Name
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="input-premium w-full"
                  placeholder="e.g. Main Course"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="input-premium w-full h-20 resize-none"
                  placeholder="Brief description of this category"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sort Order
                </label>
                <input
                  type="number"
                  min="0"
                  value={form.sortOrder}
                  onChange={(e) => setForm({ ...form, sortOrder: e.target.value })}
                  className="input-premium w-full"
                />
              </div>

              <label className="flex items-center gap-3 cursor-pointer">
                <div
                  className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer ${form.isActive ? 'gradient-success' : 'bg-gray-300'
                    }`}
                  onClick={() => setForm({ ...form, isActive: !form.isActive })}
                >
                  <div
                    className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${form.isActive ? 'translate-x-5' : 'translate-x-0.5'
                      }`}
                  />
                </div>
                <span className="text-sm text-gray-600">Active</span>
              </label>

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
                  {editingId ? 'Save Changes' : 'Add Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
