/**
 * Discount-related types for Bsale API
 * Documentation: https://docs.bsale.dev/descuentos
 */

import type { ActiveState, PaginationParams, FieldParams } from './common'

/**
 * Discount type
 */
export enum DiscountType {
  Percentage = 0,
  PriceList = 1,
}

/**
 * Discount entity
 */
export interface BsaleDiscount {
  href: string
  id: number
  /** Discount name */
  name: string
  /** Discount percentage */
  percentage: string
  /** State: 0=active, 1=inactive */
  state: ActiveState
  /** Automatic application: 0=manual, 1=automatic */
  automatic: 0 | 1
  /** Discount type: 0=percentage, 1=price list */
  type?: DiscountType
  /** Minimum quantity required */
  minQuantity?: number
  /** Has date restrictions: 0=no, 1=yes */
  byDate?: 0 | 1
  /** Start date (Unix timestamp) */
  startDate?: number
  /** End date (Unix timestamp) */
  endDate?: number
}

/**
 * Discount detail (product/variant association)
 */
export interface BsaleDiscountDetail {
  href: string
  id: number
  /** Related product */
  product?: {
    id: number
    name: string
  }
  /** Related variant */
  variant?: {
    id: number
    description: string
    code: string
  }
}

/**
 * Query parameters for listing discounts
 */
export interface ListDiscountsParams extends PaginationParams, FieldParams {
  /** Filter by name */
  name?: string
  /** Filter by percentage */
  percentage?: string
  /** Filter by state */
  state?: ActiveState
}

/**
 * Create discount request
 */
export interface CreateDiscountRequest {
  /** Discount name (required) */
  name: string
  /** Discount type: 0=percentage, 1=price list (required) */
  type: DiscountType
  /** State: 0=active, 1=inactive */
  state?: ActiveState
  /** Auto-apply: 0=manual, 1=automatic */
  autoDiscount?: 0 | 1
  /** Minimum quantity */
  minQuantity?: number
  /** Use date restrictions: 0=no, 1=yes */
  byDate?: 0 | 1
  /** Start date */
  startDate?: number
  /** End date */
  endDate?: number
  /** Base price list ID (for type 1) */
  basePriceListId?: number
  /** Discount price list ID (for type 1) */
  discountPriceListId?: number
  /** Percentage (for type 0) */
  percentage?: number
  /** Restricted price lists */
  restrictedPriceLists?: number[]
  /** Access profiles */
  accessProfiles?: number[]
}

/**
 * Update discount request
 */
export interface UpdateDiscountRequest {
  name?: string
  type?: DiscountType
  percentage?: number
  state?: ActiveState
  autoDiscount?: 0 | 1
  minQuantity?: number
  byDate?: 0 | 1
  startDate?: number
  endDate?: number
  accessProfiles?: number[]
}

/**
 * Add product/variant to discount request
 */
export interface AddDiscountDetailRequest {
  /** Product ID */
  productId?: number
  /** Variant ID */
  variantId?: number
}
