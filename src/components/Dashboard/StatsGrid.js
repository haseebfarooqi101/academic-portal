import DashboardCard from "../DashboardCard";

export default function StatsGrid({ stats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <DashboardCard
          key={index}
          title={stat.title}
          value={stat.value}
          subtitle={stat.subtitle}
          color={stat.color}
          icon={stat.icon}
          trend={stat.trend}
        />
      ))}
    </div>
  );
}