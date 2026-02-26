import type { Meta, StoryObj } from "@storybook/react"
import type { QueryResponse } from "web3-display-components"
import { robustFormatBigIntToViewTokenAmount } from "web3-robust-formatting"
import { DisplayTokenAmountField } from "@/app/components/display-fields"

const STORY_CONTEXT = "storybook.DisplayComponents.TokenAmount.Field"

const BASE_INPUT = {
  bigIntValue: BigInt("123456789"),
  decimals: 6,
  symbol: "USDC",
} as const

const LOADING_QUERY_STATE = {
  isLoading: true,
} satisfies QueryResponse

const PENDING_QUERY_STATE = {
  isPending: true,
} satisfies QueryResponse

const meta: Meta<typeof DisplayTokenAmountField> = {
  title: "Display Components/Token Amount/Field",
  component: DisplayTokenAmountField,
  tags: ["autodocs"],
  argTypes: {
    value: { control: false },
    warnings: { control: false },
    errors: { control: false },
    isLoading: { control: false },
    isPending: { control: false },
    isError: { control: false },
    error: { control: false },
    errorMessage: { control: false },
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
type Story = StoryObj<typeof DisplayTokenAmountField>

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
    const formattedResult = robustFormatBigIntToViewTokenAmount({
      context: `${STORY_CONTEXT}.Playground`,
      input: { ...BASE_INPUT },
      requiredFields: ["bigIntValue", "decimals"],
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayTokenAmountField {...args} {...formattedResult} />
      </h5>
    )
  },
}

export const FormatSmallAmount: Story = {
  render: () => {
    const formattedResult = robustFormatBigIntToViewTokenAmount({
      context: `${STORY_CONTEXT}.FormatSmallAmount`,
      input: { ...BASE_INPUT, bigIntValue: BigInt("1234567") },
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayTokenAmountField {...formattedResult} />
      </h5>
    )
  },
}

export const FormatMidAmount: Story = {
  render: () => {
    const formattedResult = robustFormatBigIntToViewTokenAmount({
      context: `${STORY_CONTEXT}.FormatMidAmount`,
      input: { ...BASE_INPUT },
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayTokenAmountField {...formattedResult} />
      </h5>
    )
  },
}

export const FormatTenThousandPlusUSDC: Story = {
  render: () => {
    const formattedResult = robustFormatBigIntToViewTokenAmount({
      context: `${STORY_CONTEXT}.FormatTenThousandPlusUSDC`,
      input: { ...BASE_INPUT, bigIntValue: BigInt("10000000000") },
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayTokenAmountField {...formattedResult} />
      </h5>
    )
  },
}

export const FormatOneMillionPlusUSDC: Story = {
  render: () => {
    const formattedResult = robustFormatBigIntToViewTokenAmount({
      context: `${STORY_CONTEXT}.FormatOneMillionPlusUSDC`,
      input: { ...BASE_INPUT, bigIntValue: BigInt("1234567890000") },
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayTokenAmountField {...formattedResult} />
      </h5>
    )
  },
}

export const FormatBigCompactAmount: Story = {
  render: () => {
    const formattedResult = robustFormatBigIntToViewTokenAmount({
      context: `${STORY_CONTEXT}.FormatBigCompactAmount`,
      input: { ...BASE_INPUT, bigIntValue: BigInt("123456789000000") },
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayTokenAmountField {...formattedResult} />
      </h5>
    )
  },
}

export const FormatZeroAmount: Story = {
  render: () => {
    const formattedResult = robustFormatBigIntToViewTokenAmount({
      context: `${STORY_CONTEXT}.FormatZeroAmount`,
      input: { ...BASE_INPUT, bigIntValue: BigInt(0) },
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayTokenAmountField {...formattedResult} />
      </h5>
    )
  },
}

export const FormatWrappedInHeading: Story = {
  render: () => {
    const formattedResult = robustFormatBigIntToViewTokenAmount({
      context: `${STORY_CONTEXT}.FormatWrappedInHeading`,
      input: { ...BASE_INPUT },
    })

    return (
      <h5 className="text-3xl font-semibold leading-none">
        <DisplayTokenAmountField {...formattedResult} />
      </h5>
    )
  },
}

export const FormatGraySymbolOnly: Story = {
  render: () => {
    const formattedResult = robustFormatBigIntToViewTokenAmount({
      context: `${STORY_CONTEXT}.FormatGraySymbolOnly`,
      input: { ...BASE_INPUT },
    })

    return (
      <h5 className="text-3xl font-semibold leading-none">
        <DisplayTokenAmountField {...formattedResult} symbolClassName="text-slate-400" />
      </h5>
    )
  },
}

export const FormatLongSymbolTruncation: Story = {
  render: () => {
    const formattedResult = robustFormatBigIntToViewTokenAmount({
      context: `${STORY_CONTEXT}.FormatLongSymbolTruncation`,
      input: { ...BASE_INPUT, symbol: "SUPERLONGTOKEN-2025" },
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayTokenAmountField {...formattedResult} symbolMaxChars={8} />
      </h5>
    )
  },
}

export const EdgeNegativeSingleMinus: Story = {
  render: () => {
    const formattedResult = robustFormatBigIntToViewTokenAmount({
      context: `${STORY_CONTEXT}.EdgeNegativeSingleMinus`,
      input: { ...BASE_INPUT, bigIntValue: BigInt("-9876543") },
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayTokenAmountField {...formattedResult} />
      </h5>
    )
  },
}

export const EdgeBelowMinIndicator: Story = {
  render: () => {
    const formattedResult = robustFormatBigIntToViewTokenAmount({
      context: `${STORY_CONTEXT}.EdgeBelowMinIndicator`,
      input: { ...BASE_INPUT, bigIntValue: BigInt("5"), decimals: 9 },
      config: {
        minDisplay: 0.000001,
        singleDigitDecimals: 6,
      },
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayTokenAmountField {...formattedResult} />
      </h5>
    )
  },
}

export const EdgeAboveMaxIndicator: Story = {
  render: () => {
    const formattedResult = robustFormatBigIntToViewTokenAmount({
      context: `${STORY_CONTEXT}.EdgeAboveMaxIndicator`,
      input: { ...BASE_INPUT, bigIntValue: BigInt("250000000") },
      config: {
        maxDisplay: 100,
        twoDigitDecimals: 2,
      },
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayTokenAmountField {...formattedResult} />
      </h5>
    )
  },
}

export const WarningCoercionStringBigIntAndDecimals: Story = {
  render: () => {
    const formattedResult = robustFormatBigIntToViewTokenAmount({
      context: `${STORY_CONTEXT}.WarningCoercionStringBigIntAndDecimals`,
      input: { ...BASE_INPUT, bigIntValue: "4200000", decimals: "6" },
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayTokenAmountField {...formattedResult} />
      </h5>
    )
  },
}

export const WarningCoercionNumberBigInt: Story = {
  render: () => {
    const formattedResult = robustFormatBigIntToViewTokenAmount({
      context: `${STORY_CONTEXT}.WarningCoercionNumberBigInt`,
      input: { ...BASE_INPUT, bigIntValue: 4200000 },
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayTokenAmountField {...formattedResult} />
      </h5>
    )
  },
}

export const WarningCoercionBigIntDecimals: Story = {
  render: () => {
    const formattedResult = robustFormatBigIntToViewTokenAmount({
      context: `${STORY_CONTEXT}.WarningCoercionBigIntDecimals`,
      input: { ...BASE_INPUT, decimals: BigInt(6) },
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayTokenAmountField {...formattedResult} />
      </h5>
    )
  },
}

export const WarningMissingDecimalsDefaultRequired: Story = {
  render: () => {
    const formattedResult = robustFormatBigIntToViewTokenAmount({
      context: `${STORY_CONTEXT}.WarningMissingDecimalsDefaultRequired`,
      input: { ...BASE_INPUT, decimals: undefined },
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayTokenAmountField {...formattedResult} />
      </h5>
    )
  },
}

export const WarningMissingRequiredSymbol: Story = {
  render: () => {
    const formattedResult = robustFormatBigIntToViewTokenAmount({
      context: `${STORY_CONTEXT}.WarningMissingRequiredSymbol`,
      input: { ...BASE_INPUT, symbol: undefined },
      requiredFields: ["decimals", "symbol"],
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayTokenAmountField {...formattedResult} />
      </h5>
    )
  },
}

export const ErrorInvalidBigIntDecimalString: Story = {
  render: () => {
    const formattedResult = robustFormatBigIntToViewTokenAmount({
      context: `${STORY_CONTEXT}.ErrorInvalidBigIntDecimalString`,
      input: { ...BASE_INPUT, bigIntValue: "12.34" },
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayTokenAmountField {...formattedResult} />
      </h5>
    )
  },
}

export const ErrorUnsupportedBigIntType: Story = {
  render: () => {
    const formattedResult = robustFormatBigIntToViewTokenAmount({
      context: `${STORY_CONTEXT}.ErrorUnsupportedBigIntType`,
      input: { ...BASE_INPUT, bigIntValue: { value: "4200000" } },
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayTokenAmountField {...formattedResult} />
      </h5>
    )
  },
}

export const ErrorInvalidDecimalsStringFloat: Story = {
  render: () => {
    const formattedResult = robustFormatBigIntToViewTokenAmount({
      context: `${STORY_CONTEXT}.ErrorInvalidDecimalsStringFloat`,
      input: { ...BASE_INPUT, decimals: "6.5" },
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayTokenAmountField {...formattedResult} />
      </h5>
    )
  },
}

export const ErrorNegativeDecimals: Story = {
  render: () => {
    const formattedResult = robustFormatBigIntToViewTokenAmount({
      context: `${STORY_CONTEXT}.ErrorNegativeDecimals`,
      input: { ...BASE_INPUT, decimals: -1 },
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayTokenAmountField {...formattedResult} />
      </h5>
    )
  },
}

export const ErrorUnsupportedSymbolType: Story = {
  render: () => {
    const formattedResult = robustFormatBigIntToViewTokenAmount({
      context: `${STORY_CONTEXT}.ErrorUnsupportedSymbolType`,
      input: { ...BASE_INPUT, symbol: 12345 },
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayTokenAmountField {...formattedResult} />
      </h5>
    )
  },
}

export const ErrorMissingDecimalsAsHardError: Story = {
  render: () => {
    const formattedResult = robustFormatBigIntToViewTokenAmount({
      context: `${STORY_CONTEXT}.ErrorMissingDecimalsAsHardError`,
      input: { ...BASE_INPUT, decimals: undefined },
      missingRequiredFieldSeverity: "error",
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayTokenAmountField {...formattedResult} />
      </h5>
    )
  },
}

export const ErrorHugeDecimalsStringOutOfRange: Story = {
  render: () => {
    const formattedResult = robustFormatBigIntToViewTokenAmount({
      context: `${STORY_CONTEXT}.ErrorHugeDecimalsStringOutOfRange`,
      input: { ...BASE_INPUT, decimals: "9999999999999999999999" },
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayTokenAmountField {...formattedResult} />
      </h5>
    )
  },
}

export const QueryErrorMessageOnly: Story = {
  render: () => {
    const formattedResult = robustFormatBigIntToViewTokenAmount({
      context: `${STORY_CONTEXT}.QueryErrorMessageOnly`,
      input: { ...BASE_INPUT },
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayTokenAmountField {...formattedResult}
          {...{
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
    const formattedResult = robustFormatBigIntToViewTokenAmount({
      context: `${STORY_CONTEXT}.QueryErrorFromErrorObject`,
      input: { ...BASE_INPUT },
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayTokenAmountField {...formattedResult}
          {...{
            isError: true,
            error: new Error("RPC provider timeout while fetching amount."),
          }}
        />
      </h5>
    )
  },
}

export const QueryErrorOverridesPropertyWarning: Story = {
  render: () => {
    const formattedResult = robustFormatBigIntToViewTokenAmount({
      context: `${STORY_CONTEXT}.QueryErrorOverridesPropertyWarning`,
      input: { ...BASE_INPUT, bigIntValue: "4200000", decimals: "6" },
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayTokenAmountField {...formattedResult}
          {...{
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
    const formattedResult = robustFormatBigIntToViewTokenAmount({
      context: `${STORY_CONTEXT}.QueryErrorWithPropertyHardError`,
      input: { ...BASE_INPUT, bigIntValue: "12.34" },
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayTokenAmountField {...formattedResult}
          {...{
            isError: true,
            error: new Error("Transport failed before fallback."),
          }}
        />
      </h5>
    )
  },
}

export const PartialDataMissingBigIntNoDiagnostics: Story = {
  render: () => {
    const formattedResult = robustFormatBigIntToViewTokenAmount({
      context: `${STORY_CONTEXT}.PartialDataMissingBigIntNoDiagnostics`,
      input: {
        ...BASE_INPUT,
        bigIntValue: undefined,
        decimals: undefined,
        symbol: undefined,
      },
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayTokenAmountField {...formattedResult} />
      </h5>
    )
  },
}

export const PartialDataMissingSymbolStillRendersValue: Story = {
  render: () => {
    const formattedResult = robustFormatBigIntToViewTokenAmount({
      context: `${STORY_CONTEXT}.PartialDataMissingSymbolStillRendersValue`,
      input: { ...BASE_INPUT, symbol: undefined },
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayTokenAmountField {...formattedResult} />
      </h5>
    )
  },
}

export const LoadingBodySkeleton: Story = {
  render: () => {
    const formattedResult = robustFormatBigIntToViewTokenAmount({
      context: `${STORY_CONTEXT}.LoadingBodySkeleton`,
      input: { ...BASE_INPUT },
    })

    return (
      <p className="text-base">
        <DisplayTokenAmountField {...formattedResult}
          {...LOADING_QUERY_STATE}
          loaderSkeleton
          skeletonWidth={120}
        />
      </p>
    )
  },
}

export const LoadingHeadingSkeleton: Story = {
  render: () => {
    const formattedResult = robustFormatBigIntToViewTokenAmount({
      context: `${STORY_CONTEXT}.LoadingHeadingSkeleton`,
      input: { ...BASE_INPUT },
    })

    return (
      <h5 className="text-3xl font-semibold leading-none">
        <DisplayTokenAmountField {...formattedResult}
          {...LOADING_QUERY_STATE}
          loaderSkeleton
          skeletonWidth={220}
        />
      </h5>
    )
  },
}

export const PendingSpinner: Story = {
  render: () => {
    const formattedResult = robustFormatBigIntToViewTokenAmount({
      context: `${STORY_CONTEXT}.PendingSpinner`,
      input: { ...BASE_INPUT },
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayTokenAmountField {...formattedResult}
          {...PENDING_QUERY_STATE}
          loaderSkeleton={false}
        />
      </h5>
    )
  },
}

export const FormatFixedDecimalsMode: Story = {
  render: () => {
    const formattedResult = robustFormatBigIntToViewTokenAmount({
      context: `${STORY_CONTEXT}.FormatFixedDecimalsMode`,
      input: { ...BASE_INPUT, bigIntValue: BigInt("12345000") },
      config: { decimals: 4 },
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayTokenAmountField {...formattedResult} />
      </h5>
    )
  },
}

export const FormatFixedDecimalsWithBelowMinFloor: Story = {
  render: () => {
    const formattedResult = robustFormatBigIntToViewTokenAmount({
      context: `${STORY_CONTEXT}.FormatFixedDecimalsWithBelowMinFloor`,
      input: { ...BASE_INPUT, bigIntValue: BigInt("5"), decimals: 9 },
      config: {
        decimals: 4,
        minDisplay: 0.000001,
        singleDigitDecimals: 6,
      },
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayTokenAmountField {...formattedResult} />
      </h5>
    )
  },
}

export const FormatLocaleDeDEGrouping: Story = {
  render: () => {
    const formattedResult = robustFormatBigIntToViewTokenAmount({
      context: `${STORY_CONTEXT}.FormatLocaleDeDEGrouping`,
      input: { ...BASE_INPUT, bigIntValue: BigInt("123456789000") },
      config: { locale: "de-DE", twoDigitDecimals: 2 },
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayTokenAmountField {...formattedResult} />
      </h5>
    )
  },
}

export const WarningOverrideDefaultRequiredFields: Story = {
  render: () => {
    const formattedResult = robustFormatBigIntToViewTokenAmount({
      context: `${STORY_CONTEXT}.WarningOverrideDefaultRequiredFields`,
      input: { ...BASE_INPUT, bigIntValue: "4200000", decimals: undefined },
      requiredFields: [],
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayTokenAmountField {...formattedResult} />
      </h5>
    )
  },
}

export const ErrorInvalidBigIntNumberFloat: Story = {
  render: () => {
    const formattedResult = robustFormatBigIntToViewTokenAmount({
      context: `${STORY_CONTEXT}.ErrorInvalidBigIntNumberFloat`,
      input: { ...BASE_INPUT, bigIntValue: 42.42 },
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayTokenAmountField {...formattedResult} />
      </h5>
    )
  },
}

export const ErrorInvalidBigIntNumberInfinity: Story = {
  render: () => {
    const formattedResult = robustFormatBigIntToViewTokenAmount({
      context: `${STORY_CONTEXT}.ErrorInvalidBigIntNumberInfinity`,
      input: { ...BASE_INPUT, bigIntValue: Infinity },
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayTokenAmountField {...formattedResult} />
      </h5>
    )
  },
}

export const ErrorUnsupportedDecimalsTypeObject: Story = {
  render: () => {
    const formattedResult = robustFormatBigIntToViewTokenAmount({
      context: `${STORY_CONTEXT}.ErrorUnsupportedDecimalsTypeObject`,
      input: { ...BASE_INPUT, decimals: { value: 6 } },
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayTokenAmountField {...formattedResult} />
      </h5>
    )
  },
}

export const QueryErrorFromStringPayload: Story = {
  render: () => {
    const formattedResult = robustFormatBigIntToViewTokenAmount({
      context: `${STORY_CONTEXT}.QueryErrorFromStringPayload`,
      input: { ...BASE_INPUT },
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayTokenAmountField {...formattedResult}
          {...{
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
        <DisplayTokenAmountField fallbackViewValue="N/A" symbol="USDC" />
      </h5>
    )
  },
}

export const DisplayPrefixAndIndicatorCustom: Story = {
  render: () => {
    const formattedResult = robustFormatBigIntToViewTokenAmount({
      context: `${STORY_CONTEXT}.DisplayPrefixAndIndicatorCustom`,
      input: { ...BASE_INPUT },
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayTokenAmountField {...formattedResult} prefix="≈" indicator="~" />
      </h5>
    )
  },
}

export const DisplaySymbolPositionBefore: Story = {
  render: () => {
    const formattedResult = robustFormatBigIntToViewTokenAmount({
      context: `${STORY_CONTEXT}.DisplaySymbolPositionBefore`,
      input: { ...BASE_INPUT },
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayTokenAmountField {...formattedResult} symbolPosition="before" />
      </h5>
    )
  },
}

export const WarningDisplayErrorBeforeValue: Story = {
  render: () => {
    const formattedResult = robustFormatBigIntToViewTokenAmount({
      context: `${STORY_CONTEXT}.WarningDisplayErrorBeforeValue`,
      input: { ...BASE_INPUT, bigIntValue: "4200000", decimals: "6" },
    })

    return (
      <h5 className="text-2xl font-semibold leading-none">
        <DisplayTokenAmountField {...formattedResult} errorPossition="before" />
      </h5>
    )
  },
}
