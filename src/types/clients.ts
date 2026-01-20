/**
 * Client-related types for Bsale API
 * Documentation: https://docs.bsale.dev/clientes
 */

import type {
  ResourceRef,
  BsaleBoolean,
  ActiveState,
  PaginationParams,
  FieldParams,
} from './common'

/**
 * Client entity
 */
export interface BsaleClient {
  href: string
  id: number
  /** First name */
  firstName: string
  /** Last name */
  lastName: string
  /** RUT (tax ID) */
  code: string
  /** Phone number */
  phone: string
  /** Company name */
  company: string
  /** Email address */
  email: string
  /** Has credit: 0=no, 1=yes */
  hasCredit: BsaleBoolean
  /** Maximum credit amount */
  maxCredit: number
  /** State: 0=active, 1=inactive, 99=deleted */
  state: ActiveState | 99
  /** Business activity */
  activity: string
  /** City */
  city: string
  /** Municipality/district */
  municipality: string
  /** Company (1) or Person (0) */
  companyOrPerson: 0 | 1
  /** Accumulate points: 0=no, 1=yes */
  accumulatePoints: BsaleBoolean
  /** Loyalty points */
  points: number
  /** Send DTE XML: 0=no, 1=yes */
  sendDte: BsaleBoolean
  /** Client notes */
  note: string
  /** Facebook profile */
  facebook: string
  /** Twitter handle */
  twitter: string
  /** Related payment type */
  payment_type?: ResourceRef
  /** Related sale condition */
  sale_condition?: ResourceRef
  /** Client contacts */
  contacts?: ResourceRef
  /** Client attributes */
  attributes?: ResourceRef
  /** Client addresses */
  addresses?: ResourceRef
}

/**
 * Client contact
 */
export interface BsaleClientContact {
  href: string
  id: number
  firstName: string
  lastName: string
  phone: string
  email: string
  state: ActiveState
}

/**
 * Client address
 */
export interface BsaleClientAddress {
  href: string
  id: number
  /** Address name/label */
  addressName: string
  /** Street address */
  address: string
  /** City */
  city: string
  /** Municipality/district */
  municipality: string
  /** State: 0=active, 1=inactive */
  state: ActiveState
}

/**
 * Client attribute
 */
export interface BsaleClientAttribute {
  id: number
  name: string
  value: string
}

/**
 * Query parameters for listing clients
 */
export interface ListClientsParams extends PaginationParams, FieldParams {
  /** Filter by RUT */
  code?: string
  /** Filter by first name */
  firstname?: string
  /** Filter by last name */
  lastname?: string
  /** Filter by email */
  email?: string
  /** Filter by payment type ID */
  paymenttypeid?: number
  /** Filter by sale condition ID */
  salesconditionid?: number
  /** Filter by state */
  state?: ActiveState | 99
}

/**
 * Query parameters for listing client addresses
 */
export interface ListClientAddressesParams extends PaginationParams, FieldParams {
  /** Filter by address */
  address?: string
  /** Filter by city */
  city?: string
  /** Filter by municipality */
  municipality?: string
  /** Filter by state */
  state?: ActiveState
}

/**
 * Create client request
 */
export interface CreateClientRequest {
  /** First name (required) */
  firstName: string
  /** Last name (required) */
  lastName: string
  /** Email (required) */
  email: string
  /** RUT (required, or use isForeigner) */
  code?: string
  /** Is foreign client: 0=no, 1=yes */
  isForeigner?: BsaleBoolean
  /** Phone */
  phone?: string
  /** Company name */
  company?: string
  /** Business activity */
  activity?: string
  /** City */
  city?: string
  /** Municipality */
  municipality?: string
  /** Address */
  address?: string
  /** Has credit */
  hasCredit?: BsaleBoolean
  /** Max credit amount */
  maxCredit?: number
  /** Accumulate points */
  accumulatePoints?: BsaleBoolean
  /** Notes */
  note?: string
  /** Facebook */
  facebook?: string
  /** Twitter */
  twitter?: string
  /** Dynamic attributes */
  dynamicAttributes?: Array<{
    description: string
    dynamicAttributeId: number
  }>
}

/**
 * Update client request
 */
export interface UpdateClientRequest {
  /** First name */
  firstName?: string
  /** Last name */
  lastName?: string
  /** Email */
  email?: string
  /** RUT */
  code?: string
  /** Phone */
  phone?: string
  /** Company */
  company?: string
  /** Activity */
  activity?: string
  /** City */
  city?: string
  /** Municipality */
  municipality?: string
  /** Address */
  address?: string
  /** Has credit */
  hasCredit?: BsaleBoolean
  /** Max credit */
  maxCredit?: number
  /** Accumulate points */
  accumulatePoints?: BsaleBoolean
  /** Notes */
  note?: string
  /** Facebook */
  facebook?: string
  /** Twitter */
  twitter?: string
}

/**
 * Create client contact request
 */
export interface CreateClientContactRequest {
  /** First name (required) */
  firstName: string
  /** Last name (required) */
  lastName: string
  /** Phone (required) */
  phone: string
  /** Email (required) */
  email: string
}

/**
 * Create client address request
 */
export interface CreateClientAddressRequest {
  /** Address name (required) */
  addressName: string
  /** Street address (required) */
  address: string
  /** City (required) */
  city: string
  /** Municipality (required) */
  municipality: string
}

/**
 * Update client address request
 */
export interface UpdateClientAddressRequest {
  /** Address name */
  addressName?: string
  /** Street address */
  address?: string
  /** City */
  city?: string
  /** Municipality */
  municipality?: string
}

/**
 * Update client points request
 */
export interface UpdateClientPointsRequest {
  /** Operation type: 0=add, 1=subtract */
  type: 0 | 1
  /** Client ID */
  clientId: number
  /** Point quantity */
  points: number
  /** Transaction description */
  description: string
  /** Related order ID (optional) */
  orderId?: number
}

/**
 * Client unpaid documents response
 */
export interface BsaleClientUnpaidDocuments {
  /** Overdue debt amount */
  overdueDebt: number
  /** Upcoming debt amount */
  upcomingDebt: number
  /** Total debt */
  totalDebt: number
  /** Overdue documents */
  overdue_documents: Array<{
    id: number
    number: number
    totalAmount: number
    expirationDate: number
    documentType: string
  }>
  /** Upcoming documents */
  upcoming_documents: Array<{
    id: number
    number: number
    totalAmount: number
    expirationDate: number
    documentType: string
  }>
}
