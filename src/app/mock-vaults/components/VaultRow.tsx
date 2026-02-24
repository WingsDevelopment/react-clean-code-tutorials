import type { QueryResponse } from "web3-display-components"
import type { RobustFormattingResult } from "web3-robust-formatting"
import {
  DisplayPercentageField,
  DisplayTokenAmountField,
  DisplayTokenValueField,
} from "@/app/components/display-fields"
import type {
  MockVaultDisplayRow,
  PercentDisplay,
  TokenAmountDisplay,
  TokenValueDisplay,
} from "@/app/data/vaults/vaults.types"

interface AmountWithUsdProps {
  tokenAmount: TokenAmountDisplay
  tokenAmountQueryState?: QueryResponse
  usdValue: TokenValueDisplay
  usdQueryState?: QueryResponse
  queryState?: QueryResponse
}

interface VaultRowProps {
  row?: MockVaultDisplayRow
  queryState?: QueryResponse
}

/**
 * Creates an empty robust display payload for placeholder rows.
 * Keeps the row component shape identical in loading and loaded states.
 */
function createEmptyDisplayResult<T>(): RobustFormattingResult<T> {
  return {
    value: undefined,
    warnings: [],
    errors: [],
  }
}

/**
 * Merges global query state from useVaults with optional field-level state.
 * Field-level error payloads win over global ones to preserve row-specific detail.
 */
function mergeQueryState(
  globalQueryState?: QueryResponse,
  fieldQueryState?: QueryResponse,
): QueryResponse | undefined {
  if (!globalQueryState && !fieldQueryState) {
    return undefined
  }

  return {
    isLoading: Boolean(globalQueryState?.isLoading || fieldQueryState?.isLoading),
    isPending: Boolean(globalQueryState?.isPending || fieldQueryState?.isPending),
    isFetched: Boolean(globalQueryState?.isFetched || fieldQueryState?.isFetched),
    isError: Boolean(globalQueryState?.isError || fieldQueryState?.isError),
    errorMessage: fieldQueryState?.errorMessage ?? globalQueryState?.errorMessage,
    error: fieldQueryState?.error ?? globalQueryState?.error,
  }
}

/**
 * Renders token amount and USD value stacked in one table cell.
 * Both display components receive merged hook + field query states.
 */
function AmountWithUsd({
  tokenAmount,
  tokenAmountQueryState,
  usdValue,
  usdQueryState,
  queryState,
}: AmountWithUsdProps) {
  return (
    <div className="space-y-1">
      <div className="text-sm font-semibold tabular-nums text-slate-100">
        <DisplayTokenAmountField
          {...tokenAmount}
          queryState={mergeQueryState(queryState, tokenAmountQueryState)}
          valueClassName="tracking-tight"
          symbolClassName="text-slate-300"
          loaderSkeleton
          skeletonWidth={88}
        />
      </div>
      <div className="text-xs tabular-nums text-slate-400">
        <DisplayTokenValueField
          value={usdValue.value}
          warnings={usdValue.warnings}
          errors={usdValue.errors}
          queryState={mergeQueryState(queryState, usdQueryState)}
          valueClassName="tracking-tight"
          symbolClassName="text-slate-500"
          loaderSkeleton
          skeletonWidth={96}
        />
      </div>
    </div>
  )
}

/**
 * Renders one vault row with either real data or placeholder payloads.
 * The same component is used for loading rows and hydrated mapped rows.
 */
export function VaultRow({ row, queryState }: VaultRowProps) {
  const fallbackSupplyApy: PercentDisplay = createEmptyDisplayResult()
  const fallbackUtilization: PercentDisplay = createEmptyDisplayResult()
  const fallbackTokenAmount: TokenAmountDisplay = createEmptyDisplayResult()
  const fallbackTokenValue: TokenValueDisplay = createEmptyDisplayResult()

  return (
    <tr className="border-t border-slate-800/90 align-top">
      <td className="px-4 py-3">
        <div className="space-y-1">
          {row?.name ? (
            <p className="text-sm font-semibold text-slate-100">{row.name}</p>
          ) : (
            <span className="block h-4 w-44 animate-pulse rounded bg-slate-800/90" />
          )}
          {row?.chain ? (
            <p className="text-xs text-slate-400">{row.chain}</p>
          ) : (
            <span className="block h-3 w-20 animate-pulse rounded bg-slate-800/70" />
          )}
          {row?.note ? (
            <p className="text-xs leading-snug text-slate-500">{row.note}</p>
          ) : (
            <span className="block h-3 w-[18rem] animate-pulse rounded bg-slate-800/60" />
          )}
        </div>
      </td>

      <td className="px-4 py-3">
        <div className="text-sm font-semibold tabular-nums text-slate-100">
          <DisplayPercentageField
            {...(row?.supplyApy ?? fallbackSupplyApy)}
            queryState={mergeQueryState(queryState, row?.supplyApyQueryState)}
            valueClassName="tracking-tight"
            symbolClassName="text-slate-300"
            loaderSkeleton
            skeletonWidth={72}
          />
        </div>
      </td>

      <td className="px-4 py-3">
        <AmountWithUsd
          tokenAmount={row?.totalSupplyAmount ?? fallbackTokenAmount}
          tokenAmountQueryState={row?.totalSupplyAmountQueryState}
          usdValue={row?.totalSupplyUsd ?? fallbackTokenValue}
          usdQueryState={row?.totalSupplyUsdQueryState}
          queryState={queryState}
        />
      </td>

      <td className="px-4 py-3">
        <div className="text-sm font-semibold tabular-nums text-slate-100">
          <DisplayPercentageField
            {...(row?.utilization ?? fallbackUtilization)}
            queryState={mergeQueryState(queryState, row?.utilizationQueryState)}
            valueClassName="tracking-tight"
            symbolClassName="text-slate-300"
            loaderSkeleton
            skeletonWidth={72}
          />
        </div>
      </td>

      <td className="px-4 py-3">
        <AmountWithUsd
          tokenAmount={row?.inWalletAmount ?? fallbackTokenAmount}
          tokenAmountQueryState={row?.inWalletAmountQueryState}
          usdValue={row?.inWalletUsd ?? fallbackTokenValue}
          usdQueryState={row?.inWalletUsdQueryState}
          queryState={queryState}
        />
      </td>
    </tr>
  )
}
