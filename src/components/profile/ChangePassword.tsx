"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type z } from "zod";

import { toast } from "sonner";

import { updateUserSchema } from "~/utils/schemas";
import { getAuth } from "~/server/session";

interface ChangePasswordProps {
  password: string | null;
}

const ChangePassword: React.FC<ChangePasswordProps> = async ({ password }) => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<Error>();

  const session = await getAuth();

  const password = await prisma.user.findUnique({
    where: {
      id: session?.user.id ?? "",
    },
    select: {
      password: true,
    },
  });

  const { register, handleSubmit, formState } = useForm<
    z.infer<typeof updateUserSchema>
  >({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      password: password || "",
    },
  });

  const onFormSubmit = async (data: z.infer<typeof updateUserSchema>) => {
    const res = await fetch("/api/user", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    /* Used to access  */
    const passwd = (document.getElementById("password") as HTMLInputElement)
      .value;
    const verifyPasswd = (
      document.getElementById("verify-password") as HTMLInputElement
    ).value;

    if (!res.ok) {
      console.log("Error updating user");
      setError(new Error("Error updating user"));
      return;
    } else if (!(passwd == verifyPasswd)) {
      console.log("Passwords don't match");
      setError(new Error("Passwords do not match"));
      return;
    } else {
      console.log("Success");
      setSuccess(true);
      toast.success("Successfully updated password!"); // Not sure why this seems to be necessary...line 57 doesn't seem to be getting reached ever for some reason now.
    }

    console.log(data);
  };

  useEffect(() => {
    if (success) {
      toast.success("Successfully updated password!");
    }

    if (error) {
      toast.error(error.message);
    }
  }, [success, error]);

  // * Change password
  return (
    <form
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleSubmit(onFormSubmit)}
      className="flex w-full max-w-3xl flex-col items-start gap-12 [&>div]:w-full"
    >
      {/* Password */}
      <div className="flex flex-col gap-4">
        <label htmlFor="password" className="text-2xl font-bold">
          Change Password
        </label>
        <input
          id="password"
          type="password"
          {...register("password")}
          className="icook-form-input"
        />
        <label htmlFor="verify-password" className="text-2xl font-bold">
          Re-Enter Password
        </label>
        <input
          id="verify-password"
          type="password"
          className="icook-form-input"
        />

        {formState.errors?.password && (
          <p className="text-sm text-red-500">
            {formState.errors.password.message}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-4">
        <button type="submit" className="icook-button">
          Update Password
        </button>
      </div>
    </form>
  );
};

export default ChangePassword;
