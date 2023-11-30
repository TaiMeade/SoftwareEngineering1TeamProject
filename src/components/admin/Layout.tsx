import AdminSidebar from "./Sidebar";

interface AdminLayoutProps {
  children?: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-row items-start gap-12">
      <AdminSidebar />
      <div className="flex flex-col gap-12 pt-4 md:ml-[var(--sidebar-width)]">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
