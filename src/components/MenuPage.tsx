import { motion } from "motion/react";
import { 
  ArrowLeft, 
  User, 
  Package, 
  MapPin, 
  CreditCard, 
  Bell, 
  Shield, 
  HelpCircle, 
  Info, 
  LogOut,
  ChevronRight,
  Settings,
  Star,
  Heart,
  ShoppingBag
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";

interface MenuPageProps {
  onClose: () => void;
  onNavigate: (page: string) => void;
  onLogout?: () => void;
}

export function MenuPage({ onClose, onNavigate, onLogout }: MenuPageProps) {
  const menuSections = [
    {
      title: "Account",
      items: [
        { icon: User, label: "Edit Profile", description: "Update your personal info", color: "from-blue-500 to-cyan-500", page: "editProfile" },
        { icon: Package, label: "My Orders", description: "Track and manage orders", badge: "3", color: "from-yellow-500 to-red-500", page: "myOrders" },
        { icon: MapPin, label: "Addresses", description: "Manage delivery locations", color: "from-green-500 to-emerald-500", page: "addresses" },
        { icon: CreditCard, label: "Payment Methods", description: "Cards and wallets", color: "from-purple-500 to-pink-500", page: "paymentMethods" },
      ]
    },
    {
      title: "Preferences",
      items: [
        { icon: Bell, label: "Notifications", description: "Manage alerts", color: "from-yellow-500 to-orange-500", page: "notifications" },
        { icon: Settings, label: "Settings", description: "App preferences", color: "from-gray-500 to-slate-500", page: "settings" },
        { icon: Shield, label: "Privacy & Security", description: "Control your data", color: "from-indigo-500 to-blue-500", page: "privacySecurity" },
      ]
    },
    {
      title: "Support",
      items: [
        { icon: HelpCircle, label: "Help Center", description: "FAQs and support", color: "from-teal-500 to-cyan-500", page: "helpCenter" },
        { icon: Info, label: "About StarKitchen", description: "Version 2.0.1", color: "from-pink-500 to-rose-500", page: "about" },
      ]
    }
  ];

  const stats = [
    { icon: ShoppingBag, label: "Orders", value: "24", color: "from-yellow-500 to-red-500" },
    { icon: Heart, label: "Favorites", value: "12", color: "from-pink-500 to-rose-500" },
    { icon: Star, label: "Points", value: "450", color: "from-yellow-500 to-amber-500" },
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
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <button
            onClick={onClose}
            className="p-2 hover:bg-accent rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg">Menu</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 pb-32">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 mb-6"
        >
          <div className="bg-gradient-to-br from-yellow-500 to-red-500 rounded-2xl p-6 text-white">
            <div className="flex items-center gap-4 mb-6">
              <Avatar className="w-16 h-16 border-2 border-white/50">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-xl mb-1">John Doe</h2>
                <p className="text-sm opacity-90">john.doe@email.com</p>
              </div>
              <button className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center"
                >
                  <div className="inline-flex p-2 bg-white/20 rounded-lg mb-2">
                    <stat.icon className="w-4 h-4" />
                  </div>
                  <p className="text-xl mb-1">{stat.value}</p>
                  <p className="text-xs opacity-90">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Menu Sections */}
        {menuSections.map((section, sectionIndex) => (
          <motion.section
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: sectionIndex * 0.1 + 0.2 }}
            className="mb-6"
          >
            <h3 className="text-sm text-muted-foreground mb-3 px-1">{section.title}</h3>
            <div className="bg-white rounded-2xl border border-border/50 overflow-hidden">
              {section.items.map((item, itemIndex) => (
                <div key={item.label}>
                  <button className="w-full flex items-center gap-4 p-4 hover:bg-accent transition-colors" onClick={() => onNavigate(item.page)}>
                    <div className={`p-2.5 bg-gradient-to-br ${item.color} rounded-xl`}>
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="flex items-center gap-2">
                        <p className="text-sm">{item.label}</p>
                        {item.badge && (
                          <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </button>
                  {itemIndex < section.items.length - 1 && (
                    <Separator className="mx-4" />
                  )}
                </div>
              ))}
            </div>
          </motion.section>
        ))}

        {/* Logout Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          onClick={() => {
            if (onLogout) {
              onLogout();
            }
          }}
          className="w-full flex items-center justify-center gap-2 p-4 bg-white border border-border/50 rounded-2xl hover:bg-red-50 hover:border-red-200 transition-colors text-red-600"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </motion.button>

        {/* App Version */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          StarKitchen v2.0.1
        </p>
      </div>
    </motion.div>
  );
}