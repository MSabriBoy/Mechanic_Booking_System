import asyncHandler from "../utils/asyncHandler.js";
import {
  createUser,
  getUsers,
  updateUserRole,
  updateUserStatus,
  deleteUser,
} from "../services/user.service.js";

const create = asyncHandler(async (req, res) => {
  const user = await createUser(req.body);

  console.log("[Analytics] Admin created a user.");

  res.status(201).json({
    success: true,
    message: "User created successfully.",
    data: {
      user,
    },
  });
});

const getAll = asyncHandler(async (req, res) => {
   console.log("Controller req.query:", req.query);
const result = await getUsers(req.query);

  res.status(200).json({
    success: true,
    message:
      result.users.length > 0
        ? "Users retrieved successfully."
        : "No data found.",
    data: result,
  });
});

const updateRole = asyncHandler(async (req, res) => {
  const user = await updateUserRole(
    req.params.userId,
    req.body.role,
    req.user._id
  );

  console.log("[Analytics] Admin updated a user role.");

  res.status(200).json({
    success: true,
    message: "User role updated successfully.",
    data: {
      user,
    },
  });
});

const updateStatus = asyncHandler(async (req, res) => {
  const user = await updateUserStatus(
    req.params.userId,
    req.body.isActive,
    req.user._id
  );

  console.log("[Analytics] Admin updated a user account status.");

  res.status(200).json({
    success: true,
    message: "User account status updated successfully.",
    data: {
      user,
    },
  });
});

const remove = asyncHandler(async (req, res) => {
  await deleteUser(req.params.userId, req.user._id);

  console.log("[Analytics] Admin deleted a user.");

  res.status(200).json({
    success: true,
    message: `"${deletedUserName}" deleted successfully.`,
  });
});

export { create, getAll, updateRole, updateStatus, remove };