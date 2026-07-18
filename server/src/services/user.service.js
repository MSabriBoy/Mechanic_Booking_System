import User from "../models/User.js";
import ApiError from "../utils/ApiError.js";

const escapeRegex = (value) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

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

export { getUsers, updateUserRole, updateUserStatus };