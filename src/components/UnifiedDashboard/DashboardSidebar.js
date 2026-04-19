import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import { toggleCollapse, closeSidebar, toggleSidebar, selectSidebar } from '../../redux/slices/uiSlice';

export default function DashboardSidebar({ 
  userRole, 
  currentUser,
  menuItems, 
  activeItem, 
  setActiveItem 
}) {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const { isOpen, isCollapsed, isMobile } = useSelector(selectSidebar);

  const handleToggleCollapse = () => {
    dispatch(toggleCollapse());
  };

  const handleClose = () => {
    dispatch(closeSidebar());
  };

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
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

  const handleLogout = () => {
    dispatch(logout());
    router.push('/Login');
  };

  const getPortalTitle = () => {
    switch (userRole) {
      case 'teacher': return 'Teacher Portal';
      case 'student': return 'Student Portal';
      case 'admin': return 'Admin Portal';
      default: return 'Portal';
    }
  };

  const getUserRole = () => {
    switch (userRole) {
      case 'teacher': return 'Teacher';
      case 'student': return 'Student';
      case 'admin': return 'Admin';
      default: return 'User';
    }
  };

  return (
    <>
      {/* Mobile/Tablet Overlay */}
      {isOpen && (
        <div 
          className=" inset-0 z-40 lg:hidden bg-transparent bg-opacity-25"
          onClick={handleClose}
        />
      )}
      
      {/* Sidebar */}
      <div 
        className={`flex flex-col sticky top-0 transition-all duration-300 ease-in-out bg-white border-r border-gray-200 pr-3 pb-6 pl-3 ${
          isMobile 
            ? `fixed z-50 h-screen left-0 top-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'} ${isCollapsed ? 'w-16' : 'w-60'}`
            : `h-screen fixed left-0 top-0 z-50 ${isOpen ? 'translate-x-0' : '-translate-x-full'} ${isCollapsed ? 'w-16' : 'w-60'}`
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-12 border-b border-gray-100 pt-3 pb-3 pl-1 pr-1 shrink-0">
          <div className="flex items-center gap-3 flex-1">
            {!isCollapsed && (
              <img 
                src="/academic-portal-logo.svg" 
                alt="Academic Portal" 
                className="w-auto h-12"
              />
            )}
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
                  className={`w-full flex items-center text-left transition-all duration-200 ${
                    activeItem === item.id
                      ? 'hover:bg-opacity-90'
                      : 'hover:bg-gray-50'
                  } ${isCollapsed ? 'px-1 py-2 justify-center' : 'gap-3 px-3 py-2'}`}
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
            width: '216px',
            height: '44px',
            borderRadius: '6px',
            padding: '6px',
            gap: '8px'
          }}
        >
          {/* Avatar */}
          <div 
            className="flex items-center justify-center rounded-full"
            style={{
              width: '32px',
              height: '32px',
              backgroundColor: '#F3F4F6',
              border: '0.5px solid rgba(0, 0, 0, 0.1)'
            }}
          >
            <span className="text-gray-700 font-semibold text-sm">
              {currentUser?.name?.charAt(0) || getUserRole().charAt(0)}
            </span>
          </div>
          {!isCollapsed && (
            <div 
              className="flex items-center"
              style={{
                width: '164px',
                height: '24px',
                gap: '8px'
              }}
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {currentUser?.name || getUserRole()}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs text-gray-500">|</span>
                <span className="text-xs text-gray-500">{getUserRole()}</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400">
                  <polyline points="6,9 12,15 18,9"/>
                </svg>
              </div>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        {showProfileDropdown && !isCollapsed && (
          <div 
            className={`absolute bottom-full mb-2 bg-white rounded-lg p-2 z-50 ${
              isCollapsed ? 'left-0 w-48' : 'left-0 right-0'
            }`}
            style={{ 
              border: '1px solid #DBE0E6',
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)'
            }}
          >
            <button
              onClick={handleLogout}
              className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
            >
              Logout
            </button>
          </div>
        )}
        </div>
      </div>
    </>
  );
}