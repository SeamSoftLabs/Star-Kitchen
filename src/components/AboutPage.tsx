import { motion } from "motion/react";
import { ArrowLeft, Sparkles, Users, Award, Heart } from "lucide-react";

interface AboutPageProps {
  onClose: () => void;
}

export function AboutPage({ onClose }: AboutPageProps) {
  const features = [
    { icon: Sparkles, title: "Premium Quality", description: "Curated kitchen products", color: "from-yellow-500 to-amber-500" },
    { icon: Users, title: "100K+ Users", description: "Trusted by home chefs", color: "from-blue-500 to-cyan-500" },
    { icon: Award, title: "Award Winning", description: "Best shopping app 2024", color: "from-purple-500 to-pink-500" },
    { icon: Heart, title: "Made with Love", description: "By kitchen enthusiasts", color: "from-red-500 to-rose-500" },
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
          <h1 className="text-lg">About StarKitchen</h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 pb-32">
        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8 mb-8">
          <div className="bg-gradient-to-br from-yellow-500 to-red-500 rounded-2xl p-8 text-white text-center">
            <div className="inline-flex p-4 bg-white/20 backdrop-blur-sm rounded-full mb-4">
              <Sparkles className="w-8 h-8" />
            </div>
            <h2 className="text-2xl mb-2">StarKitchen</h2>
            <p className="text-sm opacity-90 mb-1">Version 2.0.1</p>
            <p className="text-xs opacity-75">Build 2024.11.21</p>
          </div>
        </motion.div>

        {/* Mission */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl border border-border/50 p-6 mb-6">
          <h3 className="text-sm mb-3">Our Mission</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            StarKitchen is dedicated to bringing premium kitchen products to home chefs and cooking enthusiasts. 
            We believe that great meals start with great tools, and we're here to make your culinary journey exceptional.
          </p>
        </motion.div>

        {/* Features */}
        <section className="mb-6">
          <h3 className="text-sm mb-4">What Makes Us Special</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="bg-white rounded-2xl border border-border/50 p-4"
              >
                <div className={`inline-flex p-2.5 bg-gradient-to-br ${feature.color} rounded-xl mb-3`}>
                  <feature.icon className="w-5 h-5 text-white" />
                </div>
                <h4 className="text-sm mb-1">{feature.title}</h4>
                <p className="text-xs text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Legal Links */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="bg-white rounded-2xl border border-border/50 overflow-hidden">
          <button className="w-full p-4 text-left hover:bg-accent transition-colors">
            <p className="text-sm">Terms of Service</p>
          </button>
          <div className="h-px bg-border mx-4" />
          <button className="w-full p-4 text-left hover:bg-accent transition-colors">
            <p className="text-sm">Privacy Policy</p>
          </button>
          <div className="h-px bg-border mx-4" />
          <button className="w-full p-4 text-left hover:bg-accent transition-colors">
            <p className="text-sm">Licenses</p>
          </button>
        </motion.div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          © 2024 StarKitchen. All rights reserved.
        </p>
      </div>
    </motion.div>
  );
}