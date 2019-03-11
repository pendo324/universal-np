import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from './store';

// import { remote } from 'electron';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

Vue.config.productionTip = false;

const app = express();
app.use(
  cors({
    origin: '*'
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.listen(47565);

Vue.mixin({
  data() {
    return { express: app };
  }
});

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
