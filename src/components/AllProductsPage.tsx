import { X, ChevronLeft } from "lucide-react";
import { motion } from "motion/react";
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

interface AllProductsPageProps {
  onClose: () => void;
  title: string;
  subtitle?: string;
  products: Product[];
  onProductClick: (product: Product) => void;
  onFavoriteToggle: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
}

export function AllProductsPage({
  onClose,
  title,
  subtitle,
  products,
  onProductClick,
  onFavoriteToggle,
  isFavorite,
}: AllProductsPageProps) {
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
            <div className="flex-1 text-center">
              <h1 className="text-xl">{title}</h1>
              {subtitle && (
                <p className="text-xs text-muted-foreground">{subtitle}</p>
              )}
            </div>
            <div className="w-10" />
          </div>
        </div>

        {/* Products Grid */}
        <div className="p-4 md:p-6 pb-8">
          <div className="mb-4 text-sm text-muted-foreground">
            {products.length} {products.length === 1 ? "product" : "products"}
          </div>

          {products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-4">
                <span className="text-4xl">🛍️</span>
              </div>
              <h2 className="text-xl mb-2">No products available</h2>
              <p className="text-muted-foreground">
                Check back later for new items!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
              {products.map((product) => (
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
