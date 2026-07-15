const BOOKING_STATUS = Object.freeze({
  PENDING: "pending",
  CONFIRMED: "confirmed",
  IN_PROGRESS: "in_progress",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
});

const BOOKING_STATUS_VALUES = Object.freeze(Object.values(BOOKING_STATUS));

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

const SERVICE_TYPE_VALUES = Object.freeze(Object.values(SERVICE_TYPES));

export {
  BOOKING_STATUS,
  BOOKING_STATUS_VALUES,
  SERVICE_TYPES,
  SERVICE_TYPE_VALUES,
};