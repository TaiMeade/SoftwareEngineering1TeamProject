"use client";
import { signOut } from "next-auth/react";

const SignOutButton: React.FC = () => {
  return (
    <button
      onClick={() => void signOut()}
      className="rounded bg-zinc-400 px-4 py-2 font-bold text-black hover:bg-zinc-500"
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;
