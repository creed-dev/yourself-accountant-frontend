import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import { Dialog, Notify, Quasar } from 'quasar';

// Import Roboto Font
import '@quasar/extras/roboto-font/roboto-font.css';

// Import icons libraries
import '@quasar/extras/material-icons/material-icons.css';

// Import Quasar css
import 'quasar/src/css/index.sass';

// Import Tailwind css
import './assets/css/tailwind.css';

const app = createApp(App);

app.use(router);
app.use(createPinia());
app.use(Quasar, {
  plugins: { Dialog, Notify },
});

app.mount('#app');
