import jwt from "jsonwebtoken";
import config from "../config/config.js";
export function generateToken(userid) {
  const accessToken = jwt.sign({ id: userid }, config.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign({ id: userid }, config.REFRESH_TOKEN_SECRET, {
    expiresIn: "15m",
  });
  return { accessToken, refreshToken };
}

export function verifyAccessToken(token) {
  const decode = jwt.verify(token, config.ACCESS_TOKEN_SECRET);
  return decode;
}
export function verifyRefreshToken(token){
    const decode = jwt.verify(token,config.REFRESH_TOKEN_SECRET)
    return decode
}