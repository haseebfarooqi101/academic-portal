import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar, selectSidebar } from '../../redux/slices/uiSlice';

export default function DashboardHeader({ 
  userRole,
  activeItem, 
  setActiveItem,
  menuItems 
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showDashboardDropdown, setShowDashboardDropdown] = useState(false);
  const dispatch = useDispatch();
  const { isOpen, isCollapsed, isMobile } = useSelector(selectSidebar);
  const dropdownRef = useRef(null);
  const notificationRef = useRef(null);

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

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
    const item = menuItems.find(item => item.id === activeItem);
    return item ? item.label : 'Dashboard';
  };

  const getPortalName = () => {
    switch (userRole) {
      case 'teacher': return 'Teacher Portal';
      case 'student': return 'Student Portal';
      case 'admin': return 'Admin Portal';
      default: return 'Portal';
    }
  };

  const getNotifications = () => {
    switch (userRole) {
      case 'teacher':
        return [
          { id: 1, type: 'info', message: 'Assignment submitted', detail: 'John Doe submitted Math homework' },
          { id: 2, type: 'success', message: 'Class scheduled', detail: 'Physics Lab - Tomorrow 10:00 AM' },
          { id: 3, type: 'warning', message: 'Grade deadline', detail: 'Submit grades by Friday' }
        ];
      case 'student':
        return [
          { id: 1, type: 'info', message: 'New assignment posted', detail: 'Mathematics - Due next week' },
          { id: 2, type: 'success', message: 'Grade updated', detail: 'Physics Quiz - 85/100' }
        ];
      case 'admin':
        return [
          { id: 1, type: 'info', message: 'New student registration', detail: 'John Doe submitted application' },
          { id: 2, type: 'success', message: 'Teacher approved', detail: 'Sarah Smith account activated' },
          { id: 3, type: 'warning', message: 'System maintenance', detail: 'Scheduled for tonight' }
        ];
      default:
        return [];
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'info': return 'bg-blue-500';
      case 'success': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <header 
      className={`bg-white z-30 flex items-center justify-between fixed top-0 border-b border-gray-200 px-4 lg:px-7 py-2 transition-all duration-300 h-12 ${
        isMobile ? 'w-full left-0' : isOpen ? (isCollapsed ? 'w-[calc(100vw-64px)] left-16' : 'w-[calc(100vw-240px)] left-60') : 'w-full left-0'
      }`}
    >
        {/* Left Side - Hamburger + Breadcrumbs */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Hamburger Menu - Always show on mobile, show on desktop when sidebar is closed */}
          {(isMobile || !isOpen) && (
            <button
              onClick={handleToggleSidebar}
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
          <div className="hidden sm:flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm">
            <span className="text-gray-500">{getPortalName()}</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400 sm:w-4 sm:h-4">
              <polyline points="9,18 15,12 9,6"/>
            </svg>
            <span className="text-gray-900 font-medium truncate">{getPageTitle()}</span>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-2 sm:space-x-4">
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
                  {getNotifications().map((notification) => (
                    <div key={notification.id} className="flex items-start space-x-3">
                      <div className={`w-2 h-2 ${getNotificationColor(notification.type)} rounded-full mt-2`}></div>
                      <div>
                        <p className="text-sm text-gray-900">{notification.message}</p>
                        <p className="text-xs text-gray-500">{notification.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
    </header>
  );
}