import { useState } from "react";

export const useSignupValidation = () => {
  const [formErrors, setFormErrors] = useState({});
  const [topError, setTopError] = useState("");

  const validateForm = (formData) => {
    const errors = {};
    const required = ["name", "registrationNumber", "email", "password", "confirmPassword", "department"];
    
    // Check for empty required fields
    const empties = required.filter((f) => !formData[f] || (typeof formData[f] === "string" && !formData[f].trim()));
    
    if (empties.length > 0) {
      empties.forEach(field => {
        errors[field] = true;
      });
      setTopError("All highlighted fields are required");
      setFormErrors(errors);
      return false;
    }

    // Email validation
    if (!formData.email.endsWith("@school.edu")) {
      errors.email = true;
      setTopError("Please use your school.edu email address");
      setFormErrors(errors);
      return false;
    }

    // Password validation
    if (formData.password.length < 6) {
      errors.password = true;
      setTopError("Password must be at least 6 characters long");
      setFormErrors(errors);
      return false;
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = true;
      setTopError("Passwords do not match");
      setFormErrors(errors);
      return false;
    }

    // Clear errors if validation passes
    setFormErrors({});
    setTopError("");
    return true;
  };

  return {
    formErrors,
    topError,
    validateForm,
    setFormErrors
  };
};