import { useState, useEffect } from "react";
import LoginTabs from "../../components/LoginTabs";
import LoginForm from "../../components/LoginForm";
import ForgotPasswordModal from "../../components/ForgotPasswordModal";
import { useLogin } from "../../hooks/useLogin";
import { useScreenSize } from "../../hooks/useScreenSize";
import Link from "next/link";

export default function Login() {
  const [activeTab, setActiveTab] = useState("student");
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [resetKey, setResetKey] = useState(0); // Key to force form reset
  const { isMobile, isTablet, isDesktop } = useScreenSize();
  
  const {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    handleSignIn,
  } = useLogin();

  // Reset form when switching tabs
  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
    setResetKey(prev => prev + 1); // Force form reset by changing key
    // Clear form fields
    setEmail("");
    setPassword("");
  };

  // Dynamic styles based on screen size
  const getContainerStyles = () => {
    if (isMobile) {
      return {
        containerClass: "min-h-screen flex justify-center items-end bg-gradient-to-br from-gray-50 to-gray-100",
        cardClass: "w-full bg-white rounded-t-2xl border-0 border-t border-gray-200 shadow-lg flex flex-col h-screen p-6 gap-4",
        contentClass: "flex flex-col items-center w-full",
        logoSize: { width: '240px', height: '60px' },
        titleSize: '18px',
        subtitleSize: '13px'
      };
    } else if (isTablet) {
      return {
        containerClass: "min-h-screen flex justify-center items-end bg-gradient-to-br from-gray-50 to-gray-100 p-4",
        cardClass: "w-[520px] bg-white rounded-t-2xl border border-gray-200 shadow-lg flex flex-col min-h-[calc(100vh-32px)] max-h-[672px] p-8 gap-6",
        contentClass: "flex flex-col items-center w-full",
        logoSize: { width: '280px', height: '70px' },
        titleSize: '20px',
        subtitleSize: '14px'
      };
    } else {
      return {
        containerClass: "min-h-screen flex justify-center items-end bg-gradient-to-br from-gray-50 to-gray-100 p-8",
        cardClass: "w-[520px] bg-white rounded-t-2xl border border-gray-200 shadow-lg flex flex-col min-h-[calc(100vh-64px)] max-h-[672px] p-12 gap-8",
        contentClass: "flex flex-col items-center w-full",
        logoSize: { width: '280px', height: '70px' },
        titleSize: '20px',
        subtitleSize: '14px'
      };
    }
  };

  const styles = getContainerStyles();

  return (
    <div className={styles.containerClass}>
      <div className={styles.cardClass}>
        <div className={styles.contentClass}>
        {/* Academic Portal and Tabs Container */}
        <div className="flex flex-col w-full" style={{ gap: isMobile ? '12px' : '16px' }}>
          <div className="text-center">
            {/* Academic Portal Logo */}
            <div className="mb-2">
              <img 
                src="/academic-portal-logo.svg" 
                alt="Academic Portal" 
                className="mx-auto"
                style={styles.logoSize}
              />
            </div>
            
            {/* Dynamic Subtitle */}
            <h2 className="font-semibold mb-1" style={{ color: '#09090B', fontSize: styles.titleSize }}>
              {activeTab === "student" 
                ? "Portal for Students" 
                : "Portal for Teacher/Admin"}
            </h2>
            
            <p style={{ color: '#5C5E63', fontSize: styles.subtitleSize }}>
              {activeTab === "student" 
                ? "Login to your Student account" 
                : "Login to your Teacher/Admin account"}
            </p>
          </div>

          <LoginTabs activeTab={activeTab} setActiveTab={handleTabChange} />
        </div>

        {/* Login Fields Container */}
        <div className="flex flex-col w-full" style={{ alignItems: isMobile ? 'stretch' : 'center', marginTop: isMobile ? '20px' : '24px' }}>
          <LoginForm
            key={`login-${resetKey}`} // Force reset when key changes
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            onSubmit={handleSignIn}
            loading={loading}
            activeTab={activeTab}
            onForgotPassword={() => setShowForgotModal(true)}
            bottomLink={
              <div className="text-center">
                {activeTab === "student" && (
                  <p className="text-sm" style={{ fontWeight: 500 }}>
                    <span style={{ color: '#09090B' }}>New here? Create an account now!</span>{" "}
                    <Link href="/Signup">
                      <span style={{ color: '#8A36D0' }} className="cursor-pointer hover:opacity-80">
                        Signup
                      </span>
                    </Link>
                  </p>
                )}
                {activeTab === "teacher" && (
                  <p className="text-sm" style={{ fontWeight: 500 }}>
                    <span style={{ color: '#09090B' }}>Need to register?</span>{" "}
                    <Link href="/TeacherSignup">
                      <span style={{ color: '#8A36D0' }} className="cursor-pointer hover:opacity-80">
                        Register Now!
                      </span>
                    </Link>
                  </p>
                )}
              </div>
            }
          />
        </div>
        </div>
      </div>

      <ForgotPasswordModal
        isOpen={showForgotModal}
        onClose={() => setShowForgotModal(false)}
        activeTab={activeTab}
      />
    </div>
  );
}