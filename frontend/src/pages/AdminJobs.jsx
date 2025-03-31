import JobTable from "@/components/JobTable";
import Navbar from "@/components/shared/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useGetAdminJobs from "@/hooks/useGetAdminJobs";
import React from "react";
import { useNavigate } from "react-router-dom";

const AdminJobs = () => {
    useGetAdminJobs()
    const navigate = useNavigate();
   
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-18">
        <div className="flex items-center justify-between my-5">
          <Input className="w-fit" placeholder="Enter company" />
          <Button
          className = "font-bold"
          onClick = {()=> navigate("/admin/jobs/create")}
          >Post Job</Button>
        </div>
        <JobTable/>
      </div>
    </div>
  );
};

export default AdminJobs;
