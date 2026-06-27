import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { submitLeaveRequest, selectLeavesByStudent } from '../../redux/slices/leavesSlice';
import DashboardCard from '../DashboardCard';

export default function LeavesModule({ showSuccess, showError }) {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const myLeaves = useSelector(selectLeavesByStudent(currentUser?.id));

  const [form, setForm] = useState({ type: 'Sick Leave', date: '', reason: '' });
  const [errors, setErrors] = useState({});

  const totalAllowed = 15;
  const used = myLeaves.filter(l => l.status === 'approved').length;
  const pending = myLeaves.filter(l => l.status === 'pending').length;
  const remaining = totalAllowed - used;

  const validate = () => {
    const e = {};
    if (!form.date) e.date = 'Date is required';
    if (!form.reason.trim()) e.reason = 'Reason is required';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length > 0) {
      setErrors(e2);
      return;
    }
    dispatch(submitLeaveRequest({
      studentId: currentUser.id,
      studentName: currentUser.name,
      registrationNumber: currentUser.registrationNumber,
      department: currentUser.department,
      type: form.type,
      date: form.date,
      reason: form.reason,
    }));
    setForm({ type: 'Sick Leave', date: '', reason: '' });
    setErrors({});
    showSuccess('Leave request submitted successfully!');
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
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <DashboardCard title="Total Allowed" value={totalAllowed} subtitle="Days per semester" color="blue" icon="📅" />
        <DashboardCard title="Used" value={used} subtitle="Approved days" color="red" icon="📋" />
        <DashboardCard title="Remaining" value={remaining} subtitle="Days available" color="green" icon="✅" />
        <DashboardCard title="Pending" value={pending} subtitle="Awaiting approval" color="yellow" icon="⏳" />
      </div>

      {/* Leave Request Form */}
      <div className="rounded-lg p-6 mb-6 bg-white border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Request New Leave</h3>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Leave Type</label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
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
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  errors.date ? 'border-red-400' : 'border-gray-300'
                }`}
              />
              {errors.date && <p className="text-xs text-red-500 mt-1">{errors.date}</p>}
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Reason</label>
              <textarea
                rows="3"
                value={form.reason}
                onChange={(e) => setForm({ ...form, reason: e.target.value })}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  errors.reason ? 'border-red-400' : 'border-gray-300'
                }`}
                placeholder="Please provide a reason for your leave request..."
              />
              {errors.reason && <p className="text-xs text-red-500 mt-1">{errors.reason}</p>}
            </div>
            <div className="sm:col-span-2">
              <button
                type="submit"
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
              >
                Submit Request
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Leave History */}
      <div className="rounded-lg p-6 bg-white border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Leave History</h3>
        {myLeaves.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <p className="text-4xl mb-2">📋</p>
            <p>No leave requests yet</p>
          </div>
        ) : (
          <div className="w-full overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                  <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reviewed By</th>
                  <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[...myLeaves].reverse().map((leave) => (
                  <tr key={leave.id}>
                    <td className="px-3 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-900">{leave.date}</td>
                    <td className="px-3 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-500">{leave.type}</td>
                    <td className="px-3 lg:px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{leave.reason}</td>
                    <td className="px-3 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {leave.reviewedBy || '—'}
                    </td>
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
        )}
      </div>
    </div>
  );
}
