# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a website for "Investimus", an insurance brokerage company. The project has a **dual structure**:

### 1. Static HTML Version (index.html)
- Single-page application with all content inline
- **TailwindCSS** (loaded via CDN) for styling
- **Vanilla JavaScript** for minimal interactivity
- Can be served directly without build process

### 2. Modular Build System (src/ → dist/)
- Component-based architecture with reusable HTML modules
- Data-driven content via JSON configuration files
- Build system that compiles components into final HTML
- Support for watch mode and optimization

## Project Structure

```
site/
├── index.html              # Static single-page website (standalone version)
├── src/                    # Source files for modular build
│   ├── components/         # Reusable HTML components
│   │   ├── header.html    # Navigation component
│   │   ├── hero.html      # Hero section component
│   │   └── ...            # Other section components
│   ├── data/              # JSON configuration files
│   │   ├── site-config.json     # Site settings & SEO
│   │   ├── services.json        # Service offerings data
│   │   ├── testimonials.json    # Customer reviews
│   │   └── company-info.json    # Company contact info
│   ├── scripts/           # JavaScript modules
│   │   ├── main.js        # Entry point
│   │   ├── forms.js       # Form handling
│   │   ├── animations.js  # Scroll animations
│   │   └── navigation.js  # Menu functionality
│   ├── styles/            # CSS modules
│   │   ├── main.css       # Base styles & variables
│   │   ├── components.css # Component styles
│   │   └── animations.css # Animation definitions
│   └── templates/         # Page templates
│       └── page.html      # Main template with placeholders
├── dist/                   # Built output (generated)
│   └── index.html         # Compiled website
├── assets/                # Image assets (.webp format)
├── build.js               # Node.js build script
├── package.json           # NPM configuration
└── README.md              # User documentation
```

## Development Commands

### Build System Commands
```bash
# Install dependencies (optional, only for build system)
npm install

# Build the site (src/ → dist/)
npm run build

# Development mode with auto-rebuild on changes
npm run dev

# Serve the built site locally (Windows)
npm run serve
# Runs: python -m http.server 8000 --directory dist

# Optimized build (inlines CSS/JS)
npm run optimize

# Clean build directory
npm run clean

# Linting and formatting (placeholders)
npm run lint
npm run format
```

### Direct Static Serving (without build)
```bash
# Serve index.html directly
python -m http.server 8000
# Visit http://localhost:8000
```

## Key Architecture Notes

### Build System Architecture

#### Data-Driven Content
The build system uses a **placeholder replacement** strategy:
- **Data placeholders**: `{{file.property.nested}}` - replaced with JSON data
- **Component placeholders**: `{{component:name}}` - replaced with HTML components

#### Build Process Flow
1. Load all JSON files from `src/data/`
2. Load all HTML components from `src/components/`
3. Read template from `src/templates/page.html`
4. Replace all placeholders with actual content
5. Copy assets and scripts to `dist/`
6. Output final `dist/index.html`

#### Build Modes
- **Normal**: Links to external CSS/JS files
- **Optimize** (`--optimize`): Inlines all CSS/JS into HTML
- **Watch** (`--watch`): Auto-rebuilds on file changes

### Static HTML Structure
The standalone `index.html` contains these main sections:
- **Navigation**: Fixed navbar with mobile responsive menu
- **Hero Section**: Main banner with quick quote form
- **Services Section**: Six insurance service cards
- **About Section**: Company information and features
- **Testimonials Section**: Customer reviews
- **FAQ Section**: Expandable questions with toggle
- **Contact Section**: Contact form and company details
- **Footer**: Company info and social links

### Styling Approach
- **TailwindCSS v3** loaded from CDN
- Custom fonts: Inter & Plus Jakarta Sans from Google Fonts
- CSS Architecture:
  - `src/styles/main.css`: Base styles, CSS variables
  - `src/styles/components.css`: Component-specific styles
  - `src/styles/animations.css`: Keyframes and transitions
- Key custom classes:
  - `.hero-gradient`: Gradient background with pattern overlay
  - `.card-hover`: Card lift effect on hover
  - `.gradient-border`: Animated gradient borders
  - `.testimonial-card`: Review card styling

### JavaScript Functionality
Modular vanilla JavaScript organized by feature:
- `navigation.js`: Mobile menu toggle, smooth scroll, navbar effects
- `forms.js`: Form validation, submission handling, input formatting
- `animations.js`: Intersection Observer, scroll animations, lazy loading
- `main.js`: Entry point, initialization, event coordination
- No framework dependencies or complex state management

### Image Assets
All logos use `.webp` format for optimal performance:
- Main logo: `22- Sublogo azul SEM FUNDO.webp`
- Symbol: `30- Símbolo azul SEM FUNDO.webp`
- Watermarks: `25/26- Marca d_água azul...webp`
- Assets are copied to `dist/assets/` during build

## Important Considerations

1. **Dual Structure**: Project has both static (`index.html`) and modular (`src/` → `dist/`) versions
2. **Build Dependencies**: Only `fs-extra` and `chokidar` for build system (optional)
3. **CDN Dependencies**: TailwindCSS loaded from CDN in both versions
4. **Responsive Design**: Mobile-first design using Tailwind utilities
5. **Form Handling**: Forms use client-side validation, need backend integration for actual submission
6. **SEO Optimization**: Meta tags, Open Graph, Twitter Cards all configured
7. **Accessibility**: Semantic HTML with ARIA labels on interactive elements
8. **Performance**: Lazy loading, intersection observer, optimized images

## Common Modification Tasks

### Content Updates (Modular Version)
1. **Company Info**: Edit `src/data/company-info.json`
2. **Services**: Edit `src/data/services.json`
3. **Testimonials**: Edit `src/data/testimonials.json`
4. **SEO/Meta**: Edit `src/data/site-config.json`
5. Run `npm run build` to apply changes

### Component Modifications
1. Edit component in `src/components/`
2. Use placeholders: `{{data-file.property}}`
3. Run `npm run build` or `npm run dev` for watch mode

### Adding New Features
1. Create new component: `src/components/new-feature.html`
2. Add to template: `{{component:new-feature}}` in `src/templates/page.html`
3. Create data file if needed: `src/data/new-feature.json`
4. Add styles: `src/styles/components.css`
5. Add scripts: `src/scripts/new-feature.js`
6. Run build to compile

### Form Integration
- Edit `src/scripts/forms.js` for API endpoint
- Options: Formspree, Netlify Forms, EmailJS, custom API
- Current implementation simulates success response

## Performance & Deployment

### Optimization
- Run `npm run optimize` for production (inlines CSS/JS)
- Images already optimized (.webp format)
- Lazy loading implemented via Intersection Observer
- TailwindCSS from CDN (~45KB gzipped)

### Deployment Options
- Static hosting: Netlify, Vercel, GitHub Pages
- Traditional: Apache, Nginx (serve `dist/` folder)
- CDN: CloudFlare Pages, AWS S3 + CloudFront

## Troubleshooting

### Build Issues
- Verify JSON syntax in `src/data/` files
- Check placeholder syntax: `{{file.property}}`
- Ensure components exist when referenced

### Development Server
- Windows: Python required for `npm run serve`
- Alternative: `npx serve dist` or any static server

### Watch Mode
- Requires `npm install` for chokidar dependency
- File changes in `src/` trigger auto-rebuild