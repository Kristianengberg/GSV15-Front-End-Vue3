<template>
    <div class="lg:w-1/2">
        <card>
            <form @submit.prevent="createPost">
                <ResizeTextarea>
                    <template v-slot:default="{ resize, el }">
                        <textarea
                            :ref="el"
                            v-on:input="resize"
                            v-model="data.data.body"
                            type="text"
                            class="w-full leading-5 tracking-tight bg-gray-100 text-gray-900 border-none focus:ring-0 resize-none p-2"
                            placeholder="Skriv noget sejt!"
                        />
                    </template>
                </ResizeTextarea>
                <div class="flex flex-row-reverse">
                    <button type="submit" class="border rounded-md bg-gray-300 p-2 px-6">Post</button>
                </div>
            </form>
        </card>
        <card v-for="post in posts" :key="post.uuid" class="mb-4">
            <div class="flex">
                <img
                    :src="'http://localhost:8000/storage/' + post.user.username + '/' + 'profile.jpg'"
                    alt="profile pic"
                    class="rounded-full h-10 mr-2"
                />
                <a class="cursor-pointer" :href="post.user.username">
                    <div class="mb-2">
                        <p class="hover:underline text-lg">{{ post.user.name }}</p>
                        <p class="text-xs text-gray-400">/{{ post.user.username }}</p>
                    </div>
                </a>
            </div>
            <div class="mb-2 text-xs text-gray-400">{{ post.time }}</div>
            <div>{{ post.body }}</div>
        </card>
        <div class="flex justify-between">
            <div
                v-if="pagination > 1"
                @click="previousPage"
                class="underline cursor-pointer"
            >&lt;&lt;PREVIOUS</div>
            <div>{{ pagination }} / {{ usePagination }}</div>
            <div
                v-if="pagination < usePagination"
                @click="nextPage"
                class="underline cursor-pointer"
            >NEXT&gt;&gt;</div>
        </div>
    </div>
</template>

<script>
import { onMounted, reactive, ref } from '@vue/runtime-core'

import usePosts from '../../api/usePosts'
import Card from '../Utilities/Card.vue'
import ResizeTextarea from '../Utilities/ResizeTextarea.vue'


export default {
    components: {
        Card,
        ResizeTextarea
    },

    setup() {

        const pagination = ref(1)

        const data = reactive({
            data: {
                body: ''
            }
        })

        const { posts, fetchPosts, createPost: useCreatePost, pagination: usePagination } = usePosts()

        onMounted(fetchPosts(pagination.value))




        const nextPage = () => {
            if (pagination.value < usePagination.value) {
                pagination.value++
                fetchPosts(pagination.value)

            }
        }

        const previousPage = () => {
            if (pagination.value > 0) {
                pagination.value--
                fetchPosts(pagination.value)

            }
        }

        const createPost = () => {
            useCreatePost(data.data)
            data.data.body = ''
            fetchPosts()
        }


        return {
            posts,
            data,
            createPost,
            nextPage,
            previousPage,
            pagination,
            usePagination

        }

    }


}
</script>

<style>
</style>