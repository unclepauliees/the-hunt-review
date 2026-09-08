import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { asset } from "../../assets";
import type { Act } from "../../deck.config";

gsap.registerPlugin(ScrollTrigger);

export function HeroAct({ act }: { act: Act }) {
  const root = useRef<HTMLElement>(null);
  const closing = act.id === "keyart-close";

  useEffect(() => {
    if (!root.current || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const context = gsap.context(() => {
      const planes = root.current!.querySelectorAll<HTMLElement>("[data-depth]");
      planes.forEach((plane) => {
        gsap.to(plane, {
          yPercent: -Number(plane.dataset.depth),
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: .7 },
        });
      });
    }, root);
    return () => context.revert();
  }, []);

  return (
    <section ref={root} id={act.id} data-act-index={act.index - 1} className={`hero-act ${closing ? "hero-close" : ""}`}>
      <div className="hero-stage">
        <div className="hero-base" />
        <img className="hero-backdrop" data-depth="7" src={asset("keyart-master-nologo.jpg")} alt="" />
        <img className="hero-art" data-depth="5" src={asset("keyart-16x9.jpg")} alt="Audible Dracula key art featuring Jonathan Bailey and Ella Purnell" />
        <img className="hero-texture embers" data-depth="18" src={asset("tex-embers.jpg")} alt="" />
        <img className="hero-texture cracks" data-depth="24" src={asset("tex-cracks.jpg")} alt="" />
        <div className="hero-vignette" />
        <div className="hero-guide">
          {act.eyebrow && <p className="hero-presented">{act.eyebrow}</p>}
          {!closing ? (
            <div className="hero-bottom-copy">
              <p className="hero-date">{act.body?.[0]}</p>
              <img className="hero-tagline" data-depth="7" src={asset("tagline-audio-2line.svg")} alt="A New Audio Thriller" />
            </div>
          ) : (
            <img className="hero-tagline large" data-depth="7" src={asset("tagline-listen-2line.svg")} alt="Listen to the Darkness" />
          )}
        </div>
      </div>
    </section>
  );
}
