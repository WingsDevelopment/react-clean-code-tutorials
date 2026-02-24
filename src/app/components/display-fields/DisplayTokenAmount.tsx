import {
  DisplayTokenAmount,
  type DisplayValueProps,
  type QueryResponse,
  type RobustDisplayValue,
} from "web3-display-components"
import type { ViewBigInt, ViewNumber } from "web3-robust-formatting"
import { getDisplayValueInjectedComponents, resolveDisplayErrorState } from "./DisplayValue"

interface DisplayTokenAmountFieldProps extends Omit<
  DisplayValueProps,
  | "viewValue"
  | "isError"
  | "error"
  | "errorMessage"
  | "displayErrorAndValue"
  | "TooltipComponent"
  | "ErrorIconComponent"
> {
  queryState?: QueryResponse
  property?: RobustDisplayValue<ViewBigInt | ViewNumber>
}

/**
 * Wrapper for token amount values with shared query/error state mapping.
 * Keeps page components free from direct DisplayTokenAmount usage.
 */
export function DisplayTokenAmountField({
  queryState,
  property,
  ...props
}: DisplayTokenAmountFieldProps) {
  const { severity, ...resolvedErrorState } = resolveDisplayErrorState(queryState, property)
  const injectedComponents = getDisplayValueInjectedComponents(severity)

  return (
    <DisplayTokenAmount
      {...queryState}
      {...props}
      {...resolvedErrorState}
      {...injectedComponents}
      {...property?.value}
    />
  )
}
