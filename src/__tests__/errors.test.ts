/**
 * Tests for error classes
 */

import { describe, it, expect } from 'vitest'
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

describe('BsaleError', () => {
  it('should create a base error', () => {
    const error = new BsaleError('Test error')

    expect(error).toBeInstanceOf(Error)
    expect(error).toBeInstanceOf(BsaleError)
    expect(error.message).toBe('Test error')
    expect(error.name).toBe('BsaleError')
  })
})

describe('BsaleAuthenticationError', () => {
  it('should create an authentication error', () => {
    const error = new BsaleAuthenticationError('Invalid token')

    expect(error).toBeInstanceOf(BsaleError)
    expect(error).toBeInstanceOf(BsaleAuthenticationError)
    expect(error.message).toBe('Invalid token')
    expect(error.name).toBe('BsaleAuthenticationError')
  })

  it('should use default message', () => {
    const error = new BsaleAuthenticationError()

    expect(error.message).toBe('Authentication failed')
  })
})

describe('BsaleAuthorizationError', () => {
  it('should create an authorization error', () => {
    const error = new BsaleAuthorizationError('Access denied')

    expect(error).toBeInstanceOf(BsaleError)
    expect(error.message).toBe('Access denied')
    expect(error.name).toBe('BsaleAuthorizationError')
  })

  it('should use default message', () => {
    const error = new BsaleAuthorizationError()

    expect(error.message).toBe('Insufficient permissions')
  })
})

describe('BsaleNotFoundError', () => {
  it('should create a not found error', () => {
    const error = new BsaleNotFoundError('/products/999')

    expect(error).toBeInstanceOf(BsaleError)
    expect(error.message).toBe('Resource not found: /products/999')
    expect(error.name).toBe('BsaleNotFoundError')
  })
})

describe('BsaleValidationError', () => {
  it('should create a validation error with field errors', () => {
    const fieldErrors = [
      { field: 'name', message: 'Name is required' },
      { field: 'email', message: 'Invalid email format' },
    ]

    const error = new BsaleValidationError('Validation failed', fieldErrors)

    expect(error).toBeInstanceOf(BsaleError)
    expect(error.message).toBe('Validation failed')
    expect(error.name).toBe('BsaleValidationError')
    expect(error.errors).toEqual(fieldErrors)
  })

  it('should create a validation error without field errors', () => {
    const error = new BsaleValidationError('Invalid request')

    expect(error.message).toBe('Invalid request')
    expect(error.errors).toBeUndefined()
  })
})

describe('BsaleRateLimitError', () => {
  it('should create a rate limit error with retry-after', () => {
    const error = new BsaleRateLimitError(60)

    expect(error).toBeInstanceOf(BsaleError)
    expect(error.message).toContain('Rate limit exceeded')
    expect(error.message).toContain('Retry after 60s')
    expect(error.name).toBe('BsaleRateLimitError')
    expect(error.retryAfter).toBe(60)
  })

  it('should create a rate limit error without retry-after', () => {
    const error = new BsaleRateLimitError()

    expect(error.message).toBe('Rate limit exceeded')
    expect(error.retryAfter).toBeUndefined()
  })
})

describe('BsaleNetworkError', () => {
  it('should create a network error with original error', () => {
    const originalError = new Error('Connection timeout')
    const error = new BsaleNetworkError('Network failed', originalError)

    expect(error).toBeInstanceOf(BsaleError)
    expect(error.message).toBe('Network failed')
    expect(error.name).toBe('BsaleNetworkError')
    expect(error.originalError).toBe(originalError)
  })

  it('should create a network error without original error', () => {
    const error = new BsaleNetworkError('Network failed')

    expect(error.message).toBe('Network failed')
    expect(error.originalError).toBeUndefined()
  })
})

describe('BsaleAPIError', () => {
  it('should create an API error with status code and response', () => {
    const errorResponse = {
      code: 'INVALID_REQUEST',
      message: 'Invalid request data',
    }

    const error = new BsaleAPIError('API error', 500, errorResponse)

    expect(error).toBeInstanceOf(BsaleError)
    expect(error.message).toBe('API error')
    expect(error.name).toBe('BsaleAPIError')
    expect(error.statusCode).toBe(500)
    expect(error.response).toEqual(errorResponse)
  })

  it('should create an API error without status code and response', () => {
    const error = new BsaleAPIError('API error')

    expect(error.message).toBe('API error')
    expect(error.statusCode).toBeUndefined()
    expect(error.response).toBeUndefined()
  })
})
