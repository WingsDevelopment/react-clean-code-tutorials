"use client"

import { Address } from "viem"
import { useAccount } from "wagmi"
import { DisplayTokenAmount, DisplayTokenValue } from "web3-display-components"

import { useDisplayBalances } from "@app/data/wallet/balances/balances.hook"
import { useSimulationSettings } from "@app/context/simulation-settings"

// Base token addresses
const TOKENS: Address[] = [
  "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", // USDC
  "0x4200000000000000000000000000000000000006", // WETH
  "0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb", // DAI
]

export function BalancesList() {
  const { address, isConnected } = useAccount()
  const { settings } = useSimulationSettings()
  const {
    data,
    isLoading: queryLoading,
    ...queryState
  } = useDisplayBalances(TOKENS, address, settings)
  const isLoading = settings.simulateLoading || queryLoading

  console.log({ data })

  return (
    <div className="min-h-80 rounded-2xl border border-gray-700 bg-gray-800/50 p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-200">Token Balances</h2>
        <div className="text-right">
          <p className="text-sm text-gray-400">Total Value</p>
          <p className="text-xl font-bold text-white">
            {isConnected && (
              <DisplayTokenValue
                {...queryState}
                isLoading={isLoading}
                {...data?.totalValueUsd.data}
                error={data?.totalValueUsd.error || queryState.error}
                isError={queryState.isError || Boolean(data?.totalValueUsd.error)}
              />
            )}
          </p>
        </div>
      </div>

      {isConnected && (
        <div className="space-y-3">
          {TOKENS.map((token, index) => {
            const balance = data?.balances[index]
            return (
              <div
                key={token}
                className="flex items-center justify-between rounded-xl bg-gray-900/50 p-4"
              >
                <div className="text-right">
                  <p className="font-mono text-white">
                    <DisplayTokenAmount
                      {...queryState}
                      isLoading={isLoading}
                      {...balance?.balanceFormatted}
                    />
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
