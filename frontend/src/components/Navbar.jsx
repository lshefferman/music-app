import React, { useState } from "react";
import { Link, useResolvedPath, useNavigate } from "react-router-dom";
import { CircleUserRound, LogOut, Music, User } from "lucide-react";
import { useUserStore } from "../store/useUserStore";

function Navbar() {
  const { pathname } = useResolvedPath();
  const isHomePage = pathname == "/";
  const navigate = useNavigate();

  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/"); // Redirect to homepage on logout
  };

  return (
    <div className="bg-base-100/80 backdrop-blur-lg border-b border-base-content/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto">
        <div className="navbar px-4 min-h-[4rem] justify-between">
          {/* LOGO */}
          <div className="flex-1 lg:flex-none">
            <Link to="/" className="hover:opacity-80 transition-opacity">
              <div className="flex items-center gap-2">
                <Music className="size-9 text-primary" />
                <span
                  className="font-semibold font-mono tracking-widest text-2xl 
                        bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
                >
                  SOUNDSPOT
                </span>
              </div>
            </Link>
          </div>
          {/* RIGHT SECTION */}
          <div className="flex items-center gap-4 relative">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className="p-2 rounded-full hover:bg-base-200 transition-colors"
                >
                  <CircleUserRound className="size-5" />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-base-100 border border-base-300 rounded shadow z-50">
                    <Link
                      to="/profile"
                      className="px-4 py-2 hover:bg-base-200 flex items-center gap-2"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <User size={16} /> Profile
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-base-200 flex items-center gap-2"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className="btn btn-sm btn-primary">
                  Login
                </Link>
                <Link to="/signup" className="btn btn-sm btn-primary">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
