# 🦜 Saad's Red Team Portfolio - Parrot OS Terminal

A modern, interactive terminal-style portfolio showcasing cybersecurity expertise with Parrot OS theming.

## ✨ Features

### 🎨 Design & UI
- **Parrot OS Theme**: Authentic Parrot Security OS color scheme and styling
- **Clean Terminal Interface**: Professional terminal emulation with proper command handling
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Custom Favicon**: Cyberpunk parrot logo with circuit board elements

### 🚀 Dynamic Content
- **Live GitHub Stats**: Real-time repository, star, and contribution counts
- **TryHackMe Badge**: Embedded dynamic profile badge
- **Enhanced MOTD**: Real-time system information with clock
- **Interactive Commands**: Full terminal command system

### 🛠️ Technical Features
- **React 18**: Modern React with hooks and functional components
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Framer Motion**: Smooth animations and transitions
- **GitHub Pages Ready**: Automated deployment workflow included
- **SEO Optimized**: Meta tags and social media integration

## 🎯 Commands Available

| Command | Description |
|---------|-------------|
| `help` | Show all available commands |
| `whoami` | Display user information |
| `ls` | List directory contents |
| `projects` | Show portfolio projects |
| `skills` | Display technical skills with progress bars |
| `contact` | Show contact information |
| `social` | Display social media links |
| `badges` | Reference to badges section |
| `neofetch` | System information display |
| `clear` | Clear terminal screen |
| `exit` | Close terminal |

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd parrot-terminal

# Install dependencies
pnpm install

# Start development server
pnpm run dev --host

# Build for production
pnpm run build

# Preview production build
pnpm run preview --host
```

## 📦 Deployment

### GitHub Pages (Recommended)
1. Push to GitHub repository
2. Enable GitHub Pages in repository settings
3. The GitHub Action will automatically deploy on push to main branch

### Manual Deployment
```bash
# Build the project
pnpm run build

# Deploy the dist/ folder to your hosting provider
```

## 🎨 Customization

### Colors (Parrot OS Theme)
```css
--parrot-cyan: #00d4aa;      /* Primary accent */
--parrot-blue: #0891b2;      /* Secondary accent */
--parrot-green: #10b981;     /* Success color */
--parrot-red: #ef4444;       /* Error color */
--parrot-dark-bg: #0f172a;   /* Main background */
--parrot-light-bg: #1e293b;  /* Card background */
```

### Updating Personal Information
1. Edit `src/App.jsx` - Update commands and personal details
2. Edit `src/components/GitHubStats.jsx` - Update GitHub username/stats
3. Edit `index.html` - Update meta tags and social links

### Adding New Commands
```javascript
// In src/App.jsx, add to commands object:
newcommand: () => `Your command output here`
```

## 🔧 Project Structure

```
parrot-terminal/
├── public/
│   ├── favicon.png          # Main favicon
│   ├── favicon-32.png       # Small favicon
│   └── favicon-192.png      # Large favicon
├── src/
│   ├── components/
│   │   ├── GitHubStats.jsx  # Dynamic GitHub statistics
│   │   └── EnhancedMOTD.jsx # Enhanced MOTD with real-time data
│   ├── App.jsx              # Main application component
│   └── App.css              # Parrot OS theme styles
├── .github/workflows/
│   └── deploy.yml           # GitHub Pages deployment
└── README.md                # This file
```

## 🌟 Key Improvements Made

### From Original Portfolio:
1. **Cleaner Design**: Removed cluttered ASCII boxes, streamlined interface
2. **Better Organization**: Separated components, improved code structure  
3. **Dynamic Badges**: Real-time GitHub stats and TryHackMe integration
4. **Enhanced MOTD**: Live system information with clock and status
5. **Parrot OS Theming**: Authentic color scheme and terminal styling
6. **Mobile Responsive**: Works perfectly on all device sizes
7. **GitHub Pages Ready**: Complete deployment automation
8. **Custom Favicon**: Professional cyberpunk parrot logo

### Technical Enhancements:
- Modern React 18 with hooks
- Tailwind CSS for consistent styling
- Component-based architecture
- Real-time data updates
- Smooth animations
- SEO optimization
- Social media integration

## 🎭 Portfolio Highlights

### Projects Showcased:
1. **P2P-C2-Framework** - A peer-to-peer (P2P) command and control framework written in Golang
2. **fusee-web-injector** - A web-based injector for fusee payloads
3. **Binary-Format-Viewer** - A simple binary format viewer
### Skills Demonstrated:
- **Offensive Security**: 95% proficiency
- **Penetration Testing**: 90% proficiency  
- **Programming**: 80% proficiency (Python, Go, JavaScript)
- **Security Tools**: 90% proficiency (Metasploit, Burp Suite, etc.)

## 📱 Social Links Integration

- **GitHub**: Dynamic stats and profile link
- **TryHackMe**: Embedded live badge (Top 1% ranking)
- **LinkedIn**: Professional networking
- **Twitter**: Security community engagement

## 🛡️ Security Note

All tools and techniques showcased are for:
- Educational purposes only
- Authorized penetration testing
- Responsible security research
- Professional red team operations

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contact

- **Email**: saadsaid158@gmail.com
- **GitHub**: [@SaadSaid158](https://github.com/SaadSaid158)
- **LinkedIn**: [Saad Said](https://linkedin.com/in/saad-said)
- **TryHackMe**: [SaadSaid158](https://tryhackme.com/p/SaadSaid158)

---

**⚠️ Ethical Use Only**: All security tools and techniques are for authorized testing and educational purposes only.

