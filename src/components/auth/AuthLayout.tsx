import AuthSidebar from "./AuthSidebar";

interface ProfileLayoutProps {
  children?: React.ReactNode;
}

const AuthLayout: React.FC<ProfileLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-row items-start gap-12">
      <AuthSidebar />
      <div className="flex flex-col gap-12 pt-4 sm:ml-[var(--sidebar-width)]">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
