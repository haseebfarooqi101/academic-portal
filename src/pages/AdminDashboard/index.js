import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import AdminHeader from "../../components/AdminHeader";
import DashboardCard from "../../components/DashboardCard";
import AdminChart from "../../components/AdminChart";
import { selectStudents, selectTeachers, selectAllUsers, approveStudent, rejectStudent, deleteUser, selectIsHydrated } from "../../redux/slices/authSlice";
import { useToast } from "../../hooks/useToast";
import { useSidebar } from "../../hooks/useSidebar";
import Toast from "../../components/Toast";

// Import modular components
import AdminOverview from "../../components/AdminDashboard/AdminOverview";

export default function AdminDashboard() {
  const { currentUser } = useSelector((state) => state.auth);
  const isHydrated = useSelector(selectIsHydrated);
  const students = useSelector(selectStudents);
  const teachers = useSelector(selectTeachers);
  const allUsers = useSelector(selectAllUsers);
  const dispatch = useDispatch();
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
    if (isHydrated && (!currentUser || currentUser.role !== "admin")) {
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
  if (!currentUser || currentUser.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecting...</p>
        </div>
      </div>
    );
  }

  // Sample data for charts
  const monthlyRegistrations = [
    { name: 'Jan', value: 12 },
    { name: 'Feb', value: 19 },
    { name: 'Mar', value: 15 },
    { name: 'Apr', value: 25 },
    { name: 'May', value: 22 },
    { name: 'Jun', value: 30 }
  ];

  const departmentStats = [
    { name: 'Computer Science', value: 45, color: '#8A36D0' },
    { name: 'Mathematics', value: 32, color: '#3B82F6' },
    { name: 'Physics', value: 28, color: '#10B981' },
    { name: 'Chemistry', value: 35, color: '#F59E0B' }
  ];

  // Calculate stats
  const pendingStudents = students.filter(student => student.status === 'pending').length;
  const approvedStudents = students.filter(student => student.status === 'approved').length;
  const totalTeachers = teachers.length;
  const totalUsers = allUsers.length;

  // Handle student approval actions
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
        const result = await response.json();
        // Update Redux store with the approved student
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
        const result = await response.json();
        // Update Redux store with the rejected student
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

  const renderDashboardContent = () => {
    if (activeItem === 'dashboard') {
      return (
        <AdminOverview
          currentUser={currentUser}
          students={students}
          teachers={teachers}
          pendingStudents={pendingStudents}
          approvedStudents={approvedStudents}
          setActiveItem={setActiveItem}
        />
      );
    }

    if (activeItem === 'students') {
      return (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Student Management</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {students.map((student) => (
                    <tr key={student.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {student.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {student.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {student.department || 'Not specified'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          student.status === 'approved' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {student.status || 'pending'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-purple-600 hover:text-purple-900 mr-3">Edit</button>
                        <button 
                          onClick={() => handleDeleteUser(student.id, student.name)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    }

    if (activeItem === 'teachers') {
      return (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Teacher Management</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {teachers.map((teacher) => (
                    <tr key={teacher.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {teacher.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {teacher.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {teacher.department || 'Not specified'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-purple-600 hover:text-purple-900 mr-3">Edit</button>
                        <button 
                          onClick={() => handleDeleteUser(teacher.id, teacher.name)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    }

    if (activeItem === 'approvals') {
      const pendingStudentsList = students.filter(student => student.status === 'pending');
      
      return (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Pending Student Approvals</h3>
            {pendingStudentsList.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-gray-400 text-4xl mb-4">✅</div>
                <p className="text-gray-500">No pending approvals</p>
              </div>
            ) : (
              <div className="space-y-4">
                {pendingStudentsList.map((student) => (
                  <div key={student.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="text-lg font-medium text-gray-900">{student.name}</h4>
                        <p className="text-sm text-gray-500">{student.email}</p>
                        <p className="text-sm text-gray-500">Department: {student.department || 'Not specified'}</p>
                        <p className="text-sm text-gray-500">Registration: {student.registrationNumber || 'Not provided'}</p>
                      </div>
                      <div className="flex space-x-3">
                        <button 
                          onClick={() => handleApproveStudent(student.id, student.name)}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                          Approve
                        </button>
                        <button 
                          onClick={() => handleRejectStudent(student.id, student.name)}
                          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      );
    }

    // Default content for other menu items
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

    <div className="min-h-screen bg-white flex">
     <div className="border border-black"> 
      {/* Toast */}
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={hideToast}
        />
      )}</div>
      
      {/* Sidebar */}
      <div className="border border-black">
      <AdminSidebar 
        activeItem={activeItem} 
        setActiveItem={setActiveItem}
        isOpen={isSidebarOpen}
        isMobile={isMobile}
        onClose={closeSidebar}
        onToggle={handleToggleCollapse}
        isCollapsed={isCollapsed}
      />
      </div>

      

      {/* Main Content */}
      <main 
        className={`transition-all duration-300 ease-in-out overflow-y-auto pt-3 border border-red-900 ${
          isMobile ? '' : isSidebarOpen ? 'ml-60' : ''
        }`}
        
      >
        <div className="border border-black">
      
      <AdminHeader 
        activeItem={activeItem} 
        setActiveItem={setActiveItem}
        onToggleSidebar={toggleSidebar}
        isMobile={isMobile}
        isSidebarOpen={isSidebarOpen}
      />
      </div>
        {/* {renderDashboardContent()} */}
      </main>
    </div>
  );
}