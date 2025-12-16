import { motion } from "motion/react";
import { ArrowLeft, Bell, Package, Heart, Tag, TrendingUp } from "lucide-react";
import { Switch } from "./ui/switch";
import { Separator } from "./ui/separator";

interface NotificationsPageProps {
  onClose: () => void;
}

export function NotificationsPage({ onClose }: NotificationsPageProps) {
  const notificationTypes = [
    { id: "orders", icon: Package, label: "Order Updates", description: "Get notified about order status", color: "from-yellow-500 to-red-500", enabled: true },
    { id: "favorites", icon: Heart, label: "Favorites on Sale", description: "When saved items go on sale", color: "from-pink-500 to-rose-500", enabled: true },
    { id: "deals", icon: Tag, label: "Deals & Offers", description: "Special promotions and discounts", color: "from-green-500 to-emerald-500", enabled: false },
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
          <h1 className="text-lg">Notifications</h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 pb-32 mt-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border border-border/50 overflow-hidden">
          {notificationTypes.map((notif, index) => (
            <div key={notif.id}>
              <div className="flex items-center gap-4 p-4">
                <div className={`p-2.5 bg-gradient-to-br ${notif.color} rounded-xl`}>
                  <notif.icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm mb-0.5">{notif.label}</h3>
                  <p className="text-xs text-muted-foreground">{notif.description}</p>
                </div>
                <Switch defaultChecked={notif.enabled} />
              </div>
              {index < notificationTypes.length - 1 && <Separator className="mx-4" />}
            </div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}