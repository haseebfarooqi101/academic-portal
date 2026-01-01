import { useScreenSize } from "../../hooks/useScreenSize";

export default function SignupTabs({ activeTab, setActiveTab }) {
  const { isMobile, width, getFieldWidth, getMaxFieldWidth } = useScreenSize();
  
  // Calculate responsive widths
  const getTabsContainerWidth = () => {
    if (isMobile) {
      return getFieldWidth();
    }
    return '416px';
  };
  
  const getTabsInnerWidth = () => {
    if (isMobile) {
      if (width < 400) {
        return `calc(${getFieldWidth()} - 20px)`; // Account for outer padding
      }
      return `calc(${getFieldWidth()} - 20px)`;
    }
    return '332px';
  };
  
  const getTabButtonWidth = () => {
    if (isMobile) {
      if (width < 400) {
        return `calc((${getFieldWidth()} - 38px) / 2)`; // Split available width minus padding and gap
      }
      return `calc((${getFieldWidth()} - 38px) / 2)`;
    }
    return activeTab === "student" || activeTab === "teacher" ? '162px' : '150px';
  };

  return (
    <>
      {isMobile ? (
        <div className="flex justify-center w-full">
          <div 
            className="flex justify-center items-center"
            style={{
              width: getTabsContainerWidth(),
              maxWidth: getMaxFieldWidth(),
              height: '48px',
              gap: '10px',
              paddingTop: '4px',
              paddingRight: '10px',
              paddingBottom: '4px',
              paddingLeft: '10px'
            }}
          >
            {/* Inner tabs container */}
            <div 
              className="flex items-center justify-center shadow-sm"
              style={{
                width: getTabsInnerWidth(),
                height: '40px',
                padding: '4px',
                borderRadius: '4px',
                borderWidth: '1px',
                borderColor: '#E4E4E7',
                gap: width < 400 ? '4px' : '10px',
                backgroundColor: '#F4F4F5'
              }}
            >
              <button
                onClick={() => setActiveTab("student")}
                className={`flex items-center justify-center font-medium text-sm transition-all duration-200 ${
                  activeTab === "student"
                    ? "bg-white shadow-md"
                    : "hover:opacity-80"
                }`}
                style={activeTab === "student" ? {
                  width: getTabButtonWidth(),
                  height: '32px',
                  paddingTop: '6px',
                  paddingRight: width < 400 ? '8px' : '12px',
                  paddingBottom: '6px',
                  paddingLeft: width < 400 ? '8px' : '12px',
                  borderRadius: '2px',
                  gap: '10px',
                  color: '#09090B',
                  fontSize: width < 400 ? '12px' : '14px'
                } : {
                  width: getTabButtonWidth(),
                  height: '32px',
                  borderRadius: '4px',
                  boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
                  backdropFilter: 'blur(2px)',
                  color: '#1018280',
                  fontSize: width < 400 ? '12px' : '14px'
                }}
              >
                Student
              </button>

              <button
                onClick={() => setActiveTab("teacher")}
                className={`flex items-center justify-center font-medium text-sm transition-all duration-200 ${
                  activeTab === "teacher"
                    ? "bg-white shadow-md"
                    : "hover:opacity-80"
                }`}
                style={activeTab === "teacher" ? {
                  width: getTabButtonWidth(),
                  height: '32px',
                  paddingTop: '6px',
                  paddingRight: width < 400 ? '8px' : '12px',
                  paddingBottom: '6px',
                  paddingLeft: width < 400 ? '8px' : '12px',
                  borderRadius: '2px',
                  gap: '10px',
                  color: '#09090B',
                  fontSize: width < 400 ? '12px' : '14px'
                } : {
                  width: getTabButtonWidth(),
                  height: '32px',
                  borderRadius: '4px',
                  boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
                  backdropFilter: 'blur(2px)',
                  color: '#71717A',
                  fontSize: width < 400 ? '12px' : '14px'
                }}
              >
                {width < 400 ? 'Teacher/Admin' : 'Teacher / Admin'}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div 
          className="flex justify-center items-center"
          style={{
            width: '416px',
            height: '48px',
            gap: '10px',
            paddingTop: '4px',
            paddingRight: '10px',
            paddingBottom: '4px',
            paddingLeft: '10px'
          }}
        >
          {/* Inner tabs container */}
          <div 
            className="flex items-center justify-center shadow-sm"
            style={{
              width: '332px',
              height: '40px',
              padding: '4px',
              borderRadius: '4px',
              borderWidth: '1px',
              borderColor: '#E4E4E7',
              gap: '10px',
              backgroundColor: '#F4F4F5'
            }}
          >
            <button
              onClick={() => setActiveTab("student")}
              className={`flex items-center justify-center font-medium text-sm transition-all duration-200 ${
                activeTab === "student"
                  ? "bg-white shadow-md"
                  : "hover:opacity-80"
              }`}
              style={activeTab === "student" ? {
                width: '162px',
                height: '32px',
                paddingTop: '6px',
                paddingRight: '12px',
                paddingBottom: '6px',
                paddingLeft: '12px',
                borderRadius: '2px',
                gap: '10px',
                color: '#09090B'
              } : {
                width: '150px',
                height: '32px',
                borderRadius: '4px',
                boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
                backdropFilter: 'blur(2px)',
                color: '#1018280'
              }}
            >
              Student
            </button>

            <button
              onClick={() => setActiveTab("teacher")}
              className={`flex items-center justify-center font-medium text-sm transition-all duration-200 ${
                activeTab === "teacher"
                  ? "bg-white shadow-md"
                  : "hover:opacity-80"
              }`}
              style={activeTab === "teacher" ? {
                width: '162px',
                height: '32px',
                paddingTop: '6px',
                paddingRight: '12px',
                paddingBottom: '6px',
                paddingLeft: '12px',
                borderRadius: '2px',
                gap: '10px',
                color: '#09090B'
              } : {
                width: '150px',
                height: '32px',
                borderRadius: '4px',
                boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
                backdropFilter: 'blur(2px)',
                color: '#71717A'
              }}
            >
              Teacher / Admin
            </button>
          </div>
        </div>
      )}
    </>
  );
}