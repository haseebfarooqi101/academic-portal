import { useState, useEffect } from "react";
import SignupForm from "../../components/SignupForm";
import TeacherSignupForm from "../../components/TeacherSignupForm";
import SignupTabs from "../../components/SignupTabs";
import { useScreenSize } from "../../hooks/useScreenSize";

export default function StudentSignup() {
  const [activeTab, setActiveTab] = useState("student");
  const [resetKey, setResetKey] = useState(0); // Key to force form reset
  const { isMobile, isTablet, isDesktop } = useScreenSize();

  // Reset forms when switching tabs
  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
    setResetKey(prev => prev + 1); // Force form reset by changing key
  };

  // Dynamic styles based on screen size
  const getContainerStyles = () => {
    if (isMobile) {
      return {
        containerClass: "min-h-screen flex justify-center items-end bg-gradient-to-br from-gray-50 to-gray-100 p-2",
        cardClass: "w-full bg-white rounded-t-2xl border border-gray-200 shadow-lg flex flex-col h-[calc(100vh-32px)] p-6 gap-4",
        contentClass: "flex flex-col items-center w-full"
      };
    } else if (isTablet) {
      return {
        containerClass: "min-h-screen flex justify-center items-end bg-gradient-to-br from-gray-50 to-gray-100 p-4",
        cardClass: "w-[520px] bg-white rounded-t-2xl border border-gray-200 shadow-lg flex flex-col h-[calc(100vh-32px)] max-h-[672px] p-8 gap-6",
        contentClass: "flex flex-col items-center w-full"
      };
    } else {
      return {
        containerClass: "min-h-screen flex justify-center items-end bg-gradient-to-br from-gray-50 to-gray-100 p-8",
        cardClass: "w-[520px] bg-white rounded-t-2xl border border-gray-200 shadow-lg flex flex-col h-[calc(100vh-64px)] max-h-[672px] p-12 gap-8",
        contentClass: "flex flex-col items-center w-full"
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
                  style={isMobile ? { width: '240px', height: '60px' } : { width: '280px', height: '70px' }}
                />
              </div>
              
              {/* Dynamic Subtitle */}
              <h2 className="font-semibold mb-1" style={{ color: '#09090B', fontSize: isMobile ? '18px' : '20px' }}>
                {activeTab === "student" 
                  ? "Portal for Students" 
                  : "Portal for Teacher/Admin"}
              </h2>
              
              <p style={{ color: '#5C5E63', fontSize: isMobile ? '13px' : '14px' }}>
                {activeTab === "student" 
                  ? "Create your Student account" 
                  : "Create your Teacher/Admin account"}
              </p>
            </div>

            <SignupTabs activeTab={activeTab} setActiveTab={handleTabChange} />
          </div>

          {/* Signup Forms Container */}
          <div className="flex flex-col w-full" style={{ alignItems: isMobile ? 'stretch' : 'center', marginTop: isMobile ? '20px' : '24px' }}>
            {activeTab === "student" ? (
              <SignupForm key={`student-${resetKey}`} />
            ) : (
              <TeacherSignupForm key={`teacher-${resetKey}`} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}