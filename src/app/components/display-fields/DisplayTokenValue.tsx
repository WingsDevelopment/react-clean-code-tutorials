import {
  DisplayTokenValue,
  type DisplayValueProps,
  type QueryResponse,
  type RobustDisplayValue,
} from "web3-display-components"
import type { ViewNumber } from "web3-robust-formatting"
import { getDisplayValueInjectedComponents, resolveDisplayErrorState } from "./DisplayValue"

interface DisplayTokenValueFieldProps extends Omit<
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
  property?: RobustDisplayValue<ViewNumber>
}

/**
 * Wrapper for token/currency values with shared query/error state mapping.
 * Typically used for fiat-like values (for example "$" amounts).
 */
export function DisplayTokenValueField({
  queryState,
  property,
  ...props
}: DisplayTokenValueFieldProps) {
  const { severity, ...resolvedErrorState } = resolveDisplayErrorState(queryState, property)
  const injectedComponents = getDisplayValueInjectedComponents(severity)

  return (
    <DisplayTokenValue
      {...queryState}
      {...props}
      {...resolvedErrorState}
      {...injectedComponents}
      {...property?.value}
    />
  )
}
