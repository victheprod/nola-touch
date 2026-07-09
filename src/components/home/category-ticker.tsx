const items = [
  "Hair Extensions",
  "Wigs & Frontals",
  "Natural Hair Care",
  "Edge Control",
  "Accessories",
  "Same-Week Shipping",
  "New Arrivals Weekly",
];

export function CategoryTicker() {
  const track = [...items, ...items].flatMap((label) => [label, "✦"]);

  return (
    <div
      className="overflow-hidden border-y border-white/5 bg-[#0D0D0D] py-4"
      aria-hidden
    >
      <div className="animate-marquee flex w-max gap-10 whitespace-nowrap">
        {track.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="shrink-0 text-[0.625rem] font-medium uppercase tracking-[0.26em]"
            style={{ color: item === "✦" ? "var(--gold)" : "var(--muted-soft)" }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
