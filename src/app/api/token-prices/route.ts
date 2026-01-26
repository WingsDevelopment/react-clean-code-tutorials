import { NextRequest, NextResponse } from "next/server"
import axios from "axios"
import { getQueryClient } from "@app/query-client"
import { queryConfig } from "@app/config/query-config"

export const PRICE_PRECISION = 8

type RawTokenPrices = Record<string, { usd: number }>

async function fetchFromCoinGecko(addresses: string): Promise<RawTokenPrices> {
  console.log("Calling [fetchFromCoinGecko] with addresses:", addresses)
  const apiKey = process.env.COINGECKO_API_KEY

  if (!apiKey) {
    throw new Error("API key not configured")
  }

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
        "x-cg-demo-api-key": apiKey,
      },
    },
  )

  return data
}

const getServerTokenPricesQuery = (addresses: string) => ({
  // in this particular case, we could cache each address separately for better cache hits - but its good enough for example purposes
  queryKey: ["serverTokenPrices", addresses] as const,
  queryFn: () => fetchFromCoinGecko(addresses),
  ...queryConfig.priceQuery,
})

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const addresses = searchParams.get("addresses")

  if (!addresses) {
    return NextResponse.json({ error: "Missing addresses parameter" }, { status: 400 })
  }

  try {
    // Normalize addresses for consistent cache keys
    const normalizedAddresses = addresses
      .split(",")
      .map((a) => a.toLowerCase())
      .sort()
      .join(",")

    const data = await getQueryClient().fetchQuery(getServerTokenPricesQuery(normalizedAddresses))

    return NextResponse.json(data)
  } catch (error) {
    console.error("CoinGecko API error:", error)

    if (error instanceof Error && error.message === "API key not configured") {
      return NextResponse.json({ error: "API key not configured" }, { status: 500 })
    }

    return NextResponse.json({ error: "Failed to fetch token prices" }, { status: 502 })
  }
}
