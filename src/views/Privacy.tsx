import {
  ShieldCheck,
  Lock,
  Eye,
  UserCheck,
  CloudOff,
  Cpu,
  Database,
  Server,
  KeyRound,
} from 'lucide-react';
import { GlassCard } from '@/components/GlassCard';
import { SectionHeader } from '@/components/SectionHeader';

const principles = [
  {
    icon: Cpu,
    title: 'Local Analysis',
    description: 'Workspace analysis can be performed entirely on your device using on-device AI inference. No data needs to leave your PC to generate insights.',
  },
  {
    icon: Database,
    title: 'No Unnecessary Data Collection',
    description: 'EcoSync AI does not collect personal data, browsing history, or usage patterns beyond what is needed for workspace optimization. Everything stays on your device.',
  },
  {
    icon: UserCheck,
    title: 'You Remain in Control',
    description: 'Recommendations are just that — recommendations. EcoSync AI never terminates applications, modifies system settings, or takes action without your explicit approval.',
  },
  {
    icon: Lock,
    title: 'Privacy-First AI Approach',
    description: 'Our AI models are designed to run locally on Snapdragon NPUs, ensuring your workspace data is processed privately without cloud round-trips.',
  },
];

const flow = [
  { icon: Eye, label: 'Workspace Data', sub: 'Stays on device', color: 'text-cyber-400' },
  { icon: Cpu, label: 'On-Device AI', sub: 'Local inference', color: 'text-eco-400' },
  { icon: ShieldCheck, label: 'Privacy Preserved', sub: 'No cloud upload', color: 'text-eco-400' },
  { icon: UserCheck, label: 'You Decide', sub: 'Full control', color: 'text-cyber-400' },
];

export function Privacy() {
  return (
    <div className="space-y-6">
      <SectionHeader
        title="Privacy"
        subtitle="How EcoSync AI protects your data and respects your autonomy"
        icon={<ShieldCheck className="w-5 h-5" />}
      />

      {/* Hero Banner */}
      <GlassCard className="p-8 border-eco-500/20 bg-gradient-to-br from-eco-500/5 to-cyber-500/5" glow="eco">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-eco-500/20 to-cyber-500/20 border border-eco-500/30 flex items-center justify-center flex-shrink-0">
            <ShieldCheck className="w-8 h-8 text-eco-400" />
          </div>
          <div>
            <h3 className="text-xl font-bold font-display text-white mb-2">Privacy-First by Design</h3>
            <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
              EcoSync AI is built on a simple principle: your workspace data belongs to you. All analysis runs locally on your Snapdragon-powered device, ensuring that your usage patterns, application data, and system metrics never leave your control.
            </p>
          </div>
        </div>
      </GlassCard>

      {/* Data Flow */}
      <GlassCard className="p-6">
        <h4 className="text-sm font-semibold text-white mb-5">How Your Data Stays Private</h4>
        <div className="flex flex-col md:flex-row items-center gap-3">
          {flow.map((step, i) => {
            const Icon = step.icon;
            const isLast = i === flow.length - 1;
            return (
              <div key={step.label} className="flex items-center flex-1 w-full md:w-auto">
                <div className="flex flex-col items-center text-center flex-1">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-2">
                    <Icon className={`w-6 h-6 ${step.color}`} />
                  </div>
                  <span className="text-sm font-medium text-white">{step.label}</span>
                  <span className="text-xs text-slate-500 mt-0.5">{step.sub}</span>
                </div>
                {!isLast && (
                  <div className="hidden md:block w-8 lg:w-12 h-0.5 bg-gradient-to-r from-eco-500/30 to-cyber-500/30" />
                )}
              </div>
            );
          })}
        </div>
      </GlassCard>

      {/* Privacy Principles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {principles.map((p) => {
          const Icon = p.icon;
          return (
            <GlassCard key={p.title} className="p-5" hover>
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-eco-500/10 border border-eco-500/20 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-eco-400" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white mb-1.5">{p.title}</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">{p.description}</p>
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>

      {/* Technical Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <GlassCard className="p-5 border-cyber-500/15">
          <div className="flex items-center gap-2 mb-3">
            <CloudOff className="w-5 h-5 text-cyber-400" />
            <h4 className="text-sm font-semibold text-white">No Cloud Required</h4>
          </div>
          <ul className="space-y-2 text-xs text-slate-400">
            <li className="flex items-start gap-2"><span className="text-eco-400 mt-0.5">✓</span> AI inference runs on-device</li>
            <li className="flex items-start gap-2"><span className="text-eco-400 mt-0.5">✓</span> No telemetry or analytics sent</li>
            <li className="flex items-start gap-2"><span className="text-eco-400 mt-0.5">✓</span> No account required for core features</li>
            <li className="flex items-start gap-2"><span className="text-eco-400 mt-0.5">✓</span> Works offline</li>
          </ul>
        </GlassCard>

        <GlassCard className="p-5 border-eco-500/15">
          <div className="flex items-center gap-2 mb-3">
            <Server className="w-5 h-5 text-eco-400" />
            <h4 className="text-sm font-semibold text-white">Local Processing</h4>
          </div>
          <ul className="space-y-2 text-xs text-slate-400">
            <li className="flex items-start gap-2"><span className="text-eco-400 mt-0.5">✓</span> Snapdragon NPU acceleration</li>
            <li className="flex items-start gap-2"><span className="text-eco-400 mt-0.5">✓</span> Qualcomm AI Hub model support</li>
            <li className="flex items-start gap-2"><span className="text-eco-400 mt-0.5">✓</span> Zero-latency analysis</li>
            <li className="flex items-start gap-2"><span className="text-eco-400 mt-0.5">✓</span> Reduced energy from no network calls</li>
          </ul>
        </GlassCard>

        <GlassCard className="p-5 border-amber-500/15">
          <div className="flex items-center gap-2 mb-3">
            <KeyRound className="w-5 h-5 text-amber-400" />
            <h4 className="text-sm font-semibold text-white">Your Control</h4>
          </div>
          <ul className="space-y-2 text-xs text-slate-400">
            <li className="flex items-start gap-2"><span className="text-eco-400 mt-0.5">✓</span> Opt in to any optimization</li>
            <li className="flex items-start gap-2"><span className="text-eco-400 mt-0.5">✓</span> No automatic app termination</li>
            <li className="flex items-start gap-2"><span className="text-eco-400 mt-0.5">✓</span> Clear recommendations only</li>
            <li className="flex items-start gap-2"><span className="text-eco-400 mt-0.5">✓</span> Demo mode for safe exploration</li>
          </ul>
        </GlassCard>
      </div>

      <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-center">
        <p className="text-xs text-slate-500 leading-relaxed">
          This prototype uses simulated metrics and does not access real system data. When deployed with Windows system APIs and Snapdragon hardware, all processing remains local and private.
        </p>
      </div>
    </div>
  );
}
