import { createApp } from 'vue';
import App from './App.vue';

// Plugins
import router from './router';
import store from './store/store';
import VeeValidationPlugin from './includes/validation';

import { auth } from '@/includes/firebase'

// Dependencies 
import '@/includes/firebase'
import './assets/tailwind.css';
import './assets/main.css';

let app;

auth.onAuthStateChanged(() => {
    if (!app) {
        app = createApp(App)

        app.use(store);
        app.use(router);
        app.use(VeeValidationPlugin);

        app.mount('#app');
    }
})
