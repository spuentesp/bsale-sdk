# @stockflow/bsale-sdk

Complete TypeScript SDK for the Bsale Chile API v1.

## Features

- 🎯 **Complete API Coverage** - All Bsale API v1 endpoints
- 📘 **Full TypeScript Support** - Comprehensive type definitions
- 🔐 **OAuth 2.0 Ready** - Built-in token management
- 🪝 **Webhook Support** - Type-safe webhook payloads
- 🔄 **Automatic Pagination** - Helper methods for paginated resources
- ⚡ **Modern Architecture** - Modular, tree-shakeable design

## Installation

```bash
bun add @stockflow/bsale-sdk
```

## Quick Start

```typescript
import { BsaleClient } from '@stockflow/bsale-sdk'

const client = new BsaleClient({
  credentials: {
    accessToken: 'your-access-token',
    refreshToken: 'your-refresh-token',
    expiresAt: new Date('2024-12-31'),
  },
})

// Fetch products
const products = await client.products.list({ limit: 50 })

// Get stock levels
const stocks = await client.stocks.list({ officeid: 1 })

// Create document
const document = await client.documents.create({
  documentTypeId: 8,
  officeId: 1,
  emissionDate: Math.floor(Date.now() / 1000),
  details: [
    {
      variantId: 157,
      quantity: 1,
      netUnitValue: 10000,
    },
  ],
})
```

## API Reference

See [Bsale API Documentation](https://docs.bsale.dev) for complete endpoint documentation.

## License

MIT
