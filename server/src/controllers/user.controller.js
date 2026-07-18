import asyncHandler from "../utils/asyncHandler.js";
import {
  getUsers,
  updateUserRole,
  updateUserStatus,
} from "../services/user.service.js";

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

export { getAll, updateRole, updateStatus };