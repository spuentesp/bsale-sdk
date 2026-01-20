/**
 * Variant-related types for Bsale API
 * Documentation: https://docs.bsale.dev/variantes
 */

import type {
  ResourceRef,
  BsaleBoolean,
  ActiveState,
  PaginationParams,
  FieldParams,
} from './common'

/**
 * Product variant (SKU) entity
 */
export interface BsaleVariant {
  href: string
  id: number
  /** Variant description/name */
  description: string
  /** Unlimited stock: 0=limited, 1=unlimited */
  unlimitedStock: BsaleBoolean
  /** Allow negative stock: 0=no, 1=yes */
  allowNegativeStock: BsaleBoolean
  /** State: 0=active, 1=inactive */
  state: ActiveState
  /** Barcode */
  barCode: string
  /** SKU code */
  code: string
  /** Requires serial number tracking: 0=no, 1=yes */
  serialNumber: BsaleBoolean
  /** Imagestion (accounting) fields */
  imagestionCenterCost?: number
  imagestionAccount?: number
  imagestionConceptCod?: number
  imagestionProyectCod?: number
  imagestionCategoryCod?: number
  imagestionProductId?: number
  imagestionUnitCod?: number
  /** PrestaShop legacy IDs */
  prestashopCombinationId?: number
  prestashopValueId?: number
  /** Related product */
  product: ResourceRef
  /** Attribute values */
  attribute_values?: ResourceRef | BsaleAttributeValue[]
  /** Variant stocks (if expanded) */
  variant_stocks?: BsaleVariantStock[]
  /** Cost information */
  costs?: ResourceRef
}

/**
 * Attribute value for variant
 */
export interface BsaleAttributeValue {
  href: string
  id: number
  description: string
  attribute: {
    href: string
    id: number
    name: string
  }
}

/**
 * Variant stock information (embedded in variant)
 */
export interface BsaleVariantStock {
  href: string
  variantId: number
  officeId: number
  quantityAvailable: number
  quantityReserved: number
  quantityUnAvailable: number
  office: ResourceRef
}

/**
 * Variant cost information
 */
export interface BsaleVariantCost {
  /** Average cost */
  averageCost: number
  /** FIFO cost history */
  history: Array<{
    reception_detail: ResourceRef
    admissionDate: number
    cost: number
    availableFifo: number
  }>
}

/**
 * Query parameters for listing variants
 */
export interface ListVariantsParams extends PaginationParams, FieldParams {
  /** Filter by description */
  description?: string
  /** Filter by barcode */
  barcode?: string
  /** Filter by SKU code */
  code?: string
  /** Filter by product ID */
  productid?: number
  /** Filter by state */
  state?: ActiveState
}

/**
 * Create variant request
 */
export interface CreateVariantRequest {
  /** Product ID (required) */
  productId: number
  /** Variant description (required) */
  description: string
  /** Unlimited stock */
  unlimitedStock?: BsaleBoolean
  /** Allow negative stock */
  allowNegativeStock?: BsaleBoolean
  /** Barcode */
  barCode?: string
  /** SKU code */
  code?: string
  /** Attribute values */
  attribute_values?: Array<{
    description: string
    attributeId: number
  }>
}

/**
 * Update variant request
 */
export interface UpdateVariantRequest {
  /** Variant ID (required) */
  id: number
  /** Description */
  description?: string
  /** Unlimited stock */
  unlimitedStock?: BsaleBoolean
  /** Allow negative stock */
  allowNegativeStock?: BsaleBoolean
  /** Barcode */
  barCode?: string
  /** SKU code */
  code?: string
  /** Attribute values */
  attribute_values?: Array<{
    description: string
    attributeId: number
  }>
}
