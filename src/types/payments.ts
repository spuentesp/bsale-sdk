/**
 * Payment-related types for Bsale API
 * Documentation: https://docs.bsale.dev/pagos
 */

import type {
  ResourceRef,
  BsaleBoolean,
  ActiveState,
  PaginationParams,
  FieldParams,
} from './common'

/**
 * Payment entity
 */
export interface BsalePayment {
  href: string
  id: number
  /** Payment execution date (Unix timestamp) */
  recordDate: number
  /** Payment amount */
  amount: number
  /** Operation reference number */
  operationNumber?: string
  /** Accounting entry date */
  accountingDate?: string
  /** Check date (Unix timestamp) */
  checkDate?: number
  /** Check number */
  checkNumber?: number
  /** Check amount */
  checkAmount?: number
  /** Check deposited: 0=no, 1=yes */
  checkTaken?: BsaleBoolean
  /** Is credit payment: 0=no, 1=yes */
  isCreditPayment?: BsaleBoolean
  /** Creation timestamp */
  createdAt: number
  /** State: 0=active, 1=inactive */
  state: ActiveState
  /** Payment method */
  payment_type: ResourceRef
  /** Associated document */
  document?: ResourceRef
  /** Multiple documents (credit payments only) */
  documents?: ResourceRef[]
  /** Office where payment occurred */
  office: ResourceRef
  /** User who recorded payment */
  user: ResourceRef
}

/**
 * Grouped payment by method
 */
export interface BsaleGroupedPayment {
  /** Payment record date */
  recordDate: number
  /** Total amount by payment type */
  paymentTypeTotalAmount: number
  /** Payment type ID */
  paymentTypeId: number
  /** Payment type name */
  paymentTypeName: string
  /** Is check payment */
  isCheck: BsaleBoolean
  /** Is credit note */
  isCreditNote: BsaleBoolean
  /** Is client credit */
  isClientCredit: BsaleBoolean
  /** Is cash payment */
  isCash: BsaleBoolean
  /** Payment details */
  details: ResourceRef
}

/**
 * Query parameters for listing payments
 */
export interface ListPaymentsParams extends PaginationParams, FieldParams {
  /** Filter by payment date */
  recorddate?: number
  /** Filter by document ID */
  documentid?: number
  /** Filter by document number */
  number?: number
  /** Filter by state */
  state?: ActiveState
}

/**
 * Query parameters for grouped payments
 */
export interface ListGroupedPaymentsParams extends PaginationParams, FieldParams {
  /** Filter by record date */
  recorddate?: number
  /** Filter by SII code */
  codesii?: string
  /** Filter by document ID */
  documentid?: number
  /** Filter by office ID */
  officeid?: number
  /** Filter by payment type ID */
  paymenttypeid?: number
}

/**
 * Create payment request
 */
export interface CreatePaymentRequest {
  /** Payment record date (Unix timestamp, required) */
  recordDate: number
  /** Payment amount (required) */
  amount: number
  /** Document ID (required) */
  documentId: number
  /** Payment type ID (required) */
  paymentTypeId: number
  /** Dynamic attributes */
  dynamicAttributes?: Array<{
    description: string
    dynamicAttributeId: number
  }>
}
