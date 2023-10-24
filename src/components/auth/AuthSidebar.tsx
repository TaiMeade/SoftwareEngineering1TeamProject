import Image from "next/image";
import { getAuth } from "~/server/session";
import { type Session } from "next-auth";

import { SIDEBAR_ITEMS } from "~/utils";

import Link from "next/link";
import FakeAvatar from "../FakeAvatar";
import { AiFillCaretDown } from "react-icons/ai";

const AuthSidebar: React.FC = async () => {
  const session = await getAuth();

  // https://tailwindcomponents.com/component/free-tailwind-css-vertical-navigation-component

  return (
    <div className="fixed bottom-0 left-0 flex w-full flex-col items-start justify-start bg-zinc-800 sm:bottom-auto sm:h-[calc(100vh-var(--navbar-height))] sm:w-64">
      <div className="hidden items-center justify-start space-x-3 p-6 xl:flex">
        {/* SVG */}
        <p className="text-2xl leading-6 text-white">iCook</p>
      </div>

      <div className="flex w-full flex-col items-center justify-start border-b border-gray-600 px-6 ">
        <div className="flex w-full items-center justify-between space-x-14 py-5 text-left text-white focus:text-indigo-400 focus:outline-none">
          <p className="text-sm uppercase leading-5">Profile Overview</p>

          <button className="flex items-center justify-center sm:hidden">
            <AiFillCaretDown className="text-lg text-white" />
          </button>
        </div>
      </div>

      <div className="w-full flex-1 border-b border-gray-600 pt-5">
        <SidebarUser session={session} />
      </div>

      <div className="flex w-full flex-col items-start justify-start space-y-1">
        {SIDEBAR_ITEMS.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="group flex w-full items-center justify-start space-x-3 px-6 py-3 last:pb-6 "
          >
            <p className="text-sm uppercase leading-5 text-white group-hover:underline">
              {item.label}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AuthSidebar;

const SidebarUser: React.FC<{ session: Session | null }> = ({ session }) => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-between space-y-32 self-end justify-self-end px-6 pb-6">
      <div className="flex w-full items-center justify-between">
        <Link
          href="/profile"
          className="group flex items-center justify-center space-x-2 pt-1"
        >
          {session?.user.image ? (
            <Image
              src={session.user.image}
              alt="avatar"
              width={40}
              height={40}
              className="h-10 w-10 flex-1 rounded-full object-cover"
            />
          ) : (
            <FakeAvatar className="h-10 w-10 flex-1 rounded-full object-cover" />
          )}

          <div className="flex flex-col items-start justify-start">
            <p className="cursor-pointer text-sm leading-5 text-white  group-hover:underline">
              {session?.user.name ?? "User"}
            </p>
            <p className="cursor-pointer text-xs leading-3 text-gray-300 group-hover:underline">
              {session?.user.email ?? "email"}
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};
