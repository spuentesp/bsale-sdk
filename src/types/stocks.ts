/**
 * Stock-related types for Bsale API
 * Documentation: https://docs.bsale.dev/stocks
 */

import type { ResourceRef, PaginationParams, FieldParams } from './common'

/**
 * Stock entity
 */
export interface BsaleStock {
  href: string
  id: number
  /** Physical stock quantity */
  quantity: number
  /** Stock reserved in drafts/pending shipments */
  quantityReserved: number
  /** Available quantity for sale */
  quantityAvailable: number
  /** Related variant */
  variant: ResourceRef
  /** Related office/branch */
  office: ResourceRef
}

/**
 * Stock reception (inbound) entity
 */
export interface BsaleStockReception {
  href: string
  id: number
  /** Admission/reception date (Unix timestamp) */
  admissionDate: number
  /** Document type: Guía, Factura, Otro */
  document: string
  /** Document number */
  documentNumber: string
  /** Reception notes */
  note?: string
  /** Related office */
  office: ResourceRef
  /** Reception details */
  details?: ResourceRef
}

/**
 * Stock reception detail (line item)
 */
export interface BsaleStockReceptionDetail {
  href: string
  id: number
  /** Quantity received */
  quantity: number
  /** Unit cost */
  cost: number
  /** Serial number (if tracked) */
  serialNumber?: string
  /** Related variant */
  variant: ResourceRef
  /** Related reception */
  reception: ResourceRef
}

/**
 * Stock consumption (outbound) entity
 */
export interface BsaleStockConsumption {
  href: string
  id: number
  /** Consumption date (Unix timestamp) */
  consumptionDate: number
  /** Consumption notes */
  note?: string
  /** Related office */
  office: ResourceRef
  /** Consumption type */
  consumption_type?: ResourceRef
  /** Consumption details */
  details?: ResourceRef
}

/**
 * Stock consumption detail (line item)
 */
export interface BsaleStockConsumptionDetail {
  href: string
  id: number
  /** Quantity consumed */
  quantity: number
  /** Serial number (if tracked) */
  serialNumber?: string
  /** Related variant */
  variant: ResourceRef
  /** Related consumption */
  consumption: ResourceRef
}

/**
 * Stock consumption type
 */
export interface BsaleStockConsumptionType {
  href: string
  id: number
  name: string
  /** State: 0=active, 1=inactive */
  state: 0 | 1
}

/**
 * Query parameters for listing stocks
 */
export interface ListStocksParams extends PaginationParams, FieldParams {
  /** Filter by office ID */
  officeid?: number
  /** Filter by variant ID */
  variantid?: number
  /** Filter by SKU code */
  code?: string
  /** Filter by barcode */
  barcode?: string
}

/**
 * Query parameters for listing stock receptions
 */
export interface ListStockReceptionsParams extends PaginationParams, FieldParams {
  /** Filter by admission date */
  admissiondate?: number
  /** Filter by document number */
  documentnumber?: string
  /** Filter by office ID */
  officeid?: number
}

/**
 * Query parameters for listing stock consumptions
 */
export interface ListStockConsumptionsParams extends PaginationParams, FieldParams {
  /** Filter by consumption date */
  consumptiondate?: number
  /** Filter by office ID */
  officeid?: number
}

/**
 * Create stock reception request
 */
export interface CreateStockReceptionRequest {
  /** Document type: Guía, Factura, Otro (required) */
  document: 'Guía' | 'Factura' | 'Otro'
  /** Office ID (required) */
  officeId: number
  /** Document number (required) */
  documentNumber: string
  /** Reception notes */
  note?: string
  /** Reception details (required) */
  details: Array<{
    /** Quantity received (required) */
    quantity: number
    /** Variant code/SKU (required) */
    code: number | string
    /** Unit cost (required) */
    cost: number
    /** Serial number (optional) */
    serialNumber?: string
  }>
}

/**
 * Update stock reception request
 */
export interface UpdateStockReceptionRequest {
  /** Reception ID (required) */
  id: number
  /** Document type */
  document?: 'Guía' | 'Factura' | 'Otro'
  /** Office ID */
  officeId?: number
  /** Document number */
  documentNumber?: string
  /** Notes */
  note?: string
  /** Updated details */
  details?: Array<{
    quantity: number
    code: number | string
    cost: number
    serialNumber?: string
  }>
}

/**
 * Create stock consumption request
 */
export interface CreateStockConsumptionRequest {
  /** Consumption notes */
  note: string
  /** Office ID (required) */
  officeId: number
  /** Consumption details (required) */
  details: Array<{
    /** Quantity consumed (required) */
    quantity: number
    /** Variant ID (required) */
    variantId: number
    /** Serial number (optional) */
    serialNumber?: string
  }>
}
