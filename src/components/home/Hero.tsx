import Link from "next/link";

const Hero: React.FC = () => {
  return (
    <div className="rounded-md bg-gradient-to-r from-icook-primary to-icook-accent py-16">
      <div className="container mx-auto px-4 text-center">
        <h1 className="mb-4 text-4xl font-semibold text-white">
          Welcome to iCook!
        </h1>
        <p className="mb-8 text-lg text-white">
          Join our community and share your culinary creations.
        </p>
        <div className="flex justify-center space-x-4">
          <Link href="/recipes" className="btn btn-primary">
            Browse Recipes
          </Link>
          <Link href="/profile/create" className="btn btn-accent">
            Add Your Recipe
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
