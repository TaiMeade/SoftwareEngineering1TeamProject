import { type Metadata, type NextPage } from "next";
import ExampleComponent from "~/components/Example";
import Link from 'next/link';

const Page2: NextPage = () => {
  return (
    <div className="flex flex-col gap-12">
      <h1 className="text-4xl font-bold">Homee</h1>

      <h2>
        <Link href="/">Back to home</Link>
      </h2>

      <ExampleComponent />
    </div>
  );
};

export default Page2;

export const metadata: Metadata = {
  title: "Recipe App",
  description: "Recipe App Description",
};