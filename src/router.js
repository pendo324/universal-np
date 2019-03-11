import Vue from 'vue';
import Router from 'vue-router';
import NowPlaying from './views/NowPlaying';
import Settings from './views/Settings';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: NowPlaying
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings
    }
  ]
});
