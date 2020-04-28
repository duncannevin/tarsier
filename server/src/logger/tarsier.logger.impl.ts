export interface TarsierLoggerImpl {
  error: (message: string) => void
  warn: (message: string) => void
  debug: (message: string) => void
}
