import React from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import { Link } from "react-router-dom";
import { MessageSquare, Settings, User, LogOut } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header className="bg-slate-600 fixed w-full top-0 z-40 backdrop-blur-lg bg-opacity-90">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Left Part */}
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="flex items-center gap-3 hover:opacity-90 transition-transform transform hover:scale-105"
          >
            {/* Logo Icon */}
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shadow-lg">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>

            {/* Logo Text */}
            <div className="flex flex-col items-start justify-center">
              <h1 className="text-lg font-semibold text-white">ChatFlow</h1>
              <p className="text-xs text-gray-200 font-medium">
                Connect, Share, Collaborate
              </p>
            </div>
          </Link>
        </div>

        {/* Right Part */}
        <div className="flex gap-3 items-center">
          <Link
            to={"/settings"}
            className="px-3 py-2 text-sm border border-zinc-400 hover:bg-gray-700 text-gray-300 hover:text-white rounded transition-colors flex items-center gap-2"
          >
            <Settings className="w-4 h-4" />
            <span className="hidden sm:inline">Settings</span>
          </Link>

          {authUser && (
            <>
              <Link
                to={"/profile"}
                className="px-3 py-2 text-sm border border-zinc-400 hover:bg-gray-700 text-gray-300 hover:text-white rounded transition-colors flex items-center gap-2"
              >
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">Profile</span>
              </Link>

              <button
                className="px-3 py-2 text-sm border border-zinc-400 hover:bg-gray-700 text-gray-300 hover:text-white rounded transition-colors flex items-center gap-2"
                onClick={logout}
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;








