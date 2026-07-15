export const BOOKING_STATUS = Object.freeze({
  PENDING: "pending",
  CONFIRMED: "confirmed",
  IN_PROGRESS: "in_progress",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
});

export const BOOKING_STATUS_LABELS = Object.freeze({
  [BOOKING_STATUS.PENDING]: "Pending",
  [BOOKING_STATUS.CONFIRMED]: "Confirmed",
  [BOOKING_STATUS.IN_PROGRESS]: "In Progress",
  [BOOKING_STATUS.COMPLETED]: "Completed",
  [BOOKING_STATUS.CANCELLED]: "Cancelled",
});

export const ALLOWED_STATUS_TRANSITIONS = Object.freeze({
  [BOOKING_STATUS.PENDING]: [
    BOOKING_STATUS.CONFIRMED,
    BOOKING_STATUS.CANCELLED,
  ],

  [BOOKING_STATUS.CONFIRMED]: [
    BOOKING_STATUS.IN_PROGRESS,
    BOOKING_STATUS.CANCELLED,
  ],

  [BOOKING_STATUS.IN_PROGRESS]: [
    BOOKING_STATUS.COMPLETED,
    BOOKING_STATUS.CANCELLED,
  ],

  [BOOKING_STATUS.COMPLETED]: [],

  [BOOKING_STATUS.CANCELLED]: [],
});

export const getAvailableBookingStatuses = (currentStatus) => {
  if (!currentStatus) {
    return [];
  }

  return [
    currentStatus,
    ...(ALLOWED_STATUS_TRANSITIONS[currentStatus] ?? []),
  ];
};