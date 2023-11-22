import { type Metadata, type NextPage } from "next";
import { redirect } from "next/navigation";

import { getAuth } from "~/server/session";
import { getProviders } from "next-auth/react";

import SignInButton from "~/components/auth/SignInButton";

const LoginPage: NextPage = async () => {
  const session = await getAuth();
  const providers = await getProviders();

  if (!providers) throw new Error("No providers found");

  // * If the user is already logged in, redirect them to the home page.
  if (session?.user?.id) {
    return redirect("/profile");
  }

  return (
    <div className="hero flex min-h-[calc(var(--min-page-height)-5rem)] flex-col items-center justify-center gap-12">
      {/* <h1 className="text-4xl font-bold">Login</h1> */}

      {/* <Link href="/" className="link">
        Go Home
      </Link>

      <div className="flex flex-col gap-4">
        {Object.values(providers).map((provider) => (
          <SignInButton key={provider.name} provider={provider} />
        ))}
      </div> */}

      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="max-w-md py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi.
          </p>
        </div>

        <div className="card w-full max-w-sm shrink-0 rounded-lg bg-white shadow-2xl">
          <div className="card-body">
            <EmailPassForm />

            <div className="divider w-full divide-neutral">
              <p className="text-sm text-gray-500">Or Login with</p>
            </div>

            <div className="flex flex-col gap-4">
              {Object.values(providers).map((provider) => (
                <SignInButton key={provider.name} provider={provider} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

export const metadata: Metadata = {
  title: "iCook | Login",
};

const EmailPassForm: React.FC = () => (
  <form className="flex flex-col gap-2">
    <div className="form-control">
      <label className="label">
        <span className="label-text">Email</span>
      </label>
      <input
        type="email"
        placeholder="email"
        className="input input-bordered"
        autoComplete="email"
        required
      />
    </div>
    <div className="form-control">
      <label className="label">
        <span className="label-text">Password</span>
      </label>
      <input
        type="password"
        placeholder="password"
        autoComplete="current-password"
        className="input input-bordered"
        required
      />
      <label className="label">
        <a href="#" className="link-hover link label-text-alt">
          Forgot password?
        </a>
      </label>
    </div>
    <div className="form-control mt-6">
      <button className="btn btn-primary text-base">Login</button>
    </div>
  </form>
);
