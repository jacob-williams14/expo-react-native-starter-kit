// Log levels
export enum LogLevel {
  NONE = 0,
  ERROR = 1,
  WARN = 2,
  INFO = 3,
  DEBUG = 4,
}

// Determine if we're in a test environment
const isTestEnvironment =
  process.env.NODE_ENV === "test" || process.env.JEST_WORKER_ID !== undefined;

// Get log level from environment variable or use default based on environment
// In Expo/React Native, use EXPO_PUBLIC_ prefix for runtime env vars
const envLogLevel = process.env.EXPO_PUBLIC_LOG_LEVEL
  ? parseInt(process.env.EXPO_PUBLIC_LOG_LEVEL, 10)
  : null;
const defaultLogLevel = isTestEnvironment ? LogLevel.NONE : LogLevel.INFO;

/**
 * Simple logging utility that respects environment and log level
 */
export class Logger {
  private static _logLevel: LogLevel =
    envLogLevel !== null && !isNaN(envLogLevel) ? envLogLevel : defaultLogLevel;

  static get logLevel(): LogLevel {
    return Logger._logLevel;
  }

  static set logLevel(level: LogLevel) {
    Logger._logLevel = level;
  }

  static debug(message: string, ...args: unknown[]): void {
    if (Logger.logLevel >= LogLevel.DEBUG) {
      console.log(`[DEBUG] ${message}`, ...args);
    }
  }

  static info(message: string, ...args: unknown[]): void {
    if (Logger.logLevel >= LogLevel.INFO) {
      console.log(`[INFO] ${message}`, ...args);
    }
  }

  static warn(message: string, ...args: unknown[]): void {
    if (Logger.logLevel >= LogLevel.WARN) {
      console.warn(`[WARN] ${message}`, ...args);
    }
  }

  static error(message: string, ...args: unknown[]): void {
    if (Logger.logLevel >= LogLevel.ERROR) {
      console.error(`[ERROR] ${message}`, ...args);
    }
  }
}
