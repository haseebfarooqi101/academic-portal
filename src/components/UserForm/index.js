//redux
//redux toolkit
//jotai

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
    profession: "",
    hobbies: [],
  });

  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState({ message: "", type: "" });

  // Prefill if editing
  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
    
  }, [initialData]);

  // Auto-hide toast
  useEffect(() => {
    if (toast.message) {
      const timer = setTimeout(() => setToast({ message: "", type: "" }), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const [showPassword, setShowPassword] = useState(false);
  const handleChange = (e) => {
    

    const { name, value, type, checked } = e.target;
    if (name === "hobbies") {
      setForm((prev) => {
        const updated = checked
          ? [...prev.hobbies, value]
          : prev.hobbies.filter((p) => p !== value);
  
        return { ...prev, hobbies: updated };
      });
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  
    // LIVE VALIDATION
    if (validationRules[name]) {
      const rule = validationRules[name];
      let msg = "";
  
      if (rule.required && !value?.trim()) msg = rule.message;
      else if (rule.regex && !rule.regex.test(value)) msg = rule.message;
      else if (rule.match && value !== form[rule.match]) msg = rule.message;
      else if (rule.validate && !rule.validate(value)) msg = rule.message;

  
      setErrors((prev) => ({ ...prev, [name]: msg }));
      
      
    }

  };
// use loop and fix regix
// on change validations
// on blur, on focus
//prop drilling(methods to avoid) 
// user name
const nameRegex = /^[A-Za-z]{3,}$/;
// EMAIL REGEX 
const emailRegex = /^(?:[a-zA-Z0-9._%+-]+)@(?:[a-zA-Z0-9.-]+)\.(?:com|co|net|org|pk|edu|info|io)$/;

// PASSWORD RULES 
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/ 


// PAKISTAN PHONE 
const phoneRegex = /^(\+92|0)?3\d{9}$/;

const validationRules = {
  username: {
    required: true,
    regex: nameRegex, //  ADDED: Use nameRegex here
    message: "Username too short, atleast 3 characters.", // Message updated to be specific
  },
  firstName: {
    required: true,
    regex: nameRegex, //  ADDED: Use nameRegex here
    message: "First Name must be at least 3 letters.", // Message updated to be specific
  },
  lastName: {
    required: true,
    message: "Last Name is required",
  },
  email: {
    required: true,
    regex: emailRegex,
    message: "Enter a valid email (example@gmail.com, example@yahoo.co)",
  },
  password: {
    required: true,
    regex: passwordRegex,
    message:
      "password is required Password must be 8 chars with 1 uppercase, 1 lowercase & 1 digit",
  },
  confirmPassword: {
    match: "password",
    message: "Passwords do not match",
    required: true, //  IMPROVED: confirmPassword should also be required
  },
  phone: {
    required: true,
    regex: phoneRegex,
    message: "Phone is required",
  },
  age:{
    required: true,
    validate: (value) => Number(value) > 0,
    message: "Age must be greater than 0",
  },
  dob:{
    required: true,
    message: "DOB is required",

  },
  address:{
    required: true,
    message: "address is required",
    
  },
  gender:{
    required: true,
    message: "gender is required",
    
  },
  profession:{
    required: true,
    message: "profession is required",
    
  },
  
};



const validate = () => {
  let newErrors = {};

  for (let field in validationRules) {
    const rule = validationRules[field];
    const value = form[field];

    // REQUIRED (submit error)
    if (rule.required && (!value || value === "" || value.length === 0)) {
      newErrors[field] = `${field} is required`;
      continue;
    }
    if (field === "age" && Number(value) <= 0) {
      newErrors.age = "Age must be greater than 0";
      continue;
    }
    // DOB MUST BE A PAST DATE
     if (field === "dob") {
       const today = new Date().toISOString().split("T")[0];
     if (value >= today) {
       newErrors.dob = "DOB must be a past date";
        continue;
        }
      }

    

    // REGEX
    if (rule.regex && !rule.regex.test(value)) {
      newErrors[field] = rule.message;
      continue;
    }

    // MATCH
    if (rule.match && value !== form[rule.match]) {
      newErrors[field] = rule.message;
      continue;
    }
  }

  // HOBBIES special case
  if (form.hobbies.length === 0) {
    newErrors.hobbies = "Hobbies are required";
  }

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
        profession: "",
        hobbies: [],
      });
      setErrors({});
    } else {
      setToast({ message: "⚠️ Please fix the highlighted fields.", type: "error" });
    }
  };

  const errorClass = (field) =>
    errors[field]
      ? "border-red-500 focus:ring-red-300 animate-shake"
      : "border-gray-300 focus:ring-blue-300";

      
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Toast Notification */}
      {toast.message && (
        <div
          className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 px-4 py-3 rounded-lg shadow-lg text-white text-sm font-medium transition-all duration-300 animate-fade-in animate-slideInRight ${
            toast.type === "success"
              ? "bg-green-600 animate-fade-in"
              : "bg-red-600 animate-fade-in"
          }`}
        >
          {toast.message}
        </div>
      )}

      {/* ✅ Centered Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl w-10xl max-w-10xl space-y-4 text-gray-800 dark:text-gray-100 animate-zoomIn"
      >
        <h2 className="text-xl font-bold text-center text-blue-600 dark:text-blue-400">
          {initialData ? "Edit User" : "User Form"}
        </h2>

        

        {/* Username + First + Last Name */}
        <div className="grid grid-cols-3 gap-4">
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

        
        

        {/* Email + Password + Confirm */}
        <div className="grid grid-cols-3 gap-4">
        <div>
          <input
            name="email"
            type="email"
            placeholder="Email"
            className={`w-full p-3 rounded-lg border ${errorClass("email")} bg-gray-50 dark:bg-gray-700`}
            value={form.email}
            onChange={handleChange}
            onBlur={() => validate("email", form.email, form)}
            //onFocus={() => clearError("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>
          <div>
          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className={`w-full p-3 rounded-lg border ${errorClass("password")} bg-gray-50 dark:bg-gray-700`}
              
              value={form.password}
              onChange={handleChange}
              
            />
            <span
             onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 cursor-pointer text-gray-600"
            >
             {showPassword ? "🙈" : "👁️"}
              </span>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
            </div>
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

        {/* DOB + Phone + Age */}
        <div className="grid grid-cols-3 gap-4">
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
              min="1"
              placeholder="Age"
              className={`w-full p-3 rounded-lg border ${errorClass("age")} bg-gray-50 dark:bg-gray-700`}
              value={form.age}
              onChange={handleChange}
            />
            {errors.age && (
              <p className="text-red-500 text-sm mt-1">{errors.age}</p>
            )}
          </div>
          <div>
          <input
            name="dob"
            type="date"
            max={new Date().toISOString().split("T")[0]}
            className={`w-full p-3 rounded-lg border ${errorClass("dob")} bg-gray-50 dark:bg-gray-700`}
            value={form.dob}
            onChange={handleChange}
          />
          {errors.dob && <p className="text-red-500 text-sm mt-1">{errors.dob}</p>}
        </div>
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
        <div className="grid grid-cols-3 gap-4">
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
                  type="radio"
                  name="profession"
                  value={p}
                  checked={form.profession === p }
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
                  type="checkbox"
                  name="hobbies"
                  value={h}
                  checked={form.hobbies.includes(h)}
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
        </div>

        

        <button
          type="submit"
          className="bg-blue-600 text-white w-full p-3 rounded-lg font-semibold hover:bg-blue-700 transition-all"
        >
          {initialData ? "Update User" : "Submit"}
        </button>
      </form>
      </div>
    
    
  );
}
