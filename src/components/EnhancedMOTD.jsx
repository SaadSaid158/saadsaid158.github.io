import React, { useState, useEffect } from 'react';
import { Shield, Target, Code, Zap, Clock, Activity } from 'lucide-react';

const EnhancedMOTD = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [systemStats, setSystemStats] = useState({
    uptime: '1337 days, 13:37',
    activeProjects: 4,
    completedChallenges: 150
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-4">
      {/* Main MOTD Box */}
      <div className="border border-[#00d4aa] rounded-lg p-4 bg-slate-800/50">
        <div className="text-center mb-4">
          <h2 className="text-[#00d4aa] text-lg font-bold flex items-center justify-center">
            <Shield className="mr-2" size={20} />
            Welcome to Saad's Security Portfolio
          </h2>
          <p className="text-slate-300 text-sm">Debian GNU/Linux - Security Research & Development</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex items-center text-slate-300">
              <Target className="mr-2 text-red-400" size={16} />
              <span>Offensive Security & Penetration Testing</span>
            </div>
            <div className="flex items-center text-slate-300">
              <Code className="mr-2 text-blue-400" size={16} />
              <span>C2 Framework Development & Malware Analysis</span>
            </div>
            <div className="flex items-center text-slate-300">
              <Zap className="mr-2 text-yellow-400" size={16} />
              <span>Red Team Operations & CTF Challenges</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-400">System Time:</span>
              <span className="text-[#00d4aa] font-mono">{formatTime(currentTime)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Date:</span>
              <span className="text-[#00d4aa] font-mono">{formatDate(currentTime)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Active Projects:</span>
              <span className="text-[#00d4aa] font-mono">{systemStats.activeProjects}</span>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-600">
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="text-slate-400">Quick Commands:</span>
            <span className="text-[#00d4aa]">'help'</span>
            <span className="text-slate-400">•</span>
            <span className="text-[#00d4aa]">'whoami'</span>
            <span className="text-slate-400">•</span>
            <span className="text-[#00d4aa]">'projects'</span>
            <span className="text-slate-400">•</span>
            <span className="text-[#00d4aa]">'skills'</span>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="flex items-center justify-between text-xs text-slate-400 bg-slate-800/30 px-3 py-2 rounded">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <Activity className="mr-1 text-green-400" size={12} />
            <span>System: Online</span>
          </div>
          <div className="flex items-center">
            <Clock className="mr-1 text-blue-400" size={12} />
            <span>Uptime: {systemStats.uptime}</span>
          </div>
        </div>
        <div className="text-[#00d4aa]">
          Ready for Security Operations
        </div>
      </div>
    </div>
  );
};

export default EnhancedMOTD;

