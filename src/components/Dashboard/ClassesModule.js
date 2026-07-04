export default function ClassesModule({ 
  departments, 
  getDepartmentStats, 
  subjectPerformanceData, 
  getGradeLetter
}) {
  const departmentStats = getDepartmentStats();

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="rounded-lg p-6 mb-6 bg-white border-b border-gray-200">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Classes Management</h1>
        <p className="text-gray-600">Manage classes across all departments</p>
      </div>

      {/* Department Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        {departments.map((dept, index) => {
          const deptStats = departmentStats[dept];
          const colors = ['blue', 'green', 'purple', 'yellow', 'red'];
          const color = colors[index % colors.length];
          
          return (
            <div key={dept} className="rounded-lg p-4 bg-white border border-gray-200">
              <div className="text-center">
                <h3 className="font-semibold text-gray-900 mb-1">{dept}</h3>
                <p className={`text-2xl font-bold text-${color}-600`}>{deptStats.totalStudents}</p>
                <p className="text-xs text-gray-500">Avg: {(deptStats.averageGrade || 0).toFixed(1)}%</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Classes Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="rounded-lg p-4 bg-white border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Classes</p>
              <p className="text-2xl font-bold text-blue-600">{subjectPerformanceData.length}</p>
              <p className="text-xs text-gray-500">All departments</p>
            </div>
            <div className="text-2xl">📚</div>
          </div>
        </div>
        
        <div className="rounded-lg p-4 bg-white border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Departments</p>
              <p className="text-2xl font-bold text-green-600">{departments.length}</p>
              <p className="text-xs text-gray-500">Active departments</p>
            </div>
            <div className="text-2xl">🏢</div>
          </div>
        </div>
        
        <div className="rounded-lg p-4 bg-white border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Students</p>
              <p className="text-2xl font-bold text-purple-600">
                {Object.values(departmentStats).reduce((sum, dept) => sum + dept.totalStudents, 0)}
              </p>
              <p className="text-xs text-gray-500">Enrolled</p>
            </div>
            <div className="text-2xl">👥</div>
          </div>
        </div>
        
        <div className="rounded-lg p-4 bg-white border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Performance</p>
              <p className="text-2xl font-bold text-yellow-600">
                {getGradeLetter(Object.values(departmentStats).reduce((sum, dept) => sum + dept.averageGrade, 0) / departments.length)}
              </p>
              <p className="text-xs text-gray-500">All classes</p>
            </div>
            <div className="text-2xl">📊</div>
          </div>
        </div>
      </div>

      {/* Subject Performance Overview */}
      <div className="rounded-lg p-6 bg-white border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Subject Performance Overview</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Students
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Avg Grade
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {subjectPerformanceData.slice(0, 10).map((subject, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-3 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{subject.name}</div>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                    {subject.department}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                    {subject.students}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      (subject.averageGrade || 0) >= 85 
                        ? 'bg-green-100 text-green-800' 
                        : (subject.averageGrade || 0) >= 75 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {getGradeLetter(subject.averageGrade || 0)}
                    </span>
                    <span className="ml-2 text-sm text-gray-600">
                      {(subject.averageGrade || 0).toFixed(1)}%
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