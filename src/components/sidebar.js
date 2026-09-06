import Logo from "../images/login.jpeg";
import { useNavigate, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, Vote, LogOut } from "lucide-react";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  const navItems = [
    { label: "Dashboard", path: "/admin-dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
    { label: "Candidates", path: "/candidate-register", icon: <Users className="w-5 h-5" /> },
    { label: "Voters", path: "/voter-register", icon: <Vote className="w-5 h-5" /> },
  ];

  return (
    <aside className="w-20 bg-white border border-stone-200 rounded-2xl shadow-xs hidden md:flex flex-col items-center justify-between py-6 my-6 ml-6 font-sentient">
      <div className="flex flex-col items-center gap-8">
        <img src={Logo} alt="logo" class="w-20" />

        <nav className="flex flex-col gap-3">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                title={item.label}
                className={`p-3 rounded-xl transition-colors cursor-pointer flex items-center justify-center
                ${isActive ? "bg-green-900 text-white shadow-sm" : "text-stone-500 hover:bg-stone-100"}`}
              >
                {item.icon}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="pt-4 border-t border-stone-100 w-full flex justify-center">
        <button
          onClick={handleLogout}
          title="Sign Out"
          className="p-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors cursor-pointer flex items-center justify-center"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </aside>
  );
}