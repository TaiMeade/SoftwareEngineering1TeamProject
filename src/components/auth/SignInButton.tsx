"use client";
import { signIn } from "next-auth/react";

const SignInButton: React.FC = () => {
  return (
    <button
      onClick={() => void signIn()}
      className="rounded bg-zinc-400 px-4 py-2 font-bold text-black hover:bg-zinc-500"
    >
      Sign In
    </button>
  );
};

export default SignInButton;
