import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import TeacherSidebar from "../../components/TeacherSidebar";
import TeacherHeader from "../../components/TeacherHeader";
import { selectStudents, selectIsHydrated } from "../../redux/slices/authSlice";
import { useToast } from "../../hooks/useToast";
import { useSidebar } from "../../hooks/useSidebar";
import Toast from "../../components/Toast";

// Import modular components
import DashboardOverview from "../../components/Dashboard/DashboardOverview";
import AttendanceModule from "../../components/Dashboard/AttendanceModule";
import ClassesModule from "../../components/Dashboard/ClassesModule";
import StudentsModule from "../../components/Dashboard/StudentsModule";
import AssignmentsModule from "../../components/Dashboard/AssignmentsModule";
import GradesModule from "../../components/Dashboard/GradesModule";
import LeavesModule from "../../components/Dashboard/LeavesModule";
import ScheduleModule from "../../components/Dashboard/ScheduleModule";

// Import utility functions
import {
  enhanceStudentData,
  getSubjectsForDepartment,
  gradeBoundaries,
  getGradeLetter,
  getDepartmentStats,
  getSubjectPerformanceData
} from "../../utils/dashboard/dataHelpers";

function TeacherDashboard() {
  const { currentUser } = useSelector((state) => state.auth);
  const isHydrated = useSelector(selectIsHydrated);
  const studentsFromRedux = useSelector(selectStudents);
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
    if (isHydrated && (!currentUser || currentUser.role !== "teacher")) {
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
  if (!currentUser || currentUser.role !== "teacher") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecting...</p>
        </div>
      </div>
    );
  }

  // Use enhanced student data
  const studentsData = enhanceStudentData(studentsFromRedux);
  
  // Get unique departments from actual student data
  const departments = [...new Set(studentsData.map(s => s.department))];
  
  // Get processed data using utility functions
  const departmentStats = getDepartmentStats(studentsData, departments);
  const subjectPerformanceData = getSubjectPerformanceData(studentsData, departments);

  // Handle leave approval
  const handleLeaveApproval = (studentId, action) => {
    if (action === 'approve') {
      showSuccess(`Leave request approved for student ${studentId}`);
    } else {
      showError(`Leave request rejected for student ${studentId}`);
    }
  };

  const renderDashboardContent = () => {
    if (activeItem === 'dashboard') {
      return (
        <DashboardOverview
          currentUser={currentUser}
          studentsData={studentsData}
          departments={departments}
          getDepartmentStats={() => departmentStats}
        />
      );
    }

    if (activeItem === 'attendance') {
      return (
        <AttendanceModule
          studentsData={studentsData}
          departments={departments}
        />
      );
    }

    if (activeItem === 'classes') {
      return (
        <ClassesModule
          departments={departments}
          getDepartmentStats={() => departmentStats}
          subjectPerformanceData={subjectPerformanceData}
          getGradeLetter={getGradeLetter}
        />
      );
    }

    if (activeItem === 'students') {
      return (
        <StudentsModule
          studentsData={studentsData}
          departments={departments}
          getGradeLetter={getGradeLetter}
        />
      );
    }

    if (activeItem === 'assignments') {
      return (
        <AssignmentsModule
          studentsData={studentsData}
          departments={departments}
          subjectPerformanceData={subjectPerformanceData}
        />
      );
    }

    if (activeItem === 'grades') {
      return (
        <GradesModule
          studentsData={studentsData}
          departments={departments}
          gradeBoundaries={gradeBoundaries}
          getGradeLetter={getGradeLetter}
        />
      );
    }

    if (activeItem === 'leaves') {
      return (
        <LeavesModule
          studentsData={studentsData}
          departments={departments}
          handleLeaveApproval={handleLeaveApproval}
        />
      );
    }

    if (activeItem === 'schedule') {
      return (
        <ScheduleModule
          subjectPerformanceData={subjectPerformanceData}
        />
      );
    }

    return (
      <div className="rounded-lg p-3 bg-white border border-gray-200">
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
      <TeacherSidebar 
        activeItem={activeItem} 
        setActiveItem={setActiveItem}
        isOpen={isSidebarOpen}
        isMobile={isMobile}
        onClose={closeSidebar}
        onToggle={handleToggleCollapse}
        isCollapsed={isCollapsed}
      />
      
      {/* Header */}
      <TeacherHeader 
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

export default TeacherDashboard;