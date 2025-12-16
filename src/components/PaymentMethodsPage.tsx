import { motion } from "motion/react";
import { ArrowLeft, CreditCard, Plus, Trash2 } from "lucide-react";

interface PaymentMethodsPageProps {
  onClose: () => void;
}

export function PaymentMethodsPage({ onClose }: PaymentMethodsPageProps) {
  const paymentMethods = [
    {
      id: "1",
      type: "Visa",
      last4: "4242",
      expiryDate: "12/25",
      isDefault: true,
      color: "from-blue-500 to-indigo-500",
    },
    {
      id: "2",
      type: "Mastercard",
      cardNumber: "**** **** **** 4532",
      expiryDate: "06/26",
      isDefault: false,
      color: "from-yellow-500 to-red-500",
    },
  ];

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="fixed inset-0 bg-gray-50 z-50 overflow-y-auto"
    >
      <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-border/50 px-4 py-4 z-10">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <button onClick={onClose} className="p-2 hover:bg-accent rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="flex-1 text-lg">Payment Methods</h1>
          <button className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-xl hover:bg-black/90 transition-colors">
            <Plus className="w-4 h-4" />
            <span>Add</span>
          </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 pb-32 mt-6 space-y-4">
        {paymentMethods.map((method, index) => (
          <motion.div
            key={method.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-gradient-to-br ${method.color} rounded-2xl p-6 text-white`}
          >
            <div className="flex items-start justify-between mb-8">
              <CreditCard className="w-8 h-8" />
              {method.isDefault && (
                <span className="px-2 py-0.5 bg-white/20 backdrop-blur-sm text-xs rounded-full">
                  Default
                </span>
              )}
            </div>
            <div className="mb-2">
              <p className="text-xs opacity-75 mb-1">Card Number</p>
              <p className="text-lg tracking-wider">•••• •••• •••• {method.last4}</p>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs opacity-75 mb-1">Expires</p>
                <p>{method.expiryDate}</p>
              </div>
              <button className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="w-full p-6 bg-white rounded-2xl border-2 border-dashed border-border hover:border-purple-500 hover:bg-purple-50/50 transition-colors"
        >
          <div className="flex flex-col items-center gap-2">
            <div className="p-3 bg-gray-100 rounded-full">
              <Plus className="w-6 h-6 text-muted-foreground" />
            </div>
            <p className="text-sm">Add New Card</p>
          </div>
        </motion.button>
      </div>
    </motion.div>
  );
}