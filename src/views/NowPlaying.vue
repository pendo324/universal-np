<template>
  <v-container fluid grid-list-xl>
    <v-select
      :items="players"
      label="Player"
      solo
      clearable
      placeholder="Select a player"
      @change="updatePlayer"
      @click:clear="clearPlayer"
      :value="selectedPlayer"
    ></v-select>
    <v-flex>
      <v-text-field
        label="Track"
        placeholder="No track playing..."
        :value="trackText"
        disabled
        solo
      ></v-text-field>
    </v-flex>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  data: () => ({
    selectedPlayer: null,
    players: ['Spotify', 'iTunes']
  }),
  computed: {
    ...mapState('now-playing', ['track']),
    trackText() {
      if (this.selectedPlayer === null) {
        return 'Select a player';
      } else {
        return this.track;
      }
    }
  },
  methods: {
    ...mapActions('now-playing', ['setTrack', 'setPlayer']),
    async updatePlayer(newPlayer) {
      if (typeof newPlayer !== 'undefined') {
        this.selectedPlayer = newPlayer;
        this.setPlayer({ player: newPlayer });
        await this.setTrack();
      } else {
        this.selectedPlayer = null;
        this.setPlayer({ player: null });
      }
    },
    clearPlayer() {
      this.selectedPlayer = null;
      this.setPlayer({ player: null });
    }
  }
};
</script>

<style></style>
