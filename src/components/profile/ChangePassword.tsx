"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateUserSchema } from "~/utils/schemas";
import { omit } from "~/utils";

import { toast } from "sonner";

import { FaEyeSlash, FaRegEye } from "react-icons/fa";

const updatePassSchema = updateUserSchema.extend({
  verifyPassword: z.string().min(1),
});

interface ChangePasswordProps {
  password: string | null;
}

type FormValues = z.infer<typeof updatePassSchema>;

const ChangePassword: React.FC<ChangePasswordProps> = ({ password }) => {
  const [peek, setPeek] = useState(false);

  const { register, handleSubmit, formState } = useForm<FormValues>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      password: password || "",
      verifyPassword: "",
    },
  });

  const onFormSubmit = async (data: FormValues) => {
    const { password: password, verifyPassword } = data;

    if (password != verifyPassword) {
      toast.error("Passwords don't match");
      return;
    }

    const res = await fetch("/api/user", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(omit(data, "verifyPassword")),
    });

    if (res.ok) toast.success("Password changed");
    else {
      console.log("Error changing password", res.statusText);
      toast.error("Error changing password");
    }
  };

  return (
    <form
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleSubmit(onFormSubmit)}
      className="flex w-full max-w-3xl flex-col items-start gap-12 [&>div]:w-full"
    >
      {/* Password */}
      <div className="flex flex-col gap-4">
        <div className="form-control">
          <label htmlFor="password" className="label mb-2 text-2xl font-bold">
            <span className="label-text text-2xl font-bold">
              Change Password
            </span>
          </label>

          <div className="btn-group btn-group-horizontal">
            <input
              id="password"
              type={peek ? "text" : "password"}
              {...register("password")}
              className="input input-bordered w-full rounded-r-none"
            />

            <button
              type="button"
              onClick={() => setPeek(!peek)}
              className="btn btn-neutral"
            >
              {peek ? <FaEyeSlash /> : <FaRegEye />}
            </button>
          </div>
        </div>

        <div className="form-control">
          <label
            htmlFor="verifyPassword"
            className="label mb-2 text-2xl font-bold"
          >
            <span className="label-text text-2xl font-bold">
              Re-Enter Password
            </span>
          </label>
          <input
            id="verifyPassword"
            type="password"
            {...register("verifyPassword")}
            className="input input-bordered w-full"
          />
        </div>

        {formState.errors?.password && (
          <p className="text-sm text-red-500">
            {formState.errors.password.message}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-4">
        <button type="submit" className="btn btn-primary">
          Update Password
        </button>
      </div>
    </form>
  );
};

export default ChangePassword;
