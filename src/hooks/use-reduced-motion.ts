import { useEffect, useState } from "react";

/** Keeps motion optional for people who request reduced motion. */
export const useReducedMotion = () => {
  const query = "(prefers-reduced-motion: reduce)";
  const [reducedMotion, setReducedMotion] = useState(
    () => typeof window !== "undefined" && window.matchMedia(query).matches
  );

  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return reducedMotion;
};
