<template>
  <div class="w-1/4 mx-auto">
    <card>
      <div class="flex flex-row justify-between">
        <div class="w-28 mr-2">
          <img
            :src="'http://localhost:8000/storage/' + profile.username + '/' + 'profile.jpg'"
            alt="profile pic"
            class="rounded-full border-4"
          />
        </div>
        <div class>
          <p class="text-xl">{{ profile.name }}</p>
          <p class="text-sm text-gray-400">/ {{ profile.username }}</p>
          <p class="text-sm">Phone: {{ profile.phone }}</p>
          <p class="text-sm">Email: {{ profile.email }}</p>
        </div>
        <div>
          <button
            v-if="username == profile.username"
            class="p-2 rounded-2xl border-2 hover:bg-gray-200"
            @click="showModal = true"
          >Edit Profile</button>
        </div>
      </div>
    </card>
  </div>
  <EditProfileModal
    v-if="showModal"
    @close="showModal = false"
    v-on:close-modal="showModal = $event"
    :profileInfo="profile"
  />
</template>

<script>
import { ref } from '@vue/reactivity';

import Card from "../Utilities/Card.vue";
import EditProfileModal from "./EditProfileModal.vue";

import { useStore } from 'vuex';

export default {
  components: {
    Card,
    EditProfileModal
  },

  props: {
    profileInfo: {
      required: true,
    }
  },
  setup(props) {

    const store = useStore()

    const username = store.getters.user.username

    const profile = ref(props.profileInfo)

    const showModal = ref(false);

    return {
      profile,
      showModal,
      username
    };
  },
};
</script>