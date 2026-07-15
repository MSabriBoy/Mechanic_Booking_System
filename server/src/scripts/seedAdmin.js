import mongoose from "mongoose";

import connectDB from "../config/db.js";
import env from "../config/env.js";
import User from "../models/User.js";
import { ROLES } from "../constants/roles.js";

const seedAdmin = async () => {
  try {
    if (!env.adminName || !env.adminEmail || !env.adminPassword) {
      throw new Error(
        "ADMIN_NAME, ADMIN_EMAIL, and ADMIN_PASSWORD are required to seed the admin account."
      );
    }

    await connectDB();

    const normalizedEmail = env.adminEmail.toLowerCase().trim();

    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      if (existingUser.role === ROLES.ADMIN) {
        console.log("Admin account already exists.");
        return;
      }

      throw new Error(
        "A non-admin user already exists with the configured admin email."
      );
    }

    await User.create({
      name: env.adminName,
      email: normalizedEmail,
      password: env.adminPassword,
      role: ROLES.ADMIN,
    });

    console.log("Admin account created successfully.");
  } catch (error) {
    console.error(`Admin seed failed: ${error.message}`);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
};

seedAdmin();