import { type Metadata, type NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col gap-12">
      {/*  */}
      {/*  */}
      <h1 className="text-4xl font-bold">Home</h1>
    </div>
  );
};

export default Home;

export const metadata: Metadata = {
  title: "Recipe App",
  description: "Recipe App Description",
};
