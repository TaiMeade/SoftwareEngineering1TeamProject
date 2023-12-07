"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { sleep } from "~/utils";

import { type Comment } from "@prisma/client";

import Modal from "../Modal";

import { BiTrash } from "react-icons/bi";
import { GrClose } from "react-icons/gr";

interface DeleteButtonProps {
  comment: Comment;
}

const DeleteComment: React.FC<DeleteButtonProps> = ({ comment }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const deleteComment = async () => {
    setLoading(true);

    const res = await fetch("/api/comment/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: comment.id }),
    });

    if (res.ok) {
      toast.success("Comment deleted!");

      await sleep(1000);
      setLoading(false);

      router.push("/");
    } else toast.error("Failed to delete comment!");
  };

  return (
    <Modal
      title="Delete Comment"
      button={
        <>
          <span>Delete</span>
          <BiTrash className="text-2xl text-gray-600" />
        </>
      }
      className="flex flex-col items-start justify-center gap-2"
      btnClass="btn btn-warning flex flex-row items-center justify-center gap-2 text-lg"
    >
      <h2 className="text-lg text-gray-600">
        Are you sure you want to delete this comment?
      </h2>

      <p className="text-sm text-gray-600">This action cannot be undone.</p>

      <div className="flex flex-row items-center justify-between gap-4">
        <button
          onClick={() => void deleteComment()}
          disabled={loading}
          className="btn btn-warning flex flex-row items-center justify-center gap-2 text-lg disabled:btn-disabled "
        >
          <span>Delete</span>
          <BiTrash className="text-2xl" />
        </button>

        <form method="dialog">
          <button className="btn flex flex-row items-center justify-center gap-1 text-lg">
            <span>Cancel</span>
            <GrClose className="text-2xl" />
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default DeleteComment;
