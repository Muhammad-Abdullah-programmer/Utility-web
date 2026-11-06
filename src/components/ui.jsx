import { useState } from "react";

export const input = "w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-400";
export const btn = "rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-indigo-700";
export const ghost = "rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-medium transition hover:bg-slate-200";

export const Card = ({ title, children }) => (
  <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
    <h2 className="text-lg font-bold">{title}</h2>
    {children}
  </section>
);

export const Field = ({ label, children }) => (
  <label className="block space-y-1 text-sm font-medium text-slate-600">
    <span>{label}</span>
    {children}
  </label>
);

export const Num = ({ label, value, onChange, ...rest }) => (
  <Field label={label}>
    <input type="number" className={input} value={value} onChange={(e) => onChange(e.target.value)} {...rest} />
  </Field>
);

export const Select = ({ value, onChange, options }) => (
  <select className={input} value={value} onChange={(e) => onChange(e.target.value)}>
    {options.map((o) => <option key={o}>{o}</option>)}
  </select>
);

export const Pills = ({ options, value, onChange }) => (
  <div className="flex flex-wrap gap-2">
    {options.map((o) => (
      <button
        key={o}
        onClick={() => onChange(o)}
        className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${value === o ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
      >
        {o}
      </button>
    ))}
  </div>
);

export const Stat = ({ label, value }) => (
  <div className="rounded-xl bg-slate-50 p-3 text-center">
    <p className="text-xl font-bold text-indigo-600">{value}</p>
    <p className="text-xs text-slate-500">{label}</p>
  </div>
);

export function CopyBtn({ text }) {
  const [ok, setOk] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setOk(true);
      setTimeout(() => setOk(false), 1200);
    } catch { /* clipboard unavailable */ }
  };
  return <button onClick={copy} className={ghost}>{ok ? "Copied ✓" : "Copy"}</button>;
}

export const Out = ({ label, value }) => (
  <div className="flex items-center gap-3 rounded-xl bg-slate-50 px-3 py-2 text-sm">
    <span className="w-24 shrink-0 text-slate-500">{label}</span>
    <span className="flex-1 break-all font-mono font-semibold">{value}</span>
    <CopyBtn text={String(value)} />
  </div>
);
