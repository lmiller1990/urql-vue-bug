import { createClient, provideClient } from '@urql/vue';
import { createApp, defineComponent, h } from 'vue'
import AppWithBug from './AppWithBug.vue'
import AppWithoutBug from './AppWithoutBug.vue'

const client = createClient({
  url: 'http://localhost:4000/graphql',
});

const Root = defineComponent({
  setup () {
    provideClient(client);
    /** this works as expected */
    return () => h(AppWithoutBug)

    /** This one has the bug */
    return () => h(AppWithBug)
  }
})

createApp(Root).mount('#app')
