// Types for Tap2Menu - Multi-tenant Restaurant QR Ordering SaaS

export type UserRole = 'superadmin' | 'restaurant_admin' | 'waiter' | 'kitchen' | 'customer';

export type OrderStatus = 'new' | 'accepted' | 'preparing' | 'ready' | 'served' | 'completed' | 'cancelled';

export type PlanType = 'starter' | 'professional' | 'enterprise';

export type FoodType = 'veg' | 'non-veg' | 'vegan';

export type SpiceLevel = 'mild' | 'medium' | 'hot' | 'extra-hot';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  avatar?: string;
  restaurantId?: string;
  branchId?: string;
  phone?: string;
  isActive: boolean;
  createdAt: string;
}

export interface Restaurant {
  id: string;
  name: string;
  slug: string;
  logo: string;
  coverImage: string;
  description: string;
  cuisine: string[];
  address: string;
  city: string;
  phone: string;
  email: string;
  website?: string;
  planId: string;
  isActive: boolean;
  createdAt: string;
  ownerId: string;
  settings: RestaurantSettings;
}

export interface RestaurantSettings {
  currency: string;
  currencySymbol: string;
  taxRate: number;
  serviceCharge: number;
  theme: {
    primaryColor: string;
    accentColor: string;
  };
  orderAutoAccept: boolean;
  enableTips: boolean;
}

export interface Branch {
  id: string;
  restaurantId: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  isActive: boolean;
  floors: number;
  sections: string[];
}

export interface Table {
  id: string;
  restaurantId: string;
  branchId: string;
  number: number;
  capacity: number;
  floor: number;
  section: string;
  status: 'available' | 'occupied' | 'reserved' | 'maintenance';
  qrCode?: string;
  currentOrderId?: string;
}

export interface Category {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  image: string;
  sortOrder: number;
  isActive: boolean;
}

export interface MenuItem {
  id: string;
  restaurantId: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  image: string;
  foodType: FoodType;
  spiceLevel?: SpiceLevel;
  isAvailable: boolean;
  isPopular: boolean;
  preparationTime: number; // in minutes
  tags: string[];
  allergens?: string[];
  nutritionInfo?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  notes?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  restaurantId: string;
  branchId: string;
  tableId: string;
  tableNumber: number;
  customerId?: string;
  customerName?: string;
  items: OrderItem[];
  status: OrderStatus;
  subtotal: number;
  tax: number;
  serviceCharge: number;
  discount: number;
  total: number;
  notes?: string;
  waiterId?: string;
  createdAt: string;
  updatedAt: string;
  statusHistory: StatusHistoryEntry[];
  paymentStatus: 'pending' | 'paid' | 'refunded';
  paymentMethod?: 'cash' | 'card' | 'upi';
}

export interface OrderItem {
  id: string;
  menuItemId: string;
  menuItemName: string;
  quantity: number;
  price: number;
  total: number;
  notes?: string;
  foodType: FoodType;
}

export interface StatusHistoryEntry {
  status: OrderStatus;
  timestamp: string;
  updatedBy: string;
}

export interface Plan {
  id: string;
  name: string;
  type: PlanType;
  price: number;
  billingCycle: 'monthly' | 'yearly';
  features: string[];
  maxBranches: number;
  maxTables: number;
  maxMenuItems: number;
  maxStaff: number;
  isActive: boolean;
}

export interface Subscription {
  id: string;
  restaurantId: string;
  planId: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'expired' | 'cancelled' | 'trial';
  amount: number;
}

export interface Payment {
  id: string;
  orderId: string;
  restaurantId: string;
  amount: number;
  method: 'cash' | 'card' | 'upi';
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  transactionId?: string;
  createdAt: string;
}

export interface SupportTicket {
  id: string;
  restaurantId: string;
  restaurantName: string;
  subject: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdAt: string;
  updatedAt: string;
}

export interface DashboardStats {
  totalOrders: number;
  totalRevenue: number;
  activeOrders: number;
  avgOrderValue: number;
  todayOrders: number;
  todayRevenue: number;
  popularItems: { name: string; count: number }[];
  ordersByStatus: Record<OrderStatus, number>;
  revenueByDay: { date: string; revenue: number }[];
}

export interface Coupon {
  id: string;
  restaurantId: string;
  code: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderValue: number;
  maxDiscount?: number;
  validFrom: string;
  validTo: string;
  isActive: boolean;
  usageCount: number;
  maxUsage: number;
}

export interface TaxConfig {
  id: string;
  restaurantId: string;
  name: string;
  rate: number;
  isActive: boolean;
}
