import { getAuth } from "~/server/session";

import Link from "next/link";
import Image from "next/image";

import { AiOutlineUser } from "react-icons/ai";

const Avatar = async () => {
  const session = await getAuth();

  return (
    <div className="flex scale-100 flex-col items-center justify-between gap-4 transition-all duration-300 hover:scale-110">
      <Link href="/profile">
        <div className="flex flex-col items-center justify-between gap-1">
          {session?.user?.image ? (
            <Image
              src={session.user.image}
              alt="avatar"
              width={40}
              height={40}
              className="h-10 w-10 rounded-full"
            />
          ) : (
            <AiOutlineUser className="h-10 w-10" />
          )}
        </div>
      </Link>
    </div>
  );
};

export default Avatar;
