/**
 * Products API client
 */

import { BaseClient } from './base-client'
import type {
  BsaleProduct,
  BsaleProductType,
  BsaleProductAttribute,
  BsaleProductTax,
  BsalePaginatedResponse,
  ListProductsParams,
  ListProductTypesParams,
  CreateProductRequest,
  UpdateProductRequest,
  CreatePackRequest,
  CreateProductTypeRequest,
  UpdateProductTypeRequest,
} from '../types'

export class ProductsClient extends BaseClient {
  /**
   * GET /v1/products.json
   * List all products with pagination
   */
  async list(params?: ListProductsParams): Promise<BsalePaginatedResponse<BsaleProduct>> {
    return this.get<BsalePaginatedResponse<BsaleProduct>>('/products.json', params)
  }

  /**
   * GET /v1/products/:id.json
   * Get a single product by ID
   */
  async getById(productId: number, expand?: string[]): Promise<BsaleProduct> {
    const response = await super.get<{ product: BsaleProduct }>(
      `/products/${productId}.json`,
      expand ? { expand } : undefined
    )
    return response.product
  }

  /**
   * GET /v1/products/count.json
   * Get total product count
   */
  async count(state?: 0 | 1): Promise<number> {
    const response = await this.get<{ count: number }>(
      '/products/count.json',
      state !== undefined ? { state } : undefined
    )
    return response.count
  }

  /**
   * POST /v1/products.json
   * Create a new product
   */
  async create(product: CreateProductRequest): Promise<BsaleProduct> {
    return this.post<BsaleProduct>('/products.json', product)
  }

  /**
   * PUT /v1/products/:id.json
   * Update an existing product
   */
  async update(productId: number, updates: UpdateProductRequest): Promise<BsaleProduct> {
    return this.put<BsaleProduct>(`/products/${productId}.json`, {
      ...updates,
      id: productId,
    })
  }

  /**
   * DELETE /v1/products/:id.json
   * Soft delete a product (sets state to inactive)
   */
  async deleteProduct(productId: number): Promise<BsaleProduct> {
    return super.delete<BsaleProduct>(`/products/${productId}.json`)
  }

  /**
   * POST /v2/products/pack.json
   * Create a product pack (bundle)
   */
  async createPack(pack: CreatePackRequest): Promise<{
    code: string
    data: {
      id: number
      name: string
      classification: number
      printPackDetail: boolean
      state: number
      productTypeId: number
      brandId: number
      sku: string
      barCode: string
      packDetail: Array<{
        id: number
        productId: number
        variantId: number
        quantity: number
        state: number
        packId: number
        multipleVariant: boolean
        packInfo: Record<string, unknown>
      }>
    }
  }> {
    return this.post('/v2/products/pack.json', pack)
  }

  /**
   * GET /v1/products/:id/variants.json
   * Get all variants for a product
   */
  async getVariants(productId: number): Promise<BsalePaginatedResponse<any>> {
    return this.get(`/products/${productId}/variants.json`)
  }

  /**
   * GET /v1/products/:id/product_taxes.json
   * Get all taxes for a product
   */
  async getTaxes(productId: number): Promise<BsalePaginatedResponse<BsaleProductTax>> {
    return this.get(`/products/${productId}/product_taxes.json`)
  }

  /**
   * GET /v1/products/:productId/product_taxes/:taxId.json
   * Get a specific tax for a product
   */
  async getTax(productId: number, taxId: number): Promise<BsaleProductTax> {
    const response = await this.get<{ product_tax: BsaleProductTax }>(
      `/products/${productId}/product_taxes/${taxId}.json`
    )
    return response.product_tax
  }

  /**
   * Helper: Fetch all products with automatic pagination
   */
  async getAll(state: 0 | 1 = 0): Promise<BsaleProduct[]> {
    const products: BsaleProduct[] = []
    let offset = 0
    const limit = 50

    while (true) {
      const response = await this.list({
        limit,
        offset,
        state,
        expand: ['product_type'],
      })

      products.push(...response.items)

      if (offset + limit >= response.count) {
        break
      }

      offset += limit
    }

    return products
  }
}

export class ProductTypesClient extends BaseClient {
  /**
   * GET /v1/product_types.json
   * List all product types
   */
  async list(params?: ListProductTypesParams): Promise<BsalePaginatedResponse<BsaleProductType>> {
    return this.get<BsalePaginatedResponse<BsaleProductType>>('/product_types.json', params)
  }

  /**
   * GET /v1/product_types/:id.json
   * Get a single product type
   */
  async getById(typeId: number, expand?: string[]): Promise<BsaleProductType> {
    const response = await super.get<{ product_type: BsaleProductType }>(
      `/product_types/${typeId}.json`,
      expand ? { expand } : undefined
    )
    return response.product_type
  }

  /**
   * GET /v1/product_types/count.json
   * Get total product type count
   */
  async count(state?: 0 | 1): Promise<number> {
    const response = await this.get<{ count: number }>(
      '/product_types/count.json',
      state !== undefined ? { state } : undefined
    )
    return response.count
  }

  /**
   * POST /v1/product_types.json
   * Create a new product type
   */
  async create(productType: CreateProductTypeRequest): Promise<BsaleProductType> {
    return this.post<BsaleProductType>('/product_types.json', productType)
  }

  /**
   * PUT /v1/product_types/:id.json
   * Update a product type
   */
  async update(typeId: number, updates: UpdateProductTypeRequest): Promise<BsaleProductType> {
    return this.put<BsaleProductType>(`/product_types/${typeId}.json`, {
      ...updates,
      id: typeId,
    })
  }

  /**
   * DELETE /v1/product_types/:id.json
   * Soft delete a product type
   */
  async deleteType(typeId: number): Promise<BsaleProductType> {
    return super.delete<BsaleProductType>(`/product_types/${typeId}.json`)
  }

  /**
   * GET /v1/product_types/:id/products.json
   * Get all products of a specific type
   */
  async getProducts(typeId: number): Promise<BsalePaginatedResponse<BsaleProduct>> {
    return super.get<BsalePaginatedResponse<BsaleProduct>>(`/product_types/${typeId}/products.json`)
  }

  /**
   * GET /v1/product_types/:id/attributes.json
   * Get all attributes for a product type
   */
  async getAttributes(typeId: number): Promise<BsalePaginatedResponse<BsaleProductAttribute>> {
    return super.get<BsalePaginatedResponse<BsaleProductAttribute>>(
      `/product_types/${typeId}/attributes.json`
    )
  }

  /**
   * GET /v1/product_types/:typeId/attributes/:attrId.json
   * Get a specific attribute
   */
  async getAttribute(typeId: number, attrId: number): Promise<BsaleProductAttribute> {
    const response = await super.get<{ attribute: BsaleProductAttribute }>(
      `/product_types/${typeId}/attributes/${attrId}.json`
    )
    return response.attribute
  }
}
