import {
  mergeRobustDiagnostics,
  robustCalculateTokenValue,
  robustFormatBigIntToViewNumber,
  robustFormatBigIntToViewTokenAmount,
  robustFormatPercentToViewPercent,
  type RobustFormattingResult,
} from "web3-robust-formatting"

import { safeCall } from "@app/lib/utils/safe-call"
import { fetchMockVaultSeeds } from "./vaults.fetch"
import type {
  MockVaultDisplayRow,
  MockVaultSeed,
  PercentDisplay,
  TokenAmountDisplay,
  TokenValueDisplay,
  VaultsMapperResult,
} from "./vaults.types"

export interface VaultsMapperSettings {
  dataSource: "mock"
  latencyMs?: number
}

const DEFAULT_MAPPER_SETTINGS: VaultsMapperSettings = {
  dataSource: "mock",
  latencyMs: 500,
}

/**
 * Builds an empty robust payload carrying a hard error message.
 * Used as mapper fallback when a row-level transformation fails.
 */
function createErrorDisplay<T>(message: string): RobustFormattingResult<T> {
  return {
    value: undefined,
    warnings: [],
    errors: [message],
  }
}

/**
 * Calculates USD value from token amount + price and formats it for rendering.
 * Merges diagnostics from calc + format stages to keep the UI payload complete.
 */
function formatUsdFromTokenAmount(params: {
  context: string
  tokenAmount: unknown
  tokenDecimals: unknown
  tokenPrice: unknown
  tokenPriceDecimals: unknown
}): TokenValueDisplay {
  const { context, tokenAmount, tokenDecimals, tokenPrice, tokenPriceDecimals } = params

  const calcResult = robustCalculateTokenValue({
    context: `${context}.calculate`,
    input: {
      tokenAmount,
      tokenPrice,
      tokenDecimals,
      tokenPriceDecimals,
    },
  })

  const formattedResult = robustFormatBigIntToViewNumber({
    context: `${context}.format`,
    input: {
      bigIntValue: calcResult.value?.tokenValueRaw,
      decimals: calcResult.value?.tokenValueDecimals,
      symbol: "$",
    },
    options: {
      standardDecimals: 2,
      compactDecimals: 2,
      minDisplay: 0.01,
      maxDisplay: 10_000_000_000,
    },
  })

  const diagnostics = mergeRobustDiagnostics(calcResult, formattedResult)

  return {
    value: formattedResult.value,
    warnings: diagnostics.warnings,
    errors: diagnostics.errors,
  }
}

/**
 * Maps a single raw vault seed into a fully formatted display row.
 * Uses safeCall around USD formatting so one failing calculation does not drop the row.
 */
async function mapVaultSeedToDisplayRow(seed: MockVaultSeed): Promise<MockVaultDisplayRow> {
  const baseContext = `mockVaults.${seed.id}`

  const supplyApy = robustFormatPercentToViewPercent({
    context: `${baseContext}.supplyApy`,
    input: { value: seed.supplyApy },
    multiplier: seed.supplyApyMultiplier ?? 1,
    divider: seed.supplyApyDivider ?? 1,
    options: {
      standardDecimals: 2,
      compactDecimals: 2,
      minDisplay: 0.01,
      maxDisplay: 500,
    },
  })

  const utilization = robustFormatPercentToViewPercent({
    context: `${baseContext}.utilization`,
    input: { value: seed.utilization },
    options: {
      standardDecimals: 2,
      compactDecimals: 2,
      minDisplay: 0.01,
      maxDisplay: 100,
    },
  })

  const totalSupplyAmount = robustFormatBigIntToViewTokenAmount({
    context: `${baseContext}.totalSupply.amount`,
    input: {
      bigIntValue: seed.totalSupplyRaw,
      symbol: seed.symbol,
      decimals: seed.decimals,
    },
    requiredFields: ["decimals"],
  })

  const inWalletAmount = robustFormatBigIntToViewTokenAmount({
    context: `${baseContext}.inWallet.amount`,
    input: {
      bigIntValue: seed.inWalletRaw,
      symbol: seed.symbol,
      decimals: seed.decimals,
    },
    requiredFields: ["decimals"],
  })

  const [totalSupplyUsdResult, inWalletUsdResult] = await Promise.all([
    safeCall(async () =>
      formatUsdFromTokenAmount({
        context: `${baseContext}.totalSupply.usd`,
        tokenAmount: seed.totalSupplyRaw,
        tokenDecimals: seed.decimals,
        tokenPrice: seed.price,
        tokenPriceDecimals: seed.priceDecimals,
      }),
    ),
    safeCall(async () =>
      formatUsdFromTokenAmount({
        context: `${baseContext}.inWallet.usd`,
        tokenAmount: seed.inWalletRaw,
        tokenDecimals: seed.decimals,
        tokenPrice: seed.price,
        tokenPriceDecimals: seed.priceDecimals,
      }),
    ),
  ])

  const totalSupplyUsd =
    totalSupplyUsdResult.data ??
    createErrorDisplay(
      `Total supply USD mapping failed: ${
        totalSupplyUsdResult.error?.message ?? "Unknown mapper error."
      }`,
    )

  const inWalletUsd =
    inWalletUsdResult.data ??
    createErrorDisplay(
      `In wallet USD mapping failed: ${inWalletUsdResult.error?.message ?? "Unknown mapper error."}`,
    )

  return {
    id: seed.id,
    name: seed.name,
    chain: seed.chain,
    note: seed.note,
    supplyApy,
    supplyApyQueryState: seed.supplyApyQueryState,
    totalSupplyAmount,
    totalSupplyAmountQueryState: seed.totalSupplyAmountQueryState,
    totalSupplyUsd,
    totalSupplyUsdQueryState: seed.totalSupplyUsdQueryState,
    utilization,
    utilizationQueryState: seed.utilizationQueryState,
    inWalletAmount,
    inWalletAmountQueryState: seed.inWalletAmountQueryState,
    inWalletUsd,
    inWalletUsdQueryState: seed.inWalletUsdQueryState,
  }
}

/**
 * Creates a fallback row when mapping throws unexpectedly.
 * Keeps table shape stable while surfacing mapper failure diagnostics in each cell.
 */
function createFallbackRowFromMapperError(seed: MockVaultSeed, error?: Error): MockVaultDisplayRow {
  const message = `Vault mapper failed for ${seed.id}: ${error?.message ?? "Unknown error."}`
  const percentError: PercentDisplay = createErrorDisplay(message)
  const tokenAmountError: TokenAmountDisplay = createErrorDisplay(message)
  const tokenValueError: TokenValueDisplay = createErrorDisplay(message)

  return {
    id: seed.id,
    name: seed.name,
    chain: seed.chain,
    note: `${seed.note} Mapper fallback: ${message}`,
    supplyApy: percentError,
    supplyApyQueryState: { isError: true, errorMessage: message, error },
    totalSupplyAmount: tokenAmountError,
    totalSupplyAmountQueryState: { isError: true, errorMessage: message, error },
    totalSupplyUsd: tokenValueError,
    totalSupplyUsdQueryState: { isError: true, errorMessage: message, error },
    utilization: percentError,
    utilizationQueryState: { isError: true, errorMessage: message, error },
    inWalletAmount: tokenAmountError,
    inWalletAmountQueryState: { isError: true, errorMessage: message, error },
    inWalletUsd: tokenValueError,
    inWalletUsdQueryState: { isError: true, errorMessage: message, error },
  }
}

/**
 * Fetches raw mock seeds and maps them into UI-ready vault rows.
 * Keeps partial resilience by safe-calling each row map and falling back per-row.
 */
export async function vaultsMapper(params?: {
  settings?: Partial<VaultsMapperSettings>
}): Promise<VaultsMapperResult> {
  const settings: VaultsMapperSettings = {
    ...DEFAULT_MAPPER_SETTINGS,
    ...(params?.settings ?? {}),
    dataSource: "mock",
  }

  const seeds = await fetchMockVaultSeeds({
    latencyMs: settings.latencyMs,
  })

  if (!seeds.length) {
    return { rows: [] }
  }

  const rowsResult = await Promise.all(
    seeds.map((seed) => safeCall(async () => mapVaultSeedToDisplayRow(seed))),
  )

  const rows = rowsResult.map((result, index) => {
    if (result.data) {
      return result.data
    }

    return createFallbackRowFromMapperError(seeds[index], result.error)
  })

  return { rows }
}
