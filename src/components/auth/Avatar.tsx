import Image from "next/image";
import Link from "next/link";
import { getAuth } from "~/server/session";

const Avatar = async () => {
  const session = await getAuth();
  return (
    <div className="flex flex-col items-center justify-between gap-4">
      <Link href="/profile">
        <div className="flex flex-col items-center justify-between gap-1">
          {session?.user?.image ? (
            <Image
              src={session?.user?.image}
              alt="avatar"
              width={48}
              height={48}
              className="h-12 w-12 rounded-full"
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
        </div>
      </Link>
    </div>
  );
};

export default Avatar;
