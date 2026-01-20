/**
 * Clients API client
 */

import { BaseClient } from './base-client'
import type {
  BsaleClient,
  BsaleClientContact,
  BsaleClientAddress,
  BsaleClientAttribute,
  BsaleClientUnpaidDocuments,
  BsalePaginatedResponse,
  ListClientsParams,
  ListClientAddressesParams,
  CreateClientRequest,
  UpdateClientRequest,
  CreateClientContactRequest,
  CreateClientAddressRequest,
  UpdateClientAddressRequest,
  UpdateClientPointsRequest,
} from '../types'

export class ClientsClient extends BaseClient {
  /**
   * GET /v1/clients.json
   * List all clients with pagination
   */
  async list(params?: ListClientsParams): Promise<BsalePaginatedResponse<BsaleClient>> {
    return super.get<BsalePaginatedResponse<BsaleClient>>('/clients.json', params)
  }

  /**
   * GET /v1/clients/:id.json
   * Get a single client by ID
   */
  async getClient(clientId: number, expand?: string[]): Promise<BsaleClient> {
    const response = await super.get<{ client: BsaleClient }>(
      `/clients/${clientId}.json`,
      expand ? { expand } : undefined
    )
    return response.client
  }

  /**
   * GET /v1/clients/count.json
   * Get total client count
   */
  async count(state?: 0 | 1 | 99): Promise<number> {
    const response = await super.get<{ count: number }>(
      '/clients/count.json',
      state !== undefined ? { state } : undefined
    )
    return response.count
  }

  /**
   * POST /v1/clients.json
   * Create a new client
   */
  async create(client: CreateClientRequest): Promise<BsaleClient> {
    return super.post<BsaleClient>('/clients.json', client)
  }

  /**
   * PUT /v1/clients/:id.json
   * Update an existing client
   */
  async update(clientId: number, updates: UpdateClientRequest): Promise<BsaleClient> {
    return super.put<BsaleClient>(`/clients/${clientId}.json`, updates)
  }

  /**
   * DELETE /v1/clients/:id.json
   * Soft delete a client (sets state to 99)
   */
  async deleteClient(clientId: number): Promise<BsaleClient> {
    return super.delete<BsaleClient>(`/clients/${clientId}.json`)
  }

  /**
   * GET /v1/clients/:id/contacts.json
   * Get client contacts
   */
  async getContacts(clientId: number): Promise<BsalePaginatedResponse<BsaleClientContact>> {
    return super.get(`/clients/${clientId}/contacts.json`)
  }

  /**
   * GET /v1/clients/:clientId/contacts/:contactId.json
   * Get a single contact
   */
  async getContact(clientId: number, contactId: number): Promise<BsaleClientContact> {
    const response = await super.get<{ contact: BsaleClientContact }>(
      `/clients/${clientId}/contacts/${contactId}.json`
    )
    return response.contact
  }

  /**
   * POST /v1/clients/:id/contacts.json
   * Create a client contact
   */
  async createContact(
    clientId: number,
    contact: CreateClientContactRequest
  ): Promise<BsaleClientContact> {
    return super.post<BsaleClientContact>(`/clients/${clientId}/contacts.json`, contact)
  }

  /**
   * DELETE /v1/clients/:clientId/contacts/:contactId.json
   * Delete a client contact
   */
  async deleteContact(clientId: number, contactId: number): Promise<void> {
    return super.delete(`/clients/${clientId}/contacts/${contactId}.json`)
  }

  /**
   * GET /v1/clients/:id/addresses.json
   * Get client addresses
   */
  async getAddresses(
    clientId: number,
    params?: ListClientAddressesParams
  ): Promise<BsalePaginatedResponse<BsaleClientAddress>> {
    return super.get(`/clients/${clientId}/addresses.json`, params)
  }

  /**
   * GET /v1/clients/:clientId/addresses/:addressId.json
   * Get a single address
   */
  async getAddress(clientId: number, addressId: number): Promise<BsaleClientAddress> {
    const response = await super.get<{ address: BsaleClientAddress }>(
      `/clients/${clientId}/addresses/${addressId}.json`
    )
    return response.address
  }

  /**
   * POST /v1/clients/:id/addresses.json
   * Create a client address
   */
  async createAddress(
    clientId: number,
    address: CreateClientAddressRequest
  ): Promise<BsaleClientAddress> {
    return super.post<BsaleClientAddress>(`/clients/${clientId}/addresses.json`, address)
  }

  /**
   * PUT /v1/clients/:clientId/addresses/:addressId.json
   * Update a client address
   */
  async updateAddress(
    clientId: number,
    addressId: number,
    updates: UpdateClientAddressRequest
  ): Promise<BsaleClientAddress> {
    return super.put<BsaleClientAddress>(
      `/clients/${clientId}/addresses/${addressId}.json`,
      updates
    )
  }

  /**
   * DELETE /v1/clients/:clientId/addresses/:addressId.json
   * Delete a client address
   */
  async deleteAddress(clientId: number, addressId: number): Promise<void> {
    return super.delete(`/clients/${clientId}/addresses/${addressId}.json`)
  }

  /**
   * GET /v1/clients/:id/attributes.json
   * Get client dynamic attributes
   */
  async getAttributes(clientId: number): Promise<BsalePaginatedResponse<BsaleClientAttribute>> {
    return super.get(`/clients/${clientId}/attributes.json`)
  }

  /**
   * PUT /v1/clients/points.json
   * Update client loyalty points
   */
  async updatePoints(request: UpdateClientPointsRequest): Promise<any> {
    return super.put('/clients/points.json', request)
  }

  /**
   * GET /v1/clients/purchases.json
   * Get client purchase documents
   */
  async getPurchases(clientId?: number, code?: string): Promise<BsalePaginatedResponse<any>> {
    return super.get('/clients/purchases.json', {
      clientid: clientId,
      code,
    })
  }

  /**
   * GET /v1/clients/unpaid_documents.json
   * Get unpaid documents for a client
   */
  async getUnpaidDocuments(
    clientId: number,
    comparisonDate?: number
  ): Promise<BsaleClientUnpaidDocuments> {
    return super.get<BsaleClientUnpaidDocuments>('/clients/unpaid_documents.json', {
      clientid: clientId,
      comparisondate: comparisonDate,
    })
  }

  /**
   * Helper: Find client by RUT
   */
  async findByCode(code: string): Promise<BsaleClient | null> {
    const response = await this.list({ code, limit: 1 })
    return response.items[0] || null
  }

  /**
   * Helper: Find client by email
   */
  async findByEmail(email: string): Promise<BsaleClient | null> {
    const response = await this.list({ email, limit: 1 })
    return response.items[0] || null
  }
}
