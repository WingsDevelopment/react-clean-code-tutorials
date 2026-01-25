import { NextRequest, NextResponse } from "next/server"
import axios from "axios"

export const PRICE_PRECISION = 8

type RawTokenPrices = Record<string, { usd: number }>

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const addresses = searchParams.get("addresses")

  if (!addresses) {
    return NextResponse.json(
      { error: "Missing addresses parameter" },
      { status: 400 },
    )
  }

  const apiKey = process.env.COINGECKO_API_KEY

  if (!apiKey) {
    return NextResponse.json(
      { error: "API key not configured" },
      { status: 500 },
    )
  }

  try {
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

    return NextResponse.json(data)
  } catch (error) {
    console.error("CoinGecko API error:", error)
    return NextResponse.json(
      { error: "Failed to fetch token prices" },
      { status: 502 },
    )
  }
}
