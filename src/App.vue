<template>
  <v-app id="inspire" dark>
    <v-navigation-drawer v-model="drawer" clipped fixed app>
      <v-list dense>
        <v-list-tile @click="gotoHome">
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Dashboard</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="gotoSettings">
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
            <router-view/>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer app fixed class="footer">
      <a href="https://github.com/pendo324" @click="openLinkInBrowser">GitHub</a>
      <DividingDot/>
      <a href="https://twitter.com/pendo324" @click="openLinkInBrowser">Twitter</a>
    </v-footer>
  </v-app>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import { copyNativeExecutable, createDataDir } from './util';
import { remote, shell } from 'electron';

import DividingDot from '@/components/DividingDot';

export default {
  name: 'universal-np',
  components: {
    DividingDot
  },
  data: () => ({
    drawer: null,
    source: null
  }),
  computed: {
    ...mapState('now-playing', ['player'])
  },
  methods: {
    noop() {},
    gotoSettings() {
      this.$router.push({ name: 'settings' });
    },
    gotoHome() {
      this.$router.push({ name: 'home' });
    },
    openLinkInBrowser(e) {
      e.preventDefault();
      shell.openExternal(e.target.href);
    },
    ...mapActions('now-playing', ['getDefaultBrowser']),
    ...mapMutations('now-playing', { setTrack: 'SET_TRACK' })
  },
  async mounted() {
    await this.getDefaultBrowser();
    await createDataDir();
    await copyNativeExecutable();

    this.express.post('/track', (req, res) => {
      console.log(req.body);
      if (this.player.source === 'Web') {
        if (Object.prototype.hasOwnProperty.call(req.body, 'isPaused')) {
          return this.setTrack({ track: null });
        }
        const requiredKeys = ['song', 'webPlayer'];
        if (
          requiredKeys.every((r) =>
            Object.prototype.hasOwnProperty.call(req.body, r)
          )
        ) {
          if (this.player.text === req.body.webPlayer) {
            this.setTrack({ track: req.body.song });
          }
        }
      }
      res.status(200).send();
    });
  }
};

// app.listen(47565);
</script>

<style lang="scss">
.footer {
  padding-left: 10px;
  // a:not(:first-child) {
  //  padding-left: 10px;
  // }
}
</style>
