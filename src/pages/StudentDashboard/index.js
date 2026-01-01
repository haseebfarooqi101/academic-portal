import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import StudentSidebar from "../../components/StudentSidebar";
import StudentHeader from "../../components/StudentHeader";
import ApprovalPending from "../../components/ApprovalPending";
import { selectIsHydrated } from "../../redux/slices/authSlice";
import { useToast } from "../../hooks/useToast";
import { useSidebar } from "../../hooks/useSidebar";
import Toast from "../../components/Toast";

// Import modular components
import StudentOverview from "../../components/StudentDashboard/StudentOverview";
import CoursesModule from "../../components/StudentDashboard/CoursesModule";
import GradesModule from "../../components/StudentDashboard/GradesModule";
import AttendanceModule from "../../components/StudentDashboard/AttendanceModule";
import LeavesModule from "../../components/StudentDashboard/LeavesModule";

export default function StudentDashboard() {
  const { currentUser } = useSelector((state) => state.auth);
  const isHydrated = useSelector(selectIsHydrated);
  const router = useRouter();
  const [activeItem, setActiveItem] = useState('dashboard');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { toast, showSuccess, showError, hideToast } = useToast();
  const { isSidebarOpen, isMobile, toggleSidebar, closeSidebar } = useSidebar();

  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  useEffect(() => {
    // Only redirect after hydration is complete
    if (isHydrated && (!currentUser || currentUser.role !== "student")) {
      router.push("/Login");
    }
  }, [currentUser, router, isHydrated]);

  // Show loading while hydrating
  if (!isHydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show loading if not authenticated after hydration
  if (!currentUser || currentUser.role !== "student") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecting...</p>
        </div>
      </div>
    );
  }

  // Check if student is approved - if not, show approval pending screen
  if (currentUser.status !== 'approved') {
    return <ApprovalPending currentUser={currentUser} />;
  }

  // Sample data for student dashboard
  const gradeData = [
    { name: 'Math', value: 85 },
    { name: 'Physics', value: 92 },
    { name: 'Chemistry', value: 78 },
    { name: 'English', value: 88 },
    { name: 'History', value: 90 }
  ];

  const attendanceData = [
    { name: 'Jan', value: 95 },
    { name: 'Feb', value: 88 },
    { name: 'Mar', value: 92 },
    { name: 'Apr', value: 85 },
    { name: 'May', value: 90 },
    { name: 'Jun', value: 87 }
  ];

  const renderDashboardContent = () => {
    if (activeItem === 'dashboard') {
      return (
        <StudentOverview 
          currentUser={currentUser}
          gradeData={gradeData}
          attendanceData={attendanceData}
        />
      );
    }

    if (activeItem === 'courses') {
      return <CoursesModule />;
    }

    if (activeItem === 'grades') {
      return <GradesModule />;
    }

    if (activeItem === 'attendance') {
      return <AttendanceModule />;
    }

    if (activeItem === 'leaves') {
      return (
        <LeavesModule 
          showSuccess={showSuccess}
          showError={showError}
        />
      );
    }

    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {activeItem.charAt(0).toUpperCase() + activeItem.slice(1)}
        </h3>
        <p className="text-gray-500">This section is under development.</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Toast */}
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={hideToast}
        />
      )}
      
      {/* Sidebar */}
      <StudentSidebar 
        activeItem={activeItem} 
        setActiveItem={setActiveItem}
        isOpen={isSidebarOpen}
        isMobile={isMobile}
        onClose={closeSidebar}
        onToggle={handleToggleCollapse}
        isCollapsed={isCollapsed}
      />
      
      {/* Header */}
      <StudentHeader 
        activeItem={activeItem} 
        setActiveItem={setActiveItem}
        onToggleSidebar={toggleSidebar}
        isMobile={isMobile}
        isSidebarOpen={isSidebarOpen}
      />
      
      {/* Main Content */}
      <main 
        className={`transition-all duration-300 ease-in-out overflow-y-auto overflow-x-hidden pt-3 ${
          isMobile ? '' : isSidebarOpen ? 'ml-60' : ''
        }`}
      >
        {renderDashboardContent()}
      </main>
    </div>
  );
}
