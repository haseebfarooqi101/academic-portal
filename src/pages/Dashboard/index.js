import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { selectStudents, selectTeachers, selectIsHydrated, approveStudent, rejectStudent, deleteUser } from "../../redux/slices/authSlice";
import { useToast } from "../../hooks/useToast";
import ApprovalPending from "../../components/ApprovalPending";
import DashboardLayout from "../../components/UnifiedDashboard/DashboardLayout";
import { 
  LayoutDashboard, BookOpen, BarChart2, CalendarCheck, FileText,
  ClipboardList, School, Users, PenLine, GraduationCap, CalendarDays,
  UserCheck, ShieldCheck
} from "lucide-react";

// Import all dashboard modules
import DashboardOverview from "../../components/Dashboard/DashboardOverview";
import AttendanceModule from "../../components/Dashboard/AttendanceModule";
import ClassesModule from "../../components/Dashboard/ClassesModule";
import StudentsModule from "../../components/Dashboard/StudentsModule";
import AssignmentsModule from "../../components/Dashboard/AssignmentsModule";
import GradesModule from "../../components/Dashboard/GradesModule";
import LeavesModule from "../../components/Dashboard/LeavesModule";
import ScheduleModule from "../../components/Dashboard/ScheduleModule";

// Import student-specific modules
import StudentOverview from "../../components/StudentDashboard/StudentOverview";
import CoursesModule from "../../components/StudentDashboard/CoursesModule";
import StudentGradesModule from "../../components/StudentDashboard/GradesModule";
import StudentAttendanceModule from "../../components/StudentDashboard/AttendanceModule";
import StudentLeavesModule from "../../components/StudentDashboard/LeavesModule";

// Import admin-specific modules
import AdminOverview from "../../components/AdminDashboard/AdminOverview";
import AdminStudentsModule from "../../components/AdminDashboard/StudentsModule";
import TeachersModule from "../../components/AdminDashboard/TeachersModule";
import ApprovalsModule from "../../components/AdminDashboard/ApprovalsModule";

// Import utility functions
import {
  enhanceStudentData,
  getDepartmentStats,
  getSubjectPerformanceData,
  getGradeLetter
} from "../../utils/dashboard/dataHelpers";

export default function Dashboard() {
  const { currentUser } = useSelector((state) => state.auth);
  const isHydrated = useSelector(selectIsHydrated);
  const studentsFromRedux = useSelector(selectStudents);
  const teachers = useSelector(selectTeachers);
  const dispatch = useDispatch();
  const router = useRouter();
  const [activeItem, setActiveItem] = useState('dashboard');
  const { showSuccess, showError } = useToast();

  useEffect(() => {
    // Only redirect after hydration is complete
    if (isHydrated && !currentUser) {
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
  if (!currentUser) {
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
  if (currentUser.role === 'student' && currentUser.status !== 'approved') {
    return <ApprovalPending currentUser={currentUser} />;
  }

  // Get menu items based on user role
  const getMenuItems = () => {
    switch (currentUser.role) {
      case 'teacher':
        return [
          { id: 'dashboard',   label: 'Dashboard',   icon: <LayoutDashboard size={18} strokeWidth={1.75} /> },
          { id: 'attendance',  label: 'Attendance',  icon: <ClipboardList   size={18} strokeWidth={1.75} /> },
          { id: 'classes',     label: 'Classes',     icon: <School          size={18} strokeWidth={1.75} /> },
          { id: 'students',    label: 'Students',    icon: <Users           size={18} strokeWidth={1.75} /> },
          { id: 'assignments', label: 'Assignments', icon: <PenLine         size={18} strokeWidth={1.75} /> },
          { id: 'grades',      label: 'Grades',      icon: <BarChart2       size={18} strokeWidth={1.75} /> },
          { id: 'leaves',      label: 'Leaves',      icon: <FileText        size={18} strokeWidth={1.75} /> },
          { id: 'schedule',    label: 'Schedule',    icon: <CalendarDays    size={18} strokeWidth={1.75} /> },
        ];
      case 'student':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} strokeWidth={1.75} /> },
          { id: 'courses', label: 'Courses', icon: <BookOpen size={18} strokeWidth={1.75} /> },
          { id: 'grades', label: 'Grades', icon: <BarChart2 size={18} strokeWidth={1.75} /> },
          { id: 'attendance', label: 'Attendance', icon: <CalendarCheck size={18} strokeWidth={1.75} /> },
          { id: 'leaves', label: 'Leaves', icon: <FileText size={18} strokeWidth={1.75} /> },
        ];
      case 'admin':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} strokeWidth={1.75} /> },
          { id: 'students',  label: 'Students',  icon: <GraduationCap   size={18} strokeWidth={1.75} /> },
          { id: 'teachers',  label: 'Teachers',  icon: <UserCheck       size={18} strokeWidth={1.75} /> },
          { id: 'approvals', label: 'Approvals', icon: <ShieldCheck     size={18} strokeWidth={1.75} /> },
        ];
      default:
        return [];
    }
  };

  // Enhanced student data for teacher dashboard
  const studentsData = enhanceStudentData(studentsFromRedux);
  const departments = [...new Set(studentsData.map(s => s.department))];
  const departmentStats = getDepartmentStats(studentsData, departments);
  const subjectPerformanceData = getSubjectPerformanceData(studentsData, departments);

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

  // Admin dashboard stats
  const pendingStudents = studentsFromRedux.filter(student => student.status === 'pending').length;
  const approvedStudents = studentsFromRedux.filter(student => student.status === 'approved').length;

  // Handle leave approval for teacher dashboard
  const handleLeaveApproval = (studentId, action) => {
    if (action === 'approve') {
      showSuccess(`Leave request approved for student ${studentId}`);
    } else {
      showError(`Leave request rejected for student ${studentId}`);
    }
  };

  // Handle student approval actions for admin dashboard
  const handleApproveStudent = async (studentId, studentName) => {
    try {
      const response = await fetch('/api/students/approve', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ studentId }),
      });

      if (response.ok) {
        dispatch(approveStudent(studentId));
        showSuccess(`${studentName} has been approved successfully!`);
      } else {
        const error = await response.json();
        showError(`Failed to approve student: ${error.message}`);
      }
    } catch (error) {
      console.error('Error approving student:', error);
      showError('Failed to approve student. Please try again.');
    }
  };

  const handleRejectStudent = async (studentId, studentName) => {
    try {
      const response = await fetch('/api/students/reject', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ studentId }),
      });

      if (response.ok) {
        dispatch(rejectStudent(studentId));
        showError(`${studentName}'s application has been rejected.`);
      } else {
        const error = await response.json();
        showError(`Failed to reject student: ${error.message}`);
      }
    } catch (error) {
      console.error('Error rejecting student:', error);
      showError('Failed to reject student. Please try again.');
    }
  };

  const handleDeleteUser = (userId, userName) => {
    if (window.confirm(`Are you sure you want to delete ${userName}?`)) {
      dispatch(deleteUser(userId));
      showSuccess(`${userName} has been deleted successfully!`);
    }
  };

  // Render dashboard content based on user role and active item
  const renderDashboardContent = () => {
    if (currentUser.role === 'teacher') {
      switch (activeItem) {
        case 'dashboard':
          return (
            <DashboardOverview
              currentUser={currentUser}
              studentsData={studentsData}
              departments={departments}
              getDepartmentStats={() => departmentStats}
            />
          );
        case 'attendance':
          return <AttendanceModule studentsData={studentsData} departments={departments} />;
        case 'classes':
          return (
            <ClassesModule
              departments={departments}
           
              getDepartmentStats={() => departmentStats}
              subjectPerformanceData={subjectPerformanceData}
              getGradeLetter={getGradeLetter}
            />
          );
        case 'students':
          return (
            <StudentsModule
              studentsData={studentsData}
              departments={departments}
              getGradeLetter={getGradeLetter}
            />
          );
        case 'assignments':
          return (
            <AssignmentsModule
              studentsData={studentsData}
              departments={departments}
              subjectPerformanceData={subjectPerformanceData}
            />
          );
        case 'grades':
          return (
            <GradesModule
              studentsData={studentsData}
              departments={departments}
              getGradeLetter={getGradeLetter}
            />
          );
        case 'leaves':
          return (
            <LeavesModule
              studentsData={studentsData}
              departments={departments}
              handleLeaveApproval={handleLeaveApproval}
            />
          );
        case 'schedule':
          return <ScheduleModule subjectPerformanceData={subjectPerformanceData} />;
        default:
          return <div className="p-6">Teacher module under development</div>;
      }
    }

    if (currentUser.role === 'student') {
      switch (activeItem) {
        case 'dashboard':
          return (
            <StudentOverview 
              currentUser={currentUser}
              gradeData={gradeData}
              attendanceData={attendanceData}
            />
          );
        case 'courses':
          return <CoursesModule />;
        case 'grades':
          return <StudentGradesModule />;
        case 'attendance':
          return <StudentAttendanceModule />;
        case 'leaves':
          return <StudentLeavesModule showSuccess={showSuccess} showError={showError} />;
        default:
          return <div className="p-6">Student module under development</div>;
      }
    }

    if (currentUser.role === 'admin') {
      switch (activeItem) {
        case 'dashboard':
          return (
            <AdminOverview
              currentUser={currentUser}
              students={studentsFromRedux}
              teachers={teachers}
              pendingStudents={pendingStudents}
              approvedStudents={approvedStudents}
              setActiveItem={setActiveItem}
            />
          );
        case 'students':
          return <AdminStudentsModule students={studentsFromRedux} handleDeleteUser={handleDeleteUser} />;
        case 'teachers':
          return <TeachersModule teachers={teachers} handleDeleteUser={handleDeleteUser} />;
        case 'approvals':
          return (
            <ApprovalsModule 
              students={studentsFromRedux}
              handleApproveStudent={handleApproveStudent}
              handleRejectStudent={handleRejectStudent}
            />
          );
        default:
          return <div className="p-6">Admin module under development</div>;
      }
    }

    return <div className="p-6">Access denied</div>;
  };

  return (
    <DashboardLayout
      currentUser={currentUser}
      menuItems={getMenuItems()}
      activeItem={activeItem}
      setActiveItem={setActiveItem}
    >
      {renderDashboardContent()}
    </DashboardLayout>
  );
}
