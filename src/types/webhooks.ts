/**
 * Webhook-related types for Bsale API
 * Documentation: https://docs.bsale.dev/webhooks
 */

import type { BsaleBoolean } from './common'

/**
 * Webhook topic types
 */
export type BsaleWebhookTopic =
  | 'stock'
  | 'document'
  | 'product'
  | 'variant'
  | 'price'
  | 'payment'
  | 'client'

/**
 * Webhook action types
 */
export type BsaleWebhookAction = 'post' | 'put' | 'delete'

/**
 * Webhook entity
 */
export interface BsaleWebhook {
  href: string
  id: number
  /** Webhook URL */
  url: string
  /** Webhook topic */
  topic: BsaleWebhookTopic
  /** Active status: 0=inactive, 1=active */
  active: BsaleBoolean
}

/**
 * Webhook registration request
 */
export interface BsaleWebhookRegistration {
  /** Webhook URL (required) */
  url: string
  /** Webhook topic (required) */
  topic: BsaleWebhookTopic
  /** Active status: 0=inactive, 1=active (required) */
  active: BsaleBoolean
}

/**
 * Base webhook payload structure
 */
export interface BsaleWebhookPayload {
  /** Company/instance ID */
  cpnId: number
  /** Resource endpoint */
  resource: string
  /** Resource ID */
  resourceId: string
  /** Topic */
  topic: BsaleWebhookTopic
  /** Action */
  action: BsaleWebhookAction
  /** Send timestamp (Unix) */
  send: number
}

/**
 * Document webhook payload
 */
export interface BsaleDocumentWebhookPayload extends BsaleWebhookPayload {
  topic: 'document'
  /** Office ID */
  officeId: string
}

/**
 * Product webhook payload
 */
export interface BsaleProductWebhookPayload extends BsaleWebhookPayload {
  topic: 'product'
}

/**
 * Variant webhook payload
 */
export interface BsaleVariantWebhookPayload extends BsaleWebhookPayload {
  topic: 'variant'
}

/**
 * Stock webhook payload
 */
export interface BsaleStockWebhookPayload extends BsaleWebhookPayload {
  topic: 'stock'
  action: 'put'
  /** Office ID */
  officeId: string
}

/**
 * Price webhook payload
 */
export interface BsalePriceWebhookPayload extends BsaleWebhookPayload {
  topic: 'price'
  action: 'put'
  /** Price list ID */
  priceListId: string
}

/**
 * Payment webhook payload
 */
export interface BsalePaymentWebhookPayload extends BsaleWebhookPayload {
  topic: 'payment'
  /** Office ID */
  officeId: string
}

/**
 * Instance webhook response
 */
export interface BsaleInstanceWebhook {
  /** Instance ID */
  id: string
  /** Company RUT */
  code: string
  /** Company name */
  name: string
  /** Company state */
  state: number
  /** Country */
  country: string
  /** Trial status: 1=30-day trial, 0=permanent */
  trial: 0 | 1
  /** Trial end date (Unix timestamp) */
  trialEnd?: number
}
