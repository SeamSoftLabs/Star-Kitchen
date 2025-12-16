import { Heart, Plus } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";
import { useState } from "react";

interface ProductCardProps {
  image: string;
  name: string;
  price: string;
  rating: number;
  badge?: string;
  isFavorite?: boolean;
  onFavoriteToggle?: () => void;
}

export function ProductCard({ image, name, price, rating, badge, isFavorite: externalIsFavorite, onFavoriteToggle }: ProductCardProps) {
  const [internalIsFavorite, setInternalIsFavorite] = useState(false);
  
  const isFavorite = externalIsFavorite !== undefined ? externalIsFavorite : internalIsFavorite;
  
  const handleFavoriteClick = () => {
    if (onFavoriteToggle) {
      onFavoriteToggle();
    } else {
      setInternalIsFavorite(!internalIsFavorite);
    }
  };
  
  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="relative bg-white rounded-2xl overflow-hidden border border-border/50 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100">
        <ImageWithFallback 
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
        {badge && (
          <div className="absolute top-2 left-2 bg-black text-white px-2 py-1 rounded-lg text-xs">
            {badge}
          </div>
        )}
        <button 
          onClick={handleFavoriteClick}
          className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors hover:scale-110 active:scale-95"
        >
          <Heart className={`w-4 h-4 transition-colors ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
        </button>
      </div>
      
      <div className="p-3 md:p-4">
        <div className="flex items-start justify-between mb-1">
          <h3 className="text-sm line-clamp-2 flex-1 min-w-0">{name}</h3>
          <div className="flex items-center gap-1 ml-2 flex-shrink-0">
            <span className="text-yellow-500">★</span>
            <span className="text-xs text-muted-foreground">{rating}</span>
          </div>
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-sm">${price}</span>
          <button className="bg-black text-white p-1.5 md:p-2 rounded-lg hover:bg-black/90 transition-all hover:scale-105 active:scale-95">
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}