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

  const getContainerStyles = () => {
    if (isMobile) {
      return {
        containerClass: "min-h-screen flex justify-center items-end bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden",
        cardClass: "w-full bg-white rounded-t-2xl border-0 border-t border-gray-200 shadow-lg flex flex-col h-screen p-6 gap-4 overflow-hidden",
        contentClass: "flex flex-col items-center w-full flex-1 min-h-0",
        headerGap: '12px',
        logoSize: { width: '240px', height: '60px' },
        titleSize: '18px',
        subtitleSize: '13px',
        formMargin: '20px'
      };
    } else if (isTablet) {
      return {
        containerClass: "min-h-screen flex justify-center items-end bg-gradient-to-br from-gray-50 to-gray-100 p-4 overflow-hidden",
        cardClass: "w-[520px] bg-white rounded-t-2xl border border-gray-200 shadow-lg flex flex-col h-[calc(100vh-32px)] max-h-[672px] p-8 gap-4 overflow-hidden",
        contentClass: "flex flex-col items-center w-full flex-1 min-h-0",
        headerGap: '16px',
        logoSize: { width: '280px', height: '70px' },
        titleSize: '20px',
        subtitleSize: '14px',
        formMargin: '24px'
      };
    } else {
      return {
        containerClass: "min-h-screen flex justify-center items-end bg-gradient-to-br from-gray-50 to-gray-100 p-8 overflow-hidden",
        cardClass: "w-[520px] bg-white rounded-t-2xl border border-gray-200 shadow-lg flex flex-col h-[calc(100vh-64px)] max-h-[672px] p-12 gap-4 overflow-hidden",
        contentClass: "flex flex-col items-center w-full flex-1 min-h-0",
        headerGap: '16px',
        logoSize: { width: '280px', height: '70px' },
        titleSize: '20px',
        subtitleSize: '14px',
        formMargin: '24px'
      };
    }
  };

  const styles = getContainerStyles();

  return (
    <div className={styles.containerClass}>
      <div className={styles.cardClass}>
        <div className={styles.contentClass}>

          {/* Header: Logo + Subtitle + Tabs — fixed, does not grow */}
          <div className="flex flex-col w-full shrink-0" style={{ gap: styles.headerGap }}>
            <div className="text-center">
              <div className="mb-2">
                <img
                  src="/academic-portal-logo.svg"
                  alt="Academic Portal"
                  className="mx-auto"
                  style={styles.logoSize}
                />
              </div>
              <h2 className="font-semibold mb-1" style={{ color: '#09090B', fontSize: styles.titleSize }}>
                {activeTab === "student" ? "Portal for Students" : "Portal for Teacher/Admin"}
              </h2>
              <p style={{ color: '#5C5E63', fontSize: styles.subtitleSize }}>
                {activeTab === "student" ? "Create your Student account" : "Create your Teacher/Admin account"}
              </p>
            </div>
            <SignupTabs activeTab={activeTab} setActiveTab={handleTabChange} />
          </div>

          {/* Forms Container — grows to fill remaining card height */}
          <div className="flex flex-col w-full flex-1 min-h-0" style={{ marginTop: styles.formMargin }}>
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