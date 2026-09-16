import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Info,
} from 'lucide-react';

type Status = 'success' | 'warning' | 'error' | 'info';

interface StatusBadgeProps {
  status: Status;
  label: string;
}

const config = {
  success: { icon: CheckCircle2, bg: 'bg-eco-500/15', text: 'text-eco-400', border: 'border-eco-500/20' },
  warning: { icon: AlertTriangle, bg: 'bg-amber-500/15', text: 'text-amber-400', border: 'border-amber-500/20' },
  error: { icon: XCircle, bg: 'bg-rose-500/15', text: 'text-rose-400', border: 'border-rose-500/20' },
  info: { icon: Info, bg: 'bg-cyber-500/15', text: 'text-cyber-400', border: 'border-cyber-500/20' },
};

export function StatusBadge({ status, label }: StatusBadgeProps) {
  const c = config[status];
  const Icon = c.icon;
  return (
    <span className={`chip ${c.bg} ${c.text} border ${c.border}`}>
      <Icon className="w-3.5 h-3.5" />
      {label}
    </span>
  );
}
