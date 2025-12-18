import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateFormField, resetForm } from "../../redux/slices/signupSlice";
import { useRouter } from "next/router";
import Link from "next/link";

const departments = [
  "Computer Science",
  "Electronics",
  "Mechanical",
  "Civil",
  "Electrical",
  "Chemical",
];

export default function StudentSignup() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { formData, error, success } = useSelector((state) => state.signup);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [topError, setTopError] = useState("");

  const validateField = (field, value) => {
    const next = { ...formErrors };

    if (field === "name") {
      if (!value.trim()) next.name = "Name is required";
      else if (value.trim().length < 3) next.name = "Name must be at least 3 characters";
      else delete next.name;
    }

    if (field === "registrationNumber") {
      if (!value.trim()) next.registrationNumber = "Registration number is required";
      else {
        const regNumRegex = /^[A-Za-z]{2,}-\d{4}-\d{3}$/;
        if (!regNumRegex.test(value)) next.registrationNumber = "Format must be DEPT-YYYY-NNN (e.g. CS-2021-005)";
        else delete next.registrationNumber;
      }
    }

    if (field === "email") {
      if (!value.trim()) next.email = "Email is required";
      else {
        const emailRegex = /^[^\s@]+@school\.edu$/i;
        if (!emailRegex.test(value)) next.email = "Email must be on school.edu domain";
        else delete next.email;
      }
    }

    if (field === "password") {
      const pwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{6,}$/;
      if (!value) next.password = "Password is required";
      else if (value.length < 6) next.password = "Password must be at least 6 characters";
      else if (!pwdRegex.test(value)) next.password = "Password must include uppercase, lowercase and a special character";
      else delete next.password;

      // also validate confirmPassword match
      if (formData.confirmPassword && value !== formData.confirmPassword) {
        next.confirmPassword = "Passwords do not match";
      } else if (formData.confirmPassword) {
        delete next.confirmPassword;
      }
    }

    if (field === "confirmPassword") {
      if (!value) next.confirmPassword = "Confirm password is required";
      else if (formData.password !== value) next.confirmPassword = "Passwords do not match";
      else delete next.confirmPassword;
    }

    if (field === "department") {
      if (!value) next.department = "Please select a department";
      else delete next.department;
    }

    setFormErrors(next);
  };

  const handleInputChange = (field, value) => {
    // update Redux form
    dispatch(updateFormField({ field, value }));
    // validate this field in real-time
    validateField(field, value);
    // clear top error when user types
    if (topError) setTopError("");
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      return "Name is required";
    }
    // Name: at least 3 characters (letters and spaces)
    if (formData.name.trim().length < 3) {
      return "Name must be at least 3 characters";
    }

    if (!formData.registrationNumber.trim()) {
      return "Registration number is required";
    }
    // Registration number format: DEPT-YYYY-NNN (e.g., CS-2021-005)
    const regNumRegex = /^[A-Za-z]{2,}-\d{4}-\d{3}$/;
    if (!regNumRegex.test(formData.registrationNumber)) {
      return "Registration number must match DEPT-YYYY-NNN (e.g. CS-2021-005)";
    }
    if (!formData.email || !formData.email.trim()) {
      return "Email is required";
    }
    // Email must be on school.edu domain
    const emailRegex = /^[^\s@]+@school\.edu$/i;
    if (!emailRegex.test(formData.email)) {
      return "Email must be a school.edu address (e.g. name@school.edu)";
    }
    if (!formData.password) {
      return "Password is required";
    }
    const pwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{6,}$/;
    if (formData.password.length < 6) {
      return "Password must be at least 6 characters";
    }
    if (!pwdRegex.test(formData.password)) {
      return "Password must include uppercase, lowercase and a special character";
    }
    if (formData.password !== formData.confirmPassword) {
      return "Passwords do not match";
    }
    if (!formData.department) {
      return "Please select a department";
    }
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check for empty required fields first
    const required = ["name", "registrationNumber", "email", "password", "confirmPassword", "department"];
    const empties = required.filter((f) => !formData[f] || (typeof formData[f] === "string" && !formData[f].trim()));
    if (empties.length > 0) {
      // set top-level error and individual field errors
      setTopError("Please fill all required fields");
      const next = { ...formErrors };
      empties.forEach((f) => {
        if (f === "name") next.name = "Name is required";
        if (f === "registrationNumber") next.registrationNumber = "Registration number is required";
        if (f === "email") next.email = "Email is required";
        if (f === "password") next.password = "Password is required";
        if (f === "confirmPassword") next.confirmPassword = "Confirm password is required";
        if (f === "department") next.department = "Please select a department";
      });
      setFormErrors(next);
      return;
    }

    const validationError = validateForm();
    if (validationError) {
      dispatch(updateFormField({ field: "error", value: validationError }));
      return;
    }

    // Create student object
    const newStudent = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      registrationNumber: formData.registrationNumber,
      department: formData.department,
      password: formData.password,
    };

    // Save to students.json via API
    fetch("/api/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newStudent),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Student saved to file:", data);
        
        // Dispatch action to add the new student to auth slice (Redux)
        dispatch({
          type: "auth/addStudent",
          payload: newStudent,
        });

        dispatch({ type: "signup/setSuccess" });

        // Reset form and redirect to Login after delay
        setTimeout(() => {
          dispatch(resetForm());
          router.push("/Login");
        }, 1500);
      })
      .catch((error) => {
        console.error("Error saving student:", error);
        dispatch(updateFormField({ field: "error", value: "Failed to create account. Please try again." }));
      });
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-linear-to-br from-gray-50 to-gray-100 p-4">
      <div className="bg-white w-full max-w-lg shadow-lg rounded-2xl p-6">
        <h1 className="text-center text-2xl font-extrabold text-gray-900 mb-2">
          Student Sign Up
        </h1>
        <p className="text-center text-gray-500 mb-6 text-sm">
          Create your account to get started!
        </p>

        {topError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-700">{topError}</p>
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-700">Account created successfully! Redirecting...</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Name */}
          <div>
            <label className="text-sm font-semibold text-gray-800 block mb-1">Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="w-full h-10 px-3 text-sm border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none placeholder-gray-600 text-gray-700 transition shadow-md"
              placeholder="Enter name.."
            />
            {formErrors.name && <p className="text-xs text-red-600 mt-1">{formErrors.name}</p>}
          </div>

          {/* Registration Number */}
          <div>
            <label className="text-sm font-semibold text-gray-800 block mb-1">Registration Number</label>
            <input
              type="text"
              value={formData.registrationNumber}
              onChange={(e) => handleInputChange("registrationNumber", e.target.value)}
              className="w-full h-10 px-3 text-sm border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none placeholder-gray-600 text-gray-700 transition shadow-md"
              placeholder="Reg No.."
            />
            {formErrors.registrationNumber && <p className="text-xs text-red-600 mt-1">{formErrors.registrationNumber}</p>}
          </div>

          {/* Department */}
          <div>
            <label className="text-sm font-semibold text-gray-800 block mb-1">Department</label>
            <select
              value={formData.department}
              onChange={(e) => handleInputChange("department", e.target.value)}
              className="w-full h-10 px-3 text-sm border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none text-gray-700 transition shadow-md bg-white"
            >
              <option value="">Select a department</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
            {formErrors.department && <p className="text-xs text-red-600 mt-1">{formErrors.department}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-semibold text-gray-800 block mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="w-full h-10 px-3 text-sm border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none placeholder-gray-600 text-gray-700 transition shadow-md"
              placeholder="you@sch.."
            />
            {formErrors.email && <p className="text-xs text-red-600 mt-1">{formErrors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-semibold text-gray-800 block mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className="w-full h-10 px-3 text-sm border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none placeholder-gray-600 text-gray-700 transition shadow-md pr-16"
                placeholder="Enter pass.."
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-700 hover:text-gray-900 text-sm font-medium">{showPassword ? "Hide" : "Show"}</button>
            </div>
            {formErrors.password && <p className="text-xs text-red-600 mt-1">{formErrors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-sm font-semibold text-gray-800 block mb-1">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                className="w-full h-10 px-3 text-sm border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none placeholder-gray-600 text-gray-700 transition shadow-md pr-16"
                placeholder="Confirm pass.."
              />
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-700 hover:text-gray-900 text-sm font-medium">{showConfirmPassword ? "Hide" : "Show"}</button>
            </div>
            {formErrors.confirmPassword && <p className="text-xs text-red-600 mt-1">{formErrors.confirmPassword}</p>}
          </div>

          {/* Submit */}
          <button type="submit" className="sm:col-span-3 mt-4 w-full bg-linear-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-3 rounded-lg font-semibold text-base transition shadow-md hover:shadow-lg">Create Account</button>
        </form>

        {/* Back to Login */}
        <p className="text-center mt-5 text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/Login">
            <span className="text-purple-600 cursor-pointer hover:text-purple-700">
              Sign In
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
}
