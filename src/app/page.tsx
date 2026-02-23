"use client"

import { ConnectWallet } from "./components/connect-wallet"
import { BalancesList } from "./components/balances-list"
import { BalancesListHookHeavy } from "./components/balances-list-hookHeavy"
import { SimulationControls } from "./components/simulation-controls"
import { SimulationSettingsProvider } from "./context/simulation-settings"
import Link from "next/link"

function App() {
  return (
    <SimulationSettingsProvider>
      <main className="flex min-h-screen flex-col items-center justify-center p-8">
        <div className="w-full max-w-4xl space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight">Clean Architecture Examples</h1>
          </div>

          <div className="flex justify-center">
            <Link
              href="/mock-vaults"
              className="rounded-lg border border-slate-700 bg-slate-900/70 px-4 py-2 text-sm font-medium text-slate-100 transition hover:border-slate-500 hover:bg-slate-800/80"
            >
              Open Mock Vaults Table
            </Link>
          </div>

          <div className="flex justify-center">
            <ConnectWallet />
          </div>

          <SimulationControls />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BalancesList />
            <BalancesListHookHeavy />
          </div>
        </div>
      </main>
    </SimulationSettingsProvider>
  )
}

export default App
