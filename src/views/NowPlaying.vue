<template>
  <v-container>
    <v-layout row wrap>
        <v-select
          :items="players"
          label="Player"
          clearable
          placeholder="Select a player"
          @change="updatePlayer"
          @click:clear="clearPlayer"
          item-value="name"
          item-text="name"
          return-object
          :value="player"
        >
          <template v-slot:item="{ item, tile }">
            <v-list-item-content>
              <v-list-item-title>{{ item.name }}</v-list-item-title>
              <v-list-item-subtitle>{{ item.source }}</v-list-item-subtitle>
            </v-list-item-content>
          </template>
        </v-select>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12>
        <v-text-field
          label="Track"
          placeholder="No track playing..."
          :value="trackText"
          disabled
          outline
        />
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12>
        <v-btn
          color="info"
          :disabled="this.player === null"
          class="start-button"
          @click="startButton"
        >
          {{ this.polling ? 'Stop' : 'Start' }}
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapState, mapMutations } from 'vuex';
import { desktop as desktopPlayers, web as webPlayers } from './../players';

import { remote } from 'electron';
const { platform } = remote.require('os');

const availableDesktopPlayers = [];

export default {
  data: () => ({
    selectedPlayer: null,
    polling: false,
    playerValue: { name: null },
    // players: [
    //   { text: 'deezer', source: 'Web', value: 'deezer', webId: 'deezer' },
    //   {
    //     text: 'Google Play',
    //     source: 'Web',
    //     value: 'Google Play',
    //     webId: 'Google Play'
    //   },
    //   { text: 'Hype Machine', source: 'Web', value: 'hypem', webId: 'hypem' },
    //   { text: 'iTunes', source: 'Desktop', value: 'iTunes' },
    //   { text: 'Mixcloud', source: 'Web', value: 'Mixcloud', webId: 'Mixcloud' },
    //   { text: 'Pandora', source: 'Web', value: 'Pandora', webId: 'Pandora' },
    //   { text: 'Plex', source: 'Web', value: 'Plex', webId: 'Plex' },
    //   {
    //     text: 'Soundcloud',
    //     source: 'Web',
    //     value: 'Soundcloud',
    //     webId: 'Soundcloud'
    //   },
    //   { text: 'Spotify', source: 'Desktop', value: 'Spotify' },
    //   {
    //     text: 'Spotify',
    //     source: 'Web',
    //     value: 'Spotify (Web)',
    //     webId: 'Spotify'
    //   },
    //   { text: 'tunein', source: 'Web', value: 'tunein', webId: 'tunein' },
    //   { text: 'YouTube', source: 'Web', value: 'YouTube', webId: 'YouTube' }
    // ],
    players: [],
    interval: null
  }),
  computed: {
    ...mapState('now-playing', ['track', 'player']),
    ...mapGetters('now-playing', ['webPlayer', 'nowPlaying']),
    trackText() {
      if (this.player === null) {
        return 'Select a player';
      } else {
        return this.nowPlaying;
      }
    }
  },
  methods: {
    ...mapActions('now-playing', ['setTrack']),
    ...mapMutations('now-playing', { setPlayer: 'SET_PLAYER' }),
    async updatePlayer(newPlayer) {
      if (typeof newPlayer !== 'undefined' && newPlayer !== null) {
        this.playerValue = newPlayer;
        this.selectedPlayer = newPlayer.value;
        this.setPlayer(newPlayer);
        this.setTrack({ preview: true });
      }
    },
    clearPlayer() {
      this.stopPolling();
      this.setPlayer(null);
    },
    startButton() {
      if (!this.polling) {
        this.polling = true;
        this.interval = setInterval(async () => {
          await this.setTrack();
        }, 1000);
      } else if (this.polling) {
        this.polling = false;
        clearInterval(this.interval);
      }
    },
    startPolling() {},
    stopPolling() {}
  },
  async mounted() {
    Object.keys(desktopPlayers).forEach((p) => {
      const player = desktopPlayers[p];
      const handler = player.supportedPlatforms.find((p) => p === platform());
      if (typeof handler !== 'undefined') {
        availableDesktopPlayers.push(new player.default());
      }
    });

    this.players = [
      ...availableDesktopPlayers,
      ...Object.keys(webPlayers).map((p) => new webPlayers[p]())
    ].sort((a, b) => {
      const aName = a.name.toUpperCase();
      const bName = b.name.toUpperCase();

      if (aName < bName) {
        return -1;
      }

      if (aName > bName) {
        return 1;
      }

      return 0;
    });
  }
};
</script>

<style lang="scss">
.start-button {
  margin-left: 0;
}
</style>
