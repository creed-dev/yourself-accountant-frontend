import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import { Quasar } from "quasar";

// Import Roboto Font
import "@quasar/extras/roboto-font/roboto-font.css";

// Import icons libraries
import "@quasar/extras/material-icons/material-icons.css";

// Import Quasar css
import "quasar/src/css/index.sass";

// Import Tailwind css
import "./assets/css/tailwind.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(Quasar, {
  plugins: {}, // import Quasar plugins and add here
});

app.mount("#app");
