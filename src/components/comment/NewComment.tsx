"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import type { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCommentSchema } from "~/utils/schemas";

import { toast } from "sonner";

import { motion, AnimatePresence } from "framer-motion";

type FormData = z.infer<typeof createCommentSchema>;
const resolver = zodResolver(createCommentSchema);

interface NewCommentProps {
  recipeId: string;
  commentId?: string;
}

const NewComment: React.FC<NewCommentProps> = ({ recipeId, commentId }) => {
  const router = useRouter();
  const [isReplying, setIsReplying] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver,
  });

  async function onSubmit(data: FormData) {
    console.log("Submitting", data);

    const res = await fetch("/api/comment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      toast.error("Error creating comment: " + res.statusText);
      return;
    }

    toast.success("Comment created!");
    setIsReplying(false);

    await new Promise((r) => setTimeout(r, 180));
    router.push(`/recipes/${recipeId}`, {
      scroll: true,
    });
  }

  return (
    <>
      <button
        onClick={() => setIsReplying((prev) => !prev)}
        className="link-hover link"
      >
        {isReplying ? "Cancel" : commentId ? "Reply" : "Add your comment"}
      </button>

      <AnimatePresence>
        {isReplying && (
          <motion.div
            initial={{ height: 0, opacity: 0, overflow: "hidden" }}
            animate={{ height: "auto", opacity: 1, overflow: "visible" }}
            exit={{ height: 0, opacity: 0, overflow: "hidden" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="flex w-full flex-col items-start gap-1"
          >
            <h3 className="text-xl font-bold">Reply</h3>

            <form
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onSubmit={handleSubmit(onSubmit)}
              className="flex w-full flex-col items-start justify-center space-y-4"
            >
              <input
                id="recipeId"
                type="text"
                {...register("recipeId")}
                value={recipeId}
                className="hidden"
              />

              <input
                id="commentId"
                type="text"
                {...register("commentId")}
                value={commentId}
                className="hidden"
              />

              <div className="form-control w-full">
                <label htmlFor="text" className="label mb-2 mt-4">
                  <span className="label-text text-lg font-bold">
                    Your comment
                  </span>
                </label>
                <textarea
                  id="text"
                  placeholder="Your comment..."
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                    }
                  }}
                  {...register("text")}
                  className="textarea textarea-bordered textarea-lg w-full"
                />
                {errors.text && (
                  <p className="text-sm text-red-500">{errors.text.message}</p>
                )}
                {errors.recipeId && (
                  <p className="text-sm text-red-500">
                    {errors.recipeId.message}
                  </p>
                )}
                {errors.commentId && (
                  <p className="text-sm text-red-500">
                    {errors.commentId.message}
                  </p>
                )}
              </div>

              <div className="flex flex-row gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-info disabled:opacity-50"
                >
                  {!isSubmitting ? (
                    "Reply"
                  ) : (
                    <div className="loading loading-spinner h-4 w-4" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setIsReplying(false)}
                  className="btn btn-warning"
                >
                  Cancel
                </button>
              </div>
            </form>
            <pre>
              <code>Is submitting: {isSubmitting ? "true" : "false"}</code>
            </pre>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NewComment;
