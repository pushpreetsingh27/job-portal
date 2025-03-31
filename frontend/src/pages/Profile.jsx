import React, { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FaUser, FaEnvelope, FaBriefcase, FaFileAlt, FaEdit , FaPhone } from "react-icons/fa";
import { AiFillSetting } from "react-icons/ai";
import Navbar from "@/components/shared/Navbar";
import AppliedJobs from "@/components/AppliedJobs";
import EditProfileDialog from "@/components/EditProfileDialog";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useGetAppliedJobs from "@/hooks/useGetAllAppliedJobs";

const Profile = () => {
  useGetAppliedJobs()
const [open , setOpen] = useState(false)
const {user} = useSelector(store => store.auth)
console.log("Profile is " , user);

 

  return (
    <div>
<Navbar/>
  
    <div className="max-w-5xl mx-auto p-8 bg-white shadow-2xl rounded-lg border border-gray-200 relative">
      {/* Edit Button */}
      <Button
      onClick = {()=> setOpen(true)}
        variant="outline"
        size="icon"
        className="absolute top-4 right-4 border-gray-300 hover:bg-blue-50"
      >
        <FaEdit className="text-blue-500" />
      </Button>

      {/* Avatar & User Info */}
      <div className="flex items-center gap-6 mb-8">
        <Avatar className="w-28 h-28 shadow-lg">
          <AvatarImage src={user?.profile?.profilePicture} alt={user?.fullname} />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <FaUser className="text-blue-500" /> {user?.fullName}
          </h2>
          <p className="text-lg text-gray-500 flex items-center gap-2 mt-1">
            {/* <FaBriefcase className="text-green-500" /> {profile.role} */}
          </p>
          <p className="text-md text-gray-500 mt-2">{user?.profile?.bio}</p>
        </div>
      </div>

      {/* Profile Information */}
      <div className="space-y-6">
        {/* Phone */}
        <div className="flex items-center gap-2">
          <FaPhone className="text-green-500" />
          <p className="text-md text-gray-700">
            <span className="font-bold">Phone:</span> {user?.phone}
          </p>
        </div>

        {/* Email */}
        <div className="flex items-center gap-2">
          <FaEnvelope className="text-red-500" />
          <p className="text-md text-gray-700">
            <span className="font-bold">Email:</span> {user?.email}
          </p>
        </div>

        {/* Skills */}
        <div className="flex items-start gap-2">
          <AiFillSetting className="text-yellow-500 mt-1" />
          <div>
            <p className="text-md text-gray-700 font-bold mb-2">Skills:</p>
            <div className="flex flex-wrap gap-2">
              {user?.profile?.skills.map((skill, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="text-blue-700 bg-blue-50 border border-blue-200 shadow-sm"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Resume */}
        <div className="flex items-center gap-2">
          <FaFileAlt className="text-indigo-500" />
          <Link 
          to={user?.profile?.resume}
          target="_blank" 
          className="text-md text-gray-700 flex items-center gap-4 bg-gray-100 p-2 rounded-md shadow-sm">
            📄 {user?.profile?.resumeOriginalName}
          </Link>
        </div>
      </div>
    </div>

    <div>
      
        <AppliedJobs/>
    </div>
    {
     open && <EditProfileDialog open ={open} setOpen = {setOpen}/>
    }
    </div>
  );
};

export default Profile;
