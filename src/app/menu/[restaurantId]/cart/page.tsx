"use client";

import { use, useState, useMemo, useEffect } from "react";
import { useApp } from "@/lib/store";
import { useSearchParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  User,
  Hash,
  FileText,
  ChevronRight,
  AlertCircle,
  ArrowRight,
  Receipt,
  CreditCard,
  Utensils,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Food Type Dot
// ---------------------------------------------------------------------------

function FoodDot({ type }: { type: "veg" | "non-veg" | "vegan" }) {
  const colors = {
    veg: "bg-green-500",
    "non-veg": "bg-red-500",
    vegan: "bg-emerald-500",
  };
  return <div className={`w-3 h-3 rounded-full ${colors[type]}`} />;
}

// ---------------------------------------------------------------------------
// Cart Item Component
// ---------------------------------------------------------------------------

function CartItem({
  item,
  quantity,
  notes,
  onUpdateQuantity,
  onRemove,
  onNotesChange,
}: any) {
  const [showNotes, setShowNotes] = useState(false);
  const [itemNotes, setItemNotes] = useState(notes || "");

  const handleNotesChange = (value: string) => {
    setItemNotes(value);
    onNotesChange(value);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4">
      <div className="flex gap-3">
        <FoodDot type={item.foodType} />
        <div className="flex-1">
          <div className="flex justify-between">
            <div>
              <h3 className="font-semibold text-slate-800">{item.name}</h3>
              <p className="text-xs text-slate-500 mt-0.5">₹{item.price} each</p>
            </div>
            <span className="font-bold text-orange-600">
              ₹{item.price * quantity}
            </span>
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
            <button
              onClick={onRemove}
              className="flex items-center gap-1 text-xs text-red-500 hover:text-red-600 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Remove
            </button>
            <div className="flex items-center gap-1 bg-orange-50 rounded-full border border-orange-200">
              <button
                onClick={() => onUpdateQuantity(quantity - 1)}
                className="w-8 h-8 flex items-center justify-center text-orange-500 hover:bg-orange-100 rounded-l-full transition-colors"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-8 text-center font-semibold text-orange-600">
                {quantity}
              </span>
              <button
                onClick={() => onUpdateQuantity(quantity + 1)}
                className="w-8 h-8 flex items-center justify-center text-orange-500 hover:bg-orange-100 rounded-r-full transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Special Instructions */}
          <div className="mt-3">
            <button
              onClick={() => setShowNotes(!showNotes)}
              className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-600 transition-colors"
            >
              <FileText className="w-3 h-3" />
              {showNotes ? "Hide instructions" : "Add special instructions"}
            </button>
            {showNotes && (
              <textarea
                value={itemNotes}
                onChange={(e) => handleNotesChange(e.target.value)}
                placeholder="e.g., Less spicy, no onions, extra cheese..."
                rows={2}
                className="w-full mt-2 px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-orange-400 resize-none"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Empty Cart State
// ---------------------------------------------------------------------------

function EmptyCart({ onBrowse }: { onBrowse: () => void }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="sticky top-0 bg-white border-b border-slate-100 px-4 py-3">
        <div className="flex items-center gap-3">
          <button onClick={onBrowse} className="p-2 hover:bg-slate-100 rounded-full">
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </button>
          <h1 className="font-semibold text-slate-800">Your Cart</h1>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
        <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag className="w-12 h-12 text-orange-400" />
        </div>
        <h2 className="text-xl font-bold text-slate-800 mb-2">Your cart is empty</h2>
        <p className="text-sm text-slate-500 text-center mb-6">
          Looks like you haven't added any items yet.<br />
          Browse the menu to get started!
        </p>
        <button
          onClick={onBrowse}
          className="px-6 py-2.5 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors"
        >
          Browse Menu
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Cart Page
// ---------------------------------------------------------------------------

export default function CartPage({ params }: { params: Promise<{ restaurantId: string }> }) {
  const { restaurantId } = use(params);
  const searchParams = useSearchParams();
  const router = useRouter();
  const tableFromUrl = searchParams.get("table");

  const {
    restaurants,
    cart,
    tables,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    getCartTotal,
    placeOrder,
    setCurrentRestaurant,
  } = useApp();

  const [customerName, setCustomerName] = useState("");
  const [selectedTable, setSelectedTable] = useState(tableFromUrl || "");
  const [itemNotes, setItemNotes] = useState<Record<string, string>>({});
  const [isPlacing, setIsPlacing] = useState(false);
  const [error, setError] = useState("");

  // Set current restaurant
  useEffect(() => {
    setCurrentRestaurant(restaurantId);
  }, [restaurantId, setCurrentRestaurant]);

  const restaurant = useMemo(
    () => restaurants.find(r => r.id === restaurantId),
    [restaurants, restaurantId]
  );

  // Available tables
  const availableTables = useMemo(
    () => tables.filter(t => t.restaurantId === restaurantId && t.status !== "maintenance"),
    [tables, restaurantId]
  );

  const cartTotal = getCartTotal();
  const cartItemCount = cart.reduce((sum, ci) => sum + ci.quantity, 0);

  const handlePlaceOrder = () => {
    setError("");
    
    if (!customerName.trim()) {
      setError("Please enter your name");
      return;
    }
    if (!selectedTable) {
      setError("Please select a table");
      return;
    }
    if (cart.length === 0) {
      setError("Your cart is empty");
      return;
    }

    setIsPlacing(true);
    
    setTimeout(() => {
      const order = placeOrder(selectedTable, customerName.trim());
      setIsPlacing(false);
      router.push(`/menu/${restaurantId}/order/${order.id}`);
    }, 800);
  };

  const handleUpdateNotes = (itemId: string, notes: string) => {
    setItemNotes(prev => ({ ...prev, [itemId]: notes }));
  };

  const menuUrl = `/menu/${restaurantId}${tableFromUrl ? `?table=${tableFromUrl}` : ""}`;

  // Empty cart
  if (cart.length === 0) {
    return <EmptyCart onBrowse={() => router.push(menuUrl)} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-32">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-slate-100 z-20">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push(menuUrl)}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-slate-600" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-semibold text-slate-800">Your Cart</h1>
                <span className="bg-orange-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartItemCount}
                </span>
              </div>
              <p className="text-xs text-slate-500">{restaurant?.name}</p>
            </div>
          </div>
          <button
            onClick={clearCart}
            className="text-xs text-red-500 hover:text-red-600 font-medium"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Cart Items */}
      <div className="px-4 mt-4 space-y-3">
        {cart.map(cartItem => (
          <CartItem
            key={cartItem.menuItem.id}
            item={cartItem.menuItem}
            quantity={cartItem.quantity}
            notes={cartItem.notes || itemNotes[cartItem.menuItem.id]}
            onUpdateQuantity={(qty: number) =>
              updateCartQuantity(cartItem.menuItem.id, qty)
            }
            onRemove={() => removeFromCart(cartItem.menuItem.id)}
            onNotesChange={(notes: string) =>
              handleUpdateNotes(cartItem.menuItem.id, notes)
            }
          />
        ))}
      </div>

      {/* Add More Button */}
      <div className="px-4 mt-4">
        <button
          onClick={() => router.push(menuUrl)}
          className="w-full py-3 border-2 border-dashed border-orange-200 rounded-xl text-orange-500 font-medium hover:border-orange-400 hover:bg-orange-50 transition-colors"
        >
          + Add More Items
        </button>
      </div>

      {/* Order Details */}
      <div className="px-4 mt-6">
        <h2 className="font-semibold text-slate-800 mb-3">Order Details</h2>
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 space-y-4">
          {/* Name */}
          <div>
            <label className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <User className="w-3.5 h-3.5" />
              Your Name
            </label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => {
                setCustomerName(e.target.value);
                setError("");
              }}
              placeholder="Enter your name"
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-orange-400"
            />
          </div>

          {/* Table */}
          <div>
            <label className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <Hash className="w-3.5 h-3.5" />
              Table Number
            </label>
            <select
              value={selectedTable}
              onChange={(e) => {
                setSelectedTable(e.target.value);
                setError("");
              }}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-orange-400"
            >
              <option value="">Select a table</option>
              {availableTables.map(table => (
                <option key={table.id} value={table.id}>
                  Table {table.number} - {table.section} ({table.capacity} seats)
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Bill Summary */}
      <div className="px-4 mt-6">
        <h2 className="font-semibold text-slate-800 mb-3">Bill Summary</h2>
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">
                Subtotal ({cartItemCount} {cartItemCount === 1 ? "item" : "items"})
              </span>
              <span className="font-medium text-slate-700">₹{cartTotal.subtotal}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">GST ({restaurant?.settings.taxRate || 5}%)</span>
              <span className="font-medium text-slate-700">₹{cartTotal.tax}</span>
            </div>
            {cartTotal.serviceCharge > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Service Charge</span>
                <span className="font-medium text-slate-700">₹{cartTotal.serviceCharge}</span>
              </div>
            )}
            <div className="border-t border-slate-100 pt-2 mt-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-800">Total</span>
                <span className="text-xl font-bold text-orange-600">
                  ₹{cartTotal.total}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="px-4 mt-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
            <span className="text-sm text-red-600">{error}</span>
          </div>
        </div>
      )}

      {/* Place Order Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 shadow-lg">
        <button
          onClick={handlePlaceOrder}
          disabled={isPlacing}
          className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPlacing ? (
            <>
              <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Placing Order...
            </>
          ) : (
            <>
              Place Order • ₹{cartTotal.total}
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}