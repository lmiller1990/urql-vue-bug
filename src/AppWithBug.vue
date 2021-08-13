<template>
  Viewer: {{ viewerData }}
  <br />
  <button @click="login">Login</button>
  <button @click="logout">Logout</button>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { createClient, provideClient, gql, useQuery, useMutation } from '@urql/vue'

const client = createClient({
  url: 'http://localhost:4000/graphql',
});

const Login = gql`
mutation M1 {
  login {
    authToken
    username
  }
}
`

const Logout = gql`
mutation M2 {
  logout {
    authToken
    username
  }
}
`

const Auth = gql`
  query User {
    viewer {
      username
      authToken
    }
  }
`

export default defineComponent({
  setup() {
    const { data: viewerData } = useQuery({ query: Auth })
    const count = ref(0)

    const login = useMutation(Login)
    const logout = useMutation(Logout)


    return {
      count,
      viewerData,
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