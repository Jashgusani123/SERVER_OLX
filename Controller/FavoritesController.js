import { ErrorHandle } from "../Functions/ErrorHandle.js";
import { Card } from "../Model/Card.js";
import { Favorites } from "../Model/Favorites.js";

const createFavorite = async (req, res) => {
  try {
    const { CardId } = req.body;

    if (!CardId) {
      return ErrorHandle(404, "Server Not get CardId..", res);
    }

    const data = await Card.findById({ _id: CardId });
    if (!data) {
      return ErrorHandle(404, "CardId id Invailid..", res);
    }
    const createFavorite = await Favorites.create({
      Images: data.Images,
      Price: data.Price,
      Description: data.Description,
      Address: data.Address,
      Country: data.Country,
      State: data.State,
      userId: req.id,
      ModelId:CardId
    });

    res.status(200).json({
      success: true,
      message: `${data.ItemName} Add in Favorite !!`,
      createFavorite,
    });
  } catch (error) {
    ErrorHandle(500, error.message, res);
  }
};
const removeFromFavorite = async (req, res) => {
  try {
    const { CardId } = req.body;

    await Favorites.findByIdAndDelete({ _id: CardId });
    res.status(200).json({
      success: true,
      message: "Deleted!!",
    });
  } catch (error) {
    ErrorHandle(500, error.message, res);
  }
};
const GetAllUserFavorite = async(req ,res)=>{
  try{const Favorite = await Favorites.find({userId:req.id})
  res.status(200).json({
    success:true,
    favorite:Favorite
  })}catch(error){
    ErrorHandle(500 , error.message , res)
  }
}
const viewdetails = async(req , res)=>{
  const{ModelId}=req.body;
  const data = await Card.find({_id:ModelId});
  res.status(200).json({
    success:true,
    data
  })
}
export { createFavorite, removeFromFavorite , GetAllUserFavorite ,viewdetails};
