import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';

export default function StudentSidebar({ activeItem, setActiveItem, isOpen, isMobile, onClose, onToggle, isCollapsed: externalIsCollapsed }) {
  const [isCollapsed, setIsCollapsed] = useState(externalIsCollapsed || false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);

  // Update internal state when external prop changes
  useEffect(() => {
    if (externalIsCollapsed !== undefined) {
      setIsCollapsed(externalIsCollapsed);
    }
  }, [externalIsCollapsed]);

  const handleToggleCollapse = () => {
    const newCollapsed = !isCollapsed;
    setIsCollapsed(newCollapsed);
    if (onToggle) {
      onToggle(newCollapsed);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showProfileDropdown && !event.target.closest('.profile-dropdown-container')) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showProfileDropdown]);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
    { id: 'courses', label: 'My Courses', icon: '📚' },
    { id: 'grades', label: 'Grades', icon: '📊' },
    { id: 'assignments', label: 'Assignments', icon: '📝' },
    { id: 'attendance', label: 'Attendance', icon: '📅' },
    { id: 'leaves', label: 'Leave Management', icon: '🏖️' },
    { id: 'schedule', label: 'Class Schedule', icon: '🕐' },
    { id: 'profile', label: 'Profile', icon: '👤' }
  ];

  const handleLogout = () => {
    dispatch(logout());
    router.push('/Login');
  };

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  return (
    <>
      {/* Mobile/Tablet Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 lg:hidden"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div 
        className={`flex flex-col sticky top-0 transition-all duration-300 ease-in-out bg-white border-r border-gray-200 pr-3 pb-6 pl-3 ${
          isMobile 
            ? `fixed z-50 w-60 h-screen left-0 top-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`
            : `w-60 h-screen fixed left-0 top-0 z-50 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`
        }`}
      >
        {/* Header */}
        <div 
          className="flex items-center justify-between shrink-0"
          style={{ 
            height: '48px', // Fixed height
            borderBottom: '1px solid #EDEDED', // Bottom border with specified color
            paddingTop: '12px',
            paddingBottom: '12px', 
            paddingLeft: '4px',
            paddingRight: '4px'
          }}
        >
          <div className="flex items-center gap-3 flex-1">
            <img 
              src="/academic-portal-logo.svg" 
              alt="Academic Portal" 
              className="w-auto h-12"
            />
          </div>
          <button
            onClick={handleToggleCollapse}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle sidebar"
          >
            <img 
              src="/IconHam.png" 
              alt="Menu" 
              className="w-5 h-5"
            />
          </button>
        </div>

        {/* Navigation Menu - Scrollable */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveItem(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-left transition-all duration-200 ${
                    activeItem === item.id
                      ? 'hover:bg-opacity-90'
                      : 'hover:bg-gray-50'
                  }`}
                  style={activeItem === item.id ? {
                    backgroundColor: '#F3EBFA',
                    borderRadius: '8px'
                  } : {
                    borderRadius: '8px'
                  }}
                >
                  <span className="text-lg">{item.icon}</span>
                  {!isCollapsed && (
                    <span 
                      style={{
                        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                        fontWeight: activeItem === item.id ? 600 : 500,
                        fontStyle: activeItem === item.id ? 'normal' : 'normal',
                        color: activeItem === item.id ? '#8A36D0' : 'rgba(9, 9, 11, 0.8)',
                        fontSize: '14px',
                        lineHeight: '20px'
                      }}
                    >
                      {item.label}
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* User Profile - Fixed at bottom */}
        <div 
          className="p-4 relative profile-dropdown-container flex justify-center shrink-0"
          style={{ borderTop: '1px solid #DBE0E6' }}
        >
        <div 
          className="flex items-center cursor-pointer"
          onClick={toggleProfileDropdown}
          style={{
            width: '216px', // Fill width
            height: '44px', // Fixed height
            borderRadius: '6px', // Radius
            padding: '6px', // Padding all sides
            gap: '8px' // Gap between elements
          }}
        >
          {/* Avatar */}
          <div 
            className="flex items-center justify-center rounded-full"
            style={{
              width: '32px', // Fixed width
              height: '32px', // Fixed height
              backgroundColor: '#F3F4F6', // Background color
              border: '0.5px solid rgba(0, 0, 0, 0.1)' // Border with 10% opacity black
            }}
          >
            <span className="text-gray-700 font-semibold text-sm">
              {currentUser?.name?.charAt(0) || 'S'}
            </span>
          </div>
          {!isCollapsed && (
            <div 
              className="flex items-center"
              style={{
                width: '164px', // Fill width
                height: '24px', // Hug height
                gap: '8px' // Gap between elements
              }}
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {currentUser?.name || 'Student'}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs text-gray-500">|</span>
                <span className="text-xs text-gray-500">Student</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400">
                  <polyline points="6,9 12,15 18,9"/>
                </svg>
              </div>
            </div>
          )}
        </div>

        {/* Logout Dropdown */}
        {showProfileDropdown && !isCollapsed && (
          <div 
            className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-lg p-2 z-50"
            style={{ 
              border: '1px solid #DBE0E6',
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)'
            }}
          >
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16,17 21,12 16,7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </div>
    </>
  );
}