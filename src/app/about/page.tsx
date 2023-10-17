import { type Metadata, type NextPage } from "next";
import Link from "next/link";

const AboutPage: NextPage = () => {
  return (
    <div className="flex flex-col gap-12">
      <h1 className="text-4xl font-bold">About iCook</h1>

      <Link href="/">Go Home</Link>
    </div>
  );
};

export default AboutPage;

export const metadata: Metadata = {
  title: "iCook | About",
};
