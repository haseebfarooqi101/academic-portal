import { useDispatch, useSelector } from 'react-redux';
import { approveLeaveRequest, rejectLeaveRequest, selectAllLeaveRequests } from '../../redux/slices/leavesSlice';
import DashboardCard from '../DashboardCard';

export default function LeavesModule({ studentsData, departments, handleLeaveApproval }) {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const allLeaves = useSelector(selectAllLeaveRequests);

  const pendingLeaves = allLeaves.filter(l => l.status === 'pending');
  const approvedLeaves = allLeaves.filter(l => l.status === 'approved');
  const rejectedLeaves = allLeaves.filter(l => l.status === 'rejected');

  const handleApprove = (leaveId, studentName) => {
    dispatch(approveLeaveRequest({ leaveId, teacherName: currentUser?.name || 'Teacher' }));
    handleLeaveApproval(studentName, 'approve');
  };

  const handleReject = (leaveId, studentName) => {
    dispatch(rejectLeaveRequest({ leaveId, teacherName: currentUser?.name || 'Teacher' }));
    handleLeaveApproval(studentName, 'reject');
  };

  const getStatusBadge = (status) => {
    const map = {
      approved: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      rejected: 'bg-red-100 text-red-800',
    };
    return map[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="rounded-lg p-6 mb-6 bg-white border border-gray-200">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">Leave Management</h1>
        <p className="text-gray-600 text-sm">Review and action student leave requests</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <DashboardCard
          title="Total Requests"
          value={allLeaves.length}
          subtitle="All time"
          color="blue"
          icon="📋"
        />
        <DashboardCard
          title="Pending"
          value={pendingLeaves.length}
          subtitle="Awaiting your action"
          color="yellow"
          icon="⏳"
        />
        <DashboardCard
          title="Approved"
          value={approvedLeaves.length}
          subtitle="Approved by you"
          color="green"
          icon="✅"
        />
        <DashboardCard
          title="Rejected"
          value={rejectedLeaves.length}
          subtitle="Rejected by you"
          color="red"
          icon="❌"
        />
      </div>

      {/* Pending Approvals */}
      <div className="rounded-lg p-6 mb-6 bg-white border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Pending Requests
          {pendingLeaves.length > 0 && (
            <span className="ml-2 px-2 py-0.5 text-xs bg-yellow-100 text-yellow-800 rounded-full font-medium">
              {pendingLeaves.length}
            </span>
          )}
        </h2>

        {pendingLeaves.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <p className="text-4xl mb-2">✅</p>
            <p>No pending leave requests</p>
          </div>
        ) : (
          <div className="space-y-4">
            {pendingLeaves.map((leave) => (
              <div key={leave.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-base font-semibold text-gray-900">{leave.studentName}</h3>
                      <span className="text-xs text-gray-500">{leave.registrationNumber}</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-gray-600 mb-3">
                      <p><span className="font-medium text-gray-700">Department:</span> {leave.department}</p>
                      <p><span className="font-medium text-gray-700">Type:</span> {leave.type}</p>
                      <p><span className="font-medium text-gray-700">Date:</span> {leave.date}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">Reason: </span>{leave.reason}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        Submitted: {new Date(leave.submittedAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() => handleApprove(leave.id, leave.studentName)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(leave.id, leave.studentName)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
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

      {/* All Requests History */}
      {allLeaves.length > 0 && (
        <div className="rounded-lg p-6 bg-white border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">All Leave Requests</h2>
          <div className="w-full overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                  <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                  <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reviewed By</th>
                  <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[...allLeaves].reverse().map((leave) => (
                  <tr key={leave.id}>
                    <td className="px-3 lg:px-6 py-4 whitespace-nowrap">
                      <p className="text-sm font-medium text-gray-900">{leave.studentName}</p>
                      <p className="text-xs text-gray-500">{leave.registrationNumber}</p>
                    </td>
                    <td className="px-3 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-500">{leave.department}</td>
                    <td className="px-3 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-500">{leave.type}</td>
                    <td className="px-3 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-500">{leave.date}</td>
                    <td className="px-3 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-500">{leave.reviewedBy || '—'}</td>
                    <td className="px-3 lg:px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(leave.status)}`}>
                        {leave.status.charAt(0).toUpperCase() + leave.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
