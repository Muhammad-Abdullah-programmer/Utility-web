import { useSearchParams } from "react-router-dom";
import { Pills } from "../components/ui";

const label = (t) => `${t.icon} ${t.label}`;

export default function ToolPage({ title, desc, tools }) {
  const [params, setParams] = useSearchParams();
  const active = tools.find((t) => t.id === params.get("t")) ?? tools[0];

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-slate-500">{desc}</p>
      </header>
      <Pills
        options={tools.map(label)}
        value={label(active)}
        onChange={(l) => setParams({ t: tools.find((t) => label(t) === l).id })}
      />
      <active.Component key={active.id} />
    </div>
  );
}
