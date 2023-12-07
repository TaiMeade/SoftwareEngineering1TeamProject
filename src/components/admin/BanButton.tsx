"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { toast } from "sonner";

import { FaBan } from "react-icons/fa";

interface BanButtonProps {
  userId: string;
  canPost: boolean;
}

const BanButton: React.FC<BanButtonProps> = ({ userId, canPost }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async () => {
    if (isLoading) return;
    setIsLoading(true);
    const res = await fetch("/api/admin/ban", {
      method: "POST",
      body: JSON.stringify({ userId, canPost }),
    });

    setIsLoading(false);

    if (!res.ok) return toast.error("Something went wrong!");

    const data = (await res.json()) as boolean;

    if (!data) toast.success("User has been unbanned!");
    else
      toast.warning("User has been banned! They can no longer post recipes.");

    await new Promise((r) => setTimeout(r, 340));
    router.refresh();
  };

  return (
    <button
      onClick={() => void onSubmit()}
      disabled={isLoading}
      className="btn btn-secondary flex flex-row items-center justify-center gap-2 text-lg disabled:cursor-not-allowed disabled:opacity-50"
    >
      {isLoading ? (
        "Loading..."
      ) : (
        <>
          <span>{canPost ? "Ban" : "Unban"}</span>
          <FaBan className="-scale-x-100 text-2xl" />
        </>
      )}
    </button>
  );
};

export default BanButton;
