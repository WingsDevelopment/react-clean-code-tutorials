"use client"

import { useState, useEffect } from "react"
import { useConnectModal, useAccountModal } from "@rainbow-me/rainbowkit"
import { useAccount } from "wagmi"

function abbreviateAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

export function ConnectWallet() {
  const { address, isConnected } = useAccount()
  const { openConnectModal } = useConnectModal()
  const { openAccountModal } = useAccountModal()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Prevent hydration mismatch by rendering connect button on server
  if (!mounted) {
    return (
      <button
        type="button"
        className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition-all hover:bg-blue-700 hover:shadow-lg active:scale-95"
      >
        Connect Wallet
      </button>
    )
  }

  if (!isConnected || !address) {
    return (
      <button
        type="button"
        onClick={openConnectModal}
        className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition-all hover:bg-blue-700 hover:shadow-lg active:scale-95"
      >
        Connect Wallet
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={openAccountModal}
      className="rounded-xl border border-gray-600 bg-gray-800 px-6 py-3 font-mono text-sm text-white transition-all hover:border-gray-500 hover:bg-gray-700 active:scale-95"
    >
      {abbreviateAddress(address)}
    </button>
  )
}
