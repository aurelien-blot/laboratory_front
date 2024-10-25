// noinspection ES6UnusedImports

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from '@/laboratory/store/store.js';
// import vuetify from 'vuetify';
import vuetify from "../plugins/vuetify.js";
import 'vuetify/styles';
import './laboratory/assets/main.css';


import 'bootstrap/dist/css/bootstrap.css';
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'



/* add icons to the library */

const app = createApp(App);
app.use(router);
app.use(store);
app.use(vuetify)
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');
