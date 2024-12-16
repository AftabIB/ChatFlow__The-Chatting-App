import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  //check whether there is token or not
  try {
    const token = req.cookies.jwt;

    //no token found
    if (!token)
      return res
        .status(401)
        .json({ message: "Unauthorized- No Token Provided" });

    //token found => grab the token from cookie use: cookie parser

    //then decode the token and grab the userID
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decoded)
      return res.status(401).json({ message: "Unauthorized- Invalid Token" });

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) return res.status(404).json({ message: "User not Found" });

    //user is authenticated
    req.user = user;

    next();
  } catch (error) {
    console.log("Error in protectRoute middleware: ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
