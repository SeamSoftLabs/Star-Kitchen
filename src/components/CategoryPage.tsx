import { X, ChevronLeft, SlidersHorizontal } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { ProductCard } from "./ProductCard";

interface Product {
  id: string;
  image: string;
  name: string;
  price: string;
  rating: number;
  badge?: string;
  category?: string;
}

interface CategoryPageProps {
  onClose: () => void;
  category: {
    name: string;
    icon: React.ComponentType<{ className?: string }>;
  };
  products: Product[];
  onProductClick: (product: Product) => void;
  onFavoriteToggle: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
}

export function CategoryPage({ 
  onClose, 
  category, 
  products,
  onProductClick,
  onFavoriteToggle,
  isFavorite
}: CategoryPageProps) {
  const [sortBy, setSortBy] = useState<"popular" | "price-low" | "price-high" | "rating">("popular");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);

  const Icon = category.icon;

  // Filter and sort products
  const filteredProducts = products.filter(
    (p) => parseFloat(p.price) >= priceRange[0] && parseFloat(p.price) <= priceRange[1]
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return parseFloat(a.price) - parseFloat(b.price);
      case "price-high":
        return parseFloat(b.price) - parseFloat(a.price);
      case "rating":
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 md:min-h-0 md:max-w-6xl md:mx-auto md:my-8 md:rounded-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white/80 backdrop-blur-md z-10 border-b border-gray-100">
          <div className="flex items-center justify-between p-4">
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="flex-1 flex items-center justify-center gap-2">
              <Icon className="w-6 h-6 text-blue-600" />
              <h1 className="text-xl">{category.name}</h1>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <SlidersHorizontal className="w-6 h-6" />
            </button>
          </div>

          {/* Filters & Sort */}
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-gray-100 overflow-hidden"
            >
              <div className="p-4 space-y-4">
                {/* Sort Options */}
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">
                    Sort By
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { value: "popular", label: "Popular" },
                      { value: "price-low", label: "Price: Low to High" },
                      { value: "price-high", label: "Price: High to Low" },
                      { value: "rating", label: "Top Rated" },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setSortBy(option.value as any)}
                        className={`py-2 px-3 rounded-lg text-sm transition-all ${
                          sortBy === option.value
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 hover:bg-gray-200"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">
                    Price Range: ${priceRange[0]} - ${priceRange[1]}
                  </label>
                  <div className="flex gap-4 items-center">
                    <input
                      type="range"
                      min="0"
                      max="200"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Products Grid */}
        <div className="p-4 md:p-6 pb-8">
          <div className="mb-4 text-sm text-muted-foreground">
            {sortedProducts.length} {sortedProducts.length === 1 ? "product" : "products"} found
          </div>

          {sortedProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-4">
                <Icon className="w-12 h-12 text-gray-400" />
              </div>
              <h2 className="text-xl mb-2">No products found</h2>
              <p className="text-muted-foreground mb-6">
                Try adjusting your filters
              </p>
              <button
                onClick={() => setPriceRange([0, 200])}
                className="text-blue-600 hover:underline"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
              {sortedProducts.map((product) => (
                <div key={product.id} onClick={() => onProductClick(product)}>
                  <ProductCard
                    {...product}
                    onFavoriteToggle={() => onFavoriteToggle(product.id)}
                    isFavorite={isFavorite(product.id)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
