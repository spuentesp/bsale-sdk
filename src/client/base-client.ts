/**
 * Base HTTP client for Bsale API
 */

import type { BsaleConfig, BsaleErrorResponse } from '../types'
import {
  BsaleError,
  BsaleAuthenticationError,
  BsaleAuthorizationError,
  BsaleNotFoundError,
  BsaleValidationError,
  BsaleRateLimitError,
  BsaleNetworkError,
  BsaleAPIError,
} from '../errors'
import { isExpired, buildQueryString } from '../utils'

const DEFAULT_BASE_URL = 'https://api.bsale.io/v1'
const DEFAULT_TIMEOUT = 30000

/**
 * Base client for making authenticated requests to Bsale API
 */
export class BaseClient {
  private baseUrl: string
  private credentials: BsaleConfig['credentials']
  private timeout: number

  constructor(config: BsaleConfig) {
    this.baseUrl = config.baseUrl || DEFAULT_BASE_URL
    this.credentials = config.credentials
    this.timeout = config.timeout || DEFAULT_TIMEOUT
  }

  /**
   * Update credentials (for token refresh)
   */
  public updateCredentials(credentials: BsaleConfig['credentials']): void {
    this.credentials = credentials
  }

  /**
   * Get current credentials
   */
  public getCredentials(): BsaleConfig['credentials'] {
    return { ...this.credentials }
  }

  /**
   * Make an authenticated HTTP request to Bsale API
   */
  protected async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    // Check if token is expired
    if (isExpired(this.credentials.expiresAt)) {
      throw new BsaleAuthenticationError('Access token expired. Please refresh.')
    }

    const url = `${this.baseUrl}${endpoint}`

    // Setup abort controller for timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), this.timeout)

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          access_token: this.credentials.accessToken,
          Accept: 'application/json',
          'Content-Type': 'application/json',
          ...options.headers,
        },
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      // Handle non-OK responses
      if (!response.ok) {
        await this.handleErrorResponse(response)
      }

      // Handle 204 No Content
      if (response.status === 204) {
        return undefined as T
      }

      // Parse JSON response
      return (await response.json()) as T
    } catch (error) {
      clearTimeout(timeoutId)

      // Re-throw our custom errors
      if (error instanceof BsaleError) {
        throw error
      }

      // Handle network errors
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new BsaleNetworkError(`Request timeout after ${this.timeout}ms`, error)
        }
        throw new BsaleNetworkError('Network request failed', error)
      }

      throw new BsaleError('Unknown error occurred')
    }
  }

  /**
   * Handle error responses from API
   */
  private async handleErrorResponse(response: Response): Promise<never> {
    const statusCode = response.status
    let errorData: BsaleErrorResponse | undefined

    try {
      const text = await response.text()
      if (text) {
        errorData = JSON.parse(text) as BsaleErrorResponse
      }
    } catch {
      // Could not parse error response
    }

    const errorMessage = errorData?.message || response.statusText || 'API request failed'

    switch (statusCode) {
      case 401:
        throw new BsaleAuthenticationError(errorMessage)

      case 403:
        throw new BsaleAuthorizationError(errorMessage)

      case 404:
        throw new BsaleNotFoundError(errorMessage)

      case 400:
      case 422:
        throw new BsaleValidationError(errorMessage, errorData?.errors)

      case 429: {
        const retryAfter = response.headers.get('Retry-After')
        throw new BsaleRateLimitError(retryAfter ? parseInt(retryAfter, 10) : undefined)
      }

      default:
        throw new BsaleAPIError(errorMessage, statusCode, errorData)
    }
  }

  /**
   * GET request
   */
  protected async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    const queryString = params ? buildQueryString(params) : ''
    return this.request<T>(`${endpoint}${queryString}`)
  }

  /**
   * POST request
   */
  protected async post<T>(endpoint: string, body?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    })
  }

  /**
   * PUT request
   */
  protected async put<T>(endpoint: string, body?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    })
  }

  /**
   * DELETE request
   */
  protected async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
    })
  }
}
