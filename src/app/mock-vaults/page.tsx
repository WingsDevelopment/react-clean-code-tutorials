"use client"

import type { QueryResponse } from "web3-display-components"
import {
  mergeRobustDiagnostics,
  robustCalculateTokenValue,
  robustFormatBigIntToViewNumber,
  robustFormatBigIntToViewTokenAmount,
  robustFormatPercentToViewPercent,
} from "web3-robust-formatting"
import type { ViewNumber } from "web3-robust-formatting"
import { DisplayPercentageField, DisplayTokenAmountField } from "@/app/components/display-fields"

type RobustDisplayPayload<T> = {
  value?: T
  warnings?: string[]
  errors?: string[]
}

type VaultSeed = {
  id: string
  name: string
  chain: string
  symbol: unknown
  decimals: unknown
  totalSupplyRaw: unknown
  inWalletRaw: unknown
  price: unknown
  priceDecimals: unknown
  supplyApy: unknown
  utilization: unknown
  supplyApyMultiplier?: unknown
  supplyApyDivider?: unknown
  supplyApyQueryState?: QueryResponse
  totalSupplyUsdQueryState?: QueryResponse
  inWalletAmountQueryState?: QueryResponse
  inWalletUsdQueryState?: QueryResponse
  note: string
}

type VaultDisplayRow = {
  id: string
  name: string
  chain: string
  note: string
  supplyApy: ReturnType<typeof robustFormatPercentToViewPercent>
  supplyApyQueryState?: QueryResponse
  totalSupplyAmount: ReturnType<typeof robustFormatBigIntToViewTokenAmount>
  totalSupplyUsd: RobustDisplayPayload<ViewNumber>
  totalSupplyUsdQueryState?: QueryResponse
  utilization: ReturnType<typeof robustFormatPercentToViewPercent>
  inWalletAmount: ReturnType<typeof robustFormatBigIntToViewTokenAmount>
  inWalletAmountQueryState?: QueryResponse
  inWalletUsd: RobustDisplayPayload<ViewNumber>
  inWalletUsdQueryState?: QueryResponse
}

const VAULT_SEEDS: VaultSeed[] = [
  {
    id: "usdc-prime",
    name: "USDC Prime Vault",
    chain: "Ethereum",
    symbol: "USDC",
    decimals: 6,
    totalSupplyRaw: BigInt("4250000000000"),
    inWalletRaw: BigInt("12450000000"),
    price: 1,
    priceDecimals: 8,
    supplyApy: 0.0412,
    utilization: 0.6723,
    note: "Healthy baseline; all values clean.",
  },
  {
    id: "link-subgraph-coercions",
    name: "LINK Subgraph Coercions",
    chain: "Ethereum",
    symbol: "LINK",
    decimals: "18",
    totalSupplyRaw: "525000000000000000000000",
    inWalletRaw: "3200000000000000000",
    price: "17.245",
    priceDecimals: "8",
    supplyApy: "0.0535",
    utilization: "0.7135",
    note: "Subgraph/string payload coercions produce warnings.",
  },
  {
    id: "wallet-token-not-found",
    name: "AAVE Wallet Token Not Found",
    chain: "Ethereum",
    symbol: "AAVE",
    decimals: 18,
    totalSupplyRaw: BigInt("210000000000000000000000"),
    inWalletRaw: { raw: "123" },
    price: 122.43,
    priceDecimals: 8,
    supplyApy: 0.0215,
    utilization: 0.3822,
    inWalletUsdQueryState: {
      isError: true,
      errorMessage: "Token not found in wallet service response.",
    },
    note: 'In wallet amount is malformed object (unsupported runtime type "object").',
  },
  {
    id: "apy-third-party-down",
    name: "OP APY Provider Down",
    chain: "Optimism",
    symbol: "OP",
    decimals: 18,
    totalSupplyRaw: BigInt("1765432100000000000000000"),
    inWalletRaw: BigInt("444000000000000000"),
    price: 3.41,
    priceDecimals: 8,
    supplyApy: 0.032,
    utilization: 0.6042,
    supplyApyQueryState: {
      isError: true,
      errorMessage: "3rd-party APY provider timed out for this vault.",
    },
    note: "APY query failed while amount/value fields still load successfully.",
  },
  {
    id: "usd-price-api-down",
    name: "ARB Price API Down",
    chain: "Arbitrum",
    symbol: "ARB",
    decimals: 18,
    totalSupplyRaw: BigInt("8765432100000000000000000"),
    inWalletRaw: BigInt("2340000000000000000"),
    price: 0.91,
    priceDecimals: 8,
    supplyApy: 0.0675,
    utilization: 0.5631,
    totalSupplyUsdQueryState: {
      isError: true,
      errorMessage: "Price API unavailable for ARB, retry in a few seconds.",
    },
    note: "USD value query is down, but token amount and utilization are still visible.",
  },
  {
    id: "wallet-amount-undefined",
    name: "MKR Wallet Missing Amount",
    chain: "Ethereum",
    symbol: "MKR",
    decimals: 18,
    totalSupplyRaw: BigInt("74500000000000000000000"),
    inWalletRaw: undefined,
    price: 2480.77,
    priceDecimals: 8,
    supplyApy: 0.0142,
    utilization: 1.327,
    note: "In wallet amount is undefined and utilization exceeds 100% (above-max indicator).",
  },
  {
    id: "wallet-amount-empty-string",
    name: "UNI Wallet Empty String",
    chain: "Base",
    symbol: "UNI",
    decimals: 18,
    totalSupplyRaw: BigInt("300000000000000000000000"),
    inWalletRaw: "",
    price: 13.11,
    priceDecimals: 8,
    supplyApy: 0.0291,
    utilization: 0.7095,
    note: "In wallet amount is an empty string and fails bigint parsing.",
  },
  {
    id: "loading-live-refresh",
    name: "USDT Live Refresh",
    chain: "Ethereum",
    symbol: "USDT",
    decimals: 6,
    totalSupplyRaw: BigInt("8210000000000"),
    inWalletRaw: BigInt("1250000000"),
    price: 1,
    priceDecimals: 8,
    supplyApy: 0.0368,
    utilization: 0.8941,
    supplyApyQueryState: {
      isLoading: true,
    },
    inWalletAmountQueryState: {
      isLoading: true,
    },
    note: "APY and in-wallet amount are actively reloading (skeleton states).",
  },
  {
    id: "utilization-malformed-payload",
    name: "UNI Malformed Utilization Payload",
    chain: "Base",
    symbol: "UNI",
    decimals: 18,
    totalSupplyRaw: BigInt("300000000000000000000000"),
    inWalletRaw: BigInt("8700000000000000000"),
    price: 13.11,
    priceDecimals: 8,
    supplyApy: 0.0291,
    utilization: { value: 0.77 },
    note: "Utilization payload shape is malformed (hard validation error).",
  },
  {
    id: "negative-decimals-error",
    name: "stETH Invalid Decimals",
    chain: "Ethereum",
    symbol: "stETH",
    decimals: -1,
    totalSupplyRaw: BigInt("3100000000000000000000000"),
    inWalletRaw: BigInt("2100000000000000000"),
    price: 2860.125,
    priceDecimals: 8,
    supplyApy: 0.0384,
    utilization: 0.4945,
    note: "Negative decimals trigger hard errors for token amount and USD formatting.",
  },
  {
    id: "invalid-price-metadata",
    name: "WBTC Invalid Price Metadata",
    chain: "Arbitrum",
    symbol: "WBTC",
    decimals: 8,
    totalSupplyRaw: BigInt("9876543210000"),
    inWalletRaw: BigInt("12345678"),
    price: "",
    priceDecimals: "8.5",
    supplyApy: 425,
    supplyApyMultiplier: 1,
    supplyApyDivider: 10000,
    utilization: 0.7345,
    note: "Malformed price metadata (empty price + non-integer decimals string).",
  },
  {
    id: "long-symbol-compact",
    name: "Long Symbol Compact Showcase",
    chain: "Ethereum",
    symbol: "SUPER-LONG-LIQUID-STAKED-TOKEN-2026",
    decimals: 18,
    totalSupplyRaw: BigInt("987654321012345678901234567890123456"),
    inWalletRaw: BigInt("123450000000000000"),
    price: 0.004321,
    priceDecimals: 8,
    supplyApy: 0.00495,
    utilization: 0.0008,
    note: "Long symbol + huge supply; tiny utilization triggers below-min display indicator.",
  },
  {
    id: "query-error-overrides-wallet-warning",
    name: "LDO Wallet Query Error Override",
    chain: "Ethereum",
    symbol: "LDO",
    decimals: 18,
    totalSupplyRaw: BigInt("620000000000000000000000"),
    inWalletRaw: null,
    price: 2.34,
    priceDecimals: 8,
    supplyApy: 0.051,
    utilization: 0.691,
    inWalletAmountQueryState: {
      isError: true,
      errorMessage: "Wallet RPC failed after missing-value warning.",
    },
    note: "In-wallet null payload creates warning, then query hard error intentionally overrides it.",
  },
  {
    id: "symbol-type-invalid",
    name: "COMP Invalid Symbol Type",
    chain: "Ethereum",
    symbol: 12345,
    decimals: 18,
    totalSupplyRaw: BigInt("54000000000000000000000"),
    inWalletRaw: BigInt("640000000000000000"),
    price: 58.42,
    priceDecimals: 8,
    supplyApy: { apy: 0.019 },
    utilization: 0.255,
    note: "Token symbol and APY payload types are invalid (unsupported runtime types).",
  },
]

function formatTokenAmount({
  context,
  amount,
  symbol,
  decimals,
}: {
  context: string
  amount: unknown
  symbol: unknown
  decimals: unknown
}) {
  return robustFormatBigIntToViewTokenAmount({
    context,
    input: {
      bigIntValue: amount,
      symbol,
      decimals,
    },
    requiredFields: ["decimals"],
  })
}

function formatUsdFromTokenAmount({
  context,
  tokenAmount,
  tokenDecimals,
  tokenPrice,
  tokenPriceDecimals,
}: {
  context: string
  tokenAmount: unknown
  tokenDecimals: unknown
  tokenPrice: unknown
  tokenPriceDecimals: unknown
}): RobustDisplayPayload<ViewNumber> {
  const calcResult = robustCalculateTokenValue({
    context: `${context}.calculate`,
    input: {
      tokenAmount,
      tokenPrice,
      tokenDecimals,
      tokenPriceDecimals,
    },
  })

  const formattedResult = robustFormatBigIntToViewNumber({
    context: `${context}.format`,
    input: {
      bigIntValue: calcResult.value?.tokenValueRaw,
      decimals: calcResult.value?.tokenValueDecimals,
      symbol: "$",
    },
    options: {
      standardDecimals: 2,
      compactDecimals: 2,
      minDisplay: 0.01,
      maxDisplay: 10_000_000_000,
    },
  })

  const diagnostics = mergeRobustDiagnostics(calcResult, formattedResult)

  return {
    value: formattedResult.value,
    warnings: diagnostics.warnings,
    errors: diagnostics.errors,
  }
}

function buildVaultDisplayRows(): VaultDisplayRow[] {
  return VAULT_SEEDS.map((seed) => {
    const baseContext = `mockVaults.${seed.id}`

    const supplyApy = robustFormatPercentToViewPercent({
      context: `${baseContext}.supplyApy`,
      input: { value: seed.supplyApy },
      multiplier: seed.supplyApyMultiplier ?? 1,
      divider: seed.supplyApyDivider ?? 1,
      options: {
        standardDecimals: 2,
        compactDecimals: 2,
        minDisplay: 0.01,
        maxDisplay: 500,
      },
    })

    const utilization = robustFormatPercentToViewPercent({
      context: `${baseContext}.utilization`,
      input: { value: seed.utilization },
      options: {
        standardDecimals: 2,
        compactDecimals: 2,
        minDisplay: 0.01,
        maxDisplay: 100,
      },
    })

    const totalSupplyAmount = formatTokenAmount({
      context: `${baseContext}.totalSupply.amount`,
      amount: seed.totalSupplyRaw,
      symbol: seed.symbol,
      decimals: seed.decimals,
    })

    const inWalletAmount = formatTokenAmount({
      context: `${baseContext}.inWallet.amount`,
      amount: seed.inWalletRaw,
      symbol: seed.symbol,
      decimals: seed.decimals,
    })

    const totalSupplyUsd = formatUsdFromTokenAmount({
      context: `${baseContext}.totalSupply.usd`,
      tokenAmount: seed.totalSupplyRaw,
      tokenDecimals: seed.decimals,
      tokenPrice: seed.price,
      tokenPriceDecimals: seed.priceDecimals,
    })

    const inWalletUsd = formatUsdFromTokenAmount({
      context: `${baseContext}.inWallet.usd`,
      tokenAmount: seed.inWalletRaw,
      tokenDecimals: seed.decimals,
      tokenPrice: seed.price,
      tokenPriceDecimals: seed.priceDecimals,
    })

    return {
      id: seed.id,
      name: seed.name,
      chain: seed.chain,
      note: seed.note,
      supplyApy,
      supplyApyQueryState: seed.supplyApyQueryState,
      totalSupplyAmount,
      totalSupplyUsd,
      totalSupplyUsdQueryState: seed.totalSupplyUsdQueryState,
      utilization,
      inWalletAmount,
      inWalletAmountQueryState: seed.inWalletAmountQueryState,
      inWalletUsd,
      inWalletUsdQueryState: seed.inWalletUsdQueryState,
    }
  })
}

const vaultRows = buildVaultDisplayRows()

function AmountWithUsd({
  tokenAmount,
  tokenAmountQueryState,
  usdValue,
  usdQueryState,
}: {
  tokenAmount: ReturnType<typeof robustFormatBigIntToViewTokenAmount>
  tokenAmountQueryState?: QueryResponse
  usdValue: RobustDisplayPayload<ViewNumber>
  usdQueryState?: QueryResponse
}) {
  return (
    <div className="space-y-1">
      <div className="text-sm font-semibold tabular-nums text-slate-100">
        <DisplayTokenAmountField
          {...tokenAmount}
          queryState={tokenAmountQueryState}
          valueClassName="tracking-tight"
          symbolClassName="text-slate-300"
          loaderSkeleton
          skeletonWidth={88}
        />
      </div>
      <div className="text-xs tabular-nums text-slate-400">
        <DisplayTokenAmountField
          value={usdValue.value}
          warnings={usdValue.warnings}
          errors={usdValue.errors}
          queryState={usdQueryState}
          symbolPosition="before"
          valueClassName="tracking-tight"
          symbolClassName="ml-0 mr-0.5 text-slate-500"
          loaderSkeleton
          skeletonWidth={96}
        />
      </div>
    </div>
  )
}

export default function MockVaultsPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100">
      <div className="mx-auto w-full max-w-[1280px] space-y-6">
        <header className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Mock Vaults Data Table</h1>
          <p className="max-w-3xl text-sm text-slate-300">
            Realistic display showcase for robust formatting and robust display wrappers. Rows
            include clean data, one coercion example, missing/undefined/null cases, validation
            errors, and query-state failures (price API and external APY providers).
          </p>
        </header>

        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60 shadow-xl shadow-black/30">
          <table className="min-w-[1080px] w-full border-collapse">
            <thead className="bg-slate-900/90 text-left text-xs uppercase tracking-wider text-slate-400">
              <tr>
                <th className="px-4 py-3 font-semibold">Vault</th>
                <th className="px-4 py-3 font-semibold">Supply APY</th>
                <th className="px-4 py-3 font-semibold">Total Supply</th>
                <th className="px-4 py-3 font-semibold">Utilization</th>
                <th className="px-4 py-3 font-semibold">In Wallet</th>
              </tr>
            </thead>

            <tbody>
              {vaultRows.map((row) => (
                <tr key={row.id} className="border-t border-slate-800/90 align-top">
                  <td className="px-4 py-3">
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-slate-100">{row.name}</p>
                      <p className="text-xs text-slate-400">{row.chain}</p>
                      <p className="text-xs leading-snug text-slate-500">{row.note}</p>
                    </div>
                  </td>

                  <td className="px-4 py-3">
                    <div className="text-sm font-semibold tabular-nums text-slate-100">
                      <DisplayPercentageField
                        {...row.supplyApy}
                        queryState={row.supplyApyQueryState}
                        valueClassName="tracking-tight"
                        symbolClassName="text-slate-300"
                      />
                    </div>
                  </td>

                  <td className="px-4 py-3">
                    <AmountWithUsd
                      tokenAmount={row.totalSupplyAmount}
                      usdValue={row.totalSupplyUsd}
                      usdQueryState={row.totalSupplyUsdQueryState}
                    />
                  </td>

                  <td className="px-4 py-3">
                    <div className="text-sm font-semibold tabular-nums text-slate-100">
                      <DisplayPercentageField
                        {...row.utilization}
                        valueClassName="tracking-tight"
                        symbolClassName="text-slate-300"
                      />
                    </div>
                  </td>

                  <td className="px-4 py-3">
                    <AmountWithUsd
                      tokenAmount={row.inWalletAmount}
                      tokenAmountQueryState={row.inWalletAmountQueryState}
                      usdValue={row.inWalletUsd}
                      usdQueryState={row.inWalletUsdQueryState}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}
