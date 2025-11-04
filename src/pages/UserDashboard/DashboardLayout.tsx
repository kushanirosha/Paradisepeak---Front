import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaHistory,
  FaImages,
  FaSignOutAlt,
  FaChevronLeft,
  FaStar,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import ApiService from "../../services/ApiService";

type DashboardLayoutProps = {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
};

const SidebarItem: React.FC<{
  to: string;
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}> = ({ to, icon, label, onClick }) => {
  const location = useLocation();
  const active = location.pathname === to;
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors duration-150 ${
        active
          ? "bg-white/10 text-white"
          : "text-gray-200 hover:bg-white/10 hover:text-white"
      }`}
    >
      <span className="text-base">{icon}</span>
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
};

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  title,
  subtitle,
  children,
}) => {
  const navigate = useNavigate();
  const [sharUserData, setUserData] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    ApiService.getUserDataById()
      .then((res) => {
        if (res) {
          setUserData(res);
        }
      })
      .catch((err) => console.error("Error fetching user:", err));
  }, []);

  // Inside DashboardLayout component
const [greeting, setGreeting] = useState("");

useEffect(() => {
  const now = new Date();
  const hour = now.getHours();

  if (hour < 12) {
    setGreeting("Good Morning");
  } else if (hour < 18) {
    setGreeting("Good Afternoon");
  } else {
    setGreeting("Good Evening");
  }
}, []);

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      {/* Sidebar (Desktop & Mobile Drawer) */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-40 w-[260px] shrink-0 bg-[#0D1244] text-white border-r border-white/10 flex flex-col transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
        style={{ boxShadow: "inset -1px 0 0 rgba(255,255,255,0.04)" }}
      >
        {/* Header */}
        <div className="px-4 py-5 flex items-center gap-3 border-b border-white/10">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white font-semibold">
            {sharUserData?.name?.charAt(0) ?? ""}
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold">{sharUserData?.name ?? ""}</div>
            <div className="text-[11px] text-white/70">{greeting}</div>
          </div>
          {/* Close button (Mobile) */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="ml-auto text-white text-lg md:hidden"
          >
            <FaTimes />
          </button>
        </div>

        {/* Navigation */}
        <nav className="px-3 py-4 flex-1 flex flex-col gap-2">
          <SidebarItem
            to="/bookinghistory"
            icon={<FaHistory />}
            label="Booking History"
            onClick={() => setSidebarOpen(false)}
          />
          <SidebarItem
            to="/userreview"
            icon={<FaStar />}
            label="Reviews"
            onClick={() => setSidebarOpen(false)}
          />
          <SidebarItem
            to="/sharephotos"
            icon={<FaImages />}
            label="Share Photos"
            onClick={() => setSidebarOpen(false)}
          />
        </nav>

        {/* Footer */}
        <div className="mt-auto p-3">
          <button
            onClick={() => navigate("/")}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-gray-200 hover:text-white hover:bg-white/10 transition-colors"
          >
            <FaChevronLeft />
            <span className="text-sm font-medium">Back to site</span>
          </button>
        </div>
      </aside>

      {/* Backdrop for mobile */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 md:hidden z-30"
        />
      )}

      {/* Main content */}
      <main className="flex-1 min-w-0 h-full overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur border-b border-gray-200 flex items-start justify-between px-4 sm:px-6 md:px-10 pt-6 pb-4">
          <div className="flex items-start gap-3">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-gray-700 text-xl md:hidden mt-1"
            >
              <FaBars />
            </button>
            <div>
              <div className="text-sm text-gray-500">
                Welcome back, {sharUserData?.name ?? ""}
              </div>
              <div className="text-xs text-gray-400">
                {sharUserData?.email ?? ""}
              </div>
              {title && (
                <h1 className="text-lg sm:text-xl md:text-2xl font-semibold mt-3 text-gray-900">
                  {title}
                </h1>
              )}
              {subtitle && (
                <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
              )}
            </div>
          </div>

          <button
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 text-sm font-medium"
            onClick={() => {
              ApiService.logout();
              navigate("/");
            }}
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>

        {/* Page Content */}
        <div className="px-4 sm:px-6 md:px-10 pb-10">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
