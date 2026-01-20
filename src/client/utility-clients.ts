/**
 * Utility clients for auxiliary Bsale entities
 */

import { BaseClient } from './base-client'
import type {
  BsaleOffice,
  BsaleUser,
  BsaleCurrency,
  BsaleDocumentType,
  BsalePaymentMethod,
  BsaleSaleCondition,
  BsaleDiscount,
  BsaleTax,
  BsaleShipmentType,
  BsaleDynamicAttribute,
  BsaleUserSalesSummary,
  BsaleExchangeRate,
  BsaleCAF,
  BsaleAvailableFolios,
  BsaleDiscountDetail,
  BsaleDynamicAttributeDetail,
  BsalePaginatedResponse,
  ListOfficesParams,
  ListUsersParams,
  ListCurrenciesParams,
  ListDocumentTypesParams,
  ListPaymentMethodsParams,
  ListSaleConditionsParams,
  ListDiscountsParams,
  ListTaxesParams,
  ListShipmentTypesParams,
  ListDynamicAttributesParams,
  CreateOfficeRequest,
  UpdateOfficeRequest,
  UserSalesSummaryParams,
  UserSalesParams,
  CurrencySalesParams,
  GetCAFParams,
  GetAvailableFoliosParams,
  UpdateDocumentTypeRequest,
  CreatePaymentMethodRequest,
  CreateDiscountRequest,
  UpdateDiscountRequest,
  AddDiscountDetailRequest,
} from '../types'

// Offices Client
export class OfficesClient extends BaseClient {
  async list(params?: ListOfficesParams): Promise<BsalePaginatedResponse<BsaleOffice>> {
    return super.get<BsalePaginatedResponse<BsaleOffice>>('/offices.json', params)
  }

  async getById(officeId: number): Promise<BsaleOffice> {
    const response = await super.get<{ office: BsaleOffice }>(`/offices/${officeId}.json`)
    return response.office
  }

  async count(state?: 0 | 1): Promise<number> {
    const response = await super.get<{ count: number }>(
      '/offices/count.json',
      state !== undefined ? { state } : undefined
    )
    return response.count
  }

  async create(office: CreateOfficeRequest): Promise<BsaleOffice> {
    return this.post<BsaleOffice>('/offices.json', office)
  }

  async update(officeId: number, updates: UpdateOfficeRequest): Promise<BsaleOffice> {
    return this.put<BsaleOffice>(`/offices/${officeId}.json`, updates)
  }

  async deleteOffice(officeId: number): Promise<BsaleOffice> {
    return super.delete<BsaleOffice>(`/offices/${officeId}.json`)
  }
}

// Users Client
export class UsersClient extends BaseClient {
  async list(params?: ListUsersParams): Promise<BsalePaginatedResponse<BsaleUser>> {
    return super.get<BsalePaginatedResponse<BsaleUser>>('/users.json', params)
  }

  async getById(userId: number, expand?: string[]): Promise<BsaleUser> {
    const response = await super.get<{ user: BsaleUser }>(
      `/users/${userId}.json`,
      expand ? { expand } : undefined
    )
    return response.user
  }

  async getSalesSummary(params: UserSalesSummaryParams): Promise<BsaleUserSalesSummary> {
    return super.get<BsaleUserSalesSummary>('/users/sales_summary.json', params)
  }

  async getSales(userId: number, params: UserSalesParams): Promise<BsalePaginatedResponse<any>> {
    return super.get<BsalePaginatedResponse<any>>(`/users/${userId}/sales.json`, params)
  }

  async getReturns(userId: number, params: UserSalesParams): Promise<BsalePaginatedResponse<any>> {
    return super.get<BsalePaginatedResponse<any>>(`/users/${userId}/returns.json`, params)
  }
}

// Currencies Client
export class CurrenciesClient extends BaseClient {
  async list(params?: ListCurrenciesParams): Promise<BsalePaginatedResponse<BsaleCurrency>> {
    return super.get<BsalePaginatedResponse<BsaleCurrency>>('/coins.json', params)
  }

  async getById(coinId: number): Promise<BsaleCurrency> {
    const response = await super.get<{ coin: BsaleCurrency }>(`/coins/${coinId}.json`)
    return response.coin
  }

  async count(state?: 0 | 1): Promise<number> {
    const response = await super.get<{ count: number }>(
      '/coins/count.json',
      state !== undefined ? { state } : undefined
    )
    return response.count
  }

  async getExchangeRate(coinId: number, timestamp: number): Promise<number> {
    const response = await super.get<BsaleExchangeRate>(
      `/coins/${coinId}/exchange_rate/${timestamp}.json`
    )
    return response.exchangeRate
  }

  async getSales(
    coinId: number,
    params?: CurrencySalesParams
  ): Promise<BsalePaginatedResponse<any>> {
    return super.get<BsalePaginatedResponse<any>>(`/coins/${coinId}/sales.json`, params)
  }
}

// Document Types Client
export class DocumentTypesClient extends BaseClient {
  async list(params?: ListDocumentTypesParams): Promise<BsalePaginatedResponse<BsaleDocumentType>> {
    return super.get<BsalePaginatedResponse<BsaleDocumentType>>('/document_types.json', params)
  }

  async getById(typeId: number, expand?: string[]): Promise<BsaleDocumentType> {
    const response = await super.get<{ document_type: BsaleDocumentType }>(
      `/document_types/${typeId}.json`,
      expand ? { expand } : undefined
    )
    return response.document_type
  }

  async count(state?: 0 | 1): Promise<number> {
    const response = await super.get<{ count: number }>(
      '/document_types/count.json',
      state !== undefined ? { state } : undefined
    )
    return response.count
  }

  async update(typeId: number, updates: UpdateDocumentTypeRequest): Promise<BsaleDocumentType> {
    return this.put<BsaleDocumentType>(`/document_types/${typeId}.json`, updates)
  }

  async getCAF(params: GetCAFParams): Promise<BsaleCAF> {
    return super.get<BsaleCAF>('/document_types/caf.json', params)
  }

  async getAvailableFolios(params: GetAvailableFoliosParams): Promise<BsaleAvailableFolios> {
    return super.get<BsaleAvailableFolios>('/document_types/number_availables.json', params)
  }
}

// Payment Methods Client
export class PaymentMethodsClient extends BaseClient {
  async list(
    params?: ListPaymentMethodsParams
  ): Promise<BsalePaginatedResponse<BsalePaymentMethod>> {
    return super.get<BsalePaginatedResponse<BsalePaymentMethod>>('/payment_types.json', params)
  }

  async getById(paymentTypeId: number): Promise<BsalePaymentMethod> {
    const response = await super.get<{ payment_type: BsalePaymentMethod }>(
      `/payment_types/${paymentTypeId}.json`
    )
    return response.payment_type
  }

  async count(state?: 0 | 1): Promise<number> {
    const response = await super.get<{ count: number }>(
      '/payment_types/count.json',
      state !== undefined ? { state } : undefined
    )
    return response.count
  }

  async create(paymentMethod: CreatePaymentMethodRequest): Promise<BsalePaymentMethod> {
    return this.post<BsalePaymentMethod>('/payment_types.json', paymentMethod)
  }

  async getDynamicAttributes(paymentTypeId: number): Promise<BsalePaginatedResponse<any>> {
    return super.get<BsalePaginatedResponse<any>>(
      `/payment_types/${paymentTypeId}/dynamic_attributes.json`
    )
  }
}

// Sale Conditions Client
export class SaleConditionsClient extends BaseClient {
  async list(
    params?: ListSaleConditionsParams
  ): Promise<BsalePaginatedResponse<BsaleSaleCondition>> {
    return super.get<BsalePaginatedResponse<BsaleSaleCondition>>('/sale_conditions.json', params)
  }

  async getById(conditionId: number): Promise<BsaleSaleCondition> {
    const response = await super.get<{ sale_condition: BsaleSaleCondition }>(
      `/sale_conditions/${conditionId}.json`
    )
    return response.sale_condition
  }

  async count(state?: 0 | 1): Promise<number> {
    const response = await super.get<{ count: number }>(
      '/sale_conditions/count.json',
      state !== undefined ? { state } : undefined
    )
    return response.count
  }
}

// Discounts Client
export class DiscountsClient extends BaseClient {
  async list(params?: ListDiscountsParams): Promise<BsalePaginatedResponse<BsaleDiscount>> {
    return super.get<BsalePaginatedResponse<BsaleDiscount>>('/discounts.json', params)
  }

  async getById(discountId: number): Promise<BsaleDiscount> {
    const response = await super.get<{ discount: BsaleDiscount }>(`/discounts/${discountId}.json`)
    return response.discount
  }

  async count(state?: 0 | 1): Promise<number> {
    const response = await super.get<{ count: number }>(
      '/discounts/count.json',
      state !== undefined ? { state } : undefined
    )
    return response.count
  }

  async create(discount: CreateDiscountRequest): Promise<BsaleDiscount> {
    return this.post<BsaleDiscount>('/v2/discounts/new.json', discount)
  }

  async update(discountId: number, updates: UpdateDiscountRequest): Promise<BsaleDiscount> {
    return this.put<BsaleDiscount>(`/v2/discounts/${discountId}.json`, updates)
  }

  async getDetails(discountId: number): Promise<BsalePaginatedResponse<BsaleDiscountDetail>> {
    return super.get<BsalePaginatedResponse<BsaleDiscountDetail>>(
      `/v2/discounts/${discountId}/details.json`
    )
  }

  async addDetail(
    discountId: number,
    detail: AddDiscountDetailRequest
  ): Promise<BsaleDiscountDetail> {
    return this.post<BsaleDiscountDetail>(`/v2/discounts/${discountId}/details.json`, detail)
  }

  async deleteDetail(detailId: number): Promise<{ id: number }> {
    return super.delete<{ id: number }>(`/v2/discounts/details/${detailId}.json`)
  }
}

// Taxes Client
export class TaxesClient extends BaseClient {
  async list(params?: ListTaxesParams): Promise<BsalePaginatedResponse<BsaleTax>> {
    return super.get<BsalePaginatedResponse<BsaleTax>>('/taxes.json', params)
  }

  async getById(taxId: number): Promise<BsaleTax> {
    const response = await super.get<{ tax: BsaleTax }>(`/taxes/${taxId}.json`)
    return response.tax
  }

  async count(state?: 0 | 1): Promise<number> {
    const response = await super.get<{ count: number }>(
      '/taxes/count.json',
      state !== undefined ? { state } : undefined
    )
    return response.count
  }
}

// Shipment Types Client
export class ShipmentTypesClient extends BaseClient {
  async list(params?: ListShipmentTypesParams): Promise<BsalePaginatedResponse<BsaleShipmentType>> {
    return super.get<BsalePaginatedResponse<BsaleShipmentType>>('/shipping_types.json', params)
  }

  async getById(shippingTypeId: number): Promise<BsaleShipmentType> {
    const response = await super.get<{ shipping_type: BsaleShipmentType }>(
      `/shipping_types/${shippingTypeId}.json`
    )
    return response.shipping_type
  }
}

// Dynamic Attributes Client
export class DynamicAttributesClient extends BaseClient {
  async list(
    params?: ListDynamicAttributesParams
  ): Promise<BsalePaginatedResponse<BsaleDynamicAttribute>> {
    return super.get<BsalePaginatedResponse<BsaleDynamicAttribute>>(
      '/dynamic_attributes.json',
      params
    )
  }

  async getById(attributeId: number): Promise<BsaleDynamicAttribute> {
    const response = await super.get<{ dynamic_attribute: BsaleDynamicAttribute }>(
      `/dynamic_attributes/${attributeId}.json`
    )
    return response.dynamic_attribute
  }

  async getDetails(
    attributeId: number
  ): Promise<BsalePaginatedResponse<BsaleDynamicAttributeDetail>> {
    return super.get<BsalePaginatedResponse<BsaleDynamicAttributeDetail>>(
      `/dynamic_attributes/${attributeId}/details.json`
    )
  }

  async getDetail(attributeId: number, detailId: number): Promise<BsaleDynamicAttributeDetail> {
    const response = await super.get<{ detail: BsaleDynamicAttributeDetail }>(
      `/dynamic_attributes/${attributeId}/details/${detailId}.json`
    )
    return response.detail
  }
}
