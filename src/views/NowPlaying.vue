<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <v-select
          :items="players"
          label="Player"
          box
          clearable
          placeholder="Select a player"
          @change="updatePlayer"
          @click:clear="clearPlayer"
          :value="player"
          return-object
        >
          <template v-slot:item="{ item, tile }">
            <v-list-tile-content>
              <v-list-tile-title>{{ item.text }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ item.source }}</v-list-tile-sub-title>
              <v-divider :key="item.value" inset></v-divider>
            </v-list-tile-content>
          </template>
        </v-select>
      </v-flex>
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
          @click="() => {
            if (this.polling) {
              this.stopPolling();
            } else {
              this.startPolling();
            }
          }"
        >{{ this.polling ? 'Stop' : 'Start' }}</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapState, mapMutations } from 'vuex';

export default {
  data: () => ({
    selectedPlayer: null,
    polling: false,
    players: [
      { text: 'Spotify', source: 'Desktop', value: 'Spotify' },
      { text: 'iTunes', source: 'Desktop', value: 'iTunes' },
      { text: 'Spotify', source: 'Web', value: 'Spotify (Web)' }
    ],
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
        this.selectedPlayer = newPlayer.value;
        this.setPlayer(newPlayer);
        this.setTrack({ preview: true });
      }
    },
    clearPlayer() {
      this.stopPolling();
      this.setPlayer(null);
    },
    startPolling() {
      this.polling = true;
      this.interval = setInterval(async () => {
        await this.setTrack();
      }, 1000);
    },
    stopPolling() {
      this.polling = false;
      clearInterval(this.interval);
    }
  }
};
</script>

<style lang="scss">
.start-button {
  margin-left: 0;
}
</style>
