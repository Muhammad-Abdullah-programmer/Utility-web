import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ToolPage from "./pages/ToolPage";
import Home from "./pages/Home";
import { sections } from "./tools";

export default function App() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          {sections.map((s) => (
            <Route key={s.path} path={s.path} element={<ToolPage {...s} />} />
          ))}
        </Routes>
      </main>
      <footer className="border-t border-slate-200 py-6 text-center text-sm text-slate-500">
        UtilityHub · Everything runs in your browser. Nothing is uploaded.
      </footer>
    </>
  );
}
