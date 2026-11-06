import { useState } from "react";
import { Link } from "react-router-dom";
import { sections } from "../tools";
import { PasswordGenerator, UuidGenerator } from "../tools/generate";
import { input } from "../components/ui";

const all = sections.flatMap((s) => s.tools.map((t) => ({ ...t, to: `${s.path}?t=${t.id}` })));

export default function Home() {
  const [q, setQ] = useState("");
  const hits = all.filter((t) => `${t.label} ${t.desc}`.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="space-y-12">
      <section className="rounded-3xl bg-gradient-to-br from-indigo-600 to-purple-700 p-8 text-white sm:p-12">
        <h1 className="max-w-xl text-4xl font-extrabold sm:text-5xl">Everyday tools, one tab.</h1>
        <p className="mt-3 max-w-lg text-indigo-100">Text, developer, math and converter tools. Fast, free and private.</p>
        <input
          className={`${input} mt-6 max-w-md border-0 text-slate-800`}
          placeholder={`Search ${all.length} tools…`}
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold">All tools</h2>
        {hits.length ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {hits.map((t) => (
              <Link key={t.id} to={t.to} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <p className="text-3xl">{t.icon}</p>
                <h3 className="mt-2 font-bold">{t.label}</h3>
                <p className="text-sm text-slate-500">{t.desc}</p>
              </Link>
            ))}
          </div>
        ) : (
          <p className="py-10 text-center text-slate-500">No tools match “{q}”.</p>
        )}
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold">Quick generators</h2>
        <div className="grid gap-5 lg:grid-cols-2">
          <PasswordGenerator />
          <UuidGenerator />
        </div>
      </section>
    </div>
  );
}
