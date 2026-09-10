import { asset } from "../../assets";
import type { Act } from "../../deck.config";
import { SmoothScrollReveal } from "../ui/SmoothScrollReveal";
import { ElasticGallery } from "./ElasticGallery";

export function RevealAct({ act }: { act: Act }) {
  return (
    <section id={act.id} data-act-index={act.index - 1} className="reveal-act">
      <SmoothScrollReveal
        scrollHeight={1500}
        image={asset(act.image!)}
        backdrop={asset("bg-04-16x9.jpg")}
        alt="The Midnight Revelation mirror resting on red velvet"
      >
        <div className="reveal-copy">
          <h2>{act.headline}</h2>
          <p className="narrative-subheading">{act.subheading}</p>
        </div>
      </SmoothScrollReveal>
      {act.galleries?.length ? <div className="act-galleries">{act.galleries.map((gallery, index) => <section key={`${act.id}-${gallery.title}`} className="act-gallery-block" aria-labelledby={`${act.id}-gallery-${index + 1}`}><h3 id={`${act.id}-gallery-${index + 1}`} className="act-gallery-title">{gallery.title}</h3><ElasticGallery gallery={gallery} /></section>)}</div> : null}
    </section>
  );
}
