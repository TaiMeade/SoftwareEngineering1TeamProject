import ProfileSideBar from "./ProfileSideBar";

interface ProfileLayoutProps {
  children?: React.ReactNode;
}

const AuthLayout: React.FC<ProfileLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-row items-start gap-12">
      <ProfileSideBar />
      <div className="flex flex-col gap-12 pt-4">{children}</div>
    </div>
  );
};

export default AuthLayout;
