import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (res, userId) => {
  const token = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: '7d'});

  res.cookie("token", token, {
    httpOnly: true, // protects against XSS
    secure: process.env.NODE_ENV === "production", // set secure flag in production
    sameSite: "strict", // protects against CSRF attacks
    maxAge: 7*24*60*60*1000 // 7 days
  });

  return token;
}