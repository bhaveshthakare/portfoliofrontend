export default function SectionHeading({ index, label, title, hint }) {
  const lines = Array.isArray(hint) ? hint : hint ? [hint] : [];
  return (
    <div className="mb-12">
      <p className="font-mono text-xs tracking-widest">
        <span className="text-gradient font-bold">[{index}]</span>
        <span className="text-cyan ml-2">{label}</span>
      </p>
      <h2 className="mt-2 font-display text-3xl md:text-4xl font-bold text-gradient">{title}</h2>
      {lines.map((line) => (
        <p key={line} className="mt-3 text-mute max-w-2xl">
          {line}
        </p>
      ))}
    </div>
  );
}