const modules = import.meta.glob<string>("./assets/*", {
  eager: true,
  query: "?inline",
  import: "default",
});

export function asset(filename: string) {
  const entry = Object.entries(modules).find(([path]) => path.endsWith(`/${filename}`));
  if (!entry) throw new Error(`ASSET MISSING: ${filename}`);
  return entry[1];
}

export const slideAssetUrl = (filename: string) => {
  const base = import.meta.env.VITE_ASSET_BASE_URL?.replace(/\/$/, "");
  return base ? `${base}/master/${filename.replace(/\.jpg$/, ".jpg")}` : null;
};
