export type ViewId =
  | 'dashboard'
  | 'analysis'
  | 'insights'
  | 'recommendations'
  | 'profiles'
  | 'assistant'
  | 'privacy'
  | 'about';

export interface SystemMetrics {
  batteryLevel: number;
  batteryRemainingHours: number;
  cpuUsage: number;
  ramUsage: number;
  ramTotalGB: number;
  ramUsedGB: number;
  activeApps: number;
  energyConsumption: number;
  energySaved: number;
  optimizationStatus: 'Optimized' | 'Balanced' | 'Needs Attention';
}

export interface TimeSeriesPoint {
  time: string;
  cpu: number;
  ram: number;
  energy: number;
  saved: number;
}

export interface AppProcess {
  id: string;
  name: string;
  category: 'browser' | 'development' | 'communication' | 'media' | 'background' | 'system' | 'productivity';
  cpuUsage: number;
  memoryMB: number;
  batteryImpact: 'high' | 'medium' | 'low';
  status: 'active' | 'background' | 'idle';
  lastActiveMin: number;
}

export interface Recommendation {
  id: string;
  problem: string;
  action: string;
  benefit: string;
  severity: 'high' | 'medium' | 'low';
  icon: string;
}

export type ProfileId = 'study' | 'coding' | 'meeting' | 'performance' | 'battery-saver';

export interface WorkspaceProfile {
  id: ProfileId;
  name: string;
  icon: string;
  description: string;
  color: string;
  settings: string[];
  suggestions: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface AnalysisResult {
  highResourceApps: AppProcess[];
  lowUseApps: AppProcess[];
  backgroundProcesses: AppProcess[];
  batteryImpactingApps: AppProcess[];
  efficiencyScore: number;
  timestamp: number;
}
