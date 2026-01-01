import DashboardCard from "../DashboardCard";

export default function LeavesModule({ showSuccess, showError }) {
  const leaveData = {
    totalAllowed: 15,
    used: 3,
    remaining: 12,
    pending: 1
  };

  const leaveHistory = [
    { id: 1, date: '2024-01-15', type: 'Sick Leave', reason: 'Fever', status: 'Approved', duration: 1 },
    { id: 2, date: '2024-02-20', type: 'Personal', reason: 'Family function', status: 'Approved', duration: 1 },
    { id: 3, date: '2024-03-10', type: 'Medical', reason: 'Doctor appointment', status: 'Approved', duration: 1 },
    { id: 4, date: '2024-03-25', type: 'Emergency', reason: 'Family emergency', status: 'Pending', duration: 1 }
  ];

  const handleLeaveRequest = () => {
    showSuccess('Leave request submitted successfully!');
  };

  return (
    <div className="p-4 sm:p-6">
      {/* Leave Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <DashboardCard
          title="Total Allowed"
          value={leaveData.totalAllowed}
          subtitle="Days per semester"
          color="blue"
          icon="📅"
        />
        <DashboardCard
          title="Used"
          value={leaveData.used}
          subtitle="Days taken"
          color="red"
          icon="📋"
        />
        <DashboardCard
          title="Remaining"
          value={leaveData.remaining}
          subtitle="Days available"
          color="green"
          icon="✅"
        />
        <DashboardCard
          title="Pending"
          value={leaveData.pending}
          subtitle="Awaiting approval"
          color="yellow"
          icon="⏳"
        />
      </div>

      {/* Leave Request Form */}
      <div className="rounded-lg p-6 mb-6 bg-white border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Request New Leave</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Leave Type</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option>Sick Leave</option>
              <option>Personal Leave</option>
              <option>Medical Leave</option>
              <option>Emergency Leave</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
            <input 
              type="date" 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Reason</label>
            <textarea 
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Please provide a reason for your leave request..."
            ></textarea>
          </div>
          <div className="sm:col-span-2">
            <button 
              onClick={handleLeaveRequest}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Submit Request
            </button>
          </div>
        </div>
      </div>

      {/* Leave History */}
      <div className="rounded-lg p-6 bg-white border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Leave History</h3>
        <div className="w-full overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {leaveHistory.map((leave) => (
                <tr key={leave.id}>
                  <td className="px-3 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-900">{leave.date}</td>
                  <td className="px-3 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-500">{leave.type}</td>
                  <td className="px-3 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-500">{leave.reason}</td>
                  <td className="px-3 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-500">{leave.duration} day(s)</td>
                  <td className="px-3 lg:px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      leave.status === 'Approved' ? 'bg-green-100 text-green-800' :
                      leave.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {leave.status}
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