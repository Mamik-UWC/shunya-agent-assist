# Setup Guide

Complete guide for setting up the Shunya Agent Assist Platform development environment.

## 📋 Prerequisites

### Required Software

- **Node.js**: Version 20.x or higher
  - Check version: `node --version`
  - Download: [nodejs.org](https://nodejs.org/)
  
- **pnpm**: Version 8.x or higher
  - Check version: `pnpm --version`
  - Install: `npm install -g pnpm`
  - Or via standalone script: `curl -fsSL https://get.pnpm.io/install.sh | sh -`

- **Git**: Latest version
  - Check version: `git --version`

### Recommended Tools

- **VS Code** or your preferred IDE
- **Git** for version control
- **Browser DevTools** for debugging

## 🚀 Installation Steps

### 1. Clone the Repository

```bash
git clone <repository-url>
cd shunya-agent-assist
```

### 2. Install Dependencies

```bash
pnpm install
```

This will:
- Install all project dependencies
- Create `node_modules/` directory
- Generate `pnpm-lock.yaml` (already committed)

### 3. Environment Variables

Create a `.env.local` file in the project root:

```bash
cp .env.example .env.local  # If example exists
# Or create manually
```

Required environment variables (add as needed):
```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_WS_URL=ws://localhost:8000

# Tenant Configuration
NEXT_PUBLIC_DEFAULT_TENANT_ID=
```

### 4. Setup shadcn/ui

#### Initialize shadcn/ui

```bash
pnpm dlx shadcn@latest init
```

This will:
- Create `components.json` configuration file
- Set up path aliases (if needed)
- Configure Tailwind CSS integration

#### Configuration Options

When running `init`, you'll be prompted for:
- **Style**: `default`, `new-york`, or custom
- **Base Color**: `slate`, `gray`, `zinc`, `neutral`, `stone`
- **CSS Variables**: `yes` (recommended for theming)
- **Tailwind Config**: Path to your Tailwind config
- **Components Path**: `@/components/ui` (default)
- **Utils Path**: `@/lib/utils` (default)

#### Add Components

Add shadcn/ui components as needed:

```bash
# Add individual components
pnpm dlx shadcn@latest add button
pnpm dlx shadcn@latest add card
pnpm dlx shadcn@latest add dialog
pnpm dlx shadcn@latest add table
pnpm dlx shadcn@latest add dropdown-menu

# Or add multiple at once
pnpm dlx shadcn@latest add button card dialog table
```

Components will be installed to `components/ui/` directory.

### 5. Verify Installation

```bash
# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) - you should see the application running.

## 🛠️ pnpm Usage

### Installing Dependencies

```bash
# Add production dependency
pnpm add <package-name>

# Add development dependency
pnpm add -D <package-name>

# Add peer dependency
pnpm add -P <package-name>

# Add exact version
pnpm add <package-name>@<version>
```

### Removing Dependencies

```bash
pnpm remove <package-name>
```

### Running Scripts

```bash
# Run script defined in package.json
pnpm run <script-name>

# Or use shorthand (for common scripts)
pnpm dev      # Same as pnpm run dev
pnpm build    # Same as pnpm run build
pnpm lint     # Same as pnpm run lint
```

### Updating Dependencies

```bash
# Update all dependencies
pnpm update

# Update specific package
pnpm update <package-name>

# Update to latest (may break)
pnpm update --latest
```

### Checking Dependencies

```bash
# List installed packages
pnpm list

# Check for outdated packages
pnpm outdated

# Verify lockfile
pnpm install --frozen-lockfile
```

## 📦 Project Dependencies

### Core Dependencies

- **next**: 16.1.2 - React framework
- **react**: 19.2.3 - UI library
- **react-dom**: 19.2.3 - React DOM renderer

### Development Dependencies

- **typescript**: ^5 - Type checking
- **tailwindcss**: ^4 - Utility-first CSS
- **eslint**: ^9 - Code linting
- **@types/node**: ^20 - Node.js type definitions
- **@types/react**: ^19 - React type definitions

### Planned Dependencies (to be added)

- **zustand** - State management
- **@tanstack/react-query** - Data fetching (if needed)
- **framer-motion** - Animations

## 🎨 Tailwind CSS Setup

Tailwind CSS v4 is already configured. The configuration is in:

- `postcss.config.mjs` - PostCSS configuration
- `app/globals.css` - Global styles and Tailwind directives

### Customization

To customize Tailwind:
1. Edit `tailwind.config.ts` (if exists) or use CSS variables
2. Modify `app/globals.css` for custom styles
3. Use Tailwind v4's new configuration approach

## 🔧 TypeScript Configuration

TypeScript is configured with strict mode enabled. Key settings:

- **Strict mode**: Enabled
- **Path aliases**: `@/*` maps to project root
- **JSX**: React JSX transform
- **Module resolution**: Bundler (for Next.js)

Path aliases are configured in `tsconfig.json`:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

## 🧪 Verify Setup

Run these commands to verify everything is working:

```bash
# Check Node.js version
node --version  # Should be 20.x or higher

# Check pnpm version
pnpm --version  # Should be 8.x or higher

# Install dependencies
pnpm install

# Run linter
pnpm lint

# Build project
pnpm build

# Start dev server
pnpm dev
```

## 🐛 Troubleshooting

### pnpm Issues

**Problem**: `pnpm: command not found`
```bash
# Install pnpm globally
npm install -g pnpm
# Or use standalone installer
curl -fsSL https://get.pnpm.io/install.sh | sh -
```

**Problem**: Lockfile conflicts
```bash
# Remove node_modules and reinstall
rm -rf node_modules
pnpm install
```

### shadcn/ui Issues

**Problem**: Components not found after installation
- Check `components.json` exists and is configured correctly
- Verify path aliases in `tsconfig.json`
- Ensure `@/components/ui` path is correct

**Problem**: Styles not applying
- Check Tailwind CSS is configured
- Verify `globals.css` imports Tailwind directives
- Check `components.json` style configuration

### TypeScript Issues

**Problem**: Path alias not resolving
- Verify `tsconfig.json` has correct paths configuration
- Restart TypeScript server in your IDE
- Check file paths match alias pattern

**Problem**: Type errors
- Run `pnpm build` to see all type errors
- Check `tsconfig.json` strict settings
- Ensure all dependencies have type definitions

### Next.js Issues

**Problem**: Port already in use
```bash
# Use different port
pnpm dev -- -p 3001
```

**Problem**: Build fails
```bash
# Clear Next.js cache
rm -rf .next
pnpm build
```

## 📚 Next Steps

After setup is complete:

1. Read [ARCHITECTURE.md](./ARCHITECTURE.md) to understand the project structure
2. Review [DEVELOPMENT.md](./DEVELOPMENT.md) for coding guidelines
3. Check [CONTRIBUTING.md](./CONTRIBUTING.md) for contribution process
4. Review `requirement.md` for detailed feature specifications

## 🔗 Useful Links

- [Next.js Documentation](https://nextjs.org/docs)
- [pnpm Documentation](https://pnpm.io/)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
