export default function StudentsTable({ 
  students, 
  onStudentClick, 
  getGradeLetter,
  showActions = true,
  columns = ['name', 'registration', 'class', 'grade', 'attendance', 'status']
}) {
  const columnConfig = {
    name: { label: 'Name', key: 'name' },
    registration: { label: 'Registration', key: 'registrationNumber' },
    class: { label: 'Class', key: 'class' },
    grade: { label: 'Grade', key: 'grade' },
    attendance: { label: 'Attendance', key: 'attendance' },
    status: { label: 'Status', key: 'status' }
  };

  return (
    <div 
      className="rounded-lg p-6"
      style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid #E4E4E7'
      }}
    >
      <div className="w-full">
        <table className="w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map(col => (
                <th key={col} className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  {columnConfig[col].label}
                </th>
              ))}
              {showActions && (
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50">
                {columns.map(col => (
                  <td key={col} className="px-3 py-4 text-sm text-gray-900">
                    {col === 'grade' ? (
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        (student.grade || 0) >= 85 ? 'bg-green-100 text-green-800' :
                        (student.grade || 0) >= 70 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {getGradeLetter(student.grade || 0)} ({student.grade || 0}%)
                      </span>
                    ) : col === 'status' ? (
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        student.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {student.status}
                      </span>
                    ) : col === 'attendance' ? (
                      `${student.attendance || 0}%`
                    ) : col === 'class' ? (
                      student.class || 'N/A'
                    ) : (
                      <div className="truncate max-w-xs">{student[columnConfig[col].key]}</div>
                    )}
                  </td>
                ))}
                {showActions && (
                  <td className="px-3 py-4">
                    <button
                      onClick={() => onStudentClick(student)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      View Profile
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}