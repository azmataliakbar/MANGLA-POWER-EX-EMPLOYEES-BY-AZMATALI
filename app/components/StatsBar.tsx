import { Users, Building2, Briefcase, MapPin } from 'lucide-react';

interface StatsBarProps {
  totalEmployees: number;
  uniqueSections: number;
  retiredCount: number;
  locationsCount: number;
}

export default function StatsBar({ totalEmployees, uniqueSections, retiredCount, locationsCount }: StatsBarProps) {
  const stats = [
    {
      icon: Users,
      label: 'Total Members',
      value: totalEmployees,
      color: 'from-blue-500 to-blue-600',
      ariaLabel: `${totalEmployees} total members`
    },
    {
      icon: Building2,
      label: 'Sections',
      value: uniqueSections,
      color: 'from-green-500 to-green-600',
      ariaLabel: `${uniqueSections} different sections`
    },
    {
      icon: Briefcase,
      label: 'Retired',
      value: retiredCount,
      color: 'from-purple-500 to-purple-600',
      ariaLabel: `${retiredCount} retired members`
    },
    {
      icon: MapPin,
      label: 'Cities',
      value: locationsCount,
      color: 'from-orange-500 to-orange-600',
      ariaLabel: `${locationsCount} different cities`
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div 
            key={index}
            className={`bg-gradient-to-br ${stat.color} rounded-lg p-3 text-white shadow-lg`}
            aria-label={stat.ariaLabel}
          >
            <Icon className="w-6 h-6 mb-1" aria-hidden="true" />
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-xs opacity-90">{stat.label}</p>
          </div>
        );
      })}
    </div>
  );
}