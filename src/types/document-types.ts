/**
 * Document type-related types for Bsale API
 * Documentation: https://docs.bsale.dev/tipos-de-documentos
 */

import type {
  ResourceRef,
  BsaleBoolean,
  ActiveState,
  PaginationParams,
  FieldParams,
} from './common'
import type { DocumentUse } from './documents'

/**
 * Document type entity
 */
export interface BsaleDocumentType {
  href: string
  id: number
  /** Document type name */
  name: string
  /** Initial folio number */
  initialNumber: number
  /** SII tax code */
  codeSii: string
  /** Electronic document: 0=physical, 1=electronic */
  isElectronicDocument: BsaleBoolean
  /** Tax breakdown enabled: 0=no, 1=yes */
  breakdownTax: BsaleBoolean
  /** Document use: 0=sale, 1=return, 2=dispatch, 3=settlement */
  use: DocumentUse
  /** Is sales note: 0=no, 1=yes */
  isSalesNote: BsaleBoolean
  /** Is tax exempt: 0=no, 1=yes */
  isExempt: BsaleBoolean
  /** Restricts tax: 0=no, 1=yes */
  restrictsTax: BsaleBoolean
  /** Client data required: 0=no, 1=yes */
  useClient: BsaleBoolean
  /** Thermal printer compatible: 0=no, 1=yes */
  thermalPrinter: BsaleBoolean
  /** State: 0=active, 1=inactive */
  state: ActiveState
  /** Number of copies to print */
  copyNumber: number
  /** Is credit note: 0=no, 1=yes */
  isCreditNote: BsaleBoolean
  /** Continuous print format: 0=no, 1=yes */
  continuedHigh: BsaleBoolean
  /** Ledger account */
  ledgerAccount: string
  /** iPad printing enabled: 0=no, 1=yes */
  ipadPrint: BsaleBoolean
  /** Related book type */
  book_type?: ResourceRef
}

/**
 * CAF (Folio Assignment Code) for electronic documents
 */
export interface BsaleCAF {
  /** Start date (Unix timestamp) */
  startDate: number
  /** Expiration date (Unix timestamp) */
  expirationDate: number
  /** Starting folio number */
  startNumber: number
  /** Ending folio number */
  endNumber: number
  /** Last folio number used */
  lastNumberUsed: number
  /** Number of folios available */
  numbersAvailable: number
  /** Is expired: true/false */
  expired: boolean
}

/**
 * Available folio numbers response
 */
export interface BsaleAvailableFolios {
  /** Number of available folios */
  numbers_available: number
  /** Last folio number */
  last: number
}

/**
 * Query parameters for listing document types
 */
export interface ListDocumentTypesParams extends PaginationParams, FieldParams {
  /** Filter by name */
  name?: string
  /** Filter by SII code */
  codesii?: string
  /** Filter by ledger account */
  ledgeraccount?: string
  /** Filter by book type ID */
  booktypeid?: number
  /** Filter electronic documents */
  iselectronicdocument?: BsaleBoolean
  /** Filter sales notes */
  issalesnote?: BsaleBoolean
  /** Filter by state */
  state?: ActiveState
}

/**
 * Query parameters for getting CAF
 */
export interface GetCAFParams {
  /** SII code */
  codesii?: string
  /** Document type ID */
  documenttypeid?: number
  /** Desired next folio number */
  nextnumber?: number
}

/**
 * Query parameters for available folios
 */
export interface GetAvailableFoliosParams {
  /** SII code */
  codesii?: string
  /** Document type ID */
  documenttypeid?: number
}

/**
 * Update document type request
 */
export interface UpdateDocumentTypeRequest {
  /** Document name */
  name?: string
  /** State */
  state?: ActiveState
  /** Client data required */
  useClient?: BsaleBoolean
}
