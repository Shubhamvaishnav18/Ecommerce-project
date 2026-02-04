import { Link, useLocation } from "react-router-dom";
import { Home, Box, Search } from "lucide-react";
import logoIcon from "../assets/images/logoIcon.png"

export default function Sidebar() {
  const location = useLocation();

  const navItem = (to, label, Icon) => {
    const isActive = location.pathname === to;

    return (
      <Link
        to={to}
        className={`flex items-center gap-3 px-2 py-2 text-sm font-medium transition
        ${isActive
            ? "text-white"
            : "text-[#98A2B3] hover:text-white"
          }
      `}
      >
        <Icon
          size={18}
          className={isActive ? "text-white" : "text-[#98A2B3]"}
        />
        {label}
      </Link>
    );
  };

  return (
    <aside className="w-64 h-screen bg-[#1D222B] text-[#FFFFFF] flex flex-col p-4">

      {/* Logo */}
      <div className="flex items-center gap-2 mb-6">
        <h1 className="text-3xl font-bold">Productr</h1>
        <img
          src={logoIcon}
          alt="Productr Icon"
          className="w-6 h-6 object-contain"
        />
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[#98A2B3]"
        />
        <input
          placeholder="Search"
          className="w-full pl-9 pr-3 py-2 rounded-md bg-[#2F343D] text-sm text-[#98A2B3] placeholder-gray-400 focus:outline-none"
        />
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1">
        {navItem("/home", "Home", Home)}
        {navItem("/products", "Products", Box)}
      </nav>
    </aside>
  );
}
