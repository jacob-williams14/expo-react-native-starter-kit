// Store original console methods
const originalWarn = console.warn;
const originalError = console.error;

const warningsToSuppress: RegExp[] = [
  /The global process\.env\.EXPO_OS is not defined/,
  /Warning: ReactDOM.render is no longer supported in React 18/,
  // Add other warnings to suppress here if needed
];

const errorsToSuppress: RegExp[] = [
  // Add specific error patterns here if needed
];

// Override console.warn
console.warn = (...args: unknown[]) => {
  const message = args[0];
  if (typeof message === "string") {
    for (const pattern of warningsToSuppress) {
      if (pattern.test(message)) {
        return; // Suppress the warning
      }
    }
  }
  originalWarn.apply(console, args as unknown[]); // Use type assertion for apply
};

// Override console.error
console.error = (...args: unknown[]) => {
  const message = args[0];
  if (typeof message === "string") {
    // Suppress specific warnings logged via console.error
    for (const pattern of warningsToSuppress) {
      if (pattern.test(message)) {
        return; // Suppress the warning
      }
    }
    // Suppress specific errors
    for (const pattern of errorsToSuppress) {
      if (pattern.test(message)) {
        return; // Suppress the error
      }
    }
  }
  originalError.apply(console, args as unknown[]); // Use type assertion for apply
};
