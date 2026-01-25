import axios from "axios"
import { Address } from "viem"

import { getQueryClient } from "@app/providers"
import { queryConfig } from "@app/config/query-config"

export const PRICE_PRECISION = 8

export type RawTokenPrices = Record<string, { usd: number }>

async function fetchTokenPricesRaw(tokens: Address[]): Promise<RawTokenPrices> {
  const addresses = tokens.map((a) => a.toLowerCase()).join(",")

  const { data } = await axios.get<RawTokenPrices>(
    "https://api.coingecko.com/api/v3/simple/token_price/base",
    {
      params: {
        contract_addresses: addresses,
        vs_currencies: "usd",
        precision: PRICE_PRECISION,
      },
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": process.env.NEXT_PUBLIC_COINGECKO_API_KEY ?? "",
      },
    },
  )

  return data
}

export interface PriceFetchOptions {
  simulateError?: boolean
}

export const getTokenPricesQuery = (tokens: Address[]) => ({
  queryKey: ["fetchTokenPrices", ...tokens] as const,
  queryFn: () => fetchTokenPricesRaw(tokens),
  ...queryConfig.priceQuery,
})

export async function fetchTokenPrices(
  tokens: Address[],
  options?: PriceFetchOptions,
): Promise<RawTokenPrices> {
  if (options?.simulateError) {
    throw new Error("Simulated price fetch error")
  }
  return getQueryClient().fetchQuery(getTokenPricesQuery(tokens))
}
