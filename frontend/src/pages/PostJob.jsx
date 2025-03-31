import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import Navbar from "@/components/shared/Navbar";
import { JOB_API_END_P0INT } from "@/utils/constant";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PostJob = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    position: "",
    experience: "",
    companyId: "",
  });

  const [loading, setLoading] = useState(false);
  const { companies } = useSelector((store) => store.company);
  const navigate = useNavigate();

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectEvent = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value
    );
    setFormData({ ...formData, companyId: selectedCompany._id });
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${JOB_API_END_P0INT}/post`, formData, {
        headers: {
            "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/admin/jobs/");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overflow-hidden bg-gray-100 min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Main Container */}
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-4">
        <Card className="w-full max-w-2xl bg-white shadow-md rounded-lg border border-gray-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl font-bold text-gray-800">
              Post a New Job
            </CardTitle>
            <p className="text-sm text-gray-500 mt-1">
              Fill in the details to create a new job listing.
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Company ID */}
                <div className="space-y-1">
                  {companies.length > 0 && (
                    <Select onValueChange={handleSelectEvent}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a Company" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {companies.map((company) => {
                            return (
                              <SelectItem value={company?.name?.toLowerCase()}>
                                {company.name}
                              </SelectItem>
                            );
                          })}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Job Title */}
                <div className="space-y-1">
                  <Label htmlFor="title" className="text-sm font-medium">
                    Job Title
                  </Label>
                  <Input
                    type="text"
                    name="title"
                    placeholder="Enter job title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Description */}
                <div className="space-y-1">
                  <Label htmlFor="title" className="text-sm font-medium">
                    Job Description
                  </Label>
                  <Input
                    type="text"
                    name="description"
                    placeholder="Enter job desceiption"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Salary */}
                <div className="space-y-1">
                  <Label htmlFor="salary" className="text-sm font-medium">
                    Salary
                  </Label>
                  <Input
                    type="number"
                    name="salary"
                    placeholder="Enter salary amount"
                    value={formData.salary}
                    onChange={handleChange}
                    required
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
                    name="location"
                    placeholder="Enter job location"
                    value={formData.location}
                    onChange={handleChange}
                  />
                </div>

                {/* Job Type */}
                <div className="space-y-1">
                  <Label htmlFor="jobType" className="text-sm font-medium">
                    Job Type
                  </Label>
                  <Input
                    type="text"
                    name="jobType"
                    placeholder="e.g., Full-Time, Part-Time"
                    value={formData.jobType}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Position & Experience */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="position" className="text-sm font-medium">
                    Position
                  </Label>
                  <Input
                    type="text"
                    name="position"
                    placeholder="e.g., Developer, Designer"
                    value={formData.position}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="experience" className="text-sm font-medium">
                    Experience (in years)
                  </Label>
                  <Input
                    type="number"
                    name="experience"
                    placeholder="e.g., 2"
                    value={formData.experience}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Requirements */}
              <div className="space-y-1">
                <Label htmlFor="requirements" className="text-sm font-medium">
                  Requirements (comma-separated)
                </Label>
                <Textarea
                  name="requirements"
                  placeholder="e.g., React, Node.js, MongoDB"
                  rows="3"
                  value={formData.requirements}
                  onChange={handleChange}
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-2 mt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/admin/jobs")}
                  className="text-sm px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2"
                  disabled={loading}
                >
                  {loading ? "Posting..." : "Post Job"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PostJob;
