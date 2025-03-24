import React from "react";
import { Link } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { FaRegUser } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import { Button } from "../ui/button";

const Navbar = () => {
    const user = false
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
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-88">
                  <div>
                    <h3>Agam Singh</h3>
                    <p className="text-gray-400">Lorem ipsum dolor sit.</p>
                  </div>
                  <div className="flex flex-col mt-2 ">
                    <div className="flex items-center">
                      <FaRegUser />
                      <Button variant = "link">Profile</Button>
                    </div>
                    <div className="flex  items-center">
                      <LuLogOut />
                      <Button variant = "link">Logout</Button>
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
