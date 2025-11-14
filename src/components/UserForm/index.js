"use client";
import { useState, useEffect } from "react";

export default function UserForm({ onSubmit, initialData }) {
  const [form, setForm] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    age: "",
    dob: "",
    address: "",
    gender: "",
    profession: [],
    hobbies: "",
  });

  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState({ message: "", type: "" });

  // Prefill if editing
  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  // Auto-hide toast
  useEffect(() => {
    if (toast.message) {
      const timer = setTimeout(() => setToast({ message: "", type: "" }), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "profession") {
      setForm((prev) => {
        const newProf = checked
          ? [...prev.profession, value]
          : prev.profession.filter((p) => p !== value);
        return { ...prev, profession: newProf };
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const validate = () => {
    let newErrors = {};

    if (!form.username.trim()) newErrors.username = "Username is required";
    if (!form.firstName.trim()) newErrors.firstName = "First name is required";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Enter a valid email address";
    if (form.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!/^\d{10,11}$/.test(form.phone))
      newErrors.phone = "Enter a valid phone number (10–11 digits)";
    if (!form.age || form.age <= 0) newErrors.age = "Please enter a valid age";
    if (!form.dob) newErrors.dob = "Date of birth is required";
    if (!form.address) newErrors.address = "Please select your address";
    if (!form.gender) newErrors.gender = "Please select gender";
    if (form.profession.length === 0)
      newErrors.profession = "Select at least one profession";
    if (!form.hobbies) newErrors.hobbies = "Select one hobby";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(form);
      setToast({ message: "✅ User data submitted successfully!", type: "success" });
      setForm({
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        age: "",
        dob: "",
        address: "",
        gender: "",
        profession: [],
        hobbies: "",
      });
      setErrors({});
    } else {
      setToast({ message: "⚠️ Please fix the highlighted fields.", type: "error" });
    }
  };

  const errorClass = (field) =>
    errors[field]
      ? "border-red-500 focus:ring-red-300"
      : "border-gray-300 focus:ring-blue-300";

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* ✅ Toast Notification */}
      {toast.message && (
        <div
          className={`fixed top-6 right-6 px-4 py-3 rounded-lg shadow-lg text-white text-sm font-medium transition-all duration-300 ${
            toast.type === "success"
              ? "bg-green-600 animate-fade-in"
              : "bg-red-600 animate-fade-in"
          }`}
        >
          {toast.message}
        </div>
      )}

      {/* ✅ Centered Form */}
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="max-h-[90vh] overflow-y-auto w-full max-w-2xl p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md w-md max-w-md space-y-4 text-gray-800 dark:text-gray-100"
      >
        <h2 className="text-xl font-bold text-center text-blue-600 dark:text-blue-400">
          {initialData ? "Edit User" : "User Form"}
        </h2>

        {/* Username */}
        <div>
          <input
            name="username"
            placeholder="Username"
            className={`w-full p-3 rounded-lg border ${errorClass("username")} bg-gray-50 dark:bg-gray-700`}
            value={form.username}
            onChange={handleChange}
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">{errors.username}</p>
          )}
        </div>

        {/* First + Last Name */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <input
              name="firstName"
              placeholder="First Name"
              className={`w-full p-3 rounded-lg border ${errorClass("firstName")} bg-gray-50 dark:bg-gray-700`}
              value={form.firstName}
              onChange={handleChange}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
            )}
          </div>
          <div>
            <input
              name="lastName"
              placeholder="Last Name"
              className={`w-full p-3 rounded-lg border ${errorClass("lastName")} bg-gray-50 dark:bg-gray-700`}
              value={form.lastName}
              onChange={handleChange}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
            )}
          </div>
        </div>

        {/* Email */}
        <div>
          <input
            name="email"
            type="email"
            placeholder="Email"
            className={`w-full p-3 rounded-lg border ${errorClass("email")} bg-gray-50 dark:bg-gray-700`}
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Password + Confirm */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <input
              name="password"
              type="password"
              placeholder="Password"
              className={`w-full p-3 rounded-lg border ${errorClass("password")} bg-gray-50 dark:bg-gray-700`}
              value={form.password}
              onChange={handleChange}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          <div>
            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              className={`w-full p-3 rounded-lg border ${errorClass("confirmPassword")} bg-gray-50 dark:bg-gray-700`}
              value={form.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>
        </div>

        {/* Phone + Age */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <input
              name="phone"
              type="number"
              placeholder="Phone Number"
              className={`w-full p-3 rounded-lg border ${errorClass("phone")} bg-gray-50 dark:bg-gray-700`}
              value={form.phone}
              onChange={handleChange}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>
          <div>
            <input
              name="age"
              type="number"
              placeholder="Age"
              className={`w-full p-3 rounded-lg border ${errorClass("age")} bg-gray-50 dark:bg-gray-700`}
              value={form.age}
              onChange={handleChange}
            />
            {errors.age && (
              <p className="text-red-500 text-sm mt-1">{errors.age}</p>
            )}
          </div>
        </div>

        {/* DOB */}
        <div>
          <input
            name="dob"
            type="date"
            className={`w-full p-3 rounded-lg border ${errorClass("dob")} bg-gray-50 dark:bg-gray-700`}
            value={form.dob}
            onChange={handleChange}
          />
          {errors.dob && <p className="text-red-500 text-sm mt-1">{errors.dob}</p>}
        </div>

        {/* Address */}
        <div>
          <select
            name="address"
            className={`w-full p-3 rounded-lg border ${errorClass("address")} bg-gray-50 dark:bg-gray-700`}
            value={form.address}
            onChange={handleChange}
          >
            <option value="">Select Address</option>
            <option value="Islamabad">Islamabad</option>
            <option value="Lahore">Lahore</option>
            <option value="Karachi">Karachi</option>
          </select>
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">{errors.address}</p>
          )}
        </div>

        {/* Gender */}
        <div>
          <p className="font-medium">Gender:</p>
          <div className="flex gap-6 mt-2">
            {["Male", "Female", "Other"].map((g) => (
              <label key={g}>
                <input
                  type="radio"
                  name="gender"
                  value={g}
                  checked={form.gender === g}
                  onChange={handleChange}
                />{" "}
                {g}
              </label>
            ))}
          </div>
          {errors.gender && (
            <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
          )}
        </div>

        {/* Profession - Checkbox */}
        <div>
          <p className="font-medium">Profession:</p>
          <div className="flex gap-6 mt-2 flex-wrap">
            {["Student", "Teacher", "Developer"].map((p) => (
              <label key={p}>
                <input
                  type="checkbox"
                  name="profession"
                  value={p}
                  checked={form.profession.includes(p)}
                  onChange={handleChange}
                />{" "}
                {p}
              </label>
            ))}
          </div>
          {errors.profession && (
            <p className="text-red-500 text-sm mt-1">{errors.profession}</p>
          )}
        </div>

        {/* Hobbies */}
        <div>
          <p className="font-medium">Hobbies:</p>
          <div className="flex gap-6 mt-2">
            {["Cricket", "Reading", "Gaming"].map((h) => (
              <label key={h}>
                <input
                  type="radio"
                  name="hobbies"
                  value={h}
                  checked={form.hobbies === h}
                  onChange={handleChange}
                />{" "}
                {h}
              </label>
            ))}
          </div>
          {errors.hobbies && (
            <p className="text-red-500 text-sm mt-1">{errors.hobbies}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white w-full p-3 rounded-lg font-semibold hover:bg-blue-700 transition-all"
        >
          {initialData ? "Update User" : "Submit"}
        </button>
      </form>
      </div>
      </div>
    </div>
  );
}
