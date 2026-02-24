import {
  DisplayPercentage,
  type DisplayValueProps,
  type QueryResponse,
  type RobustDisplayValue,
} from "web3-display-components"
import type { ViewPercent } from "web3-robust-formatting"
import {
  getDisplayValueInjectedComponents,
  resolveDisplayErrorState,
} from "./DisplayValue"

interface DisplayPercentValueProps extends Omit<
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
  property?: RobustDisplayValue<ViewPercent>
}

/**
 * Wrapper for percentage values with app-level tooltip/icon injection.
 * Keeps page components free from direct DisplayPercentage usage.
 */
export function DisplayPercentValue({
  queryState,
  property,
  ...props
}: DisplayPercentValueProps) {
  const { severity, ...resolvedErrorState } = resolveDisplayErrorState(
    queryState,
    property,
  )
  const injectedComponents = getDisplayValueInjectedComponents(severity)

  return (
    <DisplayPercentage
      {...queryState}
      {...props}
      {...resolvedErrorState}
      {...injectedComponents}
      {...property?.value}
    />
  )
}

export type DisplayPercentageFieldProps = DisplayPercentValueProps
export const DisplayPercentageField = DisplayPercentValue
