import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

import {
    createUser,
    updateUserRole,
    updateUserStatus,
} from "../../api/user.api";

import ROLES from "../../constants/roles";
import INITIAL_USER_FORM from "../../constants/userForm";

import Button from "../common/Button";
import Modal from "../common/Modal";

const UserFormModal = ({
    open,
    user,
    onClose,
    onSuccess,
}) => {

    const [form, setForm] = useState(INITIAL_USER_FORM);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const isEditMode = useMemo(
        () => Boolean(user),
        [user]
    );

    useEffect(() => {
        if (!open) return;

        if (user) {
            setForm({
                name: user.name ?? "",
                email: user.email ?? "",
                password: "",
                role: user.role ?? ROLES.STAFF,
                isActive: user.isActive,
            });
        } else {
            setForm(INITIAL_USER_FORM);
        }

        setErrors({});
    }, [user, open]);

    const handleChange = ({ target }) => {
        const { name, value, type, checked } = target;

        setForm((previous) => ({
            ...previous,
            [name]:
                name === "isActive"
                    ? value === "true"
                    : type === "checkbox"
                        ? checked
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

        if (!isEditMode) {
            if (!form.name.trim()) {
                validationErrors.name =
                    "Name is required.";
            }

            if (!form.email.trim()) {
                validationErrors.email =
                    "Email is required.";
            } else if (
                !/^\S+@\S+\.\S+$/.test(form.email)
            ) {
                validationErrors.email =
                    "Enter a valid email.";
            }

            if (!form.password.trim()) {
                validationErrors.password =
                    "Password is required.";
            } else if (form.password.trim().length < 8) {
                validationErrors.password =
                    "Password must be at least 8 characters.";
            }
        }

        if (!form.role) {
            validationErrors.role =
                "Role is required.";
        }

        setErrors(validationErrors);

        return Object.keys(validationErrors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            setIsSubmitting(true);

            if (isEditMode) {
                const requests = [];

                if (form.role !== user.role) {
                    requests.push(
                        updateUserRole(user._id, {
                            role: form.role,
                        })
                    );
                }

                if (form.isActive !== user.isActive) {
                    requests.push(
                        updateUserStatus(user._id, {
                            isActive: form.isActive,
                        })
                    );
                }

                if (requests.length) {
                    await Promise.all(requests);

                    toast.success("User updated successfully.");
                } else {
                    toast("No changes detected.");
                }
            } else {
                await createUser({
                    name: form.name.trim(),
                    email: form.email.trim().toLowerCase(),
                    password: form.password.trim(),
                    role: form.role,
                });

                toast.success("User created successfully.");
            }

            if (onSuccess) {
                await onSuccess();
            }

            setForm(INITIAL_USER_FORM);

            onClose();
        } catch (error) {
            console.error(
                "Failed to save user:",
                error
            );

            toast.error(
                error?.response?.data?.message ??
                "Unable to save user. Please try again."
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
            onClose={
                isSubmitting
                    ? undefined
                    : onClose
            }
            size="max-w-2xl"
            title={
                isEditMode
                    ? "Edit User"
                    : "Create User"
            }
        >
            <form
                onSubmit={handleSubmit}
                className="grid gap-5 md:grid-cols-2"
            >
                {!isEditMode && (
                    <>
                        <div>
                            <label
                                htmlFor="name"
                                className="mb-2 block text-sm font-medium text-neutral-700"
                            >
                                Full Name
                            </label>

                            <input
                                id="name"
                                name="name"
                                type="text"
                                autoComplete="name"
                                value={form.name}
                                onChange={handleChange}
                                className={inputClassName("name")}
                                {...inputProps("name")}
                            />

                            {renderError("name")}
                        </div>

                        <div>
                            <label
                                htmlFor="email"
                                className="mb-2 block text-sm font-medium text-neutral-700"
                            >
                                Email
                            </label>

                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                value={form.email}
                                onChange={handleChange}
                                className={inputClassName("email")}
                                {...inputProps("email")}
                            />

                            {renderError("email")}
                        </div>

                        <div className="md:col-span-2">
                            <label
                                htmlFor="password"
                                className="mb-2 block text-sm font-medium text-neutral-700"
                            >
                                Password
                            </label>

                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                value={form.password}
                                onChange={handleChange}
                                className={inputClassName("password")}
                                {...inputProps("password")}
                            />

                            {renderError("password")}
                        </div>
                    </>
                )}

                {isEditMode && (
                    <>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-neutral-700">
                                Full Name
                            </label>

                            <input
                                type="text"
                                value={form.name}
                                readOnly
                                className="w-full rounded-xl border border-neutral-200 bg-neutral-100 px-4 py-3 text-sm text-neutral-600"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-neutral-700">
                                Email
                            </label>

                            <input
                                type="email"
                                value={form.email}
                                readOnly
                                className="w-full rounded-xl border border-neutral-200 bg-neutral-100 px-4 py-3 text-sm text-neutral-600"
                            />
                        </div>
                    </>
                )}

                <div>
                    <label
                        htmlFor="role"
                        className="mb-2 block text-sm font-medium text-neutral-700"
                    >
                        Role
                    </label>

                    <select
                        id="role"
                        name="role"
                        value={form.role}
                        onChange={handleChange}
                        className={inputClassName("role")}
                        {...inputProps("role")}
                    >
                        {Object.values(ROLES).map((role) => (
                            <option
                                key={role}
                                value={role}
                            >
                                {role.charAt(0).toUpperCase() + role.slice(1)}
                            </option>
                        ))}

                    </select>

                    {renderError("role")}
                </div>

                {isEditMode && (
                    <div>
                        <label
                            htmlFor="isActive"
                            className="mb-2 block text-sm font-medium text-neutral-700"
                        >
                            Account Status
                        </label>

                        <select
                            id="isActive"
                            name="isActive"
                            value={String(form.isActive)}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-neutral-900"
                        >
                            <option value="true">
                                Active
                            </option>

                            <option value="false">
                                Inactive
                            </option>
                        </select>
                    </div>
                )}

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
                                ? "Update User"
                                : "Create User"}
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default UserFormModal;