import type { Recipe, User } from "@prisma/client";

export const NAV_ITEMS: NavItemProps[] = [
  { label: "About", href: "/about" },
  { label: "Recipes", href: "/recipes" },
  { label: "Profile", href: "/profile" },
];

export const FOOTER_ITEMS: NavItemProps[][] = [
  [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
  ],
  [
    { label: "Recipes", href: "/recipes" },
    { label: "Profile", href: "/profile" },
  ],
];

export const SIDEBAR_ITEMS: NavItemProps[] = [
  { label: "Profile", href: "/profile/" },
  { label: "Edit Profile", href: "/profile/edit" },
  { label: "Create Recipe", href: "/profile/create" },
  { label: "My Recipes", href: "/profile/posted" },
  { label: "Saved Recipes", href: "/profile/saved" },
  { label: "Settings", href: "/profile/settings" },
  { label: "Change Password", href: "/profile/changePassword" },
  { label: "Logout", href: "/logout" },
];

export const ADMIN_SIDEBAR_ITEMS: NavItemProps[] = [
  { label: "Admin", href: "/admin/" },
  { label: "Users", href: "/admin/users" },
  { label: "Recipes", href: "/admin/recipes" },
  { label: "Reports", href: "/admin/reports" },
];

// * Function to sleep for a given amount of time
export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

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
  if (!tag) return "";
  if (tag.length === 1) return tag.toUpperCase();
  const firstLetter = tag[0] || "";
  return firstLetter + tag.slice(1)?.toLowerCase() || "";
};

export const fmtDate = (date: Date) => {
  // moment(date).format("MMMM Do YYYY");
  const d = new Date(date);
  const month = d.toLocaleString("default", { month: "long" }); // "January
  const day = d.getDate();
  const year = d.getFullYear();

  return `${month} ${day} ${year}`;
};

type ProfileWithRecipe = User & { recipes: Recipe[] };

export const omitProfile = (profile: ProfileWithRecipe) => {
  return omit(
    profile,
    "password",
    "email",
    "role",
    "emailVerified",
    "createdAt",
    "updatedAt",
  );
};
