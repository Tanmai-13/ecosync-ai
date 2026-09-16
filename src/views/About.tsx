import {
  Info,
  Leaf,
  ScanSearch,
  TrendingUp,
  Lightbulb,
  UserCog,
  MessageSquare,
  ShieldCheck,
  Cpu,
  Zap,
  Target,
  ArrowRight,
  Github,
  Code,
} from 'lucide-react';
import { GlassCard } from '@/components/GlassCard';
import { SectionHeader } from '@/components/SectionHeader';
import { SnapdragonSection } from '@/components/SnapdragonSection';
import type { ViewId } from '@/types';

interface AboutProps {
  onNavigate: (view: ViewId) => void;
}

export function About({ onNavigate }: AboutProps) {
  const features = [
    { icon: ScanSearch, title: 'Monitor', desc: 'Real-time tracking of CPU, RAM, battery, and energy metrics', view: 'dashboard' as ViewId },
    { icon: TrendingUp, title: 'Analyze', desc: 'AI-powered workspace analysis with efficiency scoring', view: 'analysis' as ViewId },
    { icon: Lightbulb, title: 'Recommend', desc: 'Personalized, actionable optimization suggestions', view: 'recommendations' as ViewId },
    { icon: UserCog, title: 'Optimize', desc: 'Workspace profiles tailored to your activity', view: 'profiles' as ViewId },
    { icon: MessageSquare, title: 'Ask AI', desc: 'Chat assistant for energy and efficiency questions', view: 'assistant' as ViewId },
    { icon: ShieldCheck, title: 'Privacy', desc: 'On-device AI with zero cloud dependency', view: 'privacy' as ViewId },
  ];

  return (
    <div className="space-y-6">
      <SectionHeader
        title="About EcoSync AI"
        subtitle="Intelligent workspace & energy optimization for Snapdragon-powered HP PCs"
        icon={<Info className="w-5 h-5" />}
      />

      {/* Hero */}
      <GlassCard className="p-8 bg-gradient-to-br from-eco-500/5 to-cyber-500/5 border-eco-500/15">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-eco-500 to-cyber-500 flex items-center justify-center shadow-lg shadow-eco-500/20">
            <Leaf className="w-7 h-7 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold font-display text-white">EcoSync AI</h3>
            <p className="text-sm text-slate-400">Intelligent Workspace &amp; Energy Optimizer</p>
          </div>
        </div>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed max-w-3xl">
          EcoSync AI uses intelligent analysis to understand workspace activity, identify inefficient resource usage, and provide actionable recommendations for improving performance and energy efficiency. Built for Snapdragon-powered HP PCs, it leverages on-device AI to deliver real-time insights while keeping your data private.
        </p>
      </GlassCard>

      {/* Philosophy */}
      <GlassCard className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-5 h-5 text-eco-400" />
          <h3 className="text-lg font-bold font-display text-white">Our Mission</h3>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed mb-4">
          Every watt of energy saved contributes to a more sustainable digital future. EcoSync AI bridges the gap between performance and sustainability — helping you get the most from your PC while consuming less power.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { icon: Cpu, title: 'Smarter Computing', desc: 'AI-driven insights into how your workspace uses resources' },
            { icon: Zap, title: 'Efficient Performance', desc: 'Optimize without sacrificing the experience you need' },
            { icon: Leaf, title: 'Sustainable Workspace', desc: 'Reduce energy waste and your digital carbon footprint' },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                <Icon className="w-5 h-5 text-eco-400 mb-2" />
                <h4 className="text-sm font-semibold text-white mb-1">{item.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </GlassCard>

      {/* Feature Grid */}
      <div>
        <h3 className="text-lg font-bold font-display text-white mb-4">What EcoSync AI Can Do</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <GlassCard key={f.title} className="p-5" hover>
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-eco-500/15 to-cyber-500/15 border border-white/10 flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5 text-eco-400" />
                </div>
                <h4 className="text-sm font-semibold text-white mb-1">{f.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">{f.desc}</p>
                <button
                  onClick={() => onNavigate(f.view)}
                  className="text-xs font-medium text-eco-400 hover:text-eco-300 flex items-center gap-1 transition-colors"
                >
                  Explore <ArrowRight className="w-3 h-3" />
                </button>
              </GlassCard>
            );
          })}
        </div>
      </div>

      {/* Storyline */}
      <GlassCard className="p-6">
        <h3 className="text-lg font-bold font-display text-white mb-4">The Optimization Journey</h3>
        <p className="text-sm text-slate-400 leading-relaxed mb-5">
          EcoSync AI guides you through a complete cycle: from monitoring your workspace metrics to saving energy through intelligent optimization.
        </p>
        <div className="flex flex-wrap items-center gap-2">
          {['Monitor', 'Analyze', 'Understand', 'Recommend', 'Optimize', 'Save Energy'].map((step, i, arr) => (
            <div key={step} className="flex items-center gap-2">
              <span className="px-4 py-2 rounded-xl bg-gradient-to-r from-eco-500/15 to-cyber-500/15 border border-eco-500/20 text-sm font-medium text-white">
                {step}
              </span>
              {i < arr.length - 1 && <ArrowRight className="w-4 h-4 text-slate-600" />}
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Snapdragon */}
      <SnapdragonSection />

      {/* Tech Stack */}
      <GlassCard className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Code className="w-5 h-5 text-cyber-400" />
          <h3 className="text-lg font-bold font-display text-white">Built With</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { name: 'React', desc: 'UI framework' },
            { name: 'TypeScript', desc: 'Type-safe code' },
            { name: 'Tailwind CSS', desc: 'Styling system' },
            { name: 'Recharts', desc: 'Data visualization' },
            { name: 'Lucide Icons', desc: 'Icon system' },
            { name: 'Vite', desc: 'Build tooling' },
            { name: 'Snapdragon NPU', desc: 'On-device AI' },
            { name: 'Qualcomm AI Hub', desc: 'Model deployment' },
          ].map((tech) => (
            <div key={tech.name} className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-center">
              <p className="text-sm font-semibold text-white">{tech.name}</p>
              <p className="text-xs text-slate-500 mt-0.5">{tech.desc}</p>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Future Roadmap */}
      <GlassCard className="p-6 border-cyber-500/15">
        <div className="flex items-center gap-2 mb-4">
          <Github className="w-5 h-5 text-cyber-400" />
          <h3 className="text-lg font-bold font-display text-white">Designed for Extension</h3>
        </div>
        <p className="text-sm text-slate-400 leading-relaxed mb-4">
          This prototype is built with a modular architecture, designed to be extended with real hardware integration:
        </p>
        <div className="space-y-2">
          {[
            'Windows system APIs for real-time CPU, RAM, and battery readings',
            'Snapdragon-specific optimizations via Qualcomm SDK',
            'Qualcomm AI Hub models for on-device ML inference',
            'Real on-device AI inference for workspace pattern recognition',
            'Integration with HP Power Manager for hardware-level controls',
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-slate-300">
              <span className="text-cyber-400 mt-0.5">▸</span>
              {item}
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
