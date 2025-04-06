import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { FaRegUser } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_END_P0INT } from "@/utils/constant";
import toast from "react-hot-toast";
import { setAuthUser } from "@/redux/authSlice";
import axios from "axios";
import { HiMenuAlt3, HiX } from "react-icons/hi"; // Hamburger and Close icons

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await axios.get(`${USER_API_END_P0INT}/logout`, {
        withCredentials: true,
      });
      if (response.data.success) {
        dispatch(setAuthUser(null));
        navigate("/");
        toast.success(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="bg-white py-3 shadow-sm">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-4 md:px-0">
        <div>
          <h1 className="font-bold text-3xl">
            Hire<span className="text-blue-600">Hub</span>
          </h1>
        </div>

        {/* Hamburger Icon */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {menuOpen ? <HiX size={28} /> : <HiMenuAlt3 size={28} />}
          </button>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-28">
          <ul className="flex gap-12 font-bold">
            {user && user.role === "recruiter" ? (
              <>
                <li><Link to="/admin/companies">Companies</Link></li>
                <li><Link to="/admin/jobs">Jobs</Link></li>
              </>
            ) : (
              <>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/jobs">Jobs</Link></li>
                <li><Link to="/browse">Browse</Link></li>
              </>
            )}
          </ul>
          {user ? (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar>
                  <AvatarImage src={user?.profile?.profilePicture} alt="avatar" />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-88">
                <div>
                  <h3>{user.fullName}</h3>
                </div>
                <div className="flex flex-col mt-2">
                  {user.role === "student" && (
                    <div className="flex items-center">
                      <FaRegUser />
                      <Button variant="link">
                        <Link to="/profile">Profile</Link>
                      </Button>
                    </div>
                  )}
                  <div className="flex items-center">
                    <LuLogOut />
                    <Button onClick={handleLogout} variant="link">
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          ) : (
            <div className="flex gap-3">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-blue-500 hover:bg-blue-600">Signup</Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 px-4">
          <ul className="flex flex-col gap-4 font-bold">
            {user && user.role === "recruiter" ? (
              <>
                <li><Link to="/admin/companies" onClick={toggleMenu}>Companies</Link></li>
                <li><Link to="/admin/jobs" onClick={toggleMenu}>Jobs</Link></li>
              </>
            ) : (
              <>
                <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
                <li><Link to="/jobs" onClick={toggleMenu}>Jobs</Link></li>
                <li><Link to="/browse" onClick={toggleMenu}>Browse</Link></li>
              </>
            )}
          </ul>
          <div className="mt-4 flex flex-col gap-2">
            {user ? (
              <>
                {user.role === "student" && (
                  <Link to="/profile" onClick={toggleMenu}>
                    <Button variant="link" className="w-full">Profile</Button>
                  </Link>
                )}
                <Button onClick={() => { toggleMenu(); handleLogout(); }} variant="link" className="w-full">
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={toggleMenu}>
                  <Button variant="outline" className="w-full">Login</Button>
                </Link>
                <Link to="/signup" onClick={toggleMenu}>
                  <Button className="bg-blue-500 hover:bg-blue-600 w-full">Signup</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
