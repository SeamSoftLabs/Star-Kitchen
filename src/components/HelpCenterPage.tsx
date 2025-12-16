import { motion } from "motion/react";
import { ArrowLeft, Search, MessageCircle, Phone, Mail, ChevronRight } from "lucide-react";
import { Input } from "./ui/input";

interface HelpCenterPageProps {
  onClose: () => void;
}

export function HelpCenterPage({ onClose }: HelpCenterPageProps) {
  const faqCategories = [
    { title: "Orders & Delivery", questions: ["How do I track my order?", "What are delivery times?", "Can I change my order?"], count: 12 },
    { title: "Returns & Refunds", questions: ["How do I return an item?", "When will I get my refund?", "What's the return policy?"], count: 8 },
    { title: "Account & Profile", questions: ["How do I reset my password?", "How do I update my email?", "Can I delete my account?"], count: 6 },
    { title: "Payment Issues", questions: ["Why was my payment declined?", "Is my payment secure?", "What payment methods are accepted?"], count: 10 },
  ];

  const contactOptions = [
    { icon: MessageCircle, label: "Live Chat", description: "Chat with our team", color: "from-blue-500 to-cyan-500" },
    { icon: Phone, label: "Call Us", description: "+1 (555) 123-4567", color: "from-green-500 to-emerald-500" },
    { icon: Mail, label: "Email Support", description: "support@starkitchen.com", color: "from-purple-500 to-pink-500" },
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
          <h1 className="text-lg">Help Center</h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 pb-32">
        {/* Search */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-6 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input placeholder="Search for help..." className="pl-10" />
          </div>
        </motion.div>

        {/* FAQ Categories */}
        <section className="mb-8">
          <h2 className="text-sm mb-4">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqCategories.map((category, index) => (
              <motion.button
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="w-full bg-white rounded-2xl border border-border/50 p-4 hover:bg-accent transition-colors text-left"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm">{category.title}</h3>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </div>
                <p className="text-xs text-muted-foreground">{category.count} articles</p>
              </motion.button>
            ))}
          </div>
        </section>

        {/* Contact Options */}
        <section>
          <h2 className="text-sm mb-4">Contact Us</h2>
          <div className="space-y-3">
            {contactOptions.map((option, index) => (
              <motion.button
                key={option.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="w-full flex items-center gap-4 bg-white rounded-2xl border border-border/50 p-4 hover:bg-accent transition-colors"
              >
                <div className={`p-3 bg-gradient-to-br ${option.color} rounded-xl`}>
                  <option.icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-sm mb-0.5">{option.label}</h3>
                  <p className="text-xs text-muted-foreground">{option.description}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </motion.button>
            ))}
          </div>
        </section>
      </div>
    </motion.div>
  );
}
