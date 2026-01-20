/**
 * Document-related types for Bsale API (Invoices, Receipts, etc.)
 * Documentation: https://docs.bsale.dev/documentos
 */

import type {
  ResourceRef,
  BsaleBoolean,
  ActiveState,
  PaginationParams,
  FieldParams,
} from './common'

/**
 * Document use type
 */
export enum DocumentUse {
  Sale = 0,
  Return = 1,
  Dispatch = 2,
  Settlement = 3,
}

/**
 * SII (Tax Authority) status
 */
export enum SIIStatus {
  Correct = 0,
  Submitted = 1,
  Rejected = 2,
}

/**
 * Document entity (Invoice, Receipt, etc.)
 */
export interface BsaleDocument {
  href: string
  id: number
  /** Document number/folio */
  number: number
  /** Issue date (Unix timestamp, no timezone) */
  emissionDate: number
  /** Expiration date (Unix timestamp) */
  expirationDate: number
  /** Creation timestamp */
  generationDate: number
  /** State: 0=active, 1=inactive */
  state: ActiveState
  /** Unique document token for public access */
  token: string

  /** Amount fields */
  netAmount: number
  taxAmount: number
  totalAmount: number
  exemptAmount: number

  /** Commission fields (for settlements) */
  commissionRate?: number
  commissionNetAmount?: number
  commissionTaxAmount?: number
  commissionTotalAmount?: number

  /** Export fields */
  exportNetAmount?: number
  exportTaxAmount?: number
  exportTotalAmount?: number
  exportExemptAmount?: number

  /** Purchase fields (for purchase invoices) */
  percentageTaxWithheld?: number
  purchaseTaxAmount?: number
  purchaseTotalAmount?: number

  /** Electronic document fields */
  /** Electronic signature (DTE) */
  ted?: string
  /** Digital stamp URL */
  urlTimbre?: string
  /** XML backup URL */
  urlXml?: string
  /** RCOF submission date */
  rcofDate?: number
  /** SII status: 0=correct, 1=sent, 2=rejected */
  informedSii?: SIIStatus
  /** SII response message */
  responseMsgSii?: string

  /** Document URLs */
  /** Public view (all copies) */
  urlPublicView?: string
  /** PDF download (all copies) */
  urlPdf?: string
  /** Public view (original only) */
  urlPublicViewOriginal?: string
  /** PDF download (original only) */
  urlPdfOriginal?: string

  /** Location fields */
  address?: string
  municipality?: string
  city?: string

  /** User who created document */
  userId?: number

  /** External reference ID (prevents duplicates) */
  salesId?: string

  /** Related entities */
  document_type: ResourceRef
  client?: ResourceRef
  office: ResourceRef
  user?: ResourceRef
  references?: ResourceRef
  document_taxes?: ResourceRef
  details: ResourceRef
  sellers?: ResourceRef
  payments?: ResourceRef
  attributes?: ResourceRef
}

/**
 * Document detail (line item)
 */
export interface BsaleDocumentDetail {
  href: string
  id: number
  /** Line item description */
  comment: string
  /** Quantity sold */
  quantity: number
  /** Net unit price */
  netUnitValue: number
  /** Total net value */
  netAmount: number
  /** Total tax value */
  taxAmount: number
  /** Total amount */
  totalAmount: number
  /** Discount percentage */
  discount: number
  /** Related variant */
  variant?: ResourceRef
  /** Related document */
  document: ResourceRef
  /** Associated taxes */
  taxes?: ResourceRef
}

/**
 * Document reference (for credit notes, etc.)
 */
export interface BsaleDocumentReference {
  href: string
  id: number
  /** Reference document number */
  number: string
  /** Reference date (Unix timestamp) */
  referenceDate: number
  /** Reference reason/description */
  reason: string
  /** SII code */
  codeSii: string
  /** Related document */
  document: ResourceRef
}

/**
 * Document tax breakdown
 */
export interface BsaleDocumentTax {
  href: string
  id: number
  /** Tax amount */
  amount: number
  /** Related tax */
  tax: ResourceRef
  /** Related document */
  document: ResourceRef
}

/**
 * Document seller
 */
export interface BsaleDocumentSeller {
  href: string
  id: number
  /** Commission percentage */
  commissionRate: number
  /** Related user/seller */
  user: ResourceRef
  /** Related document */
  document: ResourceRef
}

/**
 * Document summary response
 */
export interface BsaleDocumentSummary {
  /** Summaries by month/office/type */
  summaries: Array<{
    month: string
    officeId: number
    officeName: string
    documentTypeId: number
    documentTypeName: string
    netAmount: number
    exemptAmount: number
    taxAmount: number
    totalAmount: number
    count: number
    /** Detail ledger breakdown */
    detailLedgerAccounts: Array<{
      ledgerAccount: string
      amount: number
    }>
  }>
}

/**
 * Ticket summary (electronic receipts)
 */
export interface BsaleTicketSummary {
  /** Summaries by SII code */
  summaries: Array<{
    codeSii: string
    netAmount: number
    exemptAmount: number
    taxAmount: number
    count: number
  }>
}

/**
 * Query parameters for listing documents
 */
export interface ListDocumentsParams extends PaginationParams, FieldParams {
  /** Filter by issue date */
  emissiondate?: number
  /** Filter by expiration date */
  expirationdate?: number
  /** Filter by issue date range [start,end] */
  emissiondaterange?: [number, number]
  /** Filter by generation date range */
  generationdaterange?: [number, number]
  /** Filter by RCOF date */
  rcofdate?: number
  /** Filter by RCOF date range */
  rcofdaterange?: [number, number]
  /** Filter by document number */
  number?: number
  /** Filter by token */
  token?: string
  /** Filter by document type ID */
  documenttypeid?: number
  /** Filter by SII code (single or comma-separated) */
  codesii?: string
  /** Filter by client ID */
  clientid?: number
  /** Filter by client RUT */
  clientcode?: string
  /** Filter by office ID */
  officeid?: number
  /** Filter by sale condition ID */
  saleconditionid?: number
  /** Filter by state */
  state?: ActiveState
  /** Filter by SII status */
  informedsii?: SIIStatus
  /** Filter by reference code */
  referencecode?: string
  /** Filter by reference number */
  referencenumber?: string
  /** Filter by total amount */
  totalamount?: number
  /** Filter by detail ID */
  detailid?: number
}

/**
 * Client information for document creation
 */
export interface DocumentClient {
  /** Client RUT */
  code: string
  /** Company name */
  company?: string
  /** Company (1) or Person (0) */
  companyOrPerson: 0 | 1
  /** First name (for persons) */
  firstName?: string
  /** Last name (for persons) */
  lastName?: string
  /** Address */
  address?: string
  /** Municipality/district */
  municipality?: string
  /** City */
  city?: string
  /** Business activity */
  activity?: string
  /** Email */
  email?: string
}

/**
 * Document detail for creation
 */
export interface CreateDocumentDetail {
  /** Variant ID (or use code/barCode) */
  variantId?: number
  /** SKU code */
  code?: string
  /** Barcode */
  barCode?: string
  /** Net unit price (required) */
  netUnitValue: number
  /** Quantity (required) */
  quantity: number
  /** Tax IDs array: "[1,2]" (required) */
  taxId: string
  /** Product description (required) */
  comment: string
  /** Discount percentage (0-100) */
  discount?: number
  /** Reference to existing document detail */
  detailId?: number
}

/**
 * Tax configuration for document detail
 */
export interface DocumentTax {
  /** SII tax code */
  code: number
  /** Tax percentage */
  percentage: number
}

/**
 * Payment for document
 */
export interface DocumentPayment {
  /** Payment type ID */
  paymentTypeId: number
  /** Payment amount */
  amount: number
  /** Payment record date (Unix timestamp) */
  recordDate: number
}

/**
 * Document reference for creation
 */
export interface DocumentReferenceInput {
  /** Reference document number */
  number: string
  /** Reference date (Unix timestamp) */
  referenceDate: number
  /** Reference reason */
  reason: string
  /** SII reference code */
  codeSii: number
}

/**
 * Customs data for export invoices
 */
export interface CustomsData {
  /** Clause code (e.g., "CIF", "FOB") */
  clauseCode: string
  /** Clause amount */
  clauseAmount: number
  /** Sale mode ID */
  saleModeId: number
  /** Country code */
  countryCode: string
  /** Transport path ID */
  transportPathId: number
  /** Total packages */
  totalPackages: number
}

/**
 * Dynamic attribute for document
 */
export interface DocumentDynamicAttribute {
  /** Dynamic attribute ID */
  dynamicAttributeId: number
  /** Attribute value */
  description: string
}

/**
 * Create document request
 */
export interface CreateDocumentRequest {
  /** Document type ID (required, or use codeSii) */
  documentTypeId?: number
  /** SII code (alternative to documentTypeId) */
  codeSii?: number
  /** Office ID (optional, defaults to system default) */
  officeId?: number
  /** Price list ID (optional, defaults to office default) */
  priceListId?: number
  /** Issue date (Unix timestamp, required) */
  emissionDate: number
  /** Expiration date (Unix timestamp, required) */
  expirationDate: number
  /** Report to SII: 1=yes, 0=no (required) */
  declareSii: 0 | 1

  /** Client (create inline or use existing) */
  client?: DocumentClient
  /** Existing client ID */
  clientId?: number
  /** Client address ID */
  addressId?: number
  /** Send email to client: 1=yes, 0=no */
  sendEmail?: BsaleBoolean

  /** Document line items (required) */
  details: CreateDocumentDetail[]

  /** Payments */
  payments?: DocumentPayment[]

  /** Document references */
  references?: DocumentReferenceInput[]

  /** Seller ID */
  sellerId?: number

  /** Dispatch flag (reduce stock): 1=yes, 0=no */
  dispatch?: BsaleBoolean

  /** Commission rate (for settlements) */
  commissionRate?: number
  /** Commission SII code */
  commissionCodeSii?: number

  /** Tax withholding percentage (purchase invoices) */
  percentageTaxWithheld?: number

  /** Export invoice fields */
  coinId?: number
  exchangeRate?: number
  exportNetAmount?: number
  exportTaxAmount?: number
  exportTotalAmount?: number
  exportExemptAmount?: number
  hasCustomsData?: BsaleBoolean
  customsData?: CustomsData

  /** Subscription renewal */
  renovationId?: number
  renovationDate?: number

  /** External reference ID (prevents duplicates) */
  salesId?: string

  /** Dynamic attributes */
  dynamicAttributes?: DocumentDynamicAttribute[]
}
