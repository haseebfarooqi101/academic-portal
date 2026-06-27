import DashboardCard from "../DashboardCard";

export default function DashboardOverview({ 
  currentUser, 
  studentsData, 
  departments, 
  getDepartmentStats
}) {
  // Prepare chart data
  const departmentStats = getDepartmentStats();
  const chartData = Object.entries(departmentStats).map(([dept, stats]) => ({
    name: dept,
    students: stats.totalStudents,
    avgGrade: Math.round(stats.averageGrade),
    attendance: Math.round(stats.averageAttendance)
  }));

  return (
    <div className="p-4 sm:p-6">
      {/* Welcome Card */}
      <div className="rounded-lg p-6 mb-6 bg-white border border-gray-200">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
          Welcome back, {currentUser?.name || 'Teacher'}!
        </h1>
        <div className="space-y-1 text-sm sm:text-base text-gray-600">
          <p>Employee ID: {currentUser?.employeeId || 'Not available'}</p>
          <p>Department: {currentUser?.department || 'Not specified'}</p>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <DashboardCard
          title="Total Students"
          value={studentsData.length}
          subtitle="Enrolled"
          color="blue"
          icon="👥"
        />
        <DashboardCard
          title="Departments"
          value={departments.length}
          subtitle="Active"
          color="green"
          icon="🏢"
        />
        <DashboardCard
          title="Pending Leaves"
          value={studentsData.reduce((sum, s) => sum + (s.leaves ? s.leaves.filter(l => l.status === 'pending').length : 0), 0)}
          subtitle="Awaiting approval"
          color="yellow"
          icon="📝"
        />
        <DashboardCard
          title="Avg Grade"
          value={`${(studentsData.reduce((sum, s) => sum + (s.grade || 0), 0) / studentsData.length).toFixed(1)}%`}
          subtitle="Across all students"
          color="purple"
          icon="📊"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6 mb-6">
        {/* Department Performance Chart */}
        <div className="rounded-lg p-3 sm:p-4 lg:p-6 bg-white border border-gray-200">
          <h2 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Department Performance</h2>
          <div className="flex justify-between items-end h-32 sm:h-48 lg:h-64 space-x-1 sm:space-x-2">
            {chartData.map((dept) => (
              <div key={dept.name} className="flex flex-col items-center flex-1 min-w-0">
                <div className="text-xs text-gray-600 mb-1 sm:mb-2 text-center truncate w-full">
                  {dept.name.length > 8 ? dept.name.substring(0, 6) + '...' : dept.name}
                </div>
                <div className="flex flex-col items-center justify-end h-20 sm:h-32 lg:h-48 w-full">
                  <div className="text-xs font-medium text-purple-600 mb-1">
                    {dept.avgGrade}%
                  </div>
                  <div 
                    className="bg-purple-600 rounded-t w-4 sm:w-6 lg:w-8 flex items-end justify-center"
                    style={{ height: `${Math.max(dept.avgGrade * 1.5, 8)}px` }}
                  >
                  </div>
                </div>
                <div className="text-xs text-gray-500 mt-1 sm:mt-2 text-center">
                  {dept.students}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Department Attendance Chart */}
        <div className="rounded-lg p-3 sm:p-4 lg:p-6 bg-white border border-gray-200">
          <h2 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Department Attendance</h2>
          <div className="flex justify-between items-end h-32 sm:h-48 lg:h-64 space-x-1 sm:space-x-2">
            {chartData.map((dept) => (
              <div key={dept.name} className="flex flex-col items-center flex-1 min-w-0">
                <div className="text-xs text-gray-600 mb-1 sm:mb-2 text-center truncate w-full">
                  {dept.name.length > 8 ? dept.name.substring(0, 6) + '...' : dept.name}
                </div>
                <div className="flex flex-col items-center justify-end h-20 sm:h-32 lg:h-48 w-full">
                  <div className="text-xs font-medium text-white mb-1">
                    {dept.attendance}%
                  </div>
                  <div 
                    className={`rounded-t w-4 sm:w-6 lg:w-8 flex items-end justify-center ${
                      dept.attendance >= 85 ? 'bg-green-500' :
                      dept.attendance >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ height: `${Math.max(dept.attendance * 1.5, 8)}px` }}
                  >
                  </div>
                </div>
                <div className="text-xs text-gray-500 mt-1 sm:mt-2 text-center">
                  {dept.students}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="rounded-lg p-4 sm:p-6 bg-white border border-gray-200">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Recent Activity</h2>
        <div className="space-y-2 sm:space-y-3">
          <div className="flex items-start space-x-2 sm:space-x-3 p-2 sm:p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 shrink-0"></div>
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm font-medium text-gray-900">Assignment submitted</p>
              <p className="text-xs text-gray-500">John Doe submitted Math homework - 2 hours ago</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-2 sm:space-x-3 p-2 sm:p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 shrink-0"></div>
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm font-medium text-gray-900">Class completed</p>
              <p className="text-xs text-gray-500">Algebra 101 - Room 204 - 4 hours ago</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-2 sm:space-x-3 p-2 sm:p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 shrink-0"></div>
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm font-medium text-gray-900">Grade updated</p>
              <p className="text-xs text-gray-500">Calculus Quiz grades published - 6 hours ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}