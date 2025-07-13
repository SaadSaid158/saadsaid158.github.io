import React, { useState, useEffect, useRef } from 'react';

const XTerminal = ({ theme }) => {
    const [history, setHistory] = useState([]);
    const [commandHistory, setCommandHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [currentInput, setCurrentInput] = useState('');
    const terminalOutputRef = useRef(null);
    const inputRef = useRef(null); // Ref for the actual input element
    const cursorRef = useRef(null); // Ref for the blinking cursor span
    const promptLine2WrapperRef = useRef(null); // Ref for the prompt line 2 wrapper

    // Define project details, used by the 'show' command
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

    // Mapping of ANSI color codes to CSS variables for dynamic theming
    const ansiColorMap = {
        '30': 'var(--ansi-black)',
        '31': 'var(--ansi-red)',
        '32': 'var(--ansi-green)',
        '33': 'var(--ansi-yellow)',
        '34': 'var(--ansi-blue)',
        '35': 'var(--ansi-magenta)',
        '36': 'var(--ansi-cyan)',
        '37': 'var(--ansi-white)',
        '90': 'var(--ansi-bright-black)', // Bright black (gray)
        '0': 'inherit', // Reset color to default (inherits from parent)
    };

    /**
     * Parses a string containing ANSI escape codes and converts it into an array of React elements (spans)
     * with corresponding inline styles for coloring.
     * @param {string} text - The input string potentially containing ANSI escape codes.
     * @returns {Array<React.Element>} An array of <span> elements with applied colors.
     */
    const parseAnsi = (text) => {
        const segments = [];
        let lastIndex = 0;
        const ansiRegex = /(\x1b\[(\d+)m)/g;
        let match;

        let currentColorStyle = {}; // Tracks the current active color style

        while ((match = ansiRegex.exec(text)) !== null) {
            const fullMatch = match[0];
            const colorCode = match[2];
            const startIndex = match.index;

            if (startIndex > lastIndex) {
                segments.push(
                    <span key={`text-${lastIndex}`} style={currentColorStyle}>
                        {text.substring(lastIndex, startIndex)}
                    </span>
                );
            }

            if (colorCode === '0') {
                currentColorStyle = {}; // Reset style
            } else if (ansiColorMap[colorCode]) {
                currentColorStyle = { color: ansiColorMap[colorCode] };
            }

            lastIndex = startIndex + fullMatch.length;
        }

        if (lastIndex < text.length) {
            segments.push(
                <span key={`text-${lastIndex}`} style={currentColorStyle}>
                    {text.substring(lastIndex)}
                </span>
            );
        }

        return segments;
    };

    // Centralized command definitions and their outputs/logic
    const commands = {
        help: () => `\x1b[36m--- Available Commands ---\x1b[0m

\x1b[32m📋 Information Commands:\x1b[0m
  \x1b[33mhelp\x1b[0m          - Show this help message
  \x1b[33mwhoami\x1b[0m        - Display user information
  \x1b[33mneofetch\x1b[0m      - Display system information
  \x1b[33muptime\x1b[0m        - Show system uptime
  \x1b[33mdate\x1b[0m          - Display current date and time

\x1b[32m🗂️  Portfolio Commands:\x1b[0m
  \x1b[33mprojects\x1b[0m      - Show portfolio projects
  \x1b[33mskills\x1b[0m        - Display technical skills
  \x1b[33mshow\x1b[0m          - Show detailed project information

\x1b[32m📞 Contact Commands:\x1b[0m
  \x1b[33mcontact\x1b[0m       - Show contact information

\x1b[32m🎨 Utility Commands:\x1b[0m
  \x1b[33mclear\x1b[0m         - Clear terminal screen`, // Removed 'theme' command

        whoami: () => `\x1b[36m--- User Information ---\x1b[0m

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
\x1b[34mdrwxr-xr-x\x1b[0m  2 saad saad 4096 Dec 28 19:30 \x1b[34m.\x1b[0m
\x1b[34mdrwxr-xr-x\x1b[0m  3 saad saad 4096 Dec 28 19:30 \x1b[34m..\x1b[0m
\x1b[32m-rwxr-xr-x\x1b[0m  1 saad saad 8192 Dec 28 19:30 \x1b[32mc2-framework\x1b[0m
\x1b[32m-rwxr-xr-x\x1b[0m  1 saad saad 6144 Dec 28 19:30 \x1b[32mrecon-suite\x1b[0m
\x1b[32m-rwxr-xr-x\x1b[0m  1 saad saad 4096 Dec 28 19:30 \x1b[32mpayload-gen\x1b[0m
\x1b[32m-rwxr-xr-x\x1b[0m  1 saad saad 3072 Dec 28 19:30 \x1b[32mweb-scanner\x1b[0m
\x1b[37m-rw-r--r--\x1b[0m  1 saad saad 1024 Dec 28 19:30 README.md
\x1b[37m-rw-r--r--\x1b[0m  1 saad saad  512 Dec 28 19:30 .gitignore
\x1b[34mdrwxr-xr-x\x1b[0m  2 saad saad 4096 Dec 28 19:30 \x1b[34mdocuments\x1b[0m
\x1b[34mdrwxr-xr-x\x1b[0m  2 saad saad 4096 Dec 28 19:30 \x1b[34mscripts\x1b[0m`,

        pwd: () => '\x1b[34m/home/saad\x1b[0m',

        projects: () => `\x1b[36m--- Portfolio Projects ---\x1b[0m

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

        skills: () => `\x1b[36m--- Technical Skills & Progress ---\x1b[0m

\x1b[31m🔴 Offensive Security                                          65%\x1b[0m
\x1b[32m████████████████████████████\x1b[0m\x1b[37m████████████\x1b[0m 
• Web application penetration testing
• Basic malware development & analysis
• Red team tradecraft fundamentals
• C2 frameworks & process injection

\x1b[35m💻 Software Engineering                                       75%\x1b[0m
\x1b[32m██████████████████████████████\x1b[0m\x1b[37m██████████\x1b[0m 
• Python (Security tools & automation)
• Go (C2 frameworks & network tools)
• C (Low-level system programming)
• JavaScript/HTML (Web security)
• Git version control & collaboration

\x1b[33m🔧 Hardware Hacking                                           30%\x1b[0m
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

        contact: () => `\x1b[36m--- Contact Information ---\x1b[0m

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

        neofetch: () => `\x1b[36m                   -\`                    \x1b[32msaad@debian-sec\x1b[0m
\x1b[36m                  .o+\`                   \x1b[32m---------------\x1b[0m
\x1b[36m                 \`ooo/                   \x1b[32mOS:\x1b[0m Debian GNU/Linux 12 (bookworm)
\x1b[36m                \`+oooo:                  \x1b[32mHost:\x1b[0m Red Team Workstation
\x1b[36m               \`+oooooo:                 \x1b[32mKernel:\x1b[0m Linux 6.1.0-amd64
\x1b[36m               -+oooooo+:                \x1b[32mUptime:\x1b[0m 1337 days, 13:37
\x1b[36m             \`/:-:++oooo+:               \x1b[32mPackages:\x1b[0m 2847 (dpkg)
\x1b[36m            \`/++++/+++++++:              \x1b[32mShell:\x1b[0m zsh 5.9
\x1b[36m           \`/++++++++++++++:             \x1b[32mResolution:\x1b[0m 1920x1080
\x1b[36m          \`/+++ooooooooooooo/\`           \x1b[32mDE:\x1b[0m MATE 1.26.0
\x1b[36m         ./ooosssso++osssssso+\`          \x1b[32mWM:\x1b[0m Marco
\x1b[36m        .oossssso-\`\`\`\`/ossssss+\`         \x1b[32mTheme:\x1b[0m Adwaita [GTK2/3]
\x1b[36m       -osssssso.      :ssssssso.        \x1b[32mIcons:\x1b[0m Papirus-Dark
\x1b[36m      :osssssss/        osssso+++.       \x1b[32mTerminal:\x1b[0m mate-terminal
\x1b[36m     /ossssssss/        +ssssooo/-       
\x1b[36m   \`/ossssso+/:-        -:/+osssso+-     \x1b[32mCPU:\x1b[0m Intel i7-12700K (16) @ 3.60GHz
\x1b[36m  \`+sso+:-\`                 \`.-/+oso:    \x1b[32mGPU:\x1b[0m NVIDIA RTX 4070
\x1b[36m \`++:.                           \`-/+/   \x1b[32mMemory:\x1b[0m 8192MiB / 32768MiB
\x1b[36m .\`                                 \`/   \x1b[32mDisk:\x1b[0m 2TB NVMe SSD

\x1b[33m████\x1b[31m████\x1b[32m████\x1b[34m████\x1b[35m████\x1b[36m████\x1b[37m████\x1b[0m`,

        date: () => new Date().toLocaleString(),

        uptime: () => `\x1b[32m 19:30:42 up 1337 days, 13:37,  1 user,  load average: 0.15, 0.25, 0.30\x1b[0m`,

        // Removed the 'theme' command as requested
        // theme: (themeName) => {
        //     if (!themeName) {
        //         return `\x1b[33mCurrent theme:\x1b[0m ${theme}
        //
        // \x1b[32mUsage:\x1b[0m theme <light|dark>
        //
        // \x1b[33mAvailable themes:\x1b[0m
        // • light - Light theme with bright colors
        // • dark  - Dark theme with terminal colors`;
        //     }
        //
        //     const newTheme = themeName.toLowerCase();
        //     if (newTheme === 'light' || newTheme === 'dark') {
        //         // This will trigger the theme change in the parent component
        //         return `\x1b[32m✓ Theme changed to:\x1b[0m ${newTheme} (via main app toggle)`;
        //     } else {
        //         return `\x1b[31m✗ Invalid theme:\x1b[0m ${themeName}
        // \x1b[33mAvailable themes:\x1b[0m light, dark`;
        //     }
        // },

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

            return `\x1b[36m--- Project Details: ${project.name} ---\x1b[0m

\x1b[32m📝 Description:\x1b[0m
${project.description}

\x1b[32m🛠️  Technologies Used:\x1b[0m
${project.tech.map(tech => `• \x1b[33m${tech}\x1b[0m`).join('\n')}

\x1b[32m✨ Key Features:\x1b[0m
${project.features.map(feature => `• ${feature}`).join('\n')}

\x1b[32m🎯 Technical Challenges:\x1b[0m
${project.challenges.map(challenge => `• ${challenge}`).join('\n')}

\x1b[32m🔗 Repository:\x1b[0m ${project.link}`;
        },

        clear: () => {
            // This function now only clears the state variables.
            // The actual clearing of displayed history and input is handled in executeCommand.
            setHistory([]);
            setCommandHistory([]);
            setHistoryIndex(-1);
            return ''; // Return an empty string as there's no output for 'clear'
        },

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
        },
    };

    /**
     * Processes the user's command, executes the corresponding function,
     * and updates the terminal history with the output.
     * @param {string} command - The raw command string entered by the user.
     */
    const executeCommand = (command) => {
        const trimmedCmd = command.trim();
        const lowerCommand = trimmedCmd.toLowerCase();

        // Handle empty command
        if (!trimmedCmd) {
            setHistory(prev => [...prev, { input: trimmedCmd, output: [] }]);
            setCurrentInput('');
            return;
        }

        // Handle 'clear' command specifically to prevent it from showing in history
        if (lowerCommand === 'clear') {
            setHistory([]); // Clear displayed history
            setCommandHistory([]); // Clear command history for arrow keys
            setHistoryIndex(-1); // Reset history index
            setCurrentInput(''); // Clear current input
            return; // Exit function early as no further processing is needed for 'clear'
        }

        // Add command to history for arrow key navigation
        setCommandHistory(prev => [...prev, trimmedCmd]);
        setHistoryIndex(commandHistory.length + 1);

        let output = '';
        if (commands[lowerCommand]) {
            output = commands[lowerCommand](trimmedCmd.split(' ').slice(1).join(' ')); // Pass arguments correctly
        } else {
            output = `\x1b[31mCommand not found:\x1b[0m ${command}\n\x1b[33mType 'help' for available commands\x1b[0m`;
        }

        // Add the command and its output to the displayed history
        setHistory(prev => [...prev, { input: trimmedCmd, output: output.split('\n') }]);
        setCurrentInput(''); // Clear current input after execution
    };

    // Handles key presses for input, including arrow keys for history and Tab for completion
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            executeCommand(currentInput);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (commandHistory.length > 0 && historyIndex > 0) {
                const newIndex = historyIndex - 1;
                setHistoryIndex(newIndex);
                setCurrentInput(commandHistory[newIndex]);
            } else if (historyIndex === 0) {
                setCurrentInput(commandHistory[0]);
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                const newIndex = historyIndex + 1;
                setHistoryIndex(newIndex);
                setCurrentInput(commandHistory[newIndex]);
            } else {
                setHistoryIndex(commandHistory.length);
                setCurrentInput('');
            }
        } else if (e.key === 'Tab') {
            e.preventDefault();
            const inputPart = currentInput.toLowerCase().trim();
            if (inputPart) {
                const availableCommands = Object.keys(commands);
                const matches = availableCommands.filter(cmd => cmd.startsWith(inputPart));

                if (matches.length === 1) {
                    setCurrentInput(matches[0]);
                } else if (matches.length > 1) {
                    const outputMatches = matches.join('   ');
                    setHistory(prev => [...prev, { input: currentInput, output: outputMatches.split('\n') }]);
                }
            }
        }
    };

    // Handles click on the terminal area to refocus the input.
    const handleTerminalClick = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    // Effect to scroll to the bottom of the terminal whenever the history updates.
    useEffect(() => {
        if (terminalOutputRef.current) {
            terminalOutputRef.current.scrollTop = terminalOutputRef.current.scrollHeight;
        }
    }, [history]);

    // Helper to accurately measure text width
    const getTextWidth = (text, font) => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        context.font = font;
        const metrics = context.measureText(text);
        return metrics.width;
    };

    // Effect to dynamically position the blinking cursor
    useEffect(() => {
        const updateCursorPosition = () => {
            if (inputRef.current && cursorRef.current && promptLine2WrapperRef.current) {
                const inputElement = inputRef.current;
                const cursorElement = cursorRef.current;
                const promptLine2Element = inputElement.previousElementSibling; // The "└─$&nbsp;" span

                if (promptLine2Element) {
                    const computedStyle = window.getComputedStyle(inputElement);
                    const font = computedStyle.font;
                    const textWidth = getTextWidth(inputElement.value, font);

                    // Calculate the left position relative to the promptLine2WrapperRef
                    // inputElement.offsetLeft gives the position of the input relative to its offsetParent (promptLine2WrapperRef)
                    // We then add the width of the text typed inside the input.
                    const cursorLeft = inputElement.offsetLeft + textWidth;

                    cursorElement.style.left = `${cursorLeft}px`;
                    // Set height to match the computed line-height for a full block cursor look
                    cursorElement.style.height = computedStyle.lineHeight;
                    cursorElement.style.backgroundColor = theme === 'light' ? 'black' : 'white';

                    // Position cursor vertically to align with the input text area's top
                    cursorElement.style.top = `${inputElement.offsetTop}px`;
                }
            }
        };

        // Use a MutationObserver to detect changes in the DOM that might affect layout
        const observer = new MutationObserver(updateCursorPosition);
        if (terminalOutputRef.current) {
            observer.observe(terminalOutputRef.current, { childList: true, subtree: true, characterData: true });
        }

        updateCursorPosition(); // Initial position
        window.addEventListener('resize', updateCursorPosition);
        // Also re-calculate on input change, handled by currentInput dependency

        return () => {
            window.removeEventListener('resize', updateCursorPosition);
            observer.disconnect();
        };
    }, [currentInput, theme]); // Dependencies

    // Effect to display the initial welcome message and MOTD when the component mounts.
    useEffect(() => {
        setHistory([{
            // No 'input: ""' here, just output for MOTD and welcome
            output: [
                'Linux debian 6.1.0-amd64 #1 SMP PREEMPT_DYNAMIC Debian 6.1.69-1 (2024-01-01) x86_64',
                ' ',
                'The programs included with the Debian GNU/Linux system are free software;',
                'the exact distribution terms for each program are described in the',
                'individual files in /usr/share/doc/*/copyright.',
                ' ',
                'Debian GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent',
                'permitted by applicable law.',
                ' ',
            ],
            timestamp: new Date().toLocaleTimeString()
        }]);
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    // Inline CSS for the terminal component
    const terminalStyles = `
        .xterminal-container {
            font-family: 'Fira Code', 'Cascadia Code', 'Consolas', monospace;
            font-size: 0.875rem; /* text-sm */
            height: 400px; /* Fixed height */
            width: 100%;
            overflow-y: auto; /* Enable scrolling */
            padding: 1rem; /* p-4 */
            border-radius: 0.5rem; /* Rounded corners for all sides */
            box-sizing: border-box; /* Include padding in height */
            position: relative; /* Needed for absolute positioning of cursor */
        }

        .xterminal-container.dark {
            background-color: #000000; /* Pure black background */
            color: #e2e8f0; /* text-gray-200 */
        }

        .xterminal-container.light {
            background-color: #ffffff;
            color: #1f2937; /* text-gray-800 */
        }

        .xterminal-output-prompt-block {
            /* Styles for historical prompt blocks */
        }

        .xterminal-current-input-block {
            /* Styles for the current input prompt block */
            position: relative; /* Needed for cursor absolute positioning */
        }

        .xterminal-prompt-line1 {
            display: block; /* Ensures it takes its own line */
            line-height: 1.3; /* Adjust line height for better spacing */
        }

        .xterminal-prompt-line2-wrapper {
            display: flex; /* Keep prompt and input inline */
            align-items: baseline;
            position: relative; /* Crucial: Cursor will be absolutely positioned relative to this */
            width: 100%; /* Ensure it takes full width */
        }

        .xterminal-prompt-line2 {
            display: inline-block;
        }

        .xterminal-input {
            flex-grow: 1;
            background: transparent;
            border: none;
            outline: none;
            color: inherit;
            font-family: inherit;
            font-size: inherit;
            margin-left: 0.5em; /* Space after the prompt, equivalent to one space bar */
            padding: 0; /* Remove padding that might interfere with cursor */
            caret-color: transparent; /* Hide native caret */
            min-width: 1ch; /* Ensure it has some width even when empty */
            line-height: 1.5em; /* Ensure consistent line height */
        }

        /* Blinking rectangle cursor */
        .blinking-cursor {
            display: inline-block;
            width: 1ch; /* Width of the cursor rectangle, one character width */
            /* height and top are set by JavaScript to match line-height */
            animation: blink-animation 0.75s step-end infinite;
            position: absolute;
            pointer-events: none; /* Ensure clicks pass through to input */
        }

        @keyframes blink-animation {
            from, to { opacity: 0; }
            50% { opacity: 1; }
        }

        /* ANSI color mappings */
        :root {
            --ansi-black: #000000;
            --ansi-red: #ff0000;
            --ansi-green: #00ff00;
            --ansi-yellow: #ffff00;
            --ansi-blue: #0000ff;
            --ansi-magenta: #ff00ff;
            --ansi-cyan: #00ffff;
            --ansi-white: #ffffff;
            --ansi-bright-black: #808080;

            /* Classic Linux prompt colors */
            --prompt-color-dark: #00ff00; /* Bright Green for dark theme */
            --prompt-color-light: #0000ff; /* Blue for light theme */
            --path-color-dark: #00ffff; /* Cyan for path in dark theme */
            --path-color-light: #0000ff; /* Blue for path in light theme */
        }

        .xterminal-container.dark .xterminal-prompt-line1,
        .xterminal-container.dark .xterminal-prompt-line2 {
            color: var(--prompt-color-dark);
        }

        .xterminal-container.light .xterminal-prompt-line1,
        .xterminal-container.light .xterminal-prompt-line2 {
            color: var(--prompt-color-light);
        }

        /* General styles for pre and span elements within terminal output */
        pre {
            white-space: pre-wrap;
            word-break: break-word;
            font-family: inherit; /* Inherit from xterminal-container */
            line-height: 1.3;
        }
    `;

    // Function to render the two-layer prompt structure
    const renderPromptStructure = (inputContent = '', isCurrent = false) => {
        const promptColor = theme === 'light' ? 'var(--prompt-color-light)' : 'var(--prompt-color-dark)';
        const pathColor = theme === 'light' ? 'var(--path-color-light)' : 'var(--path-color-dark)';
        const textColor = theme === 'light' ? '#111827' : '#f1f5f9';

        return (
            <>
                <div className="xterminal-prompt-line1" style={{ color: promptColor }}>
                    ┌──(<span style={{ color: promptColor }}>saad</span><span style={{ color: 'inherit' }}>㉿</span><span style={{ color: promptColor }}>debian</span>)-[<span style={{ color: pathColor }}>~</span>]
                </div>
                <div className="xterminal-prompt-line2-wrapper" ref={isCurrent ? promptLine2WrapperRef : null}>
                    <span className="xterminal-prompt-line2" style={{ color: promptColor }}>
                        └─$&nbsp;
                    </span>
                    {isCurrent ? (
                        <input
                            ref={inputRef}
                            type="text"
                            value={currentInput} // Use currentInput directly for the live input
                            onChange={(e) => setCurrentInput(e.target.value)}
                            onKeyDown={handleKeyPress}
                            className="xterminal-input"
                            autoFocus
                            spellCheck={false}
                        />
                    ) : (
                        <span style={{ color: textColor }}>{inputContent}</span>
                    )}
                    {/* The cursor is positioned here, within the same wrapper as the input */}
                    {isCurrent && <span ref={cursorRef} className="blinking-cursor"></span>}
                </div>
            </>
        );
    };

    return (
        <div
            className={`xterminal-container ${theme}`}
            ref={terminalOutputRef}
            onClick={handleTerminalClick}
        >
            <style>{terminalStyles}</style> {/* Inject CSS directly */}
            {history.map((entry, index) => (
                <div key={index} className="mb-1">
                    {/* Render prompt and input for historical entries, if input exists */}
                    {entry.input !== undefined && renderPromptStructure(entry.input, false)}
                    {/* Render output lines */}
                    {entry.output && entry.output.map((line, lineIndex) => (
                        <pre key={lineIndex} className="whitespace-pre-wrap leading-tight">
                            {parseAnsi(line)}
                        </pre>
                    ))}
                </div>
            ))}

            {/* Current input line */}
            <div className="xterminal-current-input-block">
                {renderPromptStructure(currentInput, true)} {/* Render prompt and input for current line */}
            </div>
        </div>
    );
};

export default XTerminal;
