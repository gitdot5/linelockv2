import { Equipment } from '@/data/equipment';
import { MapPin, Clock, Star, Heart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface EquipmentCardProps {
  equipment: Equipment;
  viewMode: 'grid' | 'list';
}

export const EquipmentCard = ({ equipment, viewMode }: EquipmentCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const conditionColors = {
    'New': 'bg-success text-success-foreground',
    'Used': 'bg-muted text-muted-foreground',
    'Certified Pre-Owned': 'bg-primary text-primary-foreground',
  };

  if (viewMode === 'list') {
    return (
      <div className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col sm:flex-row">
        <div className="relative w-full sm:w-72 h-48 sm:h-auto flex-shrink-0">
          <img
            src={equipment.image}
            alt={equipment.title}
            className="w-full h-full object-cover"
          />
          {equipment.featured && (
            <div className="absolute top-2 left-2 flex items-center gap-1 bg-warning text-warning-foreground px-2 py-1 rounded text-xs font-medium">
              <Star className="h-3 w-3 fill-current" />
              Featured
            </div>
          )}
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="absolute top-2 right-2 p-2 bg-card/80 backdrop-blur-sm rounded-full hover:bg-card transition-colors"
          >
            <Heart className={`h-4 w-4 ${isFavorite ? 'fill-destructive text-destructive' : 'text-muted-foreground'}`} />
          </button>
        </div>

        <div className="flex-1 p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-4 mb-2">
              <h3 className="font-semibold text-foreground text-lg line-clamp-2">{equipment.title}</h3>
              <Badge className={conditionColors[equipment.condition]}>{equipment.condition}</Badge>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {equipment.location}
              </span>
              {equipment.hours && (
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {equipment.hours.toLocaleString()} hrs
                </span>
              )}
              <span>{equipment.year}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold text-price">{formatPrice(equipment.price)}</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Details</Button>
              <Button size="sm">Contact Seller</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
      <div className="relative h-48 overflow-hidden">
        <img
          src={equipment.image}
          alt={equipment.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {equipment.featured && (
          <div className="absolute top-2 left-2 flex items-center gap-1 bg-warning text-warning-foreground px-2 py-1 rounded text-xs font-medium">
            <Star className="h-3 w-3 fill-current" />
            Featured
          </div>
        )}
        <Badge className={`absolute top-2 right-12 ${conditionColors[equipment.condition]}`}>
          {equipment.condition}
        </Badge>
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-2 right-2 p-2 bg-card/80 backdrop-blur-sm rounded-full hover:bg-card transition-colors"
        >
          <Heart className={`h-4 w-4 ${isFavorite ? 'fill-destructive text-destructive' : 'text-muted-foreground'}`} />
        </button>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-foreground mb-2 line-clamp-2 min-h-[48px]">{equipment.title}</h3>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <MapPin className="h-4 w-4 flex-shrink-0" />
          <span className="truncate">{equipment.location}</span>
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
          <span>{equipment.year}</span>
          {equipment.hours && (
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {equipment.hours.toLocaleString()} hrs
            </span>
          )}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-border">
          <p className="text-xl font-bold text-price">{formatPrice(equipment.price)}</p>
          <Button size="sm">View Details</Button>
        </div>
      </div>
    </div>
  );
};
