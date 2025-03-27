import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { FaSave, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_P0INT } from "@/utils/constant";
import { setAuthUser } from "@/redux/authSlice";
import toast from "react-hot-toast";

const EditProfileDialog = ({ open, setOpen }) => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    fullName: user?.fullName,
    email: user?.email,
    phone: user?.phone,
    bio: user?.profile?.bio,
    skills: user?.profile?.skills?.map((skills) => skills),
    file: user?.profile?.resume,
  });

  const handleEvenChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullName", input.fullName);
    formData.append("email", input.email);
    formData.append("phone", input.phone);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      const response = await axios.post(
        `${USER_API_END_P0INT}/profile/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        dispatch(setAuthUser(response.data.user));
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
    setOpen(false);
    console.log("Input is - ", input);
  };

  const handleFileChange = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-800">
              ✨ Profile Editor
            </DialogTitle>
          </DialogHeader>

          {/* Form */}
          <form onSubmit={handleFormSubmit} className="space-y-6">
            {/* Full Name */}
            <div className="grid gap-2">
              <Label htmlFor="name" className="text-gray-700 font-semibold">
                Full Name
              </Label>
              <Input
                id="name"
                value={input.fullName}
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                onChange={handleEvenChange}
                className="w-full"
              />
            </div>

            {/* Email */}
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-gray-700 font-semibold">
                Email
              </Label>
              <Input
                id="email"
                value={input.email}
                name="email"
                type="email"
                placeholder="Enter your email"
                onChange={handleEvenChange}
                className="w-full"
              />
            </div>

            {/* Bio */}
            <div className="grid gap-2">
              <Label htmlFor="bio" className="text-gray-700 font-semibold">
                Bio
              </Label>
              <Textarea
                id="bio"
                value={input.bio}
                name="bio"
                placeholder="Write a short bio..."
                onChange={handleEvenChange}
                className="w-full"
              />
            </div>

            {/* Skills */}
            <div className="grid gap-2">
              <Label htmlFor="skills" className="text-gray-700 font-semibold">
                Skills
              </Label>
              <Input
                id="skills"
                value={input.skills}
                name="skills"
                placeholder="Add skills (comma separated)"
                onChange={handleEvenChange}
                className="w-full"
              />
            </div>

            {/* Resume */}
            <div className="grid gap-2">
              <Label htmlFor="file" className="text-right">
                Resume
              </Label>
              <Input
                id="file"
                name="file"
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="col-span-3"
              />
            </div>

            {/* Footer Buttons */}
            <DialogFooter className="flex justify-end gap-4 mt-4">
              <Button
                variant="outline"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2"
              >
                <FaTimes className="text-red-500" />
                Cancel
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2">
                <FaSave />
                Update Profile
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditProfileDialog;
