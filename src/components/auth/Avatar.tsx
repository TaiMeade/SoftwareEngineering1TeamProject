import { getAuth } from "~/server/session";

import Link from "next/link";
import Image from "next/image";

import { AiOutlineUser } from "react-icons/ai";

const Avatar: React.FC = async () => {
  const session = await getAuth();

  return (
    <div className="avatar scale-100 transition-all duration-300 hover:scale-110">
      <Link
        href="/profile"
        className="flex h-10 w-10 flex-col items-center justify-between gap-1"
      >
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
      </Link>
    </div>
  );
};

export default Avatar;
