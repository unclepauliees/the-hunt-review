import { acts, exportImageForAct } from "../deck.config";
import { slideAssetUrl } from "../assets";

declare global {
  interface Window { google?: { accounts: { oauth2: { initTokenClient(config: { client_id: string; scope: string; callback: (response: { access_token?: string; error?: string }) => void }): { requestAccessToken(): void } } } } }
}

const loadGoogleIdentity = () => new Promise<void>((resolve, reject) => {
  if (window.google) return resolve();
  const script = document.createElement("script");
  script.src = "https://accounts.google.com/gsi/client";
  script.onload = () => resolve(); script.onerror = () => reject(new Error("Google Identity Services could not load."));
  document.head.appendChild(script);
});

const requestToken = async () => {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  if (!clientId) throw new Error("Set VITE_GOOGLE_CLIENT_ID to enable Slides export.");
  await loadGoogleIdentity();
  return await new Promise<string>((resolve, reject) => {
    const client = window.google!.accounts.oauth2.initTokenClient({ client_id: clientId, scope: "https://www.googleapis.com/auth/presentations https://www.googleapis.com/auth/drive.file", callback: (response) => response.access_token ? resolve(response.access_token) : reject(new Error(response.error ?? "Google authorization failed.")) });
    client.requestAccessToken();
  });
};

const api = async (url: string, token: string, body?: unknown) => {
  const response = await fetch(url, { method: body ? "POST" : "GET", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }, body: body ? JSON.stringify(body) : undefined });
  if (!response.ok) throw new Error(`Google Slides API error ${response.status}`);
  return response.json();
};

export async function exportToSlides() {
  if (!import.meta.env.VITE_ASSET_BASE_URL) throw new Error("Set VITE_ASSET_BASE_URL to enable Slides export.");
  const token = await requestToken();
  const presentation = await api("https://slides.googleapis.com/v1/presentations", token, { title: "The Hunt - Campaign Kick-Off 2026", pageSize: { width: { magnitude: 720, unit: "PT" }, height: { magnitude: 405, unit: "PT" } } });
  const starterSlideId = presentation.slides?.[0]?.objectId as string | undefined;
  for (const act of acts) {
    const slideId = `act_${act.index}`;
    if (act.kind === "reference") {
      const requests: unknown[] = [
        { createSlide: { objectId: slideId, slideLayoutReference: { predefinedLayout: "BLANK" } } },
        { createImage: { url: slideAssetUrl(act.referenceImage!), elementProperties: { pageObjectId: slideId, size: { width: { magnitude: 720, unit: "PT" }, height: { magnitude: 405, unit: "PT" } }, transform: { scaleX: 1, scaleY: 1, translateX: 0, translateY: 0, unit: "PT" } } } },
      ];
      await api(`https://slides.googleapis.com/v1/presentations/${presentation.presentationId}:batchUpdate`, token, { requests });
      continue;
    }
    const bgName = act.background === "keyart" ? "keyart-16x9.jpg" : `${act.background}-16x9.jpg`;
    const exportImage = exportImageForAct(act);
    const hasImage = Boolean(exportImage);
    const requests: unknown[] = [
      { createSlide: { objectId: slideId, slideLayoutReference: { predefinedLayout: "BLANK" } } },
      { createImage: { url: slideAssetUrl(bgName), elementProperties: { pageObjectId: slideId, size: { width: { magnitude: 720, unit: "PT" }, height: { magnitude: 405, unit: "PT" } }, transform: { scaleX: 1, scaleY: 1, translateX: 0, translateY: 0, unit: "PT" } } } },
      { createShape: { objectId: `${slideId}_title`, shapeType: "TEXT_BOX", elementProperties: { pageObjectId: slideId, size: { width: { magnitude: 620, unit: "PT" }, height: { magnitude: 70, unit: "PT" } }, transform: { scaleX: 1, scaleY: 1, translateX: 48, translateY: 48, unit: "PT" } } } },
      { insertText: { objectId: `${slideId}_title`, text: act.headline } },
      { updateTextStyle: { objectId: `${slideId}_title`, style: { fontFamily: "Spectral", fontSize: { magnitude: 40, unit: "PT" }, foregroundColor: { opaqueColor: { rgbColor: { red: .894, green: .741, blue: .588 } } } }, textRange: { type: "ALL" }, fields: "fontFamily,fontSize,foregroundColor" } },
    ];
    if (exportImage) requests.push({ createImage: { url: slideAssetUrl(exportImage.src), elementProperties: { pageObjectId: slideId, size: { width: { magnitude: 320, unit: "PT" }, height: { magnitude: 250, unit: "PT" } }, transform: { scaleX: 1, scaleY: 1, translateX: 28, translateY: 118, unit: "PT" } } } });
    const body = [
      ...(act.body ?? []),
      ...(act.bullets ?? []).flatMap((group) => [group.label, ...group.items.map((item) => `• ${item}`)]),
      ...(act.cards ?? []).flatMap((card) => [`${card.badge} / ${card.title}`, card.body].filter(Boolean)),
    ].join("\n\n");
    if (body) requests.push(
      { createShape: { objectId: `${slideId}_body`, shapeType: "TEXT_BOX", elementProperties: { pageObjectId: slideId, size: { width: { magnitude: hasImage ? 330 : 620, unit: "PT" }, height: { magnitude: 240, unit: "PT" } }, transform: { scaleX: 1, scaleY: 1, translateX: hasImage ? 365 : 48, translateY: 125, unit: "PT" } } } },
      { insertText: { objectId: `${slideId}_body`, text: body } },
      { updateTextStyle: { objectId: `${slideId}_body`, style: { fontFamily: "Spectral", fontSize: { magnitude: 14, unit: "PT" }, foregroundColor: { opaqueColor: { rgbColor: { red: .894, green: .741, blue: .588 } } } }, textRange: { type: "ALL" }, fields: "fontFamily,fontSize,foregroundColor" } },
    );
    await api(`https://slides.googleapis.com/v1/presentations/${presentation.presentationId}:batchUpdate`, token, { requests });
  }
  if (starterSlideId) await api(`https://slides.googleapis.com/v1/presentations/${presentation.presentationId}:batchUpdate`, token, { requests: [{ deleteObject: { objectId: starterSlideId } }] });
  window.open(`https://docs.google.com/presentation/d/${presentation.presentationId}/edit`, "_blank", "noopener,noreferrer");
}
