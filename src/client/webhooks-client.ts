/**
 * Webhooks API client
 */

import { BaseClient } from './base-client'
import type {
  BsaleWebhook,
  BsaleWebhookRegistration,
  BsaleInstanceWebhook,
  BsalePaginatedResponse,
} from '../types'

export class WebhooksClient extends BaseClient {
  /**
   * GET /v1/webhooks.json
   * List all registered webhooks
   */
  async list(): Promise<BsalePaginatedResponse<BsaleWebhook>> {
    return this.get<BsalePaginatedResponse<BsaleWebhook>>('/webhooks.json')
  }

  /**
   * GET /v1/webhooks/:id.json
   * Get a single webhook by ID
   */
  async getById(webhookId: number): Promise<BsaleWebhook> {
    const response = await super.get<{ webhook: BsaleWebhook }>(`/webhooks/${webhookId}.json`)
    return response.webhook
  }

  /**
   * POST /v1/webhooks.json
   * Register a new webhook
   */
  async create(registration: BsaleWebhookRegistration): Promise<BsaleWebhook> {
    const response = await this.post<{ webhook: BsaleWebhook }>('/webhooks.json', registration)
    return response.webhook
  }

  /**
   * PUT /v1/webhooks/:id.json
   * Update a webhook
   */
  async update(
    webhookId: number,
    updates: Partial<BsaleWebhookRegistration>
  ): Promise<BsaleWebhook> {
    const response = await this.put<{ webhook: BsaleWebhook }>(
      `/webhooks/${webhookId}.json`,
      updates
    )
    return response.webhook
  }

  /**
   * DELETE /v1/webhooks/:id.json
   * Delete a webhook
   */
  async deleteWebhook(webhookId: number): Promise<void> {
    return super.delete<void>(`/webhooks/${webhookId}.json`)
  }

  /**
   * GET /v1/instances/basic/:token.json (from credential.bsale.io)
   * Get instance information from webhook
   */
  async getInstance(token: string): Promise<BsaleInstanceWebhook> {
    // Note: This uses a different base URL
    const baseUrl = 'https://credential.bsale.io/v1'
    const url = `${baseUrl}/instances/basic/${token}.json`

    const response = await fetch(url, {
      headers: {
        Accept: 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to get instance: ${response.statusText}`)
    }

    return response.json() as Promise<BsaleInstanceWebhook>
  }

  /**
   * Helper: Find webhook by topic
   */
  async findByTopic(topic: string): Promise<BsaleWebhook[]> {
    const response = await this.list()
    return response.items.filter(w => w.topic === topic)
  }

  /**
   * Helper: Register multiple webhooks
   */
  async registerMultiple(registrations: BsaleWebhookRegistration[]): Promise<BsaleWebhook[]> {
    const webhooks: BsaleWebhook[] = []

    for (const registration of registrations) {
      const webhook = await this.create(registration)
      webhooks.push(webhook)
    }

    return webhooks
  }

  /**
   * Helper: Enable/disable a webhook
   */
  async setActive(webhookId: number, active: 0 | 1): Promise<BsaleWebhook> {
    return this.update(webhookId, { active })
  }
}
