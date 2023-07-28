<template>
<div class="Game-View">
  <div class="Top-Row">
    <div class="symbols"><img src="/X_turquoise.svg" alt="X"><img src="/O_yellow.svg" alt="O"></div>
    <div class="turn"><img :src="'/'+active_player+'.svg'" alt=""> TURN</div>
    <div class="restart-round" @click="child.restartRound">&#10227;</div>
  </div>
<!--TODO: Win Overlay prob. shouldn't be in there  -->
  <GameField ref="child"/>
  <div class="Bottom-Row">
    <div class="x-tile">
      <span>X ({{X}})</span>
      {{score.x_wins}}
    </div>
    <div class="tie-tile">
      <span>TIES</span>
      {{score.ties}}
    </div>
    <div class="o-tile">
      <span>O ({{O}})</span>
      {{score.o_wins}}
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import GameField from "../components/GameField.vue";
import {ref} from "vue";
import {useGameStore} from "../stores/GameStore.ts";
import {storeToRefs} from "pinia";

const store = useGameStore()
const {score, X, O, active_player} = storeToRefs(store)
const child = ref(null)


</script>

<style scoped>
@import "@/assets/GameView.css";

.Game-View:has(.blur) .Top-Row, .Game-View:has(.blur) .Bottom-Row{
  filter: blur(4px);
  pointer-events: none;
}
</style>