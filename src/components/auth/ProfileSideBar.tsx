import Link from "next/link";

const ProfileSideBar: React.FC = () => {
  return (
    <aside className="flex min-h-screen w-full max-w-[10rem] flex-col items-start gap-4 border-r-2 border-gray-900 pt-4">
      <Link href="/profile" className="link">
        Profile
      </Link>
      <Link href="/profile/saved" className="link">
        Saved Recipes
      </Link>
      <Link href="/profile/create" className="link">
        Create Recipe
      </Link>
      <Link href="/profile/edit" className="link">
        Edit Profile
      </Link>
      <Link href="/profile/settings" className="link">
        Settings
      </Link>
      <Link href="/logout" className="link">
        Logout
      </Link>
    </aside>
  );
};

export default ProfileSideBar;
