import mongoose, { Types } from 'mongoose';
const { Schema, model } = mongoose;

const schema = new Schema({
    ItemName:{
        type:String,
        required:true
    },
    Category: {
        type: String,
        required: true,
    },
    Brand: {
        type: String,
        required: true,
    },
    Description: {
        type: String,
        required: true,
    },
    AdditionalDetails:{
        type:String,
        require:true
    },
    Price: {
        type: String,
        required: true,
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
    Images: {
        type: [String], // Array of Strings for multiple images
        default: [
            "https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png"
        ]
    },
    userId:{
        type:Types.ObjectId,
        ref:"User",
    },
    Avatar:{
        type:String,
        require:true
    },
    Name:{
        type:String,
        require:true
    },
    Date:{
        type: Date,
        default: Date.now
    }
});


export const Card = mongoose.models.Card || model("Card", schema);
