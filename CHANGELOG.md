# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.0] - 2026-01-27

### Initial Release

#### Major change
- Initial open-source release of Shunya Agent Assist Platform
- Complete agent interface with live call support and real-time decision assistance
- Comprehensive manager dashboard with performance analytics and session monitoring
- Full-featured admin portal for organization setup and configuration
- Multi-tenant architecture with complete tenant isolation
- White-label capabilities for custom branding

#### Minor change
- Real-time WebSocket/SSE integration for live call data and monitoring
- Feature flag system for dynamic feature enablement per tenant
- RBAC (Role-Based Access Control) permission system
- Post-call analysis with transcript viewing and key moments timeline
- SOP (Standard Operating Procedures) and knowledge base integration
- AI chat assistant for agent support
- Live call monitoring for managers
- Advanced analytics and intelligence dashboard
- Audit logging and compliance reporting
- Data retention policy configuration
- Automation and webhook support
- Intent distribution and analysis

#### UI change
- Modern, responsive design with Tailwind CSS v4
- shadcn/ui component library integration
- Dark mode support
- Accessible UI components following WCAG guidelines
- Minimal, distraction-free agent interface
- Data-rich manager dashboard
- Configuration-focused admin interface

#### Fix
- Initial release - no fixes in this version

#### Internal
- Feature-based architecture implementation
- Strict separation of concerns (UI, domain logic, data access)
- Isolated real-time logic layer
- TypeScript strict mode configuration
- Next.js 16 App Router setup
- Zustand state management for global state
- Docker containerization support
- Comprehensive documentation structure

---

## Version History Format

Each version entry follows this structure:

- **BREAKING CHANGE**: Incompatible API or user-impacting behavior changes
- **Major change**: Significant new features or improvements
- **UI change**: User interface updates, theme changes, layout modifications
- **Minor change**: New backward-compatible features
- **Fix**: Bug fixes and patches
- **Internal**: Internal refactoring, build changes, documentation updates
