import { Address, erc20Abi } from "viem"
import { readContractQueryOptions } from "wagmi/query"

import { getQueryClient } from "@app/providers"
import { queryConfig } from "@app/config/query-config"
import { getWagmiConfig, targetChain } from "@/wagmi"

export interface DecimalsFetchOptions {
  simulateError?: boolean
}

/**
 * Query options for fetching ERC20 token decimals.
 * Uses metaDataQuery cache (infinite stale time) since decimals are immutable.
 */
export const getTokenDecimalsQuery = (token: Address) => ({
  ...readContractQueryOptions(getWagmiConfig(), {
    abi: erc20Abi,
    address: token,
    chainId: targetChain.id,
    functionName: "decimals",
  }),
  // cached forever
  ...queryConfig.metaDataQuery,
})

/**
 * Fetches the decimals for an ERC20 token.
 * Cached indefinitely since token decimals never change.
 */
export async function fetchTokenDecimals(
  token: Address,
  options?: DecimalsFetchOptions,
): Promise<number> {
  if (options?.simulateError) {
    throw new Error("Simulated RPC error: decimals")
  }
  return getQueryClient().fetchQuery(getTokenDecimalsQuery(token))
}
