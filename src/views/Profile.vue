<template>
  <Header class="sticky top-0 w-screen" />
  <Index :profileInfo="profile" v-if="profile.name" />
  <Footer />
</template>

<script>
import Header from "../components/Utilities/Header.vue";
import Index from "../components/Profile/Index.vue";
import { onMounted } from '@vue/runtime-core';
import useProfile from '../api/useProfile'
export default {
  components: {
    Index,
    Header,
  },
  props: {
    username: {
      required: true,
      type: String
    }
  },
  setup(props) {

    const { profile, fetchProfile } = useProfile();
    onMounted(fetchProfile(props.username));

    return {
      profile
    }
  }
};
</script>

<style>
</style>