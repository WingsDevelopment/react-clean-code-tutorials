"use client"

import { createContext, useContext, useState, ReactNode } from "react"

export interface SimulationSettings {
  simulateLoading?: boolean
  simulatePriceError?: boolean
  simulateRpcError?: boolean
}

interface SimulationSettingsContextValue {
  settings: SimulationSettings
  setSettings: React.Dispatch<React.SetStateAction<SimulationSettings>>
}

const SimulationSettingsContext = createContext<SimulationSettingsContextValue | null>(null)

export function SimulationSettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<SimulationSettings>({
    simulateLoading: false,
    simulatePriceError: false,
    simulateRpcError: false,
  })

  return (
    <SimulationSettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </SimulationSettingsContext.Provider>
  )
}

export function useSimulationSettings() {
  const context = useContext(SimulationSettingsContext)
  if (!context) {
    throw new Error("useSimulationSettings must be used within SimulationSettingsProvider")
  }
  return context
}
