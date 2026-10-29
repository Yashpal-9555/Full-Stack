import { Building2, CheckCircle2 } from "lucide-react";

export default function About() {
  return (
    <section>
      <h1 className="text-3xl font-bold tracking-tight">
        About Us
      </h1>

      <div className="mb-8 mt-3 h-1 w-12 rounded bg-sky-500" />

      <div className="grid items-center gap-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-2 md:p-10">
        <div className="flex min-h-64 items-center justify-center rounded-xl bg-gradient-to-br from-sky-100 to-blue-200">
          <Building2 size={110} strokeWidth={1.2} className="text-sky-700" />
        </div>

        <div>
          <h2 className="mb-4 text-2xl font-semibold">
            Building better digital experiences
          </h2>

          <p className="leading-7 text-slate-600">
            We are a team of passionate developers building modern
            web applications. Our goal is to create simple, scalable,
            and user-friendly solutions.
          </p>

          <ul className="mt-6 space-y-3 text-slate-700">
            <li className="flex gap-2">
              <CheckCircle2 className="text-sky-600" size={20} />
              Modern technologies
            </li>
            <li className="flex gap-2">
              <CheckCircle2 className="text-sky-600" size={20} />
              Reliable solutions
            </li>
            <li className="flex gap-2">
              <CheckCircle2 className="text-sky-600" size={20} />
              User-focused design
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}