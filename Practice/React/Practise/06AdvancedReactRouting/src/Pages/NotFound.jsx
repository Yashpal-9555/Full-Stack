import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-5">
      <div className="text-center">
        <h1 className="text-8xl font-extrabold tracking-tight text-slate-800">
          404
        </h1>

        <h2 className="mt-4 text-2xl font-bold">Page Not Found</h2>

        <p className="mt-3 text-slate-500">
          The page you are looking for does not exist.
        </p>

        <Link
          to="/home/about"
          className="mt-7 inline-flex items-center gap-2 rounded-lg bg-sky-600 px-5 py-3 font-semibold text-white transition hover:bg-sky-700"
        >
          <ArrowLeft size={18} />
          Go to Home
        </Link>
      </div>
    </main>
  );
}