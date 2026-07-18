import express from "express";

import {
  create,
  getAll,
  updateRole,
  updateStatus,
  remove,
} from "../controllers/user.controller.js";

import { protect, authorize } from "../middleware/auth.middleware.js";
import { ROLES } from "../constants/roles.js";

import {
  userIdValidator,
  createUserValidator,
  updateRoleValidator,
  updateStatusValidator,
  userQueryValidator,
} from "../validators/user.validator.js";

const router = express.Router();

router.use(protect);

router
  .route("/")
  .get(
    authorize(ROLES.ADMIN, ROLES.MANAGER),
    userQueryValidator,
    getAll
  )
  .post(
    authorize(ROLES.ADMIN),
    createUserValidator,
    create
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

router.delete(
  "/:userId",
  authorize(ROLES.ADMIN),
  userIdValidator,
  remove
);

export default router;