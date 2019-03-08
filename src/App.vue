<template>
  <v-app id="inspire" dark>
    <v-navigation-drawer v-model="drawer" clipped fixed app>
      <v-list dense>
        <v-list-tile @click="noop">
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Dashboard</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="noop">
          <v-list-tile-action>
            <v-icon>settings</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Settings</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Universal Now Playing</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center align-center>
          <v-flex shrink>
            <router-view />
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer app fixed>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
// import runApplescript from 'run-applescript';
import { mapActions } from 'vuex';
import { copyNativeExecutable } from './util';

// const checkAppRunning = async (appName) => {
//   return await runApplescript(`
// if application "${appName}" is running then
//   return true
// end if
// return false
// `);
// };

export default {
  name: 'universal-np',
  data: () => ({
    drawer: null,
    source: null
  }),
  methods: {
    noop() {},
    ...mapActions('now-playing', ['setTrack', 'setPlayer'])
  },
  async mounted() {
    console.log(__static);
    await copyNativeExecutable();
  }
};
</script>

<style>
/* CSS */
</style>
