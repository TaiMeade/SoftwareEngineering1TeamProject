export const NAV_ITEMS: NavItemProps[] = [
  // Example Navbar Items
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Recipes", href: "/recipes" },
  { label: "Profile", href: "/profile" },
  { label: "Example", href: "/example" },
  { label: "Page2", href: "/Page2" },
];

interface Omit {
  <T extends object, K extends [...(keyof T)[]]>(obj: T, ...keys: K): {
    [K2 in Exclude<keyof T, K[number]>]: T[K2];
  };
}

export const omit: Omit = (obj, ...keys) => {
  const ret = {} as {
    [K in keyof typeof obj]: (typeof obj)[K];
  };
  let key: keyof typeof obj;
  for (key in obj) {
    if (!keys.includes(key)) {
      ret[key] = obj[key];
    }
  }
  return ret;
};
