import {createStore} from 'vuex'
import router from '../router'

import axios from 'axios'


export default createStore({

    state() {
  
        return {
            authenticated: false,
            user: null,

        }
    },

    getters: {
        authenticated (state) {
            return state.authenticated
        },
        user (state) {
            return state.user
        }
    },

    mutations: {
        SET_AUTHENTICATED (state, authenticated) {
            state.authenticated = authenticated
        },
        SET_USER (state, user) {
            state.user = user
        },
        SET_PROFILE (state, form) {
            state.user.phone = form.phone
            state.user.username = form.username
            state.user.email = form.email
        }
    },

    actions: {
        
        authenticate ({ commit }) {
            return axios.get('/api/user').then((response) => {
                commit('SET_AUTHENTICATED', true)
                commit('SET_USER', response.data)
                console.log(response)

            }).catch(() => {
                commit('SET_AUTHENTICATED', false)
                commit('SET_USER', null)
                console.log('failed to get user')
            })
        },

        async login({ dispatch }, credentials) {
            
            await axios.get('/sanctum/csrf-cookie')
            await axios.post('/login', credentials)

            dispatch('authenticate').then(()=> {
                router.replace({ name: 'home' })
            })


        },

        async register({ dispatch }, credentials) {
            await axios.get('/sanctum/csrf-cookie')
            await axios.post('/register', credentials)

            dispatch('authenticate').then(()=> {
                router.replace({ name: 'home' })
            })
        },

        async editProfileInfo({ commit }, form) {
            console.log('editing profile', form)

            commit('SET_PROFILE', form)

            await axios.put(`/user/profile-information`, form)            

        },

        async logout({ commit }) {
            await axios.post('/logout')
            .then(()=>{
                commit('SET_AUTHENTICATED', false)
                commit('SET_USER', null)
            })
            .catch(() => {
                console.log('failed to log you out');
            })
            
        }
    }
})