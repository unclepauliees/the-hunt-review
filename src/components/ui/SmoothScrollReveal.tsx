import type { ReactNode } from "react";
import { motion, useMotionTemplate, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

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
  const { scrollYProgress } = useScroll({ target: root, offset: ["start start", "end end"] });
  const clipStart = useTransform(scrollYProgress, [0, 1], [25, 0]);
  const clipEnd = useTransform(scrollYProgress, [0, 1], [75, 100]);
  const clipPath = useMotionTemplate`polygon(${clipStart}% ${clipStart}%, ${clipEnd}% ${clipStart}%, ${clipEnd}% ${clipEnd}%, ${clipStart}% ${clipEnd}%)`;
  const scale = useTransform(scrollYProgress, [0, 1], [1.7, 1]);

  return (
    <div ref={root} className="reveal-scroll-shell" style={{ height: `calc(${scrollHeight}px + 100vh)` }}>
      <div className="reveal-scroll-sticky">
        <img className="reveal-ground" src={backdrop} alt="" />
        <motion.div className="reveal-parallax-media" style={reduce ? undefined : { clipPath }}>
          <motion.img className="reveal-parallax-image" src={image} alt={alt} style={reduce ? undefined : { scale }} />
          <div className="reveal-parallax-scrim" aria-hidden="true" />
        </motion.div>
        {children}
      </div>
    </div>
  );
}
