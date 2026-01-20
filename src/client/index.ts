/**
 * Main Bsale API Client
 */

import type { BsaleConfig } from '../types'
import { ProductsClient, ProductTypesClient } from './products-client'
import { VariantsClient } from './variants-client'
import { StocksClient, StockReceptionsClient, StockConsumptionsClient } from './stocks-client'
import { PriceListsClient } from './price-lists-client'
import { DocumentsClient } from './documents-client'
import { ClientsClient } from './clients-client'
import { PaymentsClient } from './payments-client'
import { WebhooksClient } from './webhooks-client'
import {
  OfficesClient,
  UsersClient,
  CurrenciesClient,
  DocumentTypesClient,
  PaymentMethodsClient,
  SaleConditionsClient,
  DiscountsClient,
  TaxesClient,
  ShipmentTypesClient,
  DynamicAttributesClient,
} from './utility-clients'

/**
 * Complete Bsale API Client
 *
 * @example
 * ```typescript
 * const client = new BsaleClient({
 *   credentials: {
 *     accessToken: 'your-access-token',
 *     refreshToken: 'your-refresh-token',
 *     expiresAt: new Date('2024-12-31'),
 *   },
 * })
 *
 * // Fetch products
 * const products = await client.products.list({ limit: 50 })
 *
 * // Get stock levels
 * const stocks = await client.stocks.list({ officeid: 1 })
 *
 * // Create document
 * const document = await client.documents.create({
 *   documentTypeId: 8,
 *   officeId: 1,
 *   emissionDate: Math.floor(Date.now() / 1000),
 *   expirationDate: Math.floor(Date.now() / 1000),
 *   declareSii: 1,
 *   details: [
 *     {
 *       variantId: 157,
 *       quantity: 1,
 *       netUnitValue: 10000,
 *       taxId: '[1]',
 *       comment: 'Product description',
 *     },
 *   ],
 * })
 * ```
 */
export class BsaleClient {
  // Product management
  public readonly products: ProductsClient
  public readonly productTypes: ProductTypesClient
  public readonly variants: VariantsClient

  // Inventory management
  public readonly stocks: StocksClient
  public readonly stockReceptions: StockReceptionsClient
  public readonly stockConsumptions: StockConsumptionsClient

  // Pricing
  public readonly priceLists: PriceListsClient

  // Sales & Documents
  public readonly documents: DocumentsClient
  public readonly clients: ClientsClient
  public readonly payments: PaymentsClient

  // Webhooks
  public readonly webhooks: WebhooksClient

  // Configuration & Utilities
  public readonly offices: OfficesClient
  public readonly users: UsersClient
  public readonly currencies: CurrenciesClient
  public readonly documentTypes: DocumentTypesClient
  public readonly paymentMethods: PaymentMethodsClient
  public readonly saleConditions: SaleConditionsClient
  public readonly discounts: DiscountsClient
  public readonly taxes: TaxesClient
  public readonly shipmentTypes: ShipmentTypesClient
  public readonly dynamicAttributes: DynamicAttributesClient

  constructor(config: BsaleConfig) {
    // Initialize all resource clients with the same config
    this.products = new ProductsClient(config)
    this.productTypes = new ProductTypesClient(config)
    this.variants = new VariantsClient(config)

    this.stocks = new StocksClient(config)
    this.stockReceptions = new StockReceptionsClient(config)
    this.stockConsumptions = new StockConsumptionsClient(config)

    this.priceLists = new PriceListsClient(config)

    this.documents = new DocumentsClient(config)
    this.clients = new ClientsClient(config)
    this.payments = new PaymentsClient(config)

    this.webhooks = new WebhooksClient(config)

    this.offices = new OfficesClient(config)
    this.users = new UsersClient(config)
    this.currencies = new CurrenciesClient(config)
    this.documentTypes = new DocumentTypesClient(config)
    this.paymentMethods = new PaymentMethodsClient(config)
    this.saleConditions = new SaleConditionsClient(config)
    this.discounts = new DiscountsClient(config)
    this.taxes = new TaxesClient(config)
    this.shipmentTypes = new ShipmentTypesClient(config)
    this.dynamicAttributes = new DynamicAttributesClient(config)
  }

  /**
   * Update credentials for all clients (for token refresh)
   */
  public updateCredentials(credentials: BsaleConfig['credentials']): void {
    // Update credentials for all resource clients
    this.products.updateCredentials(credentials)
    this.productTypes.updateCredentials(credentials)
    this.variants.updateCredentials(credentials)
    this.stocks.updateCredentials(credentials)
    this.stockReceptions.updateCredentials(credentials)
    this.stockConsumptions.updateCredentials(credentials)
    this.priceLists.updateCredentials(credentials)
    this.documents.updateCredentials(credentials)
    this.clients.updateCredentials(credentials)
    this.payments.updateCredentials(credentials)
    this.webhooks.updateCredentials(credentials)
    this.offices.updateCredentials(credentials)
    this.users.updateCredentials(credentials)
    this.currencies.updateCredentials(credentials)
    this.documentTypes.updateCredentials(credentials)
    this.paymentMethods.updateCredentials(credentials)
    this.saleConditions.updateCredentials(credentials)
    this.discounts.updateCredentials(credentials)
    this.taxes.updateCredentials(credentials)
    this.shipmentTypes.updateCredentials(credentials)
    this.dynamicAttributes.updateCredentials(credentials)
  }

  /**
   * Get current credentials
   */
  public getCredentials(): BsaleConfig['credentials'] {
    return this.products.getCredentials()
  }
}
