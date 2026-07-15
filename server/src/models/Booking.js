import mongoose from "mongoose";

import {
  BOOKING_STATUS,
  BOOKING_STATUS_VALUES,
  SERVICE_TYPE_VALUES,
} from "../constants/booking.js";

const bookingSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: [true, "Customer name is required."],
      trim: true,
      minlength: [2, "Customer name must be at least 2 characters long."],
      maxlength: [80, "Customer name cannot exceed 80 characters."],
    },

    customerPhone: {
      type: String,
      required: [true, "Customer phone number is required."],
      trim: true,
      match: [
        /^[6-9]\d{9}$/,
        "Please provide a valid 10-digit Indian mobile number.",
      ],
    },

    vehicleRegistration: {
      type: String,
      required: [true, "Vehicle registration number is required."],
      trim: true,
      uppercase: true,
      maxlength: [20, "Vehicle registration number cannot exceed 20 characters."],
    },

    vehicleMake: {
      type: String,
      required: [true, "Vehicle make is required."],
      trim: true,
      maxlength: [50, "Vehicle make cannot exceed 50 characters."],
    },

    vehicleModel: {
      type: String,
      required: [true, "Vehicle model is required."],
      trim: true,
      maxlength: [50, "Vehicle model cannot exceed 50 characters."],
    },

    serviceType: {
      type: String,
      required: [true, "Service type is required."],
      enum: {
        values: SERVICE_TYPE_VALUES,
        message: "Invalid service type.",
      },
    },

    appointmentDate: {
      type: Date,
      required: [true, "Appointment date is required."],
    },

    status: {
      type: String,
      enum: {
        values: BOOKING_STATUS_VALUES,
        message: "Invalid booking status.",
      },
      default: BOOKING_STATUS.PENDING,
    },

    notes: {
      type: String,
      trim: true,
      maxlength: [500, "Notes cannot exceed 500 characters."],
      default: "",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Booking creator is required."],
      immutable: true,
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

bookingSchema.index({ appointmentDate: 1 });
bookingSchema.index({ status: 1 });
bookingSchema.index({ vehicleRegistration: 1 });
bookingSchema.index({ createdBy: 1 });

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;