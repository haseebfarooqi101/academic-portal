export default function StudentsModule({ 
  studentsData, 
  departments, 
  getGradeLetter
}) {
  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="rounded-lg p-6 mb-6 bg-white border-b border-gray-200">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Students Management</h1>
        <p className="text-gray-600">Manage and monitor students across all departments</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="rounded-lg p-4 bg-white border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Students</p>
              <p className="text-2xl font-bold text-blue-600">{studentsData.length}</p>
              <p className="text-xs text-gray-500">All departments</p>
            </div>
            <div className="text-2xl">👥</div>
          </div>
        </div>
        
        <div className="rounded-lg p-4 bg-white border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Grade</p>
              <p className="text-2xl font-bold text-green-600">
                {getGradeLetter(studentsData.reduce((sum, s) => sum + (s.grade || 0), 0) / studentsData.length)}
              </p>
              <p className="text-xs text-gray-500">
                {(studentsData.reduce((sum, s) => sum + (s.grade || 0), 0) / studentsData.length).toFixed(1)}%
              </p>
            </div>
            <div className="text-2xl">📊</div>
          </div>
        </div>
        
        <div className="rounded-lg p-4 bg-white border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Attendance</p>
              <p className="text-2xl font-bold text-purple-600">
                {(studentsData.reduce((sum, s) => sum + (s.attendance || 0), 0) / studentsData.length).toFixed(1)}%
              </p>
              <p className="text-xs text-gray-500">All students</p>
            </div>
            <div className="text-2xl">📈</div>
          </div>
        </div>
        
        <div className="rounded-lg p-4 bg-white border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Departments</p>
              <p className="text-2xl font-bold text-yellow-600">{departments.length}</p>
              <p className="text-xs text-gray-500">With enrolled students</p>
            </div>
            <div className="text-2xl">🏢</div>
          </div>
        </div>
      </div>

      {/* Students by Department */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        {departments.map((dept, index) => {
          const deptStudents = studentsData.filter(s => s.department === dept);
          const avgGrade = deptStudents.reduce((sum, s) => sum + (s.grade || 0), 0) / deptStudents.length || 0;
          const colors = ['blue', 'green', 'purple', 'yellow', 'red'];
          const color = colors[index % colors.length];
          
          return (
            <div key={dept} className="rounded-lg p-4 bg-white border border-gray-200">
              <div className="text-center">
                <h3 className="font-semibold text-gray-900 mb-1">{dept}</h3>
                <p className={`text-2xl font-bold text-${color}-600`}>{deptStudents.length}</p>
                <p className="text-xs text-gray-500">Avg: {avgGrade.toFixed(1)}%</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="rounded-lg p-6 bg-white border border-gray-200">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Enrollment Status</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Approved Students:</span>
              <span className="font-semibold text-green-600">
                {studentsData.filter(s => s.status === 'approved').length}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Pending Approval:</span>
              <span className="font-semibold text-yellow-600">
                {studentsData.filter(s => s.status === 'pending').length}
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-lg p-6 bg-white border border-gray-200">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Department Distribution</h4>
          <div className="space-y-2">
            {departments.slice(0, 3).map(dept => {
              const count = studentsData.filter(s => s.department === dept).length;
              const percentage = ((count / studentsData.length) * 100).toFixed(1);
              return (
                <div key={dept} className="flex justify-between text-sm">
                  <span className="text-gray-600">{dept}:</span>
                  <span className="font-medium">{count} ({percentage}%)</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-lg p-6 bg-white border border-gray-200">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h4>
          <div className="space-y-2 text-sm text-gray-600">
            <p>• {studentsData.filter(s => s.status === 'pending').length} new applications</p>
            <p>• {studentsData.length} total students</p>
            <p>• {departments.length} active departments</p>
          </div>
        </div>
      </div>

      {/* Students Table */}
      <div className="rounded-lg p-6 bg-white border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">All Students</h2>
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
                  Grade
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
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      (student.grade || 0) >= 85 
                        ? 'bg-green-100 text-green-800' 
                        : (student.grade || 0) >= 75 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {getGradeLetter(student.grade || 0)}
                    </span>
                    <span className="ml-2 text-sm text-gray-600">
                      {(student.grade || 0).toFixed(1)}%
                    </span>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                    {student.attendance || 0}%
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      student.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {student.status}
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