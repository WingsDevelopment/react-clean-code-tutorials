import { Address, erc20Abi } from "viem"
import { readContractQueryOptions } from "wagmi/query"

import { getQueryClient } from "@app/providers"
import { queryConfig } from "@app/config/query-config"
import { getWagmiConfig, targetChain } from "@/wagmi"

export interface SymbolFetchOptions {
  simulateError?: boolean
}

/**
 * Query options for fetching ERC20 token symbol.
 * Uses metaDataQuery cache (infinite stale time) since symbols are immutable.
 */
export const getTokenSymbolQuery = (token: Address) => ({
  ...readContractQueryOptions(getWagmiConfig(), {
    abi: erc20Abi,
    address: token,
    chainId: targetChain.id,
    functionName: "symbol",
  }),
  // cached forever
  ...queryConfig.metaDataQuery,
})

/**
 * Fetches the symbol for an ERC20 token (e.g., "USDC", "WETH").
 * Cached indefinitely since token symbols never change.
 */
export async function fetchTokenSymbol(
  token: Address,
  options?: SymbolFetchOptions,
): Promise<string> {
  if (options?.simulateError) {
    throw new Error("Simulated RPC error: symbol")
  }
  return getQueryClient().fetchQuery(getTokenSymbolQuery(token))
}
