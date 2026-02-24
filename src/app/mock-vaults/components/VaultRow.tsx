import type { QueryResponse } from "web3-display-components"
import {
  DisplayPercentageField,
  DisplayTokenAmountField,
  DisplayTokenValueField,
} from "@/app/components/display-fields"
import type {
  MockVaultDisplayRow,
  TokenAmountDisplay,
  TokenValueDisplay,
} from "@/app/data/vaults/vaults.types"

interface AmountWithUsdProps {
  tokenAmount?: TokenAmountDisplay
  tokenAmountQueryState?: QueryResponse
  usdValue?: TokenValueDisplay
  usdQueryState?: QueryResponse
  queryState?: QueryResponse
}

interface VaultRowProps {
  row?: MockVaultDisplayRow
  queryState?: QueryResponse
}

/**
 * Renders token amount and USD value stacked in one table cell.
 * Field query state is spread first, then global query state last.
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
          {...tokenAmountQueryState}
          {...queryState}
          symbolClassName="text-slate-300"
        />
      </div>
      <div className="text-xs tabular-nums text-slate-400">
        <DisplayTokenValueField
          property={usdValue}
          {...usdQueryState}
          {...queryState}
          symbolClassName="text-slate-500"
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
            {...row?.supplyApy}
            {...row?.supplyApyQueryState}
            {...queryState}
            symbolClassName="text-slate-300"
          />
        </div>
      </td>

      <td className="px-4 py-3">
        <AmountWithUsd
          tokenAmount={row?.totalSupplyAmount}
          tokenAmountQueryState={row?.totalSupplyAmountQueryState}
          usdValue={row?.totalSupplyUsd}
          usdQueryState={row?.totalSupplyUsdQueryState}
          queryState={queryState}
        />
      </td>

      <td className="px-4 py-3">
        <div className="text-sm font-semibold tabular-nums text-slate-100">
          <DisplayPercentageField
            {...row?.utilization}
            {...row?.utilizationQueryState}
            {...queryState}
            symbolClassName="text-slate-300"
          />
        </div>
      </td>

      <td className="px-4 py-3">
        <AmountWithUsd
          tokenAmount={row?.inWalletAmount}
          tokenAmountQueryState={row?.inWalletAmountQueryState}
          usdValue={row?.inWalletUsd}
          usdQueryState={row?.inWalletUsdQueryState}
          queryState={queryState}
        />
      </td>
    </tr>
  )
}
