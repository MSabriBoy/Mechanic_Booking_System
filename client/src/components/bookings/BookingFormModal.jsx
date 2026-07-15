import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

import {
  createBooking,
  updateBooking,
} from "../../api/booking.api";

import INITIAL_BOOKING_FORM from "../../constants/bookingForm";
import SERVICES from "../../constants/services";
import {
  BOOKING_STATUS_LABELS,
  getAvailableBookingStatuses,
} from "../../constants/bookingStatus";

import Button from "../common/Button";
import Modal from "../common/Modal";

const BookingFormModal = ({
  open,
  booking,
  onClose,
  onSuccess,
}) => {
  const [form, setForm] = useState(INITIAL_BOOKING_FORM);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEditMode = useMemo(
    () => Boolean(booking),
    [booking]
  );

  const availableStatuses = isEditMode
    ? getAvailableBookingStatuses(booking?.status)
    : [];

  useEffect(() => {
    if (!open) return;

    if (booking) {
      setForm({
        customerName: booking.customerName ?? "",
        customerPhone: booking.customerPhone ?? "",
        vehicleRegistration:
          booking.vehicleRegistration ?? "",
        vehicleMake: booking.vehicleMake ?? "",
        vehicleModel: booking.vehicleModel ?? "",
        serviceType: booking.serviceType ?? "",
        appointmentDate:
          booking.appointmentDate?.split("T")[0] ?? "",
        status: booking.status ?? "",
        notes: booking.notes ?? "",
      });
    } else {
      setForm(INITIAL_BOOKING_FORM);
    }

    setErrors({});
  }, [booking, open]);

  const handleChange = ({ target }) => {
    const { name, value } = target;

    setForm((previous) => ({
      ...previous,
      [name]:
        name === "vehicleRegistration"
          ? value.toUpperCase().replace(/\s+/g, "")
          : value,
    }));

    if (errors[name]) {
      setErrors((previous) => ({
        ...previous,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const validationErrors = {};

    if (!form.customerName.trim()) {
      validationErrors.customerName =
        "Customer name is required.";
    }

    if (!/^[6-9]\d{9}$/.test(form.customerPhone)) {
      validationErrors.customerPhone =
        "Enter a valid Indian mobile number.";
    }

    if (!form.vehicleRegistration.trim()) {
      validationErrors.vehicleRegistration =
        "Vehicle registration is required.";
    }

    if (!form.vehicleMake.trim()) {
      validationErrors.vehicleMake =
        "Vehicle make is required.";
    }

    if (!form.vehicleModel.trim()) {
      validationErrors.vehicleModel =
        "Vehicle model is required.";
    }

    if (!form.serviceType) {
      validationErrors.serviceType =
        "Please select a service.";
    }

    if (!form.appointmentDate) {
      validationErrors.appointmentDate =
        "Appointment date is required.";
    }

    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const payload = {
      customerName: form.customerName.trim(),
      customerPhone: form.customerPhone.trim(),
      vehicleRegistration: form.vehicleRegistration
        .trim()
        .toUpperCase()
        .replace(/\s+/g, ""),
      vehicleMake: form.vehicleMake.trim(),
      vehicleModel: form.vehicleModel.trim(),
      serviceType: form.serviceType,
      appointmentDate: form.appointmentDate,
      notes: form.notes.trim(),
    };

    if (isEditMode && form.status) {
      payload.status = form.status;
    }

    try {
      setIsSubmitting(true);

      if (isEditMode) {
        await updateBooking(booking._id, payload);

        toast.success("Booking updated successfully.");
      } else {
        await createBooking(payload);

        toast.success("Booking created successfully.");
      }

      if (onSuccess) {
        await onSuccess();
      }

      setForm(INITIAL_BOOKING_FORM);

      onClose();
    } catch (error) {
      console.error("Failed to save booking:", error);

      toast.error(
        error?.response?.data?.message ??
        "Unable to save booking. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClassName = (fieldName) =>
    `w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none transition ${errors[fieldName]
      ? "border-red-500 focus:border-red-500"
      : "border-neutral-300 focus:border-neutral-900"
    }`;

  const inputProps = (fieldName) => ({
    "aria-invalid": Boolean(errors[fieldName]),
    "aria-describedby": errors[fieldName]
      ? `${fieldName}-error`
      : undefined,
  });

  const renderError = (fieldName) =>
    errors[fieldName] ? (
      <p
        id={`${fieldName}-error`}
        className="mt-1 text-xs text-red-500"
        role="alert"
      >
        {errors[fieldName]}
      </p>
    ) : null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      size="max-w-4xl"
      title={
        isEditMode
          ? "Edit Booking"
          : "Create Booking"
      }
    >
      {/* PART 2 STARTS HERE */}
      <form
        onSubmit={handleSubmit}
        className="grid gap-5 md:grid-cols-2"
      >
        {/* Customer Name */}

        <div>
          <label
            htmlFor="customerName"
            className="mb-2 block text-sm font-medium text-neutral-700"
          >
            Customer Name
          </label>

          <input
            id="customerName"
            name="customerName"
            type="text"
            autoComplete="name"
            value={form.customerName}
            onChange={handleChange}
            className={inputClassName("customerName")}
            {...inputProps("customerName")}
          />

          {renderError("customerName")}
        </div>

        {/* Customer Phone */}

        <div>
          <label
            htmlFor="customerPhone"
            className="mb-2 block text-sm font-medium text-neutral-700"
          >
            Customer Phone
          </label>

          <input
            id="customerPhone"
            name="customerPhone"
            type="tel"
            autoComplete="tel"
            value={form.customerPhone}
            onChange={handleChange}
            className={inputClassName("customerPhone")}
            {...inputProps("customerPhone")}
          />

          {renderError("customerPhone")}
        </div>

        {/* Vehicle Registration */}

        <div>
          <label
            htmlFor="vehicleRegistration"
            className="mb-2 block text-sm font-medium text-neutral-700"
          >
            Vehicle Registration
          </label>

          <input
            id="vehicleRegistration"
            name="vehicleRegistration"
            type="text"
            value={form.vehicleRegistration}
            onChange={handleChange}
            className={inputClassName("vehicleRegistration")}
            {...inputProps("vehicleRegistration")}
          />

          {renderError("vehicleRegistration")}
        </div>

        {/* Vehicle Make */}

        <div>
          <label
            htmlFor="vehicleMake"
            className="mb-2 block text-sm font-medium text-neutral-700"
          >
            Vehicle Make
          </label>

          <input
            id="vehicleMake"
            name="vehicleMake"
            type="text"
            value={form.vehicleMake}
            onChange={handleChange}
            className={inputClassName("vehicleMake")}
            {...inputProps("vehicleMake")}
          />

          {renderError("vehicleMake")}
        </div>

        {/* Vehicle Model */}

        <div>
          <label
            htmlFor="vehicleModel"
            className="mb-2 block text-sm font-medium text-neutral-700"
          >
            Vehicle Model
          </label>

          <input
            id="vehicleModel"
            name="vehicleModel"
            type="text"
            value={form.vehicleModel}
            onChange={handleChange}
            className={inputClassName("vehicleModel")}
            {...inputProps("vehicleModel")}
          />

          {renderError("vehicleModel")}
        </div>

        {/* Service */}

        <div>
          <label
            htmlFor="serviceType"
            className="mb-2 block text-sm font-medium text-neutral-700"
          >
            Service Type
          </label>

          <select
            id="serviceType"
            name="serviceType"
            value={form.serviceType}
            onChange={handleChange}
            className={inputClassName("serviceType")}
            {...inputProps("serviceType")}
          >
            <option value="">
              Select Service
            </option>

            {SERVICES.map((service) => (
              <option
                key={service.value}
                value={service.value}
              >
                {service.label}
              </option>
            ))}
          </select>

          {renderError("serviceType")}
        </div>

        {/* Appointment Date */}

        <div>
          <label
            htmlFor="appointmentDate"
            className="mb-2 block text-sm font-medium text-neutral-700"
          >
            Appointment Date
          </label>

          <input
            id="appointmentDate"
            name="appointmentDate"
            type="date"
            min={new Date().toISOString().split("T")[0]}
            value={form.appointmentDate}
            onChange={handleChange}
            className={inputClassName("appointmentDate")}
            {...inputProps("appointmentDate")}
          />

          {renderError("appointmentDate")}
        </div>

        {isEditMode && (
          <div>
            <label
              htmlFor="status"
              className="mb-2 block text-sm font-medium text-neutral-700"
            >
              Booking Status
            </label>

            <select
              id="status"
              name="status"
              value={form.status}
              onChange={handleChange}
              disabled={availableStatuses.length <= 1}
              className={`${inputClassName("status")} disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-500`}
              {...inputProps("status")}

            >
              {availableStatuses.map((status) => (
                <option
                  key={status}
                  value={status}
                >
                  {BOOKING_STATUS_LABELS[status] ?? status}
                </option>
              ))}
            </select>

            {renderError("status")}

            {availableStatuses.length === 1 && (
              <p className="mt-2 text-xs text-neutral-500">
                This booking has reached a final status and cannot be moved
                to another stage.
              </p>
            )}
          </div>
        )}

        {/* Notes */}

        <div className="md:col-span-2">
          <label
            htmlFor="notes"
            className="mb-2 block text-sm font-medium text-neutral-700"
          >
            Notes
          </label>

          <textarea
            id="notes"
            name="notes"
            rows={5}
            value={form.notes}
            onChange={handleChange}
            className={`${inputClassName("notes")} min-h-32 resize-y`}
            {...inputProps("notes")}
          />
        </div>

        {/* Footer */}

        <div className="flex flex-col-reverse gap-3 border-t border-neutral-200 pt-6 md:col-span-2 md:flex-row md:justify-end">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Saving..."
              : isEditMode
                ? "Update Booking"
                : "Create Booking"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default BookingFormModal;