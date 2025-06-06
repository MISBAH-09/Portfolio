import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
// If you don't have the Button component, see below for a simple alternative.

const ImageGallery = ({ images, projectName }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!images || images.length === 0) return null;

  return (
    <div className="relative group">
      <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
        <img
          src={images[currentImageIndex]}
          alt={`${projectName} - Image ${currentImageIndex + 1}`}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {images.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous Image"
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gray-200 hover:bg-gray-300 rounded-full p-1"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              type="button"
              aria-label="Next Image"
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gray-200 hover:bg-gray-300 rounded-full p-1"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex justify-center mt-3 space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentImageIndex ? "bg-blue-600" : "bg-gray-300"
              }`}
              onClick={() => setCurrentImageIndex(index)}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
