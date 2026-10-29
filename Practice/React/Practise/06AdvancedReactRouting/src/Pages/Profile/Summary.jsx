import {
  BriefcaseBusiness,
  ChartNoAxesColumn,
  Layers,
  Users,
} from "lucide-react";

const stats = [
  {
    value: "12",
    label: "Projects Completed",
    Icon: BriefcaseBusiness,
    color: "bg-sky-50 text-sky-700",
  },
  {
    value: "3",
    label: "Years Experience",
    Icon: ChartNoAxesColumn,
    color: "bg-emerald-50 text-emerald-700",
  },
  {
    value: "5",
    label: "Technologies",
    Icon: Layers,
    color: "bg-violet-50 text-violet-700",
  },
  {
    value: "10+",
    label: "Happy Clients",
    Icon: Users,
    color: "bg-rose-50 text-rose-700",
  },
];

export default function Summary() {
  return (
    <section>
      <h1 className="text-3xl font-bold">Profile Summary</h1>
      <div className="mb-8 mt-3 h-1 w-12 rounded bg-sky-500" />

      <div className="grid gap-4 sm:grid-cols-2">
        {stats.map(({ value, label, Icon, color }) => (
          <article
            key={label}
            className={`rounded-xl p-5 ${color}`}
          >
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold">{value}</span>
              <Icon size={25} />
            </div>
            <p className="mt-2 text-sm font-medium">{label}</p>
          </article>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="mb-3 text-xl font-semibold">About Me</h2>
        <p className="leading-7 text-slate-600">
          I am a software developer interested in building scalable
          web applications. I enjoy learning new technologies and
          solving real-world problems.
        </p>
      </div>
    </section>
  );
}