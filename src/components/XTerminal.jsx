import React, { useEffect, useRef, useState } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';

const XTerminal = React.forwardRef(({ onCommand }, ref) => {
  const terminalRef = useRef(null);
  const xtermRef = useRef(null);
  const fitAddonRef = useRef(null);

  // State + Refs for current line and history
  const [currentLine, setCurrentLine] = useState('');
  const currentLineRef = useRef('');
  const [commandHistory, setCommandHistory] = useState([]);
  const commandHistoryRef = useRef([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const historyIndexRef = useRef(-1);

  // Sync state and refs
  const setCurrentLineSafe = (line) => {
    currentLineRef.current = line;
    setCurrentLine(line);
  };
  const setCommandHistorySafe = (history) => {
    commandHistoryRef.current = history;
    setCommandHistory(history);
  };
  const setHistoryIndexSafe = (index) => {
    historyIndexRef.current = index;
    setHistoryIndex(index);
  };

  const prompt = '\x1b[1;32m┌──(\x1b[1;36msaad\x1b[1;37m@\x1b[1;35mdebian\x1b[1;32m)-[\x1b[1;37m~\x1b[1;32m]\x1b[0m\n\x1b[1;32m└─\x1b[1;37m$\x1b[0m ';

  const writeOutput = (output) => {
    if (xtermRef.current) {
      const lines = output.split('\n');
      lines.forEach((line, index) => {
        if (index > 0) xtermRef.current.writeln('');
        xtermRef.current.write(line);
      });
      xtermRef.current.writeln('');
      xtermRef.current.write(prompt);
    }
  };

  const clearTerminal = () => {
    if (xtermRef.current) {
      xtermRef.current.clear();
      xtermRef.current.write(prompt);
    }
  };

  React.useImperativeHandle(ref, () => ({
    writeOutput,
    clearTerminal,
  }));

  useEffect(() => {
    if (!terminalRef.current) return;

    const terminal = new Terminal({
      cursorBlink: true,
      theme: {
        background: '#0f172a',
        foreground: '#f1f5f9',
        cursor: '#00d4aa',
        cursorAccent: '#00d4aa',
        selection: 'rgba(0, 212, 170, 0.3)',
        black: '#020617',
        red: '#ef4444',
        green: '#10b981',
        yellow: '#f59e0b',
        blue: '#3b82f6',
        magenta: '#8b5cf6',
        cyan: '#00d4aa',
        white: '#f1f5f9',
        brightBlack: '#64748b',
        brightRed: '#f87171',
        brightGreen: '#34d399',
        brightYellow: '#fbbf24',
        brightBlue: '#60a5fa',
        brightMagenta: '#a78bfa',
        brightCyan: '#22d3ee',
        brightWhite: '#ffffff'
      },
      fontFamily: '"JetBrains Mono", "Fira Code", "Consolas", monospace',
      fontSize: 14,
      lineHeight: 1.2,
      letterSpacing: 0,
      scrollback: 1000,
      tabStopWidth: 4,
      convertEol: true,
    });

    const fitAddon = new FitAddon();
    terminal.loadAddon(fitAddon);

    terminal.open(terminalRef.current);
    fitAddon.fit();

    xtermRef.current = terminal;
    fitAddonRef.current = fitAddon;

    terminal.writeln('\x1b[36mWelcome to Debian GNU/Linux!\x1b[0m\n');
    terminal.writeln('The programs included with the Debian GNU/Linux system are free software;');
    terminal.writeln('the exact distribution terms for each program are described in the');
    terminal.writeln('individual files in /usr/share/doc/*/copyright.\n');
    terminal.writeln('Debian GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent');
    terminal.writeln('permitted by applicable law.\n');
    terminal.write(prompt);

    terminal.onData((data) => {
      const code = data.charCodeAt(0);

      if (code === 13) { // Enter
        terminal.writeln('');
        if (currentLineRef.current.trim()) {
          const newHistory = [...commandHistoryRef.current, currentLineRef.current.trim()];
          setCommandHistorySafe(newHistory);
          setHistoryIndexSafe(-1);
          if (onCommand) onCommand(currentLineRef.current.trim());
        } else {
          terminal.write(prompt);
        }
        setCurrentLineSafe('');
      } else if (code === 127) { // Backspace
        if (currentLineRef.current.length > 0) {
          const newLine = currentLineRef.current.slice(0, -1);
          setCurrentLineSafe(newLine);
          terminal.write('\b \b');
        }
      } else if (code === 27) { // Escape sequences (arrows)
        if (data === '\x1b[A') { // Up arrow
          if (commandHistoryRef.current.length > 0) {
            const newIndex = historyIndexRef.current === -1
              ? commandHistoryRef.current.length - 1
              : Math.max(0, historyIndexRef.current - 1);
            setHistoryIndexSafe(newIndex);
            const command = commandHistoryRef.current[newIndex];
            terminal.write('\r' + prompt + command);
            terminal.write(' '.repeat(Math.max(0, currentLineRef.current.length - command.length)));
            terminal.write('\r' + prompt + command);
            setCurrentLineSafe(command);
          }
        } else if (data === '\x1b[B') { // Down arrow
          if (historyIndexRef.current !== -1) {
            const newIndex = historyIndexRef.current + 1;
            if (newIndex >= commandHistoryRef.current.length) {
              setHistoryIndexSafe(-1);
              terminal.write('\r' + prompt);
              terminal.write(' '.repeat(currentLineRef.current.length));
              terminal.write('\r' + prompt);
              setCurrentLineSafe('');
            } else {
              setHistoryIndexSafe(newIndex);
              const command = commandHistoryRef.current[newIndex];
              terminal.write('\r' + prompt + command);
              terminal.write(' '.repeat(Math.max(0, currentLineRef.current.length - command.length)));
              terminal.write('\r' + prompt + command);
              setCurrentLineSafe(command);
            }
          }
        }
      } else if (code === 9) { // Tab
        const matches = getTabCompletions(currentLineRef.current);
        if (matches.length === 1) {
          const completion = matches[0];
          const newLine = completion;
          terminal.write('\r' + prompt + newLine);
          terminal.write(' '.repeat(Math.max(0, currentLineRef.current.length - newLine.length)));
          terminal.write('\r' + prompt + newLine);
          setCurrentLineSafe(newLine);
        } else if (matches.length > 1) {
          terminal.writeln('');
          terminal.writeln(matches.join('  '));
          terminal.write(prompt + currentLineRef.current);
        }
      } else if (code >= 32 && code <= 126) { // Printable chars
        const newLine = currentLineRef.current + data;
        setCurrentLineSafe(newLine);
        terminal.write(data);
      }
    });

    const handleResize = () => {
      fitAddon.fit();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      terminal.dispose();
    };
  }, [onCommand]);

  const getTabCompletions = (input) => {
    const commands = ['help', 'whoami', 'ls', 'projects', 'skills', 'contact', 'social', 'badges', 'neofetch', 'clear', 'exit', 'show'];
    const [command, ...args] = input.split(' ');

    if (args.length === 0) {
      return commands.filter(cmd => cmd.startsWith(command.toLowerCase()));
    } else if (command.toLowerCase() === 'show') {
      const projects = ['p2p-c2-framework', 'fusee-web-injector', 'binary-format-viewer'];
      return projects.filter(proj => proj.startsWith(args[0]?.toLowerCase() || ''));
    }

    return [];
  };

  return (
    <div
      ref={terminalRef}
      className="w-full h-96 bg-slate-900 rounded-lg overflow-hidden"
      style={{ fontFamily: '"JetBrains Mono", "Fira Code", "Consolas", monospace' }}
    />
  );
});

export default XTerminal;
