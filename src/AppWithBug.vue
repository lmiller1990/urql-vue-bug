<template>
  <div>
    <h2>Vue With Bug</h2>
    Viewer: {{ viewerData?.app?.viewer?.username }}
    <br />
    <button @click="login">Login</button>
    <button @click="logout">Logout</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useQuery, useMutation } from '@urql/vue'
import { 
  AuthBug,
  LoginBug,
  LogoutBug
} from "./queries";

export default defineComponent({
  setup() {
    const { data: viewerData } = useQuery({ query: AuthBug })
    const count = ref(0)

    const login = useMutation(LoginBug)
    const logout = useMutation(LogoutBug)


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