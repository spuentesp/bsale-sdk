/**
 * Product-related types for Bsale API
 * Documentation: https://docs.bsale.dev/productos-y-servicios
 */

import type {
  ResourceRef,
  BsaleBoolean,
  ActiveState,
  PaginationParams,
  FieldParams,
} from './common'

/**
 * Product classification
 */
export enum ProductClassification {
  Product = 0,
  Service = 1,
  Pack = 3,
}

/**
 * Product entity from Bsale API
 */
export interface BsaleProduct {
  href: string
  id: number
  name: string
  description: string
  /** Product classification: 0=product, 1=service, 3=pack */
  classification: ProductClassification
  ledgerAccount: string
  costCenter: string
  /** Allow decimal quantities: 0=no, 1=yes */
  allowDecimal: BsaleBoolean
  /** Stock control enabled: 0=no, 1=yes */
  stockControl: BsaleBoolean
  /** Print pack details in documents: 0=no, 1=yes */
  printDetailInDocuments: BsaleBoolean
  /** Print pack details: 0=no, 1=yes */
  printDetailPack: BsaleBoolean
  /** Product state: 0=active, 1=inactive */
  state: ActiveState
  prestashopProductId: number
  presashopAttributeId: number
  product_type: ResourceRef
  variants?: ResourceRef
  product_taxes?: ResourceRef
}

/**
 * Product type entity
 */
export interface BsaleProductType {
  href: string
  id: number
  name: string
  /** Can be edited: 0=no, 1=yes */
  isEditable: BsaleBoolean
  /** State: 0=active, 1=inactive */
  state: ActiveState
  imagestionCategoryId?: number
  prestashopCategoryId?: number
  attributes?: ResourceRef
}

/**
 * Product attribute definition
 */
export interface BsaleProductAttribute {
  href: string
  id: number
  name: string
  /** Is required field: 0=no, 1=yes */
  isMandatory: BsaleBoolean
  /** Generate variant names: 0=no, 1=yes */
  generateVariantName: BsaleBoolean
  /** Has predefined options: 0=no, 1=yes */
  hasOptions: BsaleBoolean
  /** Options separated by "|" */
  options?: string
  /** State: 0=active, 1=inactive */
  state: ActiveState
}

/**
 * Pack detail (for product bundles)
 */
export interface BsalePackDetail {
  id: number
  productId: number
  variantId: number
  quantity: number
  state: ActiveState
  packId: number
  /** Support multiple variants: 0=no, 1=yes */
  multipleVariant: BsaleBoolean
  packInfo: Record<string, unknown>
}

/**
 * Query parameters for listing products
 */
export interface ListProductsParams extends PaginationParams, FieldParams {
  /** Filter by product name */
  name?: string
  /** Filter by ledger account */
  ledgeraccount?: string
  /** Filter by cost center */
  costcenter?: string
  /** Filter by product type ID */
  producttypeid?: number
  /** Filter by state */
  state?: ActiveState
  /** Filter by classification */
  classification?: ProductClassification
}

/**
 * Query parameters for listing product types
 */
export interface ListProductTypesParams extends PaginationParams, FieldParams {
  /** Filter by name */
  name?: string
  /** Filter by state */
  state?: ActiveState
}

/**
 * Create product request
 */
export interface CreateProductRequest {
  /** Product name (required) */
  name: string
  /** Product description */
  description?: string
  /** Classification: 0=product, 1=service */
  classification?: 0 | 1
  /** Stock control: 0=no, 1=yes */
  stockControl?: BsaleBoolean
  /** Product type ID (required) */
  productTypeId: number
  /** Track serial numbers: 0=no, 1=yes */
  serialNumber?: BsaleBoolean
  /** Allow duplicate series: 0=no, 1=yes */
  isLot?: BsaleBoolean
  /** Array of tax IDs */
  taxes?: number[]
}

/**
 * Update product request
 */
export interface UpdateProductRequest {
  /** Product ID (required) */
  id: number
  /** Product name */
  name?: string
  /** Product type ID */
  productTypeId?: number
  /** Allow decimal quantities */
  allowDecimal?: BsaleBoolean
  /** Description */
  description?: string
  /** Classification */
  classification?: ProductClassification
  /** Stock control */
  stockControl?: BsaleBoolean
}

/**
 * Create product pack request
 */
export interface CreatePackRequest {
  /** Product type ID (required) */
  productTypeId: number
  /** Pack base price (required) */
  basePrice: number
  /** Pack name/description (required) */
  name: string
  /** Barcode (required) */
  barCode: string
  /** SKU code (required) */
  code: string
  /** Price includes tax: 0=net, 1=gross */
  priceWithTax?: BsaleBoolean
  /** Print details in documents: 0=no, 1=yes */
  printDetailPack?: BsaleBoolean
  /** Pack items */
  packDetails: Array<{
    /** Support multiple variants: 0=no, 1=yes */
    multipleVariant: BsaleBoolean
    /** Product ID */
    productPromoId: number
    /** Quantity in pack */
    quantity: number
    /** Variant ID */
    variantPromoId: number
  }>
}

/**
 * Product tax association
 */
export interface BsaleProductTax {
  href: string
  id: string
  tax: ResourceRef
}

/**
 * Create product type request
 */
export interface CreateProductTypeRequest {
  /** Product type name (required) */
  name: string
  /** Attribute definitions */
  attributes?: Array<{
    name: string
    isMandatory: BsaleBoolean
    generateVariantName: BsaleBoolean
    hasOptions: BsaleBoolean
    options?: string
    state: ActiveState
  }>
}

/**
 * Update product type request
 */
export interface UpdateProductTypeRequest {
  /** Product type ID (required) */
  id: number
  /** Product type name */
  name?: string
  /** Updated attributes (must include id for existing) */
  attributes?: Array<{
    id?: number
    name: string
    isMandatory: BsaleBoolean
    generateVariantName: BsaleBoolean
    hasOptions: BsaleBoolean
    options?: string
    state: ActiveState
  }>
}
