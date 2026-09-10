import type { ReactNode } from "react";
import { motion, useMotionTemplate, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { useMediaQuery } from "../../hooks/useMediaQuery";

type SmoothScrollRevealProps = {
  scrollHeight?: number;
  image: string;
  backdrop: string;
  alt: string;
  children: ReactNode;
};

export function SmoothScrollReveal({ scrollHeight = 1500, image, backdrop, alt, children }: SmoothScrollRevealProps) {
  const root = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const touchViewport = useMediaQuery("(max-width: 767px), (pointer: coarse)");
  const { scrollYProgress } = useScroll({ target: root, offset: ["start start", "end end"] });
  const clipStart = useTransform(scrollYProgress, [0, 1], [12, 0]);
  const clipEnd = useTransform(scrollYProgress, [0, 1], [88, 100]);
  const clipPath = useMotionTemplate`polygon(${clipStart}% ${clipStart}%, ${clipEnd}% ${clipStart}%, ${clipEnd}% ${clipEnd}%, ${clipStart}% ${clipEnd}%)`;
  const scale = useTransform(scrollYProgress, [0, 1], [1.28, 1]);
  const mobileScale = useTransform(scrollYProgress, [0, 1], [1.12, 1.02]);
  const mobileY = useTransform(scrollYProgress, [0, 1], ["5svh", "-5svh"]);
  const mediaStyle = reduce ? undefined : touchViewport ? undefined : { clipPath };
  const imageStyle = reduce ? undefined : touchViewport ? { scale: mobileScale, y: mobileY } : { scale };

  return (
    <div ref={root} className="reveal-scroll-shell" style={{ height: `calc(${scrollHeight}px + 100svh)` }}>
      <div className="reveal-scroll-sticky">
        <img className="reveal-ground" src={backdrop} alt="" />
        <motion.div className="reveal-parallax-media" style={mediaStyle}>
          <motion.img className="reveal-parallax-image" src={image} alt={alt} style={imageStyle} />
          <div className="reveal-parallax-scrim" aria-hidden="true" />
        </motion.div>
        {children}
      </div>
    </div>
  );
}
