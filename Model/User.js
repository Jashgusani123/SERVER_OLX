import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
const { Schema, model } = mongoose;
const {hash} = bcrypt;

const schema = new Schema({
    Name:{
        type:String,
        require:true
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    Email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    Address:{
        type:String,
        required:true
    },
    Country:{
        type:String,
        required:true
    },
    State:{
        type:String,
        required:true
    },
    Avatar:{
        type:String,
        default:"https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png"
    },
});
schema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await hash(this.password, 10);
    next(); // Call next() to proceed
});

export const User = mongoose.models.User || model("User", schema);
