This repo demonstrates a problem I'm having with both `@urql/vue` and the React bindings. The problem is when a null field becomes populated, a re-render is not triggered and the UI is stuck in a stale state.

## Reproduction:

- run `yarn` to install deps (using yarn 1.x)
- `yarn ts-node server.ts` to start the GraphQL Server
- `yarn vite` to start the front-end`
- Go to `localhost:3000` 
- click "Login"
- notice the UI does **not** re-render.
- I reproduced with both React and Vue - both are shown in the reproduction.

## Explanation

Hi team, I thought I found a bug in @urql/vue but I was able to reproduce using the React bindings too. Now I think I am just misunderstanding how urql works? When/how does `useQuery` and `useMutation` trigger a re-render?

Relevant code:

server: https://github.com/lmiller1990/urql-vue-bug/blob/main/server.ts
react: https://github.com/lmiller1990/urql-vue-bug/blob/main/src/mainReact.tsx
queries: https://github.com/lmiller1990/urql-vue-bug/blob/main/src/queries.ts

The README has instructions to run the reproduction locally. It's as minimal as I could make it.
The problem I having is demonstrated by the queries that have the *Bug suffix. Basically the schema is

```gql
type Viewer { 
  username String!
}

type Query = {
  viewer: Viewer
}
So if you do
useQuery(`
  query Q {
    viewer {
      username
    }
  }
`)
```

You are either getting null, if you are not authenticated, { viewer: null }  , or { viewer: { username: '...' } } if you are.
For some reason, when I do a mutation that makes viewer : null become viewer : { username: '...' } both React and Vue are not re-rendering. The GQL request is made, 
so urql knows something changed, but no re-render.

If I change the schema:

```gql
type Query = {
  app: {
    viewer: Viewer!
  }
}
```

And make viewer nested and not nullable, instead always returning something, everything works as expected. Is there some limitation with urql and having a null field become a complex object? What am I missing? This seems like a perfectly valid use case.

