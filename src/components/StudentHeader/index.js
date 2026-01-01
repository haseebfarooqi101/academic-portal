import { useState, useEffect, useRef } from 'react';

export default function StudentHeader({ activeItem, breadcrumbs = [], setActiveItem, onToggleSidebar, isMobile, isSidebarOpen }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showDashboardDropdown, setShowDashboardDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const notificationRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDashboardDropdown(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getPageTitle = () => {
    switch (activeItem) {
      case 'dashboard': return 'Dashboard';
      case 'courses': return 'My Courses';
      case 'grades': return 'Grades';
      case 'assignments': return 'Assignments';
      case 'attendance': return 'Attendance';
      case 'leaves': return 'Leave Management';
      case 'schedule': return 'Class Schedule';
      case 'profile': return 'Profile';
      default: return 'Dashboard';
    }
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'courses', label: 'My Courses' },
    { id: 'grades', label: 'Grades' },
    { id: 'assignments', label: 'Assignments' },
    { id: 'attendance', label: 'Attendance' },
    { id: 'leaves', label: 'Leave Management' },
    { id: 'schedule', label: 'Class Schedule' },
    { id: 'profile', label: 'Profile' }
  ];

  return (
    <header 
      className={`bg-white z-30 flex items-center justify-between fixed top-0 border-b border-gray-200 px-4 lg:px-7 py-2 transition-all duration-300 ${
        isMobile ? 'w-full left-0' : isSidebarOpen ? 'w-[calc(100%-15rem)] left-60' : 'w-full left-0'
      }`}
      style={{ height: '48px' }}
    >
        {/* Left Side - Hamburger + Breadcrumbs */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Hamburger Menu - Always show on mobile, show on desktop when sidebar is closed */}
          {(isMobile || !isSidebarOpen) && (
            <button
              onClick={onToggleSidebar}
              className="p-1 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors shrink-0"
              aria-label="Toggle sidebar"
            >
              <img 
                src="/IconHam.png" 
                alt="Menu" 
                className="w-4 h-4 sm:w-5 sm:h-5"
              />
            </button>
          )}
          
          {/* Breadcrumbs */}
          <div className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm">
            <span className="text-gray-500">Student Portal</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400 sm:w-4 sm:h-4">
              <polyline points="9,18 15,12 9,6"/>
            </svg>
            <span className="text-gray-900 font-medium truncate">{getPageTitle()}</span>
            {breadcrumbs.map((crumb, index) => (
              <div key={index} className="flex items-center space-x-1 sm:space-x-2">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400 sm:w-4 sm:h-4">
                  <polyline points="9,18 15,12 9,6"/>
                </svg>
                <span className="text-gray-900 font-medium truncate">{crumb}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          {/* Dashboard Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowDashboardDropdown(!showDashboardDropdown)}
              className="flex items-center transition-colors rounded-md border border-gray-200 px-2 sm:px-3 py-1.5 bg-white shadow-sm w-32 sm:w-60 h-8"
            >
              <div className="flex items-center justify-between w-full">
                <span className="font-inter text-xs sm:text-sm text-gray-900 truncate">
                  {getPageTitle()}
                </span>
                
                <div className={`w-4 h-4 transition-transform duration-200 ${showDashboardDropdown ? 'rotate-180' : 'rotate-0'}`}>
                  <svg 
                    width="8" 
                    height="4" 
                    viewBox="0 0 8 4" 
                    fill="none" 
                    stroke="#0D1114" 
                    strokeWidth="1.5"
                    className="absolute top-1.5 left-1 rotate-180"
                  >
                    <polyline points="1,1 4,3 7,1"/>
                  </svg>
                </div>
              </div>
            </button>

            {showDashboardDropdown && (
              <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg z-50 border border-gray-200 shadow-lg">
                <div className="p-2">
                  {menuItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveItem(item.id);
                        setShowDashboardDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        activeItem === item.id
                          ? 'text-white font-medium bg-purple-600'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Notifications */}
          <div className="relative" ref={notificationRef}>
            <div className="flex items-center w-15 h-8 gap-1">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="flex items-center transition-colors w-15 h-8 rounded-md pl-2 bg-transparent border-none"
              >
                {/* Bell Icon */}
                <div className="relative w-6 h-6">
                  <svg 
                    width="18" 
                    height="19.5" 
                    viewBox="0 0 18 19.5" 
                    fill="none" 
                    stroke="rgba(0, 0, 0, 0.8)" 
                    strokeWidth="2"
                    className="hover:stroke-gray-600 transition-colors absolute top-0.5 left-0.5"
                  >
                    <path d="M13.5 6A4.5 4.5 0 0 0 4.5 6c0 5.25-2.25 6.75-2.25 6.75h13.5s-2.25-1.5-2.25-6.75"/>
                    <path d="M10.3 15.75a1.5 1.5 0 0 1-2.6 0"/>
                  </svg>
                  
                  {/* Notification badge */}
                  <span className="absolute w-2 h-2 bg-red-500 border-2 border-white rounded-full top-0 right-0 z-10"></span>
                </div>
                
                {/* Dropdown arrow */}
                <div className={`w-3 h-6 ml-1 transition-transform duration-200 ${showNotifications ? 'rotate-180' : 'rotate-0'}`}>
                  <svg 
                    width="11.5" 
                    height="6.5" 
                    viewBox="0 0 11.5 6.5" 
                    fill="none" 
                    stroke="#1D1E20" 
                    strokeWidth="2"
                    className="absolute top-2.5 left-0 font-bold"
                  >
                    <polyline points="1,1 5.75,5.5 10.5,1"/>
                  </svg>
                </div>
              </button>
            </div>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white rounded-lg z-50 border border-gray-200 shadow-lg">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900">Notifications</h3>
                </div>
                <div className="p-4 space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm text-gray-900">New assignment posted</p>
                      <p className="text-xs text-gray-500">Mathematics - Due next week</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm text-gray-900">Grade updated</p>
                      <p className="text-xs text-gray-500">Physics Quiz - 85/100</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
    </header>
  );
}