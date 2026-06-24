"use client";

import Image from "next/image";
import { useState } from "react";

const images = "/troue/images/";

const gallery = [
  "carlee_2449_00001.JPG",
  "01a36257329235889d95ee9c85573dca6367ebaca3.jpg",
  "carlee_2449_00021.JPG",
  "carlee_2449_00032.JPG",
  "hero_kerk.JPG",
  "carlee_2449_00016.JPG",
];

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const open = (index: number) => setActiveIndex(index);
  const close = () => setActiveIndex(null);

  const next = () => {
    if (activeIndex === null) return;
    setActiveIndex((activeIndex + 1) % gallery.length);
  };

  const prev = () => {
    if (activeIndex === null) return;
    setActiveIndex(
      (activeIndex - 1 + gallery.length) % gallery.length
    );
  };

  return (
    <section className="container section">
      {/* Title */}
      <div className="center mb-10">
        <h1>Ons Gallery 💍</h1>
        <p className="text-muted">
          Klik op enige foto om dit groter te sien
        </p>
      </div>

      {/* Grid */}
      <div className="gallery-grid">
        {gallery.map((img, i) => (
          <div
            key={i}
            className="gallery-card"
            onClick={() => open(i)}
          >
            <Image
              src={images + img}
              alt={`Gallery ${i + 1}`}
              fill
              className="gallery-img"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        ))}
      </div>

      {/* LIGHTBOX */}
      {activeIndex !== null && (
        <div className="lightbox" onClick={close}>
          <div
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="lightbox-close" onClick={close}>
              ✕
            </button>

            <button className="lightbox-prev" onClick={prev}>
              ‹
            </button>

            <div className="lightbox-image">
              <Image
                src={images + gallery[activeIndex]}
                alt="Gallery large view"
                fill
                className="object-contain"
              />
            </div>

            <button className="lightbox-next" onClick={next}>
              ›
            </button>
          </div>
        </div>
      )}
    </section>
  );
}