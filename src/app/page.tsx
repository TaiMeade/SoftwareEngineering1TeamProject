import { type Metadata, type NextPage } from "next";
import ExampleComponent from "~/components/Example";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col gap-12">
      <h1 className="text-4xl font-bold">Home</h1>
      <ExampleComponent />

      <h2>
        <Link href="/Page2">To Example page</Link>
      </h2>
    </div>
  );
};

export default Home;

export const metadata: Metadata = {
  title: "Recipe App",
  description: "Recipe App Description",
};
