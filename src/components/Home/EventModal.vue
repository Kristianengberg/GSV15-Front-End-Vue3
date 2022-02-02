<template>
    <TransitionRoot as="template" :show="true">
        <Dialog as="div" auto-reopen="true" class="fixed z-40 inset-0 overflow-y-auto">
            <div
                class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
            >
                <TransitionChild
                    as="template"
                    enter="ease-out duration-300"
                    enter-from="opacity-0"
                    enter-to="opacity-100"
                    leave="ease-in duration-200"
                    leave-from="opacity-100"
                    leave-to="opacity-0"
                >
                    <DialogOverlay
                        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                    />
                </TransitionChild>

                <span
                    class="hidden sm:inline-block sm:align-middle sm:h-screen"
                    aria-hidden="true"
                >&#8203;</span>
                <TransitionChild
                    as="template"
                    enter="ease-out duration-300"
                    enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enter-to="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leave-from="opacity-100 translate-y-0 sm:scale-100"
                    leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                    <div
                        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                    >
                        <div class="bg-gsv px-4 py-3">
                            <p class="text-sm font-medium dark:text-gray-lightest">Create Event</p>
                        </div>
                        <form @submit.prevent="createEvent">
                            <div class="m-4">
                                <input
                                    type="text"
                                    class="p-3 border rounded-md w-full h-10 text-sm font-medium text-gray-900 dark:text-gray-lightest"
                                    placeholder="Event navn"
                                    v-model="form.name"
                                />
                            </div>
                            <div class="m-4">
                                <input
                                    type="date"
                                    class="p-3 border rounded-md w-full h-10 text-sm font-medium text-gray-900 dark:text-gray-lightest"
                                    placeholder="dato"
                                    v-model="form.date"
                                />
                            </div>
                            <div class="m-4">
                                <input
                                    type="time"
                                    class="p-3 border rounded-md w-full h-10 text-sm font-medium text-gray-900 dark:text-gray-lightest"
                                    placeholder="tid"
                                    v-model="form.time"
                                />
                            </div>

                            <div class="m-4">
                                <input
                                    type="text"
                                    class="p-3 border rounded-md w-full h-10 text-sm font-medium text-gray-900 dark:text-gray-lightest"
                                    placeholder="Beskrivelse"
                                    v-model="form.description"
                                />
                            </div>

                            <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    type="submit"
                                    class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-500 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                                >Create</button>
                                <button
                                    type="button"
                                    class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                    ref="cancelButtonRef"
                                    @click="closeModal"
                                >Cancel</button>
                            </div>
                        </form>
                    </div>
                </TransitionChild>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script>
import { reactive, ref } from "vue";
import {
    Dialog,
    DialogOverlay,
    TransitionChild,
    TransitionRoot,
} from "@headlessui/vue";


import useEvents from "../../api/useEvents";

export default {
    components: {
        Dialog,
        DialogOverlay,
        TransitionChild,
        TransitionRoot,
    },
    setup(props, { emit }) {
        const open = ref(true);

        const { createEvent: useCreateEvent, fetchAllEvents } = useEvents()

        const errors = ref({})

        const form = reactive({
            name: '',
            date: '',
            time: '',
            description: '',

        })

        const createEvent = () => {
            useCreateEvent(form)
            fetchAllEvents()
            closeModal()

        }

        const closeModal = () => {
            emit("close-modal", false);
        };

        return {
            open,
            closeModal,
            form,
            createEvent
        };
    },


};
</script>
