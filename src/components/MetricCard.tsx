import type { ReactNode } from 'react';

interface MetricCardProps {
  label: string;
  value: string | number;
  unit?: string;
  icon: ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  accent: 'eco' | 'cyber' | 'amber' | 'rose';
  children?: ReactNode;
}

const accentMap = {
  eco: {
    bg: 'from-eco-500/10 to-eco-500/5',
    border: 'border-eco-500/20',
    iconBg: 'bg-eco-500/15 text-eco-400',
  },
  cyber: {
    bg: 'from-cyber-500/10 to-cyber-500/5',
    border: 'border-cyber-500/20',
    iconBg: 'bg-cyber-500/15 text-cyber-400',
  },
  amber: {
    bg: 'from-amber-500/10 to-amber-500/5',
    border: 'border-amber-500/20',
    iconBg: 'bg-amber-500/15 text-amber-400',
  },
  rose: {
    bg: 'from-rose-500/10 to-rose-500/5',
    border: 'border-rose-500/20',
    iconBg: 'bg-rose-500/15 text-rose-400',
  },
};

export function MetricCard({ label, value, unit, icon, trend, trendValue, accent, children }: MetricCardProps) {
  const a = accentMap[accent];
  const trendColor = trend === 'up' ? 'text-eco-400' : trend === 'down' ? 'text-rose-400' : 'text-slate-400';
  const trendArrow = trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→';

  return (
    <div className={`glass-card p-5 border ${a.border} bg-gradient-to-br ${a.bg}`}>
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${a.iconBg}`}>
          {icon}
        </div>
        {trend && trendValue && (
          <span className={`text-xs font-medium ${trendColor}`}>
            {trendArrow} {trendValue}
          </span>
        )}
      </div>
      <p className="text-slate-400 text-sm mb-1">{label}</p>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold font-display text-white">{value}</span>
        {unit && <span className="text-sm text-slate-400 font-medium">{unit}</span>}
      </div>
      {children}
    </div>
  );
}
