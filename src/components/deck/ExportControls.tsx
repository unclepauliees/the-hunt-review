import { useState } from "react";
import Download from "lucide-react/dist/esm/icons/download";
import LoaderCircle from "lucide-react/dist/esm/icons/loader-circle";
import Presentation from "lucide-react/dist/esm/icons/presentation";
import { exportPptx } from "../../export/pptxExporter";
import { exportToSlides } from "../../export/slidesExporter";

export function ExportControls() {
  const [busy, setBusy] = useState<"pptx" | "slides" | null>(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const directSlidesEnabled = Boolean(import.meta.env.VITE_ASSET_BASE_URL && import.meta.env.VITE_GOOGLE_CLIENT_ID);
  const run = async (kind: "pptx" | "slides") => {
    setBusy(kind); setError(""); setNotice("");
    try {
      if (kind === "pptx") {
        await exportPptx();
        setNotice("Downloaded the-hunt.pptx");
      } else if (directSlidesEnabled) {
        await exportToSlides();
        setNotice("Opened the editable Google Slides deck");
      } else {
        const slidesWindow = window.open("https://docs.google.com/presentation/u/0/", "_blank", "noopener,noreferrer");
        await exportPptx();
        if (!slidesWindow) throw new Error("The deck downloaded, but the Google Slides window was blocked. Allow pop-ups, then open the-hunt.pptx in Google Slides.");
        setNotice("Downloaded the-hunt.pptx. In Google Slides, choose File > Open > Upload.");
      }
    }
    catch (cause) { setError(cause instanceof Error ? cause.message : "Export failed. Try again."); }
    finally { setBusy(null); }
  };
  return <div className="export-cluster">
    {error && <p role="alert">{error}</p>}
    {!error && notice && <p role="status">{notice}</p>}
    <button type="button" disabled={busy !== null} onClick={() => run("slides")} title={directSlidesEnabled ? "Export editable Google Slides" : "Download the deck and open Google Slides for upload"}>{busy === "slides" ? <LoaderCircle className="spin" /> : <Presentation />}<span>Export to Slides</span></button>
    <button type="button" disabled={busy !== null} onClick={() => run("pptx")} title="Download an editable PowerPoint deck">{busy === "pptx" ? <LoaderCircle className="spin" /> : <Download />}<span>Download .pptx</span></button>
  </div>;
}
