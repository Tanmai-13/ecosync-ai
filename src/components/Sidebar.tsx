import {
  LayoutDashboard,
  ScanSearch,
  TrendingUp,
  Lightbulb,
  UserCog,
  MessageSquare,
  ShieldCheck,
  Info,
  Leaf,
  X,
} from 'lucide-react';
import type { ViewId } from '@/types';

interface SidebarProps {
  activeView: ViewId;
  onNavigate: (view: ViewId) => void;
  isOpen: boolean;
  onClose: () => void;
}

const navItems: { id: ViewId; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'analysis', label: 'Workspace Analysis', icon: ScanSearch },
  { id: 'insights', label: 'Energy Insights', icon: TrendingUp },
  { id: 'recommendations', label: 'Recommendations', icon: Lightbulb },
  { id: 'profiles', label: 'Profiles', icon: UserCog },
  { id: 'assistant', label: 'AI Assistant', icon: MessageSquare },
  { id: 'privacy', label: 'Privacy', icon: ShieldCheck },
  { id: 'about', label: 'About', icon: Info },
];

export function Sidebar({ activeView, onNavigate, isOpen, onClose }: SidebarProps) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-72 z-50 transition-transform duration-300 lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        bg-ink-900/80 backdrop-blur-xl border-r border-white/10 flex flex-col`}
      >
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-eco-500 to-cyber-500 flex items-center justify-center shadow-lg shadow-eco-500/20">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold font-display text-white leading-tight">EcoSync AI</h1>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider">Energy Optimizer</p>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`nav-link w-full ${isActive ? 'nav-link-active' : ''}`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-eco-400' : ''}`} />
                <span>{item.label}</span>
                {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-eco-400 animate-pulse" />}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="glass-card p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-eco-400 animate-pulse" />
              <span className="text-xs font-medium text-eco-400">System Online</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Snapdragon-optimized AI inference running locally. Privacy-first mode active.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
