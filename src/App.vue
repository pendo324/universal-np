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
            <router-view />
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer app fixed class="footer">
      <a
        href="https://github.com/pendo324/universal-np"
        @click="openLinkInBrowser"
      >
        GitHub
      </a>
      <DividingDot />
      <a href="https://twitter.com/pendo324" @click="openLinkInBrowser">
        Twitter
      </a>
    </v-footer>
  </v-app>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import { createDataDir } from './util';
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
    ...mapState('now-playing', ['browser', 'player'])
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
    // if (this.browser === null) {
    //   await this.getDefaultBrowser();
    // }
    await createDataDir();

    this.express.post('/track', (req, res) => {
      if (
        typeof this.player !== undefined &&
        this.player !== null &&
        this.player.source === 'Web'
      ) {
        if (Object.prototype.hasOwnProperty.call(req.body, 'isPaused')) {
          this.setTrack({ track: null });
          return res.status(200).send();
        }
        const requiredKeys = ['song', 'webPlayer'];
        if (
          requiredKeys.every((r) =>
            Object.prototype.hasOwnProperty.call(req.body, r)
          )
        ) {
          if (this.player.name === req.body.webPlayer) {
            this.setTrack({ track: req.body.song });
            return res.status(200).send();
          }
        }
      }
      return res.status(200).send();
    });

    window.addEventListener('beforeunload', () => {
      this.server.close();
    });

    remote.getCurrentWindow().on('close', (e) => {
      this.server.close();
    });
  }
};
</script>

<style lang="scss">
.footer {
  padding-left: 10px;
  // a:not(:first-child) {
  //  padding-left: 10px;
  // }
}
</style>
