import { ref } from 'vue'
import axios from 'axios'

export default function useProfile() {

    const profile = ref({})

    const profiles = ref([])

    const fetchProfile = async(username) => {
        console.log('fetching profile', username)
        let response = await axios.get(`/api/${username}`)
        profile.value = response.data.data
    }

    const fetchAllProfiles = async() => {
        console.log('fetching all profiles')
        let response = await axios.get('/api/get/users')
        profiles.value = response.data.data
    }



    return {
        profile,
        profiles,
        fetchProfile,
        fetchAllProfiles,
    }

}