"use client";

import { use, useState, useMemo, useEffect } from "react";
import { useApp } from "@/lib/store";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Search,
  ShoppingCart,
  Plus,
  Minus,
  Star,
  ArrowLeft,
  X,
  Leaf,
  Clock,
  MapPin,
  Phone,
  ChevronDown,
  ChevronRight,
  SearchX,
  Flame,
  Utensils,
} from "lucide-react";
import type { MenuItem, FoodType, SpiceLevel } from "@/lib/types";

// ---------------------------------------------------------------------------
// Food Type Indicator
// ---------------------------------------------------------------------------

function FoodTypeIndicator({ type }: { type: FoodType }) {
  const config = {
    veg: { color: "bg-green-500", label: "Veg" },
    "non-veg": { color: "bg-red-500", label: "Non-Veg" },
    vegan: { color: "bg-emerald-500", label: "Vegan" },
  };
  const { color, label } = config[type];
  return (
    <div className="flex items-center gap-1.5">
      <div className={`w-3 h-3 rounded-full ${color}`} />
      <span className="text-xs text-slate-500">{label}</span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Spice Level Indicator
// ---------------------------------------------------------------------------

function SpiceLevelIndicator({ level }: { level?: SpiceLevel }) {
  if (!level) return null;
  
  const levels = {
    mild: { count: 1, label: "Mild" },
    medium: { count: 2, label: "Medium" },
    hot: { count: 3, label: "Hot" },
    "extra-hot": { count: 4, label: "Extra Hot" },
  };
  const { count, label } = levels[level];
  
  return (
    <div className="flex items-center gap-1" title={label}>
      {Array.from({ length: count }).map((_, i) => (
        <Flame key={i} className="w-3 h-3 text-orange-500 fill-orange-500" />
      ))}
      {Array.from({ length: 4 - count }).map((_, i) => (
        <Flame key={`empty-${i}`} className="w-3 h-3 text-slate-200" />
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Menu Item Card
// ---------------------------------------------------------------------------

function MenuItemCard({ item, quantity, onAdd, onIncrement, onDecrement }: any) {
  const getItemEmoji = (name: string) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes("chicken")) return "🍗";
    if (lowerName.includes("paneer")) return "🧀";
    if (lowerName.includes("biryani")) return "🍚";
    if (lowerName.includes("naan")) return "🫓";
    if (lowerName.includes("curry")) return "🍛";
    if (lowerName.includes("pizza")) return "🍕";
    if (lowerName.includes("pasta")) return "🍝";
    if (lowerName.includes("rice")) return "🍚";
    if (lowerName.includes("salad")) return "🥗";
    if (lowerName.includes("soup")) return "🍜";
    return "🍽️";
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-all">
      <div className="flex p-3 gap-3">
        {/* Image Placeholder */}
        <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center relative shrink-0">
          <span className="text-3xl">{getItemEmoji(item.name)}</span>
          {item.isPopular && (
            <div className="absolute -top-1 -left-1">
              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-orange-500 text-white text-[10px] font-bold rounded-full">
                <Star className="w-2.5 h-2.5 fill-white" />
                Popular
              </span>
            </div>
          )}
          {!item.isAvailable && (
            <div className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center">
              <span className="text-[10px] font-bold text-white bg-red-500 px-2 py-0.5 rounded-full">
                Sold Out
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <FoodTypeIndicator type={item.foodType} />
                {item.foodType === "vegan" && (
                  <Leaf className="w-3 h-3 text-emerald-500" />
                )}
              </div>
              <h3 className="font-semibold text-slate-800">{item.name}</h3>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                {item.description}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <SpiceLevelIndicator level={item.spiceLevel} />
                {item.preparationTime > 0 && (
                  <span className="flex items-center gap-1 text-xs text-slate-400">
                    <Clock className="w-3 h-3" />
                    {item.preparationTime} min
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Price and Actions */}
          <div className="flex items-center justify-between mt-3">
            <span className="text-lg font-bold text-orange-600">₹{item.price}</span>
            
            {item.isAvailable ? (
              quantity > 0 ? (
                <div className="flex items-center gap-1 bg-orange-500 rounded-full shadow-sm">
                  <button
                    onClick={onDecrement}
                    className="w-7 h-7 flex items-center justify-center text-white hover:bg-orange-600 rounded-l-full transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-6 text-center text-white font-semibold text-sm">
                    {quantity}
                  </span>
                  <button
                    onClick={onIncrement}
                    className="w-7 h-7 flex items-center justify-center text-white hover:bg-orange-600 rounded-r-full transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={onAdd}
                  className="flex items-center gap-1 px-3 py-1.5 border border-orange-500 text-orange-500 text-sm font-medium rounded-full hover:bg-orange-500 hover:text-white transition-all"
                >
                  <Plus className="w-3.5 h-3.5" /> Add
                </button>
              )
            ) : (
              <span className="text-xs text-slate-400 bg-slate-100 px-3 py-1.5 rounded-full">
                Unavailable
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Menu Page
// ---------------------------------------------------------------------------

export default function MenuPage({ params }: { params: Promise<{ restaurantId: string }> }) {
  const { restaurantId } = use(params);
  const searchParams = useSearchParams();
  const router = useRouter();
  const tableFromUrl = searchParams.get("table");

  const {
    restaurants,
    menuItems,
    categories,
    cart,
    addToCart,
    updateCartQuantity,
    setCurrentRestaurant,
    getCartTotal,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showInfo, setShowInfo] = useState(false);

  // Set current restaurant
  useEffect(() => {
    setCurrentRestaurant(restaurantId);
  }, [restaurantId, setCurrentRestaurant]);

  // Get restaurant data
  const restaurant = useMemo(
    () => restaurants.find(r => r.id === restaurantId),
    [restaurants, restaurantId]
  );

  // Get categories for this restaurant
  const restaurantCategories = useMemo(
    () => categories
      .filter(c => c.restaurantId === restaurantId && c.isActive)
      .sort((a, b) => a.sortOrder - b.sortOrder),
    [categories, restaurantId]
  );

  // Filter menu items
  const filteredItems = useMemo(() => {
    let items = menuItems.filter(item => item.restaurantId === restaurantId);
    
    if (selectedCategory !== "all") {
      items = items.filter(item => item.categoryId === selectedCategory);
    }
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      items = items.filter(item =>
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    return items.sort((a, b) => {
      if (a.isAvailable !== b.isAvailable) return a.isAvailable ? -1 : 1;
      if (a.isPopular !== b.isPopular) return a.isPopular ? -1 : 1;
      return 0;
    });
  }, [menuItems, restaurantId, selectedCategory, searchQuery]);

  // Cart helpers
  const getQuantity = (itemId: string) => {
    const cartItem = cart.find(ci => ci.menuItem.id === itemId);
    return cartItem?.quantity || 0;
  };

  const cartItemCount = cart.reduce((sum, ci) => sum + ci.quantity, 0);
  const cartTotal = getCartTotal();

  // Handle not found
  if (!restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center p-6">
          <Utensils className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h1 className="text-xl font-bold text-slate-800 mb-2">Restaurant Not Found</h1>
          <p className="text-slate-500 mb-6">The restaurant you're looking for doesn't exist.</p>
          <button
            onClick={() => router.push("/scan")}
            className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            Back to Scan
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-28">
      {/* Header Banner */}
      <div className="relative">
        <div
          className="h-48 relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${restaurant.settings.theme.primaryColor}, ${restaurant.settings.theme.accentColor})`,
          }}
        >
          {/* Back Button */}
          <button
            onClick={() => router.push("/scan")}
            className="absolute top-4 left-4 w-10 h-10 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/30 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          {/* Table Badge */}
          {tableFromUrl && (
            <div className="absolute top-4 right-4 px-3 py-1.5 bg-black/20 backdrop-blur-sm rounded-full">
              <span className="text-white text-sm font-medium">Table {tableFromUrl}</span>
            </div>
          )}

          {/* Restaurant Info */}
          <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/60 to-transparent">
            <div className="flex items-end justify-between">
              <div>
                <h1 className="text-2xl font-bold text-white mb-1">{restaurant.name}</h1>
                <div className="flex flex-wrap gap-1">
                  {restaurant.cuisine.slice(0, 3).map(c => (
                    <span key={c} className="text-xs text-white/90 bg-white/20 px-2 py-0.5 rounded-full">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
              <button
                onClick={() => setShowInfo(!showInfo)}
                className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center"
              >
                <ChevronDown className={`w-4 h-4 text-white transition-transform ${showInfo ? "rotate-180" : ""}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Expandable Info */}
        {showInfo && (
          <div className="bg-white rounded-xl shadow-sm mx-4 mt-3 p-4">
            <p className="text-sm text-slate-600 mb-3">{restaurant.description}</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <MapPin className="w-4 h-4 text-orange-500" />
                <span>{restaurant.address}, {restaurant.city}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Phone className="w-4 h-4 text-orange-500" />
                <span>{restaurant.phone}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Search Bar */}
      <div className="sticky top-0 z-20 bg-slate-50 px-4 pt-3 pb-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search dishes..."
            className="w-full pl-9 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-orange-400 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <X className="w-4 h-4 text-slate-400 hover:text-slate-600" />
            </button>
          )}
        </div>
      </div>

      {/* Categories */}
      <div className="px-4 mt-2 mb-4">
        <div className="flex gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              selectedCategory === "all"
                ? "bg-orange-500 text-white"
                : "bg-white text-slate-600 border border-slate-200 hover:border-orange-300"
            }`}
          >
            All
          </button>
          {restaurantCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat.id
                  ? "bg-orange-500 text-white"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-orange-300"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Items */}
      <div className="px-4 space-y-3">
        {filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <SearchX className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="font-medium text-slate-700 mb-1">No items found</h3>
            <p className="text-sm text-slate-500">
              {searchQuery ? `No results for "${searchQuery}"` : "No items in this category"}
            </p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="mt-4 text-sm text-orange-500 hover:text-orange-600"
              >
                Clear search
              </button>
            )}
          </div>
        ) : (
          filteredItems.map(item => (
            <MenuItemCard
              key={item.id}
              item={item}
              quantity={getQuantity(item.id)}
              onAdd={() => addToCart(item, 1)}
              onIncrement={() => updateCartQuantity(item.id, getQuantity(item.id) + 1)}
              onDecrement={() => updateCartQuantity(item.id, getQuantity(item.id) - 1)}
            />
          ))
        )}
      </div>

      {/* Cart Bar */}
      {cartItemCount > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-200 shadow-lg">
          <button
            onClick={() => router.push(`/menu/${restaurantId}/cart${tableFromUrl ? `?table=${tableFromUrl}` : ""}`)}
            className="w-full bg-orange-500 text-white rounded-xl py-3 px-4 flex items-center justify-between hover:bg-orange-600 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-white text-orange-500 text-xs font-bold rounded-full flex items-center justify-center">
                  {cartItemCount}
                </span>
              </div>
              <span className="font-medium">View Cart</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg">₹{cartTotal.subtotal}</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </button>
        </div>
      )}
    </div>
  );
}