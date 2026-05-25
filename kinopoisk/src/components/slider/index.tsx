import React, { useState } from "react";

type SliderProps = {
  images: { imageUrl: string }[];
  height?: string;
};

export default function ImageSlider({ images, height = "h-72" }: SliderProps): React.ReactElement {
  const [index, setIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="text-gray-400 text-lg">
        Нет доступных изображений.
      </div>
    );
  }

  const next = () => setIndex((prev) => (prev + 1) % images.length);
  const prev = () => setIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="relative w-full max-w-3xl mx-auto select-none">
      <img
        src={images[index].imageUrl}
        className={`w-full ${height} object-cover rounded-lg`}
      />

      <button
        onClick={prev}
        className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/50 text-white px-3 py-2 rounded-full"
      >
        ‹
      </button>

      <button
        onClick={next}
        className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/50 text-white px-3 py-2 rounded-full"
      >
        ›
      </button>

      <div className="flex justify-center mt-3 gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-2 h-2 rounded-full transition ${
              i === index ? "bg-white scale-125" : "bg-gray-500"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
