'use client';

import React, { useState, useMemo } from 'react';
import { useApp } from '@/lib/store';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  X,
  Star,
  Flame,
  Clock,
  Filter,
  Package,
} from 'lucide-react';
import type { MenuItem, FoodType, SpiceLevel } from '@/lib/types';

interface MenuForm {
  name: string;
  description: string;
  price: string;
  categoryId: string;
  foodType: FoodType;
  spiceLevel: SpiceLevel;
  preparationTime: string;
  tags: string;
  isPopular: boolean;
  isAvailable: boolean;
}

const emptyForm: MenuForm = {
  name: '',
  description: '',
  price: '',
  categoryId: '',
  foodType: 'veg',
  spiceLevel: 'medium',
  preparationTime: '15',
  tags: '',
  isPopular: false,
  isAvailable: true,
};

const foodEmojis: Record<string, string> = {
  'Starters': '🥗',
  'Main Course': '🍛',
  'Breads': '🫓',
  'Rice & Biryani': '🍚',
  'Desserts': '🍰',
  'Beverages': '🥤',
  'Appetizers': '🥟',
  'Pasta': '🍝',
  'Pizza': '🍕',
  'Sushi': '🍣',
  'Soups': '🍲',
};

export default function MenuManagementPage() {
  const {
    currentRestaurant,
    menuItems,
    categories,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
  } = useApp();

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<MenuForm>(emptyForm);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterFoodType, setFilterFoodType] = useState<'all' | FoodType>('all');
  const [filterAvailability, setFilterAvailability] = useState<'all' | 'available' | 'unavailable'>('all');

  const restaurantCategories = useMemo(
    () => categories.filter((c) => c.restaurantId === currentRestaurant?.id),
    [categories, currentRestaurant]
  );

  const filteredItems = useMemo(() => {
    let items = menuItems.filter((m) => m.restaurantId === currentRestaurant?.id);
    if (filterCategory !== 'all') {
      items = items.filter((m) => m.categoryId === filterCategory);
    }
    if (filterFoodType !== 'all') {
      items = items.filter((m) => m.foodType === filterFoodType);
    }
    if (filterAvailability === 'available') {
      items = items.filter((m) => m.isAvailable);
    } else if (filterAvailability === 'unavailable') {
      items = items.filter((m) => !m.isAvailable);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      items = items.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.description.toLowerCase().includes(q) ||
          m.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return items;
  }, [menuItems, currentRestaurant, filterCategory, filterFoodType, filterAvailability, searchQuery]);

  const getCategoryName = (categoryId: string) => {
    return categories.find((c) => c.id === categoryId)?.name || 'Uncategorized';
  };

  const openAddModal = () => {
    setEditingId(null);
    setForm({
      ...emptyForm,
      categoryId: restaurantCategories[0]?.id || '',
    });
    setShowModal(true);
  };

  const openEditModal = (item: MenuItem) => {
    setEditingId(item.id);
    setForm({
      name: item.name,
      description: item.description,
      price: item.price.toString(),
      categoryId: item.categoryId,
      foodType: item.foodType,
      spiceLevel: item.spiceLevel || 'medium',
      preparationTime: item.preparationTime.toString(),
      tags: item.tags.join(', '),
      isPopular: item.isPopular,
      isAvailable: item.isAvailable,
    });
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      restaurantId: currentRestaurant?.id || '',
      categoryId: form.categoryId,
      name: form.name,
      description: form.description,
      price: parseFloat(form.price) || 0,
      image: '',
      foodType: form.foodType,
      spiceLevel: form.spiceLevel,
      isAvailable: form.isAvailable,
      isPopular: form.isPopular,
      preparationTime: parseInt(form.preparationTime) || 15,
      tags: form.tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
    };

    if (editingId) {
      updateMenuItem(editingId, data);
    } else {
      addMenuItem(data);
    }
    setShowModal(false);
  };

  const handleDelete = () => {
    if (deleteId) {
      deleteMenuItem(deleteId);
      setDeleteId(null);
    }
  };

  const toggleAvailability = (item: MenuItem) => {
    updateMenuItem(item.id, { isAvailable: !item.isAvailable });
  };

  const currency = currentRestaurant?.settings.currencySymbol || '$';

  const spiceLevels: { value: SpiceLevel; label: string; color: string }[] = [
    { value: 'mild', label: 'Mild', color: 'text-green-600' },
    { value: 'medium', label: 'Medium', color: 'text-yellow-600' },
    { value: 'hot', label: 'Hot', color: 'text-orange-600' },
    { value: 'extra-hot', label: 'Extra Hot', color: 'text-red-600' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-in-up stagger-1">
        <div>
          <h1 className="text-2xl font-bold text-gradient">Menu Management</h1>
          <p className="text-gray-500 text-sm mt-1">
            {filteredItems.length} items found
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="btn-primary flex items-center gap-2 px-5 py-2.5"
        >
          <Plus className="w-5 h-5" />
          Add New Item
        </button>
      </div>

      {/* Filters */}
      <div className="card-premium rounded-2xl p-4 animate-fade-in-up stagger-2">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="flex items-center gap-2 bg-white/60 dark:bg-white/5 rounded-xl px-3 py-2 flex-1 border border-gray-200/60">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search menu items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none w-full"
            />
          </div>

          {/* Category filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="input-premium text-sm !py-2"
            >
              <option value="all">All Categories</option>
              {restaurantCategories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Food type filter */}
          <select
            value={filterFoodType}
            onChange={(e) => setFilterFoodType(e.target.value as 'all' | FoodType)}
            className="input-premium text-sm !py-2"
          >
            <option value="all">All Types</option>
            <option value="veg">Veg</option>
            <option value="non-veg">Non-Veg</option>
            <option value="vegan">Vegan</option>
          </select>

          {/* Availability filter */}
          <select
            value={filterAvailability}
            onChange={(e) =>
              setFilterAvailability(e.target.value as 'all' | 'available' | 'unavailable')
            }
            className="input-premium text-sm !py-2"
          >
            <option value="all">All Status</option>
            <option value="available">Available</option>
            <option value="unavailable">Out of Stock</option>
          </select>
        </div>
      </div>

      {/* Menu items grid */}
      {filteredItems.length === 0 ? (
        <div className="card-premium rounded-2xl p-12 text-center animate-fade-in-up stagger-3">
          <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto shadow-glow">
            <Package className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-600 mt-4">No menu items found</h3>
          <p className="text-gray-400 mt-1">
            {searchQuery || filterCategory !== 'all'
              ? 'Try adjusting your filters'
              : 'Add your first menu item to get started'}
          </p>
          {!searchQuery && filterCategory === 'all' && (
            <button
              onClick={openAddModal}
              className="btn-primary mt-4 px-5 py-2.5"
            >
              Add First Item
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredItems.map((item, index) => {
            const catName = getCategoryName(item.categoryId);
            const emoji = foodEmojis[catName] || '🍽️';
            const staggerClass = `stagger-${Math.min((index % 8) + 1, 8)}`;
            return (
              <div
                key={item.id}
                className={`card-premium card-hover rounded-2xl overflow-hidden animate-fade-in-up ${staggerClass} ${
                  !item.isAvailable ? 'opacity-70' : ''
                }`}
              >
                {/* Image placeholder */}
                <div className="h-36 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center relative">
                  <span className="text-5xl drop-shadow-sm">{emoji}</span>
                  {/* Food type indicator */}
                  <div className="absolute top-3 left-3">
                    <span
                      className={`${
                        item.foodType === 'veg'
                          ? 'food-veg'
                          : item.foodType === 'vegan'
                          ? 'food-vegan'
                          : 'food-nonveg'
                      }`}
                    />
                  </div>
                  {/* Popular badge */}
                  {item.isPopular && (
                    <div className="absolute top-3 right-3 gradient-primary text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-glow">
                      <Star className="w-3 h-3" />
                      Popular
                    </div>
                  )}
                  {/* Unavailable badge */}
                  {!item.isAvailable && (
                    <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex items-center justify-center">
                      <span className="status-cancelled px-3 py-1 text-xs font-bold">
                        Out of Stock
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-orange-600 font-medium">{catName}</span>
                    {item.spiceLevel && (
                      <div className="flex items-center gap-0.5">
                        <Flame
                          className={`w-3.5 h-3.5 ${
                            item.spiceLevel === 'mild'
                              ? 'text-green-500'
                              : item.spiceLevel === 'medium'
                              ? 'text-yellow-500'
                              : item.spiceLevel === 'hot'
                              ? 'text-orange-500'
                              : 'text-red-500'
                          }`}
                        />
                        <span className="text-[10px] text-gray-400 capitalize">
                          {item.spiceLevel}
                        </span>
                      </div>
                    )}
                  </div>
                  <h3 className="text-sm font-semibold text-gray-800 truncate">{item.name}</h3>
                  <p className="text-lg font-bold text-gradient mt-1">
                    {currency}
                    {item.price.toFixed(0)}
                  </p>

                  <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                    <Clock className="w-3 h-3" />
                    <span>{item.preparationTime} min</span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
                    {/* Toggle availability */}
                    <button
                      onClick={() => toggleAvailability(item)}
                      className={`flex-1 text-xs font-medium py-1.5 rounded-lg transition-all ${
                        item.isAvailable
                          ? 'status-accepted'
                          : 'status-cancelled'
                      }`}
                    >
                      {item.isAvailable ? 'Available' : 'Out of Stock'}
                    </button>
                    <button
                      onClick={() => openEditModal(item)}
                      className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <Edit2 className="w-4 h-4 text-gray-500" />
                    </button>
                    <button
                      onClick={() => setDeleteId(item.id)}
                      className="p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </button>
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
          <div className="card-premium rounded-2xl shadow-elevated w-full max-w-lg max-h-[90vh] overflow-y-auto animate-scale-in">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gradient">
                {editingId ? 'Edit Menu Item' : 'Add New Menu Item'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="input-premium w-full"
                  placeholder="e.g. Butter Chicken"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="input-premium w-full h-20 resize-none"
                  placeholder="Brief description of the dish"
                />
              </div>

              {/* Price + Category */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price ({currency})
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    className="input-premium w-full"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={form.categoryId}
                    onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
                    className="input-premium w-full"
                  >
                    <option value="">Select category</option>
                    {restaurantCategories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Food type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Food Type</label>
                <div className="flex gap-3">
                  {[
                    { v: 'veg' as FoodType, l: 'Veg', c: 'border-green-500 bg-green-50', dot: 'food-veg' },
                    { v: 'non-veg' as FoodType, l: 'Non-Veg', c: 'border-red-500 bg-red-50', dot: 'food-nonveg' },
                    { v: 'vegan' as FoodType, l: 'Vegan', c: 'border-green-600 bg-green-50', dot: 'food-vegan' },
                  ].map((ft) => (
                    <label
                      key={ft.v}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl border-2 cursor-pointer transition-all text-sm ${
                        form.foodType === ft.v
                          ? ft.c + ' font-medium shadow-sm'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="foodType"
                        value={ft.v}
                        checked={form.foodType === ft.v}
                        onChange={(e) => setForm({ ...form, foodType: e.target.value as FoodType })}
                        className="hidden"
                      />
                      <span className={ft.dot} />
                      {ft.l}
                    </label>
                  ))}
                </div>
              </div>

              {/* Spice level */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Spice Level</label>
                <div className="flex gap-2">
                  {spiceLevels.map((sp) => (
                    <button
                      type="button"
                      key={sp.value}
                      onClick={() => setForm({ ...form, spiceLevel: sp.value })}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-lg border text-sm transition-all ${
                        form.spiceLevel === sp.value
                          ? 'border-orange-400 bg-orange-50 text-orange-700 font-medium shadow-sm'
                          : 'border-gray-200 text-gray-500 hover:border-gray-300'
                      }`}
                    >
                      <Flame className={`w-3.5 h-3.5 ${sp.color}`} />
                      {sp.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Preparation time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preparation Time (minutes)
                </label>
                <input
                  type="number"
                  min="1"
                  value={form.preparationTime}
                  onChange={(e) => setForm({ ...form, preparationTime: e.target.value })}
                  className="input-premium w-full"
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={form.tags}
                  onChange={(e) => setForm({ ...form, tags: e.target.value })}
                  className="input-premium w-full"
                  placeholder="e.g. spicy, chef special, gluten-free"
                />
              </div>

              {/* Toggles */}
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <div
                    className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer ${
                      form.isPopular ? 'gradient-primary' : 'bg-gray-300'
                    }`}
                    onClick={() => setForm({ ...form, isPopular: !form.isPopular })}
                  >
                    <div
                      className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${
                        form.isPopular ? 'translate-x-5' : 'translate-x-0.5'
                      }`}
                    />
                  </div>
                  <span className="text-sm text-gray-600">Popular</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <div
                    className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer ${
                      form.isAvailable ? 'gradient-success' : 'bg-gray-300'
                    }`}
                    onClick={() => setForm({ ...form, isAvailable: !form.isAvailable })}
                  >
                    <div
                      className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${
                        form.isAvailable ? 'translate-x-5' : 'translate-x-0.5'
                      }`}
                    />
                  </div>
                  <span className="text-sm text-gray-600">Available</span>
                </label>
              </div>

              {/* Buttons */}
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
                  {editingId ? 'Save Changes' : 'Add Item'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="card-premium rounded-2xl shadow-elevated w-full max-w-sm p-6 text-center animate-scale-in">
            <div className="w-14 h-14 bg-gradient-to-br from-red-400 to-red-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
              <Trash2 className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mt-4">Delete Item?</h3>
            <p className="text-sm text-gray-500 mt-2">
              This action cannot be undone. The menu item will be permanently removed.
            </p>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setDeleteId(null)}
                className="btn-outline flex-1 py-2.5"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm font-medium transition-colors shadow-md"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
