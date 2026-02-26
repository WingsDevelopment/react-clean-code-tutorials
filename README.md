# .env variables

NEXT_PUBLIC_BASE_RPC_FREE=
NEXT_PUBLIC_COINGECKO_API_KEY=

## Display Field Best Practice

Local display field wrappers in `src/app/components/display-fields` use flat props:

- Base display props from `DisplayValueProps`
- Robust metadata at top level: `value`, `warnings`, `errors`
- Query state spread directly: `isLoading`, `isPending`, `isError`, `error`, `errorMessage`

Preferred render pattern:

```tsx
<DisplayPercentageField
  {...row?.supplyApy}
  {...row?.supplyApyQueryState}
  {...queryState}
/>
```

For token amounts and values:

```tsx
<DisplayTokenAmountField {...row?.totalSupplyAmount} {...row?.totalSupplyAmountQueryState} {...queryState} />
<DisplayTokenValueField {...row?.totalSupplyUsd} {...row?.totalSupplyUsdQueryState} {...queryState} />
```

For plain text values:

```tsx
<DisplayText value={row?.name} {...queryState} />
```

Spread order defines precedence. Last spread wins for shared keys.

## Storybook

- `npm run storybook` to run Storybook locally on port `6006`
- `npm run build-storybook` to build static Storybook output
