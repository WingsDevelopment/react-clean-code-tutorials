import { Address } from "viem"
import { formatNumberToViewNumber, ViewNumber } from "react-display-value"

import { fetchTokenPrices, PRICE_PRECISION, RawTokenPrices } from "./token-price.fetch"

export interface TokenPrice {
  address: Address
  priceFormatted: ViewNumber | undefined
  rawPrice: number
  source: string
  precision: number
}

export type DisplayTokenPrices = Record<string, TokenPrice>

export function transformRawPrices(tokens: Address[], rawPrices: RawTokenPrices): DisplayTokenPrices {
  const result: DisplayTokenPrices = {}

  for (const token of tokens) {
    const key = token.toLowerCase()
    const price = rawPrices[key]?.usd ?? 0

    result[token] = {
      address: token,
      priceFormatted: formatNumberToViewNumber(price),
      rawPrice: price,
      precision: PRICE_PRECISION,
      source: "coingecko",
    }
  }

  return result
}

export interface TokenPricesMapperOptions {
  simulatePriceError?: boolean
}

export async function tokenPricesMapper(params: {
  tokens: Address[]
  options?: TokenPricesMapperOptions
}): Promise<DisplayTokenPrices> {
  const { tokens, options } = params
  if (!tokens?.length) return {}

  const rawPrices = await fetchTokenPrices(tokens, { simulateError: options?.simulatePriceError })
  return transformRawPrices(tokens, rawPrices)
}
