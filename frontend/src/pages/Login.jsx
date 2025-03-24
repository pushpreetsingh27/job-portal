import Navbar from "@/components/shared/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { setAuthUser, setLoading } from "@/redux/authSlice";
import { USER_API_END_P0INT } from "@/utils/constant";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {loading} = useSelector(state => state.auth)

  // Handle text input changes
  const handleEvenChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  // Handle radio button change
  const handleRoleChange = (value) => {
    setInput({ ...input, role: value });
  };

 const handleFormSubmit =  async (e) => {
    e.preventDefault();
try {
  dispatch(setLoading(true))
  const response = await axios.post(`${USER_API_END_P0INT}/login` , input , {
    headers :{
      "Content-Type": "application/json"
    },
    withCredentials :true
  })
if(response.data.success){
  dispatch(setAuthUser(response.data.user))
  navigate("/")
  toast.success(response.data.message)
}

} catch (error) {
  console.log("Error in login" , error);
  toast.error(error.response.data.message) 
}
finally{
  dispatch(setLoading(false))
}

 
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
            Login
          </h2>

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
                    Log-in
                     </Button>
                   )}

          {/* Login Link */}
          <div className="my-2 text-center">
            <p>
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-600 font-bold">
                Signup
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
