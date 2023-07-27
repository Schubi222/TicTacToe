<template>
  <div class="HomeView">
    <div class="Top-Symbols">
      <img src="" alt="">
      <img src="" alt="">
    </div>
    <div class="SelectionWrapper">
      <p class="SelectionWrapper__top-text">PICK PLAYER {{active_player}}'S MARK</p>
      <div class="radio-wrapper">
        <div class="radio_style">
          <img src="/X.svg" alt="">
          <input type="radio" id="X" name="mark" value="X" checked>
        </div>
        <div class="radio_style">
          <img src="/O.svg" alt="">
          <input type="radio" id="O" name="mark" value="O">
        </div>
      </div>
      <div class="SelectionWrapper__bottom-text">REMEMBER: X GOES FIRST</div>
    </div>
    <div class="yellow">NEW GAME (VS CPU)</div>
    <div class="turquoise">NEW GAME (VS PLAYER)</div>

  </div>
</template>

<script setup lang="ts">


import {ref} from "vue";

const active_player = ref(1)
</script>

<style scoped>
  @import "@/assets/HomeView.css";
</style>