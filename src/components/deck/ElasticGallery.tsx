import ArrowUpRight from "lucide-react/dist/esm/icons/arrow-up-right";
import X from "lucide-react/dist/esm/icons/x";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { asset } from "../../assets";
import type { Card } from "../../deck.config";

type ElasticGalleryProps = {
  cards: Card[];
  activeIndex?: number;
  onActiveChange?: (index: number) => void;
};

export function ElasticGallery({ cards, activeIndex, onActiveChange }: ElasticGalleryProps) {
  const [internalActive, setInternalActive] = useState(0);
  const [detailIndex, setDetailIndex] = useState<number | null>(null);
  const active = activeIndex ?? internalActive;

  useEffect(() => {
    if (detailIndex === null) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDetailIndex(null);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", close);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", close);
    };
  }, [detailIndex]);

  const activate = (index: number) => {
    setInternalActive(index);
    onActiveChange?.(index);
  };

  return (
    <div className="elastic-gallery">
      {cards.map((card, index) => {
        const isActive = active === index;
        return (
          <article
            key={`${card.badge}-${card.title}`}
            className={`elastic-item ${isActive ? "is-active" : ""}`}
            onMouseEnter={() => activate(index)}
          >
            <img className={card.fit === "contain" ? "is-contain" : ""} src={asset(card.image)} alt="" />
            <div className="elastic-shade" aria-hidden="true" />
            <button className="elastic-panel-trigger" type="button" aria-label={`Show ${card.title}`} aria-pressed={isActive} onFocus={() => activate(index)} onClick={() => activate(index)} />
            <div className="elastic-content">
              <div className="elastic-active-copy">
                <span>{card.badge}</span>
                <h3>{card.title}</h3>
                {card.body && <p>{card.body}</p>}
                <button className="elastic-cue" type="button" onClick={() => setDetailIndex(index)}>
                  Click to Expand <ArrowUpRight />
                </button>
              </div>
              <span className="elastic-collapsed-title" aria-hidden="true">{card.title}</span>
            </div>
          </article>
        );
      })}
      {detailIndex !== null && createPortal(
        <div className="gallery-detail" role="dialog" aria-modal="true" aria-label={`${cards[detailIndex].title} image detail`} onClick={() => setDetailIndex(null)}>
          <img src={asset(cards[detailIndex].image)} alt={cards[detailIndex].title} onClick={(event) => event.stopPropagation()} />
          <button autoFocus type="button" className="gallery-detail-close" aria-label="Close image detail" title="Close image detail" onClick={() => setDetailIndex(null)}><X /></button>
        </div>,
        document.body,
      )}
    </div>
  );
}
