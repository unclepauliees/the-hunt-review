import UserRound from "lucide-react/dist/esm/icons/user-round";
import { asset } from "../../assets";
import type { Act } from "../../deck.config";

export function OpenItemsAct({ act }: { act: Act }) {
  return <section id={act.id} data-act-index={act.index - 1} className="open-items-act">
    <img className="act-ground" src={asset("bg-03-16x9.jpg")} alt="" />
    <div className="open-items-inner"><p className="act-marker">{act.chapter}</p><h2>{act.headline}</h2><div className="checklist">{act.body?.map((item, index) => <article key={item}><span>{String(index + 1).padStart(2, "0")}</span><p>{item}</p><div title="Owner to be assigned"><UserRound /><span>Owner</span></div></article>)}</div></div>
  </section>;
}
