import { asset } from "../../assets";
import type { Act } from "../../deck.config";
import { SmoothScrollReveal } from "../ui/SmoothScrollReveal";

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
          <p className="act-marker">{act.chapter}</p>
          <h2>{act.headline}</h2>
        </div>
      </SmoothScrollReveal>
    </section>
  );
}
