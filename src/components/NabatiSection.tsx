import { useEffect, useState } from "react";

import { nabatiProducts } from "@/data/nabati";

export default function NabatiSection({
  onSelect,
}: {
  onSelect: (product: { name: string; type: string; category: "SNACKS"; src: string }) => void;
}) {
  const [active, setActive] = useState(1);
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;
    const timer = window.setInterval(
      () => setActive((index) => (index + 1) % nabatiProducts.length),
      2000,
    );
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section
      id="shelf-nabati"
      className="shelf-showcase nabati-showcase"
      aria-labelledby="nabati-title"
    >
      <div className="showcase-heading nabati-heading">
        <h3 id="nabati-title">Nabati Products</h3>
        <p>A little crunch. A whole lot of delight.</p>
      </div>
      <div
        className="nabati-stage"
        role="region"
        aria-roledescription="carousel"
        aria-label="Nabati products"
      >
        <div className="nabati-orbit" aria-hidden="true" />
        {nabatiProducts.map((product, index) => {
          const distance =
            ((index - active + nabatiProducts.length + 3) % nabatiProducts.length) - 3;
          const centered = distance === 0;
          return (
            <button
              key={product.file}
              className={`nabati-card ${centered ? "is-active" : ""}`}
              aria-label={`${product.name}${centered ? ", preview product" : ", show product"}`}
              aria-hidden={Math.abs(distance) > 1}
              tabIndex={Math.abs(distance) > 1 ? -1 : 0}
              style={{
                transform: `translateX(calc(-50% + ${distance * 90}%)) translateY(${centered ? -8 : 22}px) translateZ(${-Math.abs(distance) * 180}px) rotateY(${distance * -32}deg) rotateZ(${distance * 4}deg)`,
                opacity: Math.abs(distance) > 1 ? 0 : centered ? 1 : 0.6,
                zIndex: 5 - Math.abs(distance),
                pointerEvents: Math.abs(distance) > 1 ? "none" : "auto",
              }}
              onClick={() =>
                centered
                  ? product.src &&
                    onSelect({
                      name: product.name,
                      type: product.detail,
                      category: "SNACKS",
                      src: product.src,
                    })
                  : setActive(index)
              }
            >
              <img src={product.src} alt={product.name} loading="lazy" />
              <span className="nabati-card-caption">
                <b>{product.name}</b>
                <small>{product.detail}</small>
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
