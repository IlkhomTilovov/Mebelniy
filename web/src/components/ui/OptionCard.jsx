export default function OptionCard({ label, description, selected, onClick, icon, image }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`w-full text-left rounded-2xl border overflow-hidden transition-all duration-200 flex flex-col min-h-[96px] ${
        selected
          ? "border-accent bg-accent/10 shadow-sm"
          : "border-border bg-surface hover:border-ink/30"
      }`}
    >
      {image && (
        <div className="aspect-[4/3] overflow-hidden bg-sand">
          <img src={image} alt={label} loading="lazy" className="h-full w-full object-cover" />
        </div>
      )}
      <div className="p-5 flex flex-col gap-2">
        {icon && <div className="text-2xl">{icon}</div>}
        <span className="font-semibold text-ink">{label}</span>
        {description && <span className="text-sm text-ink-soft">{description}</span>}
      </div>
    </button>
  );
}
