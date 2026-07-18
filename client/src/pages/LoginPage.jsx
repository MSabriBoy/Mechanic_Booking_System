import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { LoaderCircle, LogIn, Wrench } from "lucide-react";
import toast from "react-hot-toast";

import useAuth from "../hooks/useAuth.js";
import sanitizeInput from "../utils/sanitizeInput.js";

const initialFormData = {
  email: "",
  password: "",
};

const LoginPage = () => {
  const { login, isAuthenticated, isInitializing } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: sanitizeInput(value),
    }));

    if (errors[name]) {
      setErrors((previous) => ({
        ...previous,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!formData.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!formData.password) {
      nextErrors.password = "Password is required.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await login(formData);

      console.log("[Analytics] User interacted with Feature Complete CRUD");

      toast.success("Welcome back.");

      const destination = location.state?.from?.pathname || "/dashboard";
      navigate(destination, { replace: true });
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Unable to sign in. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isInitializing) {
    return null;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-100 px-4 py-8">
      <section
        className="w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm"
        aria-labelledby="login-heading"
      >
        <div className="mb-8">
          <div
            className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-900 text-white"
            aria-hidden="true"
          >
            <Wrench size={22} />
          </div>

          <h1
            id="login-heading"
            className="text-2xl font-semibold tracking-tight text-neutral-950"
          >
            Welcome back
          </h1>

          <p className="mt-2 text-sm leading-6 text-neutral-600">
            Sign in to manage workshop bookings and operations.
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-neutral-800"
              >
                Email address
              </label>

              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={`w-full rounded-lg border px-4 py-3 text-sm text-neutral-950 outline-none transition focus:ring-2 focus:ring-neutral-900/20 ${errors.email
                    ? "border-red-500"
                    : "border-neutral-300 focus:border-neutral-900"
                  }`}
                placeholder="you@example.com"
              />

              {errors.email && (
                <p
                  id="email-error"
                  className="mt-2 text-sm text-red-600"
                  role="alert"
                >
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-neutral-800"
              >
                Password
              </label>

              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                aria-invalid={Boolean(errors.password)}
                aria-describedby={
                  errors.password ? "password-error" : undefined
                }
                className={`w-full rounded-lg border px-4 py-3 text-sm text-neutral-950 outline-none transition focus:ring-2 focus:ring-neutral-900/20 ${errors.password
                    ? "border-red-500"
                    : "border-neutral-300 focus:border-neutral-900"
                  }`}
                placeholder="Enter your password"
              />

              {errors.password && (
                <p
                  id="password-error"
                  className="mt-2 text-sm text-red-600"
                  role="alert"
                >
                  {errors.password}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              aria-label={
                isSubmitting ? "Signing in, please wait" : "Sign in"
              }
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-neutral-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <LoaderCircle
                    className="animate-spin"
                    size={18}
                    aria-hidden="true"
                  />
                  Signing in...
                </>
              ) : (
                <>
                  <LogIn size={18} aria-hidden="true" />
                  Sign in
                </>
              )}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default LoginPage;