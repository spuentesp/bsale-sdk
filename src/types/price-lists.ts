/**
 * Price list-related types for Bsale API
 * Documentation: https://docs.bsale.dev/listas-de-precio
 */

import type { ResourceRef, ActiveState, PaginationParams, FieldParams } from './common'

/**
 * Price list entity
 */
export interface BsalePriceList {
  href: string
  id: number
  /** Price list name */
  name: string
  /** Description */
  description: string
  /** State: 0=active, 1=inactive */
  state: ActiveState
  /** Currency ID */
  coinId: number
  /** Related currency */
  coin?: ResourceRef
  /** Price list details */
  details: ResourceRef
}

/**
 * Price list detail (variant pricing)
 */
export interface BsalePriceListDetail {
  href: string
  id: number
  /** Related variant */
  variant: ResourceRef
  /** Variant value node */
  variantValue: {
    href: string
    id: number
    /** Net unit price */
    netUnitValue: number
  }
}

/**
 * Price list detail with pricing (from API response)
 */
export interface BsalePriceListDetailFull {
  href: string
  id: number
  /** Net unit price */
  variantValue: number
  /** Gross price (with taxes) */
  variantValueWithTaxes: number
  /** Related variant */
  variant: ResourceRef
}

/**
 * Query parameters for listing price lists
 */
export interface ListPriceListsParams extends PaginationParams, FieldParams {
  /** Filter by name */
  name?: string
  /** Filter by currency ID */
  coinid?: number
  /** Filter by state */
  state?: ActiveState
}

/**
 * Query parameters for listing price list details
 */
export interface ListPriceListDetailsParams extends PaginationParams, FieldParams {
  /** Filter by variant ID */
  variantid?: number
  /** Filter by SKU code */
  code?: string
  /** Filter by barcode */
  barcode?: string
}

/**
 * Update price list detail request
 */
export interface UpdatePriceListDetailRequest {
  /** Detail ID (required) */
  id: number
  /** New net unit value (required) */
  variantValue: number
}
