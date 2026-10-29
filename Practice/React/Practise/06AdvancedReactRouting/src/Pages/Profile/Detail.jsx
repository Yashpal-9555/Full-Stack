const details = [
  ["Name", "John Doe"],
  ["Email", "john@example.com"],
  ["Phone", "+91 98765 43210"],
  ["Location", "India"],
  ["Role", "Software Developer"],
  ["Joined", "January 2026"],
];

export default function Detail() {
  return (
    <section>
      <h1 className="text-3xl font-bold">Profile Details</h1>
      <div className="mb-8 mt-3 h-1 w-12 rounded bg-sky-500" />

      <div className="overflow-hidden rounded-xl border border-slate-200">
        {details.map(([label, value]) => (
          <div
            key={label}
            className="grid grid-cols-1 gap-1 border-b border-slate-200 p-4 last:border-b-0 sm:grid-cols-[140px_1fr]"
          >
            <span className="text-sm text-slate-500">{label}</span>
            <span className="font-medium text-slate-800">{value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}