import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { serviceLocations } from "./service-locations";
import "./map.css";

interface MapProps {
  areas: readonly string[];
  lineColor?: string;
  animationDuration?: number;
  loop?: boolean;
}

export function WorldMap({
  areas,
  lineColor = "#c74728",
  animationDuration = 2,
  loop = true,
}: MapProps) {
  const id = useId().replace(/:/g, "");
  const reducedMotion = useReducedMotion();
  const container = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const [positions, setPositions] = useState<{ x: number; y: number }[]>([]);
  const [size, setSize] = useState({ x: 800, y: 600 });
  const [hovered, setHovered] = useState<number | null>(null);
  const [tileError, setTileError] = useState(false);
  const bounds = useRef(L.latLngBounds(serviceLocations).pad(0.15));

  useEffect(() => {
    if (!container.current) return;
    const map = L.map(container.current, {
      scrollWheelZoom: false,
      zoomAnimation: false,
      minZoom: 9,
      maxZoom: 17,
      attributionControl: true,
    });
    mapRef.current = map;
    let loaded = false;
    const tiles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);
    tiles.on("tileload", () => {
      loaded = true;
      setTileError(false);
    });
    tiles.on("tileerror", () => {
      if (!loaded) setTileError(true);
    });
    L.control.scale({ imperial: false, position: "bottomleft" }).addTo(map);
    const update = () => {
      setPositions(
        serviceLocations.map((location) => {
          const point = map.latLngToContainerPoint(location);
          return { x: point.x, y: point.y };
        }),
      );
      const dimensions = map.getSize();
      setSize({ x: dimensions.x, y: dimensions.y });
    };
    map.fitBounds(bounds.current, { padding: [30, 35] });
    update();
    map.on("move zoom resize", update);
    const resize = new ResizeObserver(() => {
      map.invalidateSize({ pan: false });
      map.fitBounds(bounds.current, { padding: [30, 35], animate: false });
    });
    resize.observe(container.current);
    return () => {
      resize.disconnect();
      map.off("move zoom resize", update);
      map.remove();
      mapRef.current = null;
    };
  }, []);

  const hub = positions[0];
  return (
    <div className="service-route-map">
      <div className="service-map-top">
        <span>TR PATTINAM / KARAIKAL</span>
        <span className="service-map-live">
          <i /> DISTRIBUTION NETWORK
        </span>
      </div>
      <div className="service-map-canvas">
        <div
          ref={container}
          className="service-map-geography"
          aria-label="Geographic map of Karaikal and surrounding service areas"
        />
        <button
          className="service-map-reset"
          onClick={() => mapRef.current?.fitBounds(bounds.current, { padding: [30, 35] })}
        >
          View all areas
        </button>
        <svg
          viewBox={`0 0 ${size.x} ${size.y}`}
          className="service-map-routes"
          aria-label="Animated distribution links from TR Pattinam to our service areas"
          role="img"
        >
          <defs>
            <linearGradient id={`${id}-route`}>
              <stop stopColor={lineColor} stopOpacity=".4" />
              <stop offset=".5" stopColor={lineColor} />
              <stop offset="1" stopColor={lineColor} stopOpacity=".8" />
            </linearGradient>
          </defs>
          {hub &&
            areas.slice(1).map((area, index) => {
              const end = positions[index + 1];
              if (!end) return null;
              const d = `M ${hub.x} ${hub.y} Q ${(hub.x + end.x) / 2 - 22} ${Math.min(hub.y, end.y) - 25} ${end.x} ${end.y}`;
              return (
                <g
                  key={area}
                  opacity={hovered === null || hovered === index + 1 || hovered === 0 ? 1 : 0.25}
                >
                  <path d={d} fill="none" stroke="white" strokeOpacity=".8" strokeWidth="4" />
                  <motion.path
                    d={d}
                    fill="none"
                    stroke={`url(#${id}-route)`}
                    strokeWidth="2"
                    initial={reducedMotion ? false : { pathLength: 0, opacity: 0 }}
                    animate={
                      reducedMotion
                        ? { pathLength: 1, opacity: 0.8 }
                        : { pathLength: [0, 1, 1], opacity: [0, 1, 0.5] }
                    }
                    transition={{
                      duration: animationDuration + 2,
                      delay: index * 0.25,
                      repeat: loop && !reducedMotion ? Infinity : 0,
                      repeatDelay: 1,
                      ease: "easeInOut",
                    }}
                  />
                  {!reducedMotion && (
                    <circle r="3" fill={lineColor} stroke="white" strokeWidth="1">
                      <animateMotion
                        dur={`${animationDuration + 2}s`}
                        begin={`${index * 0.25}s`}
                        repeatCount={loop ? "indefinite" : "1"}
                        path={d}
                      />
                    </circle>
                  )}
                </g>
              );
            })}
          {positions.map((point, index) => (
            <g
              key={areas[index]}
              className="service-map-location"
              tabIndex={0}
              aria-label={areas[index]}
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(index)}
              onBlur={() => setHovered(null)}
            >
              <title>{areas[index]}</title>
              <motion.circle
                cx={point.x}
                cy={point.y}
                r="5"
                fill="none"
                stroke={lineColor}
                initial={false}
                animate={
                  reducedMotion ? { r: 10, opacity: 0.3 } : { r: [5, 16], opacity: [0.8, 0] }
                }
                transition={{ duration: 2, delay: index * 0.15, repeat: Infinity }}
              />
              <circle
                cx={point.x}
                cy={point.y}
                r={index === 0 ? 6 : 4}
                fill={lineColor}
                stroke="white"
                strokeWidth="2"
              />
              <text
                x={point.x + (index === 1 ? -8 : 8)}
                y={point.y + (index === 1 ? 18 : -10)}
                textAnchor={index === 1 ? "end" : "start"}
                className={`service-map-label ${index === 0 ? "service-map-hub-label" : ""}`}
              >
                {areas[index]}
              </text>
            </g>
          ))}
        </svg>
        <AnimatePresence>
          {hovered !== null && (
            <motion.div
              className="service-map-tooltip"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              key={areas[hovered]}
            >
              {areas[hovered]}
            </motion.div>
          )}
        </AnimatePresence>
        {tileError && (
          <div className="service-map-load-error">
            Map unavailable.{" "}
            <a
              href="https://www.openstreetmap.org/#map=12/10.92/79.80"
              target="_blank"
              rel="noreferrer"
            >
              Open geographic map
            </a>
          </div>
        )}
      </div>
      <div className="service-map-mobile-areas">
        {areas.map((area) => (
          <span key={area}>{area}</span>
        ))}
      </div>
      <div className="service-map-bottom">
        <span>
          <i /> TR PATTINAM
        </span>
        <span>LOCAL SERVICE AREAS</span>
      </div>
    </div>
  );
}
