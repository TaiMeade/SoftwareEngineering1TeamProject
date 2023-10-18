import Link from "next/link";
import { getAuth } from "~/server/session";
import { NAV_ITEMS } from "~/utils";
import Avatar from "./auth/Avatar";
import SignInButton from "./auth/SignInButton";

const Navbar = async () => {
  const session = await getAuth();

  return (
    <nav
      role="navigation"
      className="fixed z-10 flex h-[var(--navbar-height)] w-full items-center justify-between gap-4 border-b border-icook-text bg-icook-nav px-4 text-black"
    >
      <h1 className="flex-1 font-medium">
        <Link href="/" className="hover:underline">
          iCook
        </Link>
      </h1>

      <ul className="flex flex-row gap-4">
        {NAV_ITEMS.map((item) => (
          <li key={item.label} className="hover:text-gray-700 hover:underline">
            <Link href={item.href}>{item.label}</Link>
          </li>
        ))}
      </ul>

      <div className="flex flex-col items-center justify-between gap-4">
        {/* If Signed in, show avatar */}
        {/* If not signed in, show sign in button */}
        {session?.user?.id ? <Avatar /> : <SignInButton />}
      </div>
    </nav>
  );
};

export default Navbar;