import { acts } from "./deck.config";
import { LenisProvider } from "./providers/LenisProvider";
import { ProgressRail } from "./components/deck/ProgressRail";
import { HeroAct } from "./components/deck/HeroAct";
import { NarrativeAct } from "./components/deck/NarrativeAct";
import { CarouselAct } from "./components/deck/CarouselAct";
import { VenueAct } from "./components/deck/VenueAct";
import { OpenItemsAct } from "./components/deck/OpenItemsAct";
import { RevealAct } from "./components/deck/RevealAct";
import { ReferenceAct } from "./components/deck/ReferenceAct";
import { useMobileStickyPager } from "./hooks/useMobileStickyPager";

const comparisonPlates = ["../assets/plates/hero-keyart.png", "../assets/plates/audio-tagline.png"];
void comparisonPlates;

export default function App() {
  useMobileStickyPager();

  return (
    <LenisProvider>
      <main aria-label="The Hunt campaign presentation">
        <h1 className="sr-only">The Hunt campaign presentation</h1>
        {acts.map((act) => {
          if (act.kind === "reference") return <ReferenceAct key={act.id} act={act} />;
          if (act.kind === "hero") return <HeroAct key={act.id} act={act} />;
          if (act.kind === "carousel") return <CarouselAct key={act.id} act={act} />;
          if (act.id === "reveal") return <RevealAct key={act.id} act={act} />;
          if (act.kind === "venue") return <VenueAct key={act.id} act={act} />;
          if (act.kind === "openItems") return <OpenItemsAct key={act.id} act={act} />;
          return <NarrativeAct key={act.id} act={act} />;
        })}
      </main>
      <ProgressRail />
    </LenisProvider>
  );
}
