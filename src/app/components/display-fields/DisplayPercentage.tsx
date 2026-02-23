import {
  DisplayPercentRobust,
  type DisplayValueProps,
  type QueryResponse,
  type RobustDisplayValue,
} from "web3-display-components"
import type { ViewPercent } from "web3-robust-formatting"
import { getDisplayValueInjectedComponents, resolveDisplayErrorState } from "./DisplayValue"

type PercentageViewValue = ViewPercent

function stripDuplicatedSign(
  value: PercentageViewValue | undefined,
): PercentageViewValue | undefined {
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

interface DisplayPercentageFieldProps extends Omit<
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
  property?: RobustDisplayValue<PercentageViewValue>
  value?: PercentageViewValue
  warnings?: string[]
  errors?: string[]
}

/**
 * Wrapper for percentage values with app-level tooltip/icon injection.
 * Uses DisplayPercentRobust internally and accepts either `property`
 * or `{ value, warnings, errors }` shape.
 */
export function DisplayPercentageField({
  queryState,
  property,
  value,
  warnings,
  errors,
  ...props
}: DisplayPercentageFieldProps) {
  const resolvedProperty =
    property ??
    (warnings !== undefined || errors !== undefined || value !== undefined
      ? { value, warnings, errors }
      : undefined)

  const normalizedValue = stripDuplicatedSign(
    resolvedProperty?.value as PercentageViewValue | undefined,
  )
  const normalizedProperty =
    resolvedProperty == null
      ? undefined
      : {
          ...resolvedProperty,
          value: normalizedValue,
        }

  const { severity } = resolveDisplayErrorState(queryState, normalizedProperty)
  const injectedComponents = getDisplayValueInjectedComponents(severity)

  return (
    <DisplayPercentRobust
      queryState={queryState}
      property={normalizedProperty}
      {...props}
      {...injectedComponents}
    />
  )
}
