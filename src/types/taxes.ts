/**
 * Tax-related types for Bsale API
 * Documentation: https://docs.bsale.dev/impuestos
 */

import type { BsaleBoolean, ActiveState, PaginationParams, FieldParams } from './common'

/**
 * Tax entity
 */
export interface BsaleTax {
  href: string
  id: number
  /** Tax name */
  name: string
  /** Tax percentage rate */
  percentage: number
  /** Apply to all products: 0=no, 1=yes */
  forAllProducts: BsaleBoolean
  /** Accounting ledger code */
  ledgerAccount?: string
  /** Tax code */
  code: string
  /** State: 0=active, 1=inactive */
  state: ActiveState
}

/**
 * Query parameters for listing taxes
 */
export interface ListTaxesParams extends PaginationParams, FieldParams {
  /** Filter by name */
  name?: string
  /** Filter by percentage */
  percentage?: number
  /** Filter by code */
  code?: string
  /** Filter by ledger account */
  ledgeraccount?: string
  /** Filter by state */
  state?: ActiveState
}
