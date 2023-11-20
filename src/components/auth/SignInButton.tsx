"use client";
import { type ClientSafeProvider, signIn } from "next-auth/react";
import { type IconType } from "react-icons";

import { BsGoogle } from "react-icons/bs";
import { VscLoading } from "react-icons/vsc";

interface SignInButtonProps {
  provider?: ClientSafeProvider;
}

const SignInButton: React.FC<SignInButtonProps> = ({ provider }) => {
  if (!provider) return <DefaultSignIn />;

  let Icon: IconType = VscLoading;

  switch (provider.name) {
    case "Google":
      Icon = BsGoogle;
      break;
    default:
      Icon = VscLoading;
      break;
  }

  return (
    <button
      aria-label={`Sign in with ${provider.name}`}
      onClick={() => void signIn(provider.id)}
      className="btn btn-primary flex flex-row items-center justify-center space-x-2"
    >
      <div>
        <Icon className="h-6 w-6" />
      </div>

      <div className="h-full w-[0.05rem] bg-white" />

      <p className="text-base">Sign in with {provider.name}</p>
    </button>
  );
};

export default SignInButton;

const DefaultSignIn: React.FC = () => (
  <button onClick={() => void signIn("google")} className="btn btn-primary">
    Sign in
  </button>
);
