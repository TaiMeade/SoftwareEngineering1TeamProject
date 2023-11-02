/* eslint-disable @next/next/no-img-element */
"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type z } from "zod";

import { toast } from "sonner";

import { updateUserSchema } from "~/utils/schemas";
import { useUploadThing } from "~/utils/ut";
import { useEffect, useState } from "react";

interface UserFormProps {
  bio: string | null;
  userImage: string | null | undefined;
  username: string | null;
}

type FormData = z.infer<typeof updateUserSchema>;

const UpdateUserForm: React.FC<UserFormProps> = ({
  bio,
  userImage,
  username,
}) => {
  const { register, handleSubmit, formState } = useForm<FormData>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      bio: bio ?? "",
      username: username ?? "",
    },
  });

  const { startUpload } = useUploadThing("userUpdateImg");

  const [file, setFile] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string>();

  useEffect(() => {
    if (!file) {
      setPreviewURL(undefined);
      return;
    }

    const objectURL = URL.createObjectURL(file);
    setPreviewURL(objectURL);

    return () => URL.revokeObjectURL(objectURL);
  }, [file]);

  const onFormSubmit = async (data: z.infer<typeof updateUserSchema>) => {
    toast.message("Updating user...");

    if (file) {
      const fileUrls = await startUpload([file]);
      data.image = fileUrls?.[0]?.url ?? undefined;
    }

    const res = await fetch("/api/user", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) toast.error(`Error updating user - ${res.statusText}`);
    else toast.success("Successfully updated user!");
  };

  // * Change Bio, Update User Image, Modify Nickname, Change Password
  return (
    <form
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleSubmit(onFormSubmit)}
      className="flex w-full max-w-3xl flex-col items-start gap-12 [&>div]:w-full"
    >
      {/* User Image */}
      <div className="form-control flex flex-col gap-4">
        <img
          src={userImage ?? previewURL ?? "/placeholder.png"}
          alt="User Image"
          className="h-36 w-36 rounded-lg object-cover"
        />

        <label htmlFor="user-image" className="label mb-1 mt-4 ">
          <span className="label-text text-lg font-bold">
            Update User Image
          </span>
          <span className="label-text-alt">(Optional)</span>
        </label>

        <input
          id="user-image"
          type="file"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setFile(e.target.files[0]);
            }
          }}
          className="file-input file-input-bordered w-full"
        />
      </div>

      {/* Username */}
      <div className="form-control flex flex-col gap-4">
        <label htmlFor="username" className="label">
          <span className="label-text text-2xl font-bold">Username</span>
        </label>
        <input
          id="username"
          type="text"
          {...register("username")}
          placeholder="Username"
          className="input input-bordered w-full"
        />
        {formState.errors?.username && (
          <p className="text-sm text-red-500">
            {formState.errors.username.message}
          </p>
        )}
      </div>

      {/* Biography */}
      <div className="form-control flex flex-col gap-4">
        <label htmlFor="bio" className="label">
          <span className="label-text text-2xl font-bold">Update Bio</span>
        </label>
        <textarea
          id="bio"
          {...register("bio")}
          placeholder="Bio"
          className="textarea textarea-bordered textarea-lg"
        />
        {formState.errors?.bio && (
          <p className="text-sm text-red-500">{formState.errors.bio.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-4">
        <button type="submit" className="btn btn-primary">
          Update User
        </button>
      </div>
    </form>
  );
};

export default UpdateUserForm;
