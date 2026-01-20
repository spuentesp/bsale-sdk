/**
 * Documents API client (Invoices, Receipts, etc.)
 */

import { BaseClient } from './base-client'
import type {
  BsaleDocument,
  BsaleDocumentDetail,
  BsaleDocumentReference,
  BsaleDocumentTax,
  BsaleDocumentSeller,
  BsaleDocumentSummary,
  BsaleTicketSummary,
  BsalePaginatedResponse,
  ListDocumentsParams,
  CreateDocumentRequest,
} from '../types'

export class DocumentsClient extends BaseClient {
  /**
   * GET /v1/documents.json
   * List all documents with pagination
   */
  async list(params?: ListDocumentsParams): Promise<BsalePaginatedResponse<BsaleDocument>> {
    return super.get<BsalePaginatedResponse<BsaleDocument>>('/documents.json', params)
  }

  /**
   * GET /v1/documents/:id.json
   * Get a single document by ID
   */
  async getDocument(documentId: number, expand?: string[]): Promise<BsaleDocument> {
    const response = await super.get<{ document: BsaleDocument }>(
      `/documents/${documentId}.json`,
      expand ? { expand } : undefined
    )
    return response.document
  }

  /**
   * GET /v1/documents/count.json
   * Get total document count
   */
  async count(state?: 0 | 1): Promise<number> {
    const response = await super.get<{ count: number }>(
      '/documents/count.json',
      state !== undefined ? { state } : undefined
    )
    return response.count
  }

  /**
   * POST /v1/documents.json
   * Create a new document (invoice, receipt, etc.)
   */
  async create(document: CreateDocumentRequest): Promise<BsaleDocument> {
    return super.post<BsaleDocument>('/documents.json', document)
  }

  /**
   * DELETE /v1/documents/:id.json
   * Delete a non-electronic document
   */
  async deleteDocument(documentId: number, officeId: number): Promise<void> {
    return super.delete(`/documents/${documentId}.json?officeId=${officeId}`)
  }

  /**
   * GET /v1/documents/summary.json
   * Get sales summary
   */
  async getSummary(): Promise<BsaleDocumentSummary> {
    return super.get<BsaleDocumentSummary>('/documents/summary.json')
  }

  /**
   * GET /v1/documents/summary/ticket.json
   * Get electronic receipt summary by RCOF date range
   */
  async getTicketSummary(startDate: number, endDate: number): Promise<BsaleTicketSummary> {
    return super.get<BsaleTicketSummary>('/documents/summary/ticket.json', {
      rcofdaterange: [startDate, endDate],
    })
  }

  /**
   * GET /v1/documents/costs.json
   * Get costs associated with dispatched sales
   */
  async getCosts(params?: ListDocumentsParams): Promise<any> {
    return super.get('/documents/costs.json', params)
  }

  /**
   * GET /v1/documents/:id/details.json
   * Get document line items
   */
  async getDetails(
    documentId: number,
    params?: { expand?: string[] }
  ): Promise<BsalePaginatedResponse<BsaleDocumentDetail>> {
    return super.get(`/documents/${documentId}/details.json`, params)
  }

  /**
   * GET /v1/documents/:id/details/:detailId.json
   * Get a single document detail
   */
  async getDetail(documentId: number, detailId: number): Promise<BsaleDocumentDetail> {
    const response = await super.get<{ detail: BsaleDocumentDetail }>(
      `/documents/${documentId}/details/${detailId}.json`
    )
    return response.detail
  }

  /**
   * GET /v1/documents/:id/references.json
   * Get document references (electronic documents only)
   */
  async getReferences(documentId: number): Promise<BsalePaginatedResponse<BsaleDocumentReference>> {
    return super.get(`/documents/${documentId}/references.json`)
  }

  /**
   * GET /v1/documents/:id/document_taxes.json
   * Get document tax breakdown
   */
  async getTaxes(documentId: number): Promise<BsalePaginatedResponse<BsaleDocumentTax>> {
    return super.get(`/documents/${documentId}/document_taxes.json`)
  }

  /**
   * GET /v1/documents/:id/sellers.json
   * Get document sellers
   */
  async getSellers(documentId: number): Promise<BsalePaginatedResponse<BsaleDocumentSeller>> {
    return super.get(`/documents/${documentId}/sellers.json`)
  }

  /**
   * GET /v1/documents/:id/attributes.json
   * Get dynamic attributes for a document
   */
  async getAttributes(documentId: number): Promise<BsalePaginatedResponse<any>> {
    return super.get(`/documents/${documentId}/attributes.json`)
  }

  /**
   * Helper: Get documents by date range
   */
  async getByDateRange(
    startDate: number,
    endDate: number,
    documentTypeId?: number
  ): Promise<BsaleDocument[]> {
    const documents: BsaleDocument[] = []
    let offset = 0
    const limit = 50

    while (true) {
      const response = await this.list({
        limit,
        offset,
        emissiondaterange: [startDate, endDate],
        documenttypeid: documentTypeId,
      })

      documents.push(...response.items)

      if (offset + limit >= response.count) {
        break
      }

      offset += limit
    }

    return documents
  }

  /**
   * Helper: Get documents by client
   */
  async getByClient(clientId: number): Promise<BsaleDocument[]> {
    const response = await this.list({ clientid: clientId, limit: 50 })
    return response.items
  }

  /**
   * Helper: Get documents by office
   */
  async getByOffice(officeId: number): Promise<BsaleDocument[]> {
    const response = await this.list({ officeid: officeId, limit: 50 })
    return response.items
  }
}
