<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" clipped app>
      <v-list dense>
        <v-list-item @click="gotoHome">
          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="gotoSettings">
          <v-list-item-content>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app fixed dense clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Universal Now Playing</v-toolbar-title>
    </v-app-bar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center align-center>
          <v-flex shrink>
            <router-view />
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer app dark fixed class="footer">
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
import { mapMutations, mapState } from 'vuex';
import { remote, shell } from 'electron';

import DividingDot from '@/components/DividingDot';
import { createDefaultConfig } from '@/util';

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
    ...mapState('now-playing', ['browser', 'player', 'saveLocation'])
  },
  methods: {
    noop() {},
    gotoSettings() {
      if (this.$route.name !== 'settings') {
        this.$router.push({ name: 'settings' });
      }
    },
    gotoHome() {
      if (this.$route.name !== 'home') {
        this.$router.push({ name: 'home' });
      }
    },
    openLinkInBrowser(e) {
      e.preventDefault();
      shell.openExternal(e.target.href);
    },
    async setDefaultSaveLocation() {
      this.setSaveLocation({ saveLocation: await createDefaultConfig() });
    },
    ...mapMutations('now-playing', {
      setTrack: 'SET_TRACK',
      setSaveLocation: 'SET_SAVE_LOCATION'
    })
  },
  async mounted() {
    if (this.saveLocation === null) {
      await this.setDefaultSaveLocation();
    }

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

    remote.getCurrentWindow().on('close', (_e) => {
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
