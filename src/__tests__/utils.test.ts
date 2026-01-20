/**
 * Tests for utility functions
 */

import { describe, it, expect } from 'vitest'
import { buildQueryString, isExpired, sleep, retryWithBackoff } from '../utils'

describe('buildQueryString', () => {
  it('should build query string from object', () => {
    const params = {
      limit: 10,
      offset: 0,
      name: 'Test Product',
    }

    const result = buildQueryString(params)

    expect(result).toBe('?limit=10&offset=0&name=Test+Product')
  })

  it('should handle array parameters with JSON encoding', () => {
    const params = {
      expand: ['product_type', 'variants'],
    }

    const result = buildQueryString(params)

    expect(result).toContain('expand=')
    expect(result).toContain('product_type')
    expect(result).toContain('variants')
  })

  it('should skip undefined and null values', () => {
    const params = {
      limit: 10,
      offset: undefined,
      name: null,
    }

    const result = buildQueryString(params)

    expect(result).toBe('?limit=10')
    expect(result).not.toContain('offset')
    expect(result).not.toContain('name')
  })

  it('should return empty string for empty object', () => {
    const result = buildQueryString({})

    expect(result).toBe('')
  })

  it('should JSON encode object parameters', () => {
    const params = {
      dateRange: { start: 1234567890, end: 1234567999 },
    }

    const result = buildQueryString(params)

    expect(result).toContain('dateRange=')
    expect(result).toContain('1234567890')
    expect(result).toContain('1234567999')
  })
})

describe('isExpired', () => {
  it('should return true for past dates', () => {
    const pastDate = new Date('2020-01-01')

    expect(isExpired(pastDate)).toBe(true)
  })

  it('should return false for future dates', () => {
    const futureDate = new Date('2099-12-31')

    expect(isExpired(futureDate)).toBe(false)
  })

  it('should handle edge case of current time', () => {
    const now = new Date()

    // This might be true or false depending on exact timing
    const result = isExpired(now)
    expect(typeof result).toBe('boolean')
  })
})

describe('sleep', () => {
  it('should sleep for specified milliseconds', async () => {
    const start = Date.now()

    await sleep(100)

    const duration = Date.now() - start

    // Allow for some timing variance
    expect(duration).toBeGreaterThanOrEqual(90)
    expect(duration).toBeLessThan(150)
  })
})

describe('retryWithBackoff', () => {
  it('should succeed on first try', async () => {
    let attempts = 0

    const fn = async () => {
      attempts++
      return 'success'
    }

    const result = await retryWithBackoff(fn)

    expect(result).toBe('success')
    expect(attempts).toBe(1)
  })

  it('should retry on failure and eventually succeed', async () => {
    let attempts = 0

    const fn = async () => {
      attempts++
      if (attempts < 3) {
        throw new Error('Temporary error')
      }
      return 'success'
    }

    const result = await retryWithBackoff(fn, 3, 10) // 10ms base delay for faster tests

    expect(result).toBe('success')
    expect(attempts).toBe(3)
  })

  it('should throw error after max retries', async () => {
    let attempts = 0

    const fn = async () => {
      attempts++
      throw new Error('Persistent error')
    }

    await expect(retryWithBackoff(fn, 3, 10)).rejects.toThrow('Persistent error')
    expect(attempts).toBe(3)
  })

  it('should use exponential backoff', async () => {
    const startTimes: number[] = []

    const fn = async () => {
      startTimes.push(Date.now())
      throw new Error('Error')
    }

    try {
      await retryWithBackoff(fn, 3, 50) // 50ms base delay
    } catch {
      // Expected to fail
    }

    // Check that delays roughly follow exponential pattern
    // First retry: ~50ms delay
    // Second retry: ~100ms delay
    expect(startTimes).toHaveLength(3)

    const delay1 = startTimes[1] - startTimes[0]
    const delay2 = startTimes[2] - startTimes[1]

    expect(delay1).toBeGreaterThanOrEqual(40)
    expect(delay1).toBeLessThan(100)
    expect(delay2).toBeGreaterThanOrEqual(90)
    expect(delay2).toBeLessThan(150)
  })
})
