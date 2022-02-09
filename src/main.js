import { createApp } from 'vue';
import App from './App.vue';

// Plugins
import router from './router';
import store from './store';
import VeeValidationPlugin from './includes/validation';

import './assets/tailwind.css';
import './assets/main.css';

const app = createApp(App);

app.use(store);
app.use(router);
app.use(VeeValidationPlugin);

app.mount('#app');
