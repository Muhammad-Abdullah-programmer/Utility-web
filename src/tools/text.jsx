import { useState } from "react";
import { Card, CopyBtn, Stat, Select, Pills, Num, input, btn, ghost } from "../components/ui";

const area = `${input} h-40 font-mono`;

export function WordCounter() {
  const [t, setT] = useState("");
  const words = t.trim() ? t.trim().split(/\s+/).length : 0;
  const stats = [
    ["Words", words],
    ["Characters", t.length],
    ["Sentences", (t.match(/[.!?]+/g) || []).length],
    ["Read time", `${Math.ceil(words / 200)} min`],
  ];
  return (
    <Card title="Word Counter">
      <textarea className={area} placeholder="Type or paste text…" value={t} onChange={(e) => setT(e.target.value)} />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map(([l, v]) => <Stat key={l} label={l} value={v} />)}
      </div>
    </Card>
  );
}

const words = (s) => (s.match(/[A-Za-z0-9]+/g) ?? []).map((w) => w.toLowerCase());
const cap = (w) => w[0].toUpperCase() + w.slice(1);
const cases = {
  UPPERCASE: (s) => s.toUpperCase(),
  lowercase: (s) => s.toLowerCase(),
  "Title Case": (s) => s.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase()),
  camelCase: (s) => words(s).map((w, i) => (i ? cap(w) : w)).join(""),
  snake_case: (s) => words(s).join("_"),
  "kebab-case": (s) => words(s).join("-"),
};

export function CaseConverter() {
  const [t, setT] = useState("");
  return (
    <Card title="Case Converter">
      <textarea className={area} placeholder="Type or paste text…" value={t} onChange={(e) => setT(e.target.value)} />
      <div className="flex flex-wrap gap-2">
        {Object.entries(cases).map(([name, fn]) => (
          <button key={name} className={ghost} onClick={() => setT(fn(t))}>{name}</button>
        ))}
        <CopyBtn text={t} />
      </div>
    </Card>
  );
}

export function JsonTool() {
  const [t, setT] = useState('{"name":"UtilityHub","tools":[1,2,3]}');
  const [err, setErr] = useState("");
  const run = (space) => {
    try { setT(JSON.stringify(JSON.parse(t), null, space)); setErr(""); }
    catch (e) { setErr(e.message); }
  };
  return (
    <Card title="JSON Formatter">
      <textarea className={`${area} h-56`} value={t} onChange={(e) => setT(e.target.value)} />
      <div className="flex flex-wrap gap-2">
        <button className={btn} onClick={() => run(2)}>Format</button>
        <button className={ghost} onClick={() => run(0)}>Minify</button>
        <CopyBtn text={t} />
      </div>
      {err && <p className="text-sm text-red-600">⚠ {err}</p>}
    </Card>
  );
}

const codecs = {
  Base64: [
    (s) => btoa(Array.from(new TextEncoder().encode(s), (b) => String.fromCharCode(b)).join("")),
    (s) => new TextDecoder().decode(Uint8Array.from(atob(s), (c) => c.charCodeAt(0))),
  ],
  URL: [encodeURIComponent, decodeURIComponent],
};

export function EncodeTool() {
  const [t, setT] = useState("");
  const [type, setType] = useState("Base64");
  const [mode, setMode] = useState("Encode");
  let out;
  try { out = codecs[type][mode === "Encode" ? 0 : 1](t); } catch { out = "⚠ Invalid input for this mode"; }
  return (
    <Card title="Base64 / URL Encoder">
      <div className="flex flex-wrap gap-4">
        <Pills options={Object.keys(codecs)} value={type} onChange={setType} />
        <Pills options={["Encode", "Decode"]} value={mode} onChange={setMode} />
      </div>
      <textarea className={`${area} h-28`} placeholder="Input…" value={t} onChange={(e) => setT(e.target.value)} />
      <textarea className={`${area} h-28 bg-slate-50`} readOnly value={out} />
      <CopyBtn text={out} />
    </Card>
  );
}

const W = "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua".split(" ");
const sentence = (i) => {
  const s = Array.from({ length: 10 }, (_, j) => W[(i * 5 + j * 3) % W.length]).join(" ");
  return `${s[0].toUpperCase()}${s.slice(1)}.`;
};
const paragraph = (p) => Array.from({ length: 4 }, (_, i) => sentence(p * 4 + i)).join(" ");

export function Lorem() {
  const [n, setN] = useState(3);
  const count = Math.min(10, Math.max(1, Number(n) || 1));
  const text = Array.from({ length: count }, (_, p) => paragraph(p)).join("\n\n");
  return (
    <Card title="Lorem Ipsum Generator">
      <div className="max-w-40"><Num label="Paragraphs (1–10)" value={n} onChange={setN} min={1} max={10} /></div>
      <textarea className={`${area} h-56`} readOnly value={text} />
      <CopyBtn text={text} />
    </Card>
  );
}
