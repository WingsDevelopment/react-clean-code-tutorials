import { DisplayTokenValue, resolvePropertyDisplayProps } from "web3-display-components"
import type { ViewNumber } from "web3-robust-formatting"
import {
  getDisplayValueInjectedComponents,
  resolveDisplayErrorState,
  type DisplayFieldRobustProps,
} from "./DisplayValue"

export type DisplayTokenValueFieldProps = DisplayFieldRobustProps<ViewNumber>

/**
 * Wrapper for token/currency values with shared robust/query error state mapping.
 * Typically used for fiat-like values (for example "$" amounts).
 */
export function DisplayTokenValueField({
  value,
  warnings,
  errors,
  ...props
}: DisplayTokenValueFieldProps) {
  const resolvedInput = {
    ...props,
    value,
    warnings,
    errors,
  }

  const { severity, ...resolvedErrorState } = resolveDisplayErrorState(resolvedInput)
  const injectedComponents = getDisplayValueInjectedComponents(severity)

  return (
    <DisplayTokenValue
      {...resolvePropertyDisplayProps(value)}
      {...props}
      {...resolvedErrorState}
      {...injectedComponents}
    />
  )
}
