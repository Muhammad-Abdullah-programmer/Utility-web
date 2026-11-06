import { NavLink, Link } from "react-router-dom";
import { sections } from "../tools";

const links = [{ path: "/", title: "Home" }, ...sections];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link to="/" className="text-xl font-bold text-indigo-600">🧰 UtilityHub</Link>
        <ul className="flex gap-1 text-sm font-medium">
          {links.map(({ path, title }) => (
            <li key={path}>
              <NavLink
                to={path}
                end
                className={({ isActive }) =>
                  `whitespace-nowrap rounded-full px-3 py-1.5 transition ${isActive ? "bg-indigo-600 text-white" : "text-slate-600 hover:bg-slate-100"}`
                }
              >
                {title}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
