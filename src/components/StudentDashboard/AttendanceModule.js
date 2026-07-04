import DashboardCard from "../DashboardCard";

export default function AttendanceModule() {
  const attendanceData = [
    { 
      subject: 'Advanced Mathematics',
      present: 28,
      total: 30,
      percentage: 93.3,
      status: 'Good'
    },
    { 
      subject: 'Physics II',
      present: 25,
      total: 28,
      percentage: 89.3,
      status: 'Good'
    },
    { 
      subject: 'Organic Chemistry',
      present: 22,
      total: 26,
      percentage: 84.6,
      status: 'Warning'
    },
    { 
      subject: 'English Literature',
      present: 26,
      total: 28,
      percentage: 92.9,
      status: 'Good'
    },
    { 
      subject: 'World History',
      present: 24,
      total: 27,
      percentage: 88.9,
      status: 'Good'
    }
  ];

  const overallAttendance = attendanceData.reduce((sum, item) => sum + item.percentage, 0) / attendanceData.length;

  const monthlyAttendance = [
    { name: 'Jan', value: 95 },
    { name: 'Feb', value: 88 },
    { name: 'Mar', value: 92 },
    { name: 'Apr', value: 85 },
    { name: 'May', value: 90 },
    { name: 'Jun', value: 87 }
  ];

  return (
    <div className="p-4 sm:p-6">
      {/* Attendance Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <DashboardCard
          title="Overall Attendance"
          value={`${overallAttendance.toFixed(1)}%`}
          subtitle="This semester"
          color="green"
          icon="✅"
          trend={{ positive: true, value: '+2%', period: 'vs last semester' }}
        />
        <DashboardCard
          title="Classes Attended"
          value="125"
          subtitle="Out of 139"
          color="blue"
          icon="📚"
        />
        <DashboardCard
          title="Perfect Attendance"
          value="3"
          subtitle="Subjects"
          color="purple"
          icon="🏆"
        />
        <DashboardCard
          title="Warning Subjects"
          value="1"
          subtitle="Below 85%"
          color="yellow"
          icon="⚠️"
        />
      </div>

      {/* Monthly Trend */}
      <div className="rounded-lg p-4 lg:p-6 mb-6 bg-white border border-gray-200">
        <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-4">Monthly Attendance Trend</h3>
        <div className="flex justify-between items-end h-48 lg:h-64 space-x-1 lg:space-x-2">
          {monthlyAttendance.map((month) => (
            <div key={month.name} className="flex flex-col items-center flex-1">
              <div className="text-xs text-gray-600 mb-2 text-center truncate w-full">
                {month.name}
              </div>
              <div className="flex flex-col items-center justify-end h-32 lg:h-48 w-full">
                <div className="text-xs font-medium text-white mb-1">
                  {month.value}%
                </div>
                <div 
                  className={`rounded-t w-6 lg:w-8 flex items-end justify-center ${
                    month.value >= 90 ? 'bg-green-500' :
                    month.value >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                >
                  <div className="w-full" style={{ height: `${Math.max(month.value * 2, 10)}px` }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Subject-wise Attendance */}
      <div className="rounded-lg p-6 bg-white border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Subject-wise Attendance</h3>
        <div className="w-full overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Present</th>
                <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Percentage</th>
                <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {attendanceData.map((item, index) => (
                <tr key={index}>
                  <td className="px-3 lg:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.subject}</td>
                  <td className="px-3 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.present}</td>
                  <td className="px-3 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.total}</td>
                  <td className="px-3 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.percentage.toFixed(1)}%</td>
                  <td className="px-3 lg:px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      item.status === 'Good' ? 'bg-green-100 text-green-800' :
                      item.status === 'Warning' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {item.status}
                    </span>
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