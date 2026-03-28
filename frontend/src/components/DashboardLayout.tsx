import { useState, type ReactNode } from "react";
import { Home, Menu, X, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface SidebarItemProps {
  icon: ReactNode;
  label: string;
  onClick: () => void;
}
interface DashboardLayoutProps {
  children: ReactNode;
}

function SidebarItem({ icon, label, onClick }: SidebarItemProps) {
  return (
    <div
      onClick={onClick}
      className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
    >
      {icon}
      <span className="text-gray-700">{label}</span>
    </div>
  );
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <div className="flex h-screen bg-gray-100">
      <div
        className={`fixed z-30 inset-y-0 left-0 w-64 bg-white shadow-lg transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:translate-x-0 md:static md:inset-0`}
      >
        <div className="flex items-center justify-between px-4 py-4">
          <h2 className="text-lg font-bold">My App</h2>
          <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
            <X />
          </button>
        </div>

        <nav className="mt-4 space-y-2 px-4">
          <SidebarItem
            icon={<Home size={20} />}
            label="Dashboard"
            onClick={() => {
              navigate("/dashboard", { replace: true });
            }}
          />
          <SidebarItem
            icon={<LogOut size={20} />}
            label="Logout"
            onClick={() => {
                console.log(88888)
              logout();
            }}
          />
        </nav>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      <div className="flex-1 flex flex-col">
        <header className="flex items-center justify-between bg-white shadow px-4 py-3">
          <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu />
          </button>
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
        </header>

        <main className="p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
