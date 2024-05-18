const User = require("../models/user.models");
const ApiError = require("../utils/ApiError");
const jwt = require("jsonwebtoken");
//const User = require("../models/user.models");
const verifyToken = async (req, res, next) => {
  try {
    const { token } = req.body;
    if (!token) {
      throw new ApiError(401, "Unauthorized Access");
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decodedToken?._id).select("-password");
    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid Access Token");
  }
};
module.exports = verifyToken;
