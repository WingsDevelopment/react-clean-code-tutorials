import { Address } from "viem"
import { formatBigIntToViewTokenAmount, ViewBigInt } from "react-display-value"

import { fetchTokenBalance } from "./balance.fetch"
import { fetchTokenDecimals } from "@app/data/common/token/decimals/decimals.fetch"
import { fetchTokenSymbol } from "@app/data/common/token/symbol/symbol.fetch"

export interface DisplayBalance {
  address: Address
  balanceFormatted: ViewBigInt | undefined
  rawBalance: bigint
  symbol: string
  decimals: number
}

export interface BalanceMapperOptions {
  simulateRpcError?: boolean
}

/**
 * Fetches token balance with metadata (symbol, decimals) and formats for display.
 * Parallel fetches balance, symbol, and decimals for a single token.
 */
export async function balanceMapper(params: {
  token: Address
  account: Address
  options?: BalanceMapperOptions
}): Promise<DisplayBalance> {
  const { token, account, options } = params
  const fetchOptions = { simulateError: options?.simulateRpcError }

  const [rawBalance, symbol, decimals] = await Promise.all([
    // cached for 15 mins:
    fetchTokenBalance(token, account, fetchOptions),
    // cached forever:
    fetchTokenSymbol(token, fetchOptions),
    fetchTokenDecimals(token, fetchOptions),
  ])

  return {
    address: token,
    balanceFormatted: formatBigIntToViewTokenAmount({
      bigIntValue: rawBalance,
      symbol,
      decimals,
    }),
    rawBalance,
    symbol,
    decimals,
  }
}
