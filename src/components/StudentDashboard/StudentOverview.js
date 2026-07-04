import DashboardCard from "../DashboardCard";

export default function StudentOverview({ currentUser, gradeData, attendanceData }) {
  
  return (
    <div className="p-4 sm:p-6">
      {/* Welcome Section */}
      <div className="rounded-lg p-6 mb-6 bg-white border border-gray-200">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
          Welcome back, {currentUser?.name || 'Student'}!
        </h2>
        <div className="space-y-1 text-sm sm:text-base text-gray-600">
          <p>Registration: {currentUser?.registrationNumber || 'Not available'}</p>
          <p>Department: {currentUser?.department || 'Not specified'}</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <DashboardCard
          title="Current GPA"
          value="3.7"
          subtitle="Out of 4.0"
          color="blue"
          icon="📊"
          trend={{ positive: true, value: '+0.2', period: 'vs last semester' }}
        />
        <DashboardCard
          title="Attendance"
          value="92%"
          subtitle="This semester"
          color="green"
          icon="✅"
          trend={{ positive: true, value: '+3%', period: 'vs last month' }}
        />
        <DashboardCard
          title="Assignments"
          value="8/10"
          subtitle="Completed"
          color="yellow"
          icon="📝"
        />
        <DashboardCard
          title="Credits"
          value="18"
          subtitle="This semester"
          color="purple"
          icon="🎓"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6 mb-6">
        {/* Subject Grades Chart */}
        <div className="rounded-lg p-3 sm:p-4 lg:p-6 bg-white border border-gray-200">
          <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Subject Grades</h3>
          <div className="flex justify-between items-end h-32 sm:h-48 lg:h-64 space-x-1 sm:space-x-2">
            {gradeData.map((subject) => (
              <div key={subject.name} className="flex flex-col items-center flex-1 min-w-0">
                <div className="text-xs text-gray-600 mb-1 sm:mb-2 text-center truncate w-full">
                  {subject.name.length > 8 ? subject.name.substring(0, 6) + '...' : subject.name}
                </div>
                <div className="flex flex-col items-center justify-end h-20 sm:h-32 lg:h-48 w-full">
                  <div className="text-xs font-medium text-purple-600 mb-1">
                    {subject.value}%
                  </div>
                  <div 
                    className="bg-purple-600 rounded-t w-4 sm:w-6 lg:w-8 flex items-end justify-center"
                    style={{ height: `${Math.max(subject.value * 1.5, 8)}px` }}
                  >
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Attendance Trend Chart */}
        <div className="rounded-lg p-3 sm:p-4 lg:p-6 bg-white border border-gray-200">
          <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Attendance Trend</h3>
          <div className="flex justify-between items-end h-32 sm:h-48 lg:h-64 space-x-1 sm:space-x-2">
            {attendanceData.map((month) => (
              <div key={month.name} className="flex flex-col items-center flex-1 min-w-0">
                <div className="text-xs text-gray-600 mb-1 sm:mb-2 text-center truncate w-full">
                  {month.name.length > 8 ? month.name.substring(0, 6) + '...' : month.name}
                </div>
                <div className="flex flex-col items-center justify-end h-20 sm:h-32 lg:h-48 w-full">
                  <div className="text-xs font-medium text-white mb-1">
                    {month.value}%
                  </div>
                  <div 
                    className={`rounded-t w-4 sm:w-6 lg:w-8 flex items-end justify-center ${
                      month.value >= 90 ? 'bg-green-500' :
                      month.value >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ height: `${Math.max(month.value * 1.5, 8)}px` }}
                  >
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="rounded-lg p-4 sm:p-6 bg-white border border-gray-200">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Recent Activity</h3>
        <div className="space-y-2 sm:space-y-3">
          <div className="flex items-start space-x-2 sm:space-x-3 p-2 sm:p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 shrink-0"></div>
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm font-medium text-gray-900">Assignment submitted</p>
              <p className="text-xs text-gray-500">Physics Lab Report - 2 hours ago</p>
            </div>
          </div>
          <div className="flex items-start space-x-2 sm:space-x-3 p-2 sm:p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 shrink-0"></div>
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm font-medium text-gray-900">Grade received</p>
              <p className="text-xs text-gray-500">Math Quiz: A- (88%) - 1 day ago</p>
            </div>
          </div>
          <div className="flex items-start space-x-2 sm:space-x-3 p-2 sm:p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 shrink-0"></div>
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm font-medium text-gray-900">Class attended</p>
              <p className="text-xs text-gray-500">Chemistry Lecture - 2 days ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}