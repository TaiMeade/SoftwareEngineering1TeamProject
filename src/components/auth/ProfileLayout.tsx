import ProfileSideBar from "./ProfileSideBar";

interface ProfileLayoutProps {
  children?: React.ReactNode;
}

const ProfileLayout: React.FC<ProfileLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-row items-start gap-12">
      <ProfileSideBar />
      {children}
    </div>
  );
};

export default ProfileLayout;
