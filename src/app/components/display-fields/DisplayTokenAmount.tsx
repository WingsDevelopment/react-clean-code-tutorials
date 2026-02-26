import { DisplayTokenAmount, resolvePropertyDisplayProps } from "web3-display-components"
import type { ViewBigInt, ViewNumber } from "web3-robust-formatting"
import {
  getDisplayValueInjectedComponents,
  resolveDisplayErrorState,
  type DisplayFieldRobustProps,
} from "./DisplayValue"

export type DisplayTokenAmountFieldProps = DisplayFieldRobustProps<ViewBigInt | ViewNumber>

/**
 * Wrapper for token amount values with shared robust/query error mapping.
 * Keeps page components free from direct DisplayTokenAmount usage.
 */
export function DisplayTokenAmountField({
  value,
  warnings,
  errors,
  ...props
}: DisplayTokenAmountFieldProps) {
  const resolvedInput = {
    ...props,
    value,
    warnings,
    errors,
  }

  const { severity, ...resolvedErrorState } = resolveDisplayErrorState(resolvedInput)
  const injectedComponents = getDisplayValueInjectedComponents(severity)

  return (
    <DisplayTokenAmount
      {...resolvePropertyDisplayProps(value)}
      {...props}
      {...resolvedErrorState}
      {...injectedComponents}
      symbolClassName={props.symbolClassName ?? "mx-0.5"}
    />
  )
}
