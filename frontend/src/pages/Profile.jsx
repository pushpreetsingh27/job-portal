import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FaUser, FaEnvelope, FaBriefcase, FaFileAlt, FaUserTag, FaEdit } from "react-icons/fa";
import { AiFillSetting } from "react-icons/ai";
import Navbar from "@/components/shared/Navbar";
import AppliedJobs from "@/components/AppliedJobs";

const Profile = () => {
  const profile = {
    fullname: "John Doe",
    description: "Passionate Frontend Developer skilled in React & Tailwind.",
    role: "Student",
    email: "john.doe@example.com",
    skills: ["React", "JavaScript", "Tailwind", "Node.js"],
    resume: "john_doe_resume.pdf",
    avatarUrl: "https://avatars.githubusercontent.com/u/583231?v=4", // Placeholder Avatar
  };

  return (
    <div>
<Navbar/>
  
    <div className="max-w-5xl mx-auto p-8 bg-white shadow-2xl rounded-lg border border-gray-200 relative">
      {/* Edit Button */}
      <Button
        variant="outline"
        size="icon"
        className="absolute top-4 right-4 border-gray-300 hover:bg-blue-50"
      >
        <FaEdit className="text-blue-500" />
      </Button>

      {/* Avatar & User Info */}
      <div className="flex items-center gap-6 mb-8">
        <Avatar className="w-28 h-28 shadow-lg">
          <AvatarImage src={profile.avatarUrl} alt={profile.fullname} />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <FaUser className="text-blue-500" /> {profile.fullname}
          </h2>
          <p className="text-lg text-gray-500 flex items-center gap-2 mt-1">
            <FaBriefcase className="text-green-500" /> {profile.role}
          </p>
          <p className="text-md text-gray-500 mt-2">{profile.description}</p>
        </div>
      </div>

      {/* Profile Information */}
      <div className="space-y-6">
        {/* Role */}
        <div className="flex items-center gap-2">
          <FaUserTag className="text-green-500" />
          <p className="text-md text-gray-700">
            <span className="font-bold">Role:</span> {profile.role}
          </p>
        </div>

        {/* Email */}
        <div className="flex items-center gap-2">
          <FaEnvelope className="text-red-500" />
          <p className="text-md text-gray-700">
            <span className="font-bold">Email:</span> {profile.email}
          </p>
        </div>

        {/* Skills */}
        <div className="flex items-start gap-2">
          <AiFillSetting className="text-yellow-500 mt-1" />
          <div>
            <p className="text-md text-gray-700 font-bold mb-2">Skills:</p>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill, index) => (
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
          <div className="text-md text-gray-700 flex items-center gap-4 bg-gray-100 p-2 rounded-md shadow-sm">
            📄 {profile.resume}
          </div>
        </div>
      </div>
    </div>

    <div>
      
        <AppliedJobs/>
    </div>
    </div>
  );
};

export default Profile;
