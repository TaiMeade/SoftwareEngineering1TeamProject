"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { cn } from "~/utils/tw";

interface ResolveReportProps {
  reportId: string;
  isResolved: boolean;
}

const ResolveReport: React.FC<ResolveReportProps> = ({
  reportId,
  isResolved,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const onResolve = async () => {
    if (isLoading) return;
    setIsLoading(true);

    const res = await fetch("/api/report/resolve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reportId }),
    });

    if (!res.ok) {
      toast.error("Failed to resolve report.");
      setIsLoading(false);
      return;
    }

    const data = (await res.json()) as boolean;
    if (!data) toast.success("Report resolved!");
    else toast.warning("Report unresolved.");

    setIsLoading(false);

    await new Promise((r) => setTimeout(r, 340));

    router.refresh();
  };

  return (
    <button
      onClick={() => void onResolve()}
      disabled={isLoading}
      className={cn(
        "btn btn-sm disabled:cursor-not-allowed disabled:opacity-50",
        isResolved ? "btn-primary" : "btn-secondary",
      )}
    >
      {isLoading ? "Loading..." : "Resolved:" + (isResolved ? "Yes" : "No")}
    </button>
  );
};

export default ResolveReport;
