<template>
<div class="Game-View">
<!--TODO: blur  -->
  <div class="Top-Row">
  </div>
  <GameField/>
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



</script>

<style scoped>
@import "@/assets/GameView.css";
.blur ~ .Bottom-Row{
  filter: blur(4px);
}

</style>