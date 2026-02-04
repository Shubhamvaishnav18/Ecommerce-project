import { ChevronDown } from "lucide-react";
import avatar from "../assets/images/avatar.png"; 

export default function Navbar() {
  return (
    <header className="h-14 w-full flex items-center justify-between px-6 border-b border-gray-200 bg-gradient-to-r from-[#FFF5EB] via-[#F7F9FF] to-[#EEF2FF]">

      <div />

      <div className="flex items-center gap-2 cursor-pointer">
        <img
          src={avatar}
          alt="User"
          className="w-8 h-8 rounded-full object-cover"
        />
        <ChevronDown size={16} className="text-gray-600" />
      </div>
    </header>
  );
}
