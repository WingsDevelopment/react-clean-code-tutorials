import { Address, formatUnits } from "viem"
import { formatNumberToViewNumber, type ViewNumber } from "web3-robust-formatting"

import { safeCall, SafeResult } from "@app/lib/utils/safe-call"
import {
  tokenPricesMapper,
  DisplayTokenPrices,
} from "@app/data/common/token-price/token-price.mapper"
import { balanceMapper, DisplayBalance } from "../balance/balance.mapper"

export interface DisplayBalances {
  balances: DisplayBalance[]
  totalValueUsd: SafeResult<ViewNumber | undefined>
}

export interface BalancesMapperOptions {
  simulateRpcError?: boolean
  simulatePriceError?: boolean
}

/**
 * Calculates total USD value from balances and prices.
 * Converts each balance to USD using price data and sums.
 */
function calculateTotalValue(
  balances: DisplayBalance[],
  prices?: DisplayTokenPrices,
): ViewNumber | undefined {
  let total = 0

  if (!prices) return undefined

  for (const balance of balances) {
    const price = prices[balance.address]?.rawPrice ?? 0
    const humanBalance = Number(formatUnits(balance.rawBalance, balance.decimals))
    total += humanBalance * price
  }

  return formatNumberToViewNumber(total)
}

/**
 * Fetches and formats balances for multiple tokens with total USD value.
 * - Fetches each token's balance, symbol, and decimals in parallel
 * - Fetches prices via safeCall (graceful failure)
 * - Calculates total USD if prices available, otherwise returns error
 */
export async function balancesMapper(params: {
  tokens: Address[]
  account: Address
  options?: BalancesMapperOptions
}): Promise<DisplayBalances> {
  const { tokens, account, options } = params

  const [balances, pricesResult] = await Promise.all([
    // Let wagmi batch these RPC calls
    // If this fails, the whole mapper fails in this case
    Promise.all(tokens.map((token) => balanceMapper({ token, account, options }))),

    // Different source of data (http fetch), so safe call
    // If this fails, we can still show balances
    safeCall(() => tokenPricesMapper({ tokens, options })),
  ])

  const totalValueUsd: SafeResult<ViewNumber | undefined> = pricesResult.error
    ? { data: undefined, error: pricesResult.error }
    : { data: calculateTotalValue(balances, pricesResult.data), error: undefined }

  return { balances, totalValueUsd }
}
