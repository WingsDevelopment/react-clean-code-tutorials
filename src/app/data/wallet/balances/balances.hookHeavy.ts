import { useMemo } from "react"
import { useQueries, useQuery } from "@tanstack/react-query"
import { Address, formatUnits } from "viem"
import {
  formatBigIntToViewTokenAmount,
  formatNumberToViewNumber,
  type ViewBigInt,
  type ViewNumber,
} from "web3-robust-formatting"

import { fetchTokenBalance } from "../balance/balance.fetch"
import { fetchTokenSymbol } from "@app/data/common/token/symbol/symbol.fetch"
import { fetchTokenDecimals } from "@app/data/common/token/decimals/decimals.fetch"
import { fetchTokenPrices } from "@app/data/common/token-price/token-price.fetch"
import { queryConfig } from "@app/config/query-config"
import {
  DisplayTokenPrices,
  transformRawPrices,
} from "@app/data/common/token-price/token-price.mapper"

export interface DisplayBalance {
  address: Address
  balanceFormatted: ViewBigInt | undefined
  rawBalance: bigint
  symbol: string
  decimals: number
}

export interface UseDisplayBalancesResult {
  balances: DisplayBalance[]
  totalValueUsd: ViewNumber | undefined
  isBalancesLoading: boolean
  isBalancesError: boolean
  isPriceLoading: boolean
  isPriceError: boolean
  priceError: Error | null
}

export interface SimulationSettings {
  simulateLoading?: boolean
  simulatePriceError?: boolean
  simulateRpcError?: boolean
}

/**
 * Hook version of token prices - uses fetch function with simulation support.
 */
function useTokenPrices(tokens: Address[] | undefined, simulateError?: boolean) {
  const query = useQuery({
    queryKey: ["tokenPrices", tokens, { simulateError }] as const,
    queryFn: () => fetchTokenPrices(tokens!, { simulateError }),
    enabled: Boolean(tokens && tokens.length > 0),
    ...queryConfig.priceQuery,
  })

  const data = useMemo(() => {
    if (!tokens || !query.data) return undefined
    return transformRawPrices(tokens, query.data)
  }, [tokens, query.data])

  return { ...query, data }
}

/**
 * Calculates total USD value from balances and prices.
 */
function calculateTotalValue(
  balances: DisplayBalance[],
  prices?: DisplayTokenPrices,
): ViewNumber | undefined {
  if (!prices || balances.length === 0) return undefined

  let total = 0

  for (const balance of balances) {
    const price = prices[balance.address]?.rawPrice ?? 0
    const humanBalance = Number(formatUnits(balance.rawBalance, balance.decimals))
    total += humanBalance * price
  }

  return formatNumberToViewNumber(total)
}

/**
 * Hooks-based implementation of balances fetching.
 * Uses useQueries to fetch multiple balances in parallel,
 * composes with useTokenPrices, and derives loading/error states.
 */
export function useDisplayBalancesWithHooks(
  tokens: Address[] | undefined,
  account: Address | undefined,
  settings: SimulationSettings = {},
): UseDisplayBalancesResult {
  const { simulateLoading, simulatePriceError, simulateRpcError } = settings
  const enabled = Boolean(tokens?.length && account)

  // Fetch all balance data using useQueries (parallel queries for each token)
  const balanceQueries = useQueries({
    queries: (tokens ?? []).map((token) => ({
      queryKey: ["balance", token, account, { simulateRpcError }] as const,
      queryFn: () => fetchTokenBalance(token, account!, { simulateError: simulateRpcError }),
      enabled,
      ...queryConfig.walletQuery,
    })),
  })

  const symbolQueries = useQueries({
    queries: (tokens ?? []).map((token) => ({
      queryKey: ["symbol", token, { simulateRpcError }] as const,
      queryFn: () => fetchTokenSymbol(token, { simulateError: simulateRpcError }),
      enabled: Boolean(token),
      ...queryConfig.metaDataQuery,
    })),
  })

  const decimalsQueries = useQueries({
    queries: (tokens ?? []).map((token) => ({
      queryKey: ["decimals", token, { simulateRpcError }] as const,
      queryFn: () => fetchTokenDecimals(token, { simulateError: simulateRpcError }),
      enabled: Boolean(token),
      ...queryConfig.metaDataQuery,
    })),
  })

  // Fetch prices
  const pricesQuery = useTokenPrices(tokens, simulatePriceError)

  // Derive loading state for balances only (not prices)
  const isBalanceQueriesLoading = balanceQueries.some((q) => q.isLoading)
  const isSymbolsLoading = symbolQueries.some((q) => q.isLoading)
  const isDecimalsLoading = decimalsQueries.some((q) => q.isLoading)
  const isBalancesLoading =
    simulateLoading || isBalanceQueriesLoading || isSymbolsLoading || isDecimalsLoading

  // Derive error state for balances only (not prices)
  const hasBalanceErrors = balanceQueries.some((q) => q.error)
  const hasSymbolErrors = symbolQueries.some((q) => q.error)
  const hasDecimalsErrors = decimalsQueries.some((q) => q.error)
  const isBalancesError = hasBalanceErrors || hasSymbolErrors || hasDecimalsErrors

  // Price loading/error is separate
  const isPriceLoading = pricesQuery.isLoading
  const isPriceError = Boolean(pricesQuery.error)
  const priceError = pricesQuery.error as Error | null

  // Build display balances from successful queries
  const balances = useMemo((): DisplayBalance[] => {
    if (!tokens) return []

    return tokens
      .map((token, index) => {
        const rawBalance = balanceQueries[index]?.data
        const symbol = symbolQueries[index]?.data
        const decimals = decimalsQueries[index]?.data

        if (rawBalance === undefined || !symbol || decimals === undefined) {
          return null
        }

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
      })
      .filter((b): b is DisplayBalance => b !== null)
  }, [tokens, balanceQueries, symbolQueries, decimalsQueries])

  // Calculate total USD value when all data is ready (but not if price error)
  const totalValueUsd = useMemo(() => {
    if (isBalancesLoading || pricesQuery.isLoading || pricesQuery.isError || balances.length === 0) {
      return undefined
    }
    return calculateTotalValue(balances, pricesQuery.data)
  }, [isBalancesLoading, pricesQuery.isLoading, pricesQuery.isError, balances, pricesQuery.data])

  return {
    balances,
    totalValueUsd,
    isBalancesLoading,
    isBalancesError,
    isPriceLoading,
    isPriceError,
    priceError,
  }
}
