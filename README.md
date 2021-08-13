This repo demonstrates a problem I'm having with both `@urql/vue` and the React bindings. The problem is when a null field becomes populated, a re-render is not triggered and the UI is stuck in a stale state.

## Reproduction:

- run `yarn` to install deps (using yarn 1.x)
- `yarn ts-node server.ts` to start the GraphQL Server
- `yarn vite` to start the front-end`
- Go to `localhost:3000` 
- click "Login"
- notice the UI does **not** re-render.
- I reproduced with both React and Vue - both are shown in the reproduction.

