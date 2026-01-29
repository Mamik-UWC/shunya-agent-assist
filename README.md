# Shunya Agent Assist Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/version-0.1.0-blue.svg)](https://github.com/your-org/shunya-agent-assist)
[![Node.js](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen.svg)](https://nodejs.org/)
[![pnpm](https://img.shields.io/badge/pnpm-%3E%3D8.0.0-orange.svg)](https://pnpm.io/)

A production-grade frontend application for the Agent Assist Platform, built with Next.js 16 (App Router), optimized for multi-tenant, white-label deployments with feature-based architecture.

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-key-features)
- [Screenshots](#-screenshots)
- [Tech Stack](#️-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [Deployment](#-deployment)
- [Development](#-development)
  - [Development with Docker](#development-with-docker)
- [Project Structure](#-project-structure)
- [Documentation](#-documentation)
- [Architecture Principles](#️-architecture-principles)
- [Route Structure](#-route-structure)
- [State Management](#-state-management)
- [Real-time Architecture](#-real-time-architecture)
- [Security](#-security)
- [Contributing](#-contributing)
- [Support](#-support)
- [Roadmap](#-roadmap)
- [License](#-license)
- [Acknowledgments](#-acknowledgments)

## 🎯 Overview

The Agent Assist Platform provides real-time decision support for call center agents, comprehensive analytics for managers, and configuration tools for administrators. The platform is designed with strict separation of concerns, tenant isolation, and feature-flag driven UI.

Built with modern web technologies and following best practices for scalability, maintainability, and performance, this platform serves as a complete solution for call center operations management.

## ✨ Key Features

- **Agent Interface**: Live call support, post-call analysis, SOP/knowledge base, and AI chat assistant
- **Manager Dashboard**: Performance analytics, session monitoring, live call oversight, and advanced intelligence
- **Admin Portal**: Organization setup, knowledge management, feature configuration, and audit logging
- **Multi-tenant**: Complete tenant isolation with white-label capabilities
- **Real-time**: WebSocket/SSE integration for live call data and monitoring
- **Feature Flags**: Dynamic feature enablement per tenant
- **RBAC**: Role-based access control for secure operations
- **Responsive Design**: Works seamlessly across desktop and mobile devices

## 📸 Screenshots

> **Note**: Screenshots will be added in future releases. Contributions welcome!

## 🛠️ Tech Stack

- **Framework**: Next.js 16.1.2 (App Router)
- **Language**: TypeScript 5.x (strict mode)
- **Package Manager**: pnpm 8.x
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **State Management**: Zustand 5.x (minimal, intentional usage)
- **Real-time**: WebSocket / SSE abstraction layer
- **Animations**: Motion (Framer Motion) 11.x
- **Charts**: Recharts 2.15.4

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 20.x or higher ([Download](https://nodejs.org/))
- **pnpm**: Version 8.x or higher ([Installation Guide](https://pnpm.io/installation))
- **Git**: Latest version ([Download](https://git-scm.com/))

### Recommended Tools

- **VS Code** or your preferred IDE
- **Docker** and **Docker Compose** (for containerized deployment)
- **Browser DevTools** for debugging

## 🚀 Installation

### Clone the Repository

```bash
git clone https://github.com/your-org/shunya-agent-assist.git
cd shunya-agent-assist
```

### Install Dependencies

```bash
# Install all dependencies
pnpm install
```

### Setup shadcn/ui

```bash
# Initialize shadcn/ui (if not already done)
pnpm dlx shadcn@latest init

# Add components as needed
pnpm dlx shadcn@latest add button
pnpm dlx shadcn@latest add card
pnpm dlx shadcn@latest add dialog
# ... etc
```

### Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## ⚙️ Configuration

### Environment Variables

Create a `.env.local` file in the project root with the following variables:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_WS_URL=ws://localhost:8000

# Tenant Configuration
NEXT_PUBLIC_DEFAULT_TENANT_ID=

# Optional: Analytics and Monitoring
# NEXT_PUBLIC_ANALYTICS_ID=
# NEXT_PUBLIC_SENTRY_DSN=
```

### Environment Variable Reference

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API base URL | Yes | `http://localhost:8000` |
| `NEXT_PUBLIC_WS_URL` | WebSocket server URL | Yes | `ws://localhost:8000` |
| `NEXT_PUBLIC_DEFAULT_TENANT_ID` | Default tenant identifier | No | - |
| `NEXT_PUBLIC_ANALYTICS_ID` | Analytics tracking ID | No | - |
| `NEXT_PUBLIC_SENTRY_DSN` | Sentry error tracking DSN | No | - |

## 💻 Usage

### Development Mode

```bash
# Start development server with hot reload
pnpm dev

# Run linter
pnpm lint

# Build for production
pnpm build

# Start production server
pnpm start
```

### Available Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
```

## 🐳 Deployment

### Docker Deployment

The project includes Docker support for easy deployment.

#### Build Docker Image

```bash
docker build -t shunya-agent-assist .
```

#### Run with Docker Compose

```bash
# Start the application
docker compose up -d

# View logs
docker compose logs -f

# Stop the application
docker compose down
```

#### Docker Compose Configuration

The `compose.yaml` file includes:
- Multi-stage build optimization
- Health checks
- Environment variable configuration
- Volume mounting for local development

#### Production Deployment Considerations

1. **Environment Variables**: Ensure all required environment variables are set
2. **Reverse Proxy**: Use nginx or similar for SSL termination
3. **Database**: Configure backend database connections
4. **Monitoring**: Set up logging and monitoring solutions
5. **Security**: Enable HTTPS, configure CORS, and set security headers

### Manual Deployment

1. Build the application:
   ```bash
   pnpm build
   ```

2. Start the production server:
   ```bash
   pnpm start
   ```

3. Configure your web server (nginx, Apache, etc.) to proxy requests to the Next.js server.

## 🧪 Development

### Development Setup

1. Fork the repository
2. Clone your fork
3. Create a branch for your feature: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Run tests and linter: `pnpm lint`
6. Commit your changes following [Conventional Commits](https://www.conventionalcommits.org/)
7. Push to your fork and create a Pull Request

### Development with Docker

To run the app in Docker with hot-reload (code changes apply without rebuilding):

```bash
docker compose -f compose.dev.yaml up --build
```

Open [http://localhost:3000](http://localhost:3000). Edits under `app/`, `components/`, `lib/`, etc. are picked up by the dev server inside the container; no image rebuild is needed. The first run may be slower while dependencies are installed in the container.

### Code Style

- Follow the [Development Guidelines](./docs/DEVELOPMENT.md)
- Use TypeScript strictly (avoid `any`)
- Follow feature-based architecture principles
- Write self-documenting code
- Add comments for complex logic

### Testing

```bash
# Run linter
pnpm lint

# Build to check for TypeScript errors
pnpm build
```

See [Development Guidelines](./docs/DEVELOPMENT.md) for:
- Code style and conventions
- Component patterns
- State management guidelines
- Testing approach
- Git workflow

## 📁 Project Structure

```
app/                              # Next.js App Router
├── (auth)/                       # Authentication route group
│   ├── login/
│   └── register/
│
├── agent/                        # Agent interface routes
│   ├── live-call/
│   ├── post-call/[sessionId]/
│   ├── sop/
│   └── chat/
│
├── manager/                      # Manager dashboard routes
│   ├── overview/
│   ├── agents/
│   ├── sessions/
│   ├── live-monitoring/
│   └── intelligence/
│
├── admin/                        # Admin configuration routes
│   ├── onboarding/
│   ├── knowledge/
│   ├── intents/
│   ├── features/
│   ├── dashboards/
│   ├── automation/
│   ├── data-retention/
│   └── audit-logs/
│
└── api/                          # BFF API endpoints

features/                         # Feature-based modules
├── live-call/
├── post-call/
├── sop/
├── knowledge/
├── chat-assistant/
├── dashboards/
├── sessions/
├── live-monitoring/
├── onboarding/
├── configuration/
└── audit-logs/

components/                       # Shared components
├── ui/                           # shadcn/ui primitives
├── layout/                       # Layout components
└── ...

stores/                           # Zustand stores
├── auth.store.ts
├── tenant.store.ts
├── feature-flags.store.ts
├── live-call.store.ts
└── ui.store.ts

lib/                              # Core utilities
├── api/                          # API client & config
├── realtime/                     # WebSocket/SSE abstraction
├── permissions/                  # RBAC utilities
├── feature-flags/                # Feature flag logic
└── telemetry/                    # Monitoring & analytics

hooks/                            # Custom React hooks
types/                            # TypeScript type definitions
constants/                        # Application constants
```

## 📚 Documentation

Comprehensive documentation is available in the `docs/` directory:

- **[Setup Guide](./docs/SETUP.md)** - Detailed installation and configuration
- **[Architecture](./docs/ARCHITECTURE.md)** - System design and patterns
- **[Development Guidelines](./docs/DEVELOPMENT.md)** - Coding standards and best practices
- **[Contributing](./docs/CONTRIBUTING.md)** - How to contribute to the project
- **[Changelog](./CHANGELOG.md)** - Version history and changes

## 🏗️ Architecture Principles

1. **Feature-based architecture** - Not page-based
2. **Strict separation** - UI, domain logic, and server data access
3. **Tenant & feature-flag driven UI** - Dynamic feature enablement
4. **Zero coupling** - Agent and Manager surfaces are independent
5. **Isolated real-time logic** - WebSocket/SSE in dedicated layer

## 🎨 UI/UX Guidelines

- **Agent UI**: Minimal, fast, distraction-free
- **Manager UI**: Analytical, data-rich, comprehensive
- **Admin UI**: Audit-first, configuration-focused

## 📖 Route Structure

### Agent Routes
- `/agent/live-call` - Live call interface
- `/agent/post-call/[sessionId]` - Post-call analysis
- `/agent/sop` - SOP and knowledge base
- `/agent/chat` - AI chat assistant

### Manager Routes
- `/manager/overview` - Overview dashboard
- `/manager/agents` - Agent performance
- `/manager/sessions` - Sessions list
- `/manager/sessions/[sessionId]` - Session details
- `/manager/live-monitoring` - Live call monitoring
- `/manager/intelligence` - Advanced analytics

### Admin Routes
- `/admin/onboarding` - Organization setup
- `/admin/knowledge` - Knowledge management
- `/admin/intents` - Intent configuration
- `/admin/features` - Feature enablement
- `/admin/dashboards` - Dashboard configuration
- `/admin/automation` - Automation & webhooks
- `/admin/data-retention` - Data retention policies
- `/admin/audit-logs` - Audit log viewer

## 🔐 State Management

Zustand is used **only** for:
- Auth & RBAC state
- Tenant configuration
- Feature flags
- Live call state
- UI preferences

**Never** use Zustand for server data caching. Use React Server Components and proper data fetching patterns instead.

## 🌐 Real-time Architecture

Real-time functionality is abstracted in `lib/realtime/`:
- UI components never directly interact with WebSocket/SSE
- Stores subscribe to real-time events
- Components consume store state

## 🔒 Security

### Reporting Security Issues

We take security seriously. If you discover a security vulnerability, please follow these steps:

1. **Do not** open a public GitHub issue
2. Email security concerns to: `security@your-domain.com` (update with your security contact)
3. Include a detailed description of the vulnerability
4. We will respond within 48 hours

### Security Best Practices

- Always use HTTPS in production
- Keep dependencies up to date: `pnpm update`
- Review and audit third-party packages
- Follow secure coding practices
- Implement proper authentication and authorization
- Use environment variables for sensitive configuration

### Security Policy

> **Note**: A detailed security policy document will be added in a future release. For now, please follow the reporting procedures outlined above.

## 🤝 Contributing

We welcome contributions! Please read our [Contributing Guide](./docs/CONTRIBUTING.md) for details on:

- Code of conduct
- Development process
- Pull request guidelines
- Commit message conventions
- Bug reporting
- Feature requests

### Quick Contribution Steps

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Commit following [Conventional Commits](https://www.conventionalcommits.org/)
5. Push to your branch: `git push origin feature/amazing-feature`
6. Open a Pull Request

## 💬 Support

### Getting Help

- **Documentation**: Check the [docs](./docs/) directory
- **Issues**: Open an issue on [GitHub Issues](https://github.com/your-org/shunya-agent-assist/issues)
- **Discussions**: Join [GitHub Discussions](https://github.com/your-org/shunya-agent-assist/discussions)
- **Email**: Contact us at `support@your-domain.com` (update with your support email)

### Community

- Star the repository if you find it useful
- Share your use cases and feedback
- Contribute improvements and bug fixes
- Help improve documentation

## 🗺️ Roadmap

### Upcoming Features

- [ ] Enhanced analytics and reporting
- [ ] Mobile app support
- [ ] Advanced AI capabilities
- [ ] Integration marketplace
- [ ] Performance optimizations
- [ ] Additional language support
- [ ] Enhanced security features

### Version History

See [CHANGELOG.md](./CHANGELOG.md) for detailed version history and changes.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Zustand](https://zustand-demo.pmnd.rs/) - State management
- [Recharts](https://recharts.org/) - Charting library
- All contributors and users of this project

---

**Made with ❤️ by the Shunya team**

For detailed information, refer to the [requirements document](./docs/requirement.md) and the documentation in the `docs/` directory.
