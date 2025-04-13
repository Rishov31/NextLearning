import {User} from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";

export const register = async (req,res) => {  //how a user get register in db..
    try {
       
        const {name, email, password} = req.body; // destructuring the request body which are comes from the client side
        if(!name || !email || !password){  //keo akta empty ele error hobe..
            return res.status(400).json({
                success:false,
                message:"All fields are required."
            })
        }

        const user = await User.findOne({email}); // check if the user already exist with this email or not...find the email from database(User schema)
        if(user){ //if user exist ..then return user already exist if not then create the user
            return res.status(400).json({
                success:false,
                message:"User already exist with this email."
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
    // Create User--
        await User.create({  //jegulo User schema te require chilo segulo lagbe create korar jonno 
            name, //egulo req.body theke asche..
            email, //we can write it as name:name, email:email but jokhon key ar value er name same hobe then we write only one..
            password:hashedPassword
        });
        return res.status(201).json({
            success:true,
            message:"Account created successfully."
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Failed to register"
        })
    }
}
export const login = async (req,res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"All fields are required."
            })
        }
        const user = await User.findOne({email}); //get the details for user from db by email
        if(!user){  //if user is not present in db mane not exist..
            return res.status(400).json({
                success:false,
                message:"Incorrect email or password"
            })
        }
//if user is exist then match password which comes from input field from client with stored password in db (user.password)
        const isPasswordMatch = await bcrypt.compare(password, user.password); // compare the password jeta ami debo with the User model e je password stored ache
        if(!isPasswordMatch){
            return res.status(400).json({
                success:false,
                message:"Incorrect email or password"
            });
        }
        generateToken(res, user, `Welcome back ${user.name}`);  //by generate token function(see /utils/generateToken.js) we can assure that the user is logged in within the time limit

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Failed to login"
        })
    }
}

export const logout = async (_,res) => {
    try {
        return res.status(200).cookie("token", "", {maxAge:0}).json({   // "token", "",  ekhane token empty kore dichii mane means logout hoye jachee..ar maxAge keo 0 kore dichii
            message:"Logged out successfully.",
            success:true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Failed to logout"
        }) 
    }
}
export const getUserProfile = async (req,res) => {
    try {  //user er profile tokhon e dekhte pabo jokhon user logged in thakbe for checking this we make a middlewar(isAuthenticated.js)
        const userId = req.id; //amra isAuthenticate korar somoy req.id te user-id store korechilam seta userId te store korlam..so jodi user loggedin(authenticate) hoy tobei userId pabo that's the work of middlewar
        const user = await User.findById(userId).select("-password").populate("enrolledCourses"); //ekhane ami user er details store korchi from the User schema and amader password lagbena bole .select("-password") korechi
        if(!user){
            return res.status(404).json({
                message:"Profile not found",
                success:false
            })
        }
        return res.status(200).json({
            success:true,
            user    //we return the user details to the client 
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Failed to load user"
        })
    }
}
export const updateProfile = async (req,res) => {
    try {
        const userId = req.id;
        const {name} = req.body;
        const profilePhoto = req.file;

        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({
                message:"User not found",
                success:false
            }) 
        }
        // extract public id of the old image from the url is it exists;
        // upload new photo-> for upload photo we used thirt party library which is called cloudinary -> for setup cloudinary go utils folder -> multer.js
        if(user.photoUrl){  //if user photoUrl exist in db of a user the delete it then upload new photo
            const publicId = user.photoUrl.split("/").pop().split(".")[0]; // extract public id
            deleteMediaFromCloudinary(publicId);
        }

        const cloudResponse = await uploadMedia(profilePhoto.path);
        const photoUrl = cloudResponse.secure_url;

        const updatedData = {name, photoUrl};
        const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {new:true}).select("-password"); //user er findbyId diye userId er user er Data ke update koredebo

        return res.status(200).json({
            success:true,
            user:updatedUser,
            message:"Profile updated successfully."
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Failed to update profile"
        })
    }
}