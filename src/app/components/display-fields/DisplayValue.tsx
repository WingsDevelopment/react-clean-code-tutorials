import { Tooltip, TooltipContent, TooltipTrigger } from "@/app/components/tooltip/base-tooltip"
import { faCircleExclamation, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as React from "react"
import {
  DisplayValue,
  resolveDisplayErrorState as resolveDisplayErrorStateBase,
  type DisplayValueProps,
  type QueryResponse,
  type ResolvedDisplayErrorState,
  type RobustDisplayValue,
} from "web3-display-components"

export interface DisplayValueFieldProps extends Omit<
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
  property?: RobustDisplayValue<string>
}

function dedupeNonEmptyLines(lines: Array<string | undefined>): string[] {
  return Array.from(
    new Set(
      lines
        .map((line) => line?.trim())
        .filter((line): line is string => Boolean(line && line.length > 0)),
    ),
  )
}

function extractQueryErrorMessage(queryState?: QueryResponse): string | undefined {
  const queryErrorMessage =
    typeof queryState?.errorMessage === "string"
      ? queryState.errorMessage
      : undefined
  const queryErrorFromObject =
    queryState?.error instanceof Error
      ? queryState.error.message
      : typeof queryState?.error === "string"
      ? queryState.error
      : undefined

  const lines = dedupeNonEmptyLines([queryErrorMessage, queryErrorFromObject])
  return lines.length > 0 ? lines.join("\n") : undefined
}

/**
 * Resolves robust property metadata + query state into DisplayValue error props.
 * - hard errors: icon only
 * - warnings with value: value + icon
 */
export function resolveDisplayErrorState<T>(
  queryState?: QueryResponse,
  property?: RobustDisplayValue<T>,
): ResolvedDisplayErrorState {
  const resolved = resolveDisplayErrorStateBase(queryState, property)
  const queryErrorMessage = extractQueryErrorMessage(queryState)
  const hasQueryStateError = Boolean(queryState?.isError || queryErrorMessage)

  if (!hasQueryStateError) {
    return resolved
  }

  const normalizedQueryErrorMessage = queryErrorMessage ?? "Query request failed."

  return {
    ...resolved,
    isError: true,
    displayErrorAndValue: false,
    error: queryState?.error ?? new Error(normalizedQueryErrorMessage),
    errorMessage: normalizedQueryErrorMessage,
    severity: "error",
  }
}

function DisplayValueTooltip({ trigger, message }: { trigger: React.ReactNode; message: string }) {
  if (!React.isValidElement<Record<string, unknown>>(trigger)) {
    return <span title={message}>{trigger}</span>
  }

  return (
    <Tooltip delayDuration={100}>
      <TooltipTrigger>{trigger}</TooltipTrigger>
      <TooltipContent side="top" size="small">
        <span className="typography-body2 whitespace-pre-line text-text-primary">{message}</span>
      </TooltipContent>
    </Tooltip>
  )
}

function DisplayValueErrorIcon() {
  return (
    <FontAwesomeIcon
      aria-hidden
      icon={faCircleExclamation}
      className="mx-1 shrink-0 text-[0.875em] text-red-400"
    />
  )
}

function DisplayValueWarningIcon() {
  return (
    <FontAwesomeIcon
      aria-hidden
      icon={faTriangleExclamation}
      className="mx-1 shrink-0 text-[0.875em] text-amber-400"
    />
  )
}

function DisplayValueEmptyCell() {
  return (
    <span
      aria-hidden="true"
      className="mb-0.5 inline-flex items-center justify-center align-middle"
    >
      <span className="inline-block h-0.5 w-4 translate-y-[0.5px] bg-text-secondary/70" />
    </span>
  )
}

const displayValueBaseComponents = {
  TooltipComponent: DisplayValueTooltip,
  emptyCell: <DisplayValueEmptyCell />,
} as const

export function getDisplayValueInjectedComponents(severity: "none" | "warning" | "error") {
  return {
    ...displayValueBaseComponents,
    ErrorIconComponent: severity === "warning" ? DisplayValueWarningIcon : DisplayValueErrorIcon,
  } as const
}

/**
 * Local DisplayValue wrapper with app-level tooltip/error icon + robust error behavior.
 */
export function DisplayValueField({ queryState, property, ...props }: DisplayValueFieldProps) {
  const { severity, ...resolvedErrorState } = resolveDisplayErrorState(queryState, property)
  const injectedComponents = getDisplayValueInjectedComponents(severity)

  return (
    <DisplayValue
      {...queryState}
      {...props}
      {...resolvedErrorState}
      {...injectedComponents}
      viewValue={property?.value}
    />
  )
}
