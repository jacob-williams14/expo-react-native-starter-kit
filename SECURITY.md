# Security

This document outlines the security practices and tools used in this project to protect against supply chain attacks and malicious dependencies.

## Background

Modern npm packages can execute arbitrary code during installation via post-install scripts. While many legitimate packages use these scripts for necessary setup, they can also be exploited by malicious actors to:

- Steal environment variables and secrets
- Install backdoors or malware
- Exfiltrate source code
- Compromise CI/CD pipelines

This project implements security measures at both the global and project levels to mitigate these risks.

## What's Already Configured in This Project

The security measures are already set up in this repository:

- **Post-install scripts disabled** - See `.npmrc` with `ignore-scripts=true`
- **Allowlist for necessary scripts** - See `package.json` under `lavamoat.allowScripts`
- **Secure setup script** - `npm run setup` installs dependencies and runs only allowed scripts
- **CI/CD integration** - GitHub Actions workflows use the setup script
- **Lockfile linting** - `npm run lint:lockfile` validates package-lock.json integrity

## Developer Setup

### Global Security Measures

It's recommended to install these tools on your development machine to protect yourself and the team from security risks:

#### 1. Globally disable post-install scripts

**What it does**: Prevents all post-install scripts from running by default across all npm projects on your machine. This is strongly encouraged and widely considered a best practice.

```bash
# Disable post-install scripts globally
npm config --global set ignore-scripts true

# Verify it's enabled
npm config --global get ignore-scripts
```

#### 2. [Recommended] npq - Package Auditing Tool

**Docs** - https://github.com/lirantal/npq

**What it does**: Audits and validates packages before installation, reporting known security issues and suspicious activity. It acts as a pre-step to package installation

```bash
# Install npq globally
npm install -g npq

# Set up alias to use npq automatically
echo "alias npm='npq-hero'" >> ~/.zshrc
source ~/.zshrc
```

#### 3. [Optional] allow-scripts CLI

**Docs** - https://www.npmjs.com/package/@lavamoat/allow-scripts

**What it does**: Helps manage the allowlist of scripts across projects. Useful when adding new dependencies.

```bash
# Install globally for easier allowlist management
npm install -g @lavamoat/allow-scripts
```

#### 4. [Optional] can-i-ignore-scripts

**Docs** - https://www.npmjs.com/package/can-i-ignore-scripts

**What it does**: Analyzes dependencies to identify which packages need post-install scripts to function properly. A useful complement to `allow-scripts`, making it easier to identify what packages to add to the allowlist.

```bash
# Install globally for dependency analysis
npm install -g can-i-ignore-scripts
```

## Working Securely in This Repository

### Installing Dependencies

For routine dependency installation, use the setup script:

```bash
# Clean install of dependencies with allowlist scripts
npm run setup
```

### Adding New Dependencies

When adding new packages to the project:

1. **Install the package**:

   ```bash
   # Remember - if you have the npq alias set up, it will audit the package first
   npm install <package-name>
   ```

2. **Review security reports**:
   - Check for `npq` output for any security warnings
   - Run `npm audit` to check for known vulnerabilities

3. **Check for script issues**:
   Determine whether the new package needs post-install scripts

   ```bash
   # If you have can-i-ignore-scripts enabled globally
   can-i-ignore-scripts

   # OR use npx
   npx can-i-ignore-scripts
   ```

4. **If scripts are needed**: Add package to the allowlist in `package.json` under `lavamoat.allowScripts` and run the allowed post-install scripts

   ```bash
   # If you have allow-scripts enabled globally
   allow-scripts

   # OR use npx
   npx --no-install allow-scripts
   ```

### Allowlist Maintenance

The allowlist in `package.json` should be kept minimal. Only add packages that genuinely require post-install scripts to function. When in doubt:

1. Try running without adding to the allowlist
2. Use `can-i-ignore-scripts` to analyze the need
3. Review the package's post-install script source code (if needed)
4. Consider alternative packages if the scripts seem suspicious

## Development Workflow

Your day-to-day workflow remains mostly unchanged:

1. **Installing dependencies**: Use `npm run setup` (or `npm ci` if no allowlisted packages need to run)
2. **Adding packages**: Follow the "Adding New Dependencies" process above
3. **Reviewing changes**: Pay attention to npq and npm audit warnings
4. **Cleaning/rebuilding**: `npm run setup` handles dependency installation and running allowed scripts automatically

## CI/CD Integration

GitHub Actions workflows are configured to use the secure setup process:

- Uses `npm ci` for reproducible builds
- Runs `npm run setup` to execute only allowlisted scripts
- Includes lockfile linting to detect tampering

## Additional Resources

- [npm Security Best Practices](https://github.com/lirantal/npm-security-best-practices)

## Questions?

If you're unsure whether a package should be added to the allowlist or encounter security warnings, discuss with the team before proceeding.
