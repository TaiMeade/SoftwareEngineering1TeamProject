interface NavItemProps {
  label: string;
  href: string;
  subLabel?: string;
  children?: Array<NavItemProps>;
}

interface RootLayoutProps {
  children: React.ReactNode;
}

interface Ingredient {
  name: string;
  quantity: number;
  unit: string;
}

// (keyof typeof Tag)[]
type Tag = string[];

type Directions = string[];
