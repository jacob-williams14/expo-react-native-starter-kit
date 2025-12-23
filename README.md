# Expo React Native Starter Kit

A React Native app built with Expo Router and NativeWind.

## Development Environment Setup

It is recommended to develop on MacOS. This will provide the easiest, most straightforward experience when working with Expo/EAS tooling, most specifically the use of iOS simulators via XCode.

Running simulators can be resource intensive, so it is recommended to have at least 16GB of RAM on a relatively modern machine.

### Security

This project implements security measures to help protect against malicious npm packages and supply chain attacks.

Most notably:

1. Post-install scripts are disabled
2. We maintain an allowlist for packages needing to run post-install scripts
3. `npm run setup` will install deps and run allowed scripts for you
4. Lockfile linting

See [SECURITY.md](./SECURITY.md) for more detailed information and recommended practices.

### Setup

#### Simulators

1. Install iOS simulator (MacOS required) - [Xcode](https://developer.apple.com/xcode/)
2. Install android simulator - [Android Studio](https://developer.android.com/studio)
3. For each simulator, you'll need to install the latest runtimes and set up devices.
4. In Xcode, click Settings->Components. Install iOS
5. In Android Studio, click Settings->Languages & Frameworks->Android SDK. Install Android SDK Command-line Tools (latest)

#### EAS CLI

```bash
# Install the eas-cli
npm install -g eas-cli

# Authenticate with EAS
eas login
```

#### Frontend

1. Install [direnv](https://direnv.net/docs/installation.html) to manage environment variables
2. Install app dependencies: `npm install`
3. Copy the environment template

```bash
cp .envrc.sample .envrc
```

4. Edit `.envrc` with your configuration values
5. Run `direnv allow` to load environment variables

## Running Locally

```bash
# Build and run locally (when adding native dependencies)
npm run local ios
npm run local android

# Start dev server (daily development)
npm run dev
```

## Developing With Expo & EAS

### Creating New Builds

Generally, it is recommended to clear caches and run everything fresh.

```bash
npm run clean
```

When adding new native packages, rebuild locally to test functionality:

```bash
npm run local ios
npm run local android
```

This builds and runs the app with updated native packages in the simulator. It is recommended to delete the old app from the simulator when preparing to create a new bundle.

To kick off EAS builds (used for device testing/distribution):

```bash
# Development builds
npm run build:dev ios/android

# Staging builds
npm run build:staging ios/android

# Production builds
npm run build:production ios/android
```

### Building Artifacts Locally (not often needed)

This is useful if you need to debug something on a physical device (or make changes to native code) but don't want to create builds on the EAS server.

The team has found the most success with this approach on android devices. iOS has generally crashed at build time due to a signature/certificate issue.

```bash
# Build local artifacts (creates installable .apk/.ipa files)
npm run build:artifact android

# The command output should include the path to the generated files
adb install path/to/your/buildname.apk

# Install manually on your device/emulator as needed. Drag and drop or other file download methods may also work.
```

## CI/CD Pipeline

The project uses GitHub Actions for automated testing, building, and deployment:

### Workflows

**1. Run Tests** (`run_tests.yml`)

- Reusable workflow that runs `npm test`
- Used by other workflows to ensure code quality

**2. Continuous Deployment** (`eas_check_fingerprint_create_build.yml`)

- **Triggers**: Push to `main` branch
- **Process**:
  - Runs tests
  - Checks fingerprints for native code changes
  - Creates new builds only if fingerprints changed (via `scripts/eas-build.sh`)
  - Cleans up old EAS branches (via `scripts/eas-cleanup.sh`)
- **Builds Created**:
  - iOS development and staging builds
  - Android development and staging builds

**3. EAS Update** (`eas_update.yml`)

- **Triggers**: Push to `main` or pull request
- **Process**:
  - Runs tests
  - Creates EAS updates for JavaScript-only changes
  - Main branch → staging channel
  - PR branches → development channel

### Scripts Used

- `scripts/eas-build.sh` - Automatically checks fingerprints and creates builds when native code changes
- `scripts/eas-cleanup.sh` - Automatically Removes old EAS branches for merged PRs

## Relevant Project Dependencies

### Tanstack Query

Used to make complex queries and mutations simple to manage.

Docs - https://tanstack.com/query/latest/docs/framework/react/overview

[This blog post](https://spin.atomicobject.com/tanstack-query-reusable-patterns/) by Jared Surato describes how Tanstack Query was used on this project early on.

### React Native Reusables

Used to quickly scaffold our own component library.

Docs - https://reactnativereusables.com/docs

[This blog post](https://spin.atomicobject.com/modal-react-native-reusables/) by Jared Surato describes how RNR was used on this project early on.

### Zustand

Simple, scalable state management tool.

Docs - https://zustand.docs.pmnd.rs/getting-started/introduction

## Testing

See [TESTING.md](./TESTING.md) for testing practices, guidelines, and troubleshooting.
