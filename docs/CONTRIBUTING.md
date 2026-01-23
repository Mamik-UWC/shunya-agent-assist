# Contributing Guide

Thank you for your interest in contributing to the Shunya Agent Assist Platform! This guide will help you get started.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Process](#development-process)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)

## 📜 Code of Conduct

### Our Standards

- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on constructive feedback
- Respect different viewpoints and experiences

### Unacceptable Behavior

- Harassment or discriminatory language
- Personal attacks
- Trolling or inflammatory comments
- Any conduct that could reasonably be considered inappropriate

## 🚀 Getting Started

### Prerequisites

Before contributing, ensure you have:

1. Read the [README.md](../README.md)
2. Reviewed the [Architecture Documentation](./ARCHITECTURE.md)
3. Set up your development environment ([Setup Guide](./SETUP.md))
4. Familiarized yourself with [Development Guidelines](./DEVELOPMENT.md)

### Fork and Clone

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone <your-fork-url>
   cd shunya-agent-assist
   ```
3. Add upstream remote:
   ```bash
   git remote add upstream <original-repo-url>
   ```

### Setup Development Environment

```bash
# Install dependencies
pnpm install

# Verify setup
pnpm dev
```

## 🔄 Development Process

### 1. Choose an Issue

- Check existing issues or create a new one
- Assign yourself to the issue
- Discuss approach in issue comments if needed

### 2. Create a Branch

```bash
# Update main branch
git checkout main
git pull upstream main

# Create feature branch
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

### Branch Naming Convention

- `feature/feature-name` - New features
- `fix/bug-description` - Bug fixes
- `refactor/component-name` - Refactoring
- `docs/documentation-update` - Documentation
- `test/test-description` - Adding tests
- `chore/task-description` - Maintenance tasks

### 3. Make Changes

- Follow [Development Guidelines](./DEVELOPMENT.md)
- Write clean, maintainable code
- Add tests for new features
- Update documentation as needed

### 4. Test Your Changes

```bash
# Run linter
pnpm lint

# Run tests (when available)
pnpm test

# Build project
pnpm build

# Test in development
pnpm dev
```

### 5. Commit Your Changes

Follow [Commit Guidelines](#commit-guidelines) below.

### 6. Push and Create Pull Request

```bash
# Push to your fork
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub.

## 🔀 Pull Request Process

### Before Submitting

- [ ] Code follows style guidelines
- [ ] All tests pass
- [ ] Documentation updated
- [ ] No linter errors
- [ ] Branch is up to date with `main`
- [ ] Commit messages follow conventions

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Related Issues
Closes #issue-number

## Testing
Describe how you tested your changes

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings
- [ ] Tests added/updated
- [ ] All tests pass
```

### Review Process

1. **Automated Checks**: CI/CD will run linter and tests
2. **Code Review**: At least one maintainer will review
3. **Feedback**: Address any feedback or requested changes
4. **Approval**: Once approved, PR will be merged

### Addressing Feedback

1. Make requested changes
2. Commit changes (can be force-pushed to same branch)
3. Comment on PR when ready for re-review
4. Maintainers will review again

## 📝 Coding Standards

### General Principles

1. **Feature-Based Architecture**: Organize code by feature, not file type
2. **Separation of Concerns**: UI, domain logic, and data access are separate
3. **Type Safety**: Use TypeScript strictly, avoid `any`
4. **Component Patterns**: Prefer Server Components, use Client Components only when needed
5. **State Management**: Use Zustand minimally, only for global persistent state

### Code Style

- Follow [Development Guidelines](./DEVELOPMENT.md)
- Use Prettier for formatting (if configured)
- Follow ESLint rules
- Write self-documenting code with clear variable names

### Component Guidelines

- One component per file
- Use TypeScript interfaces for props
- Check feature flags and permissions
- Prefer composition over configuration
- Add proper error boundaries

### Testing

- Write tests for new features
- Maintain or improve test coverage
- Test edge cases and error scenarios
- Use React Testing Library for component tests

## 📋 Commit Guidelines

### Commit Message Format

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `perf`: Performance improvements

### Examples

```bash
feat(live-call): add sentiment indicator component
fix(api): resolve WebSocket reconnection issue
docs(architecture): update component patterns section
refactor(stores): extract common store logic
test(hooks): add tests for useFeature hook
```

### Commit Best Practices

- Write clear, descriptive commit messages
- Keep commits focused (one logical change per commit)
- Use present tense ("add feature" not "added feature")
- Reference issues in commit message: `Closes #123`

## 🐛 Reporting Bugs

### Bug Report Template

```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce:
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment**
- OS: [e.g., macOS 14.0]
- Browser: [e.g., Chrome 120]
- Node version: [e.g., 20.10.0]
- pnpm version: [e.g., 8.15.0]

**Additional context**
Any other relevant information.
```

## 💡 Suggesting Features

### Feature Request Template

```markdown
**Is your feature request related to a problem?**
A clear description of the problem.

**Describe the solution you'd like**
What you want to happen.

**Describe alternatives you've considered**
Other solutions or features you've considered.

**Additional context**
Any other relevant information, mockups, etc.
```

## 📚 Documentation

### When to Update Documentation

- Adding new features
- Changing architecture
- Updating setup process
- Adding new dependencies
- Changing API contracts

### Documentation Files

- `README.md` - Project overview
- `docs/SETUP.md` - Setup instructions
- `docs/ARCHITECTURE.md` - Architecture details
- `docs/DEVELOPMENT.md` - Development guidelines
- `docs/CONTRIBUTING.md` - This file
- Code comments for complex logic

## 🎯 Feature Development Checklist

When working on a feature:

- [ ] Create feature branch
- [ ] Set up feature module structure
- [ ] Implement feature following architecture
- [ ] Add feature flag (if needed)
- [ ] Add permission checks (if needed)
- [ ] Write tests
- [ ] Update documentation
- [ ] Test in development environment
- [ ] Run linter and fix issues
- [ ] Create PR with description
- [ ] Address review feedback

## ❓ Getting Help

### Questions?

- Check existing documentation
- Search existing issues
- Ask in issue comments
- Contact maintainers

### Stuck?

- Review [Architecture Documentation](./ARCHITECTURE.md)
- Check [Development Guidelines](./DEVELOPMENT.md)
- Look at existing code for examples
- Ask for help in issue or discussion

## 🙏 Recognition

Contributors will be:
- Listed in project documentation (if desired)
- Credited in release notes
- Appreciated by the team!

## 📄 License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

Thank you for contributing to Shunya Agent Assist Platform! 🎉
