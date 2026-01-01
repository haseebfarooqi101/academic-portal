import { useNavigation } from '../../contexts/NavigationContext';

export default function BreadcrumbNavigation() {
  const { getBreadcrumbs, navigateToLevel, navigateBack } = useNavigation();
  const breadcrumbs = getBreadcrumbs();

  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-500">Teacher Portal</span>
        {breadcrumbs.map((crumb, index) => (
          <div key={crumb.id} className="flex items-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400 mx-2">
              <polyline points="9,18 15,12 9,6"/>
            </svg>
            <button
              onClick={() => navigateToLevel(index)}
              className={`text-sm font-medium transition-colors ${
                crumb.isLast 
                  ? 'text-gray-900 cursor-default' 
                  : 'text-purple-600 hover:text-purple-800 cursor-pointer'
              }`}
              disabled={crumb.isLast}
            >
              {crumb.label}
            </button>
          </div>
        ))}
      </div>
      
      {breadcrumbs.length > 1 && (
        <button
          onClick={navigateBack}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15,18 9,12 15,6"/>
          </svg>
          Back
        </button>
      )}
    </div>
  );
}