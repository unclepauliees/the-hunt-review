import ExternalLink from "lucide-react/dist/esm/icons/external-link";
import Images from "lucide-react/dist/esm/icons/images";
import { asset } from "../../assets";
import { type Act, venueStats } from "../../deck.config";

export function VenueAct({ act }: { act: Act }) {
  return <section id={act.id} data-act-index={act.index - 1} className="venue-act">
    <img className="venue-image" src={asset(act.image!)} alt="One if by Land, Two if by Sea dining room" />
    <div className="venue-scrim" />
    <div className="venue-copy">
      <p className="act-marker">{act.chapter}</p>
      <h2>{act.headline}</h2>
      <p className="venue-address">{act.body?.[0]}</p>
      <p className="venue-description">{act.body?.[1]}</p>
      <div className="venue-stats">{venueStats.map((stat) => <span key={stat}>{stat}</span>)}</div>
      <aside>{act.body?.[2]}</aside>
      <a
        className="venue-images-link"
        href="https://www.dropbox.com/scl/fo/ofvpccuictw5a2khp2u7p/AAh9ZzTADcZHTsCGaVJeqsU?rlkey=em4ptadqq0rjrnj23op15l9d7&st=543ketbf&dl=0"
        target="_blank"
        rel="noreferrer"
        aria-label="Open venue images in Dropbox (opens in a new tab)"
      >
        <Images />
        <span>Venue Images</span>
        <ExternalLink />
      </a>
    </div>
  </section>;
}
