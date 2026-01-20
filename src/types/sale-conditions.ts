/**
 * Sale condition-related types for Bsale API
 * Documentation: https://docs.bsale.dev/condicion-de-venta
 */

import type { ActiveState, PaginationParams, FieldParams } from './common'

/**
 * Sale condition entity (payment terms)
 */
export interface BsaleSaleCondition {
  href: string
  id: number
  /** Condition name (e.g., "30 days", "45 days") */
  name: string
  /** Time value */
  timeCondition: number
  /** Time unit */
  timeUnity: number
  /** State: 0=active, 1=inactive */
  state: ActiveState
}

/**
 * Query parameters for listing sale conditions
 */
export interface ListSaleConditionsParams extends PaginationParams, FieldParams {
  /** Filter by time condition */
  timecondition?: number
  /** Filter by time unity */
  timeunity?: number
  /** Filter by state */
  state?: ActiveState
}
