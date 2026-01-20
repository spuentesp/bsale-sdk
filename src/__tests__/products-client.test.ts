/**
 * Tests for ProductsClient
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { ProductsClient, ProductTypesClient } from '../client/products-client'
import type {
  BsaleProduct,
  BsaleProductAttribute,
  BsaleProductTax,
  BsaleProductType,
} from '../types'
import { mockConfig, mockFetchResponse, mockFetch, mockFetchWith, restoreFetch } from './setup'

describe('ProductsClient', () => {
  let client: ProductsClient

  beforeEach(() => {
    client = new ProductsClient(mockConfig)
  })

  afterEach(() => {
    restoreFetch()
  })

  describe('list()', () => {
    it('should list products with pagination', async () => {
      const mockResponse = {
        href: 'https://api.bsale.io/v1/products.json',
        count: 100,
        limit: 25,
        offset: 0,
        items: [
          {
            href: 'https://api.bsale.io/v1/products/1.json',
            id: 1,
            name: 'Product 1',
            description: 'Description 1',
            classification: 0,
            ledgerAccount: '',
            costCenter: '',
            allowDecimal: 0,
            stockControl: 1,
            printDetailInDocuments: 0,
            printDetailPack: 0,
            state: 0,
            prestashopProductId: 0,
            presashopAttributeId: 0,
            product_type: { href: '', id: 1 },
          },
        ],
      }

      mockFetch(mockFetchResponse(mockResponse))

      const result = await client.list({ limit: 25, offset: 0 })

      expect(result.count).toBe(100)
      expect(result.items).toHaveLength(1)
      expect(result.items[0].name).toBe('Product 1')
    })

    it('should handle filter parameters', async () => {
      let capturedUrl = ''

      mockFetchWith(async url => {
        capturedUrl = url.toString()
        return mockFetchResponse({ href: '', count: 0, limit: 25, offset: 0, items: [] })
      })

      await client.list({
        name: 'Test Product',
        state: 0,
        classification: 0,
      })

      expect(capturedUrl).toContain('name=Test+Product')
      expect(capturedUrl).toContain('state=0')
      expect(capturedUrl).toContain('classification=0')
    })
  })

  describe('getById()', () => {
    it('should get a single product', async () => {
      const mockProduct: BsaleProduct = {
        href: 'https://api.bsale.io/v1/products/1.json',
        id: 1,
        name: 'Product 1',
        description: 'Description 1',
        classification: 0,
        ledgerAccount: '',
        costCenter: '',
        allowDecimal: 0,
        stockControl: 1,
        printDetailInDocuments: 0,
        printDetailPack: 0,
        state: 0,
        prestashopProductId: 0,
        presashopAttributeId: 0,
        product_type: { href: '', id: '1' },
      }

      mockFetch(mockFetchResponse({ product: mockProduct }))

      const result = await client.getById(1)

      expect(result.id).toBe(1)
      expect(result.name).toBe('Product 1')
    })
  })

  describe('count()', () => {
    it('should get product count', async () => {
      mockFetch(mockFetchResponse({ count: 347 }))

      const result = await client.count()

      expect(result).toBe(347)
    })

    it('should get product count with state filter', async () => {
      let capturedUrl = ''

      mockFetchWith(async url => {
        capturedUrl = url.toString()
        return mockFetchResponse({ count: 300 })
      })

      const result = await client.count(0)

      expect(result).toBe(300)
      expect(capturedUrl).toContain('state=0')
    })
  })

  describe('create()', () => {
    it('should create a new product', async () => {
      const newProduct = {
        name: 'New Product',
        description: 'New Description',
        productTypeId: 1,
        stockControl: 1 as const,
      }

      const mockResponse: BsaleProduct = {
        href: 'https://api.bsale.io/v1/products/999.json',
        id: 999,
        name: 'New Product',
        description: 'New Description',
        classification: 0,
        ledgerAccount: '',
        costCenter: '',
        allowDecimal: 0,
        stockControl: 1,
        printDetailInDocuments: 0,
        printDetailPack: 0,
        state: 0,
        prestashopProductId: 0,
        presashopAttributeId: 0,
        product_type: { href: '', id: '1' },
      }

      mockFetch(mockFetchResponse(mockResponse))

      const result = await client.create(newProduct)

      expect(result.id).toBe(999)
      expect(result.name).toBe('New Product')
    })
  })

  describe('update()', () => {
    it('should update a product', async () => {
      const updates = {
        id: 1,
        name: 'Updated Product',
      }

      const mockResponse: BsaleProduct = {
        href: 'https://api.bsale.io/v1/products/1.json',
        id: 1,
        name: 'Updated Product',
        description: '',
        classification: 0,
        ledgerAccount: '',
        costCenter: '',
        allowDecimal: 0,
        stockControl: 1,
        printDetailInDocuments: 0,
        printDetailPack: 0,
        state: 0,
        prestashopProductId: 0,
        presashopAttributeId: 0,
        product_type: { href: '', id: '1' },
      }

      mockFetch(mockFetchResponse(mockResponse))

      const result = await client.update(1, updates)

      expect(result.name).toBe('Updated Product')
    })
  })

  describe('createPack()', () => {
    it('should create a product pack', async () => {
      const packRequest = {
        name: 'Bundle',
        productTypeId: 1,
        variants: [
          {
            variantId: 10,
            quantity: 2,
          },
        ],
      }

      const mockResponse = {
        code: '0',
        data: {
          id: 200,
          name: 'Bundle',
          classification: 0,
          printPackDetail: true,
          state: 0,
          productTypeId: 1,
          brandId: 1,
          sku: 'BUNDLE-200',
          barCode: '123456',
          packDetail: [
            {
              id: 1,
              productId: 10,
              variantId: 10,
              quantity: 2,
              state: 0,
              packId: 200,
              multipleVariant: false,
              packInfo: {},
            },
          ],
        },
      }

      mockFetch(mockFetchResponse(mockResponse))

      const result = await client.createPack(packRequest)

      expect(result.data.id).toBe(200)
      expect(result.data.name).toBe('Bundle')
    })
  })

  describe('getVariants()', () => {
    it('should list variants for a product', async () => {
      const mockResponse = {
        href: '',
        count: 1,
        limit: 50,
        offset: 0,
        items: [{ id: 10 }],
      }

      mockFetch(mockFetchResponse(mockResponse))

      const result = await client.getVariants(1)

      expect(result.count).toBe(1)
      expect(result.items).toHaveLength(1)
    })
  })

  describe('getTaxes()', () => {
    it('should list taxes for a product', async () => {
      const mockResponse = {
        href: '',
        count: 1,
        limit: 50,
        offset: 0,
        items: [{ id: 20 } as BsaleProductTax],
      }

      mockFetch(mockFetchResponse(mockResponse))

      const result = await client.getTaxes(1)

      expect(result.count).toBe(1)
      expect(result.items[0]?.id).toBe(20)
    })
  })

  describe('getTax()', () => {
    it('should get a specific tax for a product', async () => {
      const mockResponse = {
        product_tax: { id: 30 } as BsaleProductTax,
      }

      mockFetch(mockFetchResponse(mockResponse))

      const result = await client.getTax(1, 30)

      expect(result.id).toBe(30)
    })
  })

  describe('deleteProduct()', () => {
    it('should soft delete a product', async () => {
      const mockResponse: BsaleProduct = {
        href: 'https://api.bsale.io/v1/products/1.json',
        id: 1,
        name: 'Product 1',
        description: '',
        classification: 0,
        ledgerAccount: '',
        costCenter: '',
        allowDecimal: 0,
        stockControl: 1,
        printDetailInDocuments: 0,
        printDetailPack: 0,
        state: 1, // Inactive
        prestashopProductId: 0,
        presashopAttributeId: 0,
        product_type: { href: '', id: '1' },
      }

      mockFetch(mockFetchResponse(mockResponse))

      const result = await client.deleteProduct(1)

      expect(result.state).toBe(1)
    })
  })

  describe('getAll()', () => {
    it('should fetch all products with automatic pagination', async () => {
      let callCount = 0

      mockFetchWith(async url => {
        callCount++

        if (callCount === 1) {
          return mockFetchResponse({
            href: '',
            count: 75,
            limit: 50,
            offset: 0,
            items: new Array(50).fill(null).map((_, i) => ({
              href: '',
              id: i + 1,
              name: `Product ${i + 1}`,
              description: '',
              classification: 0,
              ledgerAccount: '',
              costCenter: '',
              allowDecimal: 0,
              stockControl: 1,
              printDetailInDocuments: 0,
              printDetailPack: 0,
              state: 0,
              prestashopProductId: 0,
              presashopAttributeId: 0,
              product_type: { href: '', id: '1' },
            })),
          })
        } else {
          return mockFetchResponse({
            href: '',
            count: 75,
            limit: 50,
            offset: 50,
            items: new Array(25).fill(null).map((_, i) => ({
              href: '',
              id: i + 51,
              name: `Product ${i + 51}`,
              description: '',
              classification: 0,
              ledgerAccount: '',
              costCenter: '',
              allowDecimal: 0,
              stockControl: 1,
              printDetailInDocuments: 0,
              printDetailPack: 0,
              state: 0,
              prestashopProductId: 0,
              presashopAttributeId: 0,
              product_type: { href: '', id: '1' },
            })),
          })
        }
      })

      const result = await client.getAll()

      expect(result).toHaveLength(75)
      expect(callCount).toBe(2)
    })
  })
})

describe('ProductTypesClient', () => {
  let client: ProductTypesClient

  beforeEach(() => {
    client = new ProductTypesClient(mockConfig)
  })

  afterEach(() => {
    restoreFetch()
  })

  describe('list()', () => {
    it('should list product types', async () => {
      const mockResponse = {
        href: '',
        count: 10,
        limit: 25,
        offset: 0,
        items: [
          {
            href: '',
            id: 1,
            name: 'Electronics',
            isEditable: 1,
            state: 0,
          } as BsaleProductType,
        ],
      }

      mockFetch(mockFetchResponse(mockResponse))

      const result = await client.list()

      expect(result.items).toHaveLength(1)
      expect(result.items[0].name).toBe('Electronics')
    })
  })

  describe('getById()', () => {
    it('should get a product type by id', async () => {
      const mockResponse = {
        product_type: {
          href: '',
          id: 2,
          name: 'Accessories',
          isEditable: 1,
          state: 0,
        } as BsaleProductType,
      }

      mockFetch(mockFetchResponse(mockResponse))

      const result = await client.getById(2)

      expect(result.id).toBe(2)
      expect(result.name).toBe('Accessories')
    })
  })

  describe('count()', () => {
    it('should get product type count with state filter', async () => {
      mockFetch(mockFetchResponse({ count: 12 }))

      const result = await client.count(0)

      expect(result).toBe(12)
    })
  })

  describe('create()', () => {
    it('should create a product type with attributes', async () => {
      const newType = {
        name: 'New Type',
        attributes: [
          {
            name: 'Size',
            isMandatory: 1 as const,
            generateVariantName: 1 as const,
            hasOptions: 1 as const,
            options: 'S|M|L',
            state: 0 as const,
          },
        ],
      }

      const mockResponse: BsaleProductType = {
        href: '',
        id: 99,
        name: 'New Type',
        isEditable: 1,
        state: 0,
      }

      mockFetch(mockFetchResponse(mockResponse))

      const result = await client.create(newType)

      expect(result.name).toBe('New Type')
    })
  })

  describe('update()', () => {
    it('should update a product type', async () => {
      const mockResponse: BsaleProductType = {
        href: '',
        id: 50,
        name: 'Updated Type',
        isEditable: 1,
        state: 0,
      }

      mockFetch(mockFetchResponse(mockResponse))

      const result = await client.update(50, { name: 'Updated Type' })

      expect(result.id).toBe(50)
      expect(result.name).toBe('Updated Type')
    })
  })

  describe('deleteType()', () => {
    it('should soft delete a product type', async () => {
      const mockResponse: BsaleProductType = {
        href: '',
        id: 51,
        name: 'Deleted Type',
        isEditable: 1,
        state: 1,
      }

      mockFetch(mockFetchResponse(mockResponse))

      const result = await client.deleteType(51)

      expect(result.state).toBe(1)
    })
  })

  describe('getProducts()', () => {
    it('should list products for a product type', async () => {
      const mockResponse = {
        href: '',
        count: 1,
        limit: 25,
        offset: 0,
        items: [
          {
            href: '',
            id: 1,
            name: 'Product 1',
            description: '',
            classification: 0,
            ledgerAccount: '',
            costCenter: '',
            allowDecimal: 0,
            stockControl: 1,
            printDetailInDocuments: 0,
            printDetailPack: 0,
            state: 0,
            prestashopProductId: 0,
            presashopAttributeId: 0,
            product_type: { href: '', id: '1' },
          },
        ],
      }

      mockFetch(mockFetchResponse(mockResponse))

      const result = await client.getProducts(1)

      expect(result.items).toHaveLength(1)
      expect(result.items[0]?.id).toBe(1)
    })
  })

  describe('getAttributes()', () => {
    it('should list attributes for a product type', async () => {
      const mockResponse = {
        href: '',
        count: 1,
        limit: 25,
        offset: 0,
        items: [{ id: 100, name: 'Color' } as BsaleProductAttribute],
      }

      mockFetch(mockFetchResponse(mockResponse))

      const result = await client.getAttributes(1)

      expect(result.count).toBe(1)
      expect(result.items[0]?.id).toBe(100)
    })
  })

  describe('getAttribute()', () => {
    it('should get a specific attribute', async () => {
      const mockResponse = {
        attribute: { id: 101, name: 'Size' } as BsaleProductAttribute,
      }

      mockFetch(mockFetchResponse(mockResponse))

      const result = await client.getAttribute(1, 101)

      expect(result.id).toBe(101)
    })
  })
})
