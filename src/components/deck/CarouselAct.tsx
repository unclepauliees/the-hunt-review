import { useEffect, useRef, useState } from "react";
import { asset } from "../../assets";
import { type Act } from "../../deck.config";
import { StampSeal } from "./StampSeal";
import { ElasticGallery } from "./ElasticGallery";

export function CarouselAct({ act }: { act: Act }) {
  const [active, setActive] = useState(0);
  const root = useRef<HTMLElement>(null);
  const count = act.cards?.length ?? 0;

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    let previous = -1;
    const update = () => {
      frame = 0;
      if (!root.current) return;
      const rect = root.current.getBoundingClientRect();
      const progress = Math.max(0, Math.min(.999, -rect.top / Math.max(1, rect.height - innerHeight)));
      const index = Math.floor(progress * count);
      if (index !== previous) { previous = index; setActive(index); }
    };
    const queue = () => { if (!frame) frame = requestAnimationFrame(update); };
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    update();
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", queue); window.removeEventListener("resize", queue); };
  }, [count]);

  return (
    <section ref={root} id={act.id} data-act-index={act.index - 1} className="carousel-act revised-gallery" style={{ minHeight: `${100 + count * 32}svh` }}>
      <div className="gallery-sticky-stage">
      <img className="act-ground" src={asset("bg-03-16x9.jpg")} alt="" />
      <header><div><h2>{act.headline}</h2>{act.body?.map((text) => <p key={text}>{text}</p>)}</div></header>
      <ElasticGallery cards={act.cards ?? []} activeIndex={active} onActiveChange={setActive} />
      <div className="carousel-progress" aria-label={`${act.headline} gallery controls`}>{(act.cards ?? []).map((card, index) => <StampSeal key={card.title} label={card.title} active={index === active} onActivate={() => setActive(index)} />)}</div>
      {act.galleries?.length ? <div className="act-galleries">{act.galleries.map((gallery, index) => <section key={`${act.id}-${gallery.title}`} className="act-gallery-block" aria-labelledby={`${act.id}-gallery-${index + 1}`}><h3 id={`${act.id}-gallery-${index + 1}`} className="act-gallery-title">{gallery.title}</h3><ElasticGallery gallery={gallery} /></section>)}</div> : null}
      </div>
    </section>
  );
}
