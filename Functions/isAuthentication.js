import { ErrorHandle } from "./ErrorHandle.js";
import jwt from 'jsonwebtoken'

const isAuthenticated = async (req, res , next) => {
  try {
    const token = req.cookies["AuthToken"];
    if (!token) {
      return ErrorHandle(401, "Pleasee Login To Access This Route", res);
    }
    const regetPass = jwt.verify(token, process.env.JWT_SECRET);

    req.id = regetPass._id;
    next();
  } catch (err) {
    console.log(err);
    ErrorHandle(500, err.message, res);
  }
};

export {isAuthenticated}