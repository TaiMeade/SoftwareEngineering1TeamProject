import Link from "next/link";
import { NAV_ITEMS } from "~/utils";

const Navbar: React.FC = () => {
  return (
    <nav
      role="navigation"
      className="relative flex h-16 items-center justify-between bg-zinc-400 px-4 font-mono text-black shadow-sm"
    >
      <h1>Navbar</h1>

      <ul className="flex flex-row gap-4">
        {NAV_ITEMS.map((item) => (
          <Link key={item.label} href={item.href}>
            <li>{item.label}</li>
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
