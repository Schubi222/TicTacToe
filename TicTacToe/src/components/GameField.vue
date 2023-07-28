<template>
  <div class="Game-Field" :class="{blur:game_stop}" ref="wrapper">
    <div class="game-tiles noSelect" @click="placeMark" v-for="(tile,index) in game_field" :id="`${index}`">
      <img v-if="tile" :src="`/${svg_computed(tile)}`" alt="placed mark" class="placed_mark">
    </div>
  </div>
  <div class="Win-Overlay" v-show="game_stop">
    <div class="inner-overlay">
      <div class="you-won">{{end_message}}</div>
      <div class="winner" v-if="!tie">
        <img :src="`/${svg_computed(winning_player)}`" alt="winner">
        <p ref="takes_round_p" class="takes_round_p">TAKES THE ROUND</p>
      </div>
      <div class="buttons">
         <div class="quit" @click="$router.push('/')">QUIT</div>
        <div class="next" @click="restartRound">NEXT ROUND</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, Ref, ref} from "vue";
  import {useGameStore} from "../stores/GameStore.ts";
  import {storeToRefs} from "pinia";
  import {makeTurn} from "../AI.ts"

  const store = useGameStore()
  const {active_player, score, cpu, cpu_marker} = storeToRefs(store)

  let game_field: Ref<Array<undefined|string>> = ref(
      new  Array(9).fill(undefined)
  )
  let game_stop = false
  const winning_player: Ref<undefined|string> = ref(undefined)
  const end_message = ref('')
  const tie = ref(false)

  const takes_round_p:any = ref(null)
  const wrapper:any = ref(null)

const svg_computed = (mark:string|undefined) => {
    return mark === 'X' ? 'X_turquoise.svg' : 'O_yellow.svg'
  }

function placeMark(e:any){
  if (e.target.children.length !== 0 || game_stop || game_field.value[parseInt(e.target.id.substring(0))]){
    return
  }

  game_field.value[parseInt(e.target.id.substring(0))] = active_player.value
  checkForWin()
  active_player.value = active_player.value === "X" ? "O" : "X"
  if (cpu.value && !game_stop) {
    cpuMove()
  }
}

function cpuMove(){
  if (cpu.value && !game_stop){
    wrapper.value.style.pointerEvents = "none"
    game_field.value[makeTurn(game_field.value)] = cpu_marker.value
    checkForWin()
    active_player.value = active_player.value === "X" ? "O" : "X"
    wrapper.value.style.pointerEvents = "unset"
  }
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
  checkForDraw()
}

function checkForDraw(){
  for (let i = 0; i < 9; i++) {
    if (game_field.value[i] === undefined){return}
  }
  tie.value = true
  gameEnds('Tie')
}

function gameEnds(winner:string|undefined){
  winning_player.value = winner
  game_stop = true

  if (winner === 'X'){
    score.value.x_wins += 1
    takes_round_p.value.classList.add('turquoise')
    takes_round_p.value.classList.remove('yellow')

    if (!cpu.value){
      end_message.value = 'YOU WON'
    }
  }
  else if (winner === 'O'){
    score.value.o_wins += 1
    takes_round_p.value.classList.add('yellow')
    takes_round_p.value.classList.remove('turquoise')
    if (!cpu.value){
      end_message.value = 'YOU WON'
    }
  }
  else if(winner === 'Tie'){
    score.value.ties += 1
    end_message.value = 'IT\'S A TIE'
  }

  else if (cpu.value && active_player.value === cpu_marker.value){
    end_message.value = 'YOU LOST'
  }
}

const restartRound = () => {
  active_player.value = 'X'
  game_field.value = new Array(9).fill(undefined)
  game_stop = false
  end_message.value = ''
  winning_player.value = undefined
  tie.value = false
  if (cpu.value && cpu_marker.value === 'X'){
    cpuMove()
  }
}

onMounted(() =>{
  console.log(cpu.value)
  if (cpu.value && cpu_marker.value === 'X'){
    cpuMove()
  }
})

defineExpose({restartRound})
</script>

<style scoped>
@import "@/assets/GameField.css";
@import "@/assets/style.css";


</style>