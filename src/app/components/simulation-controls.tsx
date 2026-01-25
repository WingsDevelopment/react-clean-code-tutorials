"use client"

import { useSimulationSettings } from "@app/context/simulation-settings"

function Switch({
  checked,
  onChange,
  label,
}: {
  checked: boolean
  onChange: (checked: boolean) => void
  label: string
}) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <div
        className={`relative w-10 h-5 rounded-full transition-colors ${
          checked ? "bg-blue-500" : "bg-gray-600"
        }`}
        onClick={() => onChange(!checked)}
      >
        <div
          className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
            checked ? "translate-x-5" : "translate-x-0.5"
          }`}
        />
      </div>
      <span className="text-sm text-gray-300">{label}</span>
    </label>
  )
}

export function SimulationControls() {
  const { settings, setSettings } = useSimulationSettings()

  return (
    <div className="flex flex-wrap justify-center gap-6 rounded-xl border border-gray-700 bg-gray-800/50 p-4">
      <Switch
        checked={settings.simulateLoading ?? false}
        onChange={(checked) => setSettings((s) => ({ ...s, simulateLoading: checked }))}
        label="Simulate Loading"
      />
      <Switch
        checked={settings.simulatePriceError ?? false}
        onChange={(checked) => setSettings((s) => ({ ...s, simulatePriceError: checked }))}
        label="Simulate Price Api Error"
      />
      <Switch
        checked={settings.simulateRpcError ?? false}
        onChange={(checked) => setSettings((s) => ({ ...s, simulateRpcError: checked }))}
        label="Simulate RPC Error"
      />
    </div>
  )
}
