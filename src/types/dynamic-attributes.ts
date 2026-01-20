/**
 * Dynamic attribute-related types for Bsale API
 * Documentation: https://docs.bsale.dev/atributos-dinamicos
 */

import type {
  ResourceRef,
  BsaleBoolean,
  ActiveState,
  PaginationParams,
  FieldParams,
} from './common'

/**
 * Dynamic attribute entity
 */
export interface BsaleDynamicAttribute {
  href: string
  id: number
  /** Attribute name */
  name: string
  /** Tooltip text */
  tip: string
  /** Attribute type */
  type: number
  /** Is mandatory: 0=no, 1=yes */
  isMandatory: BsaleBoolean
  /** State: 0=active, 1=inactive */
  state: ActiveState
  /** Related payment type */
  payment_type?: ResourceRef
  /** Related document type */
  document_type?: ResourceRef
  /** Attribute details */
  details?: ResourceRef
}

/**
 * Dynamic attribute detail
 */
export interface BsaleDynamicAttributeDetail {
  href: string
  id: number
  value: string
}

/**
 * Query parameters for listing dynamic attributes
 */
export interface ListDynamicAttributesParams extends PaginationParams, FieldParams {
  /** Filter by name */
  name?: string
  /** Filter by type */
  type?: number
  /** Filter by state */
  state?: ActiveState
  /** Filter by payment type ID */
  paymenttypeid?: number
  /** Filter by document type ID */
  documenttypeid?: number
}
