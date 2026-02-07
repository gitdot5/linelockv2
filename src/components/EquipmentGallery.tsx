import { useState } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

interface EquipmentGalleryProps {
  images: string[];
  title: string;
}

export const EquipmentGallery = ({ images, title }: EquipmentGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const goTo = (index: number) => {
    setActiveIndex((index + images.length) % images.length);
  };

  return (
    <>
      {/* Main image */}
      <div className="relative rounded-lg overflow-hidden bg-muted border border-border group">
        <img
          src={images[activeIndex]}
          alt={`${title} - Image ${activeIndex + 1}`}
          className="w-full h-72 sm:h-96 lg:h-[480px] object-cover cursor-pointer transition-transform duration-300"
          onClick={() => setIsZoomed(true)}
        />
        <button
          onClick={() => setIsZoomed(true)}
          className="absolute bottom-4 right-4 p-2 bg-card/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ZoomIn className="h-5 w-5 text-foreground" />
        </button>
        {images.length > 1 && (
          <>
            <button
              onClick={() => goTo(activeIndex - 1)}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-card/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-card"
            >
              <ChevronLeft className="h-5 w-5 text-foreground" />
            </button>
            <button
              onClick={() => goTo(activeIndex + 1)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-card/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-card"
            >
              <ChevronRight className="h-5 w-5 text-foreground" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`flex-shrink-0 w-20 h-16 rounded-md overflow-hidden border-2 transition-all ${
                i === activeIndex ? 'border-primary ring-1 ring-primary' : 'border-border opacity-60 hover:opacity-100'
              }`}
            >
              <img src={img} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {isZoomed && (
        <div
          className="fixed inset-0 z-50 bg-dark-bg/95 flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setIsZoomed(false)}
        >
          <img
            src={images[activeIndex]}
            alt={title}
            className="max-w-full max-h-full object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={() => setIsZoomed(false)}
            className="absolute top-6 right-6 text-white/80 hover:text-white text-2xl font-bold"
          >
            ✕
          </button>
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); goTo(activeIndex - 1); }}
                className="absolute left-6 top-1/2 -translate-y-1/2 p-3 bg-card/20 backdrop-blur-sm rounded-full hover:bg-card/40"
              >
                <ChevronLeft className="h-6 w-6 text-white" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); goTo(activeIndex + 1); }}
                className="absolute right-6 top-1/2 -translate-y-1/2 p-3 bg-card/20 backdrop-blur-sm rounded-full hover:bg-card/40"
              >
                <ChevronRight className="h-6 w-6 text-white" />
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
};
