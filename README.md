This repo demonstrates a bug in `@urql/vue`. I think the problem is reactivity is not triggered when a null field becomes populated - eg `viewer` is nullable, and going from `viewer: null` to `viewer: { username: "blah" }` does *not* trigger a re-render. The Network tab shows the request is getting made, but the UI is not updated. Refreshing shows the new state. I think this is a bug at the integration between `@urql/core` and `@vue/reactivity`.

## Reproduction

`main.ts` has the following:

```ts
const Root = defineComponent({
  setup () {
    provideClient(client);
    /** this works as expected */
    // return () => h(AppWithoutBug)

    /** This one has the bug */
    return () => h(AppWithBug)
  }
})
```

- run `yarn` to install deps (using yarn 1.x)
- `yarn ts-node server.ts` to start the GraphQL Server
- `yarn vite` to start the front-end`
- Go to `localhost:3000` 
- click "Login"
- notice the UI does **not** re-render - but 

These videos demo both the working app and bug:

### Working 

Watch [demo_broken.mov](https://github.com/lmiller1990/urql-vue-bug/blob/main/demo_broken.mov).

### Bug

Watch [demo_works.mov](https://github.com/lmiller1990/urql-vue-bug/blob/main/demo_works.mov).
