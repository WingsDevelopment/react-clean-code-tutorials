"use client"

import { VaultRow } from "./components/VaultRow"
import { useVaults } from "../data/vaults/vaults.hook"

const LOADING_ROW_COUNT = 10

/**
 * Builds stable loading row keys for placeholder table rendering.
 * Keys are deterministic to avoid unnecessary row remounts during loading.
 */
function buildLoadingRowKeys(count: number): string[] {
  return Array.from({ length: count }, (_, index) => `loading-row-${index}`)
}

/**
 * Renders the mock vault showcase table using fetch->mapper->hook data flow.
 * While query is loading, it shows 10 placeholder rows through the same row component.
 */
export default function MockVaultsPage() {
  const query = useVaults()
  const { data, isLoading, isPending, isError } = query

  const rows = data?.rows ?? []

  const shouldRenderLoadingRows = rows.length === 0 && (isLoading || isPending)
  const shouldRenderErrorFallback = rows.length === 0 && isError && !shouldRenderLoadingRows

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100">
      <div className="mx-auto w-full max-w-[1280px] space-y-6">
        <header className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Mock Vaults Data Table</h1>
          <p className="max-w-3xl text-sm text-slate-300">
            Fetch - mapper - hook showcase for robust formatting output. Rows include clean data,
            coercion warnings, malformed runtime payloads, and per-field query errors.
          </p>
        </header>

        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60 shadow-xl shadow-black/30">
          <table className="min-w-[1080px] w-full table-fixed border-collapse">
            <colgroup>
              <col className="w-[320px]" />
              <col className="w-[140px]" />
              <col className="w-[220px]" />
              <col className="w-[140px]" />
              <col className="w-[220px]" />
            </colgroup>
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
              {shouldRenderLoadingRows &&
                buildLoadingRowKeys(LOADING_ROW_COUNT).map((key) => (
                  <VaultRow key={key} queryState={query} />
                ))}

              {!shouldRenderLoadingRows &&
                rows.map((row) => <VaultRow key={row.id} row={row} queryState={query} />)}

              {shouldRenderErrorFallback && (
                <VaultRow key="error-fallback" queryState={query} />
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}
