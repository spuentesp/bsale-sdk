/**
 * Shipment type-related types for Bsale API
 * Documentation: https://docs.bsale.dev/tipos-de-despacho
 */

import type { BsaleBoolean, ActiveState, PaginationParams, FieldParams } from './common'

/**
 * Shipment type entity
 */
export interface BsaleShipmentType {
  href: string
  id: number
  /** Shipment type name */
  name: string
  /** SII tax code */
  codeSii: string
  /** Destination office required: 0=no, 1=yes */
  useDestinationOffice: BsaleBoolean
  /** State: 0=active, 1=inactive */
  state: ActiveState
}

/**
 * Query parameters for listing shipment types
 */
export interface ListShipmentTypesParams extends PaginationParams, FieldParams {
  /** Filter by name */
  name?: string
  /** Filter by SII code */
  codesii?: string
  /** Filter by state */
  state?: ActiveState
}
