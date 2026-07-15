import asyncHandler from "../utils/asyncHandler.js";
import generateToken from "../utils/generateToken.js";
import {
  registerUser,
  authenticateUser,
} from "../services/auth.service.js";

const formatUserResponse = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
});

const register = asyncHandler(async (req, res) => {
  const user = await registerUser(req.body);
  const token = generateToken(user._id);

  console.log("[Analytics] User completed account registration.");

  res.status(201).json({
    success: true,
    message: "Account created successfully.",
    data: {
      user: formatUserResponse(user),
      token,
    },
  });
});

const login = asyncHandler(async (req, res) => {
  const user = await authenticateUser(req.body);
  const token = generateToken(user._id);

  console.log("[Analytics] User completed login.");

  res.status(200).json({
    success: true,
    message: "Login successful.",
    data: {
      user: formatUserResponse(user),
      token,
    },
  });
});

const getMe = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Current user retrieved successfully.",
    data: {
      user: formatUserResponse(req.user),
    },
  });
});

export { register, login, getMe };