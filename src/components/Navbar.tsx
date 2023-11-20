import Link from "next/link";

import { getAuth } from "~/server/session";
import { NAV_ITEMS } from "~/utils";

import SignInButton from "./auth/SignInButton";
import Avatar from "./auth/Avatar";

import SearchBar from "./search/SearchBar";

const Navbar: React.FC = async () => {
  const session = await getAuth();

  // TODO: Display admin navbar below
  return (
    <nav
      role="navigation"
      className="navbar fixed z-10 h-[var(--navbar-height)] space-x-2 border-b border-icook-text bg-icook-nav px-4"
    >
      <div className="navbar-start">
        <Link href="/" className="link-hover link text-4xl">
          iCook
        </Link>
      </div>

      <div className="navbar-center hidden md:block">
        <SearchBar />
      </div>

      <div className="navbar-end space-x-2">
        <ul className="flex flex-row items-center gap-3">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              as="li"
              className="link-hover link"
            >
              {item.label}
            </Link>
          ))}

          <li className="ml-2 flex items-center justify-center">
            {session?.user?.id ? <Avatar /> : <SignInButton />}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
