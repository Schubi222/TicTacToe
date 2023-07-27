import {defineStore} from "pinia";
import {ref} from "vue";

export const useGameStore = defineStore('game',() =>{
    const X = ref('PLAYER 1')
    const O = ref('PLAYER 2')
    const cpu = ref(false)
    const cpu_marker = ref('O')
    const score = ref({
        x_wins:0,
        o_wins:0,
        ties:0,
    })
    const active_player = ref('X')

    return{X, O, cpu, score, active_player, cpu_marker}
})