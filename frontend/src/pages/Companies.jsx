import CompanyTable from "@/components/CompanyTable";
import Navbar from "@/components/shared/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import React from "react";
import { useNavigate } from "react-router-dom";

const Companies = () => {
    const navigate = useNavigate();
    useGetAllCompanies();
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-18">
        <div className="flex items-center justify-between my-5">
          <Input className="w-fit" placeholder="Enter company" />
          <Button
          className = "font-bold"
          onClick = {()=> navigate("/admin/companies/create")}
          >Add Company</Button>
        </div>
        <CompanyTable/>
      </div>
    </div>
  );
};

export default Companies;
