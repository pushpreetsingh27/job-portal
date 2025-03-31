import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const signUp = async (req, res) => {
    try {
        const{fullName , email ,phone , password , role} = req.body;
        const file = req.file
        const fileuri = getDataUri(file)
        const cloudResponse = await cloudinary.uploader.upload(fileuri.content)


        if(!fullName || !email || !phone || !password || !role){
            return res.status(400).json({
                message: "Please fill in all fields.",
                success : false
            });
        }
        const userExist = await User.findOne({email})

        if(userExist){
            return res.status(400).json({
                message: "Email already in use.",
                success : false
            })
        }

        const hashedPassword = await bcrypt.hash(password , 10)

         await User.create({
            fullName ,
             email ,
             phone ,
             password: hashedPassword ,
             role,
             profile : {
                profilePicture : cloudResponse.secure_url
             }
            })

        return res.status(201).json({
            message: "User created successfully.",
            success : true,
          
        })   
            
    }

    catch(error){
        console.log("Error in signup controller", error)
    }
}

export const login = async (req, res) => {
   try {
    const {email , password , role} = req.body;

    if(!email || !password || !role){
        return res.status(400).json({
            message : "Enter all fields",
            success : false
        })      
    }
    
    let user = await User.findOne({email})
    
    if(!user){
        return res.status(400).json({
            message : " Email or password is wrong",
            success : false
        })      
    }
    
    const isPasswordMatched = await bcrypt.compare(password , user.password)
    
    if(!isPasswordMatched){  
        return res.status(400).json({
            message : " Email or password is wrong",
            success : false
        })      
    }
    
    if(role !== user.role){
        return res.status(400).json({
            message : " Role not matched with user role",
            success : false
        })      
    }
    
    const tokenData = {
        userId : user._id ,
    } 

    const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' })

    user = {
        id : user._id,
        fullName : user.fullName,
        email : user.email,
        phone : user.phone,
        role : user.role,
        profile : user.profile

    }

    return res.status(200).cookie("token" , token , {maxAge : 1*24*60*60*1000 , httpsOnly :true ,  sameSite : 'strict'}).json({
        message :`Login Successfull!  Welcome ${user.fullName} `,
        success : true ,
        user
    })


   } catch (error) {
    console.log("Error in login controller ", error);
    
   }
   
}

export const logout = async (req , res) =>{
    try{
   return res.status(200).cookie("token" , "" , {maxAge : 0}).json({
    message : "Logout Successfull",
    success : true ,
   })
    }
    catch{
        console.log("Error in logout controller ", error);
    }
}

export const updateProfile = async (req , res) =>{
    try{
        const { fullName , email , phone ,bio ,skills } = req.body;
        console.log(fullName , email ,phone ,bio , skills );
        
        const file = req.file

        const fileuri = getDataUri(file);

        const cloudResponse = await cloudinary.uploader.upload(fileuri.content, {
            resource_type: "raw", // Correctly treats PDF as a raw file
            public_id: `resumes/${file.originalname.split(".")[0]}`, // Keeps the original name (without extension)
            format: "pdf", // Ensures it's treated as a PDF
            use_filename: true, // Uses the original file name
            unique_filename: false, // Prevents random name generation
          });
          
          
      

      let skillsArray
        if(skills){
             skillsArray = skills.split(",");
        }
        const userId = req.id

        let user = await User.findById(userId)

        if(!user){
            return res.status(404).json({
                message : "User not found",
                success : false ,
                })
        }
      if(fullName)  user.fullName = fullName
      if(email)  user.email = email
      if(phone)  user.phone = phone 
      if(bio)  user.profile.bio = bio 
       if(skills) user.profile.skills = skillsArray 
       if(cloudResponse){
           user.profile.resume = cloudResponse.secure_url
        user.profile.resumeOriginalName = file.originalname
       }

        await user.save();

        user = {
            id : user._id,
            fullName : user.fullName,
            email : user.email,
            phone : user.phone,
            role : user.role,
            profile : user.profile
    
        }

        return res.status(200).json({
            message : "Profile updated successfully",
            success : true ,
            user ,
        })

    }
    catch(error){
        console.log("Error in update profile controller ", error);
    }
}