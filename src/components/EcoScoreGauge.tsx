interface EcoScoreGaugeProps {
  score: number;
  previousScore?: number;
  size?: number;
}

export function EcoScoreGauge({ score, previousScore, size = 200 }: EcoScoreGaugeProps) {
  const radius = (size - 20) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const getColor = (s: number) => {
    if (s >= 80) return '#10b981';
    if (s >= 60) return '#3b82f6';
    if (s >= 40) return '#f59e0b';
    return '#f43f5e';
  };

  const color = getColor(score);
  const delta = previousScore !== undefined ? score - previousScore : undefined;

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          <defs>
            <linearGradient id="ecoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={color} stopOpacity="0.4" />
              <stop offset="100%" stopColor={color} stopOpacity="1" />
            </linearGradient>
          </defs>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="10"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="url(#ecoGradient)"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 1.2s ease-out' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-5xl font-bold font-display" style={{ color }}>
            {score}
          </span>
          <span className="text-xs text-slate-400 mt-1">Eco Score</span>
          {delta !== undefined && delta !== 0 && (
            <span className={`text-xs font-medium mt-1 ${delta > 0 ? 'text-eco-400' : 'text-rose-400'}`}>
              {delta > 0 ? '↑' : '↓'} {Math.abs(delta)} pts
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
