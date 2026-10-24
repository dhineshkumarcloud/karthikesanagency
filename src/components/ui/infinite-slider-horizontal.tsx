import { useEffect, useState, type ReactNode } from "react";
import { animate, motion, useMotionValue, useReducedMotion } from "framer-motion";
import useMeasure from "react-use-measure";
import { cn } from "@/lib/utils";

type InfiniteSliderProps = {
  children: ReactNode;
  gap?: number;
  duration?: number;
  durationOnHover?: number;
  direction?: "horizontal" | "vertical";
  reverse?: boolean;
  className?: string;
};

export function InfiniteSlider({
  children,
  gap = 16,
  duration = 40,
  durationOnHover,
  direction = "horizontal",
  reverse = false,
  className,
}: InfiniteSliderProps) {
  const [ref, { width, height }] = useMeasure();
  const translation = useMotionValue(0);
  const reducedMotion = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const speedDuration = hovered && durationOnHover ? durationOnHover : duration;

  useEffect(() => {
    const distance = (direction === "horizontal" ? width : height) + gap;
    if (reducedMotion || distance <= gap) {
      translation.set(0);
      return;
    }
    const from = reverse ? -distance : 0;
    const to = reverse ? 0 : -distance;
    const current = translation.get();
    let controls: ReturnType<typeof animate>;
    const repeat = () => {
      translation.set(from);
      controls = animate(translation, [from, to], {
        duration: speedDuration,
        ease: "linear",
        repeat: Infinity,
      });
    };
    // Finish the current lap at the new hover speed without jumping position.
    if (current > -distance && current < 0) {
      controls = animate(translation, to, {
        duration: (speedDuration * Math.abs(to - current)) / distance,
        ease: "linear",
        onComplete: repeat,
      });
    } else repeat();
    return () => controls?.stop();
  }, [width, height, gap, direction, reverse, speedDuration, reducedMotion, translation]);

  const groupStyle = {
    display: "flex",
    gap,
    flexDirection: direction === "horizontal" ? ("row" as const) : ("column" as const),
    flexShrink: 0 as const,
  };
  return (
    <div
      className={cn("infinite-slider", reducedMotion && "infinite-slider-static", className)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        className="infinite-slider-track"
        style={{
          display: "flex",
          width: reducedMotion ? "100%" : "max-content",
          gap,
          flexDirection: direction === "horizontal" ? "row" : "column",
          ...(direction === "horizontal" ? { x: translation } : { y: translation }),
        }}
      >
        <div ref={ref} className="infinite-slider-group" style={groupStyle}>
          {children}
        </div>
        {!reducedMotion && (
          <div className="infinite-slider-group" style={groupStyle} aria-hidden="true">
            {children}
          </div>
        )}
      </motion.div>
    </div>
  );
}
