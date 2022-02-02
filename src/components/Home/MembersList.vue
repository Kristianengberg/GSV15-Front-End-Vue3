<template>
    <div class="w-1/4">
        <card
            v-for="profile in profiles"
            :key="profile.username"
            @click="goToProfile(profile.username)"
            class="cursor-pointer"
        >
            <div class="flex">
                <div class="w-16 mr-2">
                    <img
                        :src="'http://localhost:8000/storage/' + profile.username + '/' + 'profile.jpg'"
                        alt="profile pic"
                        class="rounded-full"
                    />
                </div>

                <div>{{ profile.name }}</div>
                <div class="mt-1 text-xs text-gray-400">/{{ profile.username }}</div>
            </div>
        </card>
    </div>
</template>

<script>
import Card from "../Utilities/Card.vue"

import useProfile from '../../api/useProfile'
import { onMounted } from '@vue/runtime-core';

import { useRouter } from 'vue-router'

export default {
    components: {
        Card
    },
    setup() {

        const { profiles, fetchAllProfiles } = useProfile();
        const router = useRouter();

        onMounted(fetchAllProfiles)

        const goToProfile = (username) => {
            router.replace({ name: 'profile', params: { username } })
        }

        return {
            goToProfile,
            profiles
        }
    }
}
</script>

<style>
</style>