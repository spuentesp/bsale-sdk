/**
 * Payments API client
 */

import { BaseClient } from './base-client'
import type {
  BsalePayment,
  BsaleGroupedPayment,
  BsalePaginatedResponse,
  ListPaymentsParams,
  ListGroupedPaymentsParams,
  CreatePaymentRequest,
} from '../types'

export class PaymentsClient extends BaseClient {
  /**
   * GET /v1/payments.json
   * List all payments with pagination
   */
  async list(params?: ListPaymentsParams): Promise<BsalePaginatedResponse<BsalePayment>> {
    return super.get<BsalePaginatedResponse<BsalePayment>>('/payments.json', params)
  }

  /**
   * GET /v1/payments/:id.json
   * Get a single payment by ID
   */
  async getPayment(paymentId: number, expand?: string[]): Promise<BsalePayment> {
    const response = await super.get<{ payment: BsalePayment }>(
      `/payments/${paymentId}.json`,
      expand ? { expand } : undefined
    )
    return response.payment
  }

  /**
   * GET /v1/payments/count.json
   * Get total payment count
   */
  async count(state?: 0 | 1): Promise<number> {
    const response = await super.get<{ count: number }>(
      '/payments/count.json',
      state !== undefined ? { state } : undefined
    )
    return response.count
  }

  /**
   * POST /v1/payments.json
   * Create a new payment
   */
  async create(payment: CreatePaymentRequest): Promise<BsalePayment> {
    return super.post<BsalePayment>('/payments.json', payment)
  }

  /**
   * GET /v1/payments/group_payment_types.json
   * Get payments grouped by payment method, office, and date
   */
  async getGrouped(
    params?: ListGroupedPaymentsParams
  ): Promise<BsalePaginatedResponse<BsaleGroupedPayment>> {
    return super.get<BsalePaginatedResponse<BsaleGroupedPayment>>(
      '/payments/group_payment_types.json',
      params
    )
  }

  /**
   * Helper: Get payments by date
   */
  async getByDate(recordDate: number): Promise<BsalePayment[]> {
    const response = await this.list({ recorddate: recordDate, limit: 50 })
    return response.items
  }

  /**
   * Helper: Get payments for a document
   */
  async getByDocument(documentId: number): Promise<BsalePayment[]> {
    const response = await this.list({ documentid: documentId, limit: 50 })
    return response.items
  }
}
