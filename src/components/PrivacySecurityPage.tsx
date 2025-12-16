import { motion } from "motion/react";
import { ArrowLeft, Shield, Lock, Eye, Fingerprint, Database, UserX } from "lucide-react";
import { Switch } from "./ui/switch";
import { Separator } from "./ui/separator";

interface PrivacySecurityPageProps {
  onClose: () => void;
}

export function PrivacySecurityPage({ onClose }: PrivacySecurityPageProps) {
  const privacySettings = [
    { id: "biometric", icon: Fingerprint, label: "Biometric Login", description: "Use fingerprint or face ID", color: "from-indigo-500 to-purple-500", enabled: true, type: "toggle" },
    { id: "twoFactor", icon: Lock, label: "Two-Factor Authentication", description: "Add extra security layer", color: "from-green-500 to-emerald-500", enabled: false, type: "toggle" },
    { id: "dataSharing", icon: Database, label: "Data Sharing", description: "Share analytics data", color: "from-blue-500 to-cyan-500", enabled: false, type: "toggle" },
    { id: "visibility", icon: Eye, label: "Profile Visibility", description: "Public", color: "from-orange-500 to-red-500", enabled: true, type: "select" },
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
          <h1 className="text-lg">Privacy & Security</h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 pb-32 mt-6 space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border border-border/50 overflow-hidden">
          {privacySettings.map((setting, index) => (
            <div key={setting.id}>
              <div className="flex items-center gap-4 p-4">
                <div className={`p-2.5 bg-gradient-to-br ${setting.color} rounded-xl`}>
                  <setting.icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm mb-0.5">{setting.label}</h3>
                  <p className="text-xs text-muted-foreground">{setting.description}</p>
                </div>
                {setting.type === "toggle" && <Switch defaultChecked={setting.enabled} />}
              </div>
              {index < privacySettings.length - 1 && <Separator className="mx-4" />}
            </div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl border border-border/50 p-4">
          <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-accent transition-colors">
            <div className="p-2 bg-gradient-to-br from-red-500 to-rose-500 rounded-lg">
              <UserX className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="text-sm mb-0.5">Delete My Data</h3>
              <p className="text-xs text-muted-foreground">Request data deletion</p>
            </div>
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
