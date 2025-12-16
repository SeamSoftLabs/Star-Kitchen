import { X, CreditCard, MapPin, Truck, CheckCircle2, ChevronRight, Package } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

interface CartItem {
  id: string;
  image: string;
  name: string;
  price: string;
  quantity: number;
}

interface CheckoutPageProps {
  onClose: () => void;
  cartItems: CartItem[];
  onPlaceOrder: () => void;
}

export function CheckoutPage({ onClose, cartItems, onPlaceOrder }: CheckoutPageProps) {
  const [selectedAddress, setSelectedAddress] = useState(0);
  const [selectedPayment, setSelectedPayment] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const subtotal = cartItems.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);
  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const addresses = [
    {
      id: 0,
      name: "Home",
      address: "123 Main Street, Apt 4B",
      city: "New York, NY 10001",
      isDefault: true,
    },
    {
      id: 1,
      name: "Office",
      address: "456 Business Ave, Suite 200",
      city: "New York, NY 10002",
      isDefault: false,
    },
  ];

  const paymentMethods = [
    {
      id: 0,
      type: "Visa",
      last4: "4532",
      expiry: "12/25",
      isDefault: true,
    },
    {
      id: 1,
      type: "Mastercard",
      last4: "8765",
      expiry: "06/26",
      isDefault: false,
    },
  ];

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setOrderPlaced(true);
    
    // After showing success, close and call parent handler
    setTimeout(() => {
      onPlaceOrder();
      onClose();
    }, 2500);
  };

  if (orderPlaced) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-2xl p-8 max-w-md w-full text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex p-6 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full mb-6"
          >
            <CheckCircle2 className="w-16 h-16 text-green-600" />
          </motion.div>
          <h2 className="text-2xl mb-2">Order Placed!</h2>
          <p className="text-muted-foreground mb-4">
            Your order has been successfully placed and is being processed.
          </p>
          <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-4 mb-6">
            <p className="text-sm text-muted-foreground mb-1">Order Total</p>
            <p className="text-3xl text-yellow-600">${total.toFixed(2)}</p>
          </div>
          <p className="text-sm text-muted-foreground">
            You'll receive a confirmation email shortly.
          </p>
        </motion.div>
      </motion.div>
    );
  }

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
        className="min-h-screen bg-gradient-to-br from-gray-50 to-amber-50/30 md:min-h-0 md:max-w-5xl md:mx-auto md:my-8 md:rounded-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white/80 backdrop-blur-md z-10 border-b border-gray-100">
          <div className="flex items-center justify-between p-4">
            <h1 className="text-xl flex items-center gap-2">
              <CreditCard className="w-6 h-6" />
              Checkout
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
          <div className="grid md:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-6">
              {/* Delivery Address */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-5 h-5 text-yellow-600" />
                  <h3>Delivery Address</h3>
                </div>
                <div className="space-y-3">
                  {addresses.map((address) => (
                    <button
                      key={address.id}
                      onClick={() => setSelectedAddress(address.id)}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                        selectedAddress === address.id
                          ? "border-yellow-500 bg-yellow-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p>{address.name}</p>
                            {address.isDefault && (
                              <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">
                                Default
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{address.address}</p>
                          <p className="text-sm text-muted-foreground">{address.city}</p>
                        </div>
                        {selectedAddress === address.id && (
                          <CheckCircle2 className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                        )}
                      </div>
                    </button>
                  ))}
                  <button className="w-full p-4 border-2 border-dashed border-gray-300 rounded-xl text-yellow-600 hover:border-yellow-500 hover:bg-yellow-50 transition-all">
                    + Add New Address
                  </button>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <CreditCard className="w-5 h-5 text-yellow-600" />
                  <h3>Payment Method</h3>
                </div>
                <div className="space-y-3">
                  {paymentMethods.map((payment) => (
                    <button
                      key={payment.id}
                      onClick={() => setSelectedPayment(payment.id)}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                        selectedPayment === payment.id
                          ? "border-yellow-500 bg-yellow-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p>{payment.type} •••• {payment.last4}</p>
                            {payment.isDefault && (
                              <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">
                                Default
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">Expires {payment.expiry}</p>
                        </div>
                        {selectedPayment === payment.id && (
                          <CheckCircle2 className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                        )}
                      </div>
                    </button>
                  ))}
                  <button className="w-full p-4 border-2 border-dashed border-gray-300 rounded-xl text-yellow-600 hover:border-yellow-500 hover:bg-yellow-50 transition-all">
                    + Add New Card
                  </button>
                </div>
              </div>

              {/* Delivery Options */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Truck className="w-5 h-5 text-yellow-600" />
                  <h3>Delivery Options</h3>
                </div>
                <div className="space-y-3">
                  <button className="w-full text-left p-4 rounded-xl border-2 border-yellow-500 bg-yellow-50">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="mb-1">Standard Delivery</p>
                        <p className="text-sm text-muted-foreground">3-5 business days</p>
                      </div>
                      <div className="text-right">
                        <p className="text-green-600">{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</p>
                        <CheckCircle2 className="w-5 h-5 text-yellow-600 ml-auto mt-1" />
                      </div>
                    </div>
                  </button>
                  <button className="w-full text-left p-4 rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-all">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="mb-1">Express Delivery</p>
                        <p className="text-sm text-muted-foreground">1-2 business days</p>
                      </div>
                      <p>$12.99</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24">
                <h3 className="mb-4">Order Summary</h3>

                {/* Items Preview */}
                <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm truncate">{item.name}</p>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                        <p className="text-sm text-yellow-600">${item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-3 mb-6">
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
                      <span className="text-xl text-yellow-600">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                  className="w-full bg-gradient-to-r from-yellow-500 to-red-500 hover:from-yellow-600 hover:to-red-600 text-white py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-yellow-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Package className="w-5 h-5" />
                      </motion.div>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      <span>Place Order · ${total.toFixed(2)}</span>
                    </>
                  )}
                </button>

                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-xs text-muted-foreground text-center">
                    Your order is protected by our secure checkout
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
