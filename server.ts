import { graphqlHTTP } from "express-graphql";
import express from "express";
import { buildSchema } from "graphql";
import cors from "cors";

const graphqlSchema = buildSchema(`
  type NullableViewer {
    authToken: String!
    username: String!
  }

  type NonNullableViewer {
    authenticated: Boolean!
    authToken: String
    username: String
  }

  type App {
    viewer: NonNullableViewer!
  }

  type Query {
    viewer: NullableViewer
    app: App
  }

  type Mutation {
    login: NullableViewer
    logout: NullableViewer

    loginApp: App!
    logoutApp: App!
  }
`);

const app = express();

interface Viewer {
  authToken: string
  username: string
}

interface NonNullableViewer {
  authenticated: boolean
  authToken?: string
  username?: string
}

interface Viewer {
  authToken: string
  username: string
}

type NullableViewer = Viewer | null

interface App {
  viewer: NonNullableViewer
}

interface Root {
  viewer: NullableViewer
  app: App 
}


const context: Root = {
  app: {
    viewer: {
      authenticated: false
    }
  },
  viewer: null,
};

app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP(() => {
    return {
      schema: graphqlSchema,
      graphiql: true,
      context,
      rootValue: {
        /** WORKS: non nullable viewer */
        app: (_: any, ctx: typeof context) => {
          return ctx.app
        },
        loginApp: (_: any, ctx: typeof context) => { 
          ctx.app.viewer = {
            authenticated: true,
            username: 'lachlan',
            authToken: 'token'
          }
          return ctx.app
        },
        logoutApp: (_: any, ctx: typeof context) => { 
          ctx.app.viewer = {
            authenticated: false,
          }
          return ctx.app
        },

        /** BUG: nullable viewer */
        viewer: (_: any, ctx: typeof context) => {
          return ctx.viewer;
        },
        login: (_: any, ctx: typeof context) => {
          ctx.viewer = {
            username: 'lachlan',
            authToken: 'token'
          }
          return ctx.viewer
        },
        logout (_: any, ctx: typeof context) {
          ctx.viewer = null
          return ctx.viewer
        }
      },
    };
  })
);

app.listen(4000, () => {
  console.log("Started server on 4000");
});