import type { Meta, StoryObj } from "@storybook/react"
import type { QueryResponse } from "web3-display-components"
import { robustFormatPercentToViewPercent } from "web3-robust-formatting"
import { DisplayPercentageField } from "@/app/components/display-fields"

const STORY_CONTEXT = "storybook.DisplayComponents.Percentage.Field"

const BASE_INPUT = {
  value: 0.123456,
} as const

const LOADING_QUERY_STATE = {
  isLoading: true,
} satisfies QueryResponse

const PENDING_QUERY_STATE = {
  isPending: true,
} satisfies QueryResponse

const meta: Meta<typeof DisplayPercentageField> = {
  title: "Display Components/Percentage/Field",
  component: DisplayPercentageField,
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
type Story = StoryObj<typeof DisplayPercentageField>

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
    const formattedResult = robustFormatPercentToViewPercent({
      context: `${STORY_CONTEXT}.Playground`,
      input: { ...BASE_INPUT },
      requiredFields: ["value"],
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayPercentageField {...args} {...formattedResult} />
      </h5>
    )
  },
}

export const FormatSmallAmount: Story = {
  render: () => {
    const formattedResult = robustFormatPercentToViewPercent({
      context: `${STORY_CONTEXT}.FormatSmallAmount`,
      input: { ...BASE_INPUT, value: 0.0001234 },
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayPercentageField {...formattedResult} />
      </h5>
    )
  },
}

export const FormatMidAmount: Story = {
  render: () => {
    const formattedResult = robustFormatPercentToViewPercent({
      context: `${STORY_CONTEXT}.FormatMidAmount`,
      input: { ...BASE_INPUT },
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayPercentageField {...formattedResult} />
      </h5>
    )
  },
}

export const FormatTenThousandPlusPercent: Story = {
  render: () => {
    const formattedResult = robustFormatPercentToViewPercent({
      context: `${STORY_CONTEXT}.FormatTenThousandPlusPercent`,
      input: { ...BASE_INPUT, value: 100 },
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayPercentageField {...formattedResult} />
      </h5>
    )
  },
}

export const FormatOneMillionPlusPercent: Story = {
  render: () => {
    const formattedResult = robustFormatPercentToViewPercent({
      context: `${STORY_CONTEXT}.FormatOneMillionPlusPercent`,
      input: { ...BASE_INPUT, value: 12_345 },
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayPercentageField {...formattedResult} />
      </h5>
    )
  },
}

export const FormatBigCompactAmount: Story = {
  render: () => {
    const formattedResult = robustFormatPercentToViewPercent({
      context: `${STORY_CONTEXT}.FormatBigCompactAmount`,
      input: { ...BASE_INPUT, value: 25_000 },
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayPercentageField {...formattedResult} />
      </h5>
    )
  },
}

export const FormatZeroAmount: Story = {
  render: () => {
    const formattedResult = robustFormatPercentToViewPercent({
      context: `${STORY_CONTEXT}.FormatZeroAmount`,
      input: { ...BASE_INPUT, value: 0 },
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayPercentageField {...formattedResult} />
      </h5>
    )
  },
}

export const FormatWrappedInHeading: Story = {
  render: () => {
    const formattedResult = robustFormatPercentToViewPercent({
      context: `${STORY_CONTEXT}.FormatWrappedInHeading`,
      input: { ...BASE_INPUT },
    })

    return (
      <h5 className="text-3xl font-semibold leading-none">
        <DisplayPercentageField {...formattedResult} />
      </h5>
    )
  },
}

export const FormatGraySymbolOnly: Story = {
  render: () => {
    const formattedResult = robustFormatPercentToViewPercent({
      context: `${STORY_CONTEXT}.FormatGraySymbolOnly`,
      input: { ...BASE_INPUT },
    })

    return (
      <h5 className="text-3xl font-semibold leading-none">
        <DisplayPercentageField {...formattedResult} symbolClassName="text-slate-400" />
      </h5>
    )
  },
}

export const EdgeNegativeSingleMinus: Story = {
  render: () => {
    const formattedResult = robustFormatPercentToViewPercent({
      context: `${STORY_CONTEXT}.EdgeNegativeSingleMinus`,
      input: { ...BASE_INPUT, value: -0.098765 },
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayPercentageField {...formattedResult} />
      </h5>
    )
  },
}

export const EdgeBelowMinIndicator: Story = {
  render: () => {
    const formattedResult = robustFormatPercentToViewPercent({
      context: `${STORY_CONTEXT}.EdgeBelowMinIndicator`,
      input: { ...BASE_INPUT, value: 0.00000049 },
      options: {
        minDisplay: 0.01,
        standardDecimals: 2,
      },
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayPercentageField {...formattedResult} />
      </h5>
    )
  },
}

export const EdgeAboveMaxIndicator: Story = {
  render: () => {
    const formattedResult = robustFormatPercentToViewPercent({
      context: `${STORY_CONTEXT}.EdgeAboveMaxIndicator`,
      input: { ...BASE_INPUT, value: 1.25 },
      options: {
        maxDisplay: 100,
        standardDecimals: 2,
      },
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayPercentageField {...formattedResult} />
      </h5>
    )
  },
}

export const WarningCoercionStringValue: Story = {
  render: () => {
    const formattedResult = robustFormatPercentToViewPercent({
      context: `${STORY_CONTEXT}.WarningCoercionStringValue`,
      input: { ...BASE_INPUT, value: "0.042" },
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayPercentageField {...formattedResult} />
      </h5>
    )
  },
}

export const WarningCoercionBigIntValue: Story = {
  render: () => {
    const formattedResult = robustFormatPercentToViewPercent({
      context: `${STORY_CONTEXT}.WarningCoercionBigIntValue`,
      input: { ...BASE_INPUT, value: BigInt(1) },
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayPercentageField {...formattedResult} />
      </h5>
    )
  },
}

export const WarningCoercionStringMultiplierAndDivider: Story = {
  render: () => {
    const formattedResult = robustFormatPercentToViewPercent({
      context: `${STORY_CONTEXT}.WarningCoercionStringMultiplierAndDivider`,
      input: { ...BASE_INPUT, value: 25 },
      multiplier: "1",
      divider: "100",
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayPercentageField {...formattedResult} />
      </h5>
    )
  },
}

export const WarningMissingRequiredValue: Story = {
  render: () => {
    const formattedResult = robustFormatPercentToViewPercent({
      context: `${STORY_CONTEXT}.WarningMissingRequiredValue`,
      input: { ...BASE_INPUT, value: undefined },
      requiredFields: ["value"],
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayPercentageField {...formattedResult} />
      </h5>
    )
  },
}

export const WarningMissingRequiredValueNull: Story = {
  render: () => {
    const formattedResult = robustFormatPercentToViewPercent({
      context: `${STORY_CONTEXT}.WarningMissingRequiredValueNull`,
      input: { ...BASE_INPUT, value: null },
      requiredFields: ["value"],
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayPercentageField {...formattedResult} />
      </h5>
    )
  },
}

export const ErrorInvalidValueString: Story = {
  render: () => {
    const formattedResult = robustFormatPercentToViewPercent({
      context: `${STORY_CONTEXT}.ErrorInvalidValueString`,
      input: { ...BASE_INPUT, value: "abc" },
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayPercentageField {...formattedResult} />
      </h5>
    )
  },
}

export const ErrorUnsupportedValueType: Story = {
  render: () => {
    const formattedResult = robustFormatPercentToViewPercent({
      context: `${STORY_CONTEXT}.ErrorUnsupportedValueType`,
      input: { ...BASE_INPUT, value: { bad: true } },
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayPercentageField {...formattedResult} />
      </h5>
    )
  },
}

export const ErrorInvalidValueNumberInfinity: Story = {
  render: () => {
    const formattedResult = robustFormatPercentToViewPercent({
      context: `${STORY_CONTEXT}.ErrorInvalidValueNumberInfinity`,
      input: { ...BASE_INPUT, value: Infinity },
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayPercentageField {...formattedResult} />
      </h5>
    )
  },
}

export const ErrorInvalidValueNumberNaN: Story = {
  render: () => {
    const formattedResult = robustFormatPercentToViewPercent({
      context: `${STORY_CONTEXT}.ErrorInvalidValueNumberNaN`,
      input: { ...BASE_INPUT, value: Number.NaN },
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayPercentageField {...formattedResult} />
      </h5>
    )
  },
}

export const ErrorInvalidMultiplierType: Story = {
  render: () => {
    const formattedResult = robustFormatPercentToViewPercent({
      context: `${STORY_CONTEXT}.ErrorInvalidMultiplierType`,
      input: { ...BASE_INPUT, value: 0.25 },
      multiplier: { value: 2 },
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayPercentageField {...formattedResult} />
      </h5>
    )
  },
}

export const ErrorDividerZero: Story = {
  render: () => {
    const formattedResult = robustFormatPercentToViewPercent({
      context: `${STORY_CONTEXT}.ErrorDividerZero`,
      input: { ...BASE_INPUT, value: 25 },
      divider: 0,
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayPercentageField {...formattedResult} />
      </h5>
    )
  },
}

export const ErrorInvalidDividerString: Story = {
  render: () => {
    const formattedResult = robustFormatPercentToViewPercent({
      context: `${STORY_CONTEXT}.ErrorInvalidDividerString`,
      input: { ...BASE_INPUT, value: 25 },
      divider: "bad",
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayPercentageField {...formattedResult} />
      </h5>
    )
  },
}

export const ErrorMissingValueAsHardError: Story = {
  render: () => {
    const formattedResult = robustFormatPercentToViewPercent({
      context: `${STORY_CONTEXT}.ErrorMissingValueAsHardError`,
      input: { ...BASE_INPUT, value: undefined },
      requiredFields: ["value"],
      missingRequiredFieldSeverity: "error",
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayPercentageField {...formattedResult} />
      </h5>
    )
  },
}

export const QueryErrorMessageOnly: Story = {
  render: () => {
    const formattedResult = robustFormatPercentToViewPercent({
      context: `${STORY_CONTEXT}.QueryErrorMessageOnly`,
      input: { ...BASE_INPUT },
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayPercentageField
          {...formattedResult}
          queryState={{
            isError: true,
            errorMessage: "Percent API is temporarily unavailable.",
          }}
        />
      </h5>
    )
  },
}

export const QueryErrorFromErrorObject: Story = {
  render: () => {
    const formattedResult = robustFormatPercentToViewPercent({
      context: `${STORY_CONTEXT}.QueryErrorFromErrorObject`,
      input: { ...BASE_INPUT },
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayPercentageField
          {...formattedResult}
          queryState={{
            isError: true,
            error: new Error("RPC provider timeout while fetching percentage."),
          }}
        />
      </h5>
    )
  },
}

export const QueryErrorOverridesPropertyWarning: Story = {
  render: () => {
    const formattedResult = robustFormatPercentToViewPercent({
      context: `${STORY_CONTEXT}.QueryErrorOverridesPropertyWarning`,
      input: { ...BASE_INPUT, value: "0.042" },
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayPercentageField
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
    const formattedResult = robustFormatPercentToViewPercent({
      context: `${STORY_CONTEXT}.QueryErrorWithPropertyHardError`,
      input: { ...BASE_INPUT, value: "abc" },
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayPercentageField
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
    const formattedResult = robustFormatPercentToViewPercent({
      context: `${STORY_CONTEXT}.PartialDataMissingValueNoDiagnostics`,
      input: { ...BASE_INPUT, value: undefined },
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayPercentageField {...formattedResult} />
      </h5>
    )
  },
}

export const PartialDataMissingSymbolStillRendersValue: Story = {
  render: () => {
    const formattedResult = robustFormatPercentToViewPercent({
      context: `${STORY_CONTEXT}.PartialDataMissingSymbolStillRendersValue`,
      input: { ...BASE_INPUT },
    })
    const valueWithoutSymbol = formattedResult.value
      ? { ...formattedResult.value, symbol: "" }
      : undefined

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayPercentageField
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
    const formattedResult = robustFormatPercentToViewPercent({
      context: `${STORY_CONTEXT}.LoadingBodySkeleton`,
      input: { ...BASE_INPUT },
    })

    return (
      <p className="text-base">
        <DisplayPercentageField
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
    const formattedResult = robustFormatPercentToViewPercent({
      context: `${STORY_CONTEXT}.LoadingHeadingSkeleton`,
      input: { ...BASE_INPUT },
    })

    return (
      <h5 className="text-3xl font-semibold leading-none">
        <DisplayPercentageField
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
    const formattedResult = robustFormatPercentToViewPercent({
      context: `${STORY_CONTEXT}.PendingSpinner`,
      input: { ...BASE_INPUT },
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayPercentageField
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
    const formattedResult = robustFormatPercentToViewPercent({
      context: `${STORY_CONTEXT}.FormatOptionsStandardDecimals4`,
      input: { ...BASE_INPUT },
      options: { standardDecimals: 4 },
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayPercentageField {...formattedResult} />
      </h5>
    )
  },
}

export const FormatLocaleDeDEGrouping: Story = {
  render: () => {
    const formattedResult = robustFormatPercentToViewPercent({
      context: `${STORY_CONTEXT}.FormatLocaleDeDEGrouping`,
      input: { ...BASE_INPUT, value: 12.3456 },
      options: { locale: "de-DE", standardDecimals: 2 },
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayPercentageField {...formattedResult} />
      </h5>
    )
  },
}

export const FormatCompactThresholdForced: Story = {
  render: () => {
    const formattedResult = robustFormatPercentToViewPercent({
      context: `${STORY_CONTEXT}.FormatCompactThresholdForced`,
      input: { ...BASE_INPUT, value: 12 },
      options: { compactThreshold: 100, compactDecimals: 2 },
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayPercentageField {...formattedResult} />
      </h5>
    )
  },
}

export const OverrideRequiredFieldsEmptyNoDiagnostics: Story = {
  render: () => {
    const formattedResult = robustFormatPercentToViewPercent({
      context: `${STORY_CONTEXT}.OverrideRequiredFieldsEmptyNoDiagnostics`,
      input: { ...BASE_INPUT, value: undefined },
      requiredFields: [],
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayPercentageField {...formattedResult} />
      </h5>
    )
  },
}

export const QueryErrorFromStringPayload: Story = {
  render: () => {
    const formattedResult = robustFormatPercentToViewPercent({
      context: `${STORY_CONTEXT}.QueryErrorFromStringPayload`,
      input: { ...BASE_INPUT },
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayPercentageField
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
        <DisplayPercentageField fallbackViewValue="N/A" symbol="%" />
      </h5>
    )
  },
}

export const DisplayPrefixAndIndicatorCustom: Story = {
  render: () => {
    const formattedResult = robustFormatPercentToViewPercent({
      context: `${STORY_CONTEXT}.DisplayPrefixAndIndicatorCustom`,
      input: { ...BASE_INPUT },
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayPercentageField {...formattedResult} prefix="≈" indicator="~" />
      </h5>
    )
  },
}

export const DisplaySymbolPositionBefore: Story = {
  render: () => {
    const formattedResult = robustFormatPercentToViewPercent({
      context: `${STORY_CONTEXT}.DisplaySymbolPositionBefore`,
      input: { ...BASE_INPUT },
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayPercentageField {...formattedResult} symbolPosition="before" />
      </h5>
    )
  },
}

export const WarningDisplayErrorBeforeValue: Story = {
  render: () => {
    const formattedResult = robustFormatPercentToViewPercent({
      context: `${STORY_CONTEXT}.WarningDisplayErrorBeforeValue`,
      input: { ...BASE_INPUT, value: "0.042" },
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayPercentageField {...formattedResult} errorPossition="before" />
      </h5>
    )
  },
}

export const FormatScaledWithMultiplierDivider: Story = {
  render: () => {
    const formattedResult = robustFormatPercentToViewPercent({
      context: `${STORY_CONTEXT}.FormatScaledWithMultiplierDivider`,
      input: { ...BASE_INPUT, value: 25 },
      multiplier: 1,
      divider: 100,
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayPercentageField {...formattedResult} />
      </h5>
    )
  },
}
