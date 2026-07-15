import express from "express";

import {
  getAll,
  updateRole,
  updateStatus,
} from "../controllers/user.controller.js";

import { protect, authorize } from "../middleware/auth.middleware.js";
import { ROLES } from "../constants/roles.js";

import {
  userIdValidator,
  updateRoleValidator,
  updateStatusValidator,
} from "../validators/user.validator.js";

const router = express.Router();

router.use(protect);

router.get(
  "/",
  authorize(ROLES.ADMIN, ROLES.MANAGER),
  getAll
);

router.patch(
  "/:userId/role",
  authorize(ROLES.ADMIN),
  userIdValidator,
  updateRoleValidator,
  updateRole
);

router.patch(
  "/:userId/status",
  authorize(ROLES.ADMIN),
  userIdValidator,
  updateStatusValidator,
  updateStatus
);

export default router;