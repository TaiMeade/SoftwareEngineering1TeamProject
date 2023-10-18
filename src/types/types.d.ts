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

interface Ingredient {
  name: string;
  quantity: number;
  unit: string;
}

// (keyof typeof Tag)[]
type Tag = string[];

type Directions = string[];
