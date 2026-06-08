import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";
import { toast } from "sonner";

import { setUser } from "../../redux/authSlice";
import { USER_API_END_POINT } from "../../utils/constant.js";

import { Button } from "../ui/button";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

import { Avatar, AvatarImage } from "../ui/avatar";

import {
  BriefcaseBusiness,
  Building2,
  Home,
  LogOut,
  User2,
  Menu,
  X,
} from "lucide-react";

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  // LOGOUT

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(null));

        navigate("/");

        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);

      toast.error(error?.response?.data?.message || "Logout failed");
    }
  };

  return (
    <nav className="bg-white sticky top-0 z-50 shadow-md relative">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4">
        {/* LOGO */}

        <div>
          <Link to="/">
            <h1 className="text-3xl font-extrabold tracking-tight">
              Job<span className="text-emerald-600">Portal</span>
            </h1>
          </Link>
        </div>

        {/* RIGHT SECTION */}

        <div className="flex items-center gap-6">
          {/* MOBILE TOGGLE */}
          <div className="md:hidden">
            <button
              aria-label="Toggle menu"
              onClick={() => setMobileOpen((s) => !s)}
              className="p-2 rounded-md hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
          {/* NAV LINKS */}

          <ul className="hidden md:flex items-center gap-5 font-medium text-gray-700">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link
                    to="/admin/companies"
                    className="hover:text-emerald-600 transition-all duration-200 flex items-center gap-1"
                  >
                    <Building2 className="w-4 h-4" />
                    Companies
                  </Link>
                </li>

                <li>
                  <Link
                    to="/admin/jobs"
                    className="hover:text-emerald-600 transition-all duration-200 flex items-center gap-1"
                  >
                    <BriefcaseBusiness className="w-4 h-4" />
                    Jobs
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/"
                    className="hover:text-emerald-600 transition-all duration-200 flex items-center gap-1"
                  >
                    <Home className="w-4 h-4" />
                    Home
                  </Link>
                </li>

                <li>
                  <Link
                    to="/jobs"
                    className="hover:text-emerald-600 transition-all duration-200"
                  >
                    Jobs
                  </Link>
                </li>

                <li>
                  <Link
                    to="/browse"
                    className="hover:text-emerald-600 transition-all duration-200"
                  >
                    Browse
                  </Link>
                </li>
              </>
            )}
          </ul>

          {/* AUTH SECTION */}

          {!user ? (
            <div className="hidden md:flex items-center gap-3">
              {/* LOGIN */}

              <Link to="/login">
                <Button
                  variant="outline"
                  className="rounded-full px-6 border-gray-300 hover:border-emerald-600 hover:text-emerald-600 shadow-md hover:shadow-xl transition-all duration-300"
                >
                  Login
                </Button>
              </Link>

              {/* SIGNUP */}

              <Link to="/signup">
                <Button className="rounded-full px-6 bg-emerald-600 hover:bg-emerald-700 text-white shadow-md hover:shadow-xl transition-all duration-300">
                  Sign Up
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger>
                <div className="cursor-pointer">
                  <Avatar className="w-10 h-10 border-2 border-emerald-500 hover:scale-105 transition-all duration-200">
                    <AvatarImage
                      src={
                        user?.profile?.profilePhoto ||
                        "https://github.com/shadcn.png"
                      }
                      alt="profile"
                    />
                  </Avatar>
                </div>
              </PopoverTrigger>

              {/* POPOVER */}

              <PopoverContent
                sideOffset={10}
                className="w-80 rounded-2xl border border-gray-200 bg-white shadow-2xl p-5"
              >
                {/* USER INFO */}

                <div className="flex items-center gap-4 pb-5 border-b border-gray-100">
                  <Avatar className="w-14 h-14 border-2 border-emerald-500 shadow-sm">
                    <AvatarImage
                      src={
                        user?.profile?.profilePhoto ||
                        "https://github.com/shadcn.png"
                      }
                      alt="profile"
                    />
                  </Avatar>

                  <div>
                    <h4 className="font-bold text-lg text-gray-800 tracking-tight">
                      {user?.fullname}
                    </h4>

                    <p className="text-sm text-gray-500 mt-1">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>

                {/* MENU */}

                <div className="flex flex-col mt-4 gap-2 text-gray-700">
                  {/* STUDENT */}

                  {user.role === "student" && (
                    <>
                      <Link to="/profile">
                        <div className="flex items-center gap-3 hover:bg-emerald-50 px-3 py-2.5 rounded-xl transition-all duration-200 cursor-pointer">
                          <User2 className="w-5 h-5 text-emerald-600" />

                          <span className="font-medium">View Profile</span>
                        </div>
                      </Link>
                    </>
                  )}

                  {/* RECRUITER */}

                  {user.role === "recruiter" && (
                    <>
                      <Link to="/admin/companies">
                        <div className="flex items-center gap-3 hover:bg-emerald-50 px-3 py-2.5 rounded-xl transition-all duration-200 cursor-pointer">
                          <Building2 className="w-5 h-5 text-emerald-600" />

                          <span className="font-medium">Companies</span>
                        </div>
                      </Link>

                      <Link to="/admin/jobs">
                        <div className="flex items-center gap-3 hover:bg-emerald-50 px-3 py-2.5 rounded-xl transition-all duration-200 cursor-pointer">
                          <BriefcaseBusiness className="w-5 h-5 text-emerald-600" />

                          <span className="font-medium">Admin Dashboard</span>
                        </div>
                      </Link>
                    </>
                  )}

                  {/* LOGOUT */}

                  <div
                    onClick={logoutHandler}
                    className="flex items-center gap-3 hover:bg-red-50 px-3 py-2.5 rounded-xl transition-all duration-200 cursor-pointer mt-1"
                  >
                    <LogOut className="w-5 h-5 text-red-500" />

                    <span className="font-medium text-red-500">Logout</span>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
        {/* MOBILE MENU */}
        {mobileOpen && (
          <div className="md:hidden absolute right-4 top-16 w-64 bg-white rounded-xl shadow-lg p-4 border border-gray-100">
            <ul className="flex flex-col gap-3 text-gray-700">
              {user && user.role === "recruiter" ? (
                <>
                  <li>
                    <Link
                      to="/admin/companies"
                      onClick={() => setMobileOpen(false)}
                      className="block px-2 py-2 rounded hover:bg-emerald-50"
                    >
                      Companies
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/admin/jobs"
                      onClick={() => setMobileOpen(false)}
                      className="block px-2 py-2 rounded hover:bg-emerald-50"
                    >
                      Jobs
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      to="/"
                      onClick={() => setMobileOpen(false)}
                      className="block px-2 py-2 rounded hover:bg-emerald-50"
                    >
                      Home
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/jobs"
                      onClick={() => setMobileOpen(false)}
                      className="block px-2 py-2 rounded hover:bg-emerald-50"
                    >
                      Jobs
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/browse"
                      onClick={() => setMobileOpen(false)}
                      className="block px-2 py-2 rounded hover:bg-emerald-50"
                    >
                      Browse
                    </Link>
                  </li>
                </>
              )}
            </ul>

            <div className="mt-3">
              {!user ? (
                <div className="flex flex-col gap-2">
                  <Link to="/login" onClick={() => setMobileOpen(false)}>
                    <Button variant="outline" className="w-full">
                      Login
                    </Button>
                  </Link>

                  <Link to="/signup" onClick={() => setMobileOpen(false)}>
                    <Button className="w-full bg-emerald-600">Sign Up</Button>
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  {user.role === "student" && (
                    <Link
                      to="/profile"
                      onClick={() => setMobileOpen(false)}
                      className="block px-2 py-2 rounded hover:bg-emerald-50"
                    >
                      View Profile
                    </Link>
                  )}

                  {user.role === "recruiter" && (
                    <>
                      <Link
                        to="/admin/companies"
                        onClick={() => setMobileOpen(false)}
                        className="block px-2 py-2 rounded hover:bg-emerald-50"
                      >
                        Companies
                      </Link>

                      <Link
                        to="/admin/jobs"
                        onClick={() => setMobileOpen(false)}
                        className="block px-2 py-2 rounded hover:bg-emerald-50"
                      >
                        Admin Dashboard
                      </Link>
                    </>
                  )}

                  <button
                    onClick={() => {
                      logoutHandler();
                      setMobileOpen(false);
                    }}
                    className="w-full text-left px-2 py-2 rounded hover:bg-red-50 text-red-500"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
