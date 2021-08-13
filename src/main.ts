import { createClient, provideClient } from '@urql/vue';
import { createApp, defineComponent, h } from 'vue'
import AppWithBug from './AppWithBug.vue'
import AppWithoutBug from './AppWithoutBug.vue'

export const client = createClient({
  url: 'http://localhost:4000/graphql',
});

const Root = defineComponent({
  setup () {
    provideClient(client);
    /** this works as expected */
    // return () => h(AppWithoutBug)

    /** This one has the bug */
    return () => h('div', [h(AppWithBug), h(AppWithoutBug)])
  }
})

// createApp(Root).mount('#app')
