export default function LeavesModule({ 
  studentsData, 
  departments, 
  handleLeaveApproval
}) {
  const pendingLeaves = studentsData.filter(s => s.leaves && s.leaves.some(l => l.status === 'pending'));

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="rounded-lg p-6 mb-6 bg-white border-b border-gray-200">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Leave Management</h1>
        <p className="text-gray-600">Review and approve student leave requests</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="rounded-lg p-4 bg-white border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Leaves</p>
              <p className="text-2xl font-bold text-yellow-600">
                {studentsData.reduce((sum, s) => sum + (s.leaves ? s.leaves.filter(l => l.status === 'pending').length : 0), 0)}
              </p>
              <p className="text-xs text-gray-500">Need approval</p>
            </div>
            <div className="text-2xl">⏳</div>
          </div>
        </div>
        
        <div className="rounded-lg p-4 bg-white border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Students</p>
              <p className="text-2xl font-bold text-blue-600">{pendingLeaves.length}</p>
              <p className="text-xs text-gray-500">With pending requests</p>
            </div>
            <div className="text-2xl">👥</div>
          </div>
        </div>
        
        <div className="rounded-lg p-4 bg-white border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Departments</p>
              <p className="text-2xl font-bold text-purple-600">
                {new Set(pendingLeaves.map(s => s.department)).size}
              </p>
              <p className="text-xs text-gray-500">Affected</p>
            </div>
            <div className="text-2xl">🏢</div>
          </div>
        </div>
        
        <div className="rounded-lg p-4 bg-white border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Attendance</p>
              <p className="text-2xl font-bold text-green-600">
                {(studentsData.reduce((sum, s) => sum + (s.attendance || 0), 0) / studentsData.length).toFixed(1)}%
              </p>
              <p className="text-xs text-gray-500">All students</p>
            </div>
            <div className="text-2xl">📊</div>
          </div>
        </div>
      </div>

      {/* Department Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        {departments.map((dept, index) => {
          const deptStudents = studentsData.filter(s => s.department === dept);
          const deptPendingLeaves = deptStudents.filter(s => s.leaves && s.leaves.some(l => l.status === 'pending'));
          const colors = ['blue', 'green', 'purple', 'yellow', 'red'];
          const color = colors[index % colors.length];
          
          return (
            <div key={dept} className="rounded-lg p-4 bg-white border border-gray-200">
              <div className="text-center">
                <h3 className="font-semibold text-gray-900 mb-1">{dept}</h3>
                <p className={`text-2xl font-bold text-${color}-600`}>{deptPendingLeaves.length}</p>
                <p className="text-xs text-gray-500">
                  {deptPendingLeaves.reduce((sum, s) => sum + (s.leaves ? s.leaves.filter(l => l.status === 'pending').length : 0), 0)} pending
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Leave Approval Section */}
      <div className="rounded-lg p-6 bg-white border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Pending Leave Approvals</h2>
        {pendingLeaves.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-400 text-4xl mb-4">✅</div>
            <p className="text-gray-500">No pending leave requests</p>
          </div>
        ) : (
          <div className="space-y-4">
            {pendingLeaves.slice(0, 5).map((student) => 
              (student.leaves || []).filter(l => l.status === 'pending').slice(0, 1).map((leave, leaveIndex) => (
                <div key={`${student.id}-${leaveIndex}`} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1 mb-4 lg:mb-0">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">{student.name}</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                        <p>Registration: {student.registrationNumber}</p>
                        <p>Department: {student.department}</p>
                        <p>Class: {student.class || 'N/A'}</p>
                        <p>Attendance: {student.attendance || 0}%</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
                          <div>
                            <span className="font-medium text-gray-900">Type:</span>
                            <p className="text-gray-600">{leave.type}</p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-900">Date:</span>
                            <p className="text-gray-600">{leave.date}</p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-900">Reason:</span>
                            <p className="text-gray-600">{leave.reason}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 lg:ml-4">
                      <button 
                        onClick={() => handleLeaveApproval(student.id, 'approve')}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                      >
                        Approve
                      </button>
                      <button 
                        onClick={() => handleLeaveApproval(student.id, 'reject')}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}