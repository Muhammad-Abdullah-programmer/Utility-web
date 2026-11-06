import { useMemo, useState } from "react";
import { Card, Out, btn, ghost } from "../components/ui";

const sets = {
  Uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  Lowercase: "abcdefghijklmnopqrstuvwxyz",
  Numbers: "0123456789",
  Symbols: "!@#$%^&*()-_=+[]{}",
};
const levels = [[40, "Weak", "bg-red-500"], [60, "Fair", "bg-amber-500"], [80, "Strong", "bg-lime-500"], [Infinity, "Very strong", "bg-emerald-500"]];

export function PasswordGenerator() {
  const [len, setLen] = useState(16);
  const [on, setOn] = useState({ Uppercase: true, Lowercase: true, Numbers: true, Symbols: false });
  const [seed, setSeed] = useState(0);

  const pool = Object.keys(sets).filter((k) => on[k]).map((k) => sets[k]).join("");
  const pw = useMemo(
    () => (pool ? Array.from(crypto.getRandomValues(new Uint32Array(len)), (n) => pool[n % pool.length]).join("") : ""),
    [pool, len, seed]
  );
  const bits = pool ? len * Math.log2(pool.length) : 0;
  const [, label, color] = levels.find(([max]) => bits < max);

  return (
    <Card title="Password Generator">
      <Out label="Password" value={pw || "Pick at least one option"} />
      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
        <div className={`h-full transition-all ${color}`} style={{ width: `${Math.min(100, bits)}%` }} />
      </div>
      <p className="text-sm text-slate-500">Strength: <b>{pool ? label : "—"}</b></p>
      <label className="block text-sm font-medium text-slate-600">
        Length: {len}
        <input type="range" min="8" max="64" value={len} onChange={(e) => setLen(+e.target.value)} className="mt-1 w-full accent-indigo-600" />
      </label>
      <div className="flex flex-wrap gap-2">
        {Object.keys(sets).map((k) => (
          <button key={k} onClick={() => setOn({ ...on, [k]: !on[k] })} className={on[k] ? btn : ghost}>{k}</button>
        ))}
      </div>
      <button className={btn} onClick={() => setSeed(seed + 1)}>↻ Regenerate</button>
    </Card>
  );
}

export function UuidGenerator() {
  const [seed, setSeed] = useState(0);
  const ids = useMemo(() => Array.from({ length: 5 }, () => crypto.randomUUID()), [seed]);
  return (
    <Card title="UUID Generator">
      <div className="space-y-2">
        {ids.map((id) => <Out key={id} label="UUID v4" value={id} />)}
      </div>
      <button className={btn} onClick={() => setSeed(seed + 1)}>↻ Generate new</button>
    </Card>
  );
}
