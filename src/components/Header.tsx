import { Search, ShoppingBag } from "lucide-react";
import { Input } from "./ui/input";
import logoImage from "figma:asset/b75b14f30055320d302fe5382f1cffa6a1290544.png";

interface HeaderProps {
  onSearchClick: () => void;
  cartItemCount?: number;
  onCartClick?: () => void;
}

export function Header({ onSearchClick, cartItemCount = 0, onCartClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0">
              <img src={logoImage} alt="StarKitchen Logo" className="w-full h-full object-cover" />
            </div>
            <h1 className="text-xl">StarKitchen</h1>
          </div>
          <button 
            onClick={onCartClick}
            className="relative p-2 hover:bg-accent rounded-lg transition-colors"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>
        
        <div className="relative max-w-2xl" onClick={onSearchClick}>
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <Input 
            placeholder="Search supermart kitchen..." 
            className="pl-10 bg-input-background border-0 h-11 cursor-pointer"
            readOnly
          />
        </div>
      </div>
    </header>
  );
}