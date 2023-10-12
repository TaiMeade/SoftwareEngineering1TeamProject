import { type Metadata, type NextPage } from "next";
import ExampleComponent from "~/components/Example";

const ExamplePage: NextPage = () => {
  return (
    <div className="flex flex-col gap-12">
      <h1 className="text-4xl font-bold">Example Page</h1>
      <ExampleComponent />
    </div>
  );
};

export default ExamplePage;

export const metadata: Metadata = {
  title: "Recipe App",
  description: "Recipe App Description",
};
