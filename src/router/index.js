import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'

import Login from '../views/Login.vue'
import Profile from '../views/Profile.vue'
import Home from '../views/Home.vue'


const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
        beforeEnter: (to, from, next) => {
            
            if (!store.getters.authenticated) {
                console.log(store.getters.authenticated)
                return next({ name: 'login'})
            }

            return next();
        }
    },

    {
        path: '/login',
        name: 'login',
        component: Login,
        beforeEnter: (to, from, next) => {
            
            if (store.getters.authenticated) {
                console.log(store.getters.authenticated)
                return next({ name: 'home'})
            }

            return next();
        }
    },
    {
        path: '/:username',
        name: 'profile',
        component: Profile,
        props: true,
        beforeEnter: (to, from, next) => {
            if (!store.getters.authenticated) {
                return next({ name: 'login' })
            }

            return next()
        }
    },

]


export default createRouter({
    history: createWebHistory(),
    routes
})