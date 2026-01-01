import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ForgotPasswordModal({ isOpen, onClose, activeTab }) {
  const [forgotEmail, setForgotEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [forgotError, setForgotError] = useState("");
  const [forgotSuccess, setForgotSuccess] = useState(false);
  const [forgotLoading, setForgotLoading] = useState(false);

  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.auth);

  const handleClose = () => {
    setForgotEmail("");
    setNewPassword("");
    setConfirmPassword("");
    setShowNewPassword(false);
    setShowConfirmPassword(false);
    setForgotError("");
    setForgotSuccess(false);
    setForgotLoading(false);
    onClose();
  };

  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();
    setForgotError("");

    // Validation
    if (!forgotEmail.trim()) {
      setForgotError("Email is required");
      return;
    }
    const emailRegex = /^[^\s@]+@school\.edu$/i;
    if (!emailRegex.test(forgotEmail)) {
      setForgotError("Use your school.edu email");
      return;
    }

    if (!newPassword) {
      setForgotError("New password is required");
      return;
    }

    const pwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{6,}$/;
    if (newPassword.length < 6) {
      setForgotError("Password must be at least 6 characters");
      return;
    }
    if (!pwdRegex.test(newPassword)) {
      setForgotError("Password must include uppercase, lowercase and a special character");
      return;
    }

    if (newPassword !== confirmPassword) {
      setForgotError("Passwords do not match");
      return;
    }

    setForgotLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (activeTab === "student") {
        const studentIndex = users.students.findIndex(
          (s) => s.email === forgotEmail
        );

        if (studentIndex !== -1) {
          // Dispatch action to update password
          dispatch({
            type: "auth/updateStudentPassword",
            payload: {
              email: forgotEmail,
              newPassword: newPassword,
            },
          });

          setForgotSuccess(true);
          setForgotLoading(false);

          // Auto redirect after 3 seconds
          setTimeout(() => {
            handleClose();
          }, 3000);
        } else {
          setForgotError("Email not found in our records");
          setForgotLoading(false);
        }
      } else if (activeTab === "teacher") {
        const teacherIndex = users.teachers.findIndex(
          (t) => t.email === forgotEmail
        );

        if (teacherIndex !== -1) {
          dispatch({
            type: "auth/updateTeacherPassword",
            payload: {
              email: forgotEmail,
              newPassword: newPassword,
            },
          });

          setForgotSuccess(true);
          setForgotLoading(false);

          // Auto redirect after 3 seconds
          setTimeout(() => {
            handleClose();
          }, 3000);
        } else {
          setForgotError("Email not found in our records");
          setForgotLoading(false);
        }
      }
    }, 800);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center p-4">
      <div className="absolute inset-0 backdrop-blur-sm" onClick={handleClose} />
      <div className="relative z-10 bg-white w-full max-w-sm shadow-2xl rounded-2xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Reset Password</h2>
          <button
            type="button"
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {forgotSuccess ? (
          <div className="text-center py-6">
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-700 font-semibold mb-2">
                Password Changed Successfully!
              </p>
              <p className="text-xs text-green-600">
                A confirmation email has been sent to <strong>{forgotEmail}</strong>. 
                Please check your inbox.
              </p>
            </div>
            <p className="text-xs text-gray-500">
              Redirecting to login page in a few seconds...
            </p>
          </div>
        ) : (
          <form onSubmit={handleForgotPasswordSubmit}>
            {forgotError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-700">{forgotError}</p>
              </div>
            )}

            <div className="mb-4">
              <label className="text-sm font-semibold text-gray-800 block mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                className="w-full p-2.5 text-sm border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none placeholder-gray-500 transition shadow-md"
                style={{ color: '#09090B' }}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="mb-4">
              <label className="text-sm font-semibold text-gray-800 block mb-1">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-2.5 text-sm border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none placeholder-gray-500 transition shadow-md pr-16"
                  style={{ color: '#09090B' }}
                  placeholder="Enter new pass.."
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {showNewPassword ? (
                    // Eye slash icon (hidden)
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    // Eye icon (visible)
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="mb-6">
              <label className="text-sm font-semibold text-gray-800 block mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-2.5 text-sm border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none placeholder-gray-500 transition shadow-md pr-16"
                  style={{ color: '#09090B' }}
                  placeholder="Confirm pass.."
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {showConfirmPassword ? (
                    // Eye slash icon (hidden)
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    // Eye icon (visible)
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={forgotLoading}
              className="w-full bg-linear-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-2.5 rounded-lg font-semibold text-sm transition shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {forgotLoading ? "Processing..." : "Reset Password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}