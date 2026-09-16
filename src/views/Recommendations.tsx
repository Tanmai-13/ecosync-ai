import {
  Lightbulb,
  Globe,
  Box,
  Video,
  RefreshCw,
  Battery,
  Layers,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { GlassCard } from '@/components/GlassCard';
import { SectionHeader } from '@/components/SectionHeader';
import { mockRecommendations } from '@/data/mockData';
import type { Recommendation } from '@/types';

const iconMap: Record<string, typeof Globe> = {
  globe: Globe,
  box: Box,
  video: Video,
  sync: RefreshCw,
  battery: Battery,
  layers: Layers,
};

const severityConfig = {
  high: { bg: 'bg-rose-500/15', text: 'text-rose-400', border: 'border-rose-500/20', label: 'High Priority' },
  medium: { bg: 'bg-amber-500/15', text: 'text-amber-400', border: 'border-amber-500/20', label: 'Medium Priority' },
  low: { bg: 'bg-eco-500/15', text: 'text-eco-400', border: 'border-eco-500/20', label: 'Low Priority' },
};

function RecommendationCard({ rec }: { rec: Recommendation }) {
  const Icon = iconMap[rec.icon] ?? Lightbulb;
  const sev = severityConfig[rec.severity];

  return (
    <GlassCard className="p-5" hover>
      <div className="flex items-start gap-4">
        <div className={`w-11 h-11 rounded-xl ${sev.bg} ${sev.border} border flex items-center justify-center flex-shrink-0`}>
          <Icon className={`w-5 h-5 ${sev.text}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-3">
            <span className={`chip ${sev.bg} ${sev.text} ${sev.border} border`}>
              <AlertTriangle className="w-3 h-3" />
              {sev.label}
            </span>
          </div>

          <div className="space-y-3">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Problem</p>
              <p className="text-sm text-slate-200 leading-relaxed">{rec.problem}</p>
            </div>

            <div className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 text-eco-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-xs font-semibold text-eco-400 uppercase tracking-wider mb-1">Suggested Action</p>
                <p className="text-sm text-slate-200 leading-relaxed">{rec.action}</p>
              </div>
            </div>

            <div className="flex items-start gap-2 p-3 rounded-xl bg-eco-500/5 border border-eco-500/15">
              <TrendingUp className="w-4 h-4 text-eco-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-xs font-semibold text-eco-400 uppercase tracking-wider mb-1">Expected Benefit</p>
                <p className="text-sm text-eco-100/90 leading-relaxed">{rec.benefit}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}

export function Recommendations() {
  const sorted = [...mockRecommendations].sort((a, b) => {
    const order = { high: 0, medium: 1, low: 2 };
    return order[a.severity] - order[b.severity];
  });

  const highCount = mockRecommendations.filter((r) => r.severity === 'high').length;
  const mediumCount = mockRecommendations.filter((r) => r.severity === 'medium').length;
  const lowCount = mockRecommendations.filter((r) => r.severity === 'low').length;

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Smart Recommendations"
        subtitle="AI-generated suggestions to optimize your workspace efficiency"
        icon={<Lightbulb className="w-5 h-5" />}
      />

      {/* AI Banner */}
      <GlassCard className="p-5 border-eco-500/20 bg-gradient-to-r from-eco-500/5 to-cyber-500/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-eco-500/20 to-cyber-500/20 border border-white/10 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-eco-400" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-slate-200">
              <span className="text-eco-400 font-semibold">AI has analyzed your workspace</span> and generated {mockRecommendations.length} personalized recommendations.
            </p>
            <p className="text-xs text-slate-500 mt-0.5">Implementing all suggestions could improve your Eco Score by up to 14 points and save ~6.8W of energy.</p>
          </div>
        </div>
      </GlassCard>

      {/* Priority Summary */}
      <div className="grid grid-cols-3 gap-4">
        <GlassCard className="p-4 border-rose-500/15 text-center">
          <p className="text-3xl font-bold font-display text-rose-400">{highCount}</p>
          <p className="text-xs text-slate-400 mt-1">High Priority</p>
        </GlassCard>
        <GlassCard className="p-4 border-amber-500/15 text-center">
          <p className="text-3xl font-bold font-display text-amber-400">{mediumCount}</p>
          <p className="text-xs text-slate-400 mt-1">Medium Priority</p>
        </GlassCard>
        <GlassCard className="p-4 border-eco-500/15 text-center">
          <p className="text-3xl font-bold font-display text-eco-400">{lowCount}</p>
          <p className="text-xs text-slate-400 mt-1">Low Priority</p>
        </GlassCard>
      </div>

      {/* Recommendation Cards */}
      <div className="space-y-4">
        {sorted.map((rec) => (
          <RecommendationCard key={rec.id} rec={rec} />
        ))}
      </div>

      <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/15 text-center">
        <p className="text-xs text-amber-400/80">
          EcoSync AI provides recommendations only — it does not terminate applications or modify your operating system settings.
        </p>
      </div>
    </div>
  );
}
