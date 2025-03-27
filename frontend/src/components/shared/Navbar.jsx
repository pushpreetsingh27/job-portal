import React from "react";
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

const Navbar = () => {
    const {user} = useSelector(store => store.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

 
    
    const handleLogout = async () => {
      try{
  const response = await axios.get(`${USER_API_END_P0INT}/logout`,{
    withCredentials :true
  })
  if(response.data.success){
    dispatch(setAuthUser(null))
    navigate("/");
    toast.success(response.data.message)
 
    
  }

      }
      catch (error) {
        console.error(error);
        toast.error(error.response.data.message)
      }
    }
 
  return (
    <div className="bg-white py-3 ">
      <div className="flex justify-between max-w-7xl mx-auto">
        <div>
          <h1 className="font-bold text-3xl">
            Hire<span className="text-blue-600">Hub</span>
          </h1>
        </div>
        <div className="flex items-center gap-28">
          <ul className="flex gap-12 font-bold">
            <li> <Link to = "/"> Home</Link></li>
            <li> <Link to= "/jobs"> Jobs</Link></li>
            <li> <Link to = "/browse"> Browse</Link> </li>
          </ul>
          {
            user ? 
            (
                <Popover>
                <PopoverTrigger asChild>
                  <Avatar>
                    <AvatarImage
                      src= {user?.profile?.profilePicture}
                      alt="@shadcn"
                    />
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-88">
                  <div>
                    <h3>{user.fullName}</h3>
             
                  </div>
                  <div className="flex flex-col mt-2 ">
                    <div className="flex items-center">
                      <FaRegUser />
                      <Button variant = "link"><Link to = "/profile">Profile</Link></Button>
                    </div>
                    <div className="flex  items-center">
                      <LuLogOut />
                      <Button
                      onClick = {handleLogout}
                      variant = "link">Logout</Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            )
            : 
            <div className=" flex gap-3">
                <Link to = "/login"> 
              <Button variant = "outline">Login</Button>
                </Link>
                <Link to = "/signup"> 
              <Button className = "bg-blue-500 hover:bg-blue-600">Signup</Button>
             
                </Link>

            </div>

          }
         
        </div>
      </div>
    </div>
  );
};

export default Navbar;
