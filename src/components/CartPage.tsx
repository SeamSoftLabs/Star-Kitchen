import { X, ShoppingCart, Minus, Plus, Trash2, ChevronRight, Package, CreditCard } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

interface CartItem {
  id: string;
  image: string;
  name: string;
  price: string;
  quantity: number;
  category?: string;
}

interface CartPageProps {
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

export function CartPage({ 
  onClose, 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem,
  onCheckout 
}: CartPageProps) {
  const subtotal = cartItems.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);
  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const freeShippingThreshold = 50;
  const progressToFreeShipping = Math.min((subtotal / freeShippingThreshold) * 100, 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 md:min-h-0 md:max-w-4xl md:mx-auto md:my-8 md:rounded-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white/80 backdrop-blur-md z-10 border-b border-gray-100">
          <div className="flex items-center justify-between p-4">
            <h1 className="text-xl flex items-center gap-2">
              <ShoppingCart className="w-6 h-6" />
              Shopping Cart
              {cartItems.length > 0 && (
                <span className="text-sm text-muted-foreground">
                  ({cartItems.length} {cartItems.length === 1 ? "item" : "items"})
                </span>
              )}
            </h1>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 md:p-6 pb-40 md:pb-8">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-4">
                <ShoppingCart className="w-12 h-12 text-gray-400" />
              </div>
              <h2 className="text-xl mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6">
                Add some items to get started!
              </p>
              <button
                onClick={onClose}
                className="bg-gradient-to-r from-yellow-500 to-red-500 text-white py-3 px-8 rounded-xl hover:from-yellow-600 hover:to-red-600 transition-all"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {/* Cart Items */}
              <div className="md:col-span-2 space-y-4">
                {/* Free Shipping Progress */}
                {remainingForFreeShipping > 0 && (
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm">
                        Add <span className="text-yellow-600">${remainingForFreeShipping.toFixed(2)}</span> more for free shipping!
                      </p>
                      <Package className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-yellow-500 to-red-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${progressToFreeShipping}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Items List */}
                {cartItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="mb-1 truncate">{item.name}</h3>
                        {item.category && (
                          <p className="text-xs text-muted-foreground mb-2">
                            {item.category}
                          </p>
                        )}
                        <p className="text-yellow-600 mb-3">
                          ${item.price}
                        </p>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                            <button
                              onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                              className="p-1.5 hover:bg-white rounded transition-colors"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center text-sm">{item.quantity}</span>
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                              className="p-1.5 hover:bg-white rounded transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          
                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="p-2 hover:bg-red-50 text-red-500 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="md:col-span-1">
                <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24">
                  <h3 className="mb-4">Order Summary</h3>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className={shipping === 0 ? "text-green-600" : ""}>
                        {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="border-t pt-3">
                      <div className="flex justify-between">
                        <span>Total</span>
                        <span className="text-xl text-yellow-600">
                          ${total.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={onCheckout}
                    className="w-full bg-gradient-to-r from-yellow-500 to-red-500 hover:from-yellow-600 hover:to-red-600 text-white py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-yellow-500/30 mb-3"
                  >
                    <CreditCard className="w-5 h-5" />
                    Proceed to Checkout
                  </button>
                  
                  <button
                    onClick={onClose}
                    className="w-full border border-gray-200 hover:bg-gray-50 py-3 px-6 rounded-xl transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}