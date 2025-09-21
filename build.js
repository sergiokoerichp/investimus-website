#!/usr/bin/env node

/**
 * Simple Build System for Investimus Website
 * Compiles components, styles, and scripts into a single HTML file
 */

const fs = require('fs');
const path = require('path');

class Builder {
    constructor() {
        this.srcDir = './src';
        this.distDir = './dist';
        this.assetsDir = './assets';
        this.data = {};
        this.components = {};

        this.isWatchMode = process.argv.includes('--watch');
        this.isOptimizeMode = process.argv.includes('--optimize');
    }

    async build() {
        console.log('🏗️  Building Investimus Website...');

        try {
            // Create dist directory
            this.ensureDir(this.distDir);

            // Load data files
            await this.loadData();

            // Load components
            await this.loadComponents();

            // Build main HTML file
            await this.buildHTML();

            // Copy and process assets
            await this.processAssets();

            console.log('✅ Build completed successfully!');
            console.log(`📁 Output: ${path.resolve(this.distDir)}`);

            if (this.isWatchMode) {
                this.startWatchMode();
            }
        } catch (error) {
            console.error('❌ Build failed:', error);
            process.exit(1);
        }
    }

    ensureDir(dir) {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
    }

    async loadData() {
        console.log('📄 Loading data files...');
        const dataDir = path.join(this.srcDir, 'data');

        if (!fs.existsSync(dataDir)) return;

        const files = fs.readdirSync(dataDir);
        for (const file of files) {
            if (file.endsWith('.json')) {
                const filePath = path.join(dataDir, file);
                const content = fs.readFileSync(filePath, 'utf8');
                const key = path.basename(file, '.json');
                this.data[key] = JSON.parse(content);
            }
        }
    }

    async loadComponents() {
        console.log('🧩 Loading components...');
        const componentsDir = path.join(this.srcDir, 'components');

        if (!fs.existsSync(componentsDir)) return;

        const files = fs.readdirSync(componentsDir);
        for (const file of files) {
            if (file.endsWith('.html')) {
                const filePath = path.join(componentsDir, file);
                const content = fs.readFileSync(filePath, 'utf8');
                const key = path.basename(file, '.html');
                this.components[key] = content;
            }
        }
    }

    async buildHTML() {
        console.log('🏗️  Building HTML...');

        // Read template
        const templatePath = path.join(this.srcDir, 'templates', 'page.html');
        let html = '';

        if (fs.existsSync(templatePath)) {
            html = fs.readFileSync(templatePath, 'utf8');
        } else {
            // Create basic template if it doesn't exist
            html = this.createBasicTemplate();
        }

        // Replace placeholders with data
        html = this.replacePlaceholders(html);

        // Inline CSS and JS if optimize mode
        if (this.isOptimizeMode) {
            html = this.inlineAssets(html);
        } else {
            html = this.linkAssets(html);
        }

        // Write final HTML
        fs.writeFileSync(path.join(this.distDir, 'index.html'), html);
    }

    replacePlaceholders(html) {
        // Replace data placeholders like {{site.name}}
        html = html.replace(/\\{\\{([^}]+)\\}\\}/g, (match, path) => {
            const value = this.getNestedValue(this.data, path);
            return value !== undefined ? value : match;
        });

        // Replace component placeholders like {{component:header}}
        html = html.replace(/\\{\\{component:([^}]+)\\}\\}/g, (match, componentName) => {
            return this.components[componentName] || match;
        });

        return html;
    }

    getNestedValue(obj, path) {
        return path.split('.').reduce((current, key) => {
            return current && current[key] !== undefined ? current[key] : undefined;
        }, obj);
    }

    linkAssets(html) {
        // Add CSS links
        const cssFiles = this.getCSSFiles();
        const cssLinks = cssFiles.map(file =>
            `<link rel="stylesheet" href="${file}">`
        ).join('\\n    ');

        // Add JS scripts
        const jsFiles = this.getJSFiles();
        const jsScripts = jsFiles.map(file =>
            `<script src="${file}"></script>`
        ).join('\\n    ');

        html = html.replace('{{CSS_LINKS}}', cssLinks);
        html = html.replace('{{JS_SCRIPTS}}', jsScripts);

        return html;
    }

    inlineAssets(html) {
        // Inline CSS
        const cssFiles = this.getCSSFiles();
        let inlineCSS = '';
        cssFiles.forEach(file => {
            const filePath = path.join(this.srcDir, 'styles', path.basename(file));
            if (fs.existsSync(filePath)) {
                inlineCSS += fs.readFileSync(filePath, 'utf8') + '\\n';
            }
        });

        // Inline JS
        const jsFiles = this.getJSFiles();
        let inlineJS = '';
        jsFiles.forEach(file => {
            const filePath = path.join(this.srcDir, 'scripts', path.basename(file));
            if (fs.existsSync(filePath)) {
                inlineJS += fs.readFileSync(filePath, 'utf8') + '\\n';
            }
        });

        html = html.replace('{{CSS_LINKS}}', `<style>\\n${inlineCSS}</style>`);
        html = html.replace('{{JS_SCRIPTS}}', `<script>\\n${inlineJS}</script>`);

        return html;
    }

    getCSSFiles() {
        const stylesDir = path.join(this.srcDir, 'styles');
        if (!fs.existsSync(stylesDir)) return [];

        return fs.readdirSync(stylesDir)
            .filter(file => file.endsWith('.css'))
            .map(file => `./styles/${file}`);
    }

    getJSFiles() {
        const scriptsDir = path.join(this.srcDir, 'scripts');
        if (!fs.existsSync(scriptsDir)) return [];

        return fs.readdirSync(scriptsDir)
            .filter(file => file.endsWith('.js'))
            .map(file => `./scripts/${file}`);
    }

    async processAssets() {
        console.log('📁 Processing assets...');

        // Copy CSS files
        this.copyDirectory(path.join(this.srcDir, 'styles'), path.join(this.distDir, 'styles'));

        // Copy JS files
        this.copyDirectory(path.join(this.srcDir, 'scripts'), path.join(this.distDir, 'scripts'));

        // Copy assets directory
        if (fs.existsSync(this.assetsDir)) {
            this.copyDirectory(this.assetsDir, path.join(this.distDir, 'assets'));
        }
    }

    copyDirectory(src, dest) {
        if (!fs.existsSync(src)) return;

        this.ensureDir(dest);
        const files = fs.readdirSync(src);

        files.forEach(file => {
            const srcFile = path.join(src, file);
            const destFile = path.join(dest, file);

            if (fs.statSync(srcFile).isDirectory()) {
                this.copyDirectory(srcFile, destFile);
            } else {
                fs.copyFileSync(srcFile, destFile);
            }
        });
    }

    createBasicTemplate() {
        // If no template exists, create a basic one
        return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{site-config.site.name}}</title>
    <meta name="description" content="{{site-config.seo.description}}">

    <!-- Preconnect to external domains -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preconnect" href="https://cdn.tailwindcss.com">

    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>

    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" rel="stylesheet">

    {{CSS_LINKS}}
</head>
<body>
    <main id="main-content">
        {{component:header}}
        {{component:hero}}
        {{component:services}}
        {{component:about}}
        {{component:testimonials}}
        {{component:faq}}
        {{component:contact}}
        {{component:footer}}
    </main>

    {{JS_SCRIPTS}}
</body>
</html>`;
    }

    startWatchMode() {
        console.log('👀 Watch mode started. Press Ctrl+C to stop.');

        const chokidar = require('chokidar');
        const watcher = chokidar.watch(this.srcDir, {
            persistent: true,
            ignoreInitial: true
        });

        watcher.on('change', (filePath) => {
            console.log(`📝 File changed: ${filePath}`);
            this.build().catch(console.error);
        });
    }
}

// Run builder
const builder = new Builder();
builder.build();