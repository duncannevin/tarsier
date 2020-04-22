export interface InterceptorServiceImpl {
  initializeInterceptors: () => void
  pushRequestMethod: (method: () => void) => void
  pushResponseMethod: (method: () => void) => void
  pushErrorMethod: (method: () => void) => void
}
