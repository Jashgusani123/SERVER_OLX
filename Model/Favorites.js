import mongoose from 'mongoose';
const { Schema, model , Types} = mongoose;

const schema = new Schema({
    Images: {
        type: [String], // Array of Strings for multiple images
        default: [
            "https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png"
        ]
    },
    Price: {
        type: String,
        required: true,
    },
    Description: {
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
    userId:{
        type:Types.ObjectId,
        ref:"User"
    },
    ModelId:{
        type:Types.ObjectId,
        ref:"Card"
    },
    Date:{
        type: Date,
        default: Date.now
    }
});


export const Favorites = mongoose.models.Favorites || model("Favorites", schema);
