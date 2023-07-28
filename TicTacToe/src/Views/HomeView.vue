<template>
  <div class="HomeView">
    <div class="Top-Symbols">
      <img src="/X_turquoise.svg" alt="X">
      <img src="/O_yellow.svg" alt="O">
    </div>
    <div class="SelectionWrapper">
      <p class="SelectionWrapper__top-text">PICK PLAYER {{active_player}}'S MARK</p>
      <div class="radio-wrapper">
        <div class="radio_style">
          <img src="/X.svg" alt="">
          <input type="radio" id="X" name="mark" value="X" checked v-model="player1_mark">
        </div>
        <div class="radio_style">
          <img src="/O.svg" alt="">
          <input type="radio" id="O" name="mark" value="O" v-model="player1_mark">
        </div>
      </div>
      <div class="SelectionWrapper__bottom-text">REMEMBER: X GOES FIRST</div>
    </div>
    <div class="yellow" @click="startNewGame(true)">NEW GAME (VS CPU)</div>
    <div class="turquoise" @click="startNewGame(false)" >NEW GAME (VS PLAYER)</div>

  </div>
</template>

<script setup lang="ts">


import {useGameStore} from "../stores/GameStore.ts";
import {storeToRefs} from "pinia";
import router from "../router";
import {ref} from "vue";

const store = useGameStore()
const {active_player,cpu, X, O, cpu_marker} = storeToRefs(store)

const player1_mark = ref('X')

function startNewGame(cpu_active:boolean){
  store.reset()
  cpu.value = cpu_active
  if (player1_mark.value === 'X'){
    X.value = 'PLAYER 1'
    O.value = 'PLAYER 2'
  }else{
    O.value = 'PLAYER 1'
    X.value = 'PLAYER 2'
  }
  if (cpu_active){cpu_marker.value = player1_mark.value === 'X' ? 'O' : 'X'}
  router.push('/play')
}
</script>

<style scoped>
  @import "@/assets/HomeView.css";
</style>