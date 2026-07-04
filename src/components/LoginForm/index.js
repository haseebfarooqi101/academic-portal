import { useState } from "react";
import { TextInput, PasswordInput } from "../FormField";
import { useScreenSize } from "../../hooks/useScreenSize";
import { useToast } from "../../hooks/useToast";
import Toast from "../Toast";

export default function LoginForm({
  email,
  setEmail,
  password,
  setPassword,
  onSubmit,
  loading,
  activeTab,
  onForgotPassword,
  bottomLink,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const { isMobile } = useScreenSize();
  const { toast, showError, hideToast } = useToast();
  
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

  const handleInputChange = (field, value, setter) => {
    setter(value);
    // Clear field errors when user starts typing
    if (fieldErrors[field]) {
      setFieldErrors(prev => ({ ...prev, [field]: false }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check for empty fields
    const errors = {};
    if (!email.trim()) errors.email = true;
    if (!password.trim()) errors.password = true;
    
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      showError("Please fill all highlighted fields");
      return;
    }
    
    // Clear any field errors and proceed with login
    setFieldErrors({});
    onSubmit(activeTab, showError);
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

      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
        <TextInput
          type="email"
          value={email}
          onChange={(e) => handleInputChange("email", e.target.value, setEmail)}
          placeholder="Enter your email"
          error={fieldErrors.email}
        />

        <PasswordInput
          value={password}
          onChange={(e) => handleInputChange("password", e.target.value, setPassword)}
          placeholder="Enter your password"
          error={fieldErrors.password}
          showPassword={showPassword}
          onToggleShow={() => setShowPassword(!showPassword)}
        />

        <div className="flex justify-end w-full" style={{ marginTop: '6px' }}>
          {(activeTab === "student" || activeTab === "teacher") && (
            <button
              type="button"
              onClick={onForgotPassword}
              className="font-medium"
              style={{ 
                color: '#09090B',
                fontSize: '14px',
                lineHeight: '20px'
              }}
            >
              Forgot password?
            </button>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="text-white font-semibold transition shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          style={getButtonStyle()}
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>

        {bottomLink && (
          <div className="mt-2">
            {bottomLink}
          </div>
        )}
      </form>
    </>
  );
}