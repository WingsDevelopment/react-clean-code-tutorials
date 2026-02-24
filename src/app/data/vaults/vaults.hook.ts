import { useQuery } from "@tanstack/react-query"

import { queryConfig } from "@app/config/query-config"
import { vaultsMapper, type VaultsMapperSettings } from "./vaults.mapper"

export interface UseVaultsSettings extends Partial<VaultsMapperSettings> {}

const DEFAULT_USE_VAULTS_SETTINGS: VaultsMapperSettings = {
  dataSource: "mock",
  latencyMs: 500,
}

/**
 * Resolves hook settings into a stable mapper configuration.
 * Forces mock datasource and applies default latency for demo loading states.
 */
function resolveVaultsSettings(settings?: UseVaultsSettings): VaultsMapperSettings {
  return {
    ...DEFAULT_USE_VAULTS_SETTINGS,
    ...(settings ?? {}),
    dataSource: "mock",
  }
}

/**
 * Reactive wrapper around vaultsMapper with hook-level cache semantics.
 * Returns fully formatted rows so UI only handles rendering and query states.
 */
export function useVaults(settings?: UseVaultsSettings) {
  const resolvedSettings = resolveVaultsSettings(settings)

  return useQuery({
    queryKey: ["useVaults", resolvedSettings] as const,
    queryFn: () => vaultsMapper({ settings: resolvedSettings }),
    enabled: true,
    ...queryConfig.hookQuery,
  })
}
