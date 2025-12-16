import { X, Heart, ShoppingCart, Star, ChevronLeft, Minus, Plus, Truck, Shield, RotateCcw } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

interface ProductDetailsPageProps {
  onClose: () => void;
  product: {
    id: string;
    image: string;
    name: string;
    price: string;
    rating: number;
    badge?: string;
    category?: string;
  };
  isFavorite: boolean;
  onFavoriteToggle: () => void;
  onAddToCart: (quantity: number) => void;
}

export function ProductDetailsPage({ 
  onClose, 
  product, 
  isFavorite, 
  onFavoriteToggle,
  onAddToCart 
}: ProductDetailsPageProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const productImages = [
    product.image,
    product.image,
    product.image,
  ];

  const reviews = [
    { id: 1, name: "Sarah M.", rating: 5, comment: "Excellent quality! Highly recommend.", date: "2 days ago" },
    { id: 2, name: "John D.", rating: 4, comment: "Great product, fast shipping.", date: "1 week ago" },
    { id: 3, name: "Emma W.", rating: 5, comment: "Perfect for my kitchen. Love it!", date: "2 weeks ago" },
  ];

  const handleAddToCart = () => {
    onAddToCart(quantity);
  };

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
        className="min-h-screen bg-white md:min-h-0 md:max-w-4xl md:mx-auto md:my-8 md:rounded-2xl overflow-hidden"
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
            <h1 className="flex-1 text-center">Product Details</h1>
            <button
              onClick={onFavoriteToggle}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Heart
                className={`w-6 h-6 ${
                  isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="pb-32 md:pb-8">
          {/* Image Gallery */}
          <div className="relative">
            <img
              src={productImages[selectedImage]}
              alt={product.name}
              className="w-full h-80 md:h-96 object-cover"
            />
            {product.badge && (
              <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs ${
                product.badge === "SALE" ? "bg-red-500" : "bg-blue-500"
              } text-white`}>
                {product.badge}
              </div>
            )}
            
            {/* Image Thumbnails */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 px-4">
              {productImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index ? "border-blue-500 scale-105" : "border-white"
                  }`}
                >
                  <img src={img} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="p-6 space-y-6">
            {/* Title and Price */}
            <div>
              <h2 className="text-2xl mb-2">{product.name}</h2>
              <div className="flex items-center gap-4">
                <p className="text-3xl text-yellow-600">${product.price}</p>
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span>{product.rating}</span>
                  <span className="text-muted-foreground">(124 reviews)</span>
                </div>
              </div>
              {product.category && (
                <p className="text-sm text-muted-foreground mt-2">
                  Category: {product.category}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <h3 className="mb-2">Description</h3>
              <p className="text-muted-foreground leading-relaxed">
                Experience premium quality with our {product.name}. Crafted with attention to detail 
                and built to last, this product combines functionality with elegant design. Perfect 
                for both everyday use and special occasions.
              </p>
            </div>

            {/* Features */}
            <div>
              <h3 className="mb-3">Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl">
                  <Truck className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm">Free Shipping</p>
                    <p className="text-xs text-muted-foreground">On orders over $50</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-green-50 to-green-100/50 rounded-xl">
                  <Shield className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm">Quality Guarantee</p>
                    <p className="text-xs text-muted-foreground">1 year warranty</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-yellow-50 to-amber-100/50 rounded-xl">
                  <RotateCcw className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="text-sm mb-1">30-Day Returns</p>
                    <p className="text-xs text-muted-foreground">Easy return policy for your peace of mind</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Reviews */}
            <div>
              <h3 className="mb-4">Customer Reviews</h3>
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <p>{review.name}</p>
                      <span className="text-xs text-muted-foreground">{review.date}</span>
                    </div>
                    <div className="flex gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Action Bar */}
        <div className="fixed bottom-0 left-0 right-0 md:absolute bg-white border-t border-gray-200 p-4 md:rounded-b-2xl">
          <div className="max-w-4xl mx-auto flex items-center gap-4">
            {/* Quantity Selector */}
            <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 hover:bg-white rounded-lg transition-colors"
                disabled={quantity <= 1}
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 hover:bg-white rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-gradient-to-r from-yellow-500 to-red-500 hover:from-yellow-600 hover:to-red-600 text-white py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-yellow-500/30"
            >
              <ShoppingCart className="w-5 h-5" />
              Add to Cart · ${(parseFloat(product.price) * quantity).toFixed(2)}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}