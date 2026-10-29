import { NavLink, Link } from "react-router-dom";
import { UserRound } from "lucide-react";

const navClass = ({ isActive }) =>
  `border-b-2 px-1 py-2 text-sm transition ${
    isActive
      ? "border-sky-400 text-white"
      : "border-transparent text-slate-300 hover:text-white"
  }`;

export default function Header() {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 bg-[#14283d] px-6 py-4 text-white shadow-lg">
      <Link to="/home/about" className="text-xl font-bold">
        MyApp
      </Link>

      <nav className="flex flex-wrap items-center gap-5">
        <NavLink to="/home/about" className={navClass}>
          About Us
        </NavLink>

        <NavLink to="/home/contact" className={navClass}>
          Contact
        </NavLink>

        <NavLink to="/home/info" className={navClass}>
          Info
        </NavLink>

        <NavLink
          to="/profile/detail"
          className={({ isActive }) =>
            `flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition ${
              isActive
                ? "bg-sky-500 text-white"
                : "text-slate-300 hover:bg-slate-700 hover:text-white"
            }`
          }
        >
          <UserRound size={17} />
          Profile
        </NavLink>
      </nav>
    </header>
  );
}