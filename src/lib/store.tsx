'use client';

import React, { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type {
  User,
  Restaurant,
  Branch,
  Table,
  Category,
  MenuItem,
  CartItem,
  Order,
  OrderStatus,
  OrderItem,
  Plan,
  Subscription,
  Payment,
  SupportTicket,
  Coupon,
} from './types';
import {
  users as dummyUsers,
  restaurants as dummyRestaurants,
  branches as dummyBranches,
  tables as dummyTables,
  categories as dummyCategories,
  menuItems as dummyMenuItems,
  orders as dummyOrders,
  plans as dummyPlans,
  subscriptions as dummySubscriptions,
  payments as dummyPayments,
  supportTickets as dummyTickets,
  coupons as dummyCoupons,
} from './dummy-data';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
}

// ---------------------------------------------------------------------------
// Context value type
// ---------------------------------------------------------------------------

interface CartTotal {
  subtotal: number;
  tax: number;
  serviceCharge: number;
  total: number;
}

interface AppContextValue {
  // State
  currentUser: User | null;
  currentRestaurant: Restaurant | null;
  cart: CartItem[];
  orders: Order[];
  restaurants: Restaurant[];
  menuItems: MenuItem[];
  categories: Category[];
  tables: Table[];
  branches: Branch[];
  users: User[];
  plans: Plan[];
  subscriptions: Subscription[];
  coupons: Coupon[];
  tickets: SupportTicket[];
  payments: Payment[];

  // Auth
  login: (email: string, password: string) => boolean;
  logout: () => void;

  // Restaurant
  setCurrentRestaurant: (restaurantId: string) => void;
  toggleRestaurantStatus: (restaurantId: string) => void;
  addRestaurant: (restaurant: Omit<Restaurant, 'id'>) => void;

  // Cart
  addToCart: (menuItem: MenuItem, quantity: number, notes?: string) => void;
  removeFromCart: (menuItemId: string) => void;
  updateCartQuantity: (menuItemId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => CartTotal;

  // Orders
  placeOrder: (tableId: string, customerName: string) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;

  // Menu items
  addMenuItem: (item: Omit<MenuItem, 'id'>) => void;
  updateMenuItem: (id: string, updates: Partial<MenuItem>) => void;
  deleteMenuItem: (id: string) => void;

  // Tables
  addTable: (table: Omit<Table, 'id'>) => void;
  updateTable: (id: string, updates: Partial<Table>) => void;

  // Categories
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (id: string, updates: Partial<Category>) => void;

  // Staff / Users
  addStaffUser: (user: Omit<User, 'id'>) => void;
  updateStaffUser: (id: string, updates: Partial<User>) => void;

  // Coupons
  updateCoupon: (id: string, updates: Partial<Coupon>) => void;

  // Support tickets
  updateTicketStatus: (id: string, status: SupportTicket['status']) => void;
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

const AppContext = createContext<AppContextValue | undefined>(undefined);

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

export function AppProvider({ children }: { children: ReactNode }) {
  // ---- state ----
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentRestaurant, setCurrentRestaurantState] = useState<Restaurant | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>(dummyOrders);
  const [restaurants, setRestaurants] = useState<Restaurant[]>(dummyRestaurants);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(dummyMenuItems);
  const [categories, setCategories] = useState<Category[]>(dummyCategories);
  const [tables, setTables] = useState<Table[]>(dummyTables);
  const [branches] = useState<Branch[]>(dummyBranches);
  const [users, setUsers] = useState<User[]>(dummyUsers);
  const [plans] = useState<Plan[]>(dummyPlans);
  const [subscriptions] = useState<Subscription[]>(dummySubscriptions);
  const [coupons, setCoupons] = useState<Coupon[]>(dummyCoupons);
  const [tickets, setTickets] = useState<SupportTicket[]>(dummyTickets);
  const [payments] = useState<Payment[]>(dummyPayments);

  // ---- Auth ----

  const login = useCallback(
    (email: string, password: string): boolean => {
      const user = users.find(
        (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password && u.isActive,
      );
      if (user) {
        setCurrentUser(user);
        // If the user belongs to a restaurant, set it automatically
        if (user.restaurantId) {
          const restaurant = restaurants.find((r) => r.id === user.restaurantId) ?? null;
          setCurrentRestaurantState(restaurant);
        }
        return true;
      }
      return false;
    },
    [users, restaurants],
  );

  const logout = useCallback(() => {
    setCurrentUser(null);
    setCurrentRestaurantState(null);
    setCart([]);
  }, []);

  // ---- Restaurant ----

  const setCurrentRestaurant = useCallback(
    (restaurantId: string) => {
      const restaurant = restaurants.find((r) => r.id === restaurantId) ?? null;
      setCurrentRestaurantState(restaurant);
    },
    [restaurants],
  );

  const toggleRestaurantStatus = useCallback((restaurantId: string) => {
    setRestaurants((prev) =>
      prev.map((r) => (r.id === restaurantId ? { ...r, isActive: !r.isActive } : r)),
    );
  }, []);

  const addRestaurant = useCallback((restaurant: Omit<Restaurant, 'id'>) => {
    const newRestaurant: Restaurant = { ...restaurant, id: generateId() };
    setRestaurants((prev) => [...prev, newRestaurant]);
  }, []);

  // ---- Cart ----

  const addToCart = useCallback((menuItem: MenuItem, quantity: number, notes?: string) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((ci) => ci.menuItem.id === menuItem.id);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
          notes: notes ?? updated[existingIndex].notes,
        };
        return updated;
      }
      return [...prev, { menuItem, quantity, notes }];
    });
  }, []);

  const removeFromCart = useCallback((menuItemId: string) => {
    setCart((prev) => prev.filter((ci) => ci.menuItem.id !== menuItemId));
  }, []);

  const updateCartQuantity = useCallback((menuItemId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart((prev) => prev.filter((ci) => ci.menuItem.id !== menuItemId));
      return;
    }
    setCart((prev) =>
      prev.map((ci) => (ci.menuItem.id === menuItemId ? { ...ci, quantity } : ci)),
    );
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const getCartTotal = useCallback((): CartTotal => {
    const subtotal = cart.reduce((sum, ci) => sum + ci.menuItem.price * ci.quantity, 0);

    const taxRate = currentRestaurant?.settings.taxRate ?? 5;
    const serviceChargeRate = currentRestaurant?.settings.serviceCharge ?? 0;

    const tax = parseFloat(((subtotal * taxRate) / 100).toFixed(2));
    const serviceCharge = parseFloat(((subtotal * serviceChargeRate) / 100).toFixed(2));
    const total = parseFloat((subtotal + tax + serviceCharge).toFixed(2));

    return { subtotal, tax, serviceCharge, total };
  }, [cart, currentRestaurant]);

  // ---- Orders ----

  const placeOrder = useCallback(
    (tableId: string, customerName: string): Order => {
      const table = tables.find((t) => t.id === tableId);
      const restaurantId = currentRestaurant?.id ?? '';
      const branchId = table?.branchId ?? '';
      const tableNumber = table?.number ?? 0;
      const now = new Date().toISOString();
      const { subtotal, tax, serviceCharge, total } = getCartTotal();

      const orderItems: OrderItem[] = cart.map((ci) => ({
        id: generateId(),
        menuItemId: ci.menuItem.id,
        menuItemName: ci.menuItem.name,
        quantity: ci.quantity,
        price: ci.menuItem.price,
        total: ci.menuItem.price * ci.quantity,
        notes: ci.notes,
        foodType: ci.menuItem.foodType,
      }));

      const orderNumber = `ORD-${Date.now().toString(36).toUpperCase()}`;

      const newOrder: Order = {
        id: generateId(),
        orderNumber,
        restaurantId,
        branchId,
        tableId,
        tableNumber,
        customerName,
        items: orderItems,
        status: 'new',
        subtotal,
        tax,
        serviceCharge,
        discount: 0,
        total,
        createdAt: now,
        updatedAt: now,
        statusHistory: [{ status: 'new', timestamp: now, updatedBy: 'system' }],
        paymentStatus: 'pending',
      };

      setOrders((prev) => [...prev, newOrder]);
      setCart([]);

      return newOrder;
    },
    [cart, currentRestaurant, tables, getCartTotal],
  );

  const updateOrderStatus = useCallback(
    (orderId: string, status: OrderStatus) => {
      const now = new Date().toISOString();
      const updatedBy = currentUser?.id ?? 'system';

      setOrders((prev) =>
        prev.map((order) => {
          if (order.id !== orderId) return order;
          return {
            ...order,
            status,
            updatedAt: now,
            statusHistory: [
              ...order.statusHistory,
              { status, timestamp: now, updatedBy },
            ],
          };
        }),
      );
    },
    [currentUser],
  );

  // ---- Menu items ----

  const addMenuItem = useCallback((item: Omit<MenuItem, 'id'>) => {
    const newItem: MenuItem = { ...item, id: generateId() };
    setMenuItems((prev) => [...prev, newItem]);
  }, []);

  const updateMenuItem = useCallback((id: string, updates: Partial<MenuItem>) => {
    setMenuItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item)),
    );
  }, []);

  const deleteMenuItem = useCallback((id: string) => {
    setMenuItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  // ---- Tables ----

  const addTable = useCallback((table: Omit<Table, 'id'>) => {
    const newTable: Table = { ...table, id: generateId() };
    setTables((prev) => [...prev, newTable]);
  }, []);

  const updateTable = useCallback((id: string, updates: Partial<Table>) => {
    setTables((prev) =>
      prev.map((table) => (table.id === id ? { ...table, ...updates } : table)),
    );
  }, []);

  // ---- Categories ----

  const addCategory = useCallback((category: Omit<Category, 'id'>) => {
    const newCategory: Category = { ...category, id: generateId() };
    setCategories((prev) => [...prev, newCategory]);
  }, []);

  const updateCategory = useCallback((id: string, updates: Partial<Category>) => {
    setCategories((prev) =>
      prev.map((cat) => (cat.id === id ? { ...cat, ...updates } : cat)),
    );
  }, []);

  // ---- Staff / Users ----

  const addStaffUser = useCallback((user: Omit<User, 'id'>) => {
    const newUser: User = { ...user, id: generateId() };
    setUsers((prev) => [...prev, newUser]);
  }, []);

  const updateStaffUser = useCallback((id: string, updates: Partial<User>) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === id ? { ...user, ...updates } : user)),
    );
  }, []);

  // ---- Coupons ----

  const updateCoupon = useCallback((id: string, updates: Partial<Coupon>) => {
    setCoupons((prev) =>
      prev.map((coupon) => (coupon.id === id ? { ...coupon, ...updates } : coupon)),
    );
  }, []);

  // ---- Support tickets ----

  const updateTicketStatus = useCallback((id: string, status: SupportTicket['status']) => {
    const now = new Date().toISOString();
    setTickets((prev) =>
      prev.map((ticket) =>
        ticket.id === id ? { ...ticket, status, updatedAt: now } : ticket,
      ),
    );
  }, []);

  // ---- Context value ----

  const value: AppContextValue = {
    // State
    currentUser,
    currentRestaurant,
    cart,
    orders,
    restaurants,
    menuItems,
    categories,
    tables,
    branches,
    users,
    plans,
    subscriptions,
    coupons,
    tickets,
    payments,

    // Auth
    login,
    logout,

    // Restaurant
    setCurrentRestaurant,
    toggleRestaurantStatus,
    addRestaurant,

    // Cart
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    getCartTotal,

    // Orders
    placeOrder,
    updateOrderStatus,

    // Menu items
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,

    // Tables
    addTable,
    updateTable,

    // Categories
    addCategory,
    updateCategory,

    // Staff / Users
    addStaffUser,
    updateStaffUser,

    // Coupons
    updateCoupon,

    // Support tickets
    updateTicketStatus,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useApp(): AppContextValue {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
