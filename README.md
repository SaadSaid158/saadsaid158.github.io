# Saad Said — Portfolio

A minimal, static portfolio website for an offensive security and systems engineer.

**Live:** [saadsaid158.github.io](https://saadsaid158.github.io)

---

## Tech Choice

**Astro + Tailwind CSS**

Astro was chosen for the following reasons:

1. **Zero JavaScript by default** — Ships pure HTML/CSS unless explicitly needed
2. **Static-first architecture** — Perfect for GitHub Pages with no runtime requirements
3. **Excellent DX** — Component-based authoring with hot reload
4. **Tailwind integration** — First-class support via official plugin
5. **Build performance** — Fast builds with Vite under the hood

The site uses minimal JavaScript only for scroll-triggered animations (Intersection Observer), which is progressively enhanced and doesn't affect core content delivery.

---

## Project Structure

```
/
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions deployment
├── public/
│   └── favicon.svg         # Site favicon
├── src/
│   ├── layouts/
│   │   └── Layout.astro    # Base HTML layout
│   ├── pages/
│   │   └── index.astro     # Main portfolio page
│   └── styles/
│       └── global.css      # Global styles + Tailwind
├── astro.config.mjs        # Astro configuration
└── package.json
```

---

## Local Development

### Prerequisites

- Node.js 18+ (recommended: 20 LTS)
- npm

### Commands

```bash
# Install dependencies
npm install

# Start development server (http://localhost:4321)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

---

## Deploying to GitHub Pages

### Option 1: Automatic (GitHub Actions)

The repository includes a pre-configured GitHub Actions workflow (`.github/workflows/deploy.yml`).

1. Push your code to the `main` branch
2. Go to your repository **Settings → Pages**
3. Under "Build and deployment", select **Source: GitHub Actions**
4. The site will automatically build and deploy on every push to `main`

### Option 2: Manual

```bash
# Build the site
npm run build

# The static files will be in ./dist
# Upload the contents of ./dist to your hosting provider
```

---

## Editing Content

All content is in `src/pages/index.astro`. The file is structured in clear sections:

### Hero Section (lines ~10-50)
- Name, tagline, and social links
- Edit the `<h1>`, `<p>`, and link `<a>` elements

### Selected Work (lines ~55-140)
- Each project is an `<article>` element
- Edit project name, description, tech stack, and bullet points
- Change links or mark as "Private"

### Offensive Security (lines ~145-185)
- Intro paragraph and bullet points
- TryHackMe link

### About (lines ~190-210)
- Single paragraph about background

### Footer (lines ~215-235)
- Copyright and social links

### Styling

- Colors are defined in `src/styles/global.css` (CSS variables)
- Tailwind classes are used inline for component styling
- Accent color: `#3b82f6` (muted blue)

### Adding a New Project

Copy an existing `<article>` block in the Selected Work section and modify:

```astro
<article class="project-item stagger-item border-l-2 border-[#e5e7eb] pl-8 hover:border-[#3b82f6] transition-colors duration-300">
  <h3 class="text-2xl md:text-3xl font-semibold text-[#1a1a1a] mb-2">
    Project Name
  </h3>
  <p class="text-lg text-[#374151] mb-3">
    One-line description
  </p>
  <p class="text-sm text-[#6b7280] italic mb-4">
    Tech · Stack · Here
  </p>
  <ul class="space-y-2 text-[#374151] mb-4">
    <li class="flex items-start gap-3">
      <span class="text-[#3b82f6] mt-1.5">—</span>
      <span>Bullet point explaining technical interest</span>
    </li>
  </ul>
  <a href="https://github.com/..." ...>View Repository</a>
</article>
```

---

## License

This portfolio template is open source. Feel free to use it as a starting point for your own portfolio.
