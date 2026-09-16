import type {
  AppProcess,
  Recommendation,
  SystemMetrics,
  TimeSeriesPoint,
  WorkspaceProfile,
} from '@/types';

export const mockSystemMetrics: SystemMetrics = {
  batteryLevel: 72,
  batteryRemainingHours: 5.5,
  cpuUsage: 34,
  ramUsage: 61,
  ramTotalGB: 16,
  ramUsedGB: 9.8,
  activeApps: 14,
  energyConsumption: 18.4,
  energySaved: 7.2,
  optimizationStatus: 'Balanced',
};

export const mockTimeSeries: TimeSeriesPoint[] = [
  { time: '09:00', cpu: 22, ram: 45, energy: 12.1, saved: 3.2 },
  { time: '09:30', cpu: 28, ram: 48, energy: 13.5, saved: 4.0 },
  { time: '10:00', cpu: 35, ram: 52, energy: 15.2, saved: 4.8 },
  { time: '10:30', cpu: 41, ram: 55, energy: 16.8, saved: 5.1 },
  { time: '11:00', cpu: 38, ram: 58, energy: 16.0, saved: 5.5 },
  { time: '11:30', cpu: 45, ram: 61, energy: 17.5, saved: 6.0 },
  { time: '12:00', cpu: 52, ram: 64, energy: 19.2, saved: 6.3 },
  { time: '12:30', cpu: 48, ram: 62, energy: 18.0, saved: 6.8 },
  { time: '13:00', cpu: 40, ram: 60, energy: 16.5, saved: 7.0 },
  { time: '13:30', cpu: 34, ram: 61, energy: 18.4, saved: 7.2 },
  { time: '14:00', cpu: 36, ram: 59, energy: 17.1, saved: 7.4 },
  { time: '14:30', cpu: 33, ram: 61, energy: 18.4, saved: 7.2 },
];

export const mockApplications: AppProcess[] = [
  { id: '1', name: 'Google Chrome', category: 'browser', cpuUsage: 18.4, memoryMB: 2840, batteryImpact: 'high', status: 'active', lastActiveMin: 2 },
  { id: '2', name: 'Visual Studio Code', category: 'development', cpuUsage: 8.2, memoryMB: 1120, batteryImpact: 'medium', status: 'active', lastActiveMin: 1 },
  { id: '3', name: 'Slack', category: 'communication', cpuUsage: 3.1, memoryMB: 680, batteryImpact: 'low', status: 'active', lastActiveMin: 5 },
  { id: '4', name: 'Microsoft Teams', category: 'communication', cpuUsage: 5.5, memoryMB: 920, batteryImpact: 'medium', status: 'background', lastActiveMin: 18 },
  { id: '5', name: 'Spotify', category: 'media', cpuUsage: 2.3, memoryMB: 420, batteryImpact: 'low', status: 'active', lastActiveMin: 3 },
  { id: '6', name: 'Docker Desktop', category: 'development', cpuUsage: 12.1, memoryMB: 1840, batteryImpact: 'high', status: 'background', lastActiveMin: 35 },
  { id: '7', name: 'Notion', category: 'productivity', cpuUsage: 1.8, memoryMB: 380, batteryImpact: 'low', status: 'active', lastActiveMin: 8 },
  { id: '8', name: 'OneDrive Sync', category: 'background', cpuUsage: 4.2, memoryMB: 210, batteryImpact: 'medium', status: 'background', lastActiveMin: 45 },
  { id: '9', name: 'Windows Update', category: 'system', cpuUsage: 6.8, memoryMB: 320, batteryImpact: 'medium', status: 'background', lastActiveMin: 60 },
  { id: '10', name: 'Figma', category: 'productivity', cpuUsage: 9.4, memoryMB: 1450, batteryImpact: 'medium', status: 'idle', lastActiveMin: 25 },
  { id: '11', name: 'Discord', category: 'communication', cpuUsage: 2.8, memoryMB: 510, batteryImpact: 'low', status: 'idle', lastActiveMin: 40 },
  { id: '12', name: 'PostgreSQL Service', category: 'background', cpuUsage: 1.2, memoryMB: 180, batteryImpact: 'low', status: 'background', lastActiveMin: 120 },
  { id: '13', name: 'Zoom', category: 'communication', cpuUsage: 7.6, memoryMB: 860, batteryImpact: 'high', status: 'idle', lastActiveMin: 55 },
  { id: '14', name: 'PowerShell', category: 'system', cpuUsage: 0.8, memoryMB: 95, batteryImpact: 'low', status: 'background', lastActiveMin: 90 },
];

export const mockRecommendations: Recommendation[] = [
  {
    id: 'r1',
    problem: 'Google Chrome is using significant memory (2.8 GB) because 24 tabs are active, many of which have been idle for over 10 minutes.',
    action: 'Close idle browser tabs or use a tab-suspension extension to freeze inactive tabs automatically.',
    benefit: 'Free up ~1.8 GB of RAM and reduce CPU load by up to 12%, extending battery life by approximately 40 minutes.',
    severity: 'high',
    icon: 'globe',
  },
  {
    id: 'r2',
    problem: 'Docker Desktop is running in the background with high CPU usage (12.1%) while no containers are actively in use.',
    action: 'Pause or stop Docker Desktop when not in active development to release system resources.',
    benefit: 'Reclaim ~1.8 GB RAM and reduce CPU usage by 12%, saving an estimated 3.5W of power consumption.',
    severity: 'high',
    icon: 'box',
  },
  {
    id: 'r3',
    problem: 'Microsoft Teams and Zoom are both running in the background with no active calls.',
    action: 'Quit unused communication apps and re-launch them only when needed for meetings.',
    benefit: 'Reduce combined CPU overhead by ~13% and save ~1.7 GB of memory, improving overall system responsiveness.',
    severity: 'medium',
    icon: 'video',
  },
  {
    id: 'r4',
    problem: 'OneDrive sync and Windows Update are simultaneously consuming CPU during your active work session.',
    action: 'Schedule background sync tasks for off-peak hours or pause OneDrive sync temporarily during focused work.',
    benefit: 'Smooth out CPU spikes and reduce thermal load, resulting in a quieter, cooler, and more efficient workspace.',
    severity: 'medium',
    icon: 'sync',
  },
  {
    id: 'r5',
    problem: 'Your current workload (34% CPU, 61% RAM) is well-suited for Battery Saver mode without sacrificing productivity.',
    action: 'Enable Battery Saver profile to cap background process priority and dim screen brightness by 15%.',
    benefit: 'Extend battery life by an estimated 1.5–2 hours while maintaining full responsiveness for your active applications.',
    severity: 'low',
    icon: 'battery',
  },
  {
    id: 'r6',
    problem: 'Figma has been idle for 25 minutes but is still consuming 1.4 GB of memory.',
    action: 'Save your work and close Figma, or use auto-suspend if the session is not needed immediately.',
    benefit: 'Free up ~1.4 GB of memory and reduce background rendering load on the GPU.',
    severity: 'low',
    icon: 'layers',
  },
];

export const mockProfiles: WorkspaceProfile[] = [
  {
    id: 'study',
    name: 'Study',
    icon: 'book-open',
    description: 'Focused reading and research with minimal distractions.',
    color: 'from-cyber-500 to-cyber-700',
    settings: [
      'Notifications muted for non-essential apps',
      'Browser tabs limited to 8 active',
      'Media apps suspended',
      'Screen brightness reduced to 70%',
    ],
    suggestions: [
      'Close Slack and Discord to minimize interruptions',
      'Use Notion or OneNote in full-screen mode',
      'Enable Focus Assist to silence background alerts',
      'Pause OneDrive sync during study sessions',
    ],
  },
  {
    id: 'coding',
    name: 'Coding',
    icon: 'code',
    description: 'Development-optimized with elevated CPU priority for IDEs and tools.',
    color: 'from-eco-500 to-eco-700',
    settings: [
      'VS Code and terminal given high CPU priority',
      'Docker Desktop kept active for container dev',
      'Communication apps backgrounded',
      'Spell-check and auto-save enabled',
    ],
    suggestions: [
      'Close Figma and media apps to free GPU memory',
      'Keep Docker running only if containers are needed',
      'Use Chrome DevTools with limited open tabs',
      'Schedule builds for low-power windows',
    ],
  },
  {
    id: 'meeting',
    name: 'Meeting',
    icon: 'video',
    description: 'Video conferencing with optimized camera and audio performance.',
    color: 'from-cyber-400 to-eco-500',
    settings: [
      'Camera and mic given exclusive audio/video priority',
      'Background blur enabled via on-device AI',
      'Other apps throttled to free bandwidth',
      'Screen brightness at 80% for visibility',
    ],
    suggestions: [
      'Quit Docker Desktop to free CPU for video encoding',
      'Close Chrome tabs to reduce memory contention',
      'Use a wired headset for lower-latency audio',
      'Disable virtual backgrounds if battery is below 30%',
    ],
  },
  {
    id: 'performance',
    name: 'Performance',
    icon: 'zap',
    description: 'Maximum performance mode for resource-intensive tasks.',
    color: 'from-amber-500 to-orange-600',
    settings: [
      'All background sync tasks paused',
      'CPU governor set to maximum performance',
      'Screen brightness at 100%',
      'All available RAM allocated to active apps',
    ],
    suggestions: [
      'Use this mode for rendering, compiling, or ML workloads',
      'Connect to AC power when possible',
      'Close all non-essential apps before starting heavy tasks',
      'Monitor thermals — the fan may spin up under load',
    ],
  },
  {
    id: 'battery-saver',
    name: 'Battery Saver',
    icon: 'battery-saving',
    description: 'Aggressive energy saving for extended battery life.',
    color: 'from-eco-400 to-cyber-600',
    settings: [
      'Background processes throttled to minimum',
      'Screen brightness reduced to 50%',
      'CPU frequency capped at 60%',
      'Non-essential apps auto-suspended after 5 min idle',
    ],
    suggestions: [
      'Enable this mode when battery drops below 40%',
      'Close Docker and IDEs if not actively coding',
      'Use lighter alternatives for browsing',
      'Disable auto-sync for cloud storage',
    ],
  },
];

export const mockChatResponses: Record<string, string> = {
  'why is my battery draining quickly':
    "Your battery is draining faster than usual primarily due to three factors: Google Chrome is consuming 2.8 GB of memory across 24 open tabs (many idle), Docker Desktop is using 12.1% CPU in the background with no active containers, and both Teams and Zoom are running without active calls. Together, these account for roughly 60% of your current power draw. Closing idle Chrome tabs and pausing Docker alone could extend your remaining battery time from 5.5 hours to approximately 7 hours.",
  'which application is consuming the most resources':
    "Google Chrome is currently your most resource-intensive application — it's using 18.4% CPU and 2,840 MB of RAM. This is largely because you have 24 tabs open, several of which contain media-heavy web apps. Docker Desktop is a close second at 12.1% CPU and 1,840 MB RAM. I'd recommend suspending idle Chrome tabs first, then pausing Docker if you're not actively developing.",
  'how can i improve my workspace efficiency':
    "Here are the top three actions you can take right now: 1) Close or suspend the 15+ idle Chrome tabs — this alone frees ~1.8 GB RAM. 2) Pause Docker Desktop since no containers are running — this saves 12% CPU and ~3.5W of power. 3) Quit Teams and Zoom since neither has an active call. Implementing all three would raise your Eco Score from 72 to approximately 86 and extend battery life by ~1.5 hours.",
  'should i use battery saver mode':
    "Yes, based on your current workload (34% CPU, 61% RAM, no active video calls), you're an excellent candidate for Battery Saver mode. Your active apps — VS Code, Notion, and a few Chrome tabs — will remain fully responsive under the reduced CPU cap. Battery Saver would extend your remaining time from 5.5 hours to approximately 7–7.5 hours with minimal perceptible impact on performance. I'd recommend enabling it now and switching to Performance mode only when you need to compile or render.",
};

export const defaultChatQuestions = [
  'Why is my battery draining quickly?',
  'Which application is consuming the most resources?',
  'How can I improve my workspace efficiency?',
  'Should I use Battery Saver mode?',
];
