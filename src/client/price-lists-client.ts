/**
 * Price Lists API client
 */

import { BaseClient } from './base-client'
import type {
  BsalePriceList,
  BsalePriceListDetailFull,
  BsalePaginatedResponse,
  ListPriceListsParams,
  ListPriceListDetailsParams,
  UpdatePriceListDetailRequest,
} from '../types'

export class PriceListsClient extends BaseClient {
  /**
   * GET /v1/price_lists.json
   * List all price lists
   */
  async list(params?: ListPriceListsParams): Promise<BsalePaginatedResponse<BsalePriceList>> {
    return super.get<BsalePaginatedResponse<BsalePriceList>>('/price_lists.json', params)
  }

  /**
   * GET /v1/price_lists/:id.json
   * Get a single price list
   */
  async getPriceList(priceListId: number, expand?: string[]): Promise<BsalePriceList> {
    const response = await super.get<{ price_list: BsalePriceList }>(
      `/price_lists/${priceListId}.json`,
      expand ? { expand } : undefined
    )
    return response.price_list
  }

  /**
   * GET /v1/price_lists/count.json
   * Get total price list count
   */
  async count(): Promise<number> {
    const response = await super.get<{ count: number }>('/price_lists/count.json')
    return response.count
  }

  /**
   * GET /v1/price_lists/:id/details.json
   * Get price list details (variant pricing)
   */
  async getDetails(
    priceListId: number,
    params?: ListPriceListDetailsParams
  ): Promise<BsalePaginatedResponse<BsalePriceListDetailFull>> {
    return super.get(`/price_lists/${priceListId}/details.json`, params)
  }

  /**
   * GET /v1/price_lists/:id/details/:detailId.json
   * Get a single price list detail
   */
  async getDetail(priceListId: number, detailId: number): Promise<BsalePriceListDetailFull> {
    const response = await super.get<{ detail: BsalePriceListDetailFull }>(
      `/price_lists/${priceListId}/details/${detailId}.json`
    )
    return response.detail
  }

  /**
   * PUT /v1/price_lists/:id/details/:detailId.json
   * Update a price list detail (change variant price)
   */
  async updateDetail(
    priceListId: number,
    detailId: number,
    updates: UpdatePriceListDetailRequest
  ): Promise<BsalePriceListDetailFull> {
    return super.put<BsalePriceListDetailFull>(
      `/price_lists/${priceListId}/details/${detailId}.json`,
      {
        ...updates,
        id: detailId,
      }
    )
  }

  /**
   * Helper: Get price for a specific variant in a price list
   */
  async getVariantPrice(
    priceListId: number,
    variantId: number
  ): Promise<BsalePriceListDetailFull | null> {
    const response = await this.getDetails(priceListId, {
      variantid: variantId,
      limit: 1,
    })
    return response.items[0] || null
  }

  /**
   * Helper: Get all prices for a price list with automatic pagination
   */
  async getAllDetails(priceListId: number): Promise<BsalePriceListDetailFull[]> {
    const details: BsalePriceListDetailFull[] = []
    let offset = 0
    const limit = 50

    while (true) {
      const response = await this.getDetails(priceListId, { limit, offset })
      details.push(...response.items)

      if (offset + limit >= response.count) {
        break
      }

      offset += limit
    }

    return details
  }
}
