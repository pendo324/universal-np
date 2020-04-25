<template>
  <v-container>
    <v-layout row wrap>
      <!-- <v-flex xs12>
        <v-select
          :items="browsers"
          label="Browser"
          box
          clearable
          item-text="name"
          item-value="value"
          placeholder="Select a browser"
          @change="updateBrowser"
          @click:clear="clearBrowser"
          :value="selectedBrowser"
        />
      </v-flex> -->
      <v-flex xs12>
        <v-container>
          <v-layout row wrap>
            <v-flex xs7>
              <v-text-field
                label="Save Location"
                placeholder="Pick Save Location"
                :value="saveLocation"
                disabled
                outline
                dense
              ></v-text-field>
            </v-flex>
            <v-flex xs4 offset-xs1>
              <v-btn color="info" large @click="updateSaveLocation">
                Pick Save Location
              </v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
      <v-flex xs12>
        <v-text-field
          label="Suffix"
          placeholder="Add text before song"
          :value="prefix"
          @click:clear="clearPrefix"
          @input="updatePrefix"
          clearable
        />
        <v-text-field
          label="Prefix"
          placeholder="Add text after song"
          :value="suffix"
          @click:clear="clearSuffix"
          @input="updateSuffix"
          clearable
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { remote } from 'electron';
import { mapState, mapMutations } from 'vuex';

const { dialog } = remote.require('electron');

export default {
  data() {
    return {
      browsers: [
        {
          name: 'Firefox',
          value: 'firefox'
        },
        {
          name: 'Chrome',
          value: 'chrome'
        }
      ]
    };
  },
  computed: {
    ...mapState('now-playing', ['browser', 'prefix', 'suffix', 'saveLocation']),
    selectedBrowser() {
      return this.browsers.find((b) => b.value === this.browser);
    }
  },
  methods: {
    ...mapMutations('now-playing', {
      setBrowser: 'SET_BROWSER',
      setPrefix: 'SET_PREFIX',
      clearPrefix: 'CLEAR_PREFIX',
      setSuffix: 'SET_SUFFIX',
      clearSuffix: 'CLEAR_SUFFIX',
      setSaveLocation: 'SET_SAVE_LOCATION'
    }),
    updateBrowser(browser) {
      if (typeof browser !== 'undefined') {
        this.setBrowser({ browser });
      }
    },
    clearBrowser() {
      this.setBrowser({ browser: null });
    },
    updateSaveLocation() {
      dialog.showOpenDialog(
        {
          title: 'Save Location',
          properties: ['openFile', 'createDirectory', 'promptToCreate'],
          defaultPath: this.saveLocation
        },
        (filePaths, _bookmark) => {
          if (typeof filePaths !== 'undefined') {
            this.setSaveLocation({ saveLocation: filePaths[0] });
          }
        }
      );
    },
    updatePrefix(value) {
      if (typeof value !== 'undefined' && value !== null) {
        this.setPrefix({ prefix: value });
      }
    },
    updateSuffix(value) {
      if (typeof value !== 'undefined' && value !== null) {
        this.setSuffix({ suffix: value });
      }
    }
  }
};
</script>

<style></style>
