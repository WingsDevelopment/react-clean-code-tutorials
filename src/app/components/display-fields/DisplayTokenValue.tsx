import {
  cn,
  DisplayTokenValue,
  type DisplayValueProps,
  type QueryResponse,
  type RobustDisplayValue,
} from "web3-display-components"
import type { ViewNumber } from "web3-robust-formatting"
import { getDisplayValueInjectedComponents, resolveDisplayErrorState } from "./DisplayValue"

type TokenValueViewValue = ViewNumber

function stripDuplicatedSign(
  value: TokenValueViewValue | undefined,
): TokenValueViewValue | undefined {
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
  property?: RobustDisplayValue<TokenValueViewValue>
  value?: TokenValueViewValue
  warnings?: string[]
  errors?: string[]
}

/**
 * Wrapper for token/currency values with shared query/error state mapping.
 * Typically used for fiat-like values (for example "$" amounts).
 */
export function DisplayTokenValueField({
  queryState,
  property,
  value,
  warnings,
  errors,
  symbolClassName,
  ...props
}: DisplayTokenValueFieldProps) {
  const resolvedProperty =
    property ??
    (warnings !== undefined || errors !== undefined || value !== undefined
      ? { value, warnings, errors }
      : undefined)

  const { severity, ...resolvedErrorState } = resolveDisplayErrorState(queryState, resolvedProperty)
  const injectedComponents = getDisplayValueInjectedComponents(severity)
  const normalizedValue = stripDuplicatedSign(
    resolvedProperty?.value as TokenValueViewValue | undefined,
  )

  return (
    <DisplayTokenValue
      {...queryState}
      {...props}
      {...resolvedErrorState}
      {...injectedComponents}
      {...normalizedValue}
      symbolClassName={cn("mx-0.5", symbolClassName)}
    />
  )
}
