import Link from "next/link";

import { getAuth } from "~/server/session";
import { NAV_ITEMS } from "~/utils";

import SignInButton from "./auth/SignInButton";
import Avatar from "./auth/Avatar";

import SearchBar from "./search/SearchBar";
import MobileNav from "./MobileNav";

const Navbar: React.FC = async () => {
  const session = await getAuth();

  // TODO: Display admin navbar below
  return (
    <nav
      role="navigation"
      className="navbar fixed z-10 h-[var(--navbar-height)] space-x-2 border-b border-icook-text bg-icook-nav px-4"
    >
      <div className="navbar-start order-1 md:hidden">
        <MobileNav />
      </div>

      <div className="navbar-start order-2 sm:order-1">
        <Link href="/" className="link-hover link text-4xl">
          iCook
        </Link>
      </div>

      <div className="navbar-center hidden md:order-2 md:block">
        <SearchBar />
      </div>

      <div className="navbar-end order-2 space-x-2 sm:order-3">
        <ul className="flex flex-row items-center gap-3">
          {NAV_ITEMS.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="link-hover link hidden md:block"
              >
                {item.label}
              </Link>
            </li>
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
