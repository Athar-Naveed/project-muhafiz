"use client";

import { Heart, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
const HifazatNavigation = () => {
  const path = usePathname();
  const router = useRouter();
  if (!path.includes("hifazat")) return null;

  const handleLogout = () => {
    Cookies.remove("__serviceToken__");
    router.push("/login");
    setTimeout(() => location.reload(), 3000);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white z-50 border-b border-orange-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-orange-500" />
            <span className="text-xl font-semibold text-black">Hifazat</span>
          </Link>

          <div className="flex items-center space-x-4">
            <div
              onClick={handleLogout}
              className="cursor-pointer inline-flex items-center space-x-2 px-4 py-2 text-sm font-medium text-orange-600 hover:text-orange-700 hover:bg-orange-50 rounded-md transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default HifazatNavigation;
