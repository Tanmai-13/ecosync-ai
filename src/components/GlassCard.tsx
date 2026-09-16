import type { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: 'eco' | 'cyber' | 'none';
  onClick?: () => void;
}

export function GlassCard({ children, className = '', hover = false, glow = 'none', onClick }: GlassCardProps) {
  const glowClass = glow === 'eco' ? 'glow-eco' : glow === 'cyber' ? 'glow-cyber' : '';
  return (
    <div
      onClick={onClick}
      className={`glass-card ${hover ? 'glass-hover' : ''} ${glowClass} ${className}`}
    >
      {children}
    </div>
  );
}
