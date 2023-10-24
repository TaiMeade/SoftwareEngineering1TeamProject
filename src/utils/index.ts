export const NAV_ITEMS: NavItemProps[] = [
  // Example Navbar Items
  { label: "About", href: "/about" },
  { label: "Recipes", href: "/recipes" },
  { label: "Profile", href: "/profile" },
];

export const SIDEBAR_ITEMS: NavItemProps[] = [
  // Example Navbar Items
  { label: "Profile", href: "/profile/" },
  { label: "Edit Profile", href: "/profile/edit" },
  { label: "Saved Recipes", href: "/saved" },
  { label: "Settings", href: "/settings" },
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

/**
 * Function to prettify a tag by capitalizing the first letter and lowercasing the rest.
 * @param tag {string} - the tag to be prettified
 * @returns {string} - a prettified version of the tag
 */
export const prettifyTag = (tag: string) => {
  const firstLetter = tag[0] || "";
  return firstLetter + tag.slice(1).toLowerCase();
};
