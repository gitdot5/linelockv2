import { Equipment } from '@/data/equipment';
import { Clock, Star, Heart, Wrench, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface EquipmentCardProps {
  equipment: Equipment;
  viewMode: 'grid' | 'list';
  index?: number;
}

export const EquipmentCard = ({ equipment, viewMode, index = 0 }: EquipmentCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const staggerDelay = `${Math.min(index * 60, 400)}ms`;

  const formatPrice = (price?: number) => {
    if (price === undefined || price === null) {
      return 'Call for Price';
    }
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
      <div
        className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all duration-300 flex flex-col sm:flex-row opacity-0 animate-fade-in-up"
        style={{ animationDelay: staggerDelay, animationFillMode: 'forwards' }}
      >
        <div className="relative w-full sm:w-72 h-48 sm:h-auto flex-shrink-0 overflow-hidden">
          {!imageLoaded && <div className="absolute inset-0 skeleton-shimmer" />}
          <img
            src={equipment.image}
            alt={`${equipment.year} ${equipment.manufacturer} ${equipment.model || ''} ${equipment.category.replace(/-/g, ' ')} for sale`}
            loading="lazy"
            className={`w-full h-full object-cover transition-all duration-500 sm:hover:scale-105 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
          />
          {equipment.featured && (
            <div className="absolute top-2 left-2 flex items-center gap-1 bg-warning text-warning-foreground px-2 py-1 rounded text-xs font-medium">
              <Star className="h-3 w-3 fill-current" />
              Featured
            </div>
          )}
          <button
            onClick={(e) => { e.preventDefault(); setIsFavorite(!isFavorite); }}
            className="absolute top-2 right-2 p-2 bg-card/80 backdrop-blur-sm rounded-full hover:bg-card transition-all duration-200 hover:scale-110 active:scale-95"
          >
            <Heart className={`h-4 w-4 transition-all duration-200 ${isFavorite ? 'fill-destructive text-destructive scale-110' : 'text-muted-foreground'}`} />
          </button>
        </div>

        <div className="flex-1 p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-4 mb-2">
              <h3 className="font-semibold text-foreground text-lg line-clamp-2">{equipment.title}</h3>
              <Badge className={conditionColors[equipment.condition]}>{equipment.condition}</Badge>
            </div>

            {(equipment.make || equipment.engine) && (
              <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mb-2">
                {equipment.make && equipment.model && (
                  <span className="bg-muted px-2 py-0.5 rounded">{equipment.make} · {equipment.model}</span>
                )}
                {equipment.engine && (
                  <span className="bg-muted px-2 py-0.5 rounded flex items-center gap-1">
                    <Wrench className="h-3 w-3" />
                    {equipment.engine} Engine
                  </span>
                )}
              </div>
            )}

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
              {equipment.hours && (
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {equipment.hours} hrs
                </span>
              )}
              <span>{equipment.year}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold text-primary">{formatPrice(equipment.price)}</p>
            <div className="flex gap-2">
              {equipment.facebookUrl && (
                <Button variant="outline" size="sm" asChild>
                  <a href={equipment.facebookUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Listing
                  </a>
                </Button>
              )}
              <Button variant="outline" size="sm" asChild>
                <Link to={`/equipment/${equipment.id}`}>Details</Link>
              </Button>
              <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">Contact Seller</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all duration-300 group hover-lift opacity-0 animate-fade-in-up"
      style={{ animationDelay: staggerDelay, animationFillMode: 'forwards' }}
    >
      <div className="relative h-48 overflow-hidden">
        {!imageLoaded && <div className="absolute inset-0 skeleton-shimmer" />}
        <img
          src={equipment.image}
          alt={`${equipment.year} ${equipment.manufacturer} ${equipment.model || ''} ${equipment.category.replace(/-/g, ' ')} for sale`}
          loading="lazy"
          className={`w-full h-full object-cover group-hover:scale-105 transition-all duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
        />
        {equipment.featured && (
          <div className="absolute top-2 left-2 flex items-center gap-1 bg-warning text-warning-foreground px-2 py-1 rounded text-xs font-medium">
            <Star className="h-3 w-3 fill-current" />
            Featured
          </div>
        )}
        <div className="absolute top-2 right-2 flex items-center gap-1">
          {equipment.badges?.map((badge) => (
            <Badge key={badge} className="bg-accent text-accent-foreground text-xs">{badge}</Badge>
          ))}
          <Badge className={`${conditionColors[equipment.condition]}`}>
            {equipment.condition}
          </Badge>
          <button
            onClick={(e) => { e.preventDefault(); setIsFavorite(!isFavorite); }}
            className="p-2 bg-card/80 backdrop-blur-sm rounded-full hover:bg-card transition-all duration-200 hover:scale-110 active:scale-95"
          >
            <Heart className={`h-4 w-4 transition-all duration-200 ${isFavorite ? 'fill-destructive text-destructive scale-110' : 'text-muted-foreground'}`} />
          </button>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-foreground mb-1 line-clamp-2 min-h-[48px]">{equipment.title}</h3>
        
        {(equipment.make || equipment.engine) && (
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mb-2">
            {equipment.make && equipment.model && (
              <span className="bg-muted px-2 py-0.5 rounded">{equipment.make} · {equipment.model}</span>
            )}
            {equipment.engine && (
              <span className="bg-muted px-2 py-0.5 rounded flex items-center gap-1">
                <Wrench className="h-3 w-3" />
                {equipment.engine}
              </span>
            )}
          </div>
        )}

        <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
          <span>{equipment.year}</span>
          {equipment.hours && (
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {equipment.hours} hrs
            </span>
          )}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-border">
          <p className="text-xl font-bold text-primary">{formatPrice(equipment.price)}</p>
          <div className="flex gap-1">
            {equipment.facebookUrl && (
              <Button size="sm" variant="outline" asChild>
                <a href={equipment.facebookUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-3 w-3" />
                </a>
              </Button>
            )}
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
              <Link to={`/equipment/${equipment.id}`}>View Details</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
