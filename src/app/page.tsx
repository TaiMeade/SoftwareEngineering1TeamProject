import { type Metadata, type NextPage } from "next";

import Hero from "~/components/home/Hero";
import FeaturedRecipes from "~/components/home/FeaturedRecipes";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col gap-12">
      <Hero />

      <FeaturedRecipes />
    </div>
  );
};

export default Home;

export const metadata: Metadata = {
  title: "iCook | Home",
};
