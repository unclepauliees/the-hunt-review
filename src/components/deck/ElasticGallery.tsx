import ArrowUpRight from "lucide-react/dist/esm/icons/arrow-up-right";
import X from "lucide-react/dist/esm/icons/x";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { asset } from "../../assets";
import type { Card, Gallery, GalleryImage } from "../../deck.config";

type ElasticGalleryProps = {
  cards?: Card[];
  gallery?: Gallery;
  activeIndex?: number;
  onActiveChange?: (index: number) => void;
};

type GalleryPanel = {
  key: string;
  title: string;
  label: string;
  body?: string;
  image: string;
  fit?: "cover" | "contain";
  kind?: GalleryImage["kind"];
  specLabel?: string;
  detailImages?: GalleryImage[];
};

function labelForKind(kind?: GalleryImage["kind"]) {
  if (kind === "venue") return "ONE IF BY LAND - TODAY";
  if (kind === "graphic") return "PRODUCTION GRAPHIC";
  if (kind === "render") return "DESIGN RENDER";
  return "";
}

function detailImagesFor(panel: GalleryPanel): GalleryImage[] {
  return panel.detailImages?.length
    ? panel.detailImages
    : [{ src: panel.image, caption: panel.title, kind: panel.kind ?? "render", specLabel: panel.specLabel }];
}

export function ElasticGallery({ cards = [], gallery, activeIndex, onActiveChange }: ElasticGalleryProps) {
  const [internalActive, setInternalActive] = useState(0);
  const [detailIndex, setDetailIndex] = useState<number | null>(null);
  const detailRef = useRef<HTMLDivElement | null>(null);
  const detailTriggerRef = useRef<HTMLButtonElement | null>(null);
  const panels = useMemo<GalleryPanel[]>(() => {
    if (gallery) {
      return gallery.images.map((image) => ({
        key: `${gallery.title}-${image.src}`,
        title: image.caption,
        label: labelForKind(image.kind),
        image: image.src,
        fit: image.kind === "graphic" ? "contain" : "cover",
        kind: image.kind,
        specLabel: image.specLabel,
      }));
    }
    return cards.map((card) => ({
      key: `${card.badge}-${card.title}`,
      title: card.title,
      label: card.badge,
      body: card.body,
      image: card.image,
      fit: card.fit,
      detailImages: card.detailImages,
    }));
  }, [cards, gallery]);
  const active = Math.min(activeIndex ?? internalActive, Math.max(panels.length - 1, 0));
  const detailPanel = detailIndex === null ? null : panels[detailIndex];
  const detailImages = detailPanel ? detailImagesFor(detailPanel) : [];

  useEffect(() => {
    if (detailIndex === null) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDetailIndex(null);
        return;
      }
      if (event.key !== "Tab") return;
      const focusables = Array.from(
        detailRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      ).filter((element) => !element.hasAttribute("disabled") && element.tabIndex >= 0);
      if (!focusables.length) {
        event.preventDefault();
        return;
      }
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    window.requestAnimationFrame(() => detailRef.current?.querySelector<HTMLElement>("[data-gallery-close]")?.focus());
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      const trigger = detailTriggerRef.current;
      window.requestAnimationFrame(() => {
        if (trigger?.isConnected) trigger.focus();
      });
    };
  }, [detailIndex]);

  if (!panels.length) return null;

  const activate = (index: number) => {
    setInternalActive(index);
    onActiveChange?.(index);
  };

  const openDetail = (index: number, trigger: HTMLButtonElement) => {
    detailTriggerRef.current = trigger;
    setDetailIndex(index);
  };

  return (
    <div className="elastic-gallery" aria-label={gallery?.title ?? "Image gallery"}>
      {panels.map((panel, index) => {
        const isActive = active === index;
        return (
          <article
            key={panel.key}
            className={`elastic-item ${isActive ? "is-active" : ""} ${panel.kind ? `is-${panel.kind}` : ""}`}
            onMouseEnter={() => activate(index)}
          >
            <img className={panel.fit === "contain" ? "is-contain" : ""} src={asset(panel.image)} alt="" />
            <div className="elastic-shade" aria-hidden="true" />
            <button className="elastic-panel-trigger" type="button" aria-label={`Show ${panel.title}`} aria-pressed={isActive} onFocus={() => activate(index)} onClick={() => activate(index)} />
            <div className="elastic-content">
              <div className="elastic-active-copy">
                <span className={`elastic-label ${panel.kind ? `is-${panel.kind}` : ""}`}>{panel.label}</span>
                {panel.specLabel && <span className="elastic-spec">{panel.specLabel}</span>}
                <h3>{panel.title}</h3>
                {panel.body && <p>{panel.body}</p>}
                <button className="elastic-cue" type="button" onClick={(event) => openDetail(index, event.currentTarget)}>
                  Click to Expand <ArrowUpRight />
                </button>
              </div>
              <span className="elastic-collapsed-title" aria-hidden="true">{panel.title}</span>
            </div>
          </article>
        );
      })}
      {detailIndex !== null && createPortal(
        <div ref={detailRef} className={`gallery-detail ${detailImages.length > 1 ? "has-multiple" : ""}`} role="dialog" aria-modal="true" aria-label={`${detailPanel?.title ?? "Gallery"} image detail`} onClick={() => setDetailIndex(null)}>
          <div className="gallery-detail-stage" onClick={(event) => event.stopPropagation()}>
            {detailImages.map((image, index) => (
              <figure key={`${image.src}-${index}`} className={`gallery-detail-figure is-${image.kind}`}>
                <div className="gallery-detail-labels">
                  <span className="gallery-kind-label">{labelForKind(image.kind)}</span>
                  {image.specLabel && <span className="gallery-spec-label">{image.specLabel}</span>}
                </div>
                <img src={asset(image.src)} alt={image.caption} />
                <figcaption>{image.caption}</figcaption>
              </figure>
            ))}
          </div>
          <button data-gallery-close autoFocus type="button" className="gallery-detail-close" aria-label="Close image detail" title="Close image detail" onClick={() => setDetailIndex(null)}><X /></button>
        </div>,
        document.body,
      )}
    </div>
  );
}
