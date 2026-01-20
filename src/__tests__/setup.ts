/**
 * Test setup and utilities
 */

import type { BsaleConfig } from '../types'

/**
 * Mock credentials for testing
 */
export const mockCredentials: BsaleConfig['credentials'] = {
  accessToken: 'test-access-token',
  refreshToken: 'test-refresh-token',
  expiresAt: new Date('2099-12-31'),
}

/**
 * Mock configuration
 */
export const mockConfig: BsaleConfig = {
  credentials: mockCredentials,
  baseUrl: 'https://api.bsale.io/v1',
  timeout: 30000,
}

/**
 * Create a mock fetch response
 */
export function mockFetchResponse<T>(data: T, status: number = 200): Response {
  return {
    ok: status >= 200 && status < 300,
    status,
    statusText: status === 200 ? 'OK' : 'Error',
    json: async () => data,
    text: async () => JSON.stringify(data),
    headers: new Headers(),
  } as Response
}

/**
 * Create a mock fetch error response
 */
export function mockFetchError(status: number, message: string): Response {
  return {
    ok: false,
    status,
    statusText: 'Error',
    json: async () => ({ message }),
    text: async () => JSON.stringify({ message }),
    headers: new Headers(),
  } as Response
}

/**
 * Mock global fetch
 */
export function mockFetch(response: Response): void {
  global.fetch = async () => response
}

/**
 * Mock global fetch with custom implementation
 */
export function mockFetchWith(implementation: typeof global.fetch): void {
  global.fetch = implementation
}

/**
 * Restore original fetch
 */
const originalFetch = global.fetch
export function restoreFetch(): void {
  global.fetch = originalFetch
}
