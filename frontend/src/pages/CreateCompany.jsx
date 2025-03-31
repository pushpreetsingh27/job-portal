import Navbar from "@/components/shared/Navbar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";
import axios from "axios";

const CreateCompany = () => {
    const [companyName , setCompanyName] = useState()
    const dispatch = useDispatch()
    const navigate = useNavigate();

   const handleAddCompany = async () =>{
    try {
        const response = await axios.post(`${COMPANY_API_END_POINT}/register`, {companyName}, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials :true
        })
        console.log("Res " , response);
        

        if(response.data.success){
           dispatch(setSingleCompany(response.data.company))
            toast.success(response.data.message)
            const companyId = response.data.company._id
            navigate(`/admin/companies/${companyId}`)
        }

    } catch (error) {
        toast.error(error.response.data.message)
    }
   }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto mt-12 p-8 bg-white shadow-xl rounded-xl border border-gray-200">
        {/* Heading Section */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800"> Add Company</h1>
          <p className="text-gray-500 mt-2">
            Please provide the company name to proceed.
          </p>
        </div>

        {/* Form Section */}
        <div className="space-y-6">
          <div className="flex flex-col gap-2">
            <Label htmlFor="company-name" className="text-base font-medium text-gray-700">
              Company Name
            </Label>
            <Input
              type="text"
              placeholder="Enter company name..."
              className="w-full border border-gray-300 rounded-lg shadow-sm"
              onChange = {(e)=> setCompanyName(e.target.value)}
            />
          </div>

          {/* Button Actions */}
          <div className="flex items-center justify-end gap-4 mt-6">
            <Button
            onClick = {()=> navigate("/admin/companies")}
              variant="outline"
              className="text-gray-700 border border-gray-300 hover:bg-gray-100 transition"
            >
              Cancel
            </Button>
            <Button
            onClick = {handleAddCompany}
              className="bg-blue-500 hover:bg-blue-600 text-white transition"
            >
              Add Company
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCompany;
