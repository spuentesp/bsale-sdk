/**
 * Office/Branch-related types for Bsale API
 * Documentation: https://docs.bsale.dev/sucursales
 */

import type { BsaleBoolean, ActiveState, PaginationParams, FieldParams } from './common'

/**
 * Office/Branch entity
 */
export interface BsaleOffice {
  href: string
  id: number
  /** Branch name */
  name: string
  /** Physical address */
  address: string
  /** City */
  city: string
  /** Municipality/district */
  municipality: string
  /** Country */
  country: string
  /** Postal code */
  zipCode: string
  /** Geographic latitude */
  latitude: string
  /** Geographic longitude */
  longitude: string
  /** Web availability: 0=no, 1=yes */
  isVirtual: BsaleBoolean
  /** Cost center */
  costCenter: string
  /** Branch description */
  description: string
  /** State: 0=active, 1=inactive */
  state: ActiveState
  /** Warehouse identifier */
  imagestionCellarId?: number
}

/**
 * Query parameters for listing offices
 */
export interface ListOfficesParams extends PaginationParams, FieldParams {
  /** Filter by name */
  name?: string
  /** Filter by address */
  address?: string
  /** Filter by country */
  country?: string
  /** Filter by city */
  city?: string
  /** Filter by municipality */
  municipality?: string
  /** Filter by cost center */
  costcenter?: string
  /** Filter by state */
  state?: ActiveState
}

/**
 * Create office request
 */
export interface CreateOfficeRequest {
  /** Branch name (required) */
  name: string
  /** Address (required) */
  address: string
  /** City (required) */
  city: string
  /** Municipality (required) */
  municipality: string
  /** Country (required) */
  country: string
  /** Postal code (required) */
  zipCode: string
  /** Cost center (required) */
  costCenter: string
  /** Description (required) */
  description: string
  /** Web availability (required) */
  isVirtual: BsaleBoolean
  /** Latitude (required) */
  latitude: string
  /** Longitude (required) */
  longitude: string
}

/**
 * Update office request
 */
export interface UpdateOfficeRequest {
  name?: string
  address?: string
  city?: string
  municipality?: string
  country?: string
  zipCode?: string
  costCenter?: string
  description?: string
  isVirtual?: BsaleBoolean
  latitude?: string
  longitude?: string
}
