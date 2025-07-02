import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Github, ExternalLink, User, Code, Shield, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import GitHubStats from './components/GitHubStats';
import EnhancedMOTD from './components/EnhancedMOTD';
import TryHackMeBadge from './components/TryHackMeBadge';
import XTerminal from './components/XTerminal';
import './App.css';

const ParrotTerminal = () => {
  const terminalRef = useRef(null);

  const projectDetails = {
    'p2p-c2-framework': {
      name: 'P2P-C2-Framework',
      description: 'A peer-to-peer (P2P) command and control framework written in Golang',
      tech: ['Go', 'Networking', 'Cryptography'],
      features: [
        'Decentralized command and control architecture',
        'Encrypted peer-to-peer communication',
        'Dynamic node discovery and management',
        'Cross-platform compatibility',
        'Stealth communication protocols'
      ],
      challenges: [
        'Implementing secure P2P networking protocols',
        'Handling network topology changes dynamically',
        'Ensuring communication remains undetected',
        'Managing distributed state across nodes'
      ],
      link: 'https://github.com/SaadSaid158/P2P-C2-Framework'
    },
    'fusee-web-injector': {
      name: 'fusee-web-injector',
      description: 'A web-based injector for fusee payloads',
      tech: ['HTML', 'JavaScript', 'WebUSB API'],
      features: [
        'Browser-based payload injection',
        'WebUSB API integration',
        'User-friendly web interface',
        'Cross-platform compatibility',
        'Real-time injection status'
      ],
      challenges: [
        'Working with WebUSB API limitations',
        'Ensuring payload compatibility',
        'Handling device communication errors',
        'Creating intuitive user experience'
      ],
      link: 'https://github.com/SaadSaid158/fusee-web-injector'
    },
    'binary-format-viewer': {
      name: 'Binary-Format-Viewer',
      description: 'A simple binary format viewer',
      tech: ['HTML', 'JavaScript', 'File API'],
      features: [
        'Hexadecimal and binary view modes',
        'File format analysis',
        'Interactive data exploration',
        'Export functionality',
        'Search and navigation tools'
      ],
      challenges: [
        'Efficiently handling large binary files',
        'Implementing multiple view formats',
        'Creating responsive UI for data display',
        'Optimizing performance for large datasets'
      ],
      link: 'https://github.com/SaadSaid158/Binary-Format-Viewer'
    }
  };

  const motd = `
    Welcome to Debian GNU/Linux!

    The programs included with the Debian GNU/Linux system are free software;
    the exact distribution terms for each program are described in the
    individual files in /usr/share/doc/*/copyright.

    Debian GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent
    permitted by applicable law.
    `;

  const commands = {
    help: () => `Available Commands:

help          - Show this help message
whoami        - Display user information
ls            - List directory contents
projects      - Show portfolio projects
skills        - Display technical skills
contact       - Show contact information
social        - Display social media links
badges        - Show achievement badges
neofetch      - Display system information
show          - Show detailed project information
clear         - Clear terminal screen
exit          - Close terminal`,

    whoami: () => `User Information:

Name: Sayed Karim Saed (Saad)
Age: 16 years old
Location: Afghanistan
Role: Aspiring Penetration Tester & Red Teamer

Current Focus:
• Learning offensive cybersecurity fundamentals
• Web application hacking & vulnerability research
• Malware development & red team tradecraft
• C2 frameworks, process injection & stealth payloads
• Console hacking & low-level system internals

Learning Platforms:
• TryHackMe challenges & practical labs
• GitHub projects & open-source contributions
• Self-directed research & experimentation

Programming Languages:
• Python (Security tools & automation)
• Go (C2 frameworks & network tools)
• C (Low-level system programming)
• JavaScript/HTML (Web security & payloads)

Goals:
• Master stealth, evasion & OPSEC practices
• Develop advanced red team utilities
• Pursue professional adversary emulation roles`,

    ls: () => `
total 42
drwxr-xr-x  2 saad saad 4096 Dec 28 19:30 .
drwxr-xr-x  3 saad saad 4096 Dec 28 19:30 ..
-rwxr-xr-x  1 saad saad 8192 Dec 28 19:30 c2-framework
-rwxr-xr-x  1 saad saad 6144 Dec 28 19:30 recon-suite
-rwxr-xr-x  1 saad saad 4096 Dec 28 19:30 payload-gen
-rwxr-xr-x  1 saad saad 3072 Dec 28 19:30 web-scanner
-rw-r--r--  1 saad saad 1024 Dec 28 19:30 README.md
-rw-r--r--  1 saad saad  512 Dec 28 19:30 .gitignore
drwxr-xr-x  2 saad saad 4096 Dec 28 19:30 documents
drwxr-xr-x  2 saad saad 4096 Dec 28 19:30 scripts`,

    projects: () => `Portfolio Projects:

1. P2P-C2-Framework
   Description: A peer-to-peer (P2P) command and control framework written in Golang
   Tech: Go
   Link: https://github.com/SaadSaid158/P2P-C2-Framework

2. fusee-web-injector
   Description: A web-based injector for fusee payloads
   Tech: HTML, JavaScript
   Link: https://github.com/SaadSaid158/fusee-web-injector

3. Binary-Format-Viewer
   Description: A simple binary format viewer
   Tech: HTML, JavaScript
   Link: https://github.com/SaadSaid158/Binary-Format-Viewer

💡 See my other projects on GitHub:
   https://github.com/SaadSaid158`,

    skills: () => `Technical Skills & Learning Progress:

🔴 Offensive Security                                          65%
████████████████████████████ 
• Web application penetration testing
• Basic malware development & analysis
• Red team tradecraft fundamentals
• C2 frameworks & process injection

🛡️  Defensive Security                                        50%
████████████████████ 
• Network monitoring & analysis
• Incident response fundamentals
• Security hardening & configuration
• Log analysis & threat detection

💻 Software Engineering                                       75%
██████████████████████████████ 
• Python (Security tools & automation)
• Go (C2 frameworks & network tools)
• C (Low-level system programming)
• JavaScript/HTML (Web security)
• Git version control & collaboration

🔧 Hardware Hacking                                           30%
████████████ 
• Console hacking & reverse engineering
• Basic circuit analysis
• Firmware extraction & analysis
• Hardware debugging techniques

🟠 Areas of Interest:
• Stealth & evasion techniques
• OPSEC & operational security
• Advanced C2 framework development
• Adversary emulation & threat modeling`,

    contact: () => `Contact Information:

📧 Email: saadsaid158@gmail.com
🐙 GitHub: https://github.com/SaadSaid158
🎯 TryHackMe: https://tryhackme.com/p/SaadSaid158

🌐 Portfolio: https://saadsaid158.github.io

Currently seeking:
• Learning opportunities & mentorship
• Collaboration on security projects
• Feedback on red team tools & techniques
• Guidance from experienced professionals

Future goals:
• Professional red team engagements
• Advanced penetration testing roles
• Cybersecurity research & development`,

    social: () => `Social Media & Platforms:

🐙 GitHub: https://github.com/SaadSaid158
🎯 TryHackMe: https://tryhackme.com/p/SaadSaid158
📧 Email: saadsaid158@gmail.com

🏆 Current Achievements:
• Active TryHackMe participant
• Growing GitHub repository collection
• Self-taught cybersecurity enthusiast
• Developing practical security tools

📚 Learning Journey:
• Hands-on security research & experimentation
• Building red team utilities for skill development
• Studying real-world attack techniques
• Contributing to open-source security projects`,

    badges: () => 'BADGES_PLACEHOLDER',

    neofetch: () => `System Information:

OS: Debian GNU/Linux
Host: Red Team Workstation
Kernel: Linux 6.1.0-amd64
Uptime: 1337 days, 13:37
Packages: 2847 (dpkg)
Shell: zsh 5.9
Resolution: 1920x1080
DE: MATE 1.26.0
WM: Marco
Theme: Adwaita [GTK2/3]
Icons: Papirus-Dark
Terminal: mate-terminal

Hardware:
CPU: Intel i7-12700K
GPU: NVIDIA RTX 4070
Memory: 8192MiB / 32768MiB
Disk: 2TB NVMe SSD

Status:
CPU Usage: 15%
Network: Connected
User: saad@debian-sec`,

    show: (projectName) => {
      if (!projectName) {
        return `Usage: show <project_name>

Available projects:
• p2p-c2-framework
• fusee-web-injector  
• binary-format-viewer

Example: show p2p-c2-framework`;
      }

      const project = projectDetails[projectName.toLowerCase()];
      if (!project) {
        return `Project '${projectName}' not found. Use 'show' without arguments to see available projects.`;
      }

      return `Project Details: ${project.name}

Description:
${project.description}

Technologies Used:
${project.tech.map(tech => `• ${tech}`).join('\n')}

Key Features:
${project.features.map(feature => `• ${feature}`).join('\n')}

Technical Challenges:
${project.challenges.map(challenge => `• ${challenge}`).join('\n')}

Repository: ${project.link}`;
    },

    clear: () => 'CLEAR_COMMAND'
  };

  const handleCommand = (command) => {
    const trimmedCmd = command.trim();
    if (!trimmedCmd) {
      terminalRef.current?.writeOutput('');
      return;
    }

    const [cmd, ...args] = trimmedCmd.split(' ');
    const lowerCommand = cmd.toLowerCase();

    if (lowerCommand === 'clear') {
      terminalRef.current?.clearTerminal();
      return;
    }

    if (lowerCommand === 'exit') {
      window.close();
      return;
    }

    let output;
    if (lowerCommand === 'show') {
      output = commands.show(args[0]);
    } else {
      output = commands[lowerCommand] ? commands[lowerCommand]() : `Command not found: ${command}`;
    }

    terminalRef.current?.writeOutput(output);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#00d4aa] mb-2">
            SaadSaid158
          </h1>
          <p className="text-slate-300">security researcher, programmer and NX modding enthusiast</p>
        </div>

        {/* Badges Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="badge-container">
            <CardContent className="p-4">
              <h3 className="text-[#00d4aa] font-semibold mb-3 flex items-center">
                <Award className="mr-2" size={20} />
                TryHackMe Badge
              </h3>
              <TryHackMeBadge />
            </CardContent>
          </Card>
          <Card className="badge-container">
            <CardContent className="p-4">
              <h3 className="text-[#00d4aa] font-semibold mb-3 flex items-center">
                <Github className="mr-2" size={20} />
                GitHub Stats
              </h3>
              <GitHubStats />
            </CardContent>
          </Card>
        </div>

        {/* Terminal Window */}
        <Card className="terminal-window">
          {/* Terminal Header */}
          <div className="terminal-header px-4 py-2 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Terminal size={20} className="text-white" />
              <span className="text-white font-semibold">┌──(saad@debian)-[~]</span>
            </div>
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
          </div>

          {/* XTerminal Content */}
          <div className="p-4">
            <XTerminal ref={terminalRef} onCommand={handleCommand} />
          </div>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-slate-500 text-sm">
          © 2025 SaadSaid158. All rights reserved.
          <p>Built with ❤️ and 💻</p>
        </div>
      </div>
    </div>
  );
};

export default ParrotTerminal;
