import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="flex flex-wrap items-center justify-between gap-3 bg-[#14283d] px-6 py-5 text-sm text-slate-300">
      <p>© 2026 MyApp. All rights reserved.</p>

      <div className="flex gap-4">
        <Link to="/home/info" className="hover:text-white">
          Privacy
        </Link>
        <Link to="/home/info" className="hover:text-white">
          Terms
        </Link>
        <Link to="/home/contact" className="hover:text-white">
          Help
        </Link>
      </div>
    </footer>
  );
}