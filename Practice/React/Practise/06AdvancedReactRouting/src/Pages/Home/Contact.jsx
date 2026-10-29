import { Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <section>
      <h1 className="text-3xl font-bold">Contact Us</h1>
      <div className="mb-8 mt-3 h-1 w-12 rounded bg-sky-500" />

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
          <div className="flex items-start gap-4">
            <Mail className="text-sky-600" />
            <div>
              <h3 className="font-semibold">Email</h3>
              <p className="text-slate-500">support@myapp.com</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Phone className="text-sky-600" />
            <div>
              <h3 className="font-semibold">Phone</h3>
              <p className="text-slate-500">+91 98765 43210</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <MapPin className="text-sky-600" />
            <div>
              <h3 className="font-semibold">Address</h3>
              <p className="text-slate-500">123 Main Street, India</p>
            </div>
          </div>
        </div>

        <form
          className="space-y-4 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm"
          onSubmit={(e) => {
            e.preventDefault();
            alert("Demo form submitted!");
          }}
        >
          <h2 className="text-xl font-semibold">Send a Message</h2>

          <input
            required
            placeholder="Your Name"
            className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-sky-500"
          />

          <input
            required
            type="email"
            placeholder="Your Email"
            className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-sky-500"
          />

          <textarea
            required
            rows="4"
            placeholder="Your Message"
            className="w-full resize-y rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-sky-500"
          />

          <button
            type="submit"
            className="w-full rounded-lg bg-sky-600 px-4 py-3 font-semibold text-white transition hover:bg-sky-700"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}