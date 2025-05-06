// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from './plugins'

// Styles

const app = createApp(App)

registerPlugins(app)

app.mount('#app')
