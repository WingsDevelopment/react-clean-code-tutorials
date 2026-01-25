export interface SafeResult<T> {
  data: T | undefined
  error: Error | undefined
}

export async function safeCall<T>(fn: () => Promise<T>): Promise<SafeResult<T>> {
  try {
    const data = await fn()
    return { data, error: undefined }
  } catch (error) {
    return { data: undefined, error: error as Error }
  }
}
