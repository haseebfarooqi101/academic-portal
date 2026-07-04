export default function ApprovalsModule({ students, handleApproveStudent, handleRejectStudent }) {
  const pendingStudentsList = students.filter(student => student.status === 'pending');
  
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Pending Student Approvals</h3>
        {pendingStudentsList.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-400 text-4xl mb-4">✅</div>
            <p className="text-gray-500">No pending approvals</p>
          </div>
        ) : (
          <div className="space-y-4">
            {pendingStudentsList.map((student) => (
              <div key={student.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="text-lg font-medium text-gray-900">{student.name}</h4>
                    <p className="text-sm text-gray-500">{student.email}</p>
                    <p className="text-sm text-gray-500">Department: {student.department || 'Not specified'}</p>
                    <p className="text-sm text-gray-500">Registration: {student.registrationNumber || 'Not provided'}</p>
                  </div>
                  <div className="flex space-x-3">
                    <button 
                      onClick={() => handleApproveStudent(student.id, student.name)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Approve
                    </button>
                    <button 
                      onClick={() => handleRejectStudent(student.id, student.name)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}