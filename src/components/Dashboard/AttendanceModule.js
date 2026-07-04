export default function AttendanceModule({ 
  studentsData, 
  departments
}) {
  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="rounded-lg p-6 mb-6 bg-white border-b border-gray-200">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Attendance Management</h1>
        <p className="text-gray-600">Monitor and track student attendance across all departments</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="rounded-lg p-4 bg-white border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Overall Attendance</p>
              <p className="text-2xl font-bold text-green-600">
                {(studentsData.reduce((sum, s) => sum + (s.attendance || 0), 0) / studentsData.length).toFixed(1)}%
              </p>
              <p className="text-xs text-gray-500">All departments</p>
            </div>
            <div className="text-2xl">✅</div>
          </div>
        </div>
        
        <div className="rounded-lg p-4 bg-white border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Critical Cases</p>
              <p className="text-2xl font-bold text-red-600">
                {studentsData.filter(s => (s.attendance || 0) < 75).length}
              </p>
              <p className="text-xs text-gray-500">Below 75%</p>
            </div>
            <div className="text-2xl">⚠️</div>
          </div>
        </div>
        
        <div className="rounded-lg p-4 bg-white border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Good Attendance</p>
              <p className="text-2xl font-bold text-blue-600">
                {studentsData.filter(s => (s.attendance || 0) >= 85).length}
              </p>
              <p className="text-xs text-gray-500">Above 85%</p>
            </div>
            <div className="text-2xl">👥</div>
          </div>
        </div>
        
        <div className="rounded-lg p-4 bg-white border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Departments</p>
              <p className="text-2xl font-bold text-purple-600">{departments.length}</p>
              <p className="text-xs text-gray-500">Being monitored</p>
            </div>
            <div className="text-2xl">🏢</div>
          </div>
        </div>
      </div>

      {/* Department Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        {departments.map((dept, index) => {
          const deptStudents = studentsData.filter(s => s.department === dept);
          const avgAttendance = deptStudents.reduce((sum, s) => sum + (s.attendance || 0), 0) / deptStudents.length || 0;
          const criticalCount = deptStudents.filter(s => (s.attendance || 0) < 75).length;
          const colors = ['blue', 'green', 'purple', 'yellow', 'red'];
          const color = colors[index % colors.length];
          
          return (
            <div key={dept} className="rounded-lg p-4 bg-white border border-gray-200">
              <div className="text-center">
                <h3 className="font-semibold text-gray-900 mb-1">{dept}</h3>
                <p className={`text-2xl font-bold text-${color}-600`}>{avgAttendance.toFixed(1)}%</p>
                <p className="text-xs text-gray-500">{criticalCount} critical</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Student Attendance Table */}
      <div className="rounded-lg p-6 bg-white border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Student Attendance Overview</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Attendance
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {studentsData.slice(0, 10).map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-3 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{student.name}</div>
                      <div className="text-sm text-gray-500">{student.registrationNumber}</div>
                    </div>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.department}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2 max-w-20">
                        <div 
                          className={`h-2 rounded-full ${
                            (student.attendance || 0) >= 85 ? 'bg-green-500' :
                            (student.attendance || 0) >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                        >
                          <div className="w-full h-full" style={{ width: `${student.attendance || 0}%` }}></div>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {student.attendance || 0}%
                      </span>
                    </div>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      (student.attendance || 0) >= 85 
                        ? 'bg-green-100 text-green-800' 
                        : (student.attendance || 0) >= 75 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {(student.attendance || 0) >= 85 ? 'Good' : (student.attendance || 0) >= 75 ? 'Warning' : 'Critical'}
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