import jwt from "jsonwebtoken";

export const verifyToken = (req, res) => {
  const token = req.cookie.token;
  if(!token)
    return res.status(401).json({success: false, message: "Unauthorised: No token provided"});
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if(!decoded)
        return res.status(401).json({success: false, message: "Unauthorised: Invalid token"});
    
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log("Error in verifyToken middleware: ", error);
    return res.status(500).json({success: false, message: "Server error"});
  }
};