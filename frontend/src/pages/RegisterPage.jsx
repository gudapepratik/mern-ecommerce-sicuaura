import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import authServices from "../api/services/auth.services";

function RegisterPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.email) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(formData.email))
            newErrors.email = "Email is invalid";

        if (!formData.password) newErrors.password = "Password is required";
        else if (formData.password.length < 6)
            newErrors.password = "Password must be at least 6 characters";

        if (!formData.confirmPassword)
            newErrors.confirmPassword = "Please confirm your password";
        else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        // Prevent default form submission
        // to avoid page reload
        e.preventDefault();
        setIsLoading(true);

        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setIsLoading(false);
            return;
        }

        try {
            // 1. call the api to create a new account
            await authServices.registerUser(formData)

            // 2. notify the user that account is created
            alert("Account created successfully! Redirecting to login...");

            // 3. navigate to the login page after a timeout of 2 sec
            setTimeout(() => {
                navigate("/login");
            }, 2000);

        } catch (error) {
            console.error("Error creating account:", error);
            // Handle error (alert the user)
            alert("Error creating account: " + error.message);
        } finally{
            setIsLoading(false)
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full">
                <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                    {/* Header */}
                    <div className="px-6 py-8 text-center border-b border-gray-200">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            Create Account
                        </h2>
                        <p className="text-gray-600">
                            Join us today and start your shopping journey
                        </p>
                    </div>

                    {/* Form */}
                    <div className="px-6 py-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Name Field */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Full Name
                                    <span className="text-red-500 ml-1">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Enter your full name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors outline-none ${
                                        errors.name
                                            ? "border-red-500"
                                            : "border-gray-300"
                                    }`}
                                    required
                                />
                                {errors.name && (
                                    <p className="text-sm text-red-600">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            {/* Email Field */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Email Address
                                    <span className="text-red-500 ml-1">*</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors outline-none ${
                                        errors.email
                                            ? "border-red-500"
                                            : "border-gray-300"
                                    }`}
                                    required
                                />
                                {errors.email && (
                                    <p className="text-sm text-red-600">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            {/* Password Field */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Password
                                    <span className="text-red-500 ml-1">*</span>
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Create a password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors outline-none ${
                                        errors.password
                                            ? "border-red-500"
                                            : "border-gray-300"
                                    }`}
                                    required
                                />
                                {errors.password && (
                                    <p className="text-sm text-red-600">
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            {/* Confirm Password Field */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Confirm Password
                                    <span className="text-red-500 ml-1">*</span>
                                </label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm your password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors outline-none ${
                                        errors.confirmPassword
                                            ? "border-red-500"
                                            : "border-gray-300"
                                    }`}
                                    required
                                />
                                {errors.confirmPassword && (
                                    <p className="text-sm text-red-600">
                                        {errors.confirmPassword}
                                    </p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full bg-rose-500 hover:bg-rose-600 text-white py-3 px-4 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                        Creating Account...
                                    </div>
                                ) : (
                                    "Create Account"
                                )}
                            </button>
                        </form>

                        {/* Sign In Link */}
                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-600">
                                Already have an account?{" "}
                                <NavLink
                                    to="/login"
                                    className="text-blue-600 hover:text-blue-500 font-medium transition-colors"
                                >
                                    Sign in here
                                </NavLink>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
