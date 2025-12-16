import { X, ChevronLeft, Package, Truck, CheckCircle, MapPin, Clock } from "lucide-react";
import { motion } from "motion/react";

interface OrderTrackingPageProps {
  onClose: () => void;
  orderId: string;
}

export function OrderTrackingPage({ onClose, orderId }: OrderTrackingPageProps) {
  const trackingSteps = [
    {
      id: 1,
      title: "Order Placed",
      description: "Your order has been confirmed",
      date: "Dec 8, 2025",
      time: "10:30 AM",
      completed: true,
      icon: CheckCircle,
    },
    {
      id: 2,
      title: "Processing",
      description: "Your order is being prepared",
      date: "Dec 8, 2025",
      time: "2:15 PM",
      completed: true,
      icon: Package,
    },
    {
      id: 3,
      title: "Shipped",
      description: "Your order is on the way",
      date: "Dec 9, 2025",
      time: "9:00 AM",
      completed: true,
      icon: Truck,
    },
    {
      id: 4,
      title: "Out for Delivery",
      description: "Your order will arrive today",
      date: "Dec 10, 2025",
      time: "Expected by 6:00 PM",
      completed: false,
      current: true,
      icon: MapPin,
    },
    {
      id: 5,
      title: "Delivered",
      description: "Package delivered",
      date: "",
      time: "",
      completed: false,
      icon: CheckCircle,
    },
  ];

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
        className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 md:min-h-0 md:max-w-3xl md:mx-auto md:my-8 md:rounded-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white/80 backdrop-blur-md z-10 border-b border-gray-100">
          <div className="flex items-center justify-between p-4">
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h1 className="flex-1 text-center text-xl">Track Order</h1>
            <div className="w-10" />
          </div>
        </div>

        {/* Content */}
        <div className="p-4 md:p-6 pb-8">
          {/* Order Info Card */}
          <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground">Order ID</p>
                <p className="text-lg">#{orderId}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Estimated Delivery</p>
                <p className="text-lg text-blue-600">Today, 6:00 PM</p>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl p-4">
              <div className="flex gap-3">
                <MapPin className="w-5 h-5 text-blue-600 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm mb-1">Delivery Address</p>
                  <p className="text-sm text-muted-foreground">
                    123 Main Street, Apt 4B<br />
                    San Francisco, CA 94102
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tracking Timeline */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg mb-6">Tracking Details</h2>
            
            <div className="space-y-6">
              {trackingSteps.map((step, index) => {
                const Icon = step.icon;
                const isLast = index === trackingSteps.length - 1;
                
                return (
                  <div key={step.id} className="relative">
                    {/* Timeline Line */}
                    {!isLast && (
                      <div
                        className={`absolute left-5 top-12 w-0.5 h-full -ml-px ${
                          step.completed ? "bg-blue-600" : "bg-gray-200"
                        }`}
                      />
                    )}
                    
                    {/* Step Content */}
                    <div className="flex gap-4">
                      {/* Icon */}
                      <div
                        className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                          step.current
                            ? "bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/50 animate-pulse"
                            : step.completed
                            ? "bg-blue-600"
                            : "bg-gray-200"
                        }`}
                      >
                        <Icon
                          className={`w-5 h-5 ${
                            step.completed || step.current ? "text-white" : "text-gray-400"
                          }`}
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 pb-2">
                        <div className="flex items-start justify-between mb-1">
                          <div>
                            <h3
                              className={`mb-1 ${
                                step.current
                                  ? "text-blue-600"
                                  : step.completed
                                  ? ""
                                  : "text-muted-foreground"
                              }`}
                            >
                              {step.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {step.description}
                            </p>
                          </div>
                          {(step.completed || step.current) && step.date && (
                            <div className="text-right text-xs text-muted-foreground">
                              <p>{step.date}</p>
                              <p>{step.time}</p>
                            </div>
                          )}
                        </div>

                        {/* Current Step Info */}
                        {step.current && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-3 p-3 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-lg"
                          >
                            <div className="flex items-start gap-2">
                              <Clock className="w-4 h-4 text-blue-600 mt-0.5" />
                              <div className="text-sm">
                                <p className="text-blue-600 mb-1">
                                  Arriving soon!
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  Your package is with our delivery partner and will arrive by {step.time}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Contact Support */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground mb-3">
              Need help with your order?
            </p>
            <button className="text-blue-600 hover:underline">
              Contact Support
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
