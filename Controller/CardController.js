import { ErrorHandle } from "../Functions/ErrorHandle.js";
import { Card } from "../Model/Card.js";
import { User } from "../Model/User.js";

const createItem = async (req, res) => {
  try {
    const {
      ItemName,
      Category,
      Brand,
      Description,
      AdditionalDetails,
      Price,
      Country,
      State,
      Images = [], // Default to an empty array
    } = req.body;

    if (
      !ItemName &&
      !Category &&
      !Brand &&
      !Description &&
      !AdditionalDetails &&
      !Price &&
      !Country &&
      !State &&
      !req.id &&
      Images.length === 0
    ) {
      return res.json({
        success: false,
        message: "Please fill out all fields properly!",
      });
    } else {

      const dataOfUser = await User.findById(req.id);

      const createdItem = {
        ItemName,
        Category,
        Brand,
        Description,
        AdditionalDetails,
        Price,
        Country,
        State,
        Images,
        Address: "Renu Nagar Mumbai-410310",
        userId:req.id,
        Avatar:dataOfUser.Avatar,
        Name:dataOfUser.Name
      };

      const data = await Card.create(createdItem);
      res.status(201).json({
        success: true,
        message: "Item Created !!",
        data,
      });
    }
  } catch (error) {
    ErrorHandle(500, error.message, res);
  }
};
const RecommendationsItems = async (req, res) => {
  try {
    const data = await Card.find().limit(20);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    ErrorHandle(500, error.message, res);
  }
};
const CardsGet = async (req, res) => {
  try {
    
    const data = await Card.find();

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    ErrorHandle(500, error.message, res);
  }
};

export { createItem, RecommendationsItems, CardsGet };
