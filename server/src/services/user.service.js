import User from "../models/User.js";
import ApiError from "../utils/ApiError.js";

import { ROLES } from "../constants/roles.js";

const escapeRegex = (value) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const createUser = async ({ name, email, password, role }) => {
  const normalizedEmail = email.toLowerCase().trim();

  const existingUser = await User.findOne({
    email: normalizedEmail,
  });

  if (existingUser) {
    throw new ApiError(409, "An account with this email already exists.");
  }

  if (role === ROLES.ADMIN) {
    throw new ApiError(403, "Admin accounts cannot be created.");
  }

  const user = await User.create({
    name,
    email: normalizedEmail,
    password,
    role,
  });

  return user;
};

const getUsers = async ({
  search,
  role,
  isActive,
  page = 1,
  limit = 10,
}) => {
  page = Number(page);
  limit = Number(limit);

  if (isActive !== undefined) {
    isActive = isActive === true || isActive === "true";
  }

  const filter = {};

  if (search) {
    const safeSearch = escapeRegex(search);

    filter.$or = [
      { name: { $regex: safeSearch, $options: "i" } },
      { email: { $regex: safeSearch, $options: "i" } },
    ];
  }

  if (role) {
    filter.role = role;
  }

  if (typeof isActive === "boolean") {
    filter.isActive = isActive;
  }

  const skip = (page - 1) * limit;

  const [users, total] = await Promise.all([
    User.find(filter)
      .select("name email role isActive createdAt updatedAt")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),

    User.countDocuments(filter),  
  ]);

  return {
    users,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasNextPage: page * limit < total,
      hasPreviousPage: page > 1,
    },
  };
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

const deleteUser = async (userId, requestingUserId) => {
  if (userId === requestingUserId.toString()) {
    throw new ApiError(400, "You cannot delete your own account.");
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  if (user.role === ROLES.ADMIN) {
  throw new ApiError(403, "Admin accounts cannot be deleted.");
}

 const deletedUserName = user.toObject();

  await user.deleteOne();

  return user;
};

export { createUser, getUsers, updateUserRole, updateUserStatus, deleteUser};