<template>
  <div class="bg-white shadow-md">
    <div class="flex justify-between mx-6">
      <div class="flex cursor-pointer" @click="start">
        
        <img src="../../assets/gsv-black-transparent.png" class="w-10 h-10 mt-1" alt />
      </div>
      <div class="cursor-pointer">
        <div>
          <input
            type="text"
            class="border-md rounded-md bg-gray-100 p-3 md:w-64 h-8 mt-2"
            placeholder="search to be implemented"
          />
        </div>
      </div>
      <div>
        <button @click="profile" class="hover:bg-gray-200 p-1 rounded-md mt-1">Profile</button>
        <button
          v-if="store.state.authenticated"
          @click="logout"
          class="hover:bg-gray-200 p-1 rounded-md mt-1 cursor-pointer"
        >Logout</button>
      </div>
    </div>
  </div>
</template>

<script>

import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {


  setup() {

    const store = useStore()
    const router = useRouter();


    const start = () => {
      router.replace({ name: 'home' })
    };

    const profile = () => {
      router.replace({ name: 'profile', params: { username: store.getters.user.username } })
    };

    const logout = () => {
      store.dispatch('logout').then(() => router.replace({ name: 'login' }))
    }

    return {
      start,
      store,
      profile,
      logout
    };
  },
};
</script>

<style>
</style>