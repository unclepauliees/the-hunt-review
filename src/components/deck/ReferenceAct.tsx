import { asset } from "../../assets";
import type { Act } from "../../deck.config";

export function ReferenceAct({ act }: { act: Act }) {
  if (!act.referenceImage) return null;

  return (
    <section id={act.id} data-act-index={act.index - 1} className="reference-act" aria-labelledby={`${act.id}-title`}>
      <div className="reference-stage">
        <img className="reference-slide-image" src={asset(act.referenceImage)} alt="" />
        <div className="reference-act-label">
          <p>{act.chapter}</p>
          <h2 id={`${act.id}-title`}>{act.headline}</h2>
        </div>
      </div>
    </section>
  );
}
