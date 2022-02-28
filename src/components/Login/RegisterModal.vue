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
                            <p class="text-sm font-medium dark:text-gray-lightest">Create User</p>
                        </div>
                        <form @submit.prevent="register">
                            <div class="m-4">
                                <input
                                    type="email"
                                    :class="[errors.email ? 'border-red-300' : '', 'p-3 border rounded-md w-full h-10 text-sm font-medium text-gray-900 dark:text-gray-lightest']"
                                    placeholder="Email"
                                    v-model="form.email"
                                />
                                <div v-if="errors.email">{{ errors.email[0] }}</div>
                            </div>
                            <div class="m-4">
                                <input
                                    type="text"
                                    :class="[errors.name ? 'border-red-300' : '', 'p-3 border rounded-md w-full h-10 text-sm font-medium text-gray-900 dark:text-gray-lightest']"
                                    placeholder="Name"
                                    v-model="form.name"
                                />
                                <div v-if="errors.name">{{ errors.name[0] }}</div>
                            </div>
                            <div class="m-4">
                                <input
                                    type="text"
                                    :class="[errors.username ? 'border-red-300' : '', 'p-3 border rounded-md w-full h-10 text-sm font-medium text-gray-900 dark:text-gray-lightest']"
                                    placeholder="Username"
                                    v-model="form.username"
                                />
                                <div v-if="errors.username">{{ errors.username[0] }}</div>
                            </div>

                            <div class="m-4">
                                <input
                                    type="password"
                                    :class="[errors.password ? 'border-red-300' : '', 'p-3 border rounded-md w-full h-10 text-sm font-medium text-gray-900 dark:text-gray-lightest']"
                                    placeholder="Password"
                                    v-model="form.password"
                                />
                                <div v-if="errors.password">{{ errors.password[0] }}</div>
                            </div>
                            <div class="m-4">
                                <input
                                    type="password"
                                    :class="[errors.password ? 'border-red-300' : '', 'p-3 border rounded-md w-full h-10 text-sm font-medium text-gray-900 dark:text-gray-lightest']"
                                    placeholder="Repeat Password"
                                    v-model="form.password_confirmation"
                                />
                                <div v-if="errors.email">{{ errors.password[0] }}</div>
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


import { useStore } from "vuex"

export default {
    components: {
        Dialog,
        DialogOverlay,

        TransitionChild,
        TransitionRoot,
    },
    setup(props, { emit }) {
        const open = ref(true);

        const store = useStore();

        const errors = ref({})

        const form = reactive({
            name: '',
            username: '',
            email: '',
            password: '',
            password_confirmation: '',
        })

        const register = () => {
            errors.value = {}
            console.log('attempting register')
            store.dispatch('register', form)
                .then(() => {
                    console.log('register success')
                    closeModal()
                })
                .catch((e) => {
                    if (e.response.status === 422) {
                        errors.value = e.response.data.errors;
                    }
                });
        }

        const closeModal = () => {
            emit("close-modal", false);
        };

        return {
            open,
            closeModal,
            form,
            register,
            errors
        };
    },


};
</script>
