import React, { useEffect, useState } from "react";
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
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "@/redux/jobSlice";
import { APPLICATION_API_END_P0INT, JOB_API_END_P0INT } from "@/utils/constant";
import toast from "react-hot-toast";
import Navbar from "@/components/shared/Navbar";

const JobDescription = () => {
const [applied , setApplied] = useState(false)
  const {singleJob} = useSelector(store => store.job)
  const {user} = useSelector(store => store.auth)
  const dispatch = useDispatch();
  const params = useParams();
  const jobId = params.id;


  useEffect(() => {
    const fetchJobById = async () => {
      try {
        const response = await axios.get(`${JOB_API_END_P0INT}/get/${jobId}`, {
          withCredentials: true,
        });
        console.log("Res is" , response);
        

        if (response.data.success) {
          dispatch(setSingleJob(response.data.job));
        }
      } catch (error) {
        console.log("Error in fetchJobById", error);
      }
    };

    fetchJobById();
  }, [jobId ,dispatch, user?._id]);
  


const isApplied = singleJob?.applications.some(application => application.applicant === user?._id) || false;



const handleApplyJob = async () => {
try {
  const response = await axios.get(`${APPLICATION_API_END_P0INT}/apply/${jobId}` ,{
    withCredentials: true
  })
  console.log(response.data);
  
  if(response.data.success){
    toast.success("You have appplied to job sucessfully")
    setApplied(true)
    const updatedSingleJob = {...singleJob, applications:[...singleJob.applications,{applicant:user?._id}]}
    dispatch(setSingleJob(updatedSingleJob)); 
  }
} catch (error) {
  toast.error(error.response.data.message)
}
}


  return (
    <div>
      <Navbar/>
    <div className="max-w-7xl mx-auto p-8 bg-white shadow-2xl mt-5 rounded-lg border border-gray-200">
      {/* Header with Role & Apply Button */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <FaBriefcase className="text-blue-500" /> {singleJob?.title}
        </h2>
        <Button
     onClick = {handleApplyJob}
           disabled={isApplied}
          className={`${
            isApplied
              ? "bg-green-500 text-white cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          } transition duration-200`}
        >
           {  applied || isApplied ? (
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
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            📝 Description
          </h3>
          <p className="text-gray-600 leading-relaxed">
            {singleJob?.description}
          </p>
        </div>

        {/* Salary and Experience */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <FaRupeeSign className="text-green-500" />
            <p className="text-gray-700">
              <span className="font-semibold">Salary:</span> {singleJob?.salary}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <FaUserTie className="text-purple-500" />
            <p className="text-gray-700">
              <span className="font-semibold">Experience:</span>{" "}
              {singleJob?.experience} years
            </p>
          </div>
        </div>

        {/* Total Applicants and Positions */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <FaUsers className="text-blue-500" />
            <p className="text-gray-700">
              <span className="font-semibold">Total Applicants:</span>{" "}
              {singleJob?.applications?.length}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <FaLayerGroup className="text-purple-500" />
            <p className="text-gray-700">
              <span className="font-semibold">Positions:</span>{" "}
              {singleJob?.position}
            </p>
          </div>
        </div>

        {/* Posted On and Job Type */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-yellow-500" />
            <p className="text-gray-700">
              <span className="font-semibold">Posted On:</span>{" "}
              {singleJob?.createdAt.slice(0, 10).split("-").reverse().join("-")}

            </p>
          </div>
          <div className="flex items-center gap-2">
            <FaClock className="text-orange-500" />
            <Badge
              variant="outline"
              className={`${
                singleJob?.jobType === "Full-Time"
                  ? "bg-green-100 text-green-700 border-green-300"
                  : "bg-yellow-100 text-yellow-700 border-yellow-300"
              }`}
            >
              ⏰ {singleJob?.jobType}
            </Badge>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default JobDescription;
