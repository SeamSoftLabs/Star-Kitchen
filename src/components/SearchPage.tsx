import { useState } from "react";
import { Search, X, Clock, TrendingUp, SlidersHorizontal, ArrowLeft } from "lucide-react";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { ProductCard } from "./ProductCard";
import { motion, AnimatePresence } from "motion/react";

interface SearchPageProps {
  onClose: () => void;
}

export function SearchPage({ onClose }: SearchPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const recentSearches = [
    "Kitchen utensils",
    "Coffee mugs",
    "Non-stick pans",
    "Wine glasses"
  ];

  const trendingSearches = [
    "Air fryer",
    "Espresso machine",
    "Knife set",
    "Mixing bowls"
  ];

  const categories = [
    "All",
    "Blenders",
    "Cookware",
    "Tableware",
    "Mugs",
    "Cutlery",
    "Glassware"
  ];

  const allProducts = [
    {
      image: "https://images.unsplash.com/photo-1738484708927-c1f45df0b56e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraXRjaGVuJTIwdXRlbnNpbHN8ZW58MXx8fHwxNzYxNzI3ODA3fDA&ixlib=rb-4.1.0&q=80&w=1080",
      name: "Premium Utensil Set",
      price: "49.99",
      rating: 4.8,
      badge: "NEW",
      category: "Cutlery"
    },
    {
      image: "https://images.unsplash.com/photo-1648392345455-22bd0d2e0c74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBibGVuZGVyfGVufDF8fHx8MTc2MTgzMTAyM3ww&ixlib=rb-4.1.0&q=80&w=1080",
      name: "Smart Blender Pro",
      price: "89.99",
      rating: 4.9,
      badge: "SALE",
      category: "Blenders"
    },
    {
      image: "https://images.unsplash.com/photo-1612455859448-ecf83d2b7e7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb29raW5nJTIwcG90cyUyMHBhbnN8ZW58MXx8fHwxNzYxODMxMDIzfDA&ixlib=rb-4.1.0&q=80&w=1080",
      name: "Cookware Set",
      price: "129.99",
      rating: 4.7,
      category: "Cookware"
    },
    {
      image: "https://images.unsplash.com/photo-1669329606558-2dc9172d9f33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjZXJhbWljJTIwbXVnc3xlbnwxfHx8fDE3NjE4MzEwMjR8MA&ixlib=rb-4.1.0&q=80&w=1080",
      name: "Ceramic Mug Set",
      price: "24.99",
      rating: 4.6,
      category: "Mugs"
    },
    {
      image: "https://images.unsplash.com/photo-1712153025601-141bb78cc50c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraXRjaGVuJTIwcGxhdGVzfGVufDF8fHx8MTc2MTgzMTAyNHww&ixlib=rb-4.1.0&q=80&w=1080",
      name: "Dinner Plate Set",
      price: "39.99",
      rating: 4.5,
      category: "Tableware"
    },
    {
      image: "https://images.unsplash.com/photo-1584990347449-39dbb48f0ea0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW5lJTIwZ2xhc3N8ZW58MXx8fHwxNzYxODMxMDI0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      name: "Crystal Wine Glasses",
      price: "54.99",
      rating: 4.8,
      category: "Glassware"
    },
    {
      image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3JrJTIwc3Bvb24lMjBrbmlmZXxlbnwxfHx8fDE3NjE4MzEwMjR8MA&ixlib=rb-4.1.0&q=80&w=1080",
      name: "Stainless Steel Cutlery",
      price: "34.99",
      rating: 4.7,
      category: "Cutlery"
    },
    {
      image: "https://images.unsplash.com/photo-1585515320310-259814833e62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxub24lMjBzdGljayUyMHBhbnxlbnwxfHx8fDE3NjE4MzEwMjR8MA&ixlib=rb-4.1.0&q=80&w=1080",
      name: "Non-Stick Pan Set",
      price: "79.99",
      rating: 4.6,
      badge: "POPULAR",
      category: "Cookware"
    }
  ];

  const filteredProducts = allProducts.filter(product => {
    const matchesSearch = searchQuery === "" || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || 
      selectedCategory === "All" || 
      product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSearchClick = (query: string) => {
    setSearchQuery(query);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="fixed inset-0 bg-white z-50 overflow-y-auto"
    >
      {/* Header */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-border/50 px-4 py-4 z-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <button
              onClick={onClose}
              className="p-2 hover:bg-accent rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-lg">Search Products</h1>
          </div>

          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for kitchen products..."
              className="pl-10 pr-10 bg-input-background border-0 h-11"
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-accent rounded-full transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-1 scrollbar-hide">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border hover:bg-accent transition-colors whitespace-nowrap">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span className="text-sm">Filters</span>
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category === "All" ? null : category)}
                className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-all ${
                  (selectedCategory === category || (!selectedCategory && category === "All"))
                    ? "bg-black text-white"
                    : "border border-border hover:bg-accent"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 pb-24">
        {searchQuery === "" ? (
          <>
            {/* Recent Searches */}
            <section className="mt-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm">Recent Searches</h2>
                <button className="text-sm text-muted-foreground hover:text-foreground">
                  Clear all
                </button>
              </div>
              <div className="space-y-2">
                {recentSearches.map((search, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleSearchClick(search)}
                    className="flex items-center gap-3 w-full p-3 hover:bg-accent rounded-xl transition-colors"
                  >
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <span className="text-sm">{search}</span>
                  </motion.button>
                ))}
              </div>
            </section>

            {/* Trending Searches */}
            <section className="mt-8">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-4 h-4" />
                <h2 className="text-sm">Trending Searches</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {trendingSearches.map((search, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleSearchClick(search)}
                  >
                    <Badge
                      variant="secondary"
                      className="px-3 py-1.5 hover:bg-accent cursor-pointer"
                    >
                      {search}
                    </Badge>
                  </motion.button>
                ))}
              </div>
            </section>

            {/* Popular Products */}
            <section className="mt-8">
              <h2 className="text-sm mb-3">Popular Products</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {allProducts.slice(0, 4).map((product, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <ProductCard {...product} />
                  </motion.div>
                ))}
              </div>
            </section>
          </>
        ) : (
          <>
            {/* Search Results */}
            <section className="mt-6">
              <div className="mb-4">
                <p className="text-sm text-muted-foreground">
                  {filteredProducts.length} results found
                  {selectedCategory && selectedCategory !== "All" && (
                    <span> in {selectedCategory}</span>
                  )}
                </p>
              </div>

              <AnimatePresence mode="popLayout">
                {filteredProducts.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {filteredProducts.map((product, index) => (
                      <motion.div
                        key={product.name}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <ProductCard {...product} />
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12"
                  >
                    <div className="inline-flex p-4 bg-gray-100 rounded-full mb-4">
                      <Search className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="mb-2">No results found</h3>
                    <p className="text-sm text-muted-foreground">
                      Try searching with different keywords
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </section>
          </>
        )}
      </div>
    </motion.div>
  );
}