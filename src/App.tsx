import { Header } from "./components/Header";
import { PromoCard } from "./components/PromoCard";
import { ProductCard } from "./components/ProductCard";
import { CategoryCard } from "./components/CategoryCard";
import { BottomNav } from "./components/BottomNav";
import { SearchPage } from "./components/SearchPage";
import { FavoritesPage } from "./components/FavoritesPage";
import { MenuPage } from "./components/MenuPage";
import { EditProfilePage } from "./components/EditProfilePage";
import { MyOrdersPage } from "./components/MyOrdersPage";
import { AddressesPage } from "./components/AddressesPage";
import { PaymentMethodsPage } from "./components/PaymentMethodsPage";
import { NotificationsPage } from "./components/NotificationsPage";
import { SettingsPage } from "./components/SettingsPage";
import { PrivacySecurityPage } from "./components/PrivacySecurityPage";
import { HelpCenterPage } from "./components/HelpCenterPage";
import { AboutPage } from "./components/AboutPage";
import { LoginPage } from "./components/LoginPage";
import { SignUpPage } from "./components/SignUpPage";
import { ProductDetailsPage } from "./components/ProductDetailsPage";
import { CartPage } from "./components/CartPage";
import { CheckoutPage } from "./components/CheckoutPage";
import { CategoryPage } from "./components/CategoryPage";
import { OrderTrackingPage } from "./components/OrderTrackingPage";
import { AllProductsPage } from "./components/AllProductsPage";
import { Blend, CookingPot, UtensilsCrossed, Coffee, Utensils, Wine, ChevronRight } from "lucide-react";
import { useState } from "react";
import { AnimatePresence } from "motion/react";

interface Product {
  id: string;
  image: string;
  name: string;
  price: string;
  rating: number;
  badge?: string;
  category?: string;
}

interface CartItem extends Product {
  quantity: number;
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [currentPage, setCurrentPage] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<{name: string; icon: any} | null>(null);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showAllProducts, setShowAllProducts] = useState<{title: string; subtitle?: string; products: Product[]} | null>(null);
  const [trackingOrderId, setTrackingOrderId] = useState<string | null>(null);
  
  const allProducts: Product[] = [
    {
      id: "1",
      image: "https://images.unsplash.com/photo-1738484708927-c1f45df0b56e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraXRjaGVuJTIwdXRlbnNpbHN8ZW58MXx8fHwxNzYxNzI3ODA3fDA&ixlib=rb-4.1.0&q=80&w=1080",
      name: "Premium Utensil Set",
      price: "49.99",
      rating: 4.8,
      badge: "NEW",
      category: "Cutlery"
    },
    {
      id: "2",
      image: "https://images.unsplash.com/photo-1648392345455-22bd0d2e0c74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBibGVuZGVyfGVufDF8fHx8MTc2MTgzMTAyM3ww&ixlib=rb-4.1.0&q=80&w=1080",
      name: "Smart Blender Pro",
      price: "89.99",
      rating: 4.9,
      badge: "SALE",
      category: "Blenders"
    },
    {
      id: "3",
      image: "https://images.unsplash.com/photo-1612455859448-ecf83d2b7e7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb29raW5nJTIwcG90cyUyMHBhbnN8ZW58MXx8fHwxNzYxODMxMDIzfDA&ixlib=rb-4.1.0&q=80&w=1080",
      name: "Cookware Set",
      price: "129.99",
      rating: 4.7,
      category: "Cookware"
    },
    {
      id: "4",
      image: "https://images.unsplash.com/photo-1669329606558-2dc9172d9f33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjZXJhbWljJTIwbXVnc3xlbnwxfHx8fDE3NjE4MzEwMjR8MA&ixlib=rb-4.1.0&q=80&w=1080",
      name: "Ceramic Mug Set",
      price: "24.99",
      rating: 4.6,
      category: "Mugs"
    },
    {
      id: "5",
      image: "https://images.unsplash.com/photo-1712153025601-141bb78cc50c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraXRjaGVuJTIwcGxhdGVzfGVufDF8fHx8MTc2MTgzMTAyNHww&ixlib=rb-4.1.0&q=80&w=1080",
      name: "Dinner Plate Set",
      price: "39.99",
      rating: 4.5,
      category: "Tableware"
    },
  ];
  
  const limitedTimeProducts = allProducts.slice(0, 3);
  const reorderProducts = allProducts.slice(3, 5);

  const toggleFavorite = (productId: string) => {
    const product = allProducts.find(p => p.id === productId);
    if (!product) return;
    
    setFavorites(prev => {
      const isFavorite = prev.some(fav => fav.id === productId);
      if (isFavorite) {
        return prev.filter(fav => fav.id !== productId);
      } else {
        return [...prev, product];
      }
    });
  };

  const removeFavorite = (productId: string) => {
    setFavorites(prev => prev.filter(fav => fav.id !== productId));
  };

  const isFavorite = (productId: string) => {
    return favorites.some(fav => fav.id === productId);
  };

  // Cart functions
  const addToCart = (product: Product, quantity: number) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      setCartItems(prev => prev.map(item => 
        item.id === product.id 
          ? {...item, quantity: item.quantity + quantity} 
          : item
      ));
    } else {
      setCartItems(prev => [...prev, {...product, quantity}]);
    }
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    setCartItems(prev => prev.map(item => 
      item.id === productId ? {...item, quantity} : item
    ));
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const handleCheckout = () => {
    setShowCart(false);
    setShowCheckout(true);
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleCategoryClick = (category: {name: string; icon: any}) => {
    setSelectedCategory(category);
  };
  
  const categories = [
    { icon: Blend, name: "Blenders" },
    { icon: CookingPot, name: "Cookware" },
    { icon: UtensilsCrossed, name: "Tableware" },
    { icon: Coffee, name: "Mugs" },
    { icon: Utensils, name: "Cutlery" },
    { icon: Wine, name: "Glassware" },
  ];

  // Show login page if not logged in
  if (!isLoggedIn) {
    if (showSignUp) {
      return (
        <SignUpPage 
          onSignUpSuccess={() => setIsLoggedIn(true)} 
          onBackToLogin={() => setShowSignUp(false)}
        />
      );
    }
    return (
      <LoginPage 
        onLoginSuccess={() => setIsLoggedIn(true)} 
        onSignUpClick={() => setShowSignUp(true)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24 md:pb-28">
      <Header 
        onSearchClick={() => setShowSearch(true)} 
        cartItemCount={cartItems.length}
        onCartClick={() => setShowCart(true)}
      />
      
      <main className="max-w-7xl mx-auto lg:px-8">
        <div className="max-w-full lg:max-w-none">
          <PromoCard />
          
          {/* Limited Time Section */}
          <section className="mt-6 md:mt-8 px-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg">Limited time</h2>
                <p className="text-xs text-muted-foreground">Special offers ending soon</p>
              </div>
              <button 
                onClick={() => setShowAllProducts({ 
                  title: "Limited Time Offers", 
                  subtitle: "Special offers ending soon",
                  products: allProducts 
                })}
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Show all <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
              {limitedTimeProducts.map((product) => (
                <div key={product.id} onClick={() => handleProductClick(product)}>
                  <ProductCard 
                    {...product} 
                    onFavoriteToggle={() => toggleFavorite(product.id)} 
                    isFavorite={isFavorite(product.id)} 
                  />
                </div>
              ))}
            </div>
          </section>
          
          {/* Categories Section */}
          <section className="mt-6 md:mt-8 px-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg">Categories</h2>
              <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                Show all <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 md:gap-4">
              {categories.map((category) => (
                <div key={category.name} onClick={() => handleCategoryClick(category)}>
                  <CategoryCard {...category} />
                </div>
              ))}
            </div>
          </section>
          
          {/* Reorder Section */}
          <section className="mt-6 md:mt-8 px-4 mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg">Reorder</h2>
                <p className="text-xs text-muted-foreground">Buy again from your orders</p>
              </div>
              <button 
                onClick={() => setShowAllProducts({ 
                  title: "Reorder Products", 
                  subtitle: "Buy again from your orders",
                  products: allProducts 
                })}
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Show all <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
              {reorderProducts.map((product) => (
                <div key={product.id} onClick={() => handleProductClick(product)}>
                  <ProductCard 
                    {...product} 
                    onFavoriteToggle={() => toggleFavorite(product.id)} 
                    isFavorite={isFavorite(product.id)} 
                  />
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      
      <BottomNav 
        onSearchClick={() => setShowSearch(true)} 
        onFavoritesClick={() => setShowFavorites(true)} 
        onMenuClick={() => setShowMenu(true)}
      />
      
      <AnimatePresence>
        {showSearch && <SearchPage onClose={() => setShowSearch(false)} />}
        {showFavorites && <FavoritesPage onClose={() => setShowFavorites(false)} favorites={favorites} onRemoveFavorite={removeFavorite} />}
        {showMenu && <MenuPage onClose={() => setShowMenu(false)} onNavigate={(page) => { setCurrentPage(page); setShowMenu(false); }} onLogout={() => { setIsLoggedIn(false); setShowMenu(false); }} />}
        {currentPage === "editProfile" && <EditProfilePage onClose={() => setCurrentPage(null)} />}
        {currentPage === "myOrders" && <MyOrdersPage onClose={() => setCurrentPage(null)} />}
        {currentPage === "addresses" && <AddressesPage onClose={() => setCurrentPage(null)} />}
        {currentPage === "paymentMethods" && <PaymentMethodsPage onClose={() => setCurrentPage(null)} />}
        {currentPage === "notifications" && <NotificationsPage onClose={() => setCurrentPage(null)} />}
        {currentPage === "settings" && <SettingsPage onClose={() => setCurrentPage(null)} />}
        {currentPage === "privacySecurity" && <PrivacySecurityPage onClose={() => setCurrentPage(null)} />}
        {currentPage === "helpCenter" && <HelpCenterPage onClose={() => setCurrentPage(null)} />}
        {currentPage === "about" && <AboutPage onClose={() => setCurrentPage(null)} />}
        {selectedProduct && (
          <ProductDetailsPage 
            product={selectedProduct} 
            onClose={() => setSelectedProduct(null)} 
            isFavorite={isFavorite(selectedProduct.id)}
            onFavoriteToggle={() => toggleFavorite(selectedProduct.id)}
            onAddToCart={(quantity) => {
              addToCart(selectedProduct, quantity);
              setSelectedProduct(null);
            }} 
          />
        )}
        {showCart && (
          <CartPage 
            cartItems={cartItems} 
            onClose={() => setShowCart(false)} 
            onUpdateQuantity={updateCartQuantity}
            onRemoveItem={removeFromCart}
            onCheckout={handleCheckout}
          />
        )}
        {showCheckout && (
          <CheckoutPage 
            cartItems={cartItems} 
            onClose={() => setShowCheckout(false)} 
            onPlaceOrder={() => {
              alert('Order placed successfully!');
              setCartItems([]);
              setShowCheckout(false);
            }}
          />
        )}
        {selectedCategory && (
          <CategoryPage 
            category={selectedCategory} 
            products={allProducts.filter(p => p.category === selectedCategory.name)}
            onClose={() => setSelectedCategory(null)}
            onProductClick={handleProductClick}
            onFavoriteToggle={toggleFavorite}
            isFavorite={isFavorite}
          />
        )}
        {trackingOrderId && (
          <OrderTrackingPage 
            orderId={trackingOrderId} 
            onClose={() => setTrackingOrderId(null)} 
          />
        )}
        {showAllProducts && (
          <AllProductsPage 
            title={showAllProducts.title} 
            subtitle={showAllProducts.subtitle} 
            products={showAllProducts.products} 
            onClose={() => setShowAllProducts(null)}
            onProductClick={handleProductClick}
            onFavoriteToggle={toggleFavorite}
            isFavorite={isFavorite}
          />
        )}
      </AnimatePresence>
    </div>
  );
}