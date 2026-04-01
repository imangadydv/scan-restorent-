'use client';

import React, { useState, useMemo } from 'react';
import { useApp } from '@/lib/store';
import {
  Receipt,
  CreditCard,
  Banknote,
  Smartphone,
  Printer,
  CheckCircle,
  Clock,
  X,
  Loader2,
} from 'lucide-react';

export default function WaiterBillsPage() {
  const { currentRestaurant, orders, updateOrderStatus } = useApp();
  const [paymentModal, setPaymentModal] = useState<string | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<'cash' | 'card' | 'upi'>('cash');
  const [showPrintPreview, setShowPrintPreview] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const currency = currentRestaurant?.settings.currencySymbol || '\u20B9';

  // Orders requesting bill (served status means they need billing)
  const billRequests = useMemo(() => {
    if (!currentRestaurant) return [];
    return orders
      .filter(
        (o) =>
          o.restaurantId === currentRestaurant.id &&
          o.status === 'served' &&
          o.paymentStatus === 'pending'
      )
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  }, [orders, currentRestaurant]);

  // Recently completed bills
  const completedBills = useMemo(() => {
    if (!currentRestaurant) return [];
    return orders
      .filter(
        (o) =>
          o.restaurantId === currentRestaurant.id &&
          o.status === 'completed'
      )
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .slice(0, 10);
  }, [orders, currentRestaurant]);

  const handleMarkPaid = (orderId: string) => {
    setIsProcessing(true);
    setTimeout(() => {
      updateOrderStatus(orderId, 'completed');
      setPaymentModal(null);
      setIsProcessing(false);
    }, 600);
  };

  const selectedOrder = useMemo(() => {
    const id = paymentModal || showPrintPreview;
    if (!id) return null;
    return orders.find((o) => o.id === id) || null;
  }, [paymentModal, showPrintPreview, orders]);

  const timeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  };

  const getFoodTypeClass = (foodType?: string) => {
    switch (foodType) {
      case 'veg': return 'food-veg';
      case 'vegan': return 'food-vegan';
      default: return 'food-nonveg';
    }
  };

  const paymentMethods = [
    {
      key: 'cash' as const,
      label: 'Cash',
      icon: Banknote,
      activeColor: 'border-emerald-500 bg-emerald-50 text-emerald-700 shadow-glow',
      ringColor: 'ring-emerald-200',
    },
    {
      key: 'card' as const,
      label: 'Card',
      icon: CreditCard,
      activeColor: 'border-blue-500 bg-blue-50 text-blue-700 shadow-glow',
      ringColor: 'ring-blue-200',
    },
    {
      key: 'upi' as const,
      label: 'UPI',
      icon: Smartphone,
      activeColor: 'border-purple-500 bg-purple-50 text-purple-700 shadow-glow',
      ringColor: 'ring-purple-200',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="animate-fade-in">
        <h1 className="text-2xl font-bold text-gray-800">Bill Requests</h1>
        <p className="text-gray-400 mt-1 text-sm">Process payments and generate bills for served orders.</p>
      </div>

      {/* Pending Bills Section */}
      <div>
        <div className="flex items-center gap-2.5 mb-4 animate-fade-in-up stagger-1">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
            <Clock className="w-4 h-4 text-orange-600" />
          </div>
          <h2 className="text-lg font-bold text-gray-800">
            Pending Bills
            {billRequests.length > 0 && (
              <span className="ml-2 text-sm font-normal text-gray-400">({billRequests.length})</span>
            )}
          </h2>
        </div>

        {billRequests.length === 0 ? (
          <div className="card-premium p-14 text-center animate-fade-in">
            <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mx-auto mb-4">
              <Receipt className="w-8 h-8 text-gray-300" />
            </div>
            <p className="text-gray-400 font-medium">No pending bill requests.</p>
            <p className="text-gray-300 text-sm mt-1">Bills will appear here when orders are served.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {billRequests.map((order, index) => (
              <div
                key={order.id}
                className={`card-premium overflow-hidden animate-fade-in-up stagger-${Math.min(index + 1, 8)}`}
              >
                {/* Header */}
                <div className="p-4 sm:p-5 border-b border-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-xl gradient-primary-soft flex items-center justify-center flex-shrink-0">
                        <span className="text-xl font-bold text-orange-600">T-{order.tableNumber}</span>
                      </div>
                      <div>
                        <p className="font-bold text-gray-800">{order.orderNumber}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{order.customerName || 'Guest'} &middot; {timeAgo(order.updatedAt)}</p>
                      </div>
                    </div>
                    <span className="status-served px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider">
                      Bill Requested
                    </span>
                  </div>
                </div>

                {/* Items */}
                <div className="p-4 sm:p-5">
                  <ul className="space-y-2.5 mb-4">
                    {order.items.map((item) => (
                      <li key={item.id} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2.5">
                          <span className={getFoodTypeClass(item.foodType)} />
                          <span className="text-gray-700 font-medium">{item.menuItemName}</span>
                          <span className="text-xs text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded-full font-semibold">x{item.quantity}</span>
                        </div>
                        <span className="font-bold text-gray-800">{currency}{item.total.toFixed(0)}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Bill summary */}
                  <div className="border-t border-gray-100 pt-3 space-y-2">
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Subtotal</span>
                      <span className="font-medium">{currency}{order.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Tax</span>
                      <span className="font-medium">{currency}{order.tax.toFixed(2)}</span>
                    </div>
                    {order.serviceCharge > 0 && (
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>Service Charge</span>
                        <span className="font-medium">{currency}{order.serviceCharge.toFixed(2)}</span>
                      </div>
                    )}
                    {order.discount > 0 && (
                      <div className="flex justify-between text-sm text-emerald-600">
                        <span>Discount</span>
                        <span className="font-semibold">-{currency}{order.discount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="divider-gradient my-1" />
                    <div className="flex justify-between items-center pt-1">
                      <span className="text-base font-bold text-gray-800">Total</span>
                      <span className="text-2xl font-bold text-gradient">{currency}{order.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex border-t border-gray-100">
                  <button
                    onClick={() => setShowPrintPreview(order.id)}
                    className="btn-outline flex-1 flex items-center justify-center gap-2 py-3 text-sm !rounded-none !border-0 !border-r !border-gray-100 !px-4"
                  >
                    <Printer className="w-4 h-4" />
                    Print Bill
                  </button>
                  <button
                    onClick={() => {
                      setPaymentModal(order.id);
                      setSelectedPayment('cash');
                    }}
                    className="btn-primary flex-1 flex items-center justify-center gap-2 py-3 text-sm !rounded-none !shadow-none !px-4"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Mark Paid
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recently Completed Section */}
      {completedBills.length > 0 && (
        <div className="animate-fade-in-up">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-100 to-green-100 flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
            </div>
            <h2 className="text-lg font-bold text-gray-800">Recently Completed</h2>
          </div>
          <div className="card-premium overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/50">
                    <th className="text-left py-3.5 px-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Order</th>
                    <th className="text-left py-3.5 px-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Table</th>
                    <th className="text-left py-3.5 px-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest hidden sm:table-cell">Items</th>
                    <th className="text-left py-3.5 px-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total</th>
                    <th className="text-left py-3.5 px-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest hidden md:table-cell">Payment</th>
                    <th className="text-left py-3.5 px-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {completedBills.map((order) => (
                    <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50/30 transition-colors">
                      <td className="py-3 px-4 font-bold text-gray-800">{order.orderNumber}</td>
                      <td className="py-3 px-4 text-gray-600 font-medium">T-{order.tableNumber}</td>
                      <td className="py-3 px-4 text-gray-500 hidden sm:table-cell">{order.items.length} items</td>
                      <td className="py-3 px-4 font-bold text-gray-800">{currency}{order.total.toFixed(0)}</td>
                      <td className="py-3 px-4 hidden md:table-cell">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gray-100 text-gray-600 capitalize">
                          {order.paymentMethod || 'Cash'}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="status-completed px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider">
                          Completed
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {paymentModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 backdrop-blur-md animate-fade-in">
          <div className="card-premium w-full max-w-sm animate-scale-in overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-800">Collect Payment</h3>
              <button
                onClick={() => setPaymentModal(null)}
                className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* Large Total Amount Display */}
              <div className="text-center py-5 px-4 rounded-2xl bg-gradient-to-br from-gray-50 to-orange-50/30">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total Amount</p>
                <p className="text-4xl font-bold text-gradient mt-2">
                  {currency}{selectedOrder.total.toFixed(2)}
                </p>
                <p className="text-xs text-gray-400 mt-2 font-medium">
                  {selectedOrder.orderNumber} &middot; Table T-{selectedOrder.tableNumber}
                </p>
              </div>

              {/* Payment Method Selection */}
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Payment Method</p>
                <div className="grid grid-cols-3 gap-3">
                  {paymentMethods.map((method) => {
                    const Icon = method.icon;
                    const isSelected = selectedPayment === method.key;
                    return (
                      <button
                        key={method.key}
                        onClick={() => setSelectedPayment(method.key)}
                        className={`flex flex-col items-center gap-2.5 p-4 rounded-xl border-2 transition-all duration-300 ${
                          isSelected
                            ? method.activeColor
                            : 'border-gray-100 text-gray-400 hover:border-gray-200 hover:text-gray-500'
                        }`}
                      >
                        <Icon className="w-7 h-7" />
                        <span className="text-xs font-bold">{method.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Confirm Button */}
              <button
                onClick={() => handleMarkPaid(selectedOrder.id)}
                disabled={isProcessing}
                className="btn-primary w-full flex items-center justify-center gap-2 text-sm disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Confirm Payment ({selectedPayment.toUpperCase()})
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Print Preview Modal */}
      {showPrintPreview && selectedOrder && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 backdrop-blur-md animate-fade-in">
          <div className="card-premium w-full max-w-sm animate-scale-in overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-800">Bill Preview</h3>
              <button
                onClick={() => setShowPrintPreview(null)}
                className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Receipt-Style Bill Content */}
            <div className="p-6">
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-5">
                {/* Restaurant Header */}
                <div className="text-center mb-4 pb-4 border-b border-dashed border-gray-200">
                  <h4 className="text-lg font-bold text-gray-800">{currentRestaurant?.name || 'Restaurant'}</h4>
                  {currentRestaurant?.address && (
                    <p className="text-xs text-gray-400 mt-1">{currentRestaurant.address}</p>
                  )}
                  {currentRestaurant?.phone && (
                    <p className="text-xs text-gray-400">{currentRestaurant.phone}</p>
                  )}
                </div>

                {/* Order Info */}
                <div className="flex justify-between text-xs text-gray-500 mb-1 font-medium">
                  <span>{selectedOrder.orderNumber}</span>
                  <span>Table: T-{selectedOrder.tableNumber}</span>
                </div>
                <p className="text-xs text-gray-400 mb-3">
                  {new Date(selectedOrder.createdAt).toLocaleString()}
                </p>

                {/* Items */}
                <div className="border-t border-dashed border-gray-200 pt-3 mb-3">
                  {selectedOrder.items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm py-1.5">
                      <span className="text-gray-700">
                        {item.menuItemName} <span className="text-gray-400">x{item.quantity}</span>
                      </span>
                      <span className="text-gray-800 font-semibold">{currency}{item.total.toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="border-t border-dashed border-gray-200 pt-3 space-y-1.5">
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Subtotal</span>
                    <span>{currency}{selectedOrder.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Tax</span>
                    <span>{currency}{selectedOrder.tax.toFixed(2)}</span>
                  </div>
                  {selectedOrder.serviceCharge > 0 && (
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Service Charge</span>
                      <span>{currency}{selectedOrder.serviceCharge.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-base font-bold text-gray-800 pt-2 border-t border-dashed border-gray-200">
                    <span>TOTAL</span>
                    <span className="text-gradient">{currency}{selectedOrder.total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Thank You Footer */}
                <div className="text-center mt-4 pt-4 border-t border-dashed border-gray-200">
                  <p className="text-xs text-gray-500 font-medium">Thank you for dining with us!</p>
                  <p className="text-[10px] text-gray-300 mt-1.5 font-medium">Powered by Tap2Menu</p>
                </div>
              </div>

              {/* Print Button */}
              <button
                onClick={() => setShowPrintPreview(null)}
                className="w-full mt-4 py-3 rounded-xl text-sm font-bold text-white gradient-dark shadow-premium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
              >
                <Printer className="w-4 h-4" />
                Print Bill
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
