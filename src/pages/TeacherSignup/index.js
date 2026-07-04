import TeacherSignupForm from "../../components/TeacherSignupForm";
import { useScreenSize } from "../../hooks/useScreenSize";

export default function TeacherSignup() {
  const { isMobile, isTablet } = useScreenSize();

  // Dynamic styles — matches Login page card sizing exactly
  const getContainerStyles = () => {
    if (isMobile) {
      return {
        containerClass: "min-h-screen flex justify-center items-end bg-gradient-to-br from-gray-50 to-gray-100",
        cardClass: "w-full bg-white rounded-t-2xl border-0 border-t border-gray-200 shadow-lg flex flex-col h-screen p-6 gap-4 overflow-hidden",
        contentClass: "flex flex-col items-center w-full overflow-hidden",
        logoSize: { width: '240px', height: '60px' },
        titleSize: '18px',
        subtitleSize: '13px',
        formMargin: '20px'
      };
    } else if (isTablet) {
      return {
        containerClass: "min-h-screen flex justify-center items-end bg-gradient-to-br from-gray-50 to-gray-100 p-4",
        cardClass: "w-[520px] bg-white rounded-t-2xl border border-gray-200 shadow-lg flex flex-col min-h-[calc(100vh-32px)] max-h-[672px] p-8 gap-6 overflow-hidden",
        contentClass: "flex flex-col items-center w-full overflow-hidden",
        logoSize: { width: '280px', height: '70px' },
        titleSize: '20px',
        subtitleSize: '14px',
        formMargin: '24px'
      };
    } else {
      return {
        containerClass: "min-h-screen flex justify-center items-end bg-gradient-to-br from-gray-50 to-gray-100 p-8",
        cardClass: "w-[520px] bg-white rounded-t-2xl border border-gray-200 shadow-lg flex flex-col min-h-[calc(100vh-64px)] max-h-[672px] p-12 gap-8 overflow-hidden",
        contentClass: "flex flex-col items-center w-full overflow-hidden",
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

          {/* Header: Logo + Title — fixed, does not grow */}
          <div className="flex flex-col w-full text-center shrink-0">
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

          {/* Form — grows to fill remaining card height */}
          <div className="flex flex-col w-full flex-1 min-h-0" style={{ marginTop: styles.formMargin }}>
            <TeacherSignupForm />
          </div>

        </div>
      </div>
    </div>
  );
}
