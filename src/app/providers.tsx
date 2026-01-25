"use client"

import React from "react"
import { isServer, QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { cookieToInitialState, WagmiProvider } from "wagmi"

import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit"
import { getWagmiConfig } from "../wagmi"
;(BigInt.prototype as any).toJSON = function () {
  return this.toString()
}

function makeQueryClient() {
  return new QueryClient({
    queryCache: new QueryCache({
      onError: (e) => {
        console.error("QueryCache(Global error handler): Error while running query", { e })
      },
    }),
  })
}

let browserQueryClient: QueryClient | undefined

export function getQueryClient() {
  if (isServer) {
    return makeQueryClient()
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient()
    return browserQueryClient
  }
}

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
