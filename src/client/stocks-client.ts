/**
 * Stocks API client
 */

import { BaseClient } from './base-client'
import type {
  BsaleStock,
  BsaleStockReception,
  BsaleStockReceptionDetail,
  BsaleStockConsumption,
  BsaleStockConsumptionDetail,
  BsaleStockConsumptionType,
  BsalePaginatedResponse,
  ListStocksParams,
  ListStockReceptionsParams,
  ListStockConsumptionsParams,
  CreateStockReceptionRequest,
  UpdateStockReceptionRequest,
  CreateStockConsumptionRequest,
} from '../types'

export class StocksClient extends BaseClient {
  /**
   * GET /v1/stocks.json
   * List all stocks with pagination
   */
  async list(params?: ListStocksParams): Promise<BsalePaginatedResponse<BsaleStock>> {
    return this.get<BsalePaginatedResponse<BsaleStock>>('/stocks.json', params)
  }

  /**
   * GET /v1/stocks/:id.json
   * Get a single stock by ID
   */
  async getById(stockId: number, expand?: string[]): Promise<BsaleStock> {
    const response = await super.get<{ stock: BsaleStock }>(
      `/stocks/${stockId}.json`,
      expand ? { expand } : undefined
    )
    return response.stock
  }

  /**
   * Helper: Get stock for a specific variant and office
   */
  async getByVariantAndOffice(variantId: number, officeId: number): Promise<BsaleStock | null> {
    const response = await this.list({
      variantid: variantId,
      officeid: officeId,
      limit: 1,
    })
    return response.items[0] || null
  }

  /**
   * Helper: Get all stocks for a variant across all offices
   */
  async getByVariant(variantId: number): Promise<BsaleStock[]> {
    const response = await this.list({ variantid: variantId, limit: 50 })
    return response.items
  }
}

export class StockReceptionsClient extends BaseClient {
  /**
   * GET /v1/stocks/receptions.json
   * List all stock receptions
   */
  async list(
    params?: ListStockReceptionsParams
  ): Promise<BsalePaginatedResponse<BsaleStockReception>> {
    return this.get<BsalePaginatedResponse<BsaleStockReception>>('/stocks/receptions.json', params)
  }

  /**
   * GET /v1/stocks/receptions/:id.json
   * Get a single reception
   */
  async getById(receptionId: number, expand?: string[]): Promise<BsaleStockReception> {
    const response = await super.get<{ reception: BsaleStockReception }>(
      `/stocks/receptions/${receptionId}.json`,
      expand ? { expand } : undefined
    )
    return response.reception
  }

  /**
   * GET /v1/stocks/receptions/:id/details.json
   * Get reception line items
   */
  async getDetails(
    receptionId: number
  ): Promise<BsalePaginatedResponse<BsaleStockReceptionDetail>> {
    return super.get<BsalePaginatedResponse<BsaleStockReceptionDetail>>(
      `/stocks/receptions/${receptionId}/details.json`
    )
  }

  /**
   * GET /v1/stocks/receptions/:id/details/:detailId.json
   * Get a single reception detail
   */
  async getDetail(receptionId: number, detailId: number): Promise<BsaleStockReceptionDetail> {
    const response = await super.get<{ detail: BsaleStockReceptionDetail }>(
      `/stocks/receptions/${receptionId}/details/${detailId}.json`
    )
    return response.detail
  }

  /**
   * POST /v1/stocks/receptions.json
   * Create a new stock reception
   */
  async create(reception: CreateStockReceptionRequest): Promise<BsaleStockReception> {
    return this.post<BsaleStockReception>('/stocks/receptions.json', reception)
  }

  /**
   * PUT /v1/stocks/receptions/:id.json
   * Update a stock reception
   */
  async update(
    receptionId: number,
    updates: UpdateStockReceptionRequest
  ): Promise<BsaleStockReception> {
    return this.put<BsaleStockReception>(`/stocks/receptions/${receptionId}.json`, {
      ...updates,
      id: receptionId,
    })
  }
}

export class StockConsumptionsClient extends BaseClient {
  /**
   * GET /v1/stocks/consumptions.json
   * List all stock consumptions
   */
  async list(
    params?: ListStockConsumptionsParams
  ): Promise<BsalePaginatedResponse<BsaleStockConsumption>> {
    return this.get<BsalePaginatedResponse<BsaleStockConsumption>>(
      '/stocks/consumptions.json',
      params
    )
  }

  /**
   * GET /v1/stocks/consumptions/:id.json
   * Get a single consumption
   */
  async getById(consumptionId: number, expand?: string[]): Promise<BsaleStockConsumption> {
    const response = await super.get<{ consumption: BsaleStockConsumption }>(
      `/stocks/consumptions/${consumptionId}.json`,
      expand ? { expand } : undefined
    )
    return response.consumption
  }

  /**
   * GET /v1/stocks/consumptions/:id/details.json
   * Get consumption line items
   */
  async getDetails(
    consumptionId: number
  ): Promise<BsalePaginatedResponse<BsaleStockConsumptionDetail>> {
    return super.get<BsalePaginatedResponse<BsaleStockConsumptionDetail>>(
      `/stocks/consumptions/${consumptionId}/details.json`
    )
  }

  /**
   * GET /v1/stocks/consumptions/:id/details/:detailId.json
   * Get a single consumption detail
   */
  async getDetail(consumptionId: number, detailId: number): Promise<BsaleStockConsumptionDetail> {
    const response = await super.get<{ detail: BsaleStockConsumptionDetail }>(
      `/stocks/consumptions/${consumptionId}/details/${detailId}.json`
    )
    return response.detail
  }

  /**
   * POST /v1/stocks/consumptions.json
   * Create a new stock consumption
   */
  async create(consumption: CreateStockConsumptionRequest): Promise<BsaleStockConsumption> {
    return this.post<BsaleStockConsumption>('/stocks/consumptions.json', consumption)
  }

  /**
   * GET /v1/stock_consumption_types.json
   * Get available consumption types
   */
  async getTypes(): Promise<BsalePaginatedResponse<BsaleStockConsumptionType>> {
    return super.get<BsalePaginatedResponse<BsaleStockConsumptionType>>(
      '/stock_consumption_types.json'
    )
  }
}
