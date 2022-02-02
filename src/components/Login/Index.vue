<template>
  <div class="bg-gray-100 h-screen">
    <div class="container mx-auto">
      <div class="grid md:grid-cols-4 md:grid-rows md:pt-32">
        <Logo class="col-span-2" />
        <Card class="md:mt-32 h-0">
          <component :is="Input"></component>
        </Card>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from "./Logo.vue";
import Input from "./Input.vue";
import Card from "../Utilities/Card.vue";

export default {
  components: {
    Logo,
    Input,
    Card,
  },
  setup() {
    return {
      Input,
    };
  },
};
</script>

<style>
</style>