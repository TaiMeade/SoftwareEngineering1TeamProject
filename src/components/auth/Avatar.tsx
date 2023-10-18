import Image from "next/image";
import Link from "next/link";
import { getAuth } from "~/server/session";

const Avatar = async () => {
  const session = await getAuth();
  return (
    <div className="flex flex-col items-center justify-between gap-4">
      <Link href="/profile">
        <div className="flex flex-col items-center justify-between gap-1">
          {/* <button id="menu-button" aria-expanded="false" aria-haspopup="false"> */}
          {session?.user?.image ? (
            <Image
              src={session?.user?.image}
              alt="avatar"
              width={55}
              height={55}
              className="h-15 w-15 rounded-full border-2 border-icook-primary"
            />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 rounded-full"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10 11a3 3 0 100-6 3 3 0 000 6zm0 1c-2.67 0-8 1.34-8 4v1h16v-1c0-2.66-5.33-4-8-4z"
              />
            </svg>
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
