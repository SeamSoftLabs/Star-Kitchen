import { motion } from "motion/react";
import { ArrowLeft, MapPin, Plus, Home, Briefcase, Trash2, Edit } from "lucide-react";

interface AddressesPageProps {
  onClose: () => void;
}

export function AddressesPage({ onClose }: AddressesPageProps) {
  const addresses = [
    {
      id: "1",
      type: "Home",
      icon: Home,
      name: "John Doe",
      address: "123 Main Street, Apt 4B",
      city: "New York, NY 10001",
      phone: "+1 (555) 123-4567",
      isDefault: true,
    },
    {
      id: "2",
      type: "Work",
      icon: Briefcase,
      name: "John Doe",
      address: "456 Business Ave, Suite 200",
      city: "New York, NY 10002",
      phone: "+1 (555) 987-6543",
      isDefault: false,
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
      {/* Header */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-border/50 px-4 py-4 z-10">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <button
            onClick={onClose}
            className="p-2 hover:bg-accent rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="flex-1 text-lg">My Addresses</h1>
          <button className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-xl hover:bg-black/90 transition-colors">
            <Plus className="w-4 h-4" />
            <span>Add</span>
          </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 pb-32 mt-6">
        <div className="space-y-4">
          {addresses.map((address, index) => (
            <motion.div
              key={address.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl border border-border/50 overflow-hidden"
            >
              <div className="p-4">
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2.5 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl">
                    <address.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm">{address.type}</h3>
                      {address.isDefault && (
                        <span className="px-2 py-0.5 bg-orange-500 text-white text-xs rounded-full">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="text-sm">{address.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">{address.address}</p>
                    <p className="text-xs text-muted-foreground">{address.city}</p>
                    <p className="text-xs text-muted-foreground mt-1">{address.phone}</p>
                  </div>
                </div>

                <div className="flex gap-2 pt-3 border-t border-border">
                  <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-accent rounded-xl hover:bg-accent/80 transition-colors">
                    <Edit className="w-4 h-4" />
                    <span className="text-sm">Edit</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Add Address Card */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="w-full mt-4 p-6 bg-white rounded-2xl border-2 border-dashed border-border hover:border-orange-500 hover:bg-orange-50/50 transition-colors"
        >
          <div className="flex flex-col items-center gap-2">
            <div className="p-3 bg-gray-100 rounded-full">
              <Plus className="w-6 h-6 text-muted-foreground" />
            </div>
            <p className="text-sm">Add New Address</p>
          </div>
        </motion.button>
      </div>
    </motion.div>
  );
}
