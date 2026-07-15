const BOOKING_STATUS = Object.freeze({
  PENDING: "pending",
  CONFIRMED: "confirmed",
  IN_PROGRESS: "in_progress",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
});

const SERVICE_TYPES = Object.freeze({
  GENERAL_SERVICE: "general_service",
  OIL_CHANGE: "oil_change",
  BRAKE_SERVICE: "brake_service",
  ENGINE_REPAIR: "engine_repair",
  TYRE_SERVICE: "tyre_service",
  BATTERY_SERVICE: "battery_service",
  AC_SERVICE: "ac_service",
  OTHER: "other",
});

const BOOKING_STATUS_OPTIONS = [
  { value: BOOKING_STATUS.PENDING, label: "Pending" },
  { value: BOOKING_STATUS.CONFIRMED, label: "Confirmed" },
  { value: BOOKING_STATUS.IN_PROGRESS, label: "In Progress" },
  { value: BOOKING_STATUS.COMPLETED, label: "Completed" },
  { value: BOOKING_STATUS.CANCELLED, label: "Cancelled" },
];

const SERVICE_TYPE_OPTIONS = [
  { value: SERVICE_TYPES.GENERAL_SERVICE, label: "General Service" },
  { value: SERVICE_TYPES.OIL_CHANGE, label: "Oil Change" },
  { value: SERVICE_TYPES.BRAKE_SERVICE, label: "Brake Service" },
  { value: SERVICE_TYPES.ENGINE_REPAIR, label: "Engine Repair" },
  { value: SERVICE_TYPES.TYRE_SERVICE, label: "Tyre Service" },
  { value: SERVICE_TYPES.BATTERY_SERVICE, label: "Battery Service" },
  { value: SERVICE_TYPES.AC_SERVICE, label: "AC Service" },
  { value: SERVICE_TYPES.OTHER, label: "Other" },
];

export {
  BOOKING_STATUS,
  SERVICE_TYPES,
  BOOKING_STATUS_OPTIONS,
  SERVICE_TYPE_OPTIONS,
};