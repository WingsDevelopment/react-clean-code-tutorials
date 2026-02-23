import type { Meta, StoryObj } from "@storybook/react"
import type { QueryResponse } from "web3-display-components"
import { robustFormatNumberToViewNumber } from "web3-robust-formatting"
import { DisplayTokenValueField } from "@/app/components/display-fields"

const STORY_CONTEXT = "storybook.DisplayComponents.TokenValue.Field"

const BASE_INPUT = {
  value: 1234.56789,
  symbol: "$",
} as const

const LOADING_QUERY_STATE = {
  isLoading: true,
} satisfies QueryResponse

const PENDING_QUERY_STATE = {
  isPending: true,
} satisfies QueryResponse

const meta: Meta<typeof DisplayTokenValueField> = {
  title: "Display Components/Token Value/Field",
  component: DisplayTokenValueField,
  tags: ["autodocs"],
  argTypes: {
    property: { control: false },
    value: { control: false },
    warnings: { control: false },
    errors: { control: false },
    queryState: { control: false },
    valueClassName: { control: "text" },
    symbolClassName: { control: "text" },
    containerClassName: { control: "text" },
    loaderSkeleton: { control: "boolean" },
    skeletonWidth: { control: "text" },
    symbolMaxChars: { control: "number" },
  },
  parameters: {
    docs: {
      source: { type: "code" },
    },
  },
}

export default meta
type Story = StoryObj<typeof DisplayTokenValueField>

meta.decorators = [
  (StoryComponent) => (
    <div className="relative overflow-visible bg-slate-950 p-6 text-slate-100">
      <StoryComponent />
    </div>
  ),
]

export const Playground: Story = {
  args: {
    loaderSkeleton: true,
    symbolMaxChars: 10,
    symbolClassName: "",
    containerClassName: "",
    valueClassName: "",
    skeletonWidth: 140,
  },
  render: (args) => {
    const formattedResult = robustFormatNumberToViewNumber({
      context: `${STORY_CONTEXT}.Playground`,
      input: { ...BASE_INPUT },
      requiredFields: ["value"],
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayTokenValueField {...args} {...formattedResult} />
      </h5>
    )
  },
}

export const FormatSmallAmount: Story = {
  render: () => {
    const formattedResult = robustFormatNumberToViewNumber({
      context: `${STORY_CONTEXT}.FormatSmallAmount`,
      input: { ...BASE_INPUT, value: 0.004321 },
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayTokenValueField {...formattedResult} />
      </h5>
    )
  },
}

export const FormatMidAmount: Story = {
  render: () => {
    const formattedResult = robustFormatNumberToViewNumber({
      context: `${STORY_CONTEXT}.FormatMidAmount`,
      input: { ...BASE_INPUT },
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayTokenValueField {...formattedResult} />
      </h5>
    )
  },
}

export const FormatTenThousandPlusUsd: Story = {
  render: () => {
    const formattedResult = robustFormatNumberToViewNumber({
      context: `${STORY_CONTEXT}.FormatTenThousandPlusUsd`,
      input: { ...BASE_INPUT, value: 12345.67 },
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayTokenValueField {...formattedResult} />
      </h5>
    )
  },
}

export const FormatOneMillionPlusUsd: Story = {
  render: () => {
    const formattedResult = robustFormatNumberToViewNumber({
      context: `${STORY_CONTEXT}.FormatOneMillionPlusUsd`,
      input: { ...BASE_INPUT, value: 1234567.89 },
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayTokenValueField {...formattedResult} />
      </h5>
    )
  },
}

export const FormatBigCompactAmount: Story = {
  render: () => {
    const formattedResult = robustFormatNumberToViewNumber({
      context: `${STORY_CONTEXT}.FormatBigCompactAmount`,
      input: { ...BASE_INPUT, value: 987654321.12 },
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayTokenValueField {...formattedResult} />
      </h5>
    )
  },
}

export const FormatZeroAmount: Story = {
  render: () => {
    const formattedResult = robustFormatNumberToViewNumber({
      context: `${STORY_CONTEXT}.FormatZeroAmount`,
      input: { ...BASE_INPUT, value: 0 },
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayTokenValueField {...formattedResult} />
      </h5>
    )
  },
}

export const FormatWrappedInHeading: Story = {
  render: () => {
    const formattedResult = robustFormatNumberToViewNumber({
      context: `${STORY_CONTEXT}.FormatWrappedInHeading`,
      input: { ...BASE_INPUT },
    })

    return (
      <h5 className="text-3xl font-semibold leading-none">
        <DisplayTokenValueField {...formattedResult} />
      </h5>
    )
  },
}

export const FormatGraySymbolOnly: Story = {
  render: () => {
    const formattedResult = robustFormatNumberToViewNumber({
      context: `${STORY_CONTEXT}.FormatGraySymbolOnly`,
      input: { ...BASE_INPUT },
    })

    return (
      <h5 className="text-3xl font-semibold leading-none">
        <DisplayTokenValueField {...formattedResult} symbolClassName="text-slate-400" />
      </h5>
    )
  },
}

export const FormatLongSymbolTruncation: Story = {
  render: () => {
    const formattedResult = robustFormatNumberToViewNumber({
      context: `${STORY_CONTEXT}.FormatLongSymbolTruncation`,
      input: { ...BASE_INPUT, symbol: "SUPERLONGCURRENCY-2026" },
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayTokenValueField {...formattedResult} symbolMaxChars={8} />
      </h5>
    )
  },
}

export const EdgeNegativeSingleMinus: Story = {
  render: () => {
    const formattedResult = robustFormatNumberToViewNumber({
      context: `${STORY_CONTEXT}.EdgeNegativeSingleMinus`,
      input: { ...BASE_INPUT, value: -9876.543 },
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayTokenValueField {...formattedResult} />
      </h5>
    )
  },
}

export const EdgeBelowMinIndicator: Story = {
  render: () => {
    const formattedResult = robustFormatNumberToViewNumber({
      context: `${STORY_CONTEXT}.EdgeBelowMinIndicator`,
      input: { ...BASE_INPUT, value: 0.00000049 },
      options: {
        minDisplay: 0.01,
        standardDecimals: 2,
      },
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayTokenValueField {...formattedResult} />
      </h5>
    )
  },
}

export const EdgeAboveMaxIndicator: Story = {
  render: () => {
    const formattedResult = robustFormatNumberToViewNumber({
      context: `${STORY_CONTEXT}.EdgeAboveMaxIndicator`,
      input: { ...BASE_INPUT, value: 12345.67 },
      options: {
        maxDisplay: 10000,
        standardDecimals: 2,
      },
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayTokenValueField {...formattedResult} />
      </h5>
    )
  },
}

export const WarningCoercionStringValue: Story = {
  render: () => {
    const formattedResult = robustFormatNumberToViewNumber({
      context: `${STORY_CONTEXT}.WarningCoercionStringValue`,
      input: { ...BASE_INPUT, value: "42.42" },
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayTokenValueField {...formattedResult} />
      </h5>
    )
  },
}

export const WarningCoercionBigIntValue: Story = {
  render: () => {
    const formattedResult = robustFormatNumberToViewNumber({
      context: `${STORY_CONTEXT}.WarningCoercionBigIntValue`,
      input: { ...BASE_INPUT, value: BigInt(42) },
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayTokenValueField {...formattedResult} />
      </h5>
    )
  },
}

export const WarningMissingRequiredValue: Story = {
  render: () => {
    const formattedResult = robustFormatNumberToViewNumber({
      context: `${STORY_CONTEXT}.WarningMissingRequiredValue`,
      input: { ...BASE_INPUT, value: undefined },
      requiredFields: ["value"],
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayTokenValueField {...formattedResult} />
      </h5>
    )
  },
}

export const WarningMissingRequiredValueNull: Story = {
  render: () => {
    const formattedResult = robustFormatNumberToViewNumber({
      context: `${STORY_CONTEXT}.WarningMissingRequiredValueNull`,
      input: { ...BASE_INPUT, value: null },
      requiredFields: ["value"],
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayTokenValueField {...formattedResult} />
      </h5>
    )
  },
}

export const WarningMissingRequiredSymbol: Story = {
  render: () => {
    const formattedResult = robustFormatNumberToViewNumber({
      context: `${STORY_CONTEXT}.WarningMissingRequiredSymbol`,
      input: { ...BASE_INPUT, symbol: undefined },
      requiredFields: ["symbol"],
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayTokenValueField {...formattedResult} />
      </h5>
    )
  },
}

export const ErrorInvalidValueString: Story = {
  render: () => {
    const formattedResult = robustFormatNumberToViewNumber({
      context: `${STORY_CONTEXT}.ErrorInvalidValueString`,
      input: { ...BASE_INPUT, value: "abc" },
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayTokenValueField {...formattedResult} />
      </h5>
    )
  },
}

export const ErrorUnsupportedValueType: Story = {
  render: () => {
    const formattedResult = robustFormatNumberToViewNumber({
      context: `${STORY_CONTEXT}.ErrorUnsupportedValueType`,
      input: { ...BASE_INPUT, value: { bad: true } },
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayTokenValueField {...formattedResult} />
      </h5>
    )
  },
}

export const ErrorInvalidValueNumberInfinity: Story = {
  render: () => {
    const formattedResult = robustFormatNumberToViewNumber({
      context: `${STORY_CONTEXT}.ErrorInvalidValueNumberInfinity`,
      input: { ...BASE_INPUT, value: Infinity },
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayTokenValueField {...formattedResult} />
      </h5>
    )
  },
}

export const ErrorInvalidValueNumberNaN: Story = {
  render: () => {
    const formattedResult = robustFormatNumberToViewNumber({
      context: `${STORY_CONTEXT}.ErrorInvalidValueNumberNaN`,
      input: { ...BASE_INPUT, value: Number.NaN },
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayTokenValueField {...formattedResult} />
      </h5>
    )
  },
}

export const ErrorUnsupportedSymbolType: Story = {
  render: () => {
    const formattedResult = robustFormatNumberToViewNumber({
      context: `${STORY_CONTEXT}.ErrorUnsupportedSymbolType`,
      input: { ...BASE_INPUT, symbol: 12345 },
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayTokenValueField {...formattedResult} />
      </h5>
    )
  },
}

export const ErrorOptionsStandardDecimalsNegative: Story = {
  render: () => {
    const formattedResult = robustFormatNumberToViewNumber({
      context: `${STORY_CONTEXT}.ErrorOptionsStandardDecimalsNegative`,
      input: { ...BASE_INPUT },
      options: { standardDecimals: -1 },
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayTokenValueField {...formattedResult} />
      </h5>
    )
  },
}

export const ErrorOptionsCompactDecimalsOutOfRange: Story = {
  render: () => {
    const formattedResult = robustFormatNumberToViewNumber({
      context: `${STORY_CONTEXT}.ErrorOptionsCompactDecimalsOutOfRange`,
      input: { ...BASE_INPUT },
      options: { compactDecimals: 100 },
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayTokenValueField {...formattedResult} />
      </h5>
    )
  },
}

export const ErrorMissingValueAsHardError: Story = {
  render: () => {
    const formattedResult = robustFormatNumberToViewNumber({
      context: `${STORY_CONTEXT}.ErrorMissingValueAsHardError`,
      input: { ...BASE_INPUT, value: undefined },
      requiredFields: ["value"],
      missingRequiredFieldSeverity: "error",
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayTokenValueField {...formattedResult} />
      </h5>
    )
  },
}

export const QueryErrorMessageOnly: Story = {
  render: () => {
    const formattedResult = robustFormatNumberToViewNumber({
      context: `${STORY_CONTEXT}.QueryErrorMessageOnly`,
      input: { ...BASE_INPUT },
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayTokenValueField
          {...formattedResult}
          queryState={{
            isError: true,
            errorMessage: "Price API is temporarily unavailable.",
          }}
        />
      </h5>
    )
  },
}

export const QueryErrorFromErrorObject: Story = {
  render: () => {
    const formattedResult = robustFormatNumberToViewNumber({
      context: `${STORY_CONTEXT}.QueryErrorFromErrorObject`,
      input: { ...BASE_INPUT },
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayTokenValueField
          {...formattedResult}
          queryState={{
            isError: true,
            error: new Error("RPC provider timeout while fetching token value."),
          }}
        />
      </h5>
    )
  },
}

export const QueryErrorOverridesPropertyWarning: Story = {
  render: () => {
    const formattedResult = robustFormatNumberToViewNumber({
      context: `${STORY_CONTEXT}.QueryErrorOverridesPropertyWarning`,
      input: { ...BASE_INPUT, value: "42.42" },
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayTokenValueField
          {...formattedResult}
          queryState={{
            isError: true,
            errorMessage: "Query layer failed after coercion warning.",
          }}
        />
      </h5>
    )
  },
}

export const QueryErrorWithPropertyHardError: Story = {
  render: () => {
    const formattedResult = robustFormatNumberToViewNumber({
      context: `${STORY_CONTEXT}.QueryErrorWithPropertyHardError`,
      input: { ...BASE_INPUT, value: "abc" },
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayTokenValueField
          {...formattedResult}
          queryState={{
            isError: true,
            error: new Error("Transport failed before fallback."),
          }}
        />
      </h5>
    )
  },
}

export const PartialDataMissingValueNoDiagnostics: Story = {
  render: () => {
    const formattedResult = robustFormatNumberToViewNumber({
      context: `${STORY_CONTEXT}.PartialDataMissingValueNoDiagnostics`,
      input: { ...BASE_INPUT, value: undefined },
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayTokenValueField {...formattedResult} />
      </h5>
    )
  },
}

export const PartialDataMissingSymbolStillRendersValue: Story = {
  render: () => {
    const formattedResult = robustFormatNumberToViewNumber({
      context: `${STORY_CONTEXT}.PartialDataMissingSymbolStillRendersValue`,
      input: { ...BASE_INPUT },
    })
    const valueWithoutSymbol = formattedResult.value
      ? { ...formattedResult.value, symbol: "" }
      : undefined

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayTokenValueField
          value={valueWithoutSymbol}
          warnings={formattedResult.warnings}
          errors={formattedResult.errors}
        />
      </h5>
    )
  },
}

export const LoadingBodySkeleton: Story = {
  render: () => {
    const formattedResult = robustFormatNumberToViewNumber({
      context: `${STORY_CONTEXT}.LoadingBodySkeleton`,
      input: { ...BASE_INPUT },
    })

    return (
      <p className="text-base">
        <DisplayTokenValueField
          {...formattedResult}
          queryState={{ ...LOADING_QUERY_STATE }}
          loaderSkeleton
          skeletonWidth={120}
        />
      </p>
    )
  },
}

export const LoadingHeadingSkeleton: Story = {
  render: () => {
    const formattedResult = robustFormatNumberToViewNumber({
      context: `${STORY_CONTEXT}.LoadingHeadingSkeleton`,
      input: { ...BASE_INPUT },
    })

    return (
      <h5 className="text-3xl font-semibold leading-none">
        <DisplayTokenValueField
          {...formattedResult}
          queryState={{ ...LOADING_QUERY_STATE }}
          loaderSkeleton
          skeletonWidth={220}
        />
      </h5>
    )
  },
}

export const PendingSpinner: Story = {
  render: () => {
    const formattedResult = robustFormatNumberToViewNumber({
      context: `${STORY_CONTEXT}.PendingSpinner`,
      input: { ...BASE_INPUT },
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayTokenValueField
          {...formattedResult}
          queryState={{ ...PENDING_QUERY_STATE }}
          loaderSkeleton={false}
        />
      </h5>
    )
  },
}

export const FormatOptionsStandardDecimals4: Story = {
  render: () => {
    const formattedResult = robustFormatNumberToViewNumber({
      context: `${STORY_CONTEXT}.FormatOptionsStandardDecimals4`,
      input: { ...BASE_INPUT },
      options: { standardDecimals: 4 },
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayTokenValueField {...formattedResult} />
      </h5>
    )
  },
}

export const FormatLocaleDeDEGrouping: Story = {
  render: () => {
    const formattedResult = robustFormatNumberToViewNumber({
      context: `${STORY_CONTEXT}.FormatLocaleDeDEGrouping`,
      input: { ...BASE_INPUT, value: 12345.678 },
      options: { locale: "de-DE", standardDecimals: 2 },
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayTokenValueField {...formattedResult} />
      </h5>
    )
  },
}

export const FormatCompactThresholdForced: Story = {
  render: () => {
    const formattedResult = robustFormatNumberToViewNumber({
      context: `${STORY_CONTEXT}.FormatCompactThresholdForced`,
      input: { ...BASE_INPUT, value: 1200 },
      options: { compactThreshold: 100, compactDecimals: 2 },
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayTokenValueField {...formattedResult} />
      </h5>
    )
  },
}

export const FormatMinDisplaySmaller: Story = {
  render: () => {
    const formattedResult = robustFormatNumberToViewNumber({
      context: `${STORY_CONTEXT}.FormatMinDisplaySmaller`,
      input: { ...BASE_INPUT, value: 0.0000049 },
      options: { minDisplay: 0.000001, standardDecimals: 6 },
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayTokenValueField {...formattedResult} />
      </h5>
    )
  },
}

export const FormatMaxDisplayCap: Story = {
  render: () => {
    const formattedResult = robustFormatNumberToViewNumber({
      context: `${STORY_CONTEXT}.FormatMaxDisplayCap`,
      input: { ...BASE_INPUT, value: 54321.987 },
      options: { maxDisplay: 10000, standardDecimals: 2 },
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayTokenValueField {...formattedResult} />
      </h5>
    )
  },
}

export const OverrideRequiredFieldsEmptyNoDiagnostics: Story = {
  render: () => {
    const formattedResult = robustFormatNumberToViewNumber({
      context: `${STORY_CONTEXT}.OverrideRequiredFieldsEmptyNoDiagnostics`,
      input: { ...BASE_INPUT, value: undefined },
      requiredFields: [],
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayTokenValueField {...formattedResult} />
      </h5>
    )
  },
}

export const QueryErrorFromStringPayload: Story = {
  render: () => {
    const formattedResult = robustFormatNumberToViewNumber({
      context: `${STORY_CONTEXT}.QueryErrorFromStringPayload`,
      input: { ...BASE_INPUT },
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayTokenValueField
          {...formattedResult}
          queryState={{
            isError: true,
            error: "RPC returned a string error payload.",
          }}
        />
      </h5>
    )
  },
}

export const DisplayFallbackViewValueOnly: Story = {
  render: () => {
    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayTokenValueField fallbackViewValue="N/A" symbol="$" />
      </h5>
    )
  },
}

export const DisplayPrefixAndIndicatorCustom: Story = {
  render: () => {
    const formattedResult = robustFormatNumberToViewNumber({
      context: `${STORY_CONTEXT}.DisplayPrefixAndIndicatorCustom`,
      input: { ...BASE_INPUT },
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayTokenValueField {...formattedResult} prefix="≈" indicator="~" />
      </h5>
    )
  },
}

export const DisplaySymbolPositionAfter: Story = {
  render: () => {
    const formattedResult = robustFormatNumberToViewNumber({
      context: `${STORY_CONTEXT}.DisplaySymbolPositionAfter`,
      input: { ...BASE_INPUT },
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayTokenValueField {...formattedResult} symbolPosition="after" />
      </h5>
    )
  },
}

export const WarningDisplayErrorBeforeValue: Story = {
  render: () => {
    const formattedResult = robustFormatNumberToViewNumber({
      context: `${STORY_CONTEXT}.WarningDisplayErrorBeforeValue`,
      input: { ...BASE_INPUT, value: "42.42" },
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayTokenValueField {...formattedResult} errorPossition="before" />
      </h5>
    )
  },
}

export const FormatEuroSymbol: Story = {
  render: () => {
    const formattedResult = robustFormatNumberToViewNumber({
      context: `${STORY_CONTEXT}.FormatEuroSymbol`,
      input: { ...BASE_INPUT, value: 9876.54, symbol: "€" },
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayTokenValueField {...formattedResult} />
      </h5>
    )
  },
}
