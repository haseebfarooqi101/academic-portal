import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateFormField, resetForm } from "../../redux/slices/signupSlice";
import { addStudent } from "../../redux/slices/authSlice";
import { useScreenSize } from "../../hooks/useScreenSize";
import { useToast } from "../../hooks/useToast";
import Link from "next/link";
import AccountCreatedSuccess from "../AccountCreatedSuccess";
import Toast from "../Toast";
import { useSignupValidation } from "../../hooks/useSignupValidation";
import { TextInput, SelectInput, PasswordInput } from "../FormField";

const departments = [
  "Computer Science",
  "Electronics", 
  "Mechanical",
  "Civil",
  "Electrical",
  "Chemical",
];

export default function SignupForm() {
  const dispatch = useDispatch();
  const { formData, error } = useSelector((state) => state.signup);
  const { isMobile } = useScreenSize();
  const { toast, showError, hideToast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  const {
    formErrors,
    topError,
    setTopError,
    validateField,
    validateForm,
    setFormErrors
  } = useSignupValidation();

  const getButtonStyle = () => {
    const { getFieldWidth, getMaxFieldWidth } = useScreenSize();
    return {
      width: isMobile ? getFieldWidth() : '416px',
      maxWidth: isMobile ? getMaxFieldWidth() : '416px',
      height: '44px',
      backgroundColor: '#8A36D0',
      paddingTop: '12px',
      paddingRight: '16px',
      paddingBottom: '12px',
      paddingLeft: '16px',
      borderRadius: '8px',
      marginTop: '16px'
    };
  };

  const handleInputChange = (field, value) => {
    dispatch(updateFormField({ field, value }));
    // Clear errors when user starts typing
    if (topError) setTopError("");
    // Clear field-specific errors
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: false }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const required = ["name", "registrationNumber", "email", "password", "confirmPassword", "department"];
    const empties = required.filter((f) => !formData[f] || (typeof formData[f] === "string" && !formData[f].trim()));
    
    if (empties.length > 0) {
      showError("Please fill all highlighted fields");
      const next = {};
      empties.forEach((f) => {
        next[f] = true; // Just mark as error, no specific message
      });
      setFormErrors(next);
      return;
    }

    const validationError = validateForm(formData);
    if (validationError) {
      showError(validationError);
      return;
    }

    const newStudent = {
      id: Date.now() + Math.random(),
      name: formData.name,
      email: formData.email,
      registrationNumber: formData.registrationNumber,
      department: formData.department,
      password: formData.password,
      role: "student",
      status: "pending", // New students need admin approval
      createdAt: new Date().toISOString()
    };

    fetch("/api/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newStudent),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Student saved to file:", data);
        dispatch(addStudent(newStudent));
        dispatch({ type: "signup/setSuccess" });
        setShowSuccessModal(true);
        dispatch(resetForm());
      })
      .catch((error) => {
        console.error("Error saving student:", error);
        showError("Failed to create account. Please try again.");
      });
  };

  return (
    <>
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={hideToast}
        />
      )}
      
      <div className="flex flex-col h-full">
      {/* Scrollable Form Fields - Fixed height with hidden scrollbar */}
      <div className="overflow-y-auto scrollbar-hidden flex flex-col items-center"
           style={{
             height: '300px', // Fixed height so fields don't expand
             scrollbarWidth: 'none',
             msOverflowStyle: 'none'
           }}>
        <style jsx>{`
          .scrollbar-hidden::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        
        <div className="flex flex-col items-center w-full" style={{ gap: '12px', paddingBottom: '16px' }}>
          <TextInput
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            placeholder="Enter your full name"
            error={formErrors.name}
          />

          <TextInput
            value={formData.registrationNumber}
            onChange={(e) => handleInputChange("registrationNumber", e.target.value)}
            placeholder="e.g. CS-2024-001"
            error={formErrors.registrationNumber}
          />

          <TextInput
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            placeholder="your.name@school.edu"
            error={formErrors.email}
          />

          <SelectInput
            value={formData.department}
            onChange={(e) => handleInputChange("department", e.target.value)}
            options={departments}
            placeholder="Select your department"
            error={formErrors.department}
          />

          <PasswordInput
            value={formData.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
            placeholder="Create a strong password"
            error={formErrors.password}
            showPassword={showPassword}
            onToggleShow={() => setShowPassword(!showPassword)}
          />

          <PasswordInput
            value={formData.confirmPassword}
            onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
            placeholder="Confirm your password"
            error={formErrors.confirmPassword}
            showPassword={showConfirmPassword}
            onToggleShow={() => setShowConfirmPassword(!showConfirmPassword)}
          />
        </div>
      </div>

      {/* Submit Button and Footer - Right below fields */}
      <div className="mt-2">
        <form onSubmit={handleSubmit} className="flex justify-center">
          <button 
            type="submit"
            className="text-white font-semibold transition shadow-md hover:shadow-lg"
            style={getButtonStyle()}
          >
            Create Account
          </button>
        </form>

        {/* Back to Login - Right below button */}
        <div className="text-center" style={{ marginTop: '12px' }}>
          <p className="text-sm" style={{ fontWeight: 500 }}>
            <span style={{ color: '#09090B' }}>Already have an account?</span>{" "}
            <Link href="/Login">
              <span style={{ color: '#8A36D0' }} className="cursor-pointer hover:opacity-80">
                Sign In
              </span>
            </Link>
          </p>
        </div>
      </div>

          {/* Success Modal */}
          {showSuccessModal && (
            <AccountCreatedSuccess 
              userType="Student"
              onClose={() => setShowSuccessModal(false)}
            />
          )}
        </div>
      </>
    );
  }