import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Heart, ShoppingCart, Trash2 } from "lucide-react";
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

interface FavoritesPageProps {
  onClose: () => void;
  favorites: Product[];
  onRemoveFavorite: (id: string) => void;
}

export function FavoritesPage({ onClose, favorites, onRemoveFavorite }: FavoritesPageProps) {
  const totalValue = favorites.reduce((sum, product) => sum + parseFloat(product.price), 0);

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
          <div className="flex-1">
            <h1 className="text-lg">My Favorites</h1>
            <p className="text-xs text-muted-foreground">
              {favorites.length} {favorites.length === 1 ? 'item' : 'items'} saved
            </p>
          </div>
          {favorites.length > 0 && (
            <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-yellow-500 to-red-500 rounded-xl">
              <Heart className="w-4 h-4 text-white fill-white" />
              <span className="text-sm text-white">{favorites.length}</span>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 pb-32">
        {favorites.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex p-6 bg-gradient-to-br from-yellow-100 to-amber-100 rounded-full mb-6"
            >
              <Heart className="w-12 h-12 text-yellow-600" />
            </motion.div>
            <h2 className="text-xl mb-2">No favorites yet</h2>
            <p className="text-sm text-muted-foreground mb-6 max-w-xs">
              Start adding products to your favorites by tapping the heart icon
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-black text-white rounded-xl hover:bg-black/90 transition-colors"
            >
              Start Shopping
            </button>
          </motion.div>
        ) : (
          <>
            {/* Summary Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 mb-6"
            >
              <div className="bg-gradient-to-br from-yellow-500 to-red-500 rounded-2xl p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm opacity-90 mb-1">Total Value</p>
                    <h2 className="text-3xl">${totalValue.toFixed(2)}</h2>
                  </div>
                  <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                    <Heart className="w-6 h-6 fill-white" />
                  </div>
                </div>
                <button className="w-full bg-white text-black py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-white/90 transition-colors">
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add All to Cart</span>
                </button>
              </div>
            </motion.div>

            {/* Products Grid */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm">Your Collection</h2>
                <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Sort by
                </button>
              </div>

              <AnimatePresence mode="popLayout">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {favorites.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ delay: index * 0.05 }}
                      className="relative"
                    >
                      <ProductCard {...product} isFavorite={true} />
                      <button
                        onClick={() => onRemoveFavorite(product.id)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600 transition-colors z-10"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              </AnimatePresence>
            </section>

            {/* Quick Actions */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 mb-6"
            >
              <h2 className="text-sm mb-3">Quick Actions</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <button className="p-4 bg-white rounded-xl border border-border hover:bg-accent transition-colors text-left">
                  <ShoppingCart className="w-5 h-5 mb-2" />
                  <p className="text-sm">Add to Cart</p>
                  <p className="text-xs text-muted-foreground">All items</p>
                </button>
                <button className="p-4 bg-white rounded-xl border border-border hover:bg-accent transition-colors text-left">
                  <Heart className="w-5 h-5 mb-2" />
                  <p className="text-sm">Share List</p>
                  <p className="text-xs text-muted-foreground">With friends</p>
                </button>
              </div>
            </motion.section>
          </>
        )}
      </div>
    </motion.div>
  );
}