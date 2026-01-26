"use client"

import React from "react"
import { QueryClientProvider } from "@tanstack/react-query"
import { cookieToInitialState, WagmiProvider } from "wagmi"

import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit"
import { getWagmiConfig } from "../wagmi"
import { getQueryClient } from "./query-client"
;(BigInt.prototype as any).toJSON = function () {
  return this.toString()
}

export { getQueryClient }

export function Providers({
  children,
  cookie,
}: {
  children: React.ReactNode
  cookie?: string | null
}) {
  const queryClient = getQueryClient()
  const wagmiConfig = getWagmiConfig()
  const initialState = cookieToInitialState(wagmiConfig, cookie)

  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={wagmiConfig} initialState={initialState}>
        <RainbowKitProvider theme={darkTheme()}>{children}</RainbowKitProvider>
      </WagmiProvider>
    </QueryClientProvider>
  )
}
