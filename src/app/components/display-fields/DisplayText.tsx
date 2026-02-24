import { DisplayValueField, type DisplayValueFieldProps } from "./DisplayValue"

export type DisplayTextValueProps = DisplayValueFieldProps

/**
 * Wrapper for text display values with shared query/error state mapping.
 * Keeps page components free from direct DisplayValue usage.
 */
export function DisplayTextValue(props: DisplayTextValueProps) {
  return <DisplayValueField {...props} />
}

export type DisplayTextProps = DisplayTextValueProps
export const DisplayText = DisplayTextValue
