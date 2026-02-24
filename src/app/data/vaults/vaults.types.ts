import type { QueryResponse } from "web3-display-components"
import type {
  RobustFormattingResult,
  ViewBigInt,
  ViewNumber,
  ViewPercent,
} from "web3-robust-formatting"

export type TokenAmountDisplay = RobustFormattingResult<ViewBigInt | ViewNumber | undefined>
export type TokenValueDisplay = RobustFormattingResult<ViewNumber | undefined>
export type PercentDisplay = RobustFormattingResult<ViewPercent | undefined>

export interface MockVaultSeed {
  id: string
  name: string
  chain: string
  symbol: unknown
  decimals: unknown
  totalSupplyRaw: unknown
  inWalletRaw: unknown
  price: unknown
  priceDecimals: unknown
  supplyApy: unknown
  utilization: unknown
  supplyApyMultiplier?: unknown
  supplyApyDivider?: unknown
  supplyApyQueryState?: QueryResponse
  totalSupplyAmountQueryState?: QueryResponse
  totalSupplyUsdQueryState?: QueryResponse
  utilizationQueryState?: QueryResponse
  inWalletAmountQueryState?: QueryResponse
  inWalletUsdQueryState?: QueryResponse
  note: string
}

export interface MockVaultDisplayRow {
  id: string
  name: string
  chain: string
  note: string
  supplyApy: PercentDisplay
  supplyApyQueryState?: QueryResponse
  totalSupplyAmount: TokenAmountDisplay
  totalSupplyAmountQueryState?: QueryResponse
  totalSupplyUsd: TokenValueDisplay
  totalSupplyUsdQueryState?: QueryResponse
  utilization: PercentDisplay
  utilizationQueryState?: QueryResponse
  inWalletAmount: TokenAmountDisplay
  inWalletAmountQueryState?: QueryResponse
  inWalletUsd: TokenValueDisplay
  inWalletUsdQueryState?: QueryResponse
}

export interface VaultsMapperResult {
  rows: MockVaultDisplayRow[]
}
