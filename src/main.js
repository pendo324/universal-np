import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from './store';

import { remote } from 'electron';

const Mousetrap = remote.require('mousetrap');
const express =
  process.env.NODE_ENV === 'production'
    ? remote.require('express')
    : require('express');
const bodyParser = remote.require('body-parser');
const cors = remote.require('cors');

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

if (process.env.NODE_ENV === 'production') {
  // temporary, since refreshing causes a few bugs atm, need to fix
  Mousetrap.bind(['command+r', 'control+r'], () => {
    return false;
  });
}
