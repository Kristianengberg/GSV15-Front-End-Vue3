<template>
    <div class="w-1/4">
        <div>
            <card>
                <div class="flex cursor-pointer h-8" @click="showModal = true">
                    <a class="underline self-center mx-auto">Opret Event</a>
                </div>
            </card>
            <EventModal
                v-if="showModal"
                @close="showModal = false"
                v-on:close-modal="showModal = $event"
            />
        </div>

        <card v-for="(event, index) in events" :key="index">
            <div>{{ event.name }}</div>
            <div>{{ event.date }}</div>
            <div>{{ event.time }}</div>
            <div>{{ event.description }}</div>
        </card>
    </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import EventModal from "./EventModal.vue";
import Card from "../Utilities/Card.vue";
import useEvents from "../../api/useEvents";
import { onMounted } from '@vue/runtime-core';

export default {
    components: {
        EventModal,
        Card
    },

    setup() {

        const { events, fetchAllEvents } = useEvents();

        onMounted(fetchAllEvents)

        const showModal = ref(false);
        return {
            EventModal,
            showModal,
            events
        };
    },
};
</script>

<style>
</style>