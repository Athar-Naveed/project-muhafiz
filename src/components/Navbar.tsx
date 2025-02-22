"use client";

import { Heart, LogIn, UserPlus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
const Navigation = () => {
  const path = usePathname();
  if (path.includes("hifazat")) return null;
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white z-50 border-b border-orange-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-orange-500" />
            <span className="text-xl font-semibold text-black">Hifazat</span>
          </Link>

          <div className="flex items-center space-x-4">
            <Link
              href="/login"
              className="inline-flex items-center space-x-2 px-4 py-2 text-sm font-medium text-orange-600 hover:text-orange-700 hover:bg-orange-50 rounded-md transition-colors"
            >
              <LogIn className="h-4 w-4" />
              <span>Login</span>
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-md transition-colors"
            >
              <UserPlus className="h-4 w-4" />
              <span>Sign Up</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
