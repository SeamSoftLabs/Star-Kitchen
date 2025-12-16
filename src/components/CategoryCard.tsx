import { motion } from "motion/react";
import { LucideIcon } from "lucide-react";

interface CategoryCardProps {
  icon: LucideIcon;
  name: string;
}

export function CategoryCard({ icon: Icon, name }: CategoryCardProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex flex-col items-center gap-2 p-4 md:p-5 rounded-2xl bg-white border border-border/50 hover:border-border hover:shadow-sm transition-all"
    >
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-3 md:p-4 rounded-xl">
        <Icon className="w-6 h-6 md:w-7 md:h-7 text-gray-700" />
      </div>
      <span className="text-sm text-center leading-tight">{name}</span>
    </motion.button>
  );
}