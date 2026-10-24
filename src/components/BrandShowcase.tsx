import { InfiniteSlider } from "@/components/ui/infinite-slider-horizontal";
import "./BrandShowcase.css";

type Brand = { name: string; src?: string };

export default function BrandShowcase({ brands }: { brands: Brand[] }) {
  const midpoint = Math.ceil(brands.length / 2);
  return (
    <div className="brand-showcase" role="region" aria-label="Our partner brands">
      {[brands.slice(0, midpoint), brands.slice(midpoint)].map((row, rowIndex) => (
        <InfiniteSlider
          key={rowIndex}
          gap={16}
          duration={42}
          durationOnHover={85}
          reverse={rowIndex === 1}
          className="brand-slider-row"
        >
          {row.map((brand, index) => (
            <article
              className={`brand-slider-card brand-slider-tone-${(index + rowIndex) % 3}`}
              key={brand.name}
            >
              <div className="brand-slider-image">
                <span className="brand-slider-number">
                  {String(rowIndex * midpoint + index + 1).padStart(2, "0")}
                </span>
                {brand.src ? (
                  <img
                    src={brand.src}
                    alt={`${brand.name} products`}
                    loading="eager"
                    decoding="async"
                  />
                ) : (
                  <span className="brand-slider-wordmark">{brand.name}</span>
                )}
              </div>
              <div className="brand-slider-caption">
                <h3>{brand.name}</h3>
              </div>
            </article>
          ))}
        </InfiniteSlider>
      ))}
    </div>
  );
}
