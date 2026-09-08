export function StampSeal({ label, active = false, onActivate }: { label: string; active?: boolean; onActivate?: () => void }) {
  return (
    <button
      className={`stamp ${active ? "is-active" : ""}`}
      type="button"
      aria-label={`Show ${label}`}
      aria-pressed={active}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      onClick={onActivate}
    >
      <span className="stamp-mark" aria-hidden="true"><i /></span>
      <span className="stamp-label">{label}</span>
    </button>
  );
}
