"use client";
import { usePathname } from "next/navigation";
import { toast } from "sonner";

import { type Recipe } from "@prisma/client";

import Link from "next/link";

import Modal from "../Modal";

import {
  BiShare,
  BiClipboard,
  BiLogoFacebook,
  BiLogoTwitter,
} from "react-icons/bi";

interface ShareButtonProps {
  recipe: Recipe;
}

const ShareButton: React.FC<ShareButtonProps> = ({ recipe }) => {
  const path = usePathname();

  const SOCIALS = [
    {
      name: "Facebook",
      icon: <BiLogoFacebook className="text-2xl text-gray-600" />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${path}`,
    },
    {
      name: "Twitter",
      icon: <BiLogoTwitter className="text-2xl text-gray-600" />,
      url: `https://twitter.com/intent/tweet?text=${recipe.title}&url=${path}`,
    },
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Copied to clipboard!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to copy to clipboard!");
    }
  };

  return (
    <Modal
      title="Share Recipe"
      button={
        <>
          <span>Share </span>
          <BiShare className="-scale-x-100 text-2xl" />
        </>
      }
      btnClass="btn btn-primary flex flex-row items-center justify-center gap-2 text-lg"
      className="flex flex-col items-start justify-center gap-2"
    >
      <h2 className="text-lg text-gray-600">
        Share this recipe with your friends!
      </h2>

      <div className="flex flex-row flex-wrap items-center justify-start gap-4">
        {SOCIALS.map((social) => (
          <Link
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noreferrer"
            className="btn flex flex-row items-center justify-center gap-2 text-lg"
          >
            <span>{social.name}</span>
            {social.icon}
          </Link>
        ))}

        <button
          onClick={() => void copyToClipboard()}
          className="btn flex flex-row items-center justify-center gap-2 text-lg"
        >
          <span>Copy</span>
          <BiClipboard className="text-2xl" />
        </button>
      </div>
    </Modal>
  );
};

export default ShareButton;
