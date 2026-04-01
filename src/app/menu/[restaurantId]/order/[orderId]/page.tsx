"use client";

import { use, useMemo, useState, useEffect } from "react";
import { useApp } from "@/lib/store";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  ChefHat,
  Bell,
  UtensilsCrossed,
  Receipt,
  Phone,
  PartyPopper,
  Copy,
  Check,
  XCircle,
  User,
  Timer,
  CreditCard,
  Circle,
  CircleCheck,
  CircleDot,
} from "lucide-react";
import type { OrderStatus } from "@/lib/types";

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
// Status Step Component
// ---------------------------------------------------------------------------

function StatusStep({
  step,
  isCompleted,
  isCurrent,
  isPending,
  index,
}: {
  step: any;
  isCompleted: boolean;
  isCurrent: boolean;
  isPending: boolean;
  index: number;
}) {
  return (
    <div className="flex gap-3">
      {/* Icon Circle */}
      <div className="flex flex-col items-center">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
            isCompleted
              ? "bg-green-500 text-white"
              : isCurrent
              ? "bg-orange-500 text-white ring-4 ring-orange-100"
              : "bg-slate-100 text-slate-300"
          }`}
        >
          {isCompleted ? (
            <CheckCircle2 className="w-5 h-5" />
          ) : (
            step.icon
          )}
        </div>
        {index < 5 && (
          <div
            className={`w-0.5 h-12 mt-1 ${
              isCompleted ? "bg-green-500" : "bg-slate-200"
            }`}
          />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 pb-8">
        <h4
          className={`font-semibold text-sm ${
            isCompleted
              ? "text-green-600"
              : isCurrent
              ? "text-orange-600"
              : "text-slate-400"
          }`}
        >
          {step.label}
        </h4>
        <p
          className={`text-xs mt-1 ${
            isPending ? "text-slate-400" : "text-slate-500"
          }`}
        >
          {step.description}
        </p>
        {isCurrent && step.estimatedMinutes > 0 && (
          <div className="flex items-center gap-1 mt-2">
            <Timer className="w-3 h-3 text-orange-500" />
            <span className="text-xs text-orange-500 font-medium">
              ~{step.estimatedMinutes} min
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Status Stepper
// ---------------------------------------------------------------------------

function StatusStepper({ currentStatus }: { currentStatus: OrderStatus }) {
  const steps = [
    {
      status: "new",
      label: "Order Placed",
      icon: <CircleDot className="w-5 h-5" />,
      description: "Your order has been placed",
      estimatedMinutes: 0,
    },
    {
      status: "accepted",
      label: "Accepted",
      icon: <CheckCircle2 className="w-5 h-5" />,
      description: "Restaurant has accepted your order",
      estimatedMinutes: 2,
    },
    {
      status: "preparing",
      label: "Preparing",
      icon: <ChefHat className="w-5 h-5" />,
      description: "Chef is preparing your food",
      estimatedMinutes: 15,
    },
    {
      status: "ready",
      label: "Ready",
      icon: <Bell className="w-5 h-5" />,
      description: "Your order is ready to be served",
      estimatedMinutes: 20,
    },
    {
      status: "served",
      label: "Served",
      icon: <UtensilsCrossed className="w-5 h-5" />,
      description: "Your order has been served",
      estimatedMinutes: 25,
    },
    {
      status: "completed",
      label: "Completed",
      icon: <PartyPopper className="w-5 h-5" />,
      description: "Order completed. Thank you!",
      estimatedMinutes: 0,
    },
  ];

  const currentIndex = steps.findIndex(s => s.status === currentStatus);
  const isCancelled = currentStatus === "cancelled";

  if (isCancelled) {
    return (
      <div className="bg-red-50 rounded-xl p-6 text-center">
        <XCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
        <h3 className="font-bold text-red-700">Order Cancelled</h3>
        <p className="text-sm text-red-600 mt-1">
          Please contact the restaurant for assistance.
        </p>
      </div>
    );
  }

  return (
    <div>
      {steps.map((step, idx) => (
        <StatusStep
          key={step.status}
          step={step}
          isCompleted={idx < currentIndex}
          isCurrent={idx === currentIndex}
          isPending={idx > currentIndex}
          index={idx}
        />
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Order Tracking Page
// ---------------------------------------------------------------------------

export default function OrderTrackingPage({
  params,
}: {
  params: Promise<{ restaurantId: string; orderId: string }>;
}) {
  const { restaurantId, orderId } = use(params);
  const router = useRouter();

  const { orders, restaurants, setCurrentRestaurant } = useApp();

  const [copied, setCopied] = useState(false);
  const [showCallWaiter, setShowCallWaiter] = useState(false);
  const [showBillRequest, setShowBillRequest] = useState(false);

  // Set current restaurant
  useEffect(() => {
    setCurrentRestaurant(restaurantId);
  }, [restaurantId, setCurrentRestaurant]);

  const order = useMemo(
    () => orders.find(o => o.id === orderId),
    [orders, orderId]
  );

  const restaurant = useMemo(
    () => restaurants.find(r => r.id === restaurantId),
    [restaurants, restaurantId]
  );

  const copyOrderNumber = () => {
    if (order) {
      navigator.clipboard.writeText(order.orderNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCallWaiter = () => {
    setShowCallWaiter(true);
    setTimeout(() => setShowCallWaiter(false), 3000);
  };

  const handleRequestBill = () => {
    setShowBillRequest(true);
    setTimeout(() => setShowBillRequest(false), 3000);
  };

  // Loading state
  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center p-6">
          <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <UtensilsCrossed className="w-10 h-10 text-orange-400" />
          </div>
          <h1 className="text-xl font-bold text-slate-800 mb-2">Order Not Found</h1>
          <p className="text-slate-500 mb-6">We couldn't find this order.</p>
          <button
            onClick={() => router.push(`/menu/${restaurantId}`)}
            className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            Back to Menu
          </button>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: OrderStatus) => {
    const colors = {
      new: "bg-blue-100 text-blue-700",
      accepted: "bg-orange-100 text-orange-700",
      preparing: "bg-purple-100 text-purple-700",
      ready: "bg-green-100 text-green-700",
      served: "bg-emerald-100 text-emerald-700",
      completed: "bg-slate-100 text-slate-700",
      cancelled: "bg-red-100 text-red-700",
    };
    return colors[status] || colors.new;
  };

  const getStatusLabel = (status: OrderStatus) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const isCompleted = order.status === "completed" || order.status === "served";

  return (
    <div className="min-h-screen bg-slate-50 pb-28">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-slate-100 z-20">
        <div className="flex items-center gap-3 px-4 py-3">
          <button
            onClick={() => router.push(`/menu/${restaurantId}`)}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </button>
          <div className="flex-1">
            <h1 className="font-semibold text-slate-800">Order Status</h1>
            <p className="text-xs text-slate-500">{restaurant?.name}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
            {getStatusLabel(order.status)}
          </span>
        </div>
      </div>

      {/* Success Banner for New Orders */}
      {order.status === "new" && (
        <div className="mx-4 mt-4">
          <div className="bg-green-500 rounded-xl p-4 text-white">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-8 h-8" />
              <div>
                <h3 className="font-bold">Order Placed Successfully!</h3>
                <p className="text-sm text-green-100">Your order will be confirmed shortly</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Order Info Card */}
      <div className="mx-4 mt-4">
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4">
          <div className="flex justify-between items-start mb-3">
            <div>
              <p className="text-xs text-slate-500">Order Number</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xl font-bold text-slate-800">{order.orderNumber}</span>
                <button
                  onClick={copyOrderNumber}
                  className="p-1 hover:bg-slate-100 rounded"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4 text-slate-400" />
                  )}
                </button>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-500">Table</p>
              <span className="text-xl font-bold text-slate-800">#{order.tableNumber}</span>
            </div>
          </div>

          <div className="flex gap-3 text-xs text-slate-500 pt-3 border-t border-slate-100">
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>
                {new Date(order.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
            {order.customerName && (
              <div className="flex items-center gap-1">
                <User className="w-3 h-3" />
                <span>{order.customerName}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Status Tracker */}
      <div className="mx-4 mt-4">
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <h2 className="font-semibold text-slate-800">Live Order Tracking</h2>
          </div>
          <StatusStepper currentStatus={order.status} />

          {/* Estimated Time */}
          {!isCompleted && order.status !== "cancelled" && (
            <div className="mt-4 bg-orange-50 rounded-lg p-3 flex items-center gap-2">
              <Timer className="w-5 h-5 text-orange-500" />
              <div>
                <p className="text-sm font-medium text-orange-700">Estimated Time</p>
                <p className="text-xs text-orange-600">
                  {order.status === "new" || order.status === "accepted"
                    ? "15-25 minutes"
                    : order.status === "preparing"
                    ? "10-15 minutes"
                    : "Arriving shortly"}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Order Items */}
      <div className="mx-4 mt-4">
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4">
          <h2 className="font-semibold text-slate-800 mb-3">Order Items</h2>
          <div className="space-y-3">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex gap-3 pb-3 border-b border-slate-100 last:border-0 last:pb-0">
                <FoodDot type={item.foodType} />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <span className="font-medium text-slate-800">{item.menuItemName}</span>
                    <span className="text-sm font-semibold text-slate-800">₹{item.total}</span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs text-slate-500">x{item.quantity}</span>
                    {item.notes && (
                      <span className="text-xs text-slate-400 italic">Note: {item.notes}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bill Summary */}
      <div className="mx-4 mt-4">
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4">
          <h2 className="font-semibold text-slate-800 mb-3">Bill Summary</h2>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Subtotal</span>
              <span className="font-medium">₹{order.subtotal}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">GST</span>
              <span className="font-medium">₹{order.tax}</span>
            </div>
            {order.serviceCharge > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Service Charge</span>
                <span className="font-medium">₹{order.serviceCharge}</span>
              </div>
            )}
            {order.discount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-green-600">Discount</span>
                <span className="text-green-600 font-medium">-₹{order.discount}</span>
              </div>
            )}
            <div className="border-t border-slate-100 pt-2 mt-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-800">Total</span>
                <span className="text-xl font-bold text-orange-600">₹{order.total}</span>
              </div>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="text-xs text-slate-500 flex items-center gap-1">
                <CreditCard className="w-3 h-3" /> Payment
              </span>
              <span className={`text-xs font-medium px-2 py-1 rounded ${
                order.paymentStatus === "paid" 
                  ? "bg-green-100 text-green-700"
                  : "bg-orange-100 text-orange-700"
              }`}>
                {order.paymentStatus.toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notifications */}
      {showCallWaiter && (
        <div className="fixed top-4 left-4 right-4 z-50 animate-slide-down">
          <div className="bg-blue-500 text-white rounded-xl p-4 flex items-center gap-3 shadow-lg">
            <Bell className="w-5 h-5" />
            <div>
              <p className="font-medium">Waiter has been notified!</p>
              <p className="text-sm text-blue-100">Someone will be at your table shortly</p>
            </div>
          </div>
        </div>
      )}

      {showBillRequest && (
        <div className="fixed top-4 left-4 right-4 z-50 animate-slide-down">
          <div className="bg-green-500 text-white rounded-xl p-4 flex items-center gap-3 shadow-lg">
            <Receipt className="w-5 h-5" />
            <div>
              <p className="font-medium">Bill requested!</p>
              <p className="text-sm text-green-100">Your bill will be brought to your table</p>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 shadow-lg">
        <div className="flex gap-3">
          <button
            onClick={handleCallWaiter}
            className="flex-1 bg-blue-500 text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-blue-600 transition-colors"
          >
            <Phone className="w-4 h-4" />
            Call Waiter
          </button>
          <button
            onClick={handleRequestBill}
            className="flex-1 bg-green-500 text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-green-600 transition-colors"
          >
            <Receipt className="w-4 h-4" />
            Request Bill
          </button>
        </div>
      </div>
    </div>
  );
}