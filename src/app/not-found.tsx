import { type Metadata, type NextPage } from "next";
import Link from "next/link";
import { IoMdHome } from "react-icons/io";

const NotFound: NextPage = () => {
  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-6xl font-bold">404</h1>
        <h2 className="text-4xl font-semibold">Page Not Found</h2>
      </div>

      <p className="text-lg">
        The page you are looking for does not exist. Please check the URL or
        click the button below to go back to the homepage.
      </p>

      <div className="flex flex-row items-center justify-center gap-4">
        <Link
          href="/"
          className="btn btn-accent flex flex-row items-center justify-center gap-2"
        >
          <IoMdHome className="text-xl" />
          <span>Go Home</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

export const metadata: Metadata = {
  title: "iCook | Not Found",
};
