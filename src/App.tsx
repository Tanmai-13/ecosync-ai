import { useState } from 'react';
import { Menu, Activity, ScanSearch } from 'lucide-react';
import { Sidebar } from '@/components/Sidebar';
import { Dashboard } from '@/views/Dashboard';
import { WorkspaceAnalysis } from '@/views/WorkspaceAnalysis';
import { EnergyInsights } from '@/views/EnergyInsights';
import { Recommendations } from '@/views/Recommendations';
import { Profiles } from '@/views/Profiles';
import { AIAssistant } from '@/views/AIAssistant';
import { Privacy } from '@/views/Privacy';
import { About } from '@/views/About';
import { mockSystemMetrics, mockApplications } from '@/data/mockData';
import type { AnalysisResult, SystemMetrics, ViewId } from '@/types';

export default function App() {
  const [activeView, setActiveView] = useState<ViewId>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [demoMode, setDemoMode] = useState(true);
  const [ecoScore] = useState(72);
  const [previousScore] = useState(65);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);

  const metrics: SystemMetrics = mockSystemMetrics;

  const handleAnalyze = () => {
    const highResource = mockApplications.filter((a) => a.cpuUsage > 5);
    const lowUse = mockApplications.filter((a) => a.status === 'idle' && a.lastActiveMin > 20);
    const background = mockApplications.filter((a) => a.status === 'background');
    const batteryImpacting = mockApplications.filter((a) => a.batteryImpact === 'high');

    setAnalysis({
      highResourceApps: highResource,
      lowUseApps: lowUse,
      backgroundProcesses: background,
      batteryImpactingApps: batteryImpacting,
      efficiencyScore: ecoScore,
      timestamp: Date.now(),
    });
    setActiveView('analysis');
  };

  const handleNavigate = (view: ViewId) => {
    setActiveView(view);
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return (
          <Dashboard
            metrics={metrics}
            ecoScore={ecoScore}
            previousScore={previousScore}
            demoMode={demoMode}
            onAnalyze={handleAnalyze}
            onNavigate={handleNavigate}
          />
        );
      case 'analysis':
        return <WorkspaceAnalysis analysis={analysis} onAnalyze={handleAnalyze} />;
      case 'insights':
        return <EnergyInsights />;
      case 'recommendations':
        return <Recommendations />;
      case 'profiles':
        return <Profiles />;
      case 'assistant':
        return <AIAssistant />;
      case 'privacy':
        return <Privacy />;
      case 'about':
        return <About onNavigate={handleNavigate} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-ink-900 text-slate-200 flex">
      <Sidebar
        activeView={activeView}
        onNavigate={handleNavigate}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 min-w-0 flex flex-col">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-ink-900/80 backdrop-blur-xl border-b border-white/10">
          <div className="flex items-center justify-between px-4 py-3 lg:px-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="hidden lg:flex items-center gap-2 text-sm text-slate-400">
              <span className="text-slate-500">EcoSync AI</span>
              <span className="text-slate-600">/</span>
              <span className="text-white font-medium capitalize">
                {activeView === 'analysis' ? 'Workspace Analysis' : activeView}
              </span>
            </div>

            <div className="flex items-center gap-3">
              {/* Demo Mode Toggle */}
              <button
                onClick={() => setDemoMode((v) => !v)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all"
                disabled
                title="Demo mode is always on for this prototype"
              >
                <Activity className={`w-3.5 h-3.5 ${demoMode ? 'text-eco-400' : 'text-slate-500'}`} />
                <span className={demoMode ? 'text-eco-400' : 'text-slate-400'}>Demo Mode</span>
                <div className={`w-8 h-4 rounded-full p-0.5 transition-colors ${demoMode ? 'bg-eco-500/30' : 'bg-white/10'}`}>
                  <div className={`w-3 h-3 rounded-full bg-white transition-transform ${demoMode ? 'translate-x-4' : ''}`} />
                </div>
              </button>

              <button
                onClick={handleAnalyze}
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-eco-500/20 to-cyber-500/20 border border-eco-500/30 hover:from-eco-500/30 hover:to-cyber-500/30 transition-all"
              >
                <ScanSearch className="w-4 h-4 text-eco-400" />
                Analyze
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-6 max-w-7xl mx-auto w-full">
          <div className="animate-fade-in">{renderView()}</div>
        </main>

        {/* Footer */}
        <footer className="border-t border-white/10 py-4 px-6">
          <div className="flex items-center justify-between text-xs text-slate-500 max-w-7xl mx-auto">
            <span>EcoSync AI — Intelligent Workspace &amp; Energy Optimizer</span>
            <span className="hidden sm:inline">Optimized for Snapdragon · Privacy-First · On-Device AI</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
