import { getQueryClient } from "@app/providers"
import { queryConfig } from "@app/config/query-config"
import type { MockVaultSeed } from "./vaults.types"

export interface FetchMockVaultSeedsSettings {
  latencyMs?: number
}

const DEFAULT_LATENCY_MS = 500

const MOCK_VAULT_SEEDS: MockVaultSeed[] = [
  {
    id: "usdc-prime",
    name: "USDC Prime Vault",
    chain: "Ethereum",
    symbol: "USDC",
    decimals: 6,
    totalSupplyRaw: BigInt("4250000000000"),
    inWalletRaw: BigInt("12450000000"),
    price: 1,
    priceDecimals: 8,
    supplyApy: 0.0412,
    utilization: 0.6723,
    note: "Healthy baseline; all values clean.",
  },
  {
    id: "link-subgraph-coercions",
    name: "LINK Subgraph Coercions",
    chain: "Ethereum",
    symbol: "LINK",
    decimals: "18",
    totalSupplyRaw: "525000000000000000000000",
    inWalletRaw: "3200000000000000000",
    price: "17.245",
    priceDecimals: "8",
    supplyApy: "0.0535",
    utilization: "0.7135",
    note: "Subgraph/string payload coercions produce warnings.",
  },
  {
    id: "wallet-token-not-found",
    name: "AAVE Wallet Token Not Found",
    chain: "Ethereum",
    symbol: "AAVE",
    decimals: 18,
    totalSupplyRaw: BigInt("210000000000000000000000"),
    inWalletRaw: { raw: "123" },
    price: 122.43,
    priceDecimals: 8,
    supplyApy: 0.0215,
    utilization: 0.3822,
    inWalletUsdQueryState: {
      isError: true,
      errorMessage: "Token not found in wallet service response.",
    },
    note: 'In wallet amount is malformed object (unsupported runtime type "object").',
  },
  {
    id: "apy-third-party-down",
    name: "OP APY Provider Down",
    chain: "Optimism",
    symbol: "OP",
    decimals: 18,
    totalSupplyRaw: BigInt("1765432100000000000000000"),
    inWalletRaw: BigInt("444000000000000000"),
    price: 3.41,
    priceDecimals: 8,
    supplyApy: 0.032,
    utilization: 0.6042,
    supplyApyQueryState: {
      isError: true,
      errorMessage: "3rd-party APY provider timed out for this vault.",
    },
    note: "APY query failed while amount/value fields still load successfully.",
  },
  {
    id: "usd-price-api-down",
    name: "ARB Price API Down",
    chain: "Arbitrum",
    symbol: "ARB",
    decimals: 18,
    totalSupplyRaw: BigInt("8765432100000000000000000"),
    inWalletRaw: BigInt("2340000000000000000"),
    price: 0.91,
    priceDecimals: 8,
    supplyApy: 0.0675,
    utilization: 0.5631,
    totalSupplyUsdQueryState: {
      isError: true,
      errorMessage: "Price API unavailable for ARB, retry in a few seconds.",
    },
    note: "USD value query is down, but token amount and utilization are still visible.",
  },
  {
    id: "wallet-amount-undefined",
    name: "MKR Wallet Missing Amount",
    chain: "Ethereum",
    symbol: "MKR",
    decimals: 18,
    totalSupplyRaw: BigInt("74500000000000000000000"),
    inWalletRaw: undefined,
    price: 2480.77,
    priceDecimals: 8,
    supplyApy: 0.0142,
    utilization: 1.327,
    note: "In wallet amount is undefined and utilization exceeds 100% (above-max indicator).",
  },
  {
    id: "wallet-amount-empty-string",
    name: "UNI Wallet Empty String",
    chain: "Base",
    symbol: "UNI",
    decimals: 18,
    totalSupplyRaw: BigInt("300000000000000000000000"),
    inWalletRaw: "",
    price: 13.11,
    priceDecimals: 8,
    supplyApy: 0.0291,
    utilization: 0.7095,
    note: "In wallet amount is an empty string and fails bigint parsing.",
  },
  {
    id: "loading-live-refresh",
    name: "USDT Live Refresh",
    chain: "Ethereum",
    symbol: "USDT",
    decimals: 6,
    totalSupplyRaw: BigInt("8210000000000"),
    inWalletRaw: BigInt("1250000000"),
    price: 1,
    priceDecimals: 8,
    supplyApy: 0.0368,
    utilization: 0.8941,
    supplyApyQueryState: {
      isLoading: true,
    },
    inWalletAmountQueryState: {
      isLoading: true,
    },
    note: "APY and in-wallet amount are actively reloading (skeleton states).",
  },
  {
    id: "utilization-malformed-payload",
    name: "UNI Malformed Utilization Payload",
    chain: "Base",
    symbol: "UNI",
    decimals: 18,
    totalSupplyRaw: BigInt("300000000000000000000000"),
    inWalletRaw: BigInt("8700000000000000000"),
    price: 13.11,
    priceDecimals: 8,
    supplyApy: 0.0291,
    utilization: { value: 0.77 },
    note: "Utilization payload shape is malformed (hard validation error).",
  },
  {
    id: "negative-decimals-error",
    name: "stETH Invalid Decimals",
    chain: "Ethereum",
    symbol: "stETH",
    decimals: -1,
    totalSupplyRaw: BigInt("3100000000000000000000000"),
    inWalletRaw: BigInt("2100000000000000000"),
    price: 2860.125,
    priceDecimals: 8,
    supplyApy: 0.0384,
    utilization: 0.4945,
    note: "Negative decimals trigger hard errors for token amount and USD formatting.",
  },
  {
    id: "invalid-price-metadata",
    name: "WBTC Invalid Price Metadata",
    chain: "Arbitrum",
    symbol: "WBTC",
    decimals: 8,
    totalSupplyRaw: BigInt("9876543210000"),
    inWalletRaw: BigInt("12345678"),
    price: "",
    priceDecimals: "8.5",
    supplyApy: 425,
    supplyApyMultiplier: 1,
    supplyApyDivider: 10000,
    utilization: 0.7345,
    note: "Malformed price metadata (empty price + non-integer decimals string).",
  },
  {
    id: "long-symbol-compact",
    name: "Long Symbol Compact Showcase",
    chain: "Ethereum",
    symbol: "SUPER-LONG-LIQUID-STAKED-TOKEN-2026",
    decimals: 18,
    totalSupplyRaw: BigInt("987654321012345678901234567890123456"),
    inWalletRaw: BigInt("123450000000000000"),
    price: 0.004321,
    priceDecimals: 8,
    supplyApy: 0.00495,
    utilization: 0.0008,
    note: "Long symbol + huge supply; tiny utilization triggers below-min display indicator.",
  },
  {
    id: "query-error-overrides-wallet-warning",
    name: "LDO Wallet Query Error Override",
    chain: "Ethereum",
    symbol: "LDO",
    decimals: 18,
    totalSupplyRaw: BigInt("620000000000000000000000"),
    inWalletRaw: null,
    price: 2.34,
    priceDecimals: 8,
    supplyApy: 0.051,
    utilization: 0.691,
    inWalletAmountQueryState: {
      isError: true,
      errorMessage: "Wallet RPC failed after missing-value warning.",
    },
    note: "In-wallet null payload creates warning, then query hard error intentionally overrides it.",
  },
  {
    id: "symbol-type-invalid",
    name: "COMP Invalid Symbol Type",
    chain: "Ethereum",
    symbol: 12345,
    decimals: 18,
    totalSupplyRaw: BigInt("54000000000000000000000"),
    inWalletRaw: BigInt("640000000000000000"),
    price: 58.42,
    priceDecimals: 8,
    supplyApy: { apy: 0.019 },
    utilization: 0.255,
    note: "Token symbol and APY payload types are invalid (unsupported runtime types).",
  },
]

/**
 * Simulates backend latency so loading and skeleton states are visible.
 * Used by the mock query function to mimic a real HTTP request.
 */
async function sleepMs(ms: number): Promise<void> {
  await new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

/**
 * Returns a fresh clone of static mock vault seed data.
 * The clone prevents accidental mutation from mapper/UI layers.
 */
function buildMockVaultSeeds(): MockVaultSeed[] {
  return MOCK_VAULT_SEEDS.map((seed) => ({ ...seed }))
}

/**
 * Creates query options for mocked vault seeds.
 * Uses lowSensitiveQuery cache profile because this dataset is stable demo content.
 */
export const getMockVaultSeedsQuery = (settings: FetchMockVaultSeedsSettings = {}) => {
  const latencyMs = settings.latencyMs ?? DEFAULT_LATENCY_MS

  return {
    queryKey: ["mockVaultSeeds", "v1", latencyMs] as const,
    queryFn: async () => {
      await sleepMs(latencyMs)
      return buildMockVaultSeeds()
    },
    ...queryConfig.lowSensitiveQuery,
  }
}

/**
 * Fetches mocked vault seed rows via QueryClient cache layer.
 * Returns raw seed data; mapper formats and enriches it for UI display.
 */
export async function fetchMockVaultSeeds(
  settings: FetchMockVaultSeedsSettings = {},
): Promise<MockVaultSeed[]> {
  return getQueryClient().fetchQuery(getMockVaultSeedsQuery(settings))
}
