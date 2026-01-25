# .env variables

NEXT_PUBLIC_BASE_RPC_FREE=
NEXT_PUBLIC_COINGECKO_API_KEY=

### Notes from our chat

- We agreed that the “My Positions” section is implemented as it currently is, which differs slightly from the original spec.

- Simulation for deposits does not run before token approval.

- Hover colors on buttons are approximate due to missing specifications in the Figma design.

- Transaction receipts are handled using the wagmi-extended library, which automatically waits for confirmations.
