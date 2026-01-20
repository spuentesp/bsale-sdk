/**
 * @stockflow/bsale-sdk
 *
 * Complete TypeScript SDK for Bsale Chile API v1
 *
 * @example
 * ```typescript
 * import { BsaleClient } from '@stockflow/bsale-sdk'
 *
 * const client = new BsaleClient({
 *   credentials: {
 *     accessToken: process.env.BSALE_ACCESS_TOKEN!,
 *     refreshToken: process.env.BSALE_REFRESH_TOKEN!,
 *     expiresAt: new Date(process.env.BSALE_EXPIRES_AT!),
 *   },
 * })
 *
 * // Use the client
 * const products = await client.products.list()
 * const stocks = await client.stocks.list({ officeid: 1 })
 * ```
 */

// Main client
export { BsaleClient } from './client'

// All types
export * from './types'

// Error classes
export * from './errors'

// Utility functions
export * from './utils'
