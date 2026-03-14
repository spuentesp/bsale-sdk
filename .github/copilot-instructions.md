# Copilot instructions for `@spuentesp_pkgs/bsale-sdk`

## Build, test, and lint commands

Use `pnpm` for CI parity (workflows use pnpm on Node 20/22):

- Install: `pnpm install`
- Build: `pnpm build`
- Typecheck/lint: `pnpm lint` (alias of `tsc --noEmit`)
- Test suite: `pnpm test`
- Coverage: `pnpm test:coverage`
- Watch mode: `pnpm test:watch`

Run a single test file or test name with Vitest:

- Single file: `pnpm test src/__tests__/products-client.test.ts`
- By test name: `pnpm test -t "should get a single product"`

If SDK client runtime behavior changes, rebuild before validating runtime usage so `dist/` matches `src/`:

- `pnpm build`

## High-level architecture

- `src/client/base-client.ts` is the HTTP core: it applies credentials, timeout/abort handling, query serialization, and maps HTTP failures to SDK-specific errors in `src/errors.ts`.
- `src/client/index.ts` exposes `BsaleClient`, a composition root that instantiates all resource clients with one shared config and propagates credential refreshes through `updateCredentials(...)`.
- Resource clients in `src/client/*-client.ts` are thin endpoint mappers over `BaseClient` (`list/getById/count/create/update/delete`) plus a few helpers (`getAll`, lookup helpers, nested resource fetches).
- `src/types/*.ts` contains endpoint-specific contracts; `src/types/common.ts` defines shared primitives (pagination, `BsaleBoolean`, state flags, config/credentials, common error shape).
- Tests (`src/__tests__`) use fetch mocking utilities from `src/__tests__/setup.ts` and validate endpoint paths, query serialization, response shapes, pagination helpers, and error mapping.

## Key conventions in this repository

- Endpoint paths are explicit and include `.json` suffixes, with a mix of `/v1/...` and `/v2/...` for certain operations (e.g., packs/discounts). Keep API versioning exactly aligned with each endpoint.
- Query params are serialized via `buildQueryString(...)`; arrays/objects are JSON-stringified (not repeated keys). Reuse this behavior instead of ad-hoc query builders.
- Error handling contract is centralized: 401/403/404/400/422/429 map to dedicated error classes; network/timeout failures must surface as `BsaleNetworkError`.
- Update calls commonly include the resource `id` in the request body even when the path already includes it (existing client behavior; preserve unless endpoint docs require otherwise).
- List responses are paginated and authoritative for `count/limit/offset/items`; helper `getAll(...)` implementations use `limit=50` and iterate by offset.
- State semantics in shared types: `0` active, `1` inactive, `99` virtual deleted. Preserve these numeric state conventions in filters and types.
- Single-resource payload shape can vary by endpoint/runtime history (wrapped vs raw object). When editing `getById` parsing, preserve compatibility with both response forms where applicable.
