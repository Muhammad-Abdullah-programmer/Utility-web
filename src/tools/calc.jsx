import { useState } from "react";
import { Card, Field, Num, Select, Pills, Out, input } from "../components/ui";

const fmt = (n) => (Number.isFinite(n) ? n.toLocaleString(undefined, { maximumFractionDigits: 6 }) : "—");

const units = {
  Length: { m: 1, km: 1000, cm: 0.01, mm: 0.001, mi: 1609.344, ft: 0.3048, in: 0.0254 },
  Weight: { kg: 1, g: 0.001, lb: 0.45359237, oz: 0.0283495 },
  Data: { B: 1, KB: 1024, MB: 1024 ** 2, GB: 1024 ** 3, TB: 1024 ** 4 },
  Temperature: { C: [(v) => v, (v) => v], F: [(v) => ((v - 32) * 5) / 9, (v) => (v * 9) / 5 + 32], K: [(v) => v - 273.15, (v) => v + 273.15] },
};
const convert = (cat, v, f, t) =>
  cat === "Temperature" ? units[cat][t][1](units[cat][f][0](v)) : (v * units[cat][f]) / units[cat][t];

export function UnitConverter() {
  const [cat, setCat] = useState("Length");
  const [v, setV] = useState("1");
  const [from, setFrom] = useState("m");
  const [to, setTo] = useState("ft");
  const keys = Object.keys(units[cat]);
  const pick = (c) => { const k = Object.keys(units[c]); setCat(c); setFrom(k[0]); setTo(k[1]); };
  return (
    <Card title="Unit Converter">
      <Pills options={Object.keys(units)} value={cat} onChange={pick} />
      <div className="grid gap-3 sm:grid-cols-3">
        <Num label="Value" value={v} onChange={setV} />
        <Field label="From"><Select value={from} onChange={setFrom} options={keys} /></Field>
        <Field label="To"><Select value={to} onChange={setTo} options={keys} /></Field>
      </div>
      <Out label="Result" value={`${fmt(convert(cat, Number(v), from, to))} ${to}`} />
    </Card>
  );
}

const modes = {
  "X% of Y": (x, y) => (x * y) / 100,
  "X is what % of Y": (x, y) => (x / y) * 100,
  "% change X → Y": (x, y) => ((y - x) / x) * 100,
};

export function Percentage() {
  const [mode, setMode] = useState("X% of Y");
  const [x, setX] = useState("10");
  const [y, setY] = useState("200");
  const r = modes[mode](Number(x), Number(y));
  return (
    <Card title="Percentage Calculator">
      <Pills options={Object.keys(modes)} value={mode} onChange={setMode} />
      <div className="grid gap-3 sm:grid-cols-2">
        <Num label="X" value={x} onChange={setX} />
        <Num label="Y" value={y} onChange={setY} />
      </div>
      <Out label="Result" value={mode === "X% of Y" ? fmt(r) : `${fmt(r)}%`} />
    </Card>
  );
}

export function Bmi() {
  const [h, setH] = useState("175");
  const [w, setW] = useState("70");
  const bmi = Number(w) / (Number(h) / 100) ** 2;
  const cat = bmi < 18.5 ? "Underweight" : bmi < 25 ? "Normal" : bmi < 30 ? "Overweight" : "Obese";
  const ok = Number(h) > 0 && Number(w) > 0;
  return (
    <Card title="BMI Calculator">
      <div className="grid gap-3 sm:grid-cols-2">
        <Num label="Height (cm)" value={h} onChange={setH} />
        <Num label="Weight (kg)" value={w} onChange={setW} />
      </div>
      <Out label="BMI" value={ok ? bmi.toFixed(1) : "—"} />
      <Out label="Category" value={ok ? cat : "—"} />
    </Card>
  );
}

function ageOf(date) {
  const b = new Date(date), n = new Date();
  if (!date || b > n) return null;
  let y = n.getFullYear() - b.getFullYear(), m = n.getMonth() - b.getMonth(), d = n.getDate() - b.getDate();
  if (d < 0) { m--; d += new Date(n.getFullYear(), n.getMonth(), 0).getDate(); }
  if (m < 0) { y--; m += 12; }
  const next = new Date(n.getFullYear(), b.getMonth(), b.getDate());
  if (next < n) next.setFullYear(n.getFullYear() + 1);
  return { text: `${y}y ${m}m ${d}d`, days: Math.ceil((next - n) / 864e5) };
}

export function Age() {
  const [dob, setDob] = useState("");
  const a = ageOf(dob);
  return (
    <Card title="Age Calculator">
      <Field label="Date of birth">
        <input type="date" className={input} value={dob} onChange={(e) => setDob(e.target.value)} />
      </Field>
      <Out label="Age" value={a?.text ?? "—"} />
      <Out label="Next birthday" value={a ? `in ${a.days} days` : "—"} />
    </Card>
  );
}

export function Tip() {
  const [bill, setBill] = useState("50");
  const [pct, setPct] = useState("15");
  const [people, setPeople] = useState("2");
  const tip = (Number(bill) * Number(pct)) / 100;
  const total = Number(bill) + tip;
  return (
    <Card title="Tip Splitter">
      <div className="grid gap-3 sm:grid-cols-3">
        <Num label="Bill" value={bill} onChange={setBill} />
        <Num label="Tip %" value={pct} onChange={setPct} />
        <Num label="People" value={people} onChange={setPeople} min={1} />
      </div>
      <Out label="Tip" value={fmt(tip)} />
      <Out label="Total" value={fmt(total)} />
      <Out label="Per person" value={fmt(total / Math.max(1, Number(people)))} />
    </Card>
  );
}

const hexToRgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
function rgbToHsl([r, g, b]) {
  [r, g, b] = [r, g, b].map((v) => v / 255);
  const max = Math.max(r, g, b), min = Math.min(r, g, b), l = (max + min) / 2, d = max - min;
  if (!d) return [0, 0, Math.round(l * 100)];
  const s = d / (1 - Math.abs(2 * l - 1));
  const h = max === r ? ((g - b) / d) % 6 : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
  return [Math.round((h * 60 + 360) % 360), Math.round(s * 100), Math.round(l * 100)];
}

export function ColorConverter() {
  const [hex, setHex] = useState("#6366f1");
  const valid = /^#[0-9a-f]{6}$/i.test(hex);
  const rgb = valid ? hexToRgb(hex) : null;
  const [h, s, l] = rgb ? rgbToHsl(rgb) : [];
  return (
    <Card title="Color Converter">
      <div className="flex items-center gap-3">
        <input type="color" className="h-11 w-14 cursor-pointer rounded-lg" value={valid ? hex : "#000000"} onChange={(e) => setHex(e.target.value)} />
        <input className={`${input} max-w-40 font-mono`} value={hex} onChange={(e) => setHex(e.target.value)} />
        <div className="h-11 flex-1 rounded-xl border border-slate-200" style={{ background: valid ? hex : "transparent" }} />
      </div>
      <Out label="HEX" value={valid ? hex.toLowerCase() : "—"} />
      <Out label="RGB" value={rgb ? `rgb(${rgb.join(", ")})` : "—"} />
      <Out label="HSL" value={rgb ? `hsl(${h}, ${s}%, ${l}%)` : "—"} />
    </Card>
  );
}
