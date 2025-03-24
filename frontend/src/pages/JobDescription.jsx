import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FaBriefcase,
  FaUsers,
  FaRupeeSign,
  FaClock,
  FaCheckCircle,
  FaCalendarAlt,
  FaLayerGroup,
  FaUserTie,
} from "react-icons/fa";
import Navbar from "@/components/shared/Navbar";

const JobDescription = () => {
  const [isApplied, setIsApplied] = useState(false);

  // Mock Data
  const jobDetails = {
    role: "Frontend Developer",
    description:
      "We are looking for a passionate Frontend Developer who is proficient with React.js and Tailwind CSS. The role involves building dynamic and responsive web applications and collaborating with cross-functional teams.",
    salary: "12 LPA",
    experience: "2 - 4 years",
    applicants: 120,
    postedOn: "March 20, 2025",
    positions: 5,
    type: "Full-Time",
  };

  // Apply Handler
  const handleApply = () => {
    setIsApplied(true);
  };

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white shadow-2xl mt-5 rounded-lg border border-gray-200">
      {/* Header with Role & Apply Button */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <FaBriefcase className="text-blue-500" /> {jobDetails.role}
        </h2>
        <Button
          onClick={handleApply}
          disabled={isApplied}
          className={`${
            isApplied
              ? "bg-green-500 text-white cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          } transition duration-200`}
        >
          {isApplied ? (
            <>
              <FaCheckCircle className="mr-2" /> Applied
            </>
          ) : (
            "Apply Now"
          )}
        </Button>
      </div>

      {/* Job Details */}
      <div className="space-y-6">
        {/* Description */}
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">📝 Description</h3>
          <p className="text-gray-600 leading-relaxed">{jobDetails.description}</p>
        </div>

        {/* Salary and Experience */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <FaRupeeSign className="text-green-500" />
            <p className="text-gray-700">
              <span className="font-semibold">Salary:</span> {jobDetails.salary}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <FaUserTie className="text-purple-500" />
            <p className="text-gray-700">
              <span className="font-semibold">Experience:</span> {jobDetails.experience}
            </p>
          </div>
        </div>

        {/* Total Applicants and Positions */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <FaUsers className="text-blue-500" />
            <p className="text-gray-700">
              <span className="font-semibold">Total Applicants:</span> {jobDetails.applicants}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <FaLayerGroup className="text-purple-500" />
            <p className="text-gray-700">
              <span className="font-semibold">Positions:</span> {jobDetails.positions}
            </p>
          </div>
        </div>

        {/* Posted On and Job Type */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-yellow-500" />
            <p className="text-gray-700">
              <span className="font-semibold">Posted On:</span> {jobDetails.postedOn}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <FaClock className="text-orange-500" />
            <Badge
              variant="outline"
              className={`${
                jobDetails.type === "Full-Time"
                  ? "bg-green-100 text-green-700 border-green-300"
                  : "bg-yellow-100 text-yellow-700 border-yellow-300"
              }`}
            >
              ⏰ {jobDetails.type}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
