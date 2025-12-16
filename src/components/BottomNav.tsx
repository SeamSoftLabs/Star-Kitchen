import { Home, Search, Heart, Menu } from "lucide-react";
import { useState } from "react";

interface BottomNavProps {
  onSearchClick: () => void;
  onFavoritesClick: () => void;
  onMenuClick: () => void;
}

export function BottomNav({ onSearchClick, onFavoritesClick, onMenuClick }: BottomNavProps) {
  const [active, setActive] = useState("home");
  
  const navItems = [
    { id: "home", icon: Home, label: "Home" },
    { id: "search", icon: Search, label: "Search" },
    { id: "favorites", icon: Heart, label: "Favorites" },
    { id: "menu", icon: Menu, label: "Menu" },
  ];
  
  const handleNavClick = (id: string) => {
    setActive(id);
    if (id === "search") {
      onSearchClick();
    } else if (id === "favorites") {
      onFavoritesClick();
    } else if (id === "menu") {
      onMenuClick();
    }
  };
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-border/50 px-4 pb-safe z-40 md:pb-4">
      <div className="max-w-7xl mx-auto flex items-center justify-around py-3">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavClick(item.id)}
            className={`flex flex-col items-center gap-1 p-2 md:px-4 rounded-xl transition-all ${ 
              active === item.id 
                ? "text-black bg-accent" 
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-xs">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}