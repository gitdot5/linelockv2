import { Search, Phone, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import logo from '@/assets/logo.png';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Header = ({ searchQuery, onSearchChange }: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-dark-bg border-b border-dark-bg-light sticky top-0 z-50 shadow-sm">
      {/* Top bar */}
      <div className="bg-dark-bg-light py-2 px-4">
        <div className="container mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center gap-4 text-white/80">
            <span className="text-primary font-medium">🔥 Up to $2,000 OFF Select Equipment!</span>
            <span className="hidden md:inline">0% Financing Available</span>
          </div>
          <div className="flex items-center gap-4 text-white/80">
            <span className="flex items-center gap-1">
              <Phone className="h-3 w-3" />
              (864) 252-7174
            </span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center">
            <img src={logo} alt="LineLock Equipment" className="h-10 md:h-12 w-auto" />
          </div>

          {/* Search */}
          <div className="flex-1 max-w-2xl hidden sm:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
              <Input
                type="text"
                placeholder="Search equipment..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 h-11 bg-dark-bg-light border-dark-bg-light text-white placeholder:text-white/40"
              />
            </div>
          </div>

          {/* Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            <a href="#" className="text-primary font-medium transition-colors">Home</a>
            <a href="#" className="text-white hover:text-primary font-medium transition-colors">About</a>
            <a href="#" className="text-white hover:text-primary font-medium transition-colors">Products</a>
            <a href="#" className="text-white hover:text-primary font-medium transition-colors">Blog</a>
            <a href="#" className="text-white hover:text-primary font-medium transition-colors">Contact</a>
            <Button className="bg-primary text-dark-bg hover:bg-primary/90 font-semibold">GET A QUOTE</Button>
          </nav>

          {/* Mobile menu button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="lg:hidden text-white hover:bg-dark-bg-light"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>

        {/* Mobile search */}
        <div className="sm:hidden mt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
            <Input
              type="text"
              placeholder="Search equipment..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 h-11 bg-dark-bg-light border-dark-bg-light text-white placeholder:text-white/40"
            />
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4 border-t border-dark-bg-light pt-4 flex flex-col gap-3">
            <a href="#" className="text-primary font-medium">Home</a>
            <a href="#" className="text-white hover:text-primary font-medium">About</a>
            <a href="#" className="text-white hover:text-primary font-medium">Products</a>
            <a href="#" className="text-white hover:text-primary font-medium">Blog</a>
            <a href="#" className="text-white hover:text-primary font-medium">Contact</a>
            <Button className="w-full bg-primary text-dark-bg hover:bg-primary/90 font-semibold">GET A QUOTE</Button>
          </nav>
        )}
      </div>
    </header>
  );
};
