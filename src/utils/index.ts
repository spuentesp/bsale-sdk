/**
 * Utility functions for Bsale SDK
 */

/**
 * Build query string from parameters object
 */
export function buildQueryString(params: Record<string, any>): string {
  const queryParams = new URLSearchParams()

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) continue

    if (Array.isArray(value)) {
      // Arrays are JSON encoded for Bsale API
      queryParams.set(key, JSON.stringify(value))
    } else if (typeof value === 'object') {
      // Objects are JSON encoded
      queryParams.set(key, JSON.stringify(value))
    } else {
      queryParams.set(key, String(value))
    }
  }

  const query = queryParams.toString()
  return query ? `?${query}` : ''
}

/**
 * Check if a date is expired
 */
export function isExpired(date: Date): boolean {
  return new Date() >= date
}

/**
 * Sleep for specified milliseconds
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Retry a function with exponential backoff
 */
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  let lastError: Error

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error as Error

      if (attempt < maxRetries - 1) {
        const delay = baseDelay * Math.pow(2, attempt)
        await sleep(delay)
      }
    }
  }

  throw lastError!
}
