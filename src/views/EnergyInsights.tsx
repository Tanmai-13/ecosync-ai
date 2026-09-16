import { useState } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Bar,
  BarChart,
  Legend,
} from 'recharts';
import { TrendingUp, Cpu, MemoryStick, Zap, Leaf, Clock } from 'lucide-react';
import { GlassCard } from '@/components/GlassCard';
import { SectionHeader } from '@/components/SectionHeader';
import { mockTimeSeries } from '@/data/mockData';

type ChartTab = 'cpu' | 'ram' | 'energy' | 'savings';

const tabs: { id: ChartTab; label: string; icon: typeof Cpu; color: string }[] = [
  { id: 'cpu', label: 'CPU Usage', icon: Cpu, color: '#3b82f6' },
  { id: 'ram', label: 'Memory Usage', icon: MemoryStick, color: '#f59e0b' },
  { id: 'energy', label: 'Energy Consumption', icon: Zap, color: '#f43f5e' },
  { id: 'savings', label: 'Energy Savings', icon: Leaf, color: '#10b981' },
];

const customTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-card px-3 py-2 border-white/20">
      <p className="text-xs text-slate-400 mb-1">{label}</p>
      {payload.map((p: any) => (
        <p key={p.dataKey} className="text-xs font-medium" style={{ color: p.color }}>
          {p.name}: {p.value}{p.unit || '%'}
        </p>
      ))}
    </div>
  );
};

export function EnergyInsights() {
  const [activeTab, setActiveTab] = useState<ChartTab>('cpu');
  const currentTab = tabs.find((t) => t.id === activeTab)!;

  const renderChart = () => {
    const data = mockTimeSeries;

    if (activeTab === 'cpu') {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="cpuGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="time" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
            <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} unit="%" />
            <Tooltip content={customTooltip} />
            <Area type="monotone" dataKey="cpu" name="CPU" stroke="#3b82f6" strokeWidth={2} fill="url(#cpuGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      );
    }

    if (activeTab === 'ram') {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="ramGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="time" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
            <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} unit="%" />
            <Tooltip content={customTooltip} />
            <Area type="monotone" dataKey="ram" name="RAM" stroke="#f59e0b" strokeWidth={2} fill="url(#ramGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      );
    }

    if (activeTab === 'energy') {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <defs>
              <linearGradient id="energyGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f43f5e" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#f43f5e" stopOpacity={0.2} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="time" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
            <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} unit="W" />
            <Tooltip content={customTooltip} />
            <Bar dataKey="energy" name="Energy" fill="url(#energyGrad)" radius={[6, 6, 0, 0]} unit="W" />
          </BarChart>
        </ResponsiveContainer>
      );
    }

    return (
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="time" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
          <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} unit="W" />
          <Tooltip content={customTooltip} />
          <Line type="monotone" dataKey="saved" name="Saved" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981', r: 3 }} activeDot={{ r: 6 }} unit="W" />
        </LineChart>
      </ResponsiveContainer>
    );
  };

  const avgCpu = Math.round(mockTimeSeries.reduce((s, d) => s + d.cpu, 0) / mockTimeSeries.length);
  const avgRam = Math.round(mockTimeSeries.reduce((s, d) => s + d.ram, 0) / mockTimeSeries.length);
  const avgEnergy = (mockTimeSeries.reduce((s, d) => s + d.energy, 0) / mockTimeSeries.length).toFixed(1);
  const totalSaved = mockTimeSeries.reduce((s, d) => s + d.saved, 0).toFixed(1);

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Energy Insights"
        subtitle="Real-time visualization of your workspace's resource and energy patterns"
        icon={<TrendingUp className="w-5 h-5" />}
      />

      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Avg CPU', value: `${avgCpu}%`, icon: Cpu, color: 'text-cyber-400' },
          { label: 'Avg RAM', value: `${avgRam}%`, icon: MemoryStick, color: 'text-amber-400' },
          { label: 'Avg Energy', value: `${avgEnergy}W`, icon: Zap, color: 'text-rose-400' },
          { label: 'Total Saved', value: `${totalSaved}W`, icon: Leaf, color: 'text-eco-400' },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <GlassCard key={stat.label} className="p-4" hover>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-xs text-slate-400">{stat.label}</p>
                  <p className="text-lg font-bold font-display text-white">{stat.value}</p>
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>

      {/* Main Interactive Chart */}
      <GlassCard className="p-6">
        <div className="flex flex-wrap gap-2 mb-5">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
                  ${isActive ? 'bg-white/10 border border-white/20 text-white' : 'bg-white/[0.03] border border-white/5 text-slate-400 hover:text-white hover:bg-white/[0.06]'}`}
              >
                <Icon className="w-4 h-4" style={{ color: isActive ? tab.color : undefined }} />
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="mb-4">
          <h4 className="text-sm font-semibold text-white mb-1">{currentTab.label} Over Time</h4>
          <p className="text-xs text-slate-500">Today, 09:00 — 14:30 (last 6 hours)</p>
        </div>

        {renderChart()}
      </GlassCard>

      {/* Combined Overview Chart */}
      <GlassCard className="p-6">
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-white mb-1">Energy: Consumption vs Savings</h4>
          <p className="text-xs text-slate-500">Compare your power draw against energy saved through optimization</p>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={mockTimeSeries}>
            <defs>
              <linearGradient id="consumptionGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f43f5e" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#f43f5e" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="savedGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="time" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
            <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} unit="W" />
            <Tooltip content={customTooltip} />
            <Legend wrapperStyle={{ fontSize: '12px' }} />
            <Area type="monotone" dataKey="energy" name="Consumption (W)" stroke="#f43f5e" strokeWidth={2} fill="url(#consumptionGrad)" unit="W" />
            <Area type="monotone" dataKey="saved" name="Saved (W)" stroke="#10b981" strokeWidth={2} fill="url(#savedGrad)" unit="W" />
          </AreaChart>
        </ResponsiveContainer>
      </GlassCard>

      {/* Quick Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <GlassCard className="p-5 border-eco-500/15">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-eco-400" />
            <h4 className="text-sm font-semibold text-white">Peak Usage Window</h4>
          </div>
          <p className="text-2xl font-bold font-display text-white mb-1">11:30 — 12:30</p>
          <p className="text-xs text-slate-400">CPU peaked at 52% during this period. Consider scheduling heavy tasks outside this window.</p>
        </GlassCard>

        <GlassCard className="p-5 border-cyber-500/15">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-cyber-400" />
            <h4 className="text-sm font-semibold text-white">Efficiency Trend</h4>
          </div>
          <p className="text-2xl font-bold font-display text-white mb-1">↑ 14%</p>
          <p className="text-xs text-slate-400">Energy savings have increased steadily throughout the day as optimizations take effect.</p>
        </GlassCard>

        <GlassCard className="p-5 border-amber-500/15">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-amber-400" />
            <h4 className="text-sm font-semibold text-white">Net Energy Balance</h4>
          </div>
          <p className="text-2xl font-bold font-display text-white mb-1">−{((parseFloat(avgEnergy) * mockTimeSeries.length - parseFloat(totalSaved)) / mockTimeSeries.length).toFixed(1)}W avg</p>
          <p className="text-xs text-slate-400">Your workspace consumes less than the baseline average for similar workloads.</p>
        </GlassCard>
      </div>
    </div>
  );
}
