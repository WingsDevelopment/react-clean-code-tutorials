import { Address, erc20Abi } from "viem"
import { readContractQueryOptions } from "wagmi/query"

import { getQueryClient } from "@app/providers"
import { queryConfig } from "@app/config/query-config"
import { getWagmiConfig, targetChain } from "@/wagmi"

export interface BalanceFetchOptions {
  simulateError?: boolean
}

/**
 * Query options for fetching ERC20 token balance.
 * Uses walletQuery cache (15 min stale time) since balances change with user activity.
 */
export const getTokenBalanceQuery = (token: Address, account: Address) => ({
  ...readContractQueryOptions(getWagmiConfig(), {
    abi: erc20Abi,
    address: token,
    chainId: targetChain.id,
    functionName: "balanceOf",
    args: [account],
  }),
  // cached for 15 mins
  ...queryConfig.walletQuery,
})

/**
 * Fetches the token balance for a given account.
 * Returns raw bigint value - use mapper for formatting.
 */
export async function fetchTokenBalance(
  token: Address,
  account: Address,
  options?: BalanceFetchOptions,
): Promise<bigint> {
  if (options?.simulateError) {
    throw new Error("Simulated RPC error: balanceOf")
  }
  return getQueryClient().fetchQuery(getTokenBalanceQuery(token, account))
}
