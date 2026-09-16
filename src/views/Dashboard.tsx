import {
  Battery,
  Cpu,
  MemoryStick,
  AppWindow,
  Zap,
  Leaf,
  Gauge,
  ScanSearch,
  Play,
  Info,
  Sparkles,
  Activity,
  TrendingDown,
} from 'lucide-react';
import { GlassCard } from '@/components/GlassCard';
import { MetricCard } from '@/components/MetricCard';
import { EcoScoreGauge } from '@/components/EcoScoreGauge';
import { ProgressBar } from '@/components/ProgressBar';
import { StatusBadge } from '@/components/StatusBadge';
import { SnapdragonSection } from '@/components/SnapdragonSection';
import type { SystemMetrics, ViewId } from '@/types';

interface DashboardProps {
  metrics: SystemMetrics;
  ecoScore: number;
  previousScore: number;
  demoMode: boolean;
  onAnalyze: () => void;
  onNavigate: (view: ViewId) => void;
}

export function Dashboard({ metrics, ecoScore, previousScore, demoMode, onAnalyze, onNavigate }: DashboardProps) {
  const savingsPotential = Math.round((100 - ecoScore) * 0.4);
  const statusConfig = {
    'Optimized': { status: 'success' as const, label: 'Optimized' },
    'Balanced': { status: 'warning' as const, label: 'Balanced' },
    'Needs Attention': { status: 'error' as const, label: 'Needs Attention' },
  };
  const currentStatus = statusConfig[metrics.optimizationStatus];

  return (
    <div className="space-y-6">
      {/* Hero / Header */}
      <GlassCard className="p-8 md:p-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-glow pointer-events-none" />
        <div className="absolute inset-0 bg-grid-pattern bg-[size:40px_40px] opacity-30 pointer-events-none" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-4">
            <span className="chip bg-eco-500/15 text-eco-400 border border-eco-500/20">
              <Sparkles className="w-3.5 h-3.5" />
              AI-Powered Energy Optimization
            </span>
            {demoMode && (
              <span className="chip bg-cyber-500/15 text-cyber-400 border border-cyber-500/20">
                <Activity className="w-3.5 h-3.5" />
                Demo Mode Active
              </span>
            )}
          </div>

          <h1 className="text-3xl md:text-5xl font-bold font-display text-white mb-3">
            EcoSync <span className="text-gradient-eco">AI</span>
          </h1>
          <p className="text-lg text-slate-300 mb-2 font-medium">Intelligent Workspace &amp; Energy Optimizer</p>
          <p className="text-sm md:text-base text-slate-400 max-w-2xl leading-relaxed mb-6">
            Smarter computing. Efficient performance. A more sustainable digital workspace.
          </p>

          <div className="flex flex-wrap gap-3">
            <button onClick={onAnalyze} className="btn-primary flex items-center gap-2">
              <ScanSearch className="w-5 h-5" />
              Analyze Workspace
            </button>
            <button onClick={() => onNavigate('about')} className="btn-secondary flex items-center gap-2">
              <Info className="w-5 h-5" />
              About
            </button>
          </div>
        </div>
      </GlassCard>

      {/* Optimization Status Bar */}
      <div className="flex flex-wrap items-center gap-3">
        <StatusBadge status={currentStatus.status} label={`Status: ${currentStatus.label}`} />
        <StatusBadge status="info" label={`Last Analysis: 2 min ago`} />
        <StatusBadge status="success" label={`Energy Saved: ${metrics.energySaved}W`} />
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <MetricCard
          label="Battery Level"
          value={metrics.batteryLevel}
          unit="%"
          icon={<Battery className="w-5 h-5" />}
          accent="eco"
          trend="down"
          trendValue="3%/hr"
        >
          <div className="mt-3">
            <ProgressBar value={metrics.batteryLevel} color="eco" height="h-1.5" />
            <p className="text-xs text-slate-500 mt-1.5">~{metrics.batteryRemainingHours}h remaining</p>
          </div>
        </MetricCard>

        <MetricCard
          label="CPU Usage"
          value={metrics.cpuUsage}
          unit="%"
          icon={<Cpu className="w-5 h-5" />}
          accent="cyber"
          trend="down"
          trendValue="5%"
        >
          <div className="mt-3">
            <ProgressBar value={metrics.cpuUsage} color="cyber" height="h-1.5" />
          </div>
        </MetricCard>

        <MetricCard
          label="Memory (RAM)"
          value={metrics.ramUsage}
          unit="%"
          icon={<MemoryStick className="w-5 h-5" />}
          accent="amber"
          trend="up"
          trendValue="2%"
        >
          <div className="mt-3">
            <ProgressBar value={metrics.ramUsage} color="amber" height="h-1.5" />
            <p className="text-xs text-slate-500 mt-1.5">{metrics.ramUsedGB} / {metrics.ramTotalGB} GB</p>
          </div>
        </MetricCard>

        <MetricCard
          label="Active Applications"
          value={metrics.activeApps}
          icon={<AppWindow className="w-5 h-5" />}
          accent="cyber"
        >
          <p className="text-xs text-slate-500 mt-2">3 in background, 2 idle</p>
        </MetricCard>

        <MetricCard
          label="Energy Consumption"
          value={metrics.energyConsumption}
          unit="W"
          icon={<Zap className="w-5 h-5" />}
          accent="rose"
          trend="down"
          trendValue="1.2W"
        >
          <p className="text-xs text-slate-500 mt-2">Below average for this workload</p>
        </MetricCard>

        <MetricCard
          label="Energy Saved"
          value={metrics.energySaved}
          unit="W"
          icon={<Leaf className="w-5 h-5" />}
          accent="eco"
          trend="up"
          trendValue="0.8W"
        >
          <p className="text-xs text-slate-500 mt-2">≈ 2.1 kg CO₂ saved this month</p>
        </MetricCard>

        <MetricCard
          label="Optimization Status"
          value={metrics.optimizationStatus}
          icon={<Gauge className="w-5 h-5" />}
          accent="eco"
        >
          <p className="text-xs text-slate-500 mt-2">Auto-tuning in progress</p>
        </MetricCard>

        <MetricCard
          label="Power Trend"
          value="−12%"
          icon={<TrendingDown className="w-5 h-5" />}
          accent="eco"
          trend="down"
          trendValue="vs yesterday"
        >
          <p className="text-xs text-slate-500 mt-2">Lower consumption trend</p>
        </MetricCard>
      </div>

      {/* Eco Score + Storyline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassCard className="p-6 lg:col-span-1 flex flex-col items-center justify-center">
          <h3 className="text-sm font-semibold text-slate-300 mb-4 self-start">Workspace Efficiency Score</h3>
          <EcoScoreGauge score={ecoScore} previousScore={previousScore} size={180} />
          <div className="mt-5 w-full space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Energy-saving potential</span>
              <span className="text-eco-400 font-medium">{savingsPotential}W</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Previous score</span>
              <span className="text-slate-300 font-medium">{previousScore}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Current score</span>
              <span className="text-eco-400 font-medium">{ecoScore}</span>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6 lg:col-span-2">
          <h3 className="text-sm font-semibold text-slate-300 mb-4">How Your Score Is Calculated</h3>
          <p className="text-sm text-slate-400 leading-relaxed mb-4">
            Your Eco Score reflects how efficiently your workspace uses system resources. It combines CPU utilization, memory pressure, background process overhead, and energy consumption patterns into a single 0–100 score.
          </p>
          <div className="space-y-3">
            {[
              { label: 'CPU Efficiency', weight: '30%', value: 75, color: 'cyber' as const },
              { label: 'Memory Management', weight: '25%', value: 62, color: 'amber' as const },
              { label: 'Background Process Load', weight: '20%', value: 68, color: 'eco' as const },
              { label: 'Energy Consumption', weight: '15%', value: 80, color: 'eco' as const },
              { label: 'Battery Health', weight: '10%', value: 72, color: 'eco' as const },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">{item.label} <span className="text-slate-500">({item.weight})</span></span>
                  <span className="text-slate-400">{item.value}/100</span>
                </div>
                <ProgressBar value={item.value} color={item.color} height="h-1.5" />
              </div>
            ))}
          </div>

          <div className="mt-5 p-3 rounded-xl bg-eco-500/5 border border-eco-500/15">
            <p className="text-xs text-eco-400/80 leading-relaxed">
              Higher scores mean your workspace is running efficiently with minimal waste. Scores above 80 indicate an optimized, energy-conscious setup.
            </p>
          </div>
        </GlassCard>
      </div>

      {/* Optimization Storyline */}
      <GlassCard className="p-6">
        <h3 className="text-sm font-semibold text-slate-300 mb-5">Your Optimization Journey</h3>
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-0">
          {[
            { label: 'Monitor', icon: Activity, desc: 'Track metrics', done: true },
            { label: 'Analyze', icon: ScanSearch, desc: 'AI scans workspace', done: true },
            { label: 'Understand', icon: Sparkles, desc: 'Identify inefficiencies', done: true },
            { label: 'Recommend', icon: Zap, desc: 'Get suggestions', done: false },
            { label: 'Optimize', icon: Cpu, desc: 'Apply changes', done: false },
            { label: 'Save Energy', icon: Leaf, desc: 'Reduce consumption', done: false },
          ].map((step, i, arr) => {
            const Icon = step.icon;
            const isLast = i === arr.length - 1;
            return (
              <div key={step.label} className="flex items-center flex-1">
                <div className="flex flex-col items-center text-center flex-1">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-2 transition-all
                    ${step.done ? 'bg-eco-500/20 border border-eco-500/30 text-eco-400' : 'bg-white/5 border border-white/10 text-slate-500'}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`text-xs font-medium ${step.done ? 'text-white' : 'text-slate-500'}`}>{step.label}</span>
                  <span className="text-[10px] text-slate-500 mt-0.5">{step.desc}</span>
                </div>
                {!isLast && (
                  <div className={`h-0.5 w-full md:w-8 lg:w-12 ${step.done ? 'bg-eco-500/30' : 'bg-white/5'}`} />
                )}
              </div>
            );
          })}
        </div>
      </GlassCard>

      {/* Snapdragon Section */}
      <SnapdragonSection />
    </div>
  );
}
