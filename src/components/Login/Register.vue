<template>
  <a class="underline self-center cursor-pointer" @click="showModal = true">Register</a>
  <RegisterModal v-if="showModal" @close="showModal = false" v-on:close-modal="showModal = $event" />
</template>

<script>
import { ref } from "@vue/reactivity";
import RegisterModal from "./RegisterModal.vue";

export default {
  components: {
    RegisterModal,
  },

  setup() {
    const showModal = ref(false);
    return {
      showModal,
    };
  },
};
</script>

<style>
</style>