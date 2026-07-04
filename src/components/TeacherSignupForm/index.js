import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateFormField, resetForm } from "../../redux/slices/teacherSignupSlice";
import { addTeacher } from "../../redux/slices/authSlice";
import { useScreenSize } from "../../hooks/useScreenSize";
import { useToast } from "../../hooks/useToast";
import Link from "next/link";
import AccountCreatedSuccess from "../AccountCreatedSuccess";
import Toast from "../Toast";
import { validateForm, validatePasswordConfirmation } from "../../utils/validations";
import { TextInput, SelectInput, PasswordInput } from "../FormField";

const departments = [
  "Computer Science",
  "Electronics", 
  "Mechanical",
  "Civil",
  "Electrical",
  "Chemical",
];

export default function TeacherSignupForm() {
  const dispatch = useDispatch();
  const { formData } = useSelector((state) => state.teacherSignup);
  const { isMobile, getFieldWidth, getMaxFieldWidth } = useScreenSize();
  const { toast, showError, hideToast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [topError, setTopError] = useState("");

  const getButtonStyle = () => {
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
    const required = ["name", "email", "password", "confirmPassword", "department", "employeeId"];
    
    // Use utility validation
    const validation = validateForm(formData, required);
    
    if (!validation.isValid) {
      // Convert validation errors to boolean format for form highlighting
      const errors = {};
      Object.keys(validation.errors).forEach(field => {
        errors[field] = true;
      });
      setFormErrors(errors);
      setTopError("All highlighted fields are required");
      return;
    }

    // School email validation
    if (!formData.email.endsWith("@school.edu")) {
      setFormErrors({ email: true });
      setTopError("Please use your school.edu email address");
      return;
    }

    // Password confirmation validation
    if (!validatePasswordConfirmation(formData.password, formData.confirmPassword)) {
      setFormErrors({ confirmPassword: true });
      setTopError("Passwords do not match");
      return;
    }

    const newTeacher = {
      id: Date.now() + Math.random(),
      name: formData.name,
      email: formData.email,
      department: formData.department,
      password: formData.password,
      role: "teacher"
    };

    fetch("/api/teachers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTeacher),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Teacher saved to file:", data);
        dispatch(addTeacher(newTeacher));
        dispatch({ type: "teacherSignup/setSuccess" });
        setShowSuccessModal(true);
        dispatch(resetForm());
      })
      .catch((error) => {
        console.error("Error saving teacher:", error);
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

      {/* Outer: fills the flex-1 space given by the parent */}
      <div className="flex flex-col h-full w-full">

        {/* Scrollable fields — grows, scrolls internally, scrollbar hidden */}
        <div
          className="teacher-signup-scroll flex-1 min-h-0 overflow-y-auto flex flex-col items-center"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <style jsx>{`
            .teacher-signup-scroll::-webkit-scrollbar { display: none; }
          `}</style>

          <div className="flex flex-col items-center w-full" style={{ gap: '12px', paddingBottom: '16px' }}>
            <TextInput
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Enter your full name"
              error={formErrors.name}
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

        {/* Button + Sign In link — pinned at bottom, never scrolls */}
        <div className="shrink-0 mt-4">
          <form onSubmit={handleSubmit} className="flex justify-center">
            <button
              type="submit"
              className="text-white font-semibold transition shadow-md hover:shadow-lg"
              style={getButtonStyle()}
            >
              Create Account
            </button>
          </form>
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

        {showSuccessModal && (
          <AccountCreatedSuccess
            userType="Teacher"
            onClose={() => setShowSuccessModal(false)}
          />
        )}
      </div>
    </>
  );
}