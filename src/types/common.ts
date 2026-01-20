/**
 * Common types used across the Bsale API
 */

/**
 * Standard pagination parameters
 */
export interface PaginationParams {
  /** Items per response (default: 25, max: 50) */
  limit?: number
  /** Pagination offset (default: 0) */
  offset?: number
}

/**
 * Field selection parameters
 */
export interface FieldParams {
  /** Return specific attributes only */
  fields?: string[]
  /** Include related resources in response */
  expand?: string[]
}

/**
 * Standard paginated response structure
 */
export interface BsalePaginatedResponse<T> {
  href: string
  count: number
  limit: number
  offset: number
  items: T[]
  next?: string
}

/**
 * Resource reference (common pattern for related entities)
 */
export interface ResourceRef {
  href: string
  id: string | number
}

/**
 * State values used across entities
 */
export type ActiveState = 0 | 1 // 0=active, 1=inactive
export type DeletedState = 99 // Virtual deletion
export type EntityState = ActiveState | DeletedState

/**
 * Boolean representation (Bsale uses 0/1)
 */
export type BsaleBoolean = 0 | 1

/**
 * Date range filter
 */
export interface DateRangeFilter {
  /** Start date (Unix timestamp) */
  startDate: number
  /** End date (Unix timestamp) */
  endDate: number
}

/**
 * Common error response from Bsale API
 */
export interface BsaleErrorResponse {
  code: string | number
  message: string
  errors?: Array<{
    field?: string
    message: string
  }>
}

/**
 * OAuth credentials for Bsale authentication
 */
export interface BsaleCredentials {
  accessToken: string
  refreshToken: string
  expiresAt: Date
}

/**
 * Bsale API configuration
 */
export interface BsaleConfig {
  /** API base URL (default: https://api.bsale.io/v1) */
  baseUrl?: string
  /** OAuth credentials */
  credentials: BsaleCredentials
  /** Request timeout in ms (default: 30000) */
  timeout?: number
}
