interface ProgressBarProps {
  value: number;
  max?: number;
  color?: 'eco' | 'cyber' | 'amber' | 'rose';
  height?: string;
  showLabel?: boolean;
}

const colorMap = {
  eco: 'from-eco-500 to-eco-400',
  cyber: 'from-cyber-500 to-cyber-400',
  amber: 'from-amber-500 to-amber-400',
  rose: 'from-rose-500 to-rose-400',
};

export function ProgressBar({ value, max = 100, color = 'eco', height = 'h-2', showLabel = false }: ProgressBarProps) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="w-full">
      <div className={`w-full ${height} bg-white/5 rounded-full overflow-hidden`}>
        <div
          className={`h-full bg-gradient-to-r ${colorMap[color]} rounded-full transition-all duration-700 ease-out`}
          style={{ width: `${pct}%` }}
        />
      </div>
      {showLabel && (
        <div className="flex justify-end mt-1">
          <span className="text-xs text-slate-400">{Math.round(pct)}%</span>
        </div>
      )}
    </div>
  );
}
