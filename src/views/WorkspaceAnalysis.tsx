import { useState } from 'react';
import {
  ScanSearch,
  Loader2,
  Flame,
  Moon,
  Layers,
  BatteryWarning,
  Gauge,
  CheckCircle2,
} from 'lucide-react';
import { GlassCard } from '@/components/GlassCard';
import { SectionHeader } from '@/components/SectionHeader';
import { ProgressBar } from '@/components/ProgressBar';
import { StatusBadge } from '@/components/StatusBadge';
import type { AnalysisResult, AppProcess } from '@/types';
import { mockApplications } from '@/data/mockData';

interface WorkspaceAnalysisProps {
  analysis: AnalysisResult | null;
  onAnalyze: () => void;
}

function AppRow({ app, highlight }: { app: AppProcess; highlight?: 'cpu' | 'memory' | 'battery' }) {
  return (
    <div className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] transition-colors">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-medium text-white truncate">{app.name}</span>
          <StatusBadge
            status={app.status === 'active' ? 'success' : app.status === 'background' ? 'info' : 'warning'}
            label={app.status}
          />
        </div>
        <div className="flex items-center gap-4 text-xs text-slate-400">
          <span>CPU: {app.cpuUsage}%</span>
          <span>RAM: {(app.memoryMB / 1024).toFixed(1)} GB</span>
          <span>Last active: {app.lastActiveMin}m ago</span>
        </div>
      </div>
      <div className="w-24 hidden sm:block">
        {highlight === 'cpu' && <ProgressBar value={app.cpuUsage} color={app.cpuUsage > 10 ? 'rose' : 'cyber'} height="h-1.5" />}
        {highlight === 'memory' && <ProgressBar value={(app.memoryMB / 3072) * 100} color={app.memoryMB > 1500 ? 'amber' : 'eco'} height="h-1.5" />}
        {highlight === 'battery' && (
          <span className={`chip ${app.batteryImpact === 'high' ? 'bg-rose-500/15 text-rose-400' : app.batteryImpact === 'medium' ? 'bg-amber-500/15 text-amber-400' : 'bg-eco-500/15 text-eco-400'}`}>
            <BatteryWarning className="w-3 h-3" />
            {app.batteryImpact}
          </span>
        )}
      </div>
    </div>
  );
}

function AnalysisCard({
  title,
  icon: Icon,
  apps,
  highlight,
  accent,
  emptyMsg,
}: {
  title: string;
  icon: typeof Flame;
  apps: AppProcess[];
  highlight?: 'cpu' | 'memory' | 'battery';
  accent: string;
  emptyMsg: string;
}) {
  return (
    <GlassCard className="p-5">
      <div className="flex items-center gap-2 mb-4">
        <div className={`w-9 h-9 rounded-lg ${accent} flex items-center justify-center`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white">{title}</h4>
          <p className="text-xs text-slate-500">{apps.length} applications</p>
        </div>
      </div>
      <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
        {apps.length > 0 ? (
          apps.map((app) => <AppRow key={app.id} app={app} highlight={highlight} />)
        ) : (
          <p className="text-xs text-slate-500 text-center py-6">{emptyMsg}</p>
        )}
      </div>
    </GlassCard>
  );
}

export function WorkspaceAnalysis({ analysis, onAnalyze }: WorkspaceAnalysisProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      onAnalyze();
      setIsAnalyzing(false);
    }, 2000);
  };

  const highResource = analysis?.highResourceApps ?? mockApplications.filter((a) => a.cpuUsage > 5);
  const lowUse = analysis?.lowUseApps ?? mockApplications.filter((a) => a.status === 'idle' && a.lastActiveMin > 20);
  const background = analysis?.backgroundProcesses ?? mockApplications.filter((a) => a.status === 'background');
  const batteryImpacting = analysis?.batteryImpactingApps ?? mockApplications.filter((a) => a.batteryImpact === 'high');
  const score = analysis?.efficiencyScore ?? 72;

  const scoreColor = score >= 80 ? 'text-eco-400' : score >= 60 ? 'text-cyber-400' : 'text-amber-400';
  const scoreBg = score >= 80 ? 'from-eco-500/20 to-eco-500/5 border-eco-500/20' : score >= 60 ? 'from-cyber-500/20 to-cyber-500/5 border-cyber-500/20' : 'from-amber-500/20 to-amber-500/5 border-amber-500/20';

  return (
    <div className="space-y-6">
      <SectionHeader
        title="AI Workspace Analysis"
        subtitle="Intelligent scan of your active applications, processes, and resource usage"
        icon={<ScanSearch className="w-5 h-5" />}
        action={
          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="btn-primary flex items-center gap-2 disabled:opacity-60"
          >
            {isAnalyzing ? <Loader2 className="w-5 h-5 animate-spin" /> : <ScanSearch className="w-5 h-5" />}
            {isAnalyzing ? 'Analyzing...' : 'Analyze Workspace'}
          </button>
        }
      />

      {isAnalyzing && (
        <GlassCard className="p-8 border-eco-500/20" glow="eco">
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="w-16 h-16 rounded-full border-4 border-eco-500/20 border-t-eco-400 animate-spin" />
              <ScanSearch className="w-7 h-7 text-eco-400 absolute inset-0 m-auto" />
            </div>
            <p className="text-sm text-slate-300 mt-4 font-medium">AI analyzing workspace data...</p>
            <div className="mt-3 space-y-1.5 w-full max-w-xs">
              {['Scanning active processes...', 'Measuring CPU & memory usage...', 'Evaluating battery impact...', 'Calculating efficiency score...'].map((step, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-slate-400 animate-fade-in" style={{ animationDelay: `${i * 400}ms` }}>
                  <CheckCircle2 className="w-3.5 h-3.5 text-eco-400" />
                  {step}
                </div>
              ))}
            </div>
          </div>
        </GlassCard>
      )}

      {!isAnalyzing && (
        <>
          {/* Efficiency Score Banner */}
          <GlassCard className={`p-6 bg-gradient-to-r ${scoreBg} border`}>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <Gauge className="w-8 h-8 text-eco-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Overall Workspace Efficiency Score</p>
                  <div className="flex items-baseline gap-2">
                    <span className={`text-4xl font-bold font-display ${scoreColor}`}>{score}</span>
                    <span className="text-sm text-slate-400">/ 100</span>
                  </div>
                </div>
              </div>
              <div className="max-w-sm">
                <p className="text-sm text-slate-300 leading-relaxed">
                  {score >= 80
                    ? 'Your workspace is running efficiently. Minor optimizations could save additional energy.'
                    : score >= 60
                    ? 'Your workspace has moderate efficiency. Several applications are consuming more resources than necessary.'
                    : 'Your workspace needs attention. Multiple high-resource applications are impacting performance and battery life.'}
                </p>
              </div>
            </div>
          </GlassCard>

          {/* Analysis Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <AnalysisCard
              title="High-Resource Applications"
              icon={Flame}
              apps={highResource}
              highlight="cpu"
              accent="bg-gradient-to-br from-rose-500 to-rose-600"
              emptyMsg="No high-resource applications detected"
            />
            <AnalysisCard
              title="Low-Use Applications"
              icon={Moon}
              apps={lowUse}
              accent="bg-gradient-to-br from-cyber-500 to-cyber-600"
              emptyMsg="No low-use applications detected"
            />
            <AnalysisCard
              title="Background Processes"
              icon={Layers}
              apps={background}
              accent="bg-gradient-to-br from-amber-500 to-amber-600"
              emptyMsg="No background processes running"
            />
            <AnalysisCard
              title="Battery-Impacting Applications"
              icon={BatteryWarning}
              apps={batteryImpacting}
              highlight="battery"
              accent="bg-gradient-to-br from-orange-500 to-rose-600"
              emptyMsg="No battery-impacting applications detected"
            />
          </div>

          {/* AI Summary */}
          <GlassCard className="p-6 border-eco-500/20">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-eco-500/15 flex items-center justify-center">
                <ScanSearch className="w-4 h-4 text-eco-400" />
              </div>
              <h4 className="text-sm font-semibold text-white">AI Analysis Summary</h4>
            </div>
            <div className="space-y-2 text-sm text-slate-300 leading-relaxed">
              <p>
                <span className="text-eco-400 font-medium">Key finding:</span> Google Chrome (18.4% CPU, 2.8 GB RAM) and Docker Desktop (12.1% CPU, 1.8 GB RAM) are the primary resource consumers. Together they account for {Math.round(((18.4 + 12.1) / 100) * 100)}% of your total CPU load.
              </p>
              <p>
                <span className="text-cyber-400 font-medium">Background overhead:</span> {background.length} background processes are consuming resources without active user interaction. Pausing non-essential ones could save ~4W of power.
              </p>
              <p>
                <span className="text-amber-400 font-medium">Battery impact:</span> {batteryImpacting.length} applications are classified as high-impact for battery life. Prioritizing their optimization could extend battery time by ~1.5 hours.
              </p>
              <p>
                <span className="text-eco-400 font-medium">Recommendation:</span> Visit the Recommendations tab for specific, actionable steps to improve your efficiency score by up to {100 - score} points.
              </p>
            </div>
          </GlassCard>
        </>
      )}
    </div>
  );
}
