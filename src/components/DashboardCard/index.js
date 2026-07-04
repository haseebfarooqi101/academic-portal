export default function DashboardCard({ 
  title, 
  value, 
  subtitle, 
  color = 'blue', 
  icon,
  trend,
  onClick 
}) {
  const getColorClasses = () => {
    switch (color) {
      case 'blue':
        return {
          bg: 'bg-blue-50',
          text: 'text-blue-700',
          border: 'border-blue-200'
        };
      case 'green':
        return {
          bg: 'bg-green-50',
          text: 'text-green-700',
          border: 'border-green-200'
        };
      case 'red':
        return {
          bg: 'bg-red-50',
          text: 'text-red-700',
          border: 'border-red-200'
        };
      case 'purple':
        return {
          bg: 'bg-purple-50',
          text: 'text-purple-700',
          border: 'border-purple-200'
        };
      case 'yellow':
        return {
          bg: 'bg-yellow-50',
          text: 'text-yellow-700',
          border: 'border-yellow-200'
        };
      default:
        return {
          bg: 'bg-gray-50',
          text: 'text-gray-700',
          border: 'border-gray-200'
        };
    }
  };

  const colors = getColorClasses();

  return (
    <div 
      className={`rounded-lg p-6 hover:shadow-md transition-shadow bg-white border border-gray-200 ${onClick ? 'cursor-pointer' : ''}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
          {subtitle && (
            <p className="text-sm text-gray-500">{subtitle}</p>
          )}
          {trend && (
            <div className="flex items-center mt-2">
              <span className={`text-sm font-medium ${trend.positive ? 'text-green-600' : 'text-red-600'}`}>
                {trend.positive ? '↗' : '↘'} {trend.value}
              </span>
              <span className="text-sm text-gray-500 ml-1">{trend.period}</span>
            </div>
          )}
        </div>
        {icon && (
          <div className={`${colors.bg} ${colors.text} p-3 rounded-lg`}>
            <div className="text-2xl">{icon}</div>
          </div>
        )}
      </div>
    </div>
  );
}