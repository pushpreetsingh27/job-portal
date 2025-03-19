import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signUp = async (req, res) => {
    try {
        const{fullName , email ,phone , password , role} = req.body;

        if(!fullName || !email || !phone || !password || !role){
            return res.status(400).json({message: "Please fill in all fields."});
        }
        const userExist = await User.findOne({email})

        if(userExist){
            return res.status(400).json({message: "Email already in use."})
        }

        const hashedPassword = await bcrypt.hash(password , 10)

         await User.create({
            fullName ,
             email ,
             phone ,
             password: hashedPassword ,
             role
            })
    }

    catch(error){
        console.log("Error in signup controller", error)
    }
}