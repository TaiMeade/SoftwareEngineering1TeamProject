"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type z } from "zod";

import { toast } from "sonner";

import ModifyUserImage from "./ModifyUserImage";
import { updateUserSchema } from "~/utils/schemas";

interface UserFormProps {
  bio: string | null;
  userImage: string | null | undefined;
  username: string | null;
}

const UpdateUserForm: React.FC<UserFormProps> = ({
  bio,
  userImage,
  username,
}) => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<Error>();

  const { register, handleSubmit, formState } = useForm<
    z.infer<typeof updateUserSchema>
  >({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      bio: bio || "",
      username: username || "",
    },
  });

  const onFormSubmit = async (data: z.infer<typeof updateUserSchema>) => {
    const res = await fetch("/api/user", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      console.log("Error updating user");
      setError(new Error("Error updating user"));
      return;
    } else {
      setSuccess(true);
    }

    console.log(data);
  };

  useEffect(() => {
    if (success) {
      toast.success("Successfully updated user!");
    }

    if (error) {
      toast.error(error.message);
    }
  }, [success, error]);

  // * Change Bio, Update User Image, Modify Nickname, Change Password
  return (
    <form
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleSubmit(onFormSubmit)}
      className="flex w-full max-w-3xl flex-col items-start gap-12 [&>div]:w-full"
    >
      {/* User Image */}
      <div className="flex flex-col gap-4">
        <label htmlFor="user-image" className="text-2xl font-bold">
          Update User Image
        </label>

        <ModifyUserImage userImage={userImage} />
      </div>

      {/* Username */}
      <div className="flex flex-col gap-4">
        <label htmlFor="username" className="text-2xl font-bold">
          Modify Username
        </label>
        <input
          id="username"
          type="text"
          {...register("username")}
          className="icook-form-input"
        />
        {formState.errors?.username && (
          <p className="text-sm text-red-500">
            {formState.errors.username.message}
          </p>
        )}
      </div>

      {/* Biography */}
      <div className="flex flex-col gap-4">
        <label htmlFor="bio" className="text-2xl font-bold">
          Change Bio
        </label>
        <textarea
          id="bio"
          {...register("bio")}
          className="icook-form-textarea"
        />
        {formState.errors?.bio && (
          <p className="text-sm text-red-500">{formState.errors.bio.message}</p>
        )}
      </div>

      {/* Password */}
      {/* <div className="flex flex-col gap-4">
        <label htmlFor="password" className="text-2xl font-bold">
          Change Password
        </label>
        <input
          id="password"
          type="password"
          {...register("password")}
          className="icook-form-input"
        />
        {formState.errors?.password && (
          <p className="text-sm text-red-500">
            {formState.errors.password.message}
          </p>
        )}
      </div> */}

      <div className="flex flex-col gap-4">
        <button type="submit" className="icook-button">
          Update User
        </button>
      </div>
    </form>
  );
};

export default UpdateUserForm;
