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
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome back, {currentUser?.name || 'Admin'}!
        </h2>
        <p className="text-gray-600">
          Employee ID: {currentUser?.employeeId || 'Not available'}
        </p>
        <p className="text-gray-600">
          Role: System Administrator
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
          value={pendingStudents.length}
          subtitle="Student registrations"
          color="yellow"
          icon="⏳"
          onClick={() => setActiveItem('students')}
        />
        <DashboardCard
          title="Approved Students"
          value={approvedStudents.length}
          subtitle="Active students"
          color="purple"
          icon="✅"
          trend={{ positive: true, value: '+8', period: 'this week' }}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Student Registrations</h3>
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
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Distribution</h3>
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
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">New student registration</p>
              <p className="text-xs text-gray-500">John Doe - Computer Science - 2 hours ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Teacher approved</p>
              <p className="text-xs text-gray-500">Dr. Smith - Mathematics Department - 4 hours ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">System update</p>
              <p className="text-xs text-gray-500">Database backup completed - 6 hours ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}