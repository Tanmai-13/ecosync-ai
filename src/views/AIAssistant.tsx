import { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  Send,
  Sparkles,
  Bot,
  User,
  Lightbulb,
} from 'lucide-react';
import { GlassCard } from '@/components/GlassCard';
import { SectionHeader } from '@/components/SectionHeader';
import { mockChatResponses, defaultChatQuestions } from '@/data/mockData';
import type { ChatMessage } from '@/types';

export function AIAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: "Hello! I'm your EcoSync AI assistant. I can help you understand your workspace's energy usage, identify resource-heavy applications, and suggest ways to improve efficiency. Ask me a question or pick one of the suggestions below.",
      timestamp: Date.now(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isTyping]);

  const getResponse = (question: string): string => {
    const normalized = question.toLowerCase().trim();
    const exactMatch = mockChatResponses[normalized];
    if (exactMatch) return exactMatch;

    for (const [key, response] of Object.entries(mockChatResponses)) {
      if (normalized.includes(key) || key.split(' ').some((word) => normalized.includes(word) && word.length > 4)) {
        return response;
      }
    }

    if (normalized.includes('battery')) {
      return "Your battery is currently at 72% with approximately 5.5 hours remaining. The main factors affecting your battery are Google Chrome (24 open tabs, 2.8 GB RAM) and Docker Desktop (12.1% CPU in background). Closing idle Chrome tabs and pausing Docker could extend your battery life by up to 1.5 hours. Would you like me to recommend a specific profile for battery saving?";
    }

    if (normalized.includes('cpu') || normalized.includes('processor')) {
      return "Your current CPU usage is 34%. The top CPU consumers are Google Chrome (18.4%), Docker Desktop (12.1%), and Zoom (7.6% idle). Chrome and Docker together account for over 30% of your CPU load. If you're not actively developing, pausing Docker would provide the most immediate relief.";
    }

    if (normalized.includes('ram') || normalized.includes('memory')) {
      return "You're using 9.8 GB out of 16 GB of RAM (61%). The biggest memory consumers are Google Chrome (2.8 GB), Docker Desktop (1.8 GB), and Figma (1.4 GB idle). Figma has been idle for 25 minutes — closing it would free up 1.4 GB immediately.";
    }

    if (normalized.includes('profile') || normalized.includes('mode')) {
      return "Based on your current workload (34% CPU, 61% RAM, coding activity), I'd recommend the Coding profile for active development, or the Battery Saver profile if you're reading and reviewing code. You can switch profiles anytime from the Profiles tab. Battery Saver would extend your remaining time from 5.5h to approximately 7.5h.";
    }

    if (normalized.includes('snapdragon')) {
      return "EcoSync AI is optimized for Snapdragon-powered PCs, leveraging on-device AI inference via the Hexagon NPU. This means all workspace analysis runs locally on your device — no data is sent to the cloud. This approach reduces latency, saves bandwidth, and ensures your privacy. When connected to real hardware, Qualcomm AI Hub models will provide real-time optimization insights.";
    }

    if (normalized.includes('privacy') || normalized.includes('data')) {
      return "Privacy is core to EcoSync AI. All workspace analysis is performed locally on your device using on-device AI. We don't collect unnecessary personal data, and you remain in full control. No usage patterns or application data leave your device. Visit the Privacy tab for full details.";
    }

    if (normalized.includes('eco score') || normalized.includes('score')) {
      return "Your current Eco Score is 72 out of 100. This is calculated from five weighted factors: CPU efficiency (30%), memory management (25%), background process load (20%), energy consumption (15%), and battery health (10%). Your score of 72 means your workspace is moderately efficient. The biggest improvement opportunity is closing idle Chrome tabs and pausing Docker, which could raise your score to ~86.";
    }

    return "I can help with questions about your battery life, CPU and memory usage, energy consumption, workspace profiles, optimization recommendations, Eco Score, and Snapdragon-specific features. Try asking: 'Why is my battery draining quickly?' or 'How can I improve my workspace efficiency?'";
  };

  const handleSend = (text?: string) => {
    const content = (text ?? input).trim();
    if (!content) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      content,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = getResponse(content);
      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: 'assistant',
          content: response,
          timestamp: Date.now(),
        },
      ]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      <SectionHeader
        title="AI Assistant"
        subtitle="Ask questions about your workspace, energy usage, and optimization"
        icon={<MessageSquare className="w-5 h-5" />}
      />

      <GlassCard className="flex flex-col h-[600px]">
        {/* Chat Header */}
        <div className="flex items-center gap-3 p-4 border-b border-white/10">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-eco-500 to-cyber-500 flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-eco-400 border-2 border-ink-800" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">EcoSync AI Assistant</p>
            <p className="text-xs text-eco-400">Online · On-device inference</p>
          </div>
          <span className="ml-auto chip bg-eco-500/10 text-eco-400 border border-eco-500/15">
            <Sparkles className="w-3 h-3" />
            Local AI
          </span>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''} animate-fade-in`}>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0
                ${msg.role === 'user' ? 'bg-cyber-500/20' : 'bg-gradient-to-br from-eco-500/20 to-cyber-500/20'}`}>
                {msg.role === 'user' ? (
                  <User className="w-4 h-4 text-cyber-400" />
                ) : (
                  <Bot className="w-4 h-4 text-eco-400" />
                )}
              </div>
              <div className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed
                ${msg.role === 'user'
                  ? 'bg-cyber-500/15 border border-cyber-500/20 text-slate-100 rounded-tr-sm'
                  : 'bg-white/[0.05] border border-white/10 text-slate-200 rounded-tl-sm'}`}>
                {msg.content}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 animate-fade-in">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-eco-500/20 to-cyber-500/20 flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-eco-400" />
              </div>
              <div className="bg-white/[0.05] border border-white/10 rounded-2xl rounded-tl-sm p-4">
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-eco-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 rounded-full bg-eco-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 rounded-full bg-eco-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Questions */}
        {messages.length <= 1 && (
          <div className="px-4 pb-2">
            <p className="text-xs text-slate-500 mb-2 flex items-center gap-1.5">
              <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
              Suggested questions
            </p>
            <div className="flex flex-wrap gap-2">
              {defaultChatQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSend(q)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white/[0.05] border border-white/10 text-slate-300 hover:bg-white/10 hover:border-eco-500/20 hover:text-eco-400 transition-all"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about your workspace, battery, energy..."
              className="flex-1 px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-eco-500/30 focus:bg-white/[0.08] transition-all"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim()}
              className="w-11 h-11 rounded-xl bg-gradient-to-br from-eco-500 to-cyber-500 flex items-center justify-center text-white disabled:opacity-40 hover:shadow-lg hover:shadow-eco-500/20 transition-all flex-shrink-0"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
