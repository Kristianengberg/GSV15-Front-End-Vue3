import { ref } from 'vue'
import axios from 'axios'

export default function useEvents() {


    const events = ref([])
    const event = ref({})

    const fetchEvent = async(eventId) => {
        console.log('fetching event', eventId)
        let response = await axios.get(`/api/get/${eventId}`)
        event.value = response.data.data
    }

    const fetchAllEvents = async() => {
        console.log('fetching all events')
        let response = await axios.get('/api/get/events')
        events.value = response.data.data
    }
    
    const createEvent = async(data) => {
        console.log('creating event with ', data)
        await axios.post('/api/events', data)
    }

    return {
        event,
        events,
        fetchEvent,
        fetchAllEvents,
        createEvent
    }

}