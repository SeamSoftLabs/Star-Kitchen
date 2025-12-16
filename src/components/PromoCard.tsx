import { ArrowRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";

export function PromoCard() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-yellow-50 to-amber-50 p-6 md:p-8 mx-4 mt-4"
    >
      <div className="flex items-center justify-between gap-6">
        <div className="flex-1">
          <div className="inline-block bg-red-500 text-white px-3 py-1 rounded-full text-sm mb-2">
            30% off
          </div>
          <h2 className="text-lg mb-1">Elegant kitchenware</h2>
          <p className="text-sm text-muted-foreground mb-3">Premium collection on sale</p>
          <button className="inline-flex items-center gap-1 text-sm text-red-500 hover:gap-2 transition-all">
            Shop now <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="w-24 h-24 md:w-32 md:h-32 relative flex-shrink-0">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1626108861691-d826b7d75ac8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwY29va3dhcmUlMjBraXRjaGVufGVufDF8fHx8MTc2MTgzMTAyM3ww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Elegant cookware"
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
      </div>
    </motion.div>
  );
}