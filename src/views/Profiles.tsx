import { useState } from 'react';
import {
  BookOpen,
  Code,
  Video,
  Zap,
  BatteryCharging,
  UserCog,
  Check,
  Lightbulb,
  Cpu,
  Bell,
  Monitor,
  Wifi,
} from 'lucide-react';
import { GlassCard } from '@/components/GlassCard';
import { SectionHeader } from '@/components/SectionHeader';
import { mockProfiles } from '@/data/mockData';
import type { ProfileId, WorkspaceProfile } from '@/types';

const iconMap: Record<string, typeof BookOpen> = {
  'book-open': BookOpen,
  'code': Code,
  'video': Video,
  'zap': Zap,
  'battery-saving': BatteryCharging,
};

export function Profiles() {
  const [selected, setSelected] = useState<ProfileId>('coding');
  const profile = mockProfiles.find((p) => p.id === selected)!;

  const settingIcons = [Cpu, Bell, Monitor, Wifi];

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Workspace Profiles"
        subtitle="Choose a profile that matches your current activity for tailored optimization"
        icon={<UserCog className="w-5 h-5" />}
      />

      {/* Profile Selector */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {mockProfiles.map((p) => {
          const Icon = iconMap[p.icon] ?? BookOpen;
          const isActive = selected === p.id;
          return (
            <button
              key={p.id}
              onClick={() => setSelected(p.id)}
              className={`p-4 rounded-2xl text-center transition-all duration-300 border
                ${isActive
                  ? `bg-gradient-to-br ${p.color} border-white/20 shadow-lg scale-[1.02]`
                  : 'bg-white/[0.03] border-white/5 hover:bg-white/[0.06] hover:border-white/10'}`}
            >
              <div className={`w-12 h-12 rounded-xl mx-auto mb-2 flex items-center justify-center
                ${isActive ? 'bg-white/20' : 'bg-white/5'}`}>
                <Icon className={`w-6 h-6 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              </div>
              <p className={`text-sm font-semibold ${isActive ? 'text-white' : 'text-slate-300'}`}>{p.name}</p>
            </button>
          );
        })}
      </div>

      {/* Selected Profile Detail */}
      <GlassCard className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${profile.color} flex items-center justify-center shadow-lg`}>
            {(() => {
              const Icon = iconMap[profile.icon] ?? BookOpen;
              return <Icon className="w-7 h-7 text-white" />;
            })()}
          </div>
          <div>
            <h3 className="text-xl font-bold font-display text-white">{profile.name} Mode</h3>
            <p className="text-sm text-slate-400">{profile.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recommended Settings */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-cyber-500/15 flex items-center justify-center">
                <Cpu className="w-4 h-4 text-cyber-400" />
              </div>
              Recommended Settings
            </h4>
            <div className="space-y-2">
              {profile.settings.map((setting, i) => {
                const SettingIcon = settingIcons[i % settingIcons.length];
                return (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5">
                    <div className="w-7 h-7 rounded-lg bg-eco-500/10 flex items-center justify-center flex-shrink-0">
                      <SettingIcon className="w-3.5 h-3.5 text-eco-400" />
                    </div>
                    <span className="text-sm text-slate-200">{setting}</span>
                    <Check className="w-4 h-4 text-eco-400 ml-auto flex-shrink-0" />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Optimization Suggestions */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-eco-500/15 flex items-center justify-center">
                <Lightbulb className="w-4 h-4 text-eco-400" />
              </div>
              Optimization Suggestions
            </h4>
            <div className="space-y-2">
              {profile.suggestions.map((suggestion, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5">
                  <div className="w-7 h-7 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                  </div>
                  <span className="text-sm text-slate-200 leading-relaxed">{suggestion}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Expected Impact */}
        <div className="mt-6 grid grid-cols-3 gap-3">
          {[
            { label: 'Est. Battery Gain', value: profile.id === 'battery-saver' ? '+2.0h' : profile.id === 'performance' ? '−0.5h' : '+0.8h', color: profile.id === 'performance' ? 'text-rose-400' : 'text-eco-400' },
            { label: 'Energy Savings', value: profile.id === 'battery-saver' ? '35%' : profile.id === 'performance' ? '5%' : '18%', color: 'text-eco-400' },
            { label: 'Performance', value: profile.id === 'performance' ? '100%' : profile.id === 'battery-saver' ? '65%' : '85%', color: 'text-cyber-400' },
          ].map((stat) => (
            <div key={stat.label} className="text-center p-3 rounded-xl bg-white/[0.03] border border-white/5">
              <p className={`text-xl font-bold font-display ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-slate-400 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Note */}
      <div className="p-4 rounded-xl bg-cyber-500/5 border border-cyber-500/15">
        <p className="text-xs text-cyber-300/70 leading-relaxed">
          Profiles provide recommendations and visual guidance only. EcoSync AI does not modify system settings directly — you remain in full control of your device.
        </p>
      </div>
    </div>
  );
}
