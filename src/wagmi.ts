"use client"

import { base } from "wagmi/chains"
import { createConfig, fallback, http, webSocket } from "wagmi"
import { connectorsForWallets } from "@rainbow-me/rainbowkit"
import { metaMaskWallet } from "@rainbow-me/rainbowkit/wallets"

export const networks = [base]

const rpcConfig = [{ url: process.env.NEXT_PUBLIC_BASE_RPC_FREE, isWebSocket: false }].filter(
  ({ url }) => Boolean(url),
)

const connectors = connectorsForWallets(
  [
    {
      groupName: "Popular",
      wallets: [metaMaskWallet],
    },
  ],
  {
    appName: "Test",
    appDescription: "Test",
    appUrl: "",
    appIcon: "",
    projectId: "555c34027fa878cbfab8478a70dbf84b", // taken from wagmi docs..
  },
)

export const targetChain = base

export const config = createConfig({
  connectors,
  chains: [targetChain],
  transports: {
    [targetChain.id]: fallback(
      rpcConfig.map(({ url, isWebSocket }) => (isWebSocket ? webSocket(url!) : http(url!))),
      { rank: true },
    ),
  },
})

export const getWagmiConfig = () => config

declare module "wagmi" {
  interface Register {
    config: typeof config
  }
}
