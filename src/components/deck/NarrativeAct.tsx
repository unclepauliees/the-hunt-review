import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { asset } from "../../assets";
import { activationLabels, type Act } from "../../deck.config";
import { ElasticGallery } from "./ElasticGallery";
import { StampSeal } from "./StampSeal";

const backgroundFiles = { "bg-02": "bg-02-16x9.jpg", "bg-03": "bg-03-16x9.jpg", "bg-04": "bg-04-16x9.jpg", keyart: "keyart-16x9.jpg" } as const;

export function NarrativeAct({ act }: { act: Act }) {
  const root = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: root, offset: ["start start", "end end"] });
  const copyX = useTransform(scrollYProgress, [0, .18, .72, 1], [32, 0, 0, -20]);
  const opacity = useTransform(scrollYProgress, [0, .12, .72, .92, 1], [0, 1, 1, .18, 0]);
  const imageScale = useTransform(scrollYProgress, [.55, 1], [1, .88]);
  const hasGalleries = Boolean(act.galleries?.length);

  return (
    <section id={act.id} data-act-index={act.index - 1} className={`narrative-act ${!act.image ? "text-only" : ""} ${hasGalleries ? "has-galleries" : ""} ${act.id === "structure" ? "structure-act" : ""} ${act.id === "premise" ? "premise-act" : ""} ${act.id === "corridor" ? "corridor-act" : ""} ${act.id === "arrival" ? "arrival-act" : ""} ${act.id === "dresscode" ? "dresscode-act" : ""} ${act.id === "atmosphere" ? "atmosphere-act" : ""} ${act.id === "revelation" ? "revelation-act" : ""}`}>
      <div ref={root} className="narrative-scroll-scene">
        <div className="narrative-sticky">
          <img className="act-ground" src={asset(backgroundFiles[act.background])} alt="" />
          {act.image && <motion.img style={reduce ? undefined : { scale: imageScale }} className="act-image" src={asset(act.image)} alt="" />}
          <div className="act-scrim" />
          <div className="act-copy">
            <motion.div style={reduce ? undefined : { x: copyX, opacity }} className="act-copy-motion">
              <p className="act-marker">{act.chapter}</p>
              <h2>{act.headline}</h2>
              {act.body?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {act.bullets && <div className="bullet-groups">{act.bullets.map((group) => <div key={group.label}><h3>{group.label}</h3><ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul></div>)}</div>}
              {act.stampIndex === 4 && <div className="completed-stamps">{activationLabels.map((label) => <StampSeal key={label} label={label} active />)}</div>}
            </motion.div>
          </div>
        </div>
      </div>
      {hasGalleries && <div className="act-galleries">{act.galleries!.map((gallery, index) => <section key={`${act.id}-${gallery.title}`} className="act-gallery-block" aria-labelledby={`${act.id}-gallery-${index + 1}`}><h3 id={`${act.id}-gallery-${index + 1}`} className="act-gallery-title">{gallery.title}</h3><ElasticGallery gallery={gallery} /></section>)}</div>}
    </section>
  );
}
