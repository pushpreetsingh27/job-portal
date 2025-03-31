import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";
import Navbar from "@/components/shared/Navbar";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import useGetCompanyById from "@/hooks/useGetCompanyById";


const CompanySetup = () => {
  const params = useParams()
  useGetCompanyById(params.id);

  const [formData, setFormData] = useState({
    name: "",
    website: "",
    description: "",
    location: "",
    file: "",

  });

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {singleCompany} = useSelector(store => store.company)


  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle Logo Upload
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
         file,
      });
    }
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();


    setLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("website", formData.website);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("location", formData.location);
    if (formData.file) {
      formDataToSend.append("file", formData.file);
    }

    try {
      const response = await axios.put(
        `${COMPANY_API_END_POINT}/update/${params.id}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );



      if (response.data.success) {
        console.log("Updated Company info is ", response.data);
        dispatch(setSingleCompany(response.data.company));
        toast.success(response.data.message);
        navigate("/admin/companies/");
      }
    } catch (error) {

      toast.error(error.response.data.message)
 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setFormData({
        name: singleCompany.name || "",
        description: singleCompany.description || "",
        website: singleCompany.website || "",
        location: singleCompany.location || "",
        file: singleCompany.file || null
    })
},[singleCompany]);


  return (
    <div className="overflow-hidden bg-gray-100 min-h-screen">
      {/* Navbar */}
      <Navbar />
      
      {/* Main Container */}
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-4">
        <Card className="w-full max-w-2xl bg-white shadow-md rounded-lg border border-gray-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl font-bold text-gray-800">
              Company Setup
            </CardTitle>
            <p className="text-sm text-gray-500 mt-1">
              Fill in the details to set up your company.
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Company Name */}
                <div className="space-y-1">
                  <Label htmlFor="companyName" className="text-sm font-medium">
                    Company Name
                  </Label>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Enter company name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Website */}
                <div className="space-y-1">
                  <Label htmlFor="website" className="text-sm font-medium">
                    Website
                  </Label>
                  <Input
                    type="url"
                    id="website"
                    name="website"
                    placeholder="https://example.com"
                    value={formData.website}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Location */}
                <div className="space-y-1">
                  <Label htmlFor="location" className="text-sm font-medium">
                    Location
                  </Label>
                  <Input
                    type="text"
                    id="location"
                    name="location"
                    placeholder="Enter company location"
                    value={formData.location}
                    onChange={handleChange}
                  />
                </div>

                {/* Logo Upload */}
                <div className="space-y-1">
                  <Label htmlFor="logo" className="text-sm font-medium">
                    Company Logo
                  </Label>
                  <Input
                    type="file"
                    id="logo"
                    name="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1">
                <Label htmlFor="description" className="text-sm font-medium">
                  Description
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Enter company description"
                  rows="3"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-2 mt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/admin/companies")}
                  className="text-sm px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2"
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Add Company"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CompanySetup;
