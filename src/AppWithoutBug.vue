<template>
  Viewer: {{ appData.app.viewer }}
  <br />
  <button @click="login">Login</button>
  <button @click="logout">Logout</button>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { createClient, gql, useQuery, useMutation } from '@urql/vue'

const client = createClient({
  url: 'http://localhost:4000/graphql',
});

const Login = gql`
mutation M1 {
  loginApp {
    viewer {
      authenticated
      authToken
      username
    }
  }
}
`

const Logout = gql`
mutation M2 {
  logoutApp {
    viewer {
      authenticated
      authToken
      username
    }
  }
}
`

const Auth = gql`
query App {
  app {
    viewer {
			authenticated
      authToken
      username
    }
  }
}

`

export default defineComponent({
  setup() {
    const { data: appData } = useQuery({ query: Auth })
    const count = ref(0)

    const login = useMutation(Login)
    const logout = useMutation(Logout)


    return {
      count,
      appData,
      login: () => {
        login.executeMutation({})
      },
      logout: () => {
        logout.executeMutation({})
      }
    }
  }
})
</script>