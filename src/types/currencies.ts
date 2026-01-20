/**
 * Currency-related types for Bsale API
 * Documentation: https://docs.bsale.dev/monedas
 */

import type { BsaleBoolean, ActiveState, PaginationParams, FieldParams } from './common'

/**
 * Currency entity
 */
export interface BsaleCurrency {
  href: string
  id: number
  /** Currency name */
  name: string
  /** Currency symbol */
  symbol: string
  /** Decimal places allowed */
  decimals: number
  /** Round totals: 0=no, 1=yes */
  totalRound: BsaleBoolean
  /** State: 0=active, 1=inactive */
  state?: ActiveState
}

/**
 * Exchange rate response
 */
export interface BsaleExchangeRate {
  /** Exchange rate value */
  exchangeRate: number
}

/**
 * Query parameters for listing currencies
 */
export interface ListCurrenciesParams extends PaginationParams, FieldParams {
  /** Filter by name */
  name?: string
  /** Filter by symbol */
  symbol?: string
  /** Filter by state */
  state?: ActiveState
  /** Filter default currency */
  default?: boolean
}

/**
 * Query parameters for currency sales
 */
export interface CurrencySalesParams {
  /** Start date (Unix timestamp, default: request date) */
  startdate?: number
  /** End date (Unix timestamp, default: request date) */
  enddate?: number
}
