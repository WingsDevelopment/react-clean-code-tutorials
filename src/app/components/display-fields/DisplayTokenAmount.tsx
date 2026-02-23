import {
  cn,
  DisplayTokenAmount,
  type DisplayValueProps,
  type QueryResponse,
  type RobustDisplayValue,
} from "web3-display-components"
import type { ViewBigInt, ViewNumber } from "web3-robust-formatting"
import { getDisplayValueInjectedComponents, resolveDisplayErrorState } from "./DisplayValue"

type TokenAmountViewValue = ViewBigInt | ViewNumber

function stripDuplicatedSign(
  value: TokenAmountViewValue | undefined,
): TokenAmountViewValue | undefined {
  if (!value) {
    return value
  }

  const sign = typeof value.sign === "string" ? value.sign : ""
  const viewValue = typeof value.viewValue === "string" ? value.viewValue : undefined

  if (!sign || !viewValue) {
    return value
  }

  const trimmed = viewValue.trimStart()
  const leadingWhitespace = viewValue.slice(0, viewValue.length - trimmed.length)

  if (!trimmed.startsWith(sign)) {
    return value
  }

  return {
    ...value,
    viewValue: `${leadingWhitespace}${trimmed.slice(sign.length)}`,
  }
}

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
  value?: TokenAmountViewValue
  warnings?: string[]
  errors?: string[]
}

/**
 * Wrapper for token amount values with shared query/error state mapping.
 * Keeps page components free from direct DisplayTokenAmount usage.
 */
export function DisplayTokenAmountField({
  queryState,
  property,
  value,
  warnings,
  errors,
  symbolClassName,
  ...props
}: DisplayTokenAmountFieldProps) {
  const resolvedProperty =
    property ??
    (warnings !== undefined || errors !== undefined || value !== undefined
      ? { value, warnings, errors }
      : undefined)

  const { severity, ...resolvedErrorState } = resolveDisplayErrorState(queryState, resolvedProperty)
  const injectedComponents = getDisplayValueInjectedComponents(severity)
  const normalizedValue = stripDuplicatedSign(
    resolvedProperty?.value as TokenAmountViewValue | undefined,
  )

  return (
    <DisplayTokenAmount
      {...queryState}
      {...props}
      {...resolvedErrorState}
      {...injectedComponents}
      {...normalizedValue}
      symbolClassName={cn("mx-0.5", symbolClassName)}
    />
  )
}
