import { SendCookie } from "../Functions/SendCookie.js";
import { User } from "../Model/User.js";
import { ErrorHandle } from "../Functions/ErrorHandle.js";
import bcrypt from "bcryptjs";
const { compare } = bcrypt;

const signup = async (req, res) => {
  const { Name, username, Email, password, Address, Country, State, Avatar } =
    req.body;

  const createUser = await User.create({
    Name,
    username,
    Email,
    password,
    Address,
    Country,
    State,
    Avatar,
  });
  SendCookie(res, createUser, 201, "User Created Successfully");

};

const login = async (req, res) => {
  try {
    const { Email, password } = req.body;

    const user = await User.findOne({ Email }).select("+password");
    if (!user) {
      return ErrorHandle(404, "Invalid Email OR Password", res);
    }

    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      return ErrorHandle(404, "Invalid Email OR Password", res);
    }
    SendCookie(res, user, 200, `WellCome Back ${user.Name}`);
  } catch (err) {
    ErrorHandle(500 , err.message , res)
} 
};

const getDetails = async(req , res)=>{
 const user = await User.findById({_id:req.id})
 res.status(200).json({
  success:true,
  user
 })
};

const UpdateDetails = async (req, res) => {
  try {
    const { ...fieldsToUpdate } = req.body;
    

    if (!req.id || Object.keys(fieldsToUpdate).length === 0) {
      return res.status(400).json({ message: "Invalid data provided." });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.id,
      { $set: fieldsToUpdate }, // Dynamically set fields based on request body
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({
      message: "User details updated successfully.",
      user: updatedUser,
    });
  } catch (error) {
      ErrorHandle(500 , error.message , res);
    
  }
};

const logout = async(req ,res)=>{
  const cookieOptions = {
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
    sameSite: "None",
    httpOnly: true,
    secure: true, // Use secure cookies in production
  };
  try {
    return res
      .status(200)
      .cookie("AuthToken", "", { ...cookieOptions, maxAge: 0 })
      .json({
        success: true,
        message: "Logged out Successfully",
      });
  } catch (err) {
    ErrorHandle(500 , err.message , res)
  }
}


export {signup , login , getDetails , UpdateDetails , logout};
