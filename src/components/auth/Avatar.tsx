import Image from "next/image";
import Link from "next/link";
import { getAuth } from "~/server/session";
import FakeAvatar from "../FakeAvatar";

const Avatar = async () => {
  const session = await getAuth();

  return (
    <div className="flex flex-col items-center justify-between gap-4">
      <Link href="/profile">
        <div className="flex flex-col items-center justify-between gap-1">
          {/* <button id="menu-button" aria-expanded="false" aria-haspopup="false"> */}
          {session?.user?.image ? (
            <Image
              src={session.user.image}
              alt="avatar"
              width={40}
              height={40}
              className="h-10 w-10 rounded-full border border-slate-600"
            />
          ) : (
            <FakeAvatar className="" />
          )}
          {/* </button> */}
        </div>
      </Link>
      {/* <div
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black focus:outline-none"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
      >
        <div className="py-1" role="none">
          <Link
            href="/profile"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-icook-secondary"
            role="menuitem"
            id="menu-item-0"
          >
            Profile
          </Link>
          <Link
            href="/createRecipe"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-icook-secondary"
            role="menuitem"
            id="menu-item-1"
          >
            Create a Recipe
          </Link>
          <Link
            href="/logout"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-icook-secondary"
            role="menuitem"
            id="menu-item-2"
          >
            Sign Out
          </Link>
        </div>
      </div> */}
    </div>
  );
};

export default Avatar;
