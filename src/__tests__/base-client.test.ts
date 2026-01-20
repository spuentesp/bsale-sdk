/**
 * Tests for BaseClient
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { BaseClient } from '../client/base-client'
import {
  BsaleAuthenticationError,
  BsaleNotFoundError,
  BsaleValidationError,
  BsaleRateLimitError,
  BsaleNetworkError,
  BsaleAPIError,
} from '../errors'
import {
  mockConfig,
  mockCredentials,
  mockFetchResponse,
  mockFetchError,
  mockFetch,
  mockFetchWith,
  restoreFetch,
} from './setup'

// Create a test class that exposes protected methods
class TestClient extends BaseClient {
  public async testGet<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    return this.get<T>(endpoint, params)
  }

  public async testPost<T>(endpoint: string, body?: unknown): Promise<T> {
    return this.post<T>(endpoint, body)
  }

  public async testPut<T>(endpoint: string, body?: unknown): Promise<T> {
    return this.put<T>(endpoint, body)
  }

  public async testDelete<T>(endpoint: string): Promise<T> {
    return this.delete<T>(endpoint)
  }
}

describe('BaseClient', () => {
  let client: TestClient

  beforeEach(() => {
    client = new TestClient(mockConfig)
  })

  afterEach(() => {
    restoreFetch()
  })

  describe('Constructor', () => {
    it('should create a client with default base URL', () => {
      const testClient = new TestClient({
        credentials: mockCredentials,
      })
      expect(testClient).toBeInstanceOf(BaseClient)
    })

    it('should create a client with custom base URL', () => {
      const customClient = new TestClient({
        ...mockConfig,
        baseUrl: 'https://custom.api.com/v1',
      })
      expect(customClient).toBeInstanceOf(BaseClient)
    })
  })

  describe('Credentials Management', () => {
    it('should update credentials', () => {
      const newCredentials = {
        ...mockCredentials,
        accessToken: 'new-token',
      }

      client.updateCredentials(newCredentials)
      const current = client.getCredentials()

      expect(current.accessToken).toBe('new-token')
    })

    it('should throw error if token is expired', async () => {
      const expiredClient = new TestClient({
        credentials: {
          ...mockCredentials,
          expiresAt: new Date('2020-01-01'), // Expired
        },
      })

      mockFetch(mockFetchResponse({ data: 'test' }))

      await expect(expiredClient.testGet('/test')).rejects.toThrow(BsaleAuthenticationError)
    })
  })

  describe('HTTP Methods', () => {
    it('should make GET request successfully', async () => {
      const mockData = { id: 1, name: 'Test' }
      mockFetch(mockFetchResponse(mockData))

      const result = await client.testGet<typeof mockData>('/test')

      expect(result).toEqual(mockData)
    })

    it('should make GET request with query parameters', async () => {
      const mockData = { items: [] }
      let capturedUrl = ''

      mockFetchWith(async url => {
        capturedUrl = url.toString()
        return mockFetchResponse(mockData)
      })

      await client.testGet('/test', { limit: 10, offset: 0 })

      expect(capturedUrl).toContain('limit=10')
      expect(capturedUrl).toContain('offset=0')
    })

    it('should make POST request successfully', async () => {
      const requestBody = { name: 'New Item' }
      const responseData = { id: 1, ...requestBody }

      mockFetch(mockFetchResponse(responseData))

      const result = await client.testPost<typeof responseData>('/test', requestBody)

      expect(result).toEqual(responseData)
    })

    it('should make PUT request successfully', async () => {
      const updateData = { name: 'Updated' }
      const responseData = { id: 1, ...updateData }

      mockFetch(mockFetchResponse(responseData))

      const result = await client.testPut<typeof responseData>('/test/1', updateData)

      expect(result).toEqual(responseData)
    })

    it('should make DELETE request successfully', async () => {
      mockFetch(mockFetchResponse({ success: true }))

      const result = await client.testDelete<{ success: boolean }>('/test/1')

      expect(result).toEqual({ success: true })
    })

    it('should handle 204 No Content response', async () => {
      mockFetch({
        ok: true,
        status: 204,
        statusText: 'No Content',
        json: async () => {
          throw new Error('No content')
        },
        text: async () => '',
        headers: new Headers(),
      } as Response)

      const result = await client.testDelete('/test/1')

      expect(result).toBeUndefined()
    })
  })

  describe('Error Handling', () => {
    it('should throw BsaleAuthenticationError for 401', async () => {
      mockFetch(mockFetchError(401, 'Unauthorized'))

      await expect(client.testGet('/test')).rejects.toThrow(BsaleAuthenticationError)
    })

    it('should throw BsaleNotFoundError for 404', async () => {
      mockFetch(mockFetchError(404, 'Not Found'))

      await expect(client.testGet('/test')).rejects.toThrow(BsaleNotFoundError)
    })

    it('should throw BsaleValidationError for 400', async () => {
      const errorResponse = {
        message: 'Validation failed',
        errors: [{ field: 'name', message: 'Name is required' }],
      }

      mockFetch({
        ok: false,
        status: 400,
        statusText: 'Bad Request',
        json: async () => errorResponse,
        text: async () => JSON.stringify(errorResponse),
        headers: new Headers(),
      } as Response)

      try {
        await client.testPost('/test', {})
        expect(true).toBe(false) // Should not reach here
      } catch (error) {
        expect(error).toBeInstanceOf(BsaleValidationError)
        if (error instanceof BsaleValidationError) {
          expect(error.errors).toHaveLength(1)
          expect(error.errors?.[0].field).toBe('name')
        }
      }
    })

    it('should throw BsaleRateLimitError for 429', async () => {
      mockFetch({
        ok: false,
        status: 429,
        statusText: 'Too Many Requests',
        json: async () => ({ message: 'Rate limit exceeded' }),
        text: async () => JSON.stringify({ message: 'Rate limit exceeded' }),
        headers: new Headers({ 'Retry-After': '60' }),
      } as Response)

      try {
        await client.testGet('/test')
        expect(true).toBe(false) // Should not reach here
      } catch (error) {
        expect(error).toBeInstanceOf(BsaleRateLimitError)
        if (error instanceof BsaleRateLimitError) {
          expect(error.retryAfter).toBe(60)
        }
      }
    })

    it('should throw BsaleAPIError for 500', async () => {
      mockFetch(mockFetchError(500, 'Internal Server Error'))

      await expect(client.testGet('/test')).rejects.toThrow(BsaleAPIError)
    })

    it('should throw BsaleNetworkError for network failures', async () => {
      mockFetchWith(async () => {
        throw new Error('Network error')
      })

      await expect(client.testGet('/test')).rejects.toThrow(BsaleNetworkError)
    })
  })

  describe('Request Headers', () => {
    it('should include authorization header', async () => {
      let capturedHeaders: HeadersInit | undefined

      mockFetchWith(async (_url, options) => {
        capturedHeaders = options?.headers
        return mockFetchResponse({ data: 'test' })
      })

      await client.testGet('/test')

      expect(capturedHeaders).toBeDefined()
      const headers = capturedHeaders as Record<string, string>
      expect(headers['access_token']).toBe(mockCredentials.accessToken)
    })

    it('should include content-type header for POST', async () => {
      let capturedHeaders: HeadersInit | undefined

      mockFetchWith(async (_url, options) => {
        capturedHeaders = options?.headers
        return mockFetchResponse({ data: 'test' })
      })

      await client.testPost('/test', { name: 'Test' })

      const headers = capturedHeaders as Record<string, string>
      expect(headers['Content-Type']).toBe('application/json')
    })
  })
})
