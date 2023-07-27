import {createRouter, createWebHistory} from "vue-router";
import HomeView from "../Views/HomeView.vue";
import GameView from "../Views/GameView.vue";



const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes:[
        {
            path:'/',
            name:'home',
            component:HomeView
        },
        {
            path:'/play',
            name:'play',
            component:GameView
        },
    ]
})

export default router