import jwt from 'jsonwebtoken'


const SendCookie = (res, user, code, message) => {
    const cookieOptions = {
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
        sameSite: "None",
        httpOnly: true,
        secure: true, // Use secure cookies in production
      };
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    
    return res.status(code).cookie("AuthToken", token, cookieOptions).json({
      success: true,
      message,
      user,
    });
  };

  export {SendCookie}