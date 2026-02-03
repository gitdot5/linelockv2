import { Search, Phone, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Header = ({ searchQuery, onSearchChange }: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
      {/* Top bar */}
      <div className="bg-foreground text-card py-2 px-4">
        <div className="container mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Phone className="h-3 w-3" />
              1-800-555-EQUIP
            </span>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <a href="#" className="hover:text-primary transition-colors">Sell Your Equipment</a>
            <a href="#" className="hover:text-primary transition-colors">Dealer Login</a>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">HE</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-foreground">HeavyEquip</h1>
              <p className="text-xs text-muted-foreground">Construction Marketplace</p>
            </div>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search equipment..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 h-11 bg-secondary border-border"
              />
            </div>
          </div>

          {/* Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            <a href="#" className="text-foreground hover:text-primary font-medium transition-colors">Browse</a>
            <a href="#" className="text-foreground hover:text-primary font-medium transition-colors">Sell</a>
            <a href="#" className="text-foreground hover:text-primary font-medium transition-colors">Dealers</a>
            <Button>Get Quote</Button>
          </nav>

          {/* Mobile menu button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4 border-t border-border pt-4 flex flex-col gap-3">
            <a href="#" className="text-foreground hover:text-primary font-medium">Browse</a>
            <a href="#" className="text-foreground hover:text-primary font-medium">Sell</a>
            <a href="#" className="text-foreground hover:text-primary font-medium">Dealers</a>
            <Button className="w-full">Get Quote</Button>
          </nav>
        )}
      </div>
    </header>
  );
};
