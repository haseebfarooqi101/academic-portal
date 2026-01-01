import TeacherSignupForm from "../../components/TeacherSignupForm";
import { useScreenSize } from "../../hooks/useScreenSize";

export default function TeacherSignup() {
  const { isMobile, isTablet, isDesktop } = useScreenSize();

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
          <TeacherSignupForm />
        </div>
      </div>
    </div>
  );
}