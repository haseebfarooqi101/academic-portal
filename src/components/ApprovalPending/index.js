import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { logout, login, selectAllUsers } from '../../redux/slices/authSlice';
import { useToast } from '../../hooks/useToast';
import Toast from '../Toast';

export default function ApprovalPending({ currentUser }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [checking, setChecking] = useState(false);
  const allUsers = useSelector(selectAllUsers);
  const { toast, showSuccess, showError, hideToast } = useToast();

  const handleLogout = () => {
    dispatch(logout());
    router.push('/Login');
  };

  const handleCheckStatus = async () => {
    setChecking(true);
    console.log('Checking status for user:', currentUser.email);
    
    try {
      // Call API to get current user status from server
      const response = await fetch('/api/students/status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: currentUser.email }),
      });

      if (response.ok) {
        const result = await response.json();
        const updatedUser = result.student;
        
        console.log('Updated user from API:', updatedUser);
        
        if (updatedUser && updatedUser.status === 'approved') {
          console.log('User approved, updating current user and redirecting to dashboard');
          // Update the current user in Redux with the new status
          dispatch(login(updatedUser));
          // The StudentDashboard will automatically re-render and show the dashboard
        } else if (updatedUser && updatedUser.status === 'rejected') {
          console.log('User rejected');
          // Handle rejection case - could show a different message or redirect
          alert('Your application has been rejected. Please contact admin for more information.');
        } else {
          console.log('User still pending approval');
          // Still pending - could show a message or just reload
          window.location.reload();
        }
      } else {
        const error = await response.json();
        console.error('API error:', error);
        showError('Failed to check status. Please try again.');
      }
      
    } catch (error) {
      console.error('Error checking status:', error);
      showError('Failed to check status. Please try again.');
    } finally {
      setChecking(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-linear-to-br from-gray-50 to-gray-100 p-4">
      <div className="bg-white w-full max-w-md shadow-2xl rounded-2xl p-6 text-center">
        {/* Pending Icon */}
        <div className="w-16 h-16 mx-auto mb-4 bg-yellow-100 rounded-full flex items-center justify-center">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12,6 12,12 16,14"/>
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          Approval Pending
        </h1>
        
        <p className="text-gray-600 mb-4 text-sm leading-relaxed">
          Your registration is submitted. Please wait for admin approval to access your dashboard.
        </p>

        {/* Student Info */}
        {currentUser && (
          <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="text-left space-y-1">
              <p className="text-xs text-gray-700">
                <span className="font-semibold">Name:</span> {currentUser.name}
              </p>
              <p className="text-xs text-gray-700">
                <span className="font-semibold">Email:</span> {currentUser.email}
              </p>
              <p className="text-xs text-gray-700">
                <span className="font-semibold">Registration:</span> {currentUser.registrationNumber || 'Not provided'}
              </p>
              <p className="text-xs text-gray-700">
                <span className="font-semibold">Department:</span> {currentUser.department || 'Not specified'}
              </p>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-1 text-sm">What happens next?</h3>
          <ul className="text-xs text-blue-800 text-left space-y-1">
            <li>• Admin will review your details</li>
            <li>• You'll get access once approved</li>
            <li>• Check back later if needed</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <button
            onClick={handleCheckStatus}
            disabled={checking}
            className="w-full bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white py-2.5 rounded-lg font-semibold text-sm transition shadow-md hover:shadow-lg disabled:cursor-not-allowed"
          >
            {checking ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Checking...
              </div>
            ) : (
              'Check Status'
            )}
          </button>
          
          <button
            onClick={handleLogout}
            className="w-full bg-linear-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white py-2.5 rounded-lg font-semibold text-sm transition shadow-md hover:shadow-lg"
          >
            Logout
          </button>
        </div>

        {/* Contact Info */}
        <div className="mt-4 pt-3 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Need help? Contact{' '}
            <a href="mailto:admin@school.edu" className="text-purple-600 hover:text-purple-700">
              admin@school.edu
            </a>
          </p>
        </div>
      </div>

      {/* Toast Notification */}
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={hideToast}
        />
      )}
    </div>
  );
}