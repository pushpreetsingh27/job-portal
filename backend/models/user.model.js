import mongoose from "mongoose";


const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true, 
      unique: true,
    
    },
    phone: {
      type: Number,
      required: true, 
      unique: true,
     
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["student", "recruiter"],
      default: "student",
    },
    profile: {
        bio: {
            type: String
          },
          skills: {
            type: String
          },
          resume: {
            type: String
          },
          resumeOriginalName: {
            type: String
       
          },
          company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Company",
          },
          profilePicture: {
            type: String,
            default: ""
          }
    },
  },
  { timestamps: true }
);



const User = model("User", userSchema);

export default User;
