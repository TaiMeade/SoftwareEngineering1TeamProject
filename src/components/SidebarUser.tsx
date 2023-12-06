import Link from "next/link";
import Image from "next/image";

import type { Session } from "next-auth";

import { AiOutlineUser } from "react-icons/ai";

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
            <AiOutlineUser className="h-10 w-10 flex-1 rounded-full object-cover" />
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

export default SidebarUser;

export const dynamic = "force-dynamic";
