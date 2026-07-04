import TeacherSignupForm from "../../components/TeacherSignupForm";
import { useScreenSize } from "../../hooks/useScreenSize";
import Link from "next/link";

export default function TeacherSignup() {
  const { isMobile, isTablet, isDesktop } = useScreenSize();

  // Dynamic styles based on screen size
  const getContainerStyles = () => {
    if (isMobile) {
      return {
        containerClass: "min-h-screen flex justify-center items-end bg-gradient-to-br from-gray-50 to-gray-100 p-2",
        cardClass: "w-full bg-white rounded-t-2xl border border-gray-200 shadow-lg flex flex-col p-6 gap-4 pb-8",
        contentClass: "flex flex-col items-center w-full",
        logoSize: { width: '240px', height: '60px' },
        titleSize: '18px',
        subtitleSize: '13px'
      };
    } else if (isTablet) {
      return {
        containerClass: "min-h-screen flex justify-center items-end bg-gradient-to-br from-gray-50 to-gray-100 p-4",
        cardClass: "w-[520px] bg-white rounded-t-2xl border border-gray-200 shadow-lg flex flex-col p-8 gap-6 pb-10",
        contentClass: "flex flex-col items-center w-full",
        logoSize: { width: '280px', height: '70px' },
        titleSize: '20px',
        subtitleSize: '14px'
      };
    } else {
      return {
        containerClass: "min-h-screen flex justify-center items-end bg-gradient-to-br from-gray-50 to-gray-100 p-8",
        cardClass: "w-[520px] bg-white rounded-t-2xl border border-gray-200 shadow-lg flex flex-col p-12 gap-8 pb-12",
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
          {/* Header: Logo + Title */}
          <div className="flex flex-col w-full text-center" style={{ gap: isMobile ? '12px' : '16px' }}>
            <div>
              <div className="mb-2">
                <img
                  src="/academic-portal-logo.svg"
                  alt="Academic Portal"
                  className="mx-auto"
                  style={styles.logoSize}
                />
              </div>
              <h2 className="font-semibold mb-1" style={{ color: '#09090B', fontSize: styles.titleSize }}>
                Portal for Teacher/Admin
              </h2>
              <p style={{ color: '#5C5E63', fontSize: styles.subtitleSize }}>
                Create your Teacher/Admin account
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="flex flex-col w-full" style={{ alignItems: isMobile ? 'stretch' : 'center', marginTop: isMobile ? '20px' : '24px' }}>
            <TeacherSignupForm />
          </div>
        </div>
      </div>
    </div>
  );
}