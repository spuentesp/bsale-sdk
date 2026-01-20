/**
 * Error classes for Bsale SDK
 */

import type { BsaleErrorResponse } from './types'

/**
 * Base error for all Bsale SDK errors
 */
export class BsaleError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'BsaleError'
    Object.setPrototypeOf(this, BsaleError.prototype)
  }
}

/**
 * Authentication error (401, token expired, etc.)
 */
export class BsaleAuthenticationError extends BsaleError {
  constructor(message: string = 'Authentication failed') {
    super(message)
    this.name = 'BsaleAuthenticationError'
    Object.setPrototypeOf(this, BsaleAuthenticationError.prototype)
  }
}

/**
 * Authorization error (403, insufficient permissions)
 */
export class BsaleAuthorizationError extends BsaleError {
  constructor(message: string = 'Insufficient permissions') {
    super(message)
    this.name = 'BsaleAuthorizationError'
    Object.setPrototypeOf(this, BsaleAuthorizationError.prototype)
  }
}

/**
 * Resource not found (404)
 */
export class BsaleNotFoundError extends BsaleError {
  constructor(resource: string) {
    super(`Resource not found: ${resource}`)
    this.name = 'BsaleNotFoundError'
    Object.setPrototypeOf(this, BsaleNotFoundError.prototype)
  }
}

/**
 * Validation error (400, invalid request data)
 */
export class BsaleValidationError extends BsaleError {
  public readonly errors?: Array<{ field?: string; message: string }>

  constructor(message: string, errors?: Array<{ field?: string; message: string }>) {
    super(message)
    this.name = 'BsaleValidationError'
    this.errors = errors
    Object.setPrototypeOf(this, BsaleValidationError.prototype)
  }
}

/**
 * Rate limit error (429)
 */
export class BsaleRateLimitError extends BsaleError {
  public readonly retryAfter?: number

  constructor(retryAfter?: number) {
    super(`Rate limit exceeded${retryAfter ? `. Retry after ${retryAfter}s` : ''}`)
    this.name = 'BsaleRateLimitError'
    this.retryAfter = retryAfter
    Object.setPrototypeOf(this, BsaleRateLimitError.prototype)
  }
}

/**
 * Network/connection error
 */
export class BsaleNetworkError extends BsaleError {
  public readonly originalError?: unknown

  constructor(message: string, originalError?: unknown) {
    super(message)
    this.name = 'BsaleNetworkError'
    this.originalError = originalError
    Object.setPrototypeOf(this, BsaleNetworkError.prototype)
  }
}

/**
 * API error (500, 502, 503, etc.)
 */
export class BsaleAPIError extends BsaleError {
  public readonly statusCode?: number
  public readonly response?: BsaleErrorResponse

  constructor(message: string, statusCode?: number, response?: BsaleErrorResponse) {
    super(message)
    this.name = 'BsaleAPIError'
    this.statusCode = statusCode
    this.response = response
    Object.setPrototypeOf(this, BsaleAPIError.prototype)
  }
}
