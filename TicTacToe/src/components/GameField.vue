<template>
<div class="Game-Field">
  <div class="game-tiles" @click="placeMark" v-for="(tile,index) in game_field" :id="`${index}`">
    <img v-if="tile" :src="`/${tile}.svg`" alt="placed mark" class="placed_mark">
  </div>
</div>
  <div class="Win-Overlay" v-if="game_stop">
    <div class="inner-overlay">
      <div class="you-won">YOU WON!</div>
      <div class="winner">
        <img :src="`/${winning_player}.svg`" alt="winner">
        <p>TAKES THE ROUND</p>
      </div>
      <div class="buttons">
        <div class="quit">QUIT</div>
        <div class="next">NEXT ROUND</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {ref} from "vue";


  let current_player = ref('O')
  let game_field = ref(
      [undefined,undefined,undefined, undefined,undefined,undefined, undefined,undefined,undefined]
  )
  let game_stop = false
  const winning_player = ref(undefined)

function placeMark(e){
  if (e.target.children.length !== 0 || game_stop){
    return
  }
  game_field.value[parseInt(e.target.id.substring(0))] = current_player.value
  checkForWin()
  current_player.value = current_player.value === "X" ? "O" : "X"
}

function checkForWin(){
  if (game_field.value[2] && game_field.value[2] === game_field.value[4] && game_field.value[4] === game_field.value[6]){
    gameEnds(game_field.value[2])
    return;
  }
  for (let i = 0; i < 3; i++) {

    if (game_field.value[3 * i] && game_field.value[3 * i] === game_field.value[1+3*i] && game_field.value[1+3*i] === game_field.value[2+3*i]){
      gameEnds(game_field.value[3 * i])
      return;
    }
    if (game_field.value[i] && game_field.value[i] === game_field.value[3+i] && game_field.value[3+i] === game_field.value[6+i]){
      gameEnds(game_field.value[i])
      return;
    }
  }
  if (game_field.value[0] && game_field.value[0] === game_field.value[4] && game_field.value[4] === game_field.value[8]){
    gameEnds(game_field.value[0])
    return;
  }


}
function gameEnds(winner:string){
  console.log(winner," WINS")
  console.log(game_field.value)
  game_stop = true
  winning_player.value = winner
}
</script>

<style scoped>
@import "@/assets/GameField.css";


</style>