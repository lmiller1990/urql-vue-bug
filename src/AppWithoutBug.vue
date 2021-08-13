<template>
    <h2>Vue Without Bug</h2>
  Viewer: {{ appData?.app?.viewer?.username }}
  <br />
  <button @click="login">Login</button>
  <button @click="logout">Logout</button>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useQuery, useMutation } from '@urql/vue'
import { 
  Auth,
  Login,
  Logout
} from "./queries";

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