interface NavItemProps {
  label: string;
  href: string;
  subLabel?: string;
  children?: Array<NavItemProps>;
}

interface RootLayoutProps {
  children: React.ReactNode;
}

interface PageProps {
  params: {
    [key: string]: string | undefined; // string[]
  };
  searchParams: {
    [key: string]: string | undefined; // string[]
  };
}

// (keyof typeof Tag)[]
type Tag = string[];

type Directions = string[];

interface Ingredient {
  name: string;
  quantity: string;
  unit: string;
}

interface NextErrorPage {
  error: Error & { digest?: string };
  reset: () => void;
}

interface RecipesPageProps {
  params: { id: string };
  searchParams: {
    [key: string]: string | string[];
  };
}

type ISearchFields = "tags" | "desc" | "author" | "title";
