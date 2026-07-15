import User from "../models/User.js";
import ApiError from "../utils/ApiError.js";

const getUsers = async () => {
  return User.find()
    .select("name email role isActive createdAt updatedAt")
    .sort({ createdAt: -1 })
    .lean();
};

const updateUserRole = async (userId, role, requestingUserId) => {
  if (userId === requestingUserId.toString()) {
    throw new ApiError(400, "You cannot change your own role.");
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  user.role = role;

  await user.save();

  return user;
};

const updateUserStatus = async (userId, isActive, requestingUserId) => {
  if (userId === requestingUserId.toString()) {
    throw new ApiError(400, "You cannot change your own account status.");
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  user.isActive = isActive;

  await user.save();

  return user;
};

export { getUsers, updateUserRole, updateUserStatus };