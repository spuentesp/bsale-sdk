/**
 * User-related types for Bsale API
 * Documentation: https://docs.bsale.dev/usuarios
 */

import type { ResourceRef, ActiveState, PaginationParams, FieldParams } from './common'

/**
 * User entity
 */
export interface BsaleUser {
  href: string
  id: number
  /** First name */
  firstName: string
  /** Last name */
  lastName: string
  /** Email address */
  email: string
  /** State: 0=active, 1=inactive */
  state: ActiveState
  /** Default assigned office/branch */
  office: ResourceRef
}

/**
 * User sales summary
 */
export interface BsaleUserSalesSummary {
  /** Total sales amount */
  totalSales: number
  /** Subtotal by seller */
  sellerSubtotal: number
  /** Tax subtotal */
  taxSubtotal: number
  /** Link to detailed sales */
  sales: ResourceRef
  /** Link to returns */
  returns: ResourceRef
}

/**
 * Query parameters for listing users
 */
export interface ListUsersParams extends PaginationParams, FieldParams {
  /** Filter by first name */
  firstname?: string
  /** Filter by last name */
  lastname?: string
  /** Filter by email */
  email?: string
  /** Filter by office ID */
  officeid?: number
  /** Filter by state */
  state?: ActiveState
}

/**
 * Query parameters for user sales summary
 */
export interface UserSalesSummaryParams {
  /** User ID (required) */
  userid: number
  /** Start date (Unix timestamp, required) */
  startdate: number
  /** End date (Unix timestamp, required) */
  enddate: number
}

/**
 * Query parameters for user sales/returns
 */
export interface UserSalesParams {
  /** Start date (Unix timestamp, required) */
  startdate: number
  /** End date (Unix timestamp, required) */
  enddate: number
}
