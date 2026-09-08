import { useEffect, useState } from "react";
import { acts } from "../../deck.config";

export function ProgressRail() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-act-index]"));
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(Number((visible.target as HTMLElement).dataset.actIndex));
    }, { rootMargin: "-35% 0px -35% 0px", threshold: [0, .2, .5, .8] });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="page-rail" aria-label="Presentation progress">
      {acts.map((act, index) => (
        <a key={act.id} href={`#${act.id}`} className={index === active ? "is-active" : index < active ? "is-complete" : ""} aria-label={`Go to ${act.chapter}`}>
          <span>{act.chapter}</span><i aria-hidden="true" />
        </a>
      ))}
    </nav>
  );
}
