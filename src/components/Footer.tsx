"use client";
import { usePathname } from "next/navigation";

import Link from "next/link";

import { NAV_ITEMS } from "~/utils";
import { cn } from "~/utils/tw";

import { FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer: React.FC = () => {
  const pathname = usePathname();

  return (
    <footer
      className={cn(
        "footer footer-center flex-col rounded bg-base-200 p-10 text-base-content",
        pathname.includes("/profile") && "mb-12 md:mb-0",
      )}
    >
      <nav className="grid grid-flow-col gap-4">
        <Link href="/" className="link-hover link">
          Home
        </Link>

        {NAV_ITEMS.map((item) => (
          <Link href={item.href} key={item.label} className="link-hover link">
            {item.label}
          </Link>
        ))}
      </nav>

      <nav>
        <div className="grid grid-flow-col gap-5 text-2xl text-gray-600 [&>*]:text-2xl [&>*]:transition-colors [&>*]:duration-100 [&>*]:ease-in-out">
          <Link href="/" className="link-hover link hover:text-blue-500">
            <FaTwitter />
          </Link>
          <Link href="/" className="link-hover link hover:text-red-500">
            <FaYoutube />
          </Link>
          <Link href="/" className="link-hover link hover:text-blue-800">
            <FaFacebook />
          </Link>
        </div>
      </nav>
      <aside>
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved by iCook
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
