import { isServer, QueryCache, QueryClient } from "@tanstack/react-query"

function makeQueryClient() {
  return new QueryClient({
    queryCache: new QueryCache({
      onError: (e) => {
        console.error("QueryCache(Global error handler): Error while running query", { e })
      },
    }),
  })
}

let browserQueryClient: QueryClient | undefined
let serverQueryClient: QueryClient | undefined

export function getQueryClient() {
  if (isServer) {
    if (!serverQueryClient) serverQueryClient = makeQueryClient()
    return serverQueryClient
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient()
    return browserQueryClient
  }
}
