import { type Metadata, type NextPage } from "next";
import ExampleComponent from "~/components/Example";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col gap-12">
      <h1 className="text-4xl font-bold">Home</h1>
      <ExampleComponent />

      <div className="flex flex-col items-start justify-center gap-2">
        <Link href="/login" className="link">
          Login page
        </Link>
        <Link href="/logout" className="link">
          Logout page
        </Link>
        <Link href="/profile" className="link">
          My Profile page
        </Link>
      </div>
    </div>
  );
};

export default Home;

export const metadata: Metadata = {
  title: "iCook | Home",
};
