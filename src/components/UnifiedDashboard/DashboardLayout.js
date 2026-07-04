import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openSidebar, setMobile, selectSidebar } from '../../redux/slices/uiSlice';
import { useToast } from '../../hooks/useToast';
import Toast from '../Toast';
import DashboardSidebar from './DashboardSidebar';
import DashboardHeader from './DashboardHeader';

export default function DashboardLayout({ 
  children,
  currentUser,
  menuItems,
  activeItem,
  setActiveItem
}) {
  const dispatch = useDispatch();
  const { isOpen, isCollapsed, isMobile } = useSelector(selectSidebar);
  const { toast, hideToast } = useToast();

  // Screen size detection
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 1024;
      dispatch(setMobile(mobile));
      
      // Auto-open sidebar on desktop
      if (!mobile) {
        dispatch(openSidebar());
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-white">
      {/* Toast */}
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={hideToast}
        />
      )}
      <div className="flex ">
      {/* Sidebar */}
      <DashboardSidebar
        userRole={currentUser.role}
        currentUser={currentUser}
        menuItems={menuItems}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
      />
      
      
      
      
      {/* Main Content */}
      <main 
        className={`flex flex-col transition-all duration-300 ease-in-out overflow-y-auto min-h-screen pt-8 ${
          isMobile ? 'p-6' : isOpen ? 'pl-0'  :""
        }`}
      >
        {children}
        <div>
          {/* Header */}
      <DashboardHeader
        userRole={currentUser.role}
        menuItems={menuItems}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
      />
        </div>
      </main>
    </div>
    </div>
  );
}
