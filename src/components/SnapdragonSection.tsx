import {
  Cpu,
  Zap,
  ShieldCheck,
  CloudOff,
  Leaf,
} from 'lucide-react';
import { GlassCard } from '@/components/GlassCard';

const features = [
  {
    icon: Cpu,
    title: 'On-Device AI',
    description: 'Workspace analysis runs directly on your Snapdragon NPU, enabling real-time insights without sending data to the cloud.',
  },
  {
    icon: Zap,
    title: 'Efficient AI Inference',
    description: 'Models are optimized for low-power execution on the Hexagon DSP, delivering intelligent analysis with minimal energy overhead.',
  },
  {
    icon: ShieldCheck,
    title: 'Privacy-Focused Local Processing',
    description: 'Your usage patterns and application data never leave your device. All analysis is performed locally for maximum confidentiality.',
  },
  {
    icon: CloudOff,
    title: 'Reduced Cloud Dependency',
    description: 'By shifting computation on-device, EcoSync AI eliminates cloud round-trips — saving bandwidth, reducing latency, and cutting energy use.',
  },
  {
    icon: Leaf,
    title: 'Energy-Efficient Computing',
    description: "Snapdragon's heterogeneous computing architecture allocates tasks to the most efficient core, maximizing performance per watt.",
  },
];

export function SnapdragonSection() {
  return (
    <GlassCard className="p-6 border-eco-500/20" glow="eco">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-eco-500/20 to-cyber-500/20 border border-eco-500/30 flex items-center justify-center">
          <Cpu className="w-6 h-6 text-eco-400" />
        </div>
        <div>
          <h3 className="text-lg font-bold font-display text-white">Optimized for Snapdragon-Powered PCs</h3>
          <p className="text-xs text-slate-400">Intelligent, efficient, and private by design</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((f) => {
          const Icon = f.icon;
          return (
            <div key={f.title} className="p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-eco-500/20 transition-colors duration-300">
              <div className="w-9 h-9 rounded-lg bg-eco-500/10 flex items-center justify-center mb-3">
                <Icon className="w-5 h-5 text-eco-400" />
              </div>
              <h4 className="text-sm font-semibold text-white mb-1.5">{f.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{f.description}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-5 p-4 rounded-xl bg-amber-500/5 border border-amber-500/15">
        <p className="text-xs text-amber-400/80 leading-relaxed">
          <strong className="font-semibold">Note:</strong> EcoSync AI is designed for Snapdragon-powered HP PCs. This prototype uses simulated metrics for demonstration. When connected to real Windows system APIs and Qualcomm AI Hub models, on-device inference will provide real-time hardware readings.
        </p>
      </div>
    </GlassCard>
  );
}
