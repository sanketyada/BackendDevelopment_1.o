import userModel from "../model/user.model.js";
import bcrypt from "bcrypt";
import {
  generateToken,
  verifyAccessToken,
  verifyRefreshToken,
} from "../utils/auth.js";

async function registerUser(req, res) {
  const { username, email, password } = req.body;

  const userExist = await userModel.findOne({ email });
  if (userExist) {
    return res.status(409).json({
      message: "User Already Exist.",
      error: {},
    });
  }

  const user = await userModel.create({
    username,
    email,
    passwordHash: await bcrypt.hash(password, 10),
  });
  const { accessToken, refreshToken } = generateToken(user._id);
  user.refreshToken = refreshToken;
  user.save();

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
  });

  res.status(201).json({
    success: true,
    message: "User Created Succe_sfully",
    data: {
      username: user.username,
      email: user.email,
    },
    accessToken,
  });
}

async function userDetail(req, res) {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.send(401).json({
      success: false,
      message: "Token does not Exist.",
    });
  }
  const decode = verifyAccessToken(token);

  const user = await userModel.findOne({ _id: decode.id });
  res.status(201).json({
    success: true,
    message: "User Found.",
    data: {
      username: user.username,
      email: user.email,
    },
  });
}

async function regenerateTokens(req, res) {
  const token = req.cookies.refreshToken;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Token may be inavalid or not Found.",
    });
  }
  const decode = verifyRefreshToken(token);
  const user = await userModel.findOne({ _id: decode.id });
  if (token !== user.refreshToken) {
    user.refreshToken = null;
    return res.status(401).json({
      success: false,
      message: "Token Mismatched",
    });
  }
  const { accessToken, refreshToken: newRefreshToken } = generateToken(
    user._id,
  );
  user.refreshToken = newRefreshToken;
  user.save();
  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
  });

  return res.status(200).json({
    success: true,
    message: "Token regenerate Successfully",
    accessToken: accessToken,
  });
}
export { registerUser, userDetail, regenerateTokens };
