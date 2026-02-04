import { Search, ChevronDown, Box } from "lucide-react";
import avatar from "../assets/images/avatar.png";

export default function ProductNavbar({
    showSearch,
    searchValue,
    onSearch,
}) {
    return (
        <header className="h-14 flex items-center justify-between px-6 bg-gradient-to-r from-[#FFF5EB] via-[#F7F9FF] to-[#EEF2FF]">
            <div className="flex items-center gap-2 text-sm text-[#344054]">
                <Box size={16} />
                Products
            </div>

            <div className="flex items-center gap-10">
                {showSearch && (
                    <div className="relative">
                        <Search
                            size={16}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />
                        <input
                            value={searchValue}
                            onChange={(e) => onSearch(e.target.value)}
                            placeholder="Search Products"
                            className="pl-9 pr-3 py-2 rounded-md bg-transparent text-sm w-64 shadow-sm focus:outline-none"
                        />
                    </div>
                )}

                <div className="flex items-center gap-1 cursor-pointer">
                    <img src={avatar} className="w-8 h-8 rounded-full" />
                    <ChevronDown size={16} />
                </div>
            </div>
        </header>
    );
}
