<template>
<div class="Game-View">
  <div class="Top-Row"></div>
  <GameField/>
  <div class="Bottom-Row">
    <div class="x-tile">
      <span>X ({{settings.X.Player}})</span>
      {{settings.X.Score}}
    </div>
    <div class="tie-tile">
      <span>TIES</span>
      {{settings.Ties}}
    </div>
    <div class="o-tile">
      <span>X ({{settings.O.Player}})</span>
      {{settings.O.Score}}
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import GameField from "../components/GameField.vue";
import {ref} from "vue";
const settings = ref({
  X: {Player:'PLAYER 1', Score:0},
  O: {Player:'PLAYER 2', Score:0},
  Ties:0
})

</script>

<style scoped>
@import "@/assets/GameView.css";
</style>