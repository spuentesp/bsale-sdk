/**
 * Payment method-related types for Bsale API
 * Documentation: https://docs.bsale.dev/formas-de-pago
 */

import type {
  ResourceRef,
  BsaleBoolean,
  ActiveState,
  PaginationParams,
  FieldParams,
} from './common'

/**
 * Payment method entity
 */
export interface BsalePaymentMethod {
  href: string
  id: number
  /** Payment method name */
  name: string
  /** Is cash: 0=no, 1=yes */
  isCash: BsaleBoolean
  /** Is check: 0=no, 1=yes */
  isCheck: BsaleBoolean
  /** Maximum checks allowed */
  maxCheck?: number
  /** Is credit note: 0=no, 1=yes */
  isCreditNote: BsaleBoolean
  /** Is client credit: 0=no, 1=yes */
  isClientCredit: BsaleBoolean
  /** Is credit memo/debit: 0=no, 1=yes */
  isCreditMemo: BsaleBoolean
  /** Web-compatible: 0=no, 1=yes */
  isVirtual: BsaleBoolean
  /** State: 0=active, 1=inactive */
  state: ActiveState
  /** Accounting ledger code */
  ledgerAccount: string
  /** Bank agreement: 0=no, 1=yes */
  isAgreementBank: BsaleBoolean
  /** Bank agreement identifier */
  agreementCode?: string
  /** Dynamic attributes */
  dynamic_attributes?: ResourceRef
}

/**
 * Query parameters for listing payment methods
 */
export interface ListPaymentMethodsParams extends PaginationParams, FieldParams {
  /** Filter by name */
  name?: string
  /** Filter by ledger account */
  ledgeraccount?: string
  /** Filter by state */
  state?: ActiveState
}

/**
 * Create payment method request
 */
export interface CreatePaymentMethodRequest {
  /** Payment method name (required) */
  name: string
  /** Is check */
  isCheck?: BsaleBoolean
  /** Max checks (required if isCheck=1) */
  maxCheck?: number
  /** Ledger account */
  ledgerAccount?: string
  /** Ledger code */
  ledgerCode?: string
}
