import React, { useState } from 'react';

const ImageCarousel = ({ images }) => {
  if (!Array.isArray(images) || images.length === 0) {
    return (
      <div className="w-full h-64 flex items-center justify-center bg-gray-100 rounded-lg mb-6">
        <span className="text-gray-400">No images available</span>
      </div>
    );
  }

  const [currentIndex, setCurrentIndex] = useState(0);
  const length = images.length;

  const prevSlide = () => {
    setCurrentIndex(currentIndex === 0 ? length - 1 : currentIndex - 1);
  };

  const nextSlide = () => {
    setCurrentIndex(currentIndex === length - 1 ? 0 : currentIndex + 1);
  };

  return (
    <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden mb-6">
      <img
        src={images[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
        className="w-full h-full object-cover rounded-lg"
      />
      {length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-4 -translate-y-1/2 bg-black bg-opacity-30 text-white p-2 rounded-full hover:bg-opacity-50 transition"
            aria-label="Previous Slide"
          >
            &#10094;
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-4 -translate-y-1/2 bg-black bg-opacity-30 text-white p-2 rounded-full hover:bg-opacity-50 transition"
            aria-label="Next Slide"
          >
            &#10095;
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2">
            {images.map((_, idx) => (
              <span
                key={idx}
                className={`w-3 h-3 rounded-full cursor-pointer ${
                  idx === currentIndex ? 'bg-white' : 'bg-gray-400'
                }`}
                onClick={() => setCurrentIndex(idx)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ImageCarousel;
