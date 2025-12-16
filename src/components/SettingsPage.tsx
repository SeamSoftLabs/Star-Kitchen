import { motion } from "motion/react";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";

interface SettingsPageProps {
  onClose: () => void;
}

export function SettingsPage({ onClose }: SettingsPageProps) {
  const settingsSections = [
    {
      title: "Appearance",
      items: [
        { id: "darkMode", label: "Dark Mode", description: "Use dark theme", type: "toggle", value: false },
        { id: "language", label: "Language", description: "English", type: "select" },
      ],
    },
    {
      title: "Shopping",
      items: [
        { id: "saveCards", label: "Save Payment Info", description: "For faster checkout", type: "toggle", value: true },
        { id: "orderUpdates", label: "Order Updates", description: "Get notifications", type: "toggle", value: true },
        { id: "currency", label: "Currency", description: "USD ($)", type: "select" },
      ],
    },
    {
      title: "Data & Storage",
      items: [
        { id: "cacheSize", label: "Clear Cache", description: "23 MB", type: "action" },
        { id: "downloadQuality", label: "Image Quality", description: "High", type: "select" },
      ],
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
          <h1 className="text-lg">Settings</h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 pb-32 mt-6">
        {settingsSections.map((section, sectionIndex) => (
          <motion.section
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: sectionIndex * 0.1 }}
            className="mb-6"
          >
            <h3 className="text-sm text-muted-foreground mb-3 px-1">{section.title}</h3>
            <div className="bg-white rounded-2xl border border-border/50 overflow-hidden">
              {section.items.map((item, itemIndex) => (
                <div key={item.id}>
                  <div className="flex items-center justify-between p-4">
                    <div className="flex-1">
                      <Label htmlFor={item.id} className="text-sm cursor-pointer">{item.label}</Label>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    </div>
                    {item.type === "toggle" && (
                      <Switch id={item.id} defaultChecked={item.value} />
                    )}
                    {item.type === "select" && (
                      <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                        <span>{item.description}</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    )}
                    {item.type === "action" && (
                      <button className="px-3 py-1.5 bg-accent rounded-lg text-sm hover:bg-accent/80 transition-colors">
                        Clear
                      </button>
                    )}
                  </div>
                  {itemIndex < section.items.length - 1 && <Separator className="mx-4" />}
                </div>
              ))}
            </div>
          </motion.section>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl border border-border/50 p-4"
        >
          <button className="w-full text-left">
            <h3 className="text-sm mb-1">App Version</h3>
            <p className="text-xs text-muted-foreground">StarKitchen 2.0.1 (Build 2024.11.21)</p>
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
