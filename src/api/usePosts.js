import axios from "axios";
import { ref } from "vue";

export default function usePosts() {

    const posts = ref([])
    const pagination = ref('')

    const fetchPosts = async(page) => {
     let response = await axios.get(`/api/get/posts?page=${page}`)
        posts.value = response.data.data
        pagination.value = response.data.meta.last_page
        console.log(response.data)
    }

    const fetchUserPosts = async(page) => {
        let response = await axios.get(`/api/get/user/posts?page=${page}`)
        posts.value = response.data.data
        pagination.value = response.data.meta.last_page
        console.log(response.data)
    }


    const createPost = async(data) => {
        console.log('creating post with ', data)
        await axios.post('/api/posts', data)
    }

    return {
        pagination,
        posts,
        fetchPosts,
        createPost,
        fetchUserPosts

    }
}