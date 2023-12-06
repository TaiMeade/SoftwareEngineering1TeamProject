"use client";
import { useRouter } from "next/navigation";
import type { Report } from "@prisma/client";

import type { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createReportSchema } from "~/utils/schemas";

import { toast } from "sonner";

import { IoIosSend } from "react-icons/io";
import { FaSpinner } from "react-icons/fa";

interface ReportUserFormProps {
  reporterId: string;
  reportedId: string;
  reportedRecipeId?: string;
  reportedCommentId?: string;
}

type FormData = z.infer<typeof createReportSchema>;

const resolver = zodResolver(createReportSchema);

const ReportUserForm: React.FC<ReportUserFormProps> = ({
  reportedId,
  reporterId,
  reportedRecipeId,
  reportedCommentId,
}) => {
  // TODO: Bug modal not closing after submit
  const router = useRouter();

  const { register, handleSubmit, formState } = useForm<FormData>({ resolver });

  console.log("Form State Errors: ", formState.errors);

  async function onSubmit(data: FormData) {
    console.log("Creating Report with: ", data);

    const res = await fetch("/api/report", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      console.log("Error creating report");
      toast.error("Error creating report: " + res.statusText);
      return;
    }
    const res_data = (await res.json()) as Report;
    toast.success(`User Reported Because: ${res_data.reason}`);

    await new Promise((r) => setTimeout(r, 340));
    router.refresh();
  }

  return (
    <form
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col items-start justify-center gap-4"
    >
      <div className="form-control hidden">
        <input
          id="reporterId"
          type="text"
          {...register("reporterId")}
          value={reporterId}
          className="input input-bordered w-full"
        />
      </div>

      <div className="form-control hidden">
        <input
          id="reportedId"
          type="text"
          {...register("reportedId")}
          value={reportedId}
          className="input input-bordered w-full"
        />
      </div>

      <div className="form-control hidden">
        <input
          id="reportedRecipeId"
          type="text"
          {...register("reportedRecipeId")}
          value={reportedRecipeId}
          className="input input-bordered w-full"
        />
      </div>

      <div className="form-control hidden">
        <input
          id="reportedCommentId"
          type="text"
          {...register("reportedCommentId")}
          value={reportedCommentId}
          className="input input-bordered w-full"
        />
      </div>

      <div className="form-control w-full">
        <label htmlFor="description" className="label mb-2 mt-4">
          <span className="label-text text-lg font-bold">Reason</span>
        </label>
        <textarea
          id="reason"
          placeholder="Reason for reporting"
          onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
          {...register("reason")}
          className="textarea textarea-bordered textarea-lg w-full"
        />
        {formState?.errors.reason && (
          <p className="text-sm text-red-500">
            {formState.errors.reason.message}
          </p>
        )}
      </div>

      <div className="form-control mt-2 flex flex-col gap-4">
        <button
          type="submit"
          disabled={formState.isSubmitting}
          className="btn flex flex-row items-center justify-center gap-2 text-lg disabled:cursor-not-allowed disabled:hover:bg-zinc-900"
        >
          {!formState.isSubmitting ? (
            <>
              <span>Submit</span>
              <IoIosSend className="text-2xl" />
            </>
          ) : (
            <FaSpinner className="m-1 animate-spin text-lg text-white" />
          )}
        </button>
      </div>
    </form>
  );
};

export default ReportUserForm;
