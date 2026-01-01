export default function GradesModule({ 
  studentsData, 
  departments, 
  gradeBoundaries, 
  getGradeLetter
}) {
  // Grade distribution
  const gradeDistribution = {};
  Object.keys(gradeBoundaries).forEach(grade => {
    gradeDistribution[grade] = studentsData.filter(s => getGradeLetter(s.grade || 0) === grade).length;
  });

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="rounded-lg p-6 mb-6 bg-white border-b border-gray-200">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Grades Management</h1>
        <p className="text-gray-600">Monitor and analyze student academic performance</p>
      </div>

      {/* Grade Boundaries */}
      <div className="rounded-lg p-6 mb-6 bg-white border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Grade Boundaries</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {Object.entries(gradeBoundaries).map(([grade, boundary]) => (
            <div key={grade} className="text-center p-3 border border-gray-200 rounded-lg">
              <div className="text-lg font-bold text-purple-600">{grade}</div>
              <div className="text-sm text-gray-600">{boundary.min}-{boundary.max}%</div>
              <div className="text-xs text-gray-500">{gradeDistribution[grade]} students</div>
            </div>
          ))}
        </div>
      </div>

      {/* Department Grade Overview */}
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
                <p className={`text-2xl font-bold text-${color}-600`}>{getGradeLetter(avgGrade)}</p>
                <p className="text-xs text-gray-500">{avgGrade.toFixed(1)}% avg</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Grade Distribution Chart */}
      <div className="rounded-lg p-6 mb-6 bg-white border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Grade Distribution</h2>
        <div className="space-y-3">
          {Object.entries(gradeDistribution).map(([grade, count]) => (
            <div key={grade} className="flex items-center">
              <div className="w-8 text-sm font-medium text-gray-900">{grade}</div>
              <div className="flex-1 mx-4">
                <div className="bg-gray-200 rounded-full h-4">
                  <div className="bg-purple-600 h-4 rounded-full flex items-center justify-end pr-2">
                    <div className="w-full h-full" style={{ width: `${Math.max((count / studentsData.length) * 100, 5)}%` }}>
                      {count > 0 && (
                        <span className="text-xs text-white font-medium">{count}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-12 text-sm text-gray-600 text-right">
                {((count / studentsData.length) * 100).toFixed(1)}%
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Student Grades Table */}
      <div className="rounded-lg p-6 bg-white border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Student Grades</h2>
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
                  Performance
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
                    </div>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2 max-w-20">
                        <div 
                          className={`h-2 rounded-full ${
                            (student.grade || 0) >= 85 ? 'bg-green-500' :
                            (student.grade || 0) >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                        >
                          <div className="w-full h-full" style={{ width: `${Math.min(student.grade || 0, 100)}%` }}></div>
                        </div>
                      </div>
                    </div>
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