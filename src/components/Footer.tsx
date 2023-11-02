import Link from "next/link";
import { NAV_ITEMS } from "~/utils";

import { FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer footer-center flex-col rounded bg-base-200 p-10 text-base-content">
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
        <div className="grid grid-flow-col gap-4 text-2xl text-gray-600">
          <FaTwitter />
          <FaYoutube />
          <FaFacebook />
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
