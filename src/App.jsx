import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Github, ExternalLink, User, Code, Shield, Award, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import GitHubStats from './components/GitHubStats';
import EnhancedMOTD from './components/EnhancedMOTD';
import TryHackMeBadge from './components/TryHackMeBadge';
import XTerminal from './components/XTerminal';
import './App.css';

const ParrotTerminal = () => {
  const terminalRef = useRef(null);
  const [theme, setTheme] = useState('dark');

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

  const commands = {
    help: () => `\x1b[36m╔══════════════════════════════════════════════════════════════════════════════╗\x1b[0m
\x1b[36m║                              Available Commands                              ║\x1b[0m
\x1b[36m╚══════════════════════════════════════════════════════════════════════════════╝\x1b[0m

\x1b[32m📋 Information Commands:\x1b[0m
  \x1b[33mhelp\x1b[0m          - Show this help message
  \x1b[33mwhoami\x1b[0m        - Display user information
  \x1b[33mneofetch\x1b[0m      - Display system information
  \x1b[33muptime\x1b[0m        - Show system uptime
  \x1b[33mdate\x1b[0m          - Display current date and time

\x1b[32m🗂️  Portfolio Commands:\x1b[0m
  \x1b[33mprojects\x1b[0m      - Show portfolio projects
  \x1b[33mskills\x1b[0m        - Display technical skills
  \x1b[33mshow\x1b[0m          - Show detailed project information
  \x1b[33mbadges\x1b[0m        - Show achievement badges

\x1b[32m📞 Contact Commands:\x1b[0m
  \x1b[33mcontact\x1b[0m       - Show contact information
  \x1b[33msocial\x1b[0m        - Display social media links

\x1b[32m🗃️  System Commands:\x1b[0m
  \x1b[33mls\x1b[0m            - List directory contents
  \x1b[33mpwd\x1b[0m           - Print working directory
  \x1b[33mps\x1b[0m            - Show running processes
  \x1b[33mhistory\x1b[0m       - Show command history

\x1b[32m🎨 Utility Commands:\x1b[0m
  \x1b[33mtheme\x1b[0m         - Toggle between light/dark theme
  \x1b[33mclear\x1b[0m         - Clear terminal screen
  \x1b[33mtutorial\x1b[0m      - Interactive tutorial
  \x1b[33mexit\x1b[0m          - Close terminal

\x1b[35m💡 Pro tip: Use Tab for auto-completion and arrow keys for command history!\x1b[0m`,

    whoami: () => `\x1b[36m╔══════════════════════════════════════════════════════════════════════════════╗\x1b[0m
\x1b[36m║                              User Information                                ║\x1b[0m
\x1b[36m╚══════════════════════════════════════════════════════════════════════════════╝\x1b[0m

\x1b[32m👤 Personal Details:\x1b[0m
  Name: Sayed Karim Saed (Saad)
  Age: 16 years old
  Location: United Kingdom 🇬🇧
  Role: Aspiring Penetration Tester & Red Teamer

\x1b[32m🎯 Current Focus:\x1b[0m
  • Learning offensive cybersecurity fundamentals
  • Web application hacking & vulnerability research
  • Malware development & red team tradecraft
  • Console hacking & low-level system internals

\x1b[32m📚 Learning Platforms:\x1b[0m
  • TryHackMe challenges & practical labs
  • GitHub projects & open-source contributions
  • Self-directed research & experimentation

\x1b[32m💻 Programming Languages:\x1b[0m
  • Python (Security tools & automation)
  • Go (C2 frameworks & network tools)
  • C (Low-level system programming) (Just started learning)
  • JavaScript/HTML (Web security & payloads)

\x1b[32m🚀 Goals:\x1b[0m
  • Develop advanced red team utilities
  • Pursue professional adversary emulation roles`,

    ls: () => `\x1b[32mtotal 42\x1b[0m
\x1b[34mdrwxr-xr-x\x1b[0m  2 saad saad 4096 Dec 28 19:30 \x1b[34m.\x1b[0m
\x1b[34mdrwxr-xr-x\x1b[0m  3 saad saad 4096 Dec 28 19:30 \x1b[34m..\x1b[0m
\x1b[32m-rwxr-xr-x\x1b[0m  1 saad saad 8192 Dec 28 19:30 \x1b[32mc2-framework\x1b[0m
\x1b[32m-rwxr-xr-x\x1b[0m  1 saad saad 6144 Dec 28 19:30 \x1b[32mrecon-suite\x1b[0m
\x1b[32m-rwxr-xr-x\x1b[0m  1 saad saad 4096 Dec 28 19:30 \x1b[32mpayload-gen\x1b[0m
\x1b[32m-rwxr-xr-x\x1b[0m  1 saad saad 3072 Dec 28 19:30 \x1b[32mweb-scanner\x1b[0m
\x1b[37m-rw-r--r--\x1b[0m  1 saad saad 1024 Dec 28 19:30 README.md
\x1b[37m-rw-r--r--\x1b[0m  1 saad saad  512 Dec 28 19:30 .gitignore
\x1b[34mdrwxr-xr-x\x1b[0m  2 saad saad 4096 Dec 28 19:30 \x1b[34mdocuments\x1b[0m
\x1b[34mdrwxr-xr-x\x1b[0m  2 saad saad 4096 Dec 28 19:30 \x1b[34mscripts\x1b[0m`,

    pwd: () => '\x1b[34m/home/saad\x1b[0m',

    projects: () => `\x1b[36m╔══════════════════════════════════════════════════════════════════════════════╗\x1b[0m
\x1b[36m║                              Portfolio Projects                              ║\x1b[0m
\x1b[36m╚══════════════════════════════════════════════════════════════════════════════╝\x1b[0m

\x1b[32m🔗 1. P2P-C2-Framework\x1b[0m
   Description: A peer-to-peer (P2P) command and control framework written in Golang
   Tech: \x1b[33mGo\x1b[0m
   Link: https://github.com/SaadSaid158/P2P-C2-Framework

\x1b[32m🌐 2. fusee-web-injector\x1b[0m
   Description: A web-based injector for fusee payloads
   Tech: \x1b[33mHTML, JavaScript\x1b[0m
   Link: https://github.com/SaadSaid158/fusee-web-injector

\x1b[32m🔍 3. Binary-Format-Viewer\x1b[0m
   Description: A simple binary format viewer
   Tech: \x1b[33mHTML, JavaScript\x1b[0m
   Link: https://github.com/SaadSaid158/Binary-Format-Viewer

\x1b[35m💡 See my other projects on GitHub:\x1b[0m
   https://github.com/SaadSaid158

\x1b[33m💡 Use 'show <project-name>' for detailed information\x1b[0m`,

    skills: () => `\x1b[36m╔══════════════════════════════════════════════════════════════════════════════╗\x1b[0m
\x1b[36m║                        Technical Skills & Progress                          ║\x1b[0m
\x1b[36m╚══════════════════════════════════════════════════════════════════════════════╝\x1b[0m

\x1b[31m🔴 Offensive Security                                          65%\x1b[0m
\x1b[32m████████████████████████████\x1b[0m\x1b[37m████████████\x1b[0m 
• Web application penetration testing
• Basic malware development & analysis
• Red team tradecraft fundamentals
• C2 frameworks & process injection

\x1b[35m💻 Software Engineering                                       75%\x1b[0m
\x1b[32m██████████████████████████████\x1b[0m\x1b[37m██████████\x1b[0m 
• Python (Security tools & automation)
• Go (C2 frameworks & network tools)
• C (Low-level system programming)
• JavaScript/HTML (Web security)
• Git version control & collaboration

\x1b[33m🔧 Hardware Hacking                                           30%\x1b[0m
\x1b[32m████████████\x1b[0m\x1b[37m████████████████████████████\x1b[0m 
• Console hacking & reverse engineering
• Basic circuit analysis
• Firmware extraction & analysis
• Hardware debugging techniques

\x1b[36m🟠 Areas of Interest:\x1b[0m
• Stealth & evasion techniques
• OPSEC & operational security
• Advanced C2 framework development
• Adversary emulation & threat modeling`,

    contact: () => `\x1b[36m╔══════════════════════════════════════════════════════════════════════════════╗\x1b[0m
\x1b[36m║                              Contact Information                             ║\x1b[0m
\x1b[36m╚══════════════════════════════════════════════════════════════════════════════╝\x1b[0m

\x1b[32m📧 Email:\x1b[0m saadsaid158@gmail.com
\x1b[32m🐙 GitHub:\x1b[0m https://github.com/SaadSaid158
\x1b[32m🎯 TryHackMe:\x1b[0m https://tryhackme.com/p/SaadSaid158
\x1b[32m🌐 Portfolio:\x1b[0m https://saadsaid158.github.io (You are here)

\x1b[33m🔍 Currently seeking:\x1b[0m
• Learning opportunities & mentorship
• Collaboration on security projects
• Guidance from experienced professionals

\x1b[33m🚀 Future goals:\x1b[0m
• Professional red team engagements
• Advanced penetration testing roles
• Cybersecurity research & development`,

    social: () => `\x1b[36m╔══════════════════════════════════════════════════════════════════════════════╗\x1b[0m
\x1b[36m║                          Social Media & Platforms                           ║\x1b[0m
\x1b[36m╚══════════════════════════════════════════════════════════════════════════════╝\x1b[0m

\x1b[32m🐙 GitHub:\x1b[0m https://github.com/SaadSaid158
\x1b[32m🎯 TryHackMe:\x1b[0m https://tryhackme.com/p/SaadSaid158
\x1b[32m📧 Email:\x1b[0m saadsaid158@gmail.com

\x1b[33m📚 Learning Journey:\x1b[0m
• Hands-on security research & experimentation
• Building red team utilities for skill development
• Studying real-world attack techniques
• Contributing to open-source security projects`,

    badges: () => 'BADGES_PLACEHOLDER',

    neofetch: () => `\x1b[36m                   -\`                    \x1b[32msaad@debian-sec\x1b[0m
\x1b[36m                  .o+\`                   \x1b[32m---------------\x1b[0m
\x1b[36m                 \`ooo/                   \x1b[32mOS:\x1b[0m Debian GNU/Linux 12 (bookworm)
\x1b[36m                \`+oooo:                  \x1b[32mHost:\x1b[0m Red Team Workstation
\x1b[36m               \`+oooooo:                 \x1b[32mKernel:\x1b[0m Linux 6.1.0-amd64
\x1b[36m               -+oooooo+:                \x1b[32mUptime:\x1b[0m 1337 days, 13:37
\x1b[36m             \`/:-:++oooo+:               \x1b[32mPackages:\x1b[0m 2847 (dpkg)
\x1b[36m            \`/++++/+++++++:              \x1b[32mShell:\x1b[0m zsh 5.9
\x1b[36m           \`/++++++++++++++:             \x1b[32mResolution:\x1b[0m 1920x1080
\x1b[36m          \`/+++ooooooooooooo/\`           \x1b[32mDE:\x1b[0m MATE 1.26.0
\x1b[36m         ./ooosssso++osssssso+\`          \x1b[32mWM:\x1b[0m Marco
\x1b[36m        .oossssso-\`\`\`\`/ossssss+\`         \x1b[32mTheme:\x1b[0m Adwaita [GTK2/3]
\x1b[36m       -osssssso.      :ssssssso.        \x1b[32mIcons:\x1b[0m Papirus-Dark
\x1b[36m      :osssssss/        osssso+++.       \x1b[32mTerminal:\x1b[0m mate-terminal
\x1b[36m     /ossssssss/        +ssssooo/-       
\x1b[36m   \`/ossssso+/:-        -:/+osssso+-     \x1b[32mCPU:\x1b[0m Intel i7-12700K (16) @ 3.60GHz
\x1b[36m  \`+sso+:-\`                 \`.-/+oso:    \x1b[32mGPU:\x1b[0m NVIDIA RTX 4070
\x1b[36m \`++:.                           \`-/+/   \x1b[32mMemory:\x1b[0m 8192MiB / 32768MiB
\x1b[36m .\`                                 \`/   \x1b[32mDisk:\x1b[0m 2TB NVMe SSD

\x1b[33m████\x1b[31m████\x1b[32m████\x1b[34m████\x1b[35m████\x1b[36m████\x1b[37m████\x1b[0m`,

    date: () => new Date().toLocaleString(),

    uptime: () => `\x1b[32m 19:30:42 up 1337 days, 13:37,  1 user,  load average: 0.15, 0.25, 0.30\x1b[0m`,

    ps: () => `\x1b[32m  PID TTY          TIME CMD\x1b[0m
 1337 pts/0    00:00:01 zsh
 1338 pts/0    00:00:00 node
 1339 pts/0    00:00:00 terminal
 1340 pts/0    00:00:00 ps`,

    history: () => {
      const sampleHistory = [
        'whoami',
        'ls -la',
        'neofetch',
        'projects',
        'show p2p-c2-framework',
        'skills',
        'contact'
      ];
      return sampleHistory.map((cmd, i) => `\x1b[33m${i + 1}\x1b[0m  ${cmd}`).join('\n');
    },

    tutorial: () => `\x1b[36m╔══════════════════════════════════════════════════════════════════════════════╗\x1b[0m
\x1b[36m║                              Interactive Tutorial                            ║\x1b[0m
\x1b[36m╚══════════════════════════════════════════════════════════════════════════════╝\x1b[0m

\x1b[32m🎯 Welcome to the interactive terminal tutorial!\x1b[0m

\x1b[33mStep 1:\x1b[0m Try typing '\x1b[32mwhoami\x1b[0m' to learn about me
\x1b[33mStep 2:\x1b[0m Use '\x1b[32mprojects\x1b[0m' to see my portfolio
\x1b[33mStep 3:\x1b[0m Try '\x1b[32mshow p2p-c2-framework\x1b[0m' for project details
\x1b[33mStep 4:\x1b[0m Check out '\x1b[32mskills\x1b[0m' to see my technical abilities
\x1b[33mStep 5:\x1b[0m Use '\x1b[32mtheme light\x1b[0m' or '\x1b[32mtheme dark\x1b[0m' to change themes

\x1b[35m💡 Pro Tips:\x1b[0m
• Ctrl+C to cancel current input
• Ctrl+L to clear screen
• Type '\x1b[32mhelp\x1b[0m' anytime for command list

\x1b[33mHappy exploring! 🚀\x1b[0m`,

    theme: (themeName) => {
      if (!themeName) {
        return `\x1b[33mCurrent theme:\x1b[0m ${theme}

\x1b[32mUsage:\x1b[0m theme <light|dark>

\x1b[33mAvailable themes:\x1b[0m
• light - Light theme with bright colors
• dark  - Dark theme with terminal colors`;
      }

      const newTheme = themeName.toLowerCase();
      if (newTheme === 'light' || newTheme === 'dark') {
        setTheme(newTheme);
        return `\x1b[32m✓ Theme changed to:\x1b[0m ${newTheme}`;
      } else {
        return `\x1b[31m✗ Invalid theme:\x1b[0m ${themeName}
\x1b[33mAvailable themes:\x1b[0m light, dark`;
      }
    },

    show: (projectName) => {
      if (!projectName) {
        return `\x1b[33mUsage:\x1b[0m show <project_name>

\x1b[32mAvailable projects:\x1b[0m
• p2p-c2-framework
• fusee-web-injector  
• binary-format-viewer

\x1b[33mExample:\x1b[0m show p2p-c2-framework`;
      }

      const project = projectDetails[projectName.toLowerCase()];
      if (!project) {
        return `\x1b[31m✗ Project '${projectName}' not found.\x1b[0m Use 'show' without arguments to see available projects.`;
      }

      return `\x1b[36m╔══════════════════════════════════════════════════════════════════════════════╗\x1b[0m
\x1b[36m║                            Project Details: ${project.name.padEnd(28)}║\x1b[0m
\x1b[36m╚══════════════════════════════════════════════════════════════════════════════╝\x1b[0m

\x1b[32m📝 Description:\x1b[0m
${project.description}

\x1b[32m🛠️  Technologies Used:\x1b[0m
${project.tech.map(tech => `• \x1b[33m${tech}\x1b[0m`).join('\n')}

\x1b[32m✨ Key Features:\x1b[0m
${project.features.map(feature => `• ${feature}`).join('\n')}

\x1b[32m🎯 Technical Challenges:\x1b[0m
${project.challenges.map(challenge => `• ${challenge}`).join('\n')}

\x1b[32m🔗 Repository:\x1b[0m ${project.link}`;
    },

    clear: () => 'CLEAR_COMMAND',

    echo: (text) => text || '',

    cat: (filename) => {
      const files = {
        'README.md': `# Saad's Security Portfolio

Welcome to my cybersecurity portfolio! This terminal interface showcases my projects, skills, and journey in offensive security.

## Quick Start
- Type 'help' for available commands
- Use 'projects' to see my work
- Try 'tutorial' for a guided tour

## Contact
- Email: saadsaid158@gmail.com
- GitHub: https://github.com/SaadSaid158`,
        '.gitignore': `node_modules/
.env
*.log
dist/
build/`,
      };
      
      if (!filename) {
        return `\x1b[33mUsage:\x1b[0m cat <filename>

\x1b[32mAvailable files:\x1b[0m
• README.md
• .gitignore`;
      }
      
      return files[filename] || `\x1b[31mcat: ${filename}: No such file or directory\x1b[0m`;
    }
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
      terminalRef.current?.writeOutput('\x1b[33mGoodbye! Thanks for visiting my portfolio! 👋\x1b[0m');
      setTimeout(() => {
        window.close();
      }, 1000);
      return;
    }

    let output;
    if (lowerCommand === 'show') {
      output = commands.show(args[0]);
    } else if (lowerCommand === 'theme') {
      output = commands.theme(args[0]);
    } else if (lowerCommand === 'echo') {
      output = commands.echo(args.join(' '));
    } else if (lowerCommand === 'cat') {
      output = commands.cat(args[0]);
    } else {
      output = commands[lowerCommand] ? commands[lowerCommand]() : `\x1b[31mCommand not found:\x1b[0m ${command}\n\x1b[33mType 'help' for available commands\x1b[0m`;
    }

    terminalRef.current?.writeOutput(output);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    terminalRef.current?.updateTheme(newTheme);
  };

  // Apply theme to document
  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  return (
    <div className={`min-h-screen transition-colors duration-300 p-4 ${
      theme === 'light' 
        ? 'bg-gradient-to-br from-gray-50 via-white to-gray-100' 
        : 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'
    }`}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-between items-center mb-4">
            <div></div>
            <h1 className={`text-4xl font-bold mb-2 ${
              theme === 'light' ? 'text-blue-600' : 'text-[#00d4aa]'
            }`}>
              SaadSaid158
            </h1>
            <Button
              onClick={toggleTheme}
              variant="outline"
              size="icon"
              className={`${
                theme === 'light' 
                  ? 'border-gray-300 hover:bg-gray-100' 
                  : 'border-slate-600 hover:bg-slate-700'
              }`}
            >
              {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>
          </div>
          <p className={theme === 'light' ? 'text-gray-600' : 'text-slate-300'}>
            security researcher, programmer and NX modding enthusiast
          </p>
        </div>

        {/* Badges Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className={`badge-container ${
            theme === 'light' 
              ? 'bg-white border-gray-200 shadow-lg' 
              : 'bg-slate-800/80 border-slate-600'
          }`}>
            <CardContent className="p-4">
              <h3 className={`font-semibold mb-3 flex items-center ${
                theme === 'light' ? 'text-blue-600' : 'text-[#00d4aa]'
              }`}>
                <Award className="mr-2" size={20} />
                TryHackMe Badge
              </h3>
              <TryHackMeBadge />
            </CardContent>
          </Card>
          <Card className={`badge-container ${
            theme === 'light' 
              ? 'bg-white border-gray-200 shadow-lg' 
              : 'bg-slate-800/80 border-slate-600'
          }`}>
            <CardContent className="p-4">
              <h3 className={`font-semibold mb-3 flex items-center ${
                theme === 'light' ? 'text-blue-600' : 'text-[#00d4aa]'
              }`}>
                <Github className="mr-2" size={20} />
                GitHub Stats
              </h3>
              <GitHubStats />
            </CardContent>
          </Card>
        </div>

        {/* Terminal Window */}
        <Card className={`terminal-window ${
          theme === 'light' 
            ? 'bg-white border-gray-300 shadow-xl' 
            : 'bg-slate-800/90 border-slate-600'
        }`}>
          {/* Terminal Header */}
          <div className={`terminal-header px-4 py-2 flex items-center justify-between ${
            theme === 'light' 
              ? 'bg-gradient-to-r from-blue-500 to-blue-600' 
              : 'bg-gradient-to-r from-slate-700 to-slate-600'
          }`}>
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
            <XTerminal ref={terminalRef} onCommand={handleCommand} theme={theme} />
          </div>
        </Card>

        {/* Footer */}
        <div className={`text-center mt-8 text-sm ${
          theme === 'light' ? 'text-gray-500' : 'text-slate-500'
        }`}>
          © 2025 SaadSaid158. All rights reserved.
          <p>Built with ❤️ and 💻</p>
        </div>
      </div>
    </div>
  );
};

export default ParrotTerminal;

