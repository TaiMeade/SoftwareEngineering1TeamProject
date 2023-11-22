import Link from "next/link";
import Image from "next/image";
import { AiOutlineUser } from "react-icons/ai";

interface UserImgProps {
  id: string;
  src: string | null;
}

const UserImg: React.FC<UserImgProps> = ({ src, id }) => (
  <Link href={`/profile/${id}`} className="link h-10 w-[3.5rem]">
    {src ? (
      <Image
        src={src}
        alt="avatar"
        width={40}
        height={40}
        className="!my-0 h-10 w-10 rounded-full  object-cover"
      />
    ) : (
      <AiOutlineUser className="h-10 w-10" />
    )}
  </Link>
);

export default UserImg;
