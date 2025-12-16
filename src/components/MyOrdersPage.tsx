import { motion } from "motion/react";
import { ArrowLeft, Package, Truck, CheckCircle, Clock, ChevronRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface MyOrdersPageProps {
  onClose: () => void;
}

export function MyOrdersPage({ onClose }: MyOrdersPageProps) {
  const orders = [
    {
      id: "ORD-2024-001",
      date: "Nov 20, 2024",
      status: "Delivered",
      statusColor: "from-green-500 to-emerald-500",
      icon: CheckCircle,
      total: "149.99",
      items: [
        {
          name: "Smart Blender Pro",
          quantity: 1,
          price: "89.99",
          image: "https://images.unsplash.com/photo-1648392345455-22bd0d2e0c74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBibGVuZGVyfGVufDF8fHx8MTc2MTgzMTAyM3ww&ixlib=rb-4.1.0&q=80&w=1080",
        },
        {
          name: "Premium Utensil Set",
          quantity: 1,
          price: "49.99",
          image: "https://images.unsplash.com/photo-1738484708927-c1f45df0b56e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraXRjaGVuJTIwdXRlbnNpbHN8ZW58MXx8fHwxNzYxNzI3ODA3fDA&ixlib=rb-4.1.0&q=80&w=1080",
        },
      ],
    },
    {
      id: "ORD-2024-002",
      date: "Nov 19, 2024",
      status: "In Transit",
      statusColor: "from-blue-500 to-cyan-500",
      icon: Truck,
      total: "129.99",
      items: [
        {
          name: "Cookware Set",
          quantity: 1,
          price: "129.99",
          image: "https://images.unsplash.com/photo-1612455859448-ecf83d2b7e7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb29raW5nJTIwcG90cyUyMHBhbnN8ZW58MXx8fHwxNzYxODMxMDIzfDA&ixlib=rb-4.1.0&q=80&w=1080",
        },
      ],
    },
    {
      id: "ORD-2024-003",
      date: "Nov 18, 2024",
      status: "Processing",
      statusColor: "from-yellow-500 to-orange-500",
      icon: Clock,
      total: "64.98",
      items: [
        {
          name: "Ceramic Mug Set",
          quantity: 1,
          price: "24.99",
          image: "https://images.unsplash.com/photo-1669329606558-2dc9172d9f33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjZXJhbWljJTIwbXVnc3xlbnwxfHx8fDE3NjE4MzEwMjR8MA&ixlib=rb-4.1.0&q=80&w=1080",
        },
        {
          name: "Dinner Plate Set",
          quantity: 1,
          price: "39.99",
          image: "https://images.unsplash.com/photo-1712153025601-141bb78cc50c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraXRjaGVuJTIwcGxhdGVzfGVufDF8fHx8MTc2MTgzMTAyNHww&ixlib=rb-4.1.0&q=80&w=1080",
        },
      ],
    },
  ];

  const activeOrders = orders.filter(o => o.status !== "Delivered");
  const completedOrders = orders.filter(o => o.status === "Delivered");

  const OrderCard = ({ order }: { order: typeof orders[0] }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl border border-border/50 overflow-hidden"
    >
      <div className="p-3 sm:p-4 md:p-5">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4 gap-3 sm:gap-0">
          <div>
            <h3 className="text-sm md:text-base mb-1">{order.id}</h3>
            <p className="text-xs md:text-sm text-muted-foreground">{order.date}</p>
          </div>
          <div className={`flex items-center gap-2 px-3 py-1.5 bg-gradient-to-br ${order.statusColor} rounded-lg text-white self-start`}>
            <order.icon className="w-3.5 h-3.5 md:w-4 md:h-4" />
            <span className="text-xs md:text-sm">{order.status}</span>
          </div>
        </div>

        {/* Items */}
        <div className="space-y-2 md:space-y-3 mb-4">
          {order.items.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                <ImageWithFallback
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm md:text-base truncate">{item.name}</p>
                <p className="text-xs md:text-sm text-muted-foreground">Qty: {item.quantity}</p>
              </div>
              <p className="text-sm md:text-base flex-shrink-0">${item.price}</p>
            </div>
          ))}
        </div>

        {/* Total and Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-3 border-t border-border gap-3 sm:gap-0">
          <div>
            <p className="text-xs md:text-sm text-muted-foreground">Total</p>
            <p className="text-base md:text-lg">${order.total}</p>
          </div>
          <button className="flex items-center gap-1 px-4 py-2 md:px-5 md:py-2.5 bg-accent rounded-xl hover:bg-accent/80 transition-colors w-full sm:w-auto justify-center">
            <span className="text-sm md:text-base">View Details</span>
            <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="fixed inset-0 bg-gray-50 z-50 overflow-y-auto"
    >
      {/* Header */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-border/50 px-3 sm:px-4 md:px-6 py-3 md:py-4 z-10">
        <div className="max-w-4xl mx-auto flex items-center gap-2 sm:gap-3">
          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 hover:bg-accent rounded-lg transition-colors flex-shrink-0"
          >
            <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="text-base sm:text-lg md:text-xl truncate">My Orders</h1>
            <p className="text-xs md:text-sm text-muted-foreground">{orders.length} total orders</p>
          </div>
          <div className="p-2 sm:p-2.5 md:p-3 bg-gradient-to-br from-yellow-500 to-red-500 rounded-xl flex-shrink-0">
            <Package className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 pb-24 sm:pb-28 md:pb-32">
        <Tabs defaultValue="active" className="mt-4 sm:mt-6">
          <TabsList className="w-full grid grid-cols-2 h-auto">
            <TabsTrigger value="active" className="text-xs sm:text-sm md:text-base py-2 sm:py-2.5">
              <span className="hidden sm:inline">Active ({activeOrders.length})</span>
              <span className="sm:hidden">Active ({activeOrders.length})</span>
            </TabsTrigger>
            <TabsTrigger value="completed" className="text-xs sm:text-sm md:text-base py-2 sm:py-2.5">
              <span className="hidden sm:inline">Completed ({completedOrders.length})</span>
              <span className="sm:hidden">Done ({completedOrders.length})</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="mt-4 sm:mt-6 space-y-3 sm:space-y-4">
            {activeOrders.length > 0 ? (
              activeOrders.map((order) => <OrderCard key={order.id} order={order} />)
            ) : (
              <div className="flex flex-col items-center justify-center py-12 sm:py-16 md:py-20 text-center px-4">
                <div className="inline-flex p-4 sm:p-5 md:p-6 bg-gray-100 rounded-full mb-3 sm:mb-4">
                  <Package className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-muted-foreground" />
                </div>
                <h3 className="text-base sm:text-lg mb-1 sm:mb-2">No active orders</h3>
                <p className="text-xs sm:text-sm text-muted-foreground max-w-xs">Your current orders will appear here</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="completed" className="mt-4 sm:mt-6 space-y-3 sm:space-y-4">
            {completedOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  );
}