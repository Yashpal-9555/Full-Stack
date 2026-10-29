import { FileText, Users, Settings } from "lucide-react";

const cards = [
  {
    title: "Our Mission",
    description: "To build innovative solutions that make a difference.",
    Icon: FileText,
    color: "bg-sky-100 text-sky-600",
  },
  {
    title: "Our Team",
    description: "A diverse group of skilled professionals.",
    Icon: Users,
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    title: "Our Values",
    description: "Integrity, innovation, and customer focus.",
    Icon: Settings,
    color: "bg-violet-100 text-violet-600",
  },
];

export default function Info() {
  return (
    <section>
      <h1 className="text-3xl font-bold">Information</h1>
      <div className="mb-8 mt-3 h-1 w-12 rounded bg-sky-500" />

      <div className="grid gap-6 md:grid-cols-3">
        {cards.map(({ title, description, Icon, color }) => (
          <article
            key={title}
            className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div
              className={`mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full ${color}`}
            >
              <Icon size={26} />
            </div>

            <h2 className="mb-3 text-lg font-semibold">{title}</h2>
            <p className="leading-6 text-slate-600">{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}