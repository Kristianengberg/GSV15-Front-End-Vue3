<template>
  <div class="h-screen">
    <Banner :profileInfo="profileInfo" />
  </div>
</template>

<script>
import Banner from "./Banner.vue";
import Photos from "./Photos.vue";
import Card from "../Utilities/Card.vue";
import Posts from "./Posts.vue";

import { computed } from "@vue/reactivity";
import { useStore } from "vuex";



export default {
  components: {
    Banner,
    Photos,
    Card,
    Posts
  },
  props: {
    profileInfo: {
      required: true,
    }
  },
  setup(props) {

    const store = useStore();
    const profileInfo = computed(() => props.profileInfo);

    return {
      profileInfo
    };
  },
};
</script>

<style>
</style>