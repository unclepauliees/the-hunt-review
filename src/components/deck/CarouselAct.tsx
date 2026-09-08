import { useState } from "react";
import { asset } from "../../assets";
import { activationLabels, type Act } from "../../deck.config";
import { StampSeal } from "./StampSeal";
import { ElasticGallery } from "./ElasticGallery";

export function CarouselAct({ act }: { act: Act }) {
  const [active, setActive] = useState(0);

  return (
    <section id={act.id} data-act-index={act.index - 1} className="carousel-act">
      <img className="act-ground" src={asset("bg-03-16x9.jpg")} alt="" />
      <header><div><p className="act-marker">{act.chapter}</p><h2>{act.headline}</h2></div></header>
      <ElasticGallery cards={act.cards ?? []} activeIndex={active} onActiveChange={setActive} />
      <div className="carousel-progress">{(act.id === "activations" ? activationLabels : act.cards?.map((card) => card.badge) ?? []).map((label, index) => <StampSeal key={label} label={label} active={index === active} onActivate={() => setActive(index)} />)}</div>
    </section>
  );
}
