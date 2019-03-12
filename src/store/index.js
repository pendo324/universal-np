import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import modules from './modules';

Vue.use(Vuex);

export default new Vuex.Store({
  modules,
  plugins: [
    createPersistedState({
      paths: [
        'now-playing.browser',
        'now-playing.saveLocation',
        'now-playing.prefix',
        'now-playing.suffix'
      ]
    })
  ],
  strict: true
});
