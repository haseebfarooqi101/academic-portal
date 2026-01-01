import DashboardCard from "../DashboardCard";

export default function DepartmentGrid({ 
  departments, 
  onDepartmentClick, 
  getCardData 
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      {departments.map((dept, index) => {
        const cardData = getCardData(dept, index);
        return (
          <button
            key={dept}
            onClick={() => onDepartmentClick(dept, cardData)}
            className="text-left hover:shadow-lg transition-shadow"
          >
            <DashboardCard
              title={cardData.title}
              value={cardData.value}
              subtitle={cardData.subtitle}
              color={cardData.color}
              icon="🏢"
            />
            <div className="flex justify-end mt-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400">
                <polyline points="9,18 15,12 9,6"/>
              </svg>
            </div>
          </button>
        );
      })}
    </div>
  );
}