import { NavLink, Outlet, Link } from "react-router-dom";
import { UserRound, FileText, ChartNoAxesColumn } from "lucide-react";

const sidebarLink = ({ isActive }) =>
  `flex items-center gap-3 rounded-lg px-4 py-3 transition ${
    isActive
      ? "bg-sky-100 font-semibold text-sky-700"
      : "text-slate-600 hover:bg-slate-100"
  }`;

export default function ProfileLayout() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="flex items-center justify-between border-b bg-white px-6 py-4">
        <Link to="/home/about" className="text-xl font-bold text-slate-800">
          MyApp
        </Link>
        <Link
          to="/home/about"
          className="text-sm font-medium text-sky-700 hover:text-sky-900"
        >
          Back to Home
        </Link>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 p-4 md:grid-cols-[240px_1fr] md:p-8">
        <aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-7 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-200">
              <UserRound size={26} className="text-slate-600" />
            </div>
            <div>
              <h2 className="font-semibold">John Doe</h2>
              <p className="text-xs text-slate-500">john@example.com</p>
            </div>
          </div>

          <nav className="space-y-2">
            <NavLink to="detail" className={sidebarLink}>
              <FileText size={19} />
              Detail
            </NavLink>

            <NavLink to="summary" className={sidebarLink}>
              <ChartNoAxesColumn size={19} />
              Summary
            </NavLink>
          </nav>
        </aside>

        <main className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}