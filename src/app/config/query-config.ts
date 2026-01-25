export enum QueryType {
  MetaDataQuery = "metaDataQuery",
  FreshQuery = "FreshQuery",
  FastQuery = "FastQuery",
  SemiSensitiveQuery = "semiSensitiveQuery",
  LowSensitiveQuery = "lowSensitiveQuery",
  ExtensiveQuery = "extensiveQuery",
  PriceQuery = "priceQuery",
  HookQuery = "hookQuery",
  WalletQuery = "walletQuery",
}

export const queryConfig = {
  metaDataQuery: {
    staleTime: Number.POSITIVE_INFINITY,
    meta: {
      queryType: QueryType.MetaDataQuery,
    },
  },
  freshQuery: {
    staleTime: 0,
    meta: {
      queryType: QueryType.FreshQuery,
    },
  },
  fastQuery: {
    staleTime: 60 * 1000,
    meta: {
      queryType: QueryType.FastQuery,
    },
  },
  semiSensitiveQuery: {
    staleTime: 5 * 60 * 1000,
    meta: {
      queryType: QueryType.SemiSensitiveQuery,
    },
  },
  lowSensitiveQuery: {
    staleTime: 15 * 60 * 1000,
    meta: {
      queryType: QueryType.LowSensitiveQuery,
    },
  },
  expensiveQuery: {
    staleTime: 60 * 60 * 1000,
    meta: {
      queryType: QueryType.ExtensiveQuery,
    },
  },
  priceQuery: {
    staleTime: 60 * 60 * 1000,
    meta: {
      queryType: QueryType.PriceQuery,
    },
  },
  walletQuery: {
    staleTime: 15 * 60 * 1000,
    meta: {
      queryType: QueryType.WalletQuery,
    },
  },
  hookQuery: {
    staleTime: 60 * 1000,
    meta: {
      queryType: QueryType.HookQuery,
    },
  },
}
