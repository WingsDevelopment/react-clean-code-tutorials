import { useQuery } from "@tanstack/react-query"
import type { Address } from "viem"

import { queryConfig } from "@app/config/query-config"
import { tokenPricesMapper } from "./token-price.mapper"

export function useTokenPrices(tokens?: Address[]) {
  return useQuery({
    queryKey: ["useTokenPrices", ...(tokens ?? [])] as const,
    queryFn: () => tokenPricesMapper({ tokens: tokens! }),
    enabled: Boolean(tokens && tokens.length > 0),
    ...queryConfig.hookQuery,
  })
}
