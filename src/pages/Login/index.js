import { useState } from "react";
import LoginTabs from "../../components/LoginTabs";
import LoginForm from "../../components/LoginForm";
import ForgotPasswordModal from "../../components/ForgotPasswordModal";
import { useLogin } from "../../hooks/useLogin";
import Link from "next/link";

export default function Login() {
  const [activeTab, setActiveTab] = useState("student");
  const [showForgotModal, setShowForgotModal] = useState(false);
  
  const {
    email,
    setEmail,
    password,
    setPassword,
    error,
    formErrors,
    loading,
    handleSignIn,
  } = useLogin();

  return (
    <div className="min-h-screen flex justify-center items-center bg-linear-to-br from-gray-50 to-gray-100 p-5">
      <div className="bg-white w-full max-w-sm shadow-2xl rounded-2xl p-6">
        <h1 className="text-center text-3xl font-bold text-gray-900 mb-2">
          Academic Portal
        </h1>

        <LoginTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        <LoginForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          onSubmit={handleSignIn(activeTab)}
          loading={loading}
          error={error}
          formErrors={formErrors}
          activeTab={activeTab}
          onForgotPassword={() => setShowForgotModal(true)}
        />

        <p className="text-center mt-5 text-sm text-gray-600 min-h-10">
          {activeTab === "student" && (
            <>
              New student?{" "}
              <Link href="/Signup">
                <span className="text-purple-600 cursor-pointer hover:text-purple-700">
                  Create account!
                </span>
              </Link>
            </>
          )}
          {activeTab === "teacher" && (
            <>
              Need to register?{" "}
              <span className="text-purple-600 cursor-pointer">
                Contact support
              </span>
            </>
          )}
        </p>
      </div>

      <ForgotPasswordModal
        isOpen={showForgotModal}
        onClose={() => setShowForgotModal(false)}
        activeTab={activeTab}
      />
    </div>
  );
}
