import Navbar from "@/components/shared/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { setLoading } from "@/redux/authSlice";
import { USER_API_END_P0INT } from "@/utils/constant";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    role: "",
    file: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  // Handle text input changes
  const handleEvenChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  // Handle radio button change
  const handleRoleChange = (value) => {
    setInput({ ...input, role: value });
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullName", input.fullName);
    formData.append("email", input.email);
    formData.append("phone", input.phone);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));
      const response = await axios.post(
        `${USER_API_END_P0INT}/signup`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (response.data.success) {
        navigate("/login");
        toast.success(+response.data.message);
      }
    } catch (error) {
      console.log("Error in Sign in");
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }

    setInput({
      fullName: "",
      email: "",
      phone: "",
      password: "",
      role: "",
      file: "",
    });
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-5xl mx-auto">
        {/* Form */}
        <form
          onSubmit={handleFormSubmit}
          className="w-1/2 border border-gray-400 rounded-md p-6 my-10 shadow-lg bg-white"
        >
          <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">
            Sign Up
          </h2>

          {/* Full Name */}
          <div className="my-4">
            <Label>Full Name</Label>
            <Input
              type="text"
              placeholder="Add full Name..."
              name="fullName"
              value={input.fullName}
              onChange={handleEvenChange}
            />
          </div>

          {/* Email */}
          <div className="my-4">
            <Label>Email</Label>
            <Input
              type="text"
              placeholder="Add Email..."
              name="email"
              value={input.email}
              onChange={handleEvenChange}
            />
          </div>

          {/* Phone */}
          <div className="my-4">
            <Label>Phone</Label>
            <Input
              type="number"
              placeholder="Add Phone Number..."
              name="phone"
              value={input.phone}
              onChange={handleEvenChange}
            />
          </div>

          {/* Password */}
          <div className="my-4">
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="Add Password..."
              name="password"
              value={input.password}
              onChange={handleEvenChange}
            />
          </div>

          {/* Profile Upload */}
          <div className="my-4">
            <Label>Profile</Label>
            <Input type="file" accept="image/*" onChange={handleFileChange} />
          </div>

          {/* Radio Group for Role */}
          <div className="my-4">
            <Label>Role</Label>
            <RadioGroup
              value={input.role}
              onValueChange={handleRoleChange}
              className="flex space-x-4 my-4"
            >
              {/* Student Radio Button */}
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="student"
                  id="r1"
                  name="role"
                  checked={input.role === "student"}
                />
                <Label htmlFor="r1">Student</Label>
              </div>

              {/* Recruiter Radio Button */}
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="recruiter"
                  id="r2"
                  name="role"
                  checked={input.role === "recruiter"}
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>

          {loading ? (
            <Button className="w-full">Please Wait...</Button>
          ) : (
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          )}

          {/* Login Link */}
          <div className="my-2 text-center">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 font-bold">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
