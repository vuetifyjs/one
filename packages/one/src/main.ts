// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from './plugins'

// Components
import App from './App.vue'

const app = createApp(App)

registerPlugins(app)

app.mount('#app')
