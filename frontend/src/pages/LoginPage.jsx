import React, { useState, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import { Link, useNavigate } from "react-router-dom";
import { Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import AuthImagePattern from "../Components/AuthImagePattern.jsx";

const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, isLoggingIn, authUser } = useAuthStore(); // Correctly use authUser

  useEffect(() => {
    if (authUser) {
      // Redirect to dashboard if already authenticated
      navigate("/dashboard");
    }
  }, [authUser, navigate]);

  const validateForm = () => {
    if (!formData.email.trim()) return toast.error("Email Required !!");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password Required");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();
    if (success === true) login(formData); // Call login function
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-gray-900 text-white">
      {/* Left side */}
      <div className="flex flex-col justify-center items-center pt-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md space-y-4">
          {/* Logo */}
          <div className="text-center mb-4">
            <div className="flex flex-col items-center gap-3 group">
              <div className="size-12 rounded-xl bg-primary/10 p-4 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Lock className="size-8 text-primary" />
              </div>
              <h1 className="text-lg font-bold">Log In</h1>
              <p className="text-base-content/60">Access your account</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
          {/* Email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium text-white">Email</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="size-5 text-base-content/40" />
              </div>
              <input
                type="email"
                className="input input-bordered w-full pl-10 bg-gray-800 border-gray-700 text-white"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
          </div>

          {/* Password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium text-white">
                Password
              </span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="size-5 text-base-content/40" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                className="input input-bordered w-full pl-10 bg-gray-800 border-gray-700 text-white"
                placeholder="••••••••••"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="size-5 text-base-content/40" />
                ) : (
                  <Eye className="size-5 text-base-content/40" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-4">
            <button
              type="submit"
              className={`btn btn-primary w-full mt-4 ${
                isLoggingIn ? "loading" : ""
              }`}
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="size-5 animate-spin" /> Loading...
                </>
              ) : (
                "Log In"
              )}
            </button>
          </div>
        </form>

        {/* Redirect Link */}
        <div className="text-center mt-8">
          <p className="text-base-content/60">
            Don't have an account?{" "}
            <Link to="/signup" className="link link-primary">
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {/* Right side */}
      <AuthImagePattern
        title="Welcome Back!"
        subtitle="Sign in to continue your conversation and catch up with your messages."
      />
    </div>
  );
};

export default LoginPage;
