"use client";
import { SessionProvider } from "next-auth/react";
import { type Session } from "next-auth";
import { Toaster } from "sonner";

interface ProvidersProps {
  children?: React.ReactNode;
  session: Session | null;
}

const Providers: React.FC<ProvidersProps> = ({ children, session }) => {
  return (
    <SessionProvider session={session}>
      {children}
      <Toaster
        richColors={true}
        closeButton={true}
        toastOptions={{
          duration: 5000,
          style: { fontSize: "1.125rem", lineHeight: "1.75rem" },
        }}
        className="text-lg"
      />
    </SessionProvider>
  );
};

export default Providers;
