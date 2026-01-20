/**
 * Variants API client
 */

import { BaseClient } from './base-client'
import type {
  BsaleVariant,
  BsaleVariantCost,
  BsaleAttributeValue,
  BsalePaginatedResponse,
  ListVariantsParams,
  CreateVariantRequest,
  UpdateVariantRequest,
} from '../types'

export class VariantsClient extends BaseClient {
  /**
   * GET /v1/variants.json
   * List all variants with pagination
   */
  async list(params?: ListVariantsParams): Promise<BsalePaginatedResponse<BsaleVariant>> {
    return this.get<BsalePaginatedResponse<BsaleVariant>>('/variants.json', params)
  }

  /**
   * GET /v1/variants/:id.json
   * Get a single variant by ID
   */
  async getById(variantId: number, expand?: string[]): Promise<BsaleVariant> {
    const response = await super.get<{ variant: BsaleVariant }>(
      `/variants/${variantId}.json`,
      expand ? { expand } : undefined
    )
    return response.variant
  }

  /**
   * GET /v1/variants/count.json
   * Get total variant count
   */
  async count(state?: 0 | 1): Promise<number> {
    const response = await this.get<{ count: number }>(
      '/variants/count.json',
      state !== undefined ? { state } : undefined
    )
    return response.count
  }

  /**
   * POST /v1/variants.json
   * Create a new variant
   */
  async create(variant: CreateVariantRequest): Promise<BsaleVariant> {
    return this.post<BsaleVariant>('/variants.json', variant)
  }

  /**
   * PUT /v1/variants/:id.json
   * Update an existing variant
   */
  async update(variantId: number, updates: UpdateVariantRequest): Promise<BsaleVariant> {
    return this.put<BsaleVariant>(`/variants/${variantId}.json`, {
      ...updates,
      id: variantId,
    })
  }

  /**
   * DELETE /v1/variants/:id.json
   * Soft delete a variant (sets state to inactive)
   */
  async deleteVariant(variantId: number): Promise<BsaleVariant> {
    return super.delete<BsaleVariant>(`/variants/${variantId}.json`)
  }

  /**
   * GET /v1/variants/:id/attribute_values.json
   * Get attribute values for a variant
   */
  async getAttributeValues(
    variantId: number
  ): Promise<BsalePaginatedResponse<BsaleAttributeValue>> {
    return super.get<BsalePaginatedResponse<BsaleAttributeValue>>(
      `/variants/${variantId}/attribute_values.json`
    )
  }

  /**
   * GET /v1/variants/:id/costs.json
   * Get cost information for a variant (average cost + FIFO history)
   */
  async getCosts(variantId: number): Promise<BsaleVariantCost> {
    return super.get<BsaleVariantCost>(`/variants/${variantId}/costs.json`)
  }

  /**
   * Helper: Fetch all variants with automatic pagination
   */
  async getAll(state: 0 | 1 = 0): Promise<BsaleVariant[]> {
    const variants: BsaleVariant[] = []
    let offset = 0
    const limit = 50

    while (true) {
      const response = await this.list({
        limit,
        offset,
        state,
      })

      variants.push(...response.items)

      if (offset + limit >= response.count) {
        break
      }

      offset += limit
    }

    return variants
  }

  /**
   * Helper: Find variant by SKU code
   */
  async findByCode(code: string): Promise<BsaleVariant | null> {
    const response = await this.list({ code, limit: 1 })
    return response.items[0] || null
  }

  /**
   * Helper: Find variant by barcode
   */
  async findByBarcode(barcode: string): Promise<BsaleVariant | null> {
    const response = await this.list({ barcode, limit: 1 })
    return response.items[0] || null
  }
}
