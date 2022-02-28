<template>
  <div class="flex flex-col">
    <form class="mt-8 space-y-6" v-on:submit.prevent="login">
      <div class="rounded-md shadow-sm space-y-4">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <div class="mt-1">
            <input
              type="email"
              :class="[errors.email ? 'border-red-300' : '', 'p-3 border rounded-md w-full h-10 text-sm font-medium text-gray-900 dark:text-gray-lightest']"
              placeholder="Email"
              v-model="form.email"
            />
            <div class="mt-2 text-small text-red-600" v-if="errors.email">{{ errors.email[0] }}</div>
          </div>
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <div class="mt-1">
            <input
              type="password"
              :class="[errors.password ? 'border-red-300' : '', 'p-3 border rounded-md w-full h-10 text-sm font-medium text-gray-900 dark:text-gray-lightest']"
              placeholder="Password"
              v-model="form.password"
            />
            <p class="mt-2 text-small text-red-600" v-if="errors.password">{{ errors.password[0] }}</p>
          </div>
        </div>
      </div>

      <button
        type="submit"
        class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >Sign in</button>
    </form>
    <Register class="mt-4" />
  </div>
</template>

<script>
import { reactive, ref } from "@vue/reactivity";

import { useStore } from "vuex"
import Register from "./Register.vue";
import { useRouter } from 'vue-router'


export default {
  components: {
    Register,
  },
  setup() {

    const errors = ref({})

    const router = useRouter();

    const store = useStore()

    const loading = false

    const form = reactive({
      email: '',
      password: '',
    })

    const login = () => {
      errors.value = {}
      console.log('attempting login')
      store.dispatch('login', form)
        .catch((e) => {
          if (e.response.status === 422) {
            errors.value = e.response.data.errors;
          }
        });
    }


    return {
      form,
      login,
      errors,
      loading
    };
  },
};
</script>

<style></style>
