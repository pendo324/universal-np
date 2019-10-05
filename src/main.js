import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from './store';

const Mousetrap = require('mousetrap');
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
const server = app.listen(47565);

Vue.mixin({
  data() {
    return { express: app, server };
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
