import DashboardCard from "../DashboardCard";
import AdminChart from "../AdminChart";

export default function AdminOverview({ 
  currentUser, 
  students, 
  teachers, 
  pendingStudents, 
  approvedStudents, 
  setActiveItem 
}) {
  return (
    <div className="p-4 sm:p-6">
      {/* Welcome Section */}
      <div className="rounded-lg p-6 mb-6 bg-white border border-gray-200">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
          Welcome back, {currentUser?.name || 'Admin'}!
        </h2>
        <div className="space-y-1 text-sm sm:text-base text-gray-600">
          <p>Employee ID: {currentUser?.employeeId || 'Not available'}</p>
          <p>Role: System Administrator</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <DashboardCard
          title="Total Students"
          value={students.length}
          subtitle="Registered students"
          color="blue"
          icon="👥"
          trend={{ positive: true, value: '+12', period: 'this month' }}
        />
        <DashboardCard
          title="Total Teachers"
          value={teachers.length}
          subtitle="Active faculty"
          color="green"
          icon="👨‍🏫"
          trend={{ positive: true, value: '+3', period: 'this month' }}
        />
        <DashboardCard
          title="Pending Approvals"
          value={pendingStudents}
          subtitle="Student registrations"
          color="yellow"
          icon="⏳"
          onClick={() => setActiveItem('approvals')}
        />
        <DashboardCard
          title="Approved Students"
          value={approvedStudents}
          subtitle="Active students"
          color="purple"
          icon="✅"
          trend={{ positive: true, value: '+8', period: 'this week' }}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6 mb-6">
        <div className="rounded-lg p-3 sm:p-4 lg:p-6 bg-white border border-gray-200">
          <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Student Registrations</h3>
          <AdminChart
            type="line"
            data={[
              { name: 'Jan', value: 12 },
              { name: 'Feb', value: 19 },
              { name: 'Mar', value: 15 },
              { name: 'Apr', value: 22 },
              { name: 'May', value: 18 },
              { name: 'Jun', value: 25 }
            ]}
            height={250}
            color="#8A36D0"
          />
        </div>
        <div className="rounded-lg p-3 sm:p-4 lg:p-6 bg-white border border-gray-200">
          <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Department Distribution</h3>
          <AdminChart
            type="bar"
            data={[
              { name: 'CS', value: 45, color: '#8A36D0' },
              { name: 'EE', value: 32, color: '#10B981' },
              { name: 'ME', value: 28, color: '#F59E0B' },
              { name: 'Math', value: 15, color: '#EF4444' },
              { name: 'Physics', value: 12, color: '#3B82F6' }
            ]}
            height={250}
          />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="rounded-lg p-4 sm:p-6 bg-white border border-gray-200">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Recent Activity</h3>
        <div className="space-y-2 sm:space-y-3">
          <div className="flex items-start space-x-2 sm:space-x-3 p-2 sm:p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 shrink-0"></div>
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm font-medium text-gray-900">New student registration</p>
              <p className="text-xs text-gray-500">John Doe - Computer Science - 2 hours ago</p>
            </div>
          </div>
          <div className="flex items-start space-x-2 sm:space-x-3 p-2 sm:p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 shrink-0"></div>
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm font-medium text-gray-900">Teacher approved</p>
              <p className="text-xs text-gray-500">Dr. Smith - Mathematics Department - 4 hours ago</p>
            </div>
          </div>
          <div className="flex items-start space-x-2 sm:space-x-3 p-2 sm:p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 shrink-0"></div>
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm font-medium text-gray-900">System update</p>
              <p className="text-xs text-gray-500">Database backup completed - 6 hours ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}