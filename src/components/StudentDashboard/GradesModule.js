export default function GradesModule() {
  const gradeReport = [
    { subject: 'Advanced Mathematics', grade: 'A-', percentage: 88, credits: 3 },
    { subject: 'Physics II', grade: 'A', percentage: 92, credits: 4 },
    { subject: 'Organic Chemistry', grade: 'B+', percentage: 78, credits: 3 },
    { subject: 'English Literature', grade: 'A-', percentage: 88, credits: 3 },
    { subject: 'World History', grade: 'A', percentage: 90, credits: 3 }
  ];

  const calculateGPA = () => {
    const gradePoints = {
      'A+': 4.0, 'A': 4.0, 'A-': 3.7,
      'B+': 3.3, 'B': 3.0, 'B-': 2.7,
      'C+': 2.3, 'C': 2.0, 'C-': 1.7,
      'D': 1.0, 'F': 0.0
    };
    
    let totalPoints = 0;
    let totalCredits = 0;
    
    gradeReport.forEach(course => {
      totalPoints += gradePoints[course.grade] * course.credits;
      totalCredits += course.credits;
    });
    
    return (totalPoints / totalCredits).toFixed(2);
  };

  return (
    <div className="p-4 sm:p-6">
      {/* GPA Summary */}
      <div className="rounded-lg p-6 mb-6 bg-white border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Grade Summary</h3>
          <div className="text-right">
            <p className="text-2xl font-bold text-purple-600">{calculateGPA()}</p>
            <p className="text-sm text-gray-500">Current GPA</p>
          </div>
        </div>
      </div>

      {/* Detailed Grades */}
      <div className="rounded-lg p-6 bg-white border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Grades</h3>
        <div className="w-full overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Percentage</th>
                <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Credits</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {gradeReport.map((course, index) => (
                <tr key={index}>
                  <td className="px-3 lg:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{course.subject}</td>
                  <td className="px-3 lg:px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      course.grade.startsWith('A') ? 'bg-green-100 text-green-800' :
                      course.grade.startsWith('B') ? 'bg-blue-100 text-blue-800' :
                      course.grade.startsWith('C') ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {course.grade}
                    </span>
                  </td>
                  <td className="px-3 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.percentage}%</td>
                  <td className="px-3 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.credits}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}