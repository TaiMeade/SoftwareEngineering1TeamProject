"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type z } from "zod";

import { toast } from "sonner";
import { createCommentSchema } from "~/utils/schemas";

const NewComment: React.FC = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<Error>();

  const { register, handleSubmit, formState } = useForm<
    z.infer<typeof createCommentSchema>
  >({
    resolver: zodResolver(createCommentSchema),
  });

  const onFormSubmit = async (data: z.infer<typeof createCommentSchema>) => {
    const res = await fetch("/api/recipe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
      }),
    });

    if (!res.ok) {
      console.log("Error creating comment");
      setError(new Error("Error creating comment"));
      return;
    } else {
      setSuccess(true);
    }

    console.log(data);
  };

  useEffect(() => {
    if (success) toast.success("Successfully posted comment!");

    if (error) toast.error(error.message);
  }, [success, error]);

  return (
    <form
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleSubmit(onFormSubmit)}
      className="flex w-full max-w-3xl flex-col items-start gap-2 pb-24 [&>div]:flex [&>div]:w-full [&>div]:flex-col [&>div]:gap-2 "
    >
      {/* This section is for inserting the title */}
      <div>
        <label htmlFor="title" className="mb-2 text-2xl font-bold">
          Comment
        </label>
        <input
          id="text"
          {...register("text")}
          type="text"
          placeholder="What do you have to say?"
          className="form-textarea block w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        {formState.errors?.text && (
          <p className="text-sm text-red-500">
            {formState.errors.text.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-4">
        <button type="submit" className="icook-button">
          Post Comment
        </button>
      </div>
    </form>
  );
};

export default NewComment;
