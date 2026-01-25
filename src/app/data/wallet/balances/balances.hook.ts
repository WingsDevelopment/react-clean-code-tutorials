import { useQuery } from "@tanstack/react-query"
import type { Address } from "viem"

import { queryConfig } from "@app/config/query-config"
import { balancesMapper, BalancesMapperOptions } from "./balances.mapper"

/**
 * Reactive wrapper for balancesMapper.
 * Returns formatted balances array + total USD value for UI.
 */
export function useDisplayBalances(
  tokens?: Address[],
  account?: Address,
  options?: BalancesMapperOptions,
) {
  return useQuery({
    queryKey: ["useDisplayBalances", tokens, account, options] as const,
    queryFn: () => balancesMapper({ tokens: tokens!, account: account!, options }),
    enabled: Boolean(tokens?.length) && Boolean(account),
    ...queryConfig.hookQuery,
  })
}
